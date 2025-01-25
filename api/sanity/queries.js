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

export const GUIDE_BY_SLUG_QUERY = `*[_type == "guide" && slug.current == $slug][0]{
  _id,
  title,
  description,
  image,
  category,
  slug,
  pdfFile {
    asset -> {
      url
    }
  },
  callToAction,
  whyDownload,
  targetAudience,
  benefits,
  whatYouGet
}`;
