// plugins/initAuth.js
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  // Don't await authStore.initAuth() here to avoid blocking the initial page render.
  // This significantly improves the Time to Interactive (TTI) and First Contentful Paint (FCP).
  authStore.initAuth();
});
