<!-- components/lab/LabControlPanel.vue -->
<template>
  <aside
    class="lab-control-panel bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-cyan-500/10 h-screen sticky top-0 overflow-y-auto"
  >
    <!-- Panel Header -->
    <div class="panel-header border-b border-cyan-500/20 p-6">
      <div class="flex items-center space-x-3 mb-4">
        <div class="relative">
          <div
            class="w-2 h-2 bg-cyan-400 rounded-full"
            :class="{ 'animate-pulse': systemActive }"
          ></div>
          <div
            v-if="systemActive"
            class="absolute inset-0 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping"
          ></div>
        </div>
        <h3 class="text-xs font-mono text-cyan-300 tracking-widest">
          СИСТЕМА АКТИВНА
        </h3>
      </div>

      <!-- Lab Logo -->
      <NuxtLink to="/lab" class="lab-logo group block">
        <div
          class="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-cyan-500/10 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all duration-300"
        >
          <div
            class="petri-dish w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden"
            @mouseenter="startBrainPulse"
            @mouseleave="stopBrainPulse"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20"
            ></div>
            <i
              class="fas fa-brain text-white text-xl relative z-10 transition-transform duration-300"
              :class="{ 'scale-110': brainPulsing }"
            ></i>
            <div
              v-if="brainPulsing"
              class="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-ping"
            ></div>
          </div>
          <div>
            <div class="text-white font-bold text-lg font-montserrat">
              MIND Q LAB
            </div>
            <div class="text-cyan-400/70 text-xs font-mono">
              v2.0 ЭКСПЕРИМЕНТАЛЬНАЯ
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Research Stations -->
    <div class="research-stations p-4 space-y-3">
      <div class="text-xs font-mono text-slate-500 mb-3 px-2">
        ИССЛЕДОВАТЕЛЬСКИЕ СТАНЦИИ
      </div>

      <!-- Neuro Analysis Station -->
      <NuxtLink
        to="/lab/dashboard"
        class="station group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
        :class="
          route.path === '/lab/dashboard'
            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
            : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/50 hover:border-cyan-500/20'
        "
        @mouseenter="hoverStation = 'dashboard'"
        @mouseleave="hoverStation = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div
          class="instrument-icon w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative z-10 transition-transform duration-300"
          :class="{ 'scale-110': hoverStation === 'dashboard' }"
        >
          <i class="fas fa-brain-circuit text-white"></i>
        </div>
        <div class="flex-1 relative z-10">
          <div class="text-white font-medium text-sm">Нейро Анализ</div>
          <div class="text-slate-400 text-xs">Картирование мозга</div>
        </div>
        <div
          v-if="route.path === '/lab/dashboard'"
          class="activity-pulse w-2 h-2 bg-cyan-400 rounded-full animate-pulse relative z-10"
        ></div>
      </NuxtLink>

      <!-- Experiments Station -->
      <NuxtLink
        to="/lab/experiments"
        class="station group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
        :class="
          route.path === '/lab/experiments'
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 shadow-lg shadow-purple-500/10'
            : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/50 hover:border-purple-500/20'
        "
        @mouseenter="hoverStation = 'experiments'"
        @mouseleave="hoverStation = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div
          class="instrument-icon w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center relative z-10 transition-transform duration-300"
          :class="{ 'scale-110': hoverStation === 'experiments' }"
        >
          <i class="fas fa-atom text-white"></i>
        </div>
        <div class="flex-1 relative z-10">
          <div class="text-white font-medium text-sm">Эксперименты</div>
          <div class="text-slate-400 text-xs">Инструменты и тесты</div>
        </div>
        <div
          v-if="route.path === '/lab/experiments'"
          class="activity-pulse w-2 h-2 bg-purple-400 rounded-full animate-pulse relative z-10"
        ></div>
      </NuxtLink>

      <!-- Growth Observatory -->
      <NuxtLink
        to="/lab/analysis"
        class="station group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
        :class="
          route.path === '/lab/analysis'
            ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/50 hover:border-emerald-500/20'
        "
        @mouseenter="hoverStation = 'analysis'"
        @mouseleave="hoverStation = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div
          class="instrument-icon w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center relative z-10 transition-transform duration-300"
          :class="{ 'scale-110': hoverStation === 'analysis' }"
        >
          <i class="fas fa-chart-network text-white"></i>
        </div>
        <div class="flex-1 relative z-10">
          <div class="text-white font-medium text-sm">Обсерватория Роста</div>
          <div class="text-slate-400 text-xs">Прогресс и аналитика</div>
        </div>
        <div
          v-if="route.path === '/lab/analysis'"
          class="activity-pulse w-2 h-2 bg-emerald-400 rounded-full animate-pulse relative z-10"
        ></div>
      </NuxtLink>

      <!-- Community Hub -->
      <NuxtLink
        to="/lab/community"
        class="station group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 relative overflow-hidden"
        :class="
          route.path === '/lab/community'
            ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 shadow-lg shadow-orange-500/10'
            : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/50 hover:border-orange-500/20'
        "
        @mouseenter="hoverStation = 'community'"
        @mouseleave="hoverStation = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div
          class="instrument-icon w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center relative z-10 transition-transform duration-300"
          :class="{ 'scale-110': hoverStation === 'community' }"
        >
          <i class="fas fa-users text-white"></i>
        </div>
        <div class="flex-1 relative z-10">
          <div class="text-white font-medium text-sm">Сообщество</div>
          <div class="text-slate-400 text-xs">Исследователи онлайн</div>
        </div>
        <div
          v-if="route.path === '/lab/community'"
          class="activity-pulse w-2 h-2 bg-orange-400 rounded-full animate-pulse relative z-10"
        ></div>
      </NuxtLink>
    </div>

    <!-- User Section -->
    <div class="user-section border-t border-cyan-500/10 p-4 mt-4">
      <div
        v-if="user"
        class="user-info p-4 rounded-xl bg-slate-800/50 border border-cyan-500/10"
      >
        <div class="flex items-center space-x-3 mb-3">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold"
          >
            {{ getUserInitials(user) }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-mono text-cyan-400/70 mb-0.5">
              ИССЛЕДОВАТЕЛЬ
            </div>
            <div class="text-white font-medium text-sm truncate">
              {{ user.displayName || user.email }}
            </div>
          </div>
        </div>
        <div class="flex space-x-2">
          <NuxtLink
            to="/lab/profile"
            class="flex-1 text-center py-2.5 px-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 text-xs font-medium transition-all border border-slate-600/50"
          >
            Профиль
          </NuxtLink>
          <button
            @click="logout"
            class="flex-1 text-center py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 text-xs font-medium transition-all border border-red-500/20"
          >
            Выход
          </button>
        </div>
      </div>
      <div v-else class="auth-buttons space-y-2">
        <NuxtLink
          to="/login"
          class="block w-full text-center py-3 px-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-slate-300 text-sm font-medium transition-all border border-slate-700/50"
        >
          Вход для исследователей
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="block w-full text-center py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-cyan-500/20"
        >
          Присоединиться
        </NuxtLink>
      </div>
    </div>

    <!-- System Status -->
    <div class="system-status border-t border-cyan-500/10 p-4 mt-2">
      <div class="text-xs font-mono text-slate-500 mb-3 px-1">
        СТАТУС СИСТЕМЫ
      </div>
      <div class="space-y-2.5">
        <div
          class="flex justify-between items-center p-2 rounded-lg bg-slate-800/30 border border-emerald-500/10"
        >
          <span class="text-slate-300 text-xs flex items-center space-x-2">
            <i class="fas fa-network-wired text-emerald-400 text-xs"></i>
            <span>Нейросеть</span>
          </span>
          <span class="text-emerald-400 font-mono text-xs font-medium">
            ОНЛАЙН
          </span>
        </div>
        <div
          class="flex justify-between items-center p-2 rounded-lg bg-slate-800/30 border border-cyan-500/10"
        >
          <span class="text-slate-300 text-xs flex items-center space-x-2">
            <i class="fas fa-stream text-cyan-400 text-xs"></i>
            <span>Поток данных</span>
          </span>
          <span class="text-cyan-400 font-mono text-xs font-medium">
            АКТИВЕН
          </span>
        </div>
        <div
          class="flex justify-between items-center p-2 rounded-lg bg-slate-800/30 border border-purple-500/10"
        >
          <span class="text-slate-300 text-xs flex items-center space-x-2">
            <i class="fas fa-shield-halved text-purple-400 text-xs"></i>
            <span>Безопасность</span>
          </span>
          <span class="text-purple-400 font-mono text-xs font-medium">
            ЗАЩИЩЕНО
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const route = useRoute();

defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const systemActive = ref(true);
const brainPulsing = ref(false);
const hoverStation = ref(null);

const startBrainPulse = () => {
  brainPulsing.value = true;
};

const stopBrainPulse = () => {
  brainPulsing.value = false;
};

const getUserInitials = (user) => {
  if (user.displayName) {
    return user.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return user.email ? user.email[0].toUpperCase() : "У";
};

const logout = async () => {
  await auth.logout();
  navigateTo("/lab");
};
</script>

<style scoped>
.lab-control-panel {
  scrollbar-width: thin;
  scrollbar-color: rgba(6, 182, 212, 0.3) transparent;
}

.lab-control-panel::-webkit-scrollbar {
  width: 6px;
}

.lab-control-panel::-webkit-scrollbar-track {
  background: transparent;
}

.lab-control-panel::-webkit-scrollbar-thumb {
  background-color: rgba(6, 182, 212, 0.3);
  border-radius: 3px;
}

.lab-control-panel::-webkit-scrollbar-thumb:hover {
  background-color: rgba(6, 182, 212, 0.5);
}
</style>
