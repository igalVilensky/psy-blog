// plugins/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Firebase configuration from environment variables
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  };

  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);

  // Initialize services
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // Analytics (client only)
  let analytics = null;
  if (process.client) {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        nuxtApp.provide("analytics", analytics);
      }
    });

    // Set Auth persistence (client only)
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Ошибка установки persistence:", error);
    });
  }

  // Current user ID ref
  const userId = ref(null);

  // Track auth state changes (client only)
  if (process.client) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userId.value = user.uid;
        // console.log("Пользователь вошёл:", userId.value);
      } else {
        userId.value = null;
        // console.log("Пользователь вышел");
      }
    });
  }

  // Provide services via Nuxt
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("userId", () => userId.value);
});

// Optional Firestore composable
export const useFirestore = () => {
  if (!process.client) return null; // SSR-safe guard
  const { $firestore } = useNuxtApp();
  return $firestore;
};
