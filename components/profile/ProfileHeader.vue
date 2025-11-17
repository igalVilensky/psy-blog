<template>
  <div class="profile-header-container">
    <!-- Animated Background -->
    <div class="header-background">
      <div class="gradient-orb gradient-orb-1"></div>
      <div class="gradient-orb gradient-orb-2"></div>
      <div class="neural-grid"></div>
    </div>

    <div class="header-content">
      <!-- Avatar Section -->
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <UserAvatar
            :avatarUrl="avatarUrl"
            :loading="loading"
            :userInitial="userInitial"
            @update:avatarUrl="$emit('update:avatarUrl', $event)"
            @notify="$emit('notify', $event)"
            class="avatar-component"
          />
        </div>
      </div>

      <!-- User Info & Actions -->
      <div class="info-section">
        <!-- User Details -->
        <div class="user-details">
          <div class="user-badge">
            <i class="fas fa-user-astronaut text-cyan-400 mr-2"></i>
            <span>Исследователь</span>
          </div>
          <h1 class="user-name">
            {{ displayName }}
          </h1>
          <div class="user-meta">
            <div class="meta-item">
              <i class="fas fa-envelope text-cyan-400"></i>
              <span>{{ email }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-calendar text-purple-400"></i>
              <span>{{ joinedDate }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <!-- Personal Cabinet - Primary Button -->
          <button class="action-btn btn-primary">
            <span class="btn-gradient"></span>
            <span class="btn-content">
              <i class="fas fa-user-cog mr-2"></i>
              <span class="hidden sm:inline">Личный кабинет</span>
              <span class="sm:hidden">Кабинет</span>
            </span>
          </button>

          <!-- Settings Button -->
          <NuxtLink to="/profile/settings" class="action-btn btn-secondary">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <i class="fas fa-cog"></i>
              <span class="hidden lg:inline ml-2">Настройки</span>
            </span>
          </NuxtLink>

          <!-- Logout Button -->
          <button @click="$emit('logout')" class="action-btn btn-danger">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <i class="fas fa-sign-out-alt"></i>
              <span class="hidden lg:inline ml-2">Выйти</span>
            </span>
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

<style scoped>
.profile-header-container {
  @apply relative min-h-[280px] sm:min-h-[300px] rounded-2xl 
         bg-slate-900/50 border border-cyan-500/20 backdrop-blur-sm 
         overflow-hidden mb-8 hover:border-cyan-500/30 transition-all duration-300;
}

.header-background {
  @apply absolute inset-0 pointer-events-none;
}

.gradient-orb {
  @apply absolute rounded-full blur-3xl opacity-30;
}

.gradient-orb-1 {
  @apply w-96 h-96 bg-cyan-500/20 top-0 -left-48 animate-float;
}

.gradient-orb-2 {
  @apply w-96 h-96 bg-purple-500/20 bottom-0 -right-48 animate-float-delayed;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(20px, -20px);
  }
  66% {
    transform: translate(-10px, 10px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-15px, 15px);
  }
  66% {
    transform: translate(10px, -10px);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 25s ease-in-out infinite;
  animation-delay: 2s;
}

.neural-grid {
  @apply absolute inset-0 opacity-5;
  background-image: linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
}

.header-content {
  @apply relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center lg:items-start;
}

.avatar-section {
  @apply flex justify-center lg:justify-start;
}

.avatar-wrapper {
  @apply relative;
}

.avatar-component {
  @apply w-40 h-40 sm:w-48 sm:h-48 rounded-full
         transition-all duration-500 hover:scale-105
         hover:shadow-2xl hover:shadow-cyan-500/20;
}

.info-section {
  @apply flex-1 flex flex-col gap-6;
}

.user-details {
  @apply text-center lg:text-left;
}

.user-badge {
  @apply inline-flex items-center px-4 py-2 rounded-xl 
         bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 
         text-sm font-medium mb-4;
}

.user-name {
  @apply text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 pb-1 
         bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
         bg-clip-text text-transparent;
}

.user-meta {
  @apply flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 
         text-slate-400 text-sm;
}

.meta-item {
  @apply flex items-center gap-2;
}

.action-buttons {
  @apply flex flex-wrap items-center justify-center lg:justify-start gap-3;
}

.action-btn {
  @apply relative px-6 py-3 rounded-xl font-medium overflow-hidden 
         transition-all duration-300 hover:scale-105 
         flex items-center justify-center;
}

.btn-gradient,
.btn-bg {
  @apply absolute inset-0 transition-transform duration-300;
}

.action-btn:hover .btn-gradient,
.action-btn:hover .btn-bg {
  @apply scale-110;
}

.btn-content {
  @apply relative z-10 flex items-center;
}

.btn-primary {
  @apply text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40;
}

.btn-primary .btn-gradient {
  @apply bg-gradient-to-r from-cyan-500 to-purple-500;
}

.btn-secondary {
  @apply border border-slate-700 text-slate-300 hover:text-white 
         hover:border-cyan-500/50;
}

.btn-secondary .btn-bg {
  @apply bg-slate-800/50 hover:bg-slate-800;
}

.btn-danger {
  @apply border border-red-500/30 text-red-400 hover:text-white 
         hover:border-red-500/50;
}

.btn-danger .btn-bg {
  @apply bg-red-500/10 hover:bg-red-500/20;
}

@media (max-width: 640px) {
  .profile-header-container {
    @apply min-h-[350px];
  }

  .header-content {
    @apply p-4;
  }

  .avatar-component {
    @apply w-32 h-32;
  }

  .user-name {
    @apply text-2xl;
  }

  .action-btn {
    @apply px-4 py-2 text-sm;
  }
}
</style>
