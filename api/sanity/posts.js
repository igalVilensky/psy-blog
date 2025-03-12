// api/sanity/posts.js
import { POSTS_QUERY } from "./queries";

export const fetchPosts = () => {
  const { data, error } = useSanityQuery(POSTS_QUERY);

  if (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }

  return data?.value || []; // Ensure it always returns an array
};
