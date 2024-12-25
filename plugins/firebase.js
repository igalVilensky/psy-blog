import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore Database

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBDAcXz1bPfNsZABO3IEGJALknCshuwFTo",
  authDomain: "psy-blog-2e076.firebaseapp.com",
  projectId: "psy-blog-2e076",
  storageBucket: "psy-blog-2e076.firebasestorage.app",
  messagingSenderId: "692633026576",
  appId: "1:692633026576:web:35c000a35f47ee391b8a95",
  measurementId: "G-0R4CT7M1RY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (authentication, firestore)
const auth = getAuth(app);
const firestore = getFirestore(app);

// This is where we return Firebase services
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("auth", auth); // Provide Firebase Auth
  nuxtApp.provide("firestore", firestore); // Provide Firestore
});
