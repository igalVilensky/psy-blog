<template>
  <div class="relative" :style="{ minHeight: 'calc(100vh - 250px)' }">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Enhanced Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift opacity-60"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse opacity-40"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float opacity-50"
        ></div>
      </div>
    </div>

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
