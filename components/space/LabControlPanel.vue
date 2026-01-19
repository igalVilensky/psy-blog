<!-- components/space/LabControlPanel.vue -->
<template>
  <div class="mobile-controls lg:hidden fixed top-0 left-0 right-0 z-50">
    <!-- Mobile Header -->
    <div
      class="mobile-header bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-cyan-500/20 px-4 py-3 transition-colors duration-500">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-3 group" @click.native="closeMobileMenu">
          <div class="relative">
            <div
              class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-purple-400/30">
              <img src="/mindqlab-logo.png" alt="MindQLab Logo"
                class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div
              class="absolute -inset-1 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
          <span
            class="text-lg font-bold text-slate-900 dark:text-white font-montserrat tracking-tight group-hover:text-cyan-500 transition-colors">
            MindQLab
          </span>
        </NuxtLink>

        <div class="flex items-center space-x-2">
          <!-- Fullscreen Toggle Mobile -->
          <FullscreenToggle />

          <!-- Theme Toggle Mobile -->
          <button @click="themeStore.toggleTheme()"
            class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <i class="fas text-yellow-500 dark:text-yellow-400 transition-transform duration-300"
              :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
          </button>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMobileMenu"
            class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <i class="fas text-cyan-600 dark:text-cyan-400 transition-transform duration-300"
              :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay fixed inset-0 bg-black/50 z-40" @click="closeMobileMenu">
    </div>

    <!-- Mobile Menu Panel -->
    <div
      class="mobile-menu-panel fixed top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-cyan-500/20 z-50 transition-all duration-300 overflow-y-auto"
      :class="mobileMenuOpen ? 'max-h-[90%] opacity-100' : 'max-h-0 opacity-0'">
      <div class="p-4 space-y-4">
        <!-- Brand Section Mobile -->
        <NuxtLink to="/" class="sm:flex items-center space-x-3 group hidden" @click.native="closeMobileMenu">
          <div class="relative">
            <div
              class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-purple-400/30">
              <img src="/mindqlab-logo.png" alt="MindQLab Logo"
                class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div
              class="absolute -inset-1 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
          <span
            class="text-xl font-bold text-slate-900 dark:text-white font-montserrat tracking-tight group-hover:text-cyan-500 transition-colors">
            MindQLab
          </span>
        </NuxtLink>

        <!-- User Section Mobile (Moved to Top) -->
        <div class="user-section-mobile mb-4">
          <ClientOnly>
            <div v-if="user" class="space-y-4">
              <div
                class="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-cyan-500/10">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                  {{ getUserInitials(user) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[10px] font-mono text-cyan-600 dark:text-cyan-400/70 uppercase mb-0.5">
                    ПОЛЬЗОВАТЕЛЬ
                  </div>
                  <div class="text-slate-800 dark:text-white font-bold text-sm truncate">
                    {{ user.displayName || user.email }}
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <NuxtLink to="/profile"
                  class="text-center py-2.5 px-3 bg-white dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-medium transition-all border border-slate-200 dark:border-slate-600/50"
                  @click.native="closeMobileMenu">
                  Профиль
                </NuxtLink>
                <button @click="logout"
                  class="text-center py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 dark:text-red-400 text-xs font-medium transition-all border border-red-500/20">
                  Выход
                </button>
              </div>
            </div>
            <div v-else class="space-y-2">
              <NuxtLink to="/login"
                class="block w-full text-center py-3 px-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm font-medium transition-all border border-slate-200 dark:border-slate-700/50"
                @click.native="closeMobileMenu">
                Вход
              </NuxtLink>
              <NuxtLink to="/register"
                class="block w-full text-center py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-cyan-500/20"
                @click.native="closeMobileMenu">
                Регистрация
              </NuxtLink>
            </div>
          </ClientOnly>
        </div>

        <!-- Mobile Stations Grid -->
        <div class="grid grid-cols-2 gap-2">
          <MobileStationLink v-for="station in mobileStations" :key="station.to" :to="station.to" :icon="station.icon"
            :title="station.title" :subtitle="station.subtitle" :active="route.path === station.to"
            :gradient-from="station.gradientFrom" :gradient-to="station.gradientTo" @click="closeMobileMenu" />
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Sidebar -->
  <aside v-bind="$attrs"
    class="lab-control-panel hidden lg:flex flex-col bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-cyan-500/10 min-h-screen h-full transition-colors duration-500">

    <!-- Sticky Top Section (Header + Stations) -->
    <div
      class="sticky top-0 z-20 bg-white dark:bg-slate-900/95 backdrop-blur-sm border-b border-transparent dark:border-cyan-500/5">
      <!-- Brand Section -->
      <div class="brand-section px-6 pt-6 pb-4">
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <div
              class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-purple-400/30">
              <img src="/mindqlab-logo.png" alt="MindQLab Logo"
                class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div
              class="absolute -inset-1 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
          <span
            class="text-xl font-bold text-slate-900 dark:text-white font-montserrat tracking-tight group-hover:text-cyan-500 transition-colors">
            MindQLab
          </span>
        </NuxtLink>
      </div>

      <!-- User Section (Moved to Top) -->
      <div class="user-section px-6 pb-6 border-b border-slate-200 dark:border-cyan-500/20">
        <ClientOnly>
          <div v-if="user"
            class="user-info p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-cyan-500/10">
            <div class="flex items-center space-x-3 mb-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                {{ getUserInitials(user) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[10px] font-mono text-cyan-700 dark:text-cyan-400/70 mb-0.5 uppercase">
                  ПОЛЬЗОВАТЕЛЬ
                </div>
                <div class="text-slate-900 dark:text-white font-medium text-sm truncate">
                  {{ user.displayName || user.email }}
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <NuxtLink to="/profile"
                class="flex-1 text-center py-2 px-3 bg-white dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-medium transition-all border border-slate-200 dark:border-slate-600/50">
                Профиль
              </NuxtLink>
              <button @click="logout"
                class="flex-1 text-center py-2 px-3 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-xs font-medium transition-all border border-red-200 dark:border-red-500/20">
                Выход
              </button>
            </div>
          </div>
          <div v-else class="auth-buttons space-y-2">
            <NuxtLink to="/login"
              class="block w-full text-center py-3 px-4 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm font-medium transition-all border border-slate-200 dark:border-slate-700/50">
              Вход в систему
            </NuxtLink>
            <NuxtLink to="/register"
              class="block w-full text-center py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-cyan-500/20">
              Присоединиться
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>

      <!-- Research Stations -->
      <div class="research-stations p-4 space-y-2">
        <div class="text-xs font-mono text-slate-500 dark:text-slate-500 mb-3 px-2 font-semibold">
          РАЗДЕЛЫ MINDQLAB
        </div>

        <!-- Interactive Tests Station -->
        <StationLink to="/space/tests" icon="fa-brain" title="Тесты" subtitle="Оценка функций"
          :active="route.path === '/space/tests'" gradient-from="blue-500" gradient-to="indigo-600" />



        <!-- Brain Training Station -->
        <StationLink to="/space/brain-training" icon="fa-dumbbell" title="Тренировка Мозга" subtitle="Игры и упражнения"
          :active="route.path.startsWith('/space/brain-training')" gradient-from="cyan-500" gradient-to="purple-600" />

        <!-- Self Growth Station -->
        <StationLink to="/space/growth" icon="fa-seedling" title="Саморазвитие" subtitle="Инструменты"
          :active="route.path.startsWith('/space/growth')" gradient-from="green-500" gradient-to="teal-600" />

        <!-- Psychology Station -->
        <StationLink to="/space/psychology" icon="fa-book-open" title="Психология" subtitle="Теории и техники"
          :active="route.path === '/space/psychology'" gradient-from="purple-500" gradient-to="pink-600" />

        <!-- Meditation Station -->
        <StationLink to="/space/mindfulness" icon="fa-spa" title="Медитация" subtitle="Аудио и видео"
          :active="route.path === '/space/mindfulness'" gradient-from="teal-500" gradient-to="cyan-600" />



        <!-- Brain Map Station -->


        <!-- Neuro Analysis Station -->
        <StationLink to="/space/dashboard" icon="fa-microchip" title="Центр Управления" subtitle="Панель мониторинга"
          :active="route.path === '/space/dashboard'" gradient-from="cyan-500" gradient-to="blue-600" />




        <!-- Community Hub -->
        <StationLink to="/space/community" icon="fa-users" title="Сообщество" subtitle="Пользователи онлайн"
          :active="route.path === '/space/community'" gradient-from="orange-500" gradient-to="amber-600" />

        <!-- Coach Hub -->
        <StationLink v-if="auth.user?.isCoach" to="/coach" icon="fa-user-tie" title="Дашборд Коуча"
          subtitle="Управление клиентами" :active="route.path.startsWith('/coach')" gradient-from="amber-500"
          gradient-to="orange-600" />
      </div>
    </div>

    <!-- System Status -->
    <div class="system-status border-t border-slate-200 dark:border-cyan-500/10 p-4 bg-white dark:bg-slate-900 z-10">
      <div class="text-xs font-mono text-slate-500 dark:text-slate-500 mb-3 px-1 font-semibold">
        СТАТУС СИСТЕМЫ
      </div>
      <div class="space-y-2.5">
        <div
          class="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-emerald-500/20 dark:border-emerald-500/10">
          <span class="text-slate-700 dark:text-slate-300 text-xs flex items-center space-x-2">
            <i class="fas fa-network-wired text-emerald-600 dark:text-emerald-400 text-xs"></i>
            <span>Нейросеть</span>
          </span>
          <span class="text-emerald-700 dark:text-emerald-400 font-mono text-xs font-medium">
            ОНЛАЙН
          </span>
        </div>
        <div
          class="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-cyan-500/20 dark:border-cyan-500/10">
          <span class="text-slate-700 dark:text-slate-300 text-xs flex items-center space-x-2">
            <i class="fas fa-stream text-cyan-600 dark:text-cyan-400 text-xs"></i>
            <span>Поток данных</span>
          </span>
          <span class="text-cyan-700 dark:text-cyan-400 font-mono text-xs font-medium">
            АКТИВЕН
          </span>
        </div>
        <!-- Theme Toggle -->
        <button @click="themeStore.toggleTheme()"
          class="w-full flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-yellow-500/20 dark:border-yellow-500/10 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
          <span class="text-slate-700 dark:text-slate-300 text-xs flex items-center space-x-2">
            <i class="fas text-yellow-600 dark:text-yellow-400 text-xs transition-transform duration-300 group-hover:rotate-90"
              :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
            <span>Режим</span>
          </span>
          <span class="text-yellow-700 dark:text-yellow-400 font-mono text-xs font-medium">
            {{ themeStore.theme === "dark" ? "НОЧНОЙ" : "ДНЕВНОЙ" }}
          </span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";
import StationLink from "~/components/space/StationLink.vue";
import MobileStationLink from "~/components/space/MobileStationLink.vue";
import FullscreenToggle from "~/components/space/FullscreenToggle.vue";

const auth = useAuthStore();
const themeStore = useThemeStore();
const route = useRoute();

defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const brainPulsing = ref(false);
const mobileMenuOpen = ref(false);

// Mobile stations data for consistent rendering
const mobileStations = computed(() => {
  const stations = [
    {
      to: "/space/tests",
      icon: "fa-brain",
      title: "Тесты",
      subtitle: "Все категории",
      gradientFrom: "blue-500",
      gradientTo: "indigo-600",
    },

    {
      to: "/space/brain-training",
      icon: "fa-dumbbell",
      title: "Тренировка Мозга",
      subtitle: "Игры и упражнения",
      gradientFrom: "cyan-500",
      gradientTo: "purple-600",
    },
    {
      to: "/space/growth",
      icon: "fa-seedling",
      title: "Саморазвитие",
      subtitle: "Инструменты",
      gradientFrom: "green-500",
      gradientTo: "teal-600",
    },
    {
      to: "/space/psychology",
      icon: "fa-book-open",
      title: "Психология",
      subtitle: "Теории",
      gradientFrom: "purple-500",
      gradientTo: "pink-600",
    },
    {
      to: "/space/mindfulness",
      icon: "fa-spa",
      title: "Медитация",
      subtitle: "Аудио/видео",
      gradientFrom: "teal-500",
      gradientTo: "cyan-600",
    },


    {
      to: "/space/dashboard",
      icon: "fa-microchip",
      title: "Центр Управления",
      subtitle: "Мониторинг",
      gradientFrom: "cyan-500",
      gradientTo: "blue-600",
    },


    {
      to: "/space/community",
      icon: "fa-users",
      title: "Сообщество",
      subtitle: "Пользователи",
      gradientFrom: "orange-500",
      gradientTo: "amber-600",
    },
  ];

  if (auth.user?.isCoach) {
    stations.push({
      to: "/coach",
      icon: "fa-user-tie",
      title: "Панель Коуча",
      subtitle: "Клиенты",
      gradientFrom: "amber-500",
      gradientTo: "orange-600",
    });
  }

  return stations;
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Close mobile menu when route changes
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  }
);

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
  navigateTo("/space");
  closeMobileMenu();
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

.mobile-menu-panel {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
</style>
