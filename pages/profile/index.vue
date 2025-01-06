<template>
  <div
    class="flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-white"
    :style="{ minHeight: 'calc(100vh - 250px)' }"
  >
    <div class="text-center">
      <div class="flex flex-col items-center gap-4">
        <i class="fas fa-spinner fa-spin fa-2x text-pink-500"></i>
        <p class="text-gray-600 text-lg">
          {{
            authStore.user
              ? `Перенаправление на ваш профиль...`
              : "Пожалуйста, подождите..."
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initAuth(); // Wait for auth to initialize

  if (authStore.user && authStore.user.displayName) {
    // Replace spaces with dashes or remove them
    const formattedUsername = authStore.user.displayName.replace(/\s/g, "-"); // or .replace(/\s/g, '') for no spaces
    router.push(`/profile/${formattedUsername}`);
  } else {
    // Redirect to login if no user is logged in
    router.push("/login");
  }
});
</script>
