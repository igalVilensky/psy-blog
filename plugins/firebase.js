// plugins/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth"; // Добавляем onAuthStateChanged для отслеживания состояния
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDAcXz1bPfNsZABO3IEGJALknCshuwFTo",
  authDomain: "psy-blog-2e076.firebaseapp.com",
  projectId: "psy-blog-2e076",
  storageBucket: "psy-blog-2e076.appspot.com",
  messagingSenderId: "692633026576",
  appId: "1:692633026576:web:35c000a35f47ee391b8a95",
  measurementId: "G-0R4CT7M1RY",
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

// Экспорт Firestore как утилита (опционально)
export const useFirestore = () => firestore;

export default defineNuxtPlugin((nuxtApp) => {
  // Переменная для хранения текущего userId
  let userId = ref(null);

  // Отслеживание состояния аутентификации
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid; // Обновляем userId, если пользователь вошёл
      console.log("Пользователь вошёл:", userId.value);
    } else {
      userId.value = null; // Сбрасываем, если пользователь вышел
      console.log("Пользователь вышел");
    }
  });

  // Предоставляем сервисы и userId через Nuxt
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("firestore", firestore);
  nuxtApp.provide("userId", () => userId.value); // Динамический доступ к userId

  // Analytics только на клиенте
  if (analytics) {
    nuxtApp.provide("analytics", analytics);
  }
});
