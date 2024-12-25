// plugins/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"; // Import setPersistence and persistence modes
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics, isSupported } from "firebase/analytics"; // Optional (if you're using analytics)

const firebaseConfig = {
  apiKey: "AIzaSyBDAcXz1bPfNsZABO3IEGJALknCshuwFTo",
  authDomain: "psy-blog-2e076.firebaseapp.com",
  projectId: "psy-blog-2e076",
  storageBucket: "psy-blog-2e076.appspot.com",
  messagingSenderId: "692633026576",
  appId: "1:692633026576:web:35c000a35f47ee391b8a95",
  measurementId: "G-0R4CT7M1RY",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Set persistence for Firebase Auth (use localStorage for persistence)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set persistence:", error);
});

// Initialize Firebase Analytics only if it's supported (client-side check)
let analytics = null;
if (typeof window !== "undefined" && isSupported()) {
  analytics = getAnalytics(app);
}
export const useFirestore = () => firestore;
// Export Firebase services for use in your app
export default defineNuxtPlugin((nuxtApp) => {
  // Provide Firebase services to the app
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("firestore", firestore);

  // Only provide analytics on the client-side
  if (analytics) {
    nuxtApp.provide("analytics", analytics);
  }
});
