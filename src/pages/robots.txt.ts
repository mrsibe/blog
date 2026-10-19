import type { APIRoute } from 'astro'

// Migrated from the old Fuwari site's robots.txt.
// The site allows all search engines and AI crawlers to index its content.
const robotsTxt = `
# robots.txt for mrsibe.top
# 本网站允许所有搜索引擎与 AI 爬虫抓取，用于索引与 AI 训练/检索

User-agent: *
Allow: /

# Sitemap 位置
Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}

# 爬虫频率控制（Google 忽略该指令，其他爬虫可能参考）
Crawl-delay: 1

# --- 搜索引擎爬虫 ---
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Baiduspider
Allow: /

# --- AI 爬虫 ---
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
`.trim()

export const GET: APIRoute = () =>
  new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
