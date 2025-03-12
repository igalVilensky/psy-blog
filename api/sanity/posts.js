// api/sanity/posts.js
import { POSTS_QUERY } from "./queries";

export const fetchPosts = async () => {
  const sanity = useSanity(); // Get the Sanity client
  try {
    const data = await sanity.fetch(POSTS_QUERY); // Use fetch directly
    return Array.isArray(data) ? data : []; // Ensure it’s an array
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return []; // Return empty array on error
  }
};
