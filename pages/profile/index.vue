<template>
  <div class="relative" :style="{ minHeight: 'calc(100vh - 250px)' }">
    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <div class="flex items-center justify-center min-h-[calc(100vh-250px)]">
        <div class="text-center">
          <div class="flex flex-col items-center gap-4">
            <!-- Spinner Icon -->
            <i
              class="fas fa-spinner fa-spin fa-2x bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]"
            ></i>
            <!-- Loading Text -->
            <p
              class="text-slate-300 text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]"
            >
              {{
                authStore.user
                  ? `Перенаправление на ваш профиль...`
                  : "Пожалуйста, подождите..."
              }}
            </p>
          </div>
        </div>
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
