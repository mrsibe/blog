import { OGImageRoute } from 'astro-og-canvas'

import { getBlogCollection, sortMDByDate } from 'astro-pure/server'
import config from '@/site-config'

// One 1200x630 PNG per published post, served from `/og/<post-id>.png`.
// Referenced by `src/layouts/BlogPost.astro` for Open Graph / Twitter cards.
const posts = sortMDByDate(await getBlogCollection())

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: Object.fromEntries(posts.map(({ id, data }) => [id, data])),
  // Preserve dots and nested directories in post slugs.
  getSlug: (slug) => `${slug}.png`,
  getImageOptions: (_slug, page) => ({
    title: page.title,
    description: `${config.title}\n${page.description || config.description}`,
    logo: { path: './public/images/avatar-128.jpg', size: [80, 80] },
    bgGradient: [
      [20, 25, 45],
      [40, 48, 80]
    ],
    border: { color: [165, 180, 252], width: 12, side: 'inline-start' },
    padding: 60,
    fonts: ['./src/assets/fonts/NotoSansSC-Regular.otf'],
    font: {
      title: {
        families: ['Noto Sans SC'],
        size: 58,
        weight: 'Normal',
        lineHeight: 1.3
      },
      description: {
        families: ['Noto Sans SC'],
        size: 28,
        weight: 'Normal',
        color: [203, 213, 225]
      }
    }
  })
})
