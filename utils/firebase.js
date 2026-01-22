// utils/firebase.js
import { useNuxtApp } from "#app"; // Import Nuxt's app context
import { doc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions

export const getUserProfile = async (userId) => {
  const nuxtApp = useNuxtApp();
  const firestore = nuxtApp.$firestore;

  if (!firestore) {
    console.error("Firestore is not initialized");
    return null;
  }

  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId, data) => {
  const nuxtApp = useNuxtApp();
  const firestore = nuxtApp.$firestore;

  if (!firestore) {
    console.error("Firestore is not initialized");
    return false;
  }

  try {
    const userDocRef = doc(firestore, "users", userId);
    // Use setDoc with merge: true to update or create if not exists, 
    // but here we assume the user exists so updateDoc or setDoc with merge is fine.
    // We'll import setDoc to be safe if we want to create fields.
    const { setDoc } = await import("firebase/firestore");
    await setDoc(userDocRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};
