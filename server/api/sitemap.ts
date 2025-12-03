import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const client = createClient({
        projectId: "wlg2lkvy",
        dataset: "production",
        apiVersion: "2024-01-01",
        useCdn: true,
    });

    try {
        const posts = await client.fetch(`
      *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
        "slug": slug.current,
        _updatedAt,
        publishedAt
      }
    `);

        return posts.map((post: any) => ({
            loc: `/blog/${post.slug}`,
            lastmod: post._updatedAt || post.publishedAt,
            changefreq: "weekly",
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Error fetching blog posts for sitemap:", error);
        return [];
    }
});
