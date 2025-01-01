// api/firebase/userProfile.js
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

export const fetchUserAvatarUrl = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().avatarUrl || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return null;
  }
};

export const updateUserAvatarUrl = async (userId, newAvatarUrl) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  try {
    // Update Firebase Auth profile
    await updateProfile(currentUser, {
      photoURL: newAvatarUrl,
    });

    // Update Firestore document
    await updateDoc(userRef, { avatarUrl: newAvatarUrl });

    return { success: true, message: "Avatar URL updated successfully" };
  } catch (error) {
    console.error("Error updating user avatar:", error);
    return { success: false, message: "Failed to update avatar URL" };
  }
};
