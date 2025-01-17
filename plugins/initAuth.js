// plugins/initAuth.js
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  await authStore.initAuth(); // Wait for auth initialization to complete
});
