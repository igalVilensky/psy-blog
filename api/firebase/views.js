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
