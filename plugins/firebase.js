// plugins/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics"; // Optional (if you're using analytics)

// Your Firebase configuration
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
const auth = getAuth(app); // Initialize Auth
const firestore = getFirestore(app); // Initialize Firestore

// Optionally, you can initialize Analytics if needed
const analytics = getAnalytics(app);

// Export Firebase services for use in your app
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("auth", auth); // Provide auth
  nuxtApp.provide("analytics", analytics);
});
