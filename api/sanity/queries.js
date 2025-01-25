// api/sanity/queries.js
export const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ] | order(publishedAt desc)[0...12] {
    _id,
    title,
    slug,
    publishedAt,
    image,
    category,
    readtime,
    author
  }`;

export const GUIDES_QUERY = `*[
    _type == "guide"
    && defined(slug.current)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    description,
    category,
    benefits,
    whatYouGet,
    targetAudience,
    whyDownload,
    callToAction,
    image,
    pdfFile {
      asset -> {
        url
      }
    }
  }`;
