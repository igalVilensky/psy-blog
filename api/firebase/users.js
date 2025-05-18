import { useFirestore } from "~/plugins/firebase";
import { collection, getDocs } from "firebase/firestore";

// Initialize Firestore
const firestore = useFirestore();

// Fetch all users from the users collection
export const getUsers = async () => {
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
    throw error;
  }
};
