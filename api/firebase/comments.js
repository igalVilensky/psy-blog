// api/firebase/comments.js
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

// Guide Comments (existing functions unchanged)
export const addGuideComment = async (firestore, guideSlug, commentData) => {
  try {
    const commentsRef = collection(firestore, "guides", guideSlug, "comments");
    const newComment = {
      ...commentData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(commentsRef, newComment);
    return {
      success: true,
      id: docRef.id,
      comment: { ...newComment, id: docRef.id },
    };
  } catch (error) {
    console.error("Failed to add guide comment:", error);
    return {
      success: false,
      message: "Failed to add guide comment",
    };
  }
};

export const getGuideComments = async (firestore, guideSlug) => {
  try {
    const commentsRef = collection(firestore, "guides", guideSlug, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const comments = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      });
    });

    return {
      success: true,
      comments,
    };
  } catch (error) {
    console.error("Failed to fetch guide comments:", error);
    return {
      success: false,
      message: "Failed to fetch guide comments",
      comments: [],
    };
  }
};

// Post Comments (new functions)
export const addPostComment = async (firestore, postSlug, commentData) => {
  try {
    const commentsRef = collection(firestore, "posts", postSlug, "comments");
    const newComment = {
      ...commentData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(commentsRef, newComment);
    return {
      success: true,
      id: docRef.id,
      comment: { ...newComment, id: docRef.id },
    };
  } catch (error) {
    console.error("Failed to add post comment:", error);
    return {
      success: false,
      message: "Failed to add post comment",
    };
  }
};

export const getPostComments = async (firestore, postSlug) => {
  try {
    const commentsRef = collection(firestore, "posts", postSlug, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const comments = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      });
    });

    return {
      success: true,
      comments,
    };
  } catch (error) {
    console.error("Failed to fetch post comments:", error);
    return {
      success: false,
      message: "Failed to fetch post comments",
      comments: [],
    };
  }
};
