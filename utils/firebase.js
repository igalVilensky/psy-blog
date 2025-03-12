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
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};
