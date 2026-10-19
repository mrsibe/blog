// One-off migration of the old Fuwari blog posts into the astro-pure blog collection.
//
// Usage: node scripts/migrate-old-blog.mjs [source-dir]
//   source-dir defaults to ../old-blog/src/content/posts (relative to the repo root)
//
// Frontmatter mapping: published -> publishDate, updated -> updatedDate,
// category -> appended to tags, image/lang dropped (they were empty).
// Body fixes: Java fence language -> java, old /posts/ links -> /blog/ links.

import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, process.argv[2] ?? '../old-blog/src/content/posts')
const target = join(root, 'src/content/blog')

const FM_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function listMarkdown(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return listMarkdown(full)
    return name.endsWith('.md') ? [full] : []
  })
}

/** Normalize a post date to ISO 8601 with an explicit offset. */
function toIso(value) {
  const date = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(date.valueOf())) throw new Error(`Invalid date: ${value}`)
  return date.toISOString()
}

/** Merge the old category into the tag list, keeping the first spelling of duplicates. */
function mergeTags(tags, category) {
  const merged = [...(tags ?? []), category].filter((tag) => typeof tag === 'string' && tag.trim())
  const seen = new Set()
  return merged.filter((tag) => {
    const key = tag.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function fixBody(body) {
  return body
    .replace(/^```Java\r?$/gm, '```java')
    .replace(/(\]\(|<)https:\/\/mrsibe\.top\/posts\/([^\s)>]+?)\/?([)>])/g, '$1/blog/$2$3')
    .replace(/\]\(\/posts\//g, '](/blog/')
}

const files = listMarkdown(source).sort()
if (files.length === 0) throw new Error(`No markdown found in ${source}`)

rmSync(target, { recursive: true, force: true })

const report = []
for (const file of files) {
  const raw = readFileSync(file, 'utf8')
  const match = raw.match(FM_PATTERN)
  if (!match) throw new Error(`Missing frontmatter: ${file}`)

  const fm = parseYaml(match[1])
  const body = fixBody(raw.slice(match[0].length))

  const data = {
    title: fm.title,
    description: fm.description ?? '',
    publishDate: toIso(fm.published)
  }
  if (fm.updated) data.updatedDate = toIso(fm.updated)

  const tags = mergeTags(fm.tags, fm.category)
  if (tags.length > 0) data.tags = tags
  data.draft = Boolean(fm.draft)

  const relativePath = relative(source, file)
  const outFile = join(target, relativePath)
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(
    outFile,
    `---\n${stringifyYaml(data, { lineWidth: 0 }).trimEnd()}\n---\n\n${body.replace(/^\n+/, '')}`,
    'utf8'
  )
  report.push({ relativePath, tags: tags.length, category: fm.category ?? '' })
}

console.log(`Migrated ${report.length} posts into ${relative(root, target)}`)
for (const row of report)
  console.log(`  ${row.relativePath}  [tags:${row.tags}] category=${row.category}`)
