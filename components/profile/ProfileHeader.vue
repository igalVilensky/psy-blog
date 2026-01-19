<template>
  <div class="profile-header-hero relative pt-12 pb-20 md:pb-32">
    <!-- Coach Background (Clean) -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <!-- Removed soft orbs, keeping it clean as per coach style -->
    </div>

    <div
      class="header-content relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start text-center lg:text-left">
      <!-- Avatar Section -->
      <div class="avatar-section overflow-visible">
        <div class="avatar-wrapper relative overflow-visible">
          <UserAvatar :avatarUrl="avatarUrl" :loading="loading" :userInitial="userInitial"
            @update:avatarUrl="$emit('update:avatarUrl', $event)" @notify="$emit('notify', $event)"
            class="avatar-component w-48 h-48 md:w-64 md:h-64 shadow-2xl shadow-stone-200/50 dark:shadow-none" />
          <div
            class="absolute -bottom-4 -right-4 w-12 h-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center shadow-lg">
            <i class="fas fa-check-circle text-emerald-600 text-xl"></i>
          </div>
        </div>
      </div>

      <!-- User Info & Actions -->
      <div class="info-section flex-1 py-4">
        <div class="user-details">
          <!-- User Status Badge -->
          <div
            class="mb-6 inline-flex items-center px-4 py-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <div class="w-1.5 h-1.5 bg-emerald-600 mr-2"></div>
            <span class="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest">Исследователь
              Сознания</span>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6 uppercase tracking-tight">
            {{ displayName }}
          </h1>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-stone-600 dark:text-stone-400 text-sm mb-10 font-medium">
            <div class="flex items-center gap-3 group">
              <div
                class="w-8 h-8 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-white">
                <i class="fas fa-envelope text-xs"></i>
              </div>
              <span class="uppercase tracking-wide">{{ email }}</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-900 dark:text-white">
                <i class="fas fa-calendar-day text-xs"></i>
              </div>
              <span class="uppercase tracking-wide">В системе с {{ joinedDate }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons flex flex-wrap items-center justify-center lg:justify-start gap-4">
          <NuxtLink to="/personal-cabinet" class="action-btn-new primary">
            <i class="fas fa-layer-group text-xs mr-3"></i>
            <span>Кабинет</span>
          </NuxtLink>

          <NuxtLink to="/profile/settings" class="action-btn-new secondary">
            <i class="fas fa-sliders-h text-xs mr-3"></i>
            <span>Настройки</span>
          </NuxtLink>

          <button @click="$emit('logout')" class="action-btn-new danger">
            <i class="fas fa-power-off text-xs mr-3"></i>
            <span>Выход</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import UserAvatar from "~/components/profile/UserAvatar.vue";

// Define props
const props = defineProps({
  avatarUrl: {
    type: String,
    default: null,
    description: "URL of the user's avatar image",
  },
  loading: {
    type: Boolean,
    default: false,
    description: "Indicates if the avatar or user data is still loading",
  },
  displayName: {
    type: String,
    required: true,
    description: "User's display name to be shown in the header",
  },
  email: {
    type: String,
    required: true,
    description: "User's email address to be displayed",
  },
  userInitial: {
    type: String,
    default: "",
    description:
      "Initial letter of the user's display name for the avatar fallback",
  },
});

// Define emits
defineEmits(["update:avatarUrl", "logout", "notify"]);

// Computed property for joined date (you can make this dynamic later)
const joinedDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("ru-RU", { month: "short", year: "numeric" });
});
</script>

<style lang="postcss" scoped>
.profile-header-hero {
  @apply mb-12 transition-all duration-500;
}

.action-btn-new {
  @apply px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center border;
}

.action-btn-new.primary {
  @apply bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900 dark:border-white hover:bg-stone-800 dark:hover:bg-stone-200;
}

.action-btn-new.secondary {
  @apply bg-transparent border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-800;
}

.action-btn-new.danger {
  @apply bg-transparent border-transparent text-stone-500 hover:text-red-600 px-6;
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-20px, 20px);
  }
}

@keyframes slow-float {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -20px);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 20s ease-in-out infinite;
}

@media (max-width: 640px) {
  .profile-header-hero {
    @apply pt-8 pb-12;
  }

  .avatar-component {
    @apply w-44 h-44;
  }

  .action-btn-new {
    @apply flex-1 px-4 py-3 text-xs min-w-[120px];
  }
}
</style>
