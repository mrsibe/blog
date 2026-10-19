// Generates the site-wide Open Graph card (`public/images/social-card.png`).
//
// The theme ships a card branded with the theme name, so it is regenerated with
// the blog's own title and tagline. Post cards are generated at build time by
// `src/pages/og/[...slug].ts`; this script only covers pages without a post image.
//
// Usage: node scripts/make-social-card.mjs

import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateOpenGraphImage } from 'astro-og-canvas'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'public/images/social-card.png')

const image = await generateOpenGraphImage({
  title: '西贝的代码宇宙',
  description: '在星辰与字节之间，写下一行属于宇宙的代码。',
  logo: { path: join(root, 'public/images/avatar-128.jpg'), size: [80, 80] },
  bgGradient: [
    [20, 25, 45],
    [40, 48, 80]
  ],
  border: { color: [165, 180, 252], width: 12, side: 'inline-start' },
  padding: 60,
  fonts: [join(root, 'src/assets/fonts/NotoSansSC-Regular.otf')],
  font: {
    title: { families: ['Noto Sans SC'], size: 58, weight: 'Normal', lineHeight: 1.3 },
    description: {
      families: ['Noto Sans SC'],
      size: 28,
      weight: 'Normal',
      color: [203, 213, 225]
    }
  }
})

await writeFile(output, Buffer.from(await new Response(image).arrayBuffer()))
console.log(`Wrote ${output}`)
