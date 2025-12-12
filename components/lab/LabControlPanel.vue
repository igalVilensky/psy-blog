<!-- components/lab/LabControlPanel.vue -->
<template>
  <div class="mobile-controls lg:hidden fixed top-0 left-0 right-0 z-50">
    <!-- Mobile Header -->
    <div
      class="mobile-header bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-cyan-500/20 px-4 py-3 transition-colors duration-500">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center space-x-3 group" @click.native="closeMobileMenu">
          <div class="relative">
            <div
              class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-purple-400/30">
              <img src="/mindqlab-logo.png" alt="MindQLab Logo"
                class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div
              class="absolute -inset-1 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
          <div>
            <div
              class="text-xs font-mono text-slate-600 dark:text-cyan-400 tracking-widest group-hover:text-slate-800 dark:group-hover:text-cyan-300 transition-colors font-semibold">
              ГЛАВНАЯ
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">mindqlab.com</div>
          </div>
        </NuxtLink>

        <div class="flex items-center">
          <!-- Theme Toggle Mobile -->
          <button @click="themeStore.toggleTheme()"
            class="p-2 mr-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <i class="fas text-yellow-500 dark:text-yellow-400 transition-transform duration-300"
              :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
          </button>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMobileMenu"
            class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
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
        <!-- Lab Logo Mobile -->
        <NuxtLink to="/lab" class="lab-logo-mobile group block" @click.native="closeMobileMenu">
          <div
            class="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-all">
            <div
              class="petri-dish w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20"></div>
              <i class="fas fa-brain text-white text-lg relative z-10"></i>
            </div>
            <div>
              <div class="text-slate-800 dark:text-white font-bold text-base font-montserrat">
                MIND Q LAB
              </div>
              <div class="text-cyan-600 dark:text-cyan-400/70 text-xs font-mono">
                v2.0 ЭКСПЕРИМЕНТАЛЬНАЯ
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Mobile Stations Grid -->
        <div class="grid grid-cols-2 gap-2">
          <MobileStationLink v-for="station in mobileStations" :key="station.to" :to="station.to" :icon="station.icon"
            :title="station.title" :subtitle="station.subtitle" :active="route.path === station.to"
            :gradient-from="station.gradientFrom" :gradient-to="station.gradientTo" @click="closeMobileMenu" />
        </div>

        <!-- User Section Mobile -->
        <div class="user-section-mobile pt-4 border-t border-slate-200 dark:border-cyan-500/10">
          <ClientOnly>
            <div v-if="user" class="space-y-2">
              <div class="flex items-center space-x-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/30">
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {{ getUserInitials(user) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-slate-800 dark:text-white font-medium text-sm truncate">
                    {{ user.displayName || user.email }}
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <NuxtLink to="/profile"
                  class="text-center py-2 px-3 bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-medium transition-all border border-slate-300/50 dark:border-slate-600/50"
                  @click.native="closeMobileMenu">
                  Профиль
                </NuxtLink>
                <button @click="logout"
                  class="text-center py-2 px-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 dark:text-red-400 text-xs font-medium transition-all border border-red-500/20">
                  Выход
                </button>
              </div>
            </div>
            <div v-else class="space-y-2">
              <NuxtLink to="/login"
                class="block w-full text-center py-2.5 px-3 bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-sm font-medium transition-all border border-slate-300/50 dark:border-slate-700/50"
                @click.native="closeMobileMenu">
                Вход
              </NuxtLink>
              <NuxtLink to="/register"
                class="block w-full text-center py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all"
                @click.native="closeMobileMenu">
                Регистрация
              </NuxtLink>
            </div>
          </ClientOnly>
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
      <!-- Panel Header -->
      <div class="panel-header border-b border-slate-200 dark:border-cyan-500/20 p-6">
        <NuxtLink to="/" class="flex items-center space-x-3 mb-4 group">
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
          <div>
            <div
              class="text-xs font-mono text-slate-600 dark:text-cyan-400 tracking-widest group-hover:text-slate-800 dark:group-hover:text-cyan-300 transition-colors font-semibold">
              ГЛАВНАЯ
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">mindqlab.com</div>
          </div>
        </NuxtLink>

        <!-- Lab Logo -->
        <NuxtLink to="/lab" class="lab-logo group block">
          <div
            class="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-cyan-500/10 hover:border-cyan-500/30 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-300">
            <div
              class="petri-dish w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden"
              @mouseenter="startBrainPulse" @mouseleave="stopBrainPulse">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20"></div>
              <i class="fas fa-brain text-white text-xl relative z-10 transition-transform duration-300"
                :class="{ 'scale-110': brainPulsing }"></i>
              <div v-if="brainPulsing" class="absolute inset-0 border-2 border-cyan-400/50 rounded-full animate-ping">
              </div>
            </div>
            <div>
              <div class="text-slate-900 dark:text-white font-bold text-lg font-montserrat">
                MIND Q LAB
              </div>
              <div class="text-cyan-700 dark:text-cyan-400/70 text-xs font-mono">
                v2.0 ЭКСПЕРИМЕНТАЛЬНАЯ
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Research Stations -->
      <div class="research-stations p-4 space-y-2">
        <div class="text-xs font-mono text-slate-500 dark:text-slate-500 mb-3 px-2 font-semibold">
          ИССЛЕДОВАТЕЛЬСКИЕ СТАНЦИИ
        </div>

        <!-- Interactive Tests Station -->
        <StationLink to="/lab/tests" icon="fa-brain" title="Тесты" subtitle="Оценка функций"
          :active="route.path === '/lab/tests'" gradient-from="blue-500" gradient-to="indigo-600" />



        <!-- Brain Training Station -->
        <StationLink to="/lab/brain-training" icon="fa-dumbbell" title="Тренировка Мозга" subtitle="Игры и упражнения"
          :active="route.path.startsWith('/lab/brain-training')" gradient-from="cyan-500" gradient-to="purple-600" />

        <!-- Self Growth Station -->
        <StationLink to="/lab/growth" icon="fa-seedling" title="Саморазвитие" subtitle="Инструменты"
          :active="route.path.startsWith('/lab/growth')" gradient-from="green-500" gradient-to="teal-600" />

        <!-- Psychology Station -->
        <StationLink to="/lab/psychology" icon="fa-book-open" title="Психология" subtitle="Теории и техники"
          :active="route.path === '/lab/psychology'" gradient-from="purple-500" gradient-to="pink-600" />

        <!-- Meditation Station -->
        <StationLink to="/lab/mindfulness" icon="fa-spa" title="Медитация" subtitle="Аудио и видео"
          :active="route.path === '/lab/mindfulness'" gradient-from="teal-500" gradient-to="cyan-600" />

        <!-- Sound Therapy Station -->
        <StationLink to="/lab/sound-therapy" icon="fa-music" title="Звукотерапия" subtitle="Бинауральные ритмы"
          :active="route.path === '/lab/sound-therapy'" gradient-from="indigo-500" gradient-to="purple-600" />

        <!-- Brain Map Station -->
        <StationLink to="/lab/brain-map" icon="fa-map" title="Карта Мозга" subtitle="Интерактивная"
          :active="route.path === '/lab/brain-map'" gradient-from="orange-500" gradient-to="red-600" />

        <!-- Neuro Analysis Station -->
        <StationLink to="/lab/dashboard" icon="fa-microchip" title="Нейро Анализ" subtitle="Картирование мозга"
          :active="route.path === '/lab/dashboard'" gradient-from="cyan-500" gradient-to="blue-600" />



        <!-- Growth Observatory -->
        <StationLink to="/lab/analysis" icon="fa-chart-line" title="Обсерватория Роста" subtitle="Прогресс и аналитика"
          :active="route.path === '/lab/analysis'" gradient-from="emerald-500" gradient-to="green-600" />

        <!-- Community Hub -->
        <StationLink to="/lab/community" icon="fa-users" title="Сообщество" subtitle="Исследователи онлайн"
          :active="route.path === '/lab/community'" gradient-from="orange-500" gradient-to="amber-600" />
      </div>
    </div>

    <!-- User Section (Pushed to bottom) -->
    <div
      class="user-section border-t border-slate-200 dark:border-cyan-500/10 p-4 mt-auto bg-white dark:bg-slate-900 z-10">
      <ClientOnly>
        <div v-if="user"
          class="user-info p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-cyan-500/10">
          <div class="flex items-center space-x-3 mb-3">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
              {{ getUserInitials(user) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-mono text-cyan-700 dark:text-cyan-400/70 mb-0.5">
                ИССЛЕДОВАТЕЛЬ
              </div>
              <div class="text-slate-900 dark:text-white font-medium text-sm truncate">
                {{ user.displayName || user.email }}
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <NuxtLink to="/profile"
              class="flex-1 text-center py-2.5 px-3 bg-white dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-medium transition-all border border-slate-200 dark:border-slate-600/50">
              Профиль
            </NuxtLink>
            <button @click="logout"
              class="flex-1 text-center py-2.5 px-3 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-xs font-medium transition-all border border-red-200 dark:border-red-500/20">
              Выход
            </button>
          </div>
        </div>
        <div v-else class="auth-buttons space-y-2">
          <NuxtLink to="/login"
            class="block w-full text-center py-3 px-4 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 text-sm font-medium transition-all border border-slate-200 dark:border-slate-700/50">
            Вход для исследователей
          </NuxtLink>
          <NuxtLink to="/register"
            class="block w-full text-center py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-cyan-500/20">
            Присоединиться
          </NuxtLink>
        </div>
      </ClientOnly>
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
import StationLink from "~/components/lab/StationLink.vue";
import MobileStationLink from "~/components/lab/MobileStationLink.vue";

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
const mobileStations = computed(() => [
  {
    to: "/lab/tests",
    icon: "fa-brain",
    title: "Тесты",
    subtitle: "Все категории",
    gradientFrom: "blue-500",
    gradientTo: "indigo-600",
  },

  {
    to: "/lab/brain-training",
    icon: "fa-dumbbell",
    title: "Тренировка Мозга",
    subtitle: "Игры и упражнения",
    gradientFrom: "cyan-500",
    gradientTo: "purple-600",
  },
  {
    to: "/lab/growth",
    icon: "fa-seedling",
    title: "Саморазвитие",
    subtitle: "Инструменты",
    gradientFrom: "green-500",
    gradientTo: "teal-600",
  },
  {
    to: "/lab/psychology",
    icon: "fa-book-open",
    title: "Психология",
    subtitle: "Теории",
    gradientFrom: "purple-500",
    gradientTo: "pink-600",
  },
  {
    to: "/lab/mindfulness",
    icon: "fa-spa",
    title: "Медитация",
    subtitle: "Аудио/видео",
    gradientFrom: "teal-500",
    gradientTo: "cyan-600",
  },
  {
    to: "/lab/sound-therapy",
    icon: "fa-music",
    title: "Звукотерапия",
    subtitle: "Бинауральные",
    gradientFrom: "indigo-500",
    gradientTo: "purple-600",
  },
  {
    to: "/lab/brain-map",
    icon: "fa-map",
    title: "Карта Мозга",
    subtitle: "Интерактивная",
    gradientFrom: "orange-500",
    gradientTo: "red-600",
  },
  {
    to: "/lab/dashboard",
    icon: "fa-microchip",
    title: "Нейро Анализ",
    subtitle: "Картирование",
    gradientFrom: "cyan-500",
    gradientTo: "blue-600",
  },

  {
    to: "/lab/analysis",
    icon: "fa-chart-line",
    title: "Обсерватория",
    subtitle: "Рост",
    gradientFrom: "emerald-500",
    gradientTo: "green-600",
  },
  {
    to: "/lab/community",
    icon: "fa-users",
    title: "Сообщество",
    subtitle: "Исследователи",
    gradientFrom: "orange-500",
    gradientTo: "amber-600",
  },
]);

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
  navigateTo("/lab");
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
