// api/firebase/views.js
import { doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";

export const incrementPostViewCount = async (firestore, postId) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      await setDoc(postRef, { views: 0 });
    }

    await updateDoc(postRef, {
      views: increment(1),
    });
  } catch (error) {
    console.error("Failed to manage view count:", error);
  }
};

export const getPostViewCount = async (firestore, postId) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      return postDoc.data().views || 0;
    }
    return 0; // If the document does not exist, return 0 views
  } catch (error) {
    console.error("Failed to fetch view count:", error);
    return 0; // Return 0 in case of errors
  }
};
