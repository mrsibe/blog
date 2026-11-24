import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import subsetFont from 'subset-font'

/**
 * 按实际内容子集化字体，输出到 public/fonts/（不提交，构建时重新生成）。
 *
 * - Inter / Besley：只保留 @font-face 里声明的拉丁 unicode-range，保持变量字体轴
 * - Noto Sans SC：只保留站点实际用到的汉字 + 中文标点（全量 8MB → 数百 KB）
 *
 * 新增文章后字符集自动变大，构建时重算；未收录的字会回落到系统字体，不会出豆腐块。
 */

const SRC_DIR = path.resolve('src')
const SOURCE_DIR = path.resolve('assets/fonts')
const OUT_DIR = path.resolve('public/fonts')

const MANIFEST = path.resolve('.astro/font-subset.json')

const TEXT_EXTENSIONS = new Set(['.md', '.mdx', '.astro', '.ts', '.css', '.json', '.svg'])
const EXTRA_CHARS = '✓·—…“”‘’《》「」（）【】、。，；：？！％'

// 与 fonts.css 中 Inter / Besley 的 unicode-range 保持一致
const LATIN_RANGES: [number, number][] = [
  [0x0000, 0x00ff],
  [0x0131, 0x0131],
  [0x0152, 0x0153],
  [0x02bb, 0x02bc],
  [0x02c6, 0x02c6],
  [0x02da, 0x02da],
  [0x02dc, 0x02dc],
  [0x2000, 0x206f],
  [0x2074, 0x2074],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2191, 0x2191],
  [0x2193, 0x2193],
  [0x2212, 0x2212],
  [0x2215, 0x2215],
  [0xfeff, 0xfeff],
  [0xfffd, 0xfffd]
]

function latinText(): string {
  const chars: string[] = []

  for (const [start, end] of LATIN_RANGES) {
    for (let code = start; code <= end; code += 1) {
      // 跳过控制字符与未分配码位
      if (code >= 0x20 || code === 0x09 || code === 0x0a) chars.push(String.fromCodePoint(code))
    }
  }

  return chars.join('')
}

async function walk(dir: string, files: string[] = []): Promise<string[]> {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await walk(full, files)
    } else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full)
    }
  }

  return files
}

async function collectContentChars(): Promise<Set<string>> {
  const chars = new Set<string>()

  for (const file of await walk(SRC_DIR)) {
    for (const char of await fs.readFile(file, 'utf8')) {
      chars.add(char)
    }
  }

  for (const char of EXTRA_CHARS) {
    chars.add(char)
  }

  return chars
}

/** WOFF2 表目录解析，用来确认子集化后变量字体轴没有被丢掉 */
function woff2TableTags(buffer: Buffer): string[] {
  if (buffer.subarray(0, 4).toString('latin1') !== 'wOF2') {
    throw new Error('not a WOFF2 file')
  }

  const KNOWN_TAGS = [
    'cmap',
    'head',
    'hhea',
    'hmtx',
    'maxp',
    'name',
    'OS/2',
    'post',
    'cvt ',
    'fpgm',
    'glyf',
    'loca',
    'prep',
    'CFF ',
    'VORG',
    'EBDT',
    'EBLC',
    'gasp',
    'hdmx',
    'kern',
    'LTSH',
    'PCLT',
    'VDMX',
    'vhea',
    'vmtx',
    'BASE',
    'GDEF',
    'GPOS',
    'GSUB',
    'EBSC',
    'JSTF',
    'MATH',
    'CBDT',
    'CBLC',
    'COLR',
    'CPAL',
    'SVG ',
    'sbix',
    'acnt',
    'avar',
    'bdat',
    'bloc',
    'bsln',
    'cvar',
    'fdsc',
    'feat',
    'fmtx',
    'fvar',
    'gvar',
    'hsty',
    'just',
    'lcar',
    'mort',
    'morx',
    'opbd',
    'prop',
    'trak',
    'Zapf',
    'Silf',
    'Glat',
    'Gloc',
    'Feat',
    'Sill'
  ]

  const numTables = buffer.readUInt16BE(12)
  let offset = 48
  const tags: string[] = []

  const readBase128 = () => {
    let value = 0

    for (let i = 0; i < 5; i += 1) {
      const byte = buffer[offset]
      offset += 1
      value = (value << 7) | (byte & 0x7f)
      if ((byte & 0x80) === 0) return value
    }

    throw new Error('invalid UIntBase128')
  }

  for (let i = 0; i < numTables; i += 1) {
    const flags = buffer[offset]
    offset += 1
    const tagIndex = flags & 0x3f
    const transformVersion = flags >> 6
    let tag: string

    if (tagIndex === 63) {
      tag = buffer.subarray(offset, offset + 4).toString('latin1')
      offset += 4
    } else {
      tag = KNOWN_TAGS[tagIndex]
    }

    tags.push(tag)

    readBase128() // origLength

    const isTransformed = (tag === 'glyf' || tag === 'loca') === (transformVersion === 0) && transformVersion !== 3

    if (isTransformed) readBase128() // transformLength
  }

  return tags
}

