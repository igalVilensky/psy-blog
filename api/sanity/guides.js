// api/sanity/guides.js
import { GUIDES_QUERY } from "./queries";

export const fetchGuides = () => {
  // Return the query result directly, don't destructure
  return useSanityQuery(GUIDES_QUERY);
};
