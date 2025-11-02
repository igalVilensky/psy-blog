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

  // Конфигурация Firebase из environment variables
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  };

  // Инициализация Firebase
  const app = initializeApp(firebaseConfig);

  // Инициализация сервисов
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // Установка persistence для Auth
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Ошибка установки persistence:", error);
  });

  // Инициализация Analytics (только на клиенте)
  let analytics = null;
  if (typeof window !== "undefined" && isSupported()) {
    analytics = getAnalytics(app);
  }

  // Переменная для хранения текущего userId
  let userId = ref(null);

  // Отслеживание состояния аутентификации
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid;
      console.log("Пользователь вошёл:", userId.value);
    } else {
      userId.value = null;
      console.log("Пользователь вышел");
    }
  });

  // Предоставляем сервисы и userId через Nuxt
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("userId", () => userId.value);

  // Analytics только на клиенте
  if (analytics) {
    nuxtApp.provide("analytics", analytics);
  }
});

// Экспорт Firestore как утилита (опционально)
export const useFirestore = () => {
  const { $firestore } = useNuxtApp();
  return $firestore;
};
