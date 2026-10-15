# 西贝的代码宇宙

个人博客。记录后端、分布式系统、AI 与开源项目，也写天文和业余无线电。

站点：<https://mrsibe.top> · 友链申请：[Issue #1](https://github.com/MrSibe/blog/issues/1)

## 技术栈

[Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari)，搜索由 Pagefind 提供。

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # 构建到 dist/ 并生成搜索索引
pnpm preview
```

## 写文章

文章放在 `src/content/posts/`，**文件路径即 URL**：`godis/1-resp-protocol.md` → `/posts/godis/1-resp-protocol/`。

```bash
pnpm new-post <filename>
```

frontmatter 必填 `title`、`published`，可选 `description`、`tags`、`category`、`draft`。
站点配置在 `src/config.ts`（标题、导航、侧栏资料）。

## 图表、评论与分享封面

### Mermaid

文章中使用 `mermaid` 代码块即可生成流程图、架构图和时序图，浏览器本地渲染，无需外部服务：

````markdown
```mermaid
flowchart LR
    A[写文章] --> B[Astro 构建] --> C[发布博客]
```
````

图表使用适配明暗背景的中性主题，支持 Swup 页面切换。

### Giscus 评论

1. 在 `mrsibe/blog` 仓库开启 **Discussions**，安装 [Giscus GitHub App](https://github.com/apps/giscus)。
2. 打开 <https://giscus.app/zh-CN>，选择仓库及评论分类（推荐 Announcements / 公告）。
3. 将 `.env.example` 复制为 `.env`，填写生成的 `data-repo-id`、`data-category`、`data-category-id` 对应配置。
4. 在部署平台设置同名环境变量后重新构建。

未配置 ID 时不显示评论区，也不会请求 Giscus。评论按文章路径匹配，支持站内导航和明暗主题切换；修改文章 URL 会影响讨论匹配。

### 自动 OG 图片

`astro-og-canvas` 在构建时为每篇已发布文章生成 `/og/<文章路径>.png`（1200 × 630），并写入 Open Graph、Twitter Card 和文章结构化数据。无需手动制作封面；文章自身的封面展示不受影响。

中文字体随仓库提供，构建时不依赖字体服务。字体来自 [Noto CJK](https://github.com/notofonts/noto-cjk)，许可证见 `src/assets/fonts/OFL.txt`。

## 死链检查

[Check Links 工作流](.github/workflows/links.yml) 使用 Lychee 检查文章与 README 中的外部 HTTP(S) 链接：内容变更时运行，每周一 UTC 02:00 定时运行，也可在 GitHub Actions 手动触发。失效链接会使检查失败，报告显示在该次运行的 Job Summary 中。

配置位于 `lychee.toml`；仅排除示例域名与私网地址，不会把 403 / 429 等错误直接当作成功。新增排除项前应先确认是站点反爬限制，而非真正失效。

## 许可

博客内容版权归作者所有；站点基于 MIT 许可的 [Fuwari](https://github.com/saicaca/fuwari) 构建。
