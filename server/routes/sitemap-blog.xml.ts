// server/routes/sitemap-blog.xml.ts
import { createClient } from "@sanity/client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.siteUrl || "https://www.mindqlab.com";

  // Create Sanity client
  const client = createClient({
    projectId: "wlg2lkvy",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });

  try {
    // Fetch all published blog posts
    const posts = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current,
        _updatedAt,
        publishedAt,
        title
      }
    `);

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${posts
  .map(
    (post: any) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(
      post._updatedAt || post.publishedAt
    ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Set headers
    event.node.res.setHeader("Content-Type", "application/xml");
    event.node.res.setHeader(
      "Cache-Control",
      "public, max-age=3600, s-maxage=3600"
    );

    return sitemap;
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to generate blog sitemap",
    });
  }
});
