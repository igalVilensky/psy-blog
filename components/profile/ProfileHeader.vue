<template>
  <div class="profile-header-hero relative pt-12 pb-20 md:pb-32 overflow-hidden">
    <!-- Calm Motion Background -->
    <div class="absolute inset-0 z-0 overflow-hidden opacity-40 dark:opacity-20 pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-mindqlab-calm-accent/10 rounded-full blur-[100px] animate-float">
      </div>
      <div
        class="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-mindqlab-calm-accent-secondary/10 rounded-full blur-[120px] animate-slow-float">
      </div>
    </div>

    <div
      class="header-content relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start text-center lg:text-left">
      <!-- Avatar Section -->
      <div class="avatar-section">
        <div class="avatar-wrapper relative">
          <UserAvatar :avatarUrl="avatarUrl" :loading="loading" :userInitial="userInitial"
            @update:avatarUrl="$emit('update:avatarUrl', $event)" @notify="$emit('notify', $event)"
            class="avatar-component w-48 h-48 md:w-64 md:h-64 rounded-[3rem] shadow-2xl shadow-stone-200/50 dark:shadow-none" />
          <div
            class="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-center shadow-lg transform rotate-12">
            <i class="fas fa-check-circle text-mindqlab-calm-accent text-xl"></i>
          </div>
        </div>
      </div>

      <!-- User Info & Actions -->
      <div class="info-section flex-1 py-4">
        <div class="user-details">
          <!-- User Status Badge -->
          <div
            class="mb-8 inline-flex items-center px-5 py-2 rounded-full bg-white/50 dark:bg-stone-900/30 border border-stone-100 dark:border-stone-800/50 backdrop-blur-sm shadow-sm transition-transform hover:scale-105">
            <div class="w-1.5 h-1.5 rounded-full bg-mindqlab-calm-accent mr-3 animate-pulse"></div>
            <span
              class="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]">Исследователь
              Сознания</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-light text-stone-900 dark:text-white mb-8 tracking-tighter leading-none">
            {{ displayName }}
          </h1>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 text-stone-500 dark:text-stone-400 font-light italic text-base mb-12">
            <div class="flex items-center gap-3 group translate-z-0">
              <div
                class="w-8 h-8 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center text-mindqlab-calm-accent opacity-70 group-hover:opacity-100 transition-all">
                <i class="fas fa-envelope text-xs"></i>
              </div>
              <span class="group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors">{{ email
                }}</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center text-stone-400">
                <i class="fas fa-calendar-day text-xs"></i>
              </div>
              <span>В системе с {{ joinedDate }}</span>
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
  @apply px-8 py-4 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center shadow-sm;
}

.action-btn-new.primary {
  @apply bg-mindqlab-calm-accent text-white hover:bg-opacity-90 hover:shadow-lg hover:shadow-mindqlab-calm-accent/20 hover:-translate-y-0.5;
}

.action-btn-new.secondary {
  @apply bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-mindqlab-calm-accent hover:text-mindqlab-calm-accent;
}

.action-btn-new.danger {
  @apply bg-transparent text-stone-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-6;
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
    @apply w-44 h-44 rounded-[2.5rem];
  }

  .action-btn-new {
    @apply flex-1 px-4 py-3 text-xs min-w-[120px];
  }
}
</style>