async function build({
  source,
  output,
  text,
  label,
  variable
}: {
  source: string
  output: string
  text: string
  label: string
  variable?: boolean
}) {
  const input = await fs.readFile(path.join(SOURCE_DIR, source))
  const subset = await subsetFont(input, text, { targetFormat: 'woff2' })

  if (variable) {
    const tags = woff2TableTags(subset)

    if (!tags.includes('fvar') || !tags.includes('gvar')) {
      throw new Error(`${label}: variable axes lost during subsetting (tables: ${tags.join(', ')})`)
    }
  }

  await fs.writeFile(path.join(OUT_DIR, output), subset)

  const kb = (size: number) => `${(size / 1024).toFixed(1)}KB`
  console.log(
    `${label.padEnd(22)} ${kb(input.length).padStart(8)} → ${kb(subset.length).padStart(8)}  /fonts/${output}`
  )
}

const contentChars = await collectContentChars()
const allText = [...contentChars].sort().join('')
const latin = latinText()

const SOURCES = ['Inter.woff2', 'Besley-Italic.woff2', 'NotoSansSC-Regular.otf', 'NotoSansSC-Bold.otf']
const OUTPUTS = ['Inter.woff2', 'Besley-Italic.woff2', 'NotoSansSC-Regular.woff2', 'NotoSansSC-Bold.woff2']

await fs.mkdir(OUT_DIR, { recursive: true })

// 内容不变就跳过，避免每次 pnpm dev 都重算 6 秒
const hash = createHash('sha1')
hash.update(allText)
for (const name of SOURCES) hash.update((await fs.stat(path.join(SOURCE_DIR, name))).size.toString())
const key = hash.digest('hex')

const cached = await fs.readFile(MANIFEST, 'utf8').then(JSON.parse, () => null)
const outputsPresent = await Promise.all(
  OUTPUTS.map((name) =>
    fs.access(path.join(OUT_DIR, name)).then(
      () => true,
      () => false
    )
  )
)

if (cached?.key === key && outputsPresent.every(Boolean)) {
  console.log(`字体子集已是最新（${contentChars.size} 个字符），跳过生成`)
  process.exit(0)
}

await build({ source: 'Inter.woff2', output: 'Inter.woff2', text: latin, label: 'Inter', variable: true })
await build({ source: 'Besley-Italic.woff2', output: 'Besley-Italic.woff2', text: latin, label: 'Besley Italic' })
await build({
  source: 'NotoSansSC-Regular.otf',
  output: 'NotoSansSC-Regular.woff2',
  text: allText,
  label: 'Noto Sans SC 400'
})
await build({
  source: 'NotoSansSC-Bold.otf',
  output: 'NotoSansSC-Bold.woff2',
  text: allText,
  label: 'Noto Sans SC 700'
})

await fs.mkdir(path.dirname(MANIFEST), { recursive: true })
await fs.writeFile(MANIFEST, JSON.stringify({ key, chars: contentChars.size }, null, 2))

console.log(`\n字符集：${contentChars.size} 个字符（含拉丁与中文标点）`)
