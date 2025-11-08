// ~/utils/users.js
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "~/plugins/firebase";

/**
 * Get Firestore instance (client-only)
 */
const getClientFirestore = () => {
  if (!process.client) return null;
  return useFirestore();
};

/**
 * Fetch all users from Firestore
 */
export const getUsers = async () => {
  const firestore = getClientFirestore();
  if (!firestore) {
    console.warn("Firestore is not available on the server.");
    return []; // SSR-safe fallback
  }

  try {
    const usersRef = collection(firestore, "users");
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // fallback
  }
};
