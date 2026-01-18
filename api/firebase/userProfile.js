// api/firebase/userProfile.js
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  sendEmailVerification,
} from "firebase/auth";

// Fetch user avatar URL
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

// Update user avatar URL
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

// Register a new user
export const registerUser = async (email, password, displayName, additionalData = {}) => {
  const auth = getAuth();
  const db = getFirestore();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: displayName });

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: displayName,
      createdAt: new Date(),
      acceptedPrivacyPolicy: true,
      acceptedTerms: true,
      ...additionalData
    });

    await sendEmailVerification(user);

    return {
      success: true,
      message: "User registered successfully",
      user: user, // Add the user object to the response
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: error.message };
  }
};

// Fetch user data from Firestore
export const fetchUserData = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Update user data in Firestore
export const updateUserData = async (userId, data) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, data);
    return { success: true, message: "User data updated successfully" };
  } catch (error) {
    console.error("Error updating user data:", error);
    return { success: false, message: "Failed to update user data" };
  }
};

// Delete user account
export const deleteUserAccount = async (userId) => {
  const auth = getAuth();
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    const currentUser = auth.currentUser;

    // Delete user from Firebase Auth
    await deleteUser(currentUser);

    // Delete user document from Firestore
    await deleteDoc(userRef);

    return { success: true, message: "User account deleted successfully" };
  } catch (error) {
    console.error("Error deleting user account:", error);
    return { success: false, message: "Failed to delete user account" };
  }
};
