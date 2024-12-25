// utils/firebase.js
import { useNuxtApp } from "#app"; // Import Nuxt's app context
import { doc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions

// Use Nuxt to access firestore
export const getUserProfile = async (userId) => {
  const nuxtApp = useNuxtApp();
  const firestore = nuxtApp.$firestore; // Get Firestore instance from Nuxt context

  try {
    const userDocRef = doc(firestore, "users", userId); // Access user document in Firestore
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data(); // Return user data if document exists
    } else {
      console.log("No such document!");
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error; // Rethrow the error to handle it later if necessary
  }
};
