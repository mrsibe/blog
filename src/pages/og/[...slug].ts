import { getSortedPostsList } from "@utils/content-utils";
import { OGImageRoute } from "astro-og-canvas";
import { siteConfig } from "@/config";

const posts = await getSortedPostsList();

export const { getStaticPaths, GET } = await OGImageRoute({
	pages: Object.fromEntries(posts.map(({ slug, data }) => [slug, data])),
	// Preserve dots and nested directories in post slugs.
	getSlug: (slug) => `${slug}.png`,
	getImageOptions: (_slug, page) => ({
		title: page.title,
		description: `${siteConfig.title}\n${page.description || siteConfig.subtitle}`,
		logo: { path: "./public/images/avatar-128.jpg", size: [80, 80] },
		bgGradient: [
			[20, 25, 45],
			[40, 48, 80],
		],
		border: { color: [165, 180, 252], width: 12, side: "inline-start" },
		padding: 60,
		fonts: ["./src/assets/fonts/NotoSansSC-Regular.otf"],
		font: {
			title: {
				families: ["Noto Sans SC"],
				size: 58,
				weight: "Normal",
				lineHeight: 1.3,
			},
			description: {
				families: ["Noto Sans SC"],
				size: 28,
				weight: "Normal",
				color: [203, 213, 225],
			},
		},
	}),
});
