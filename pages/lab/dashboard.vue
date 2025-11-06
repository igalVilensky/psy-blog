<!-- pages/lab/dashboard.vue -->
<template>
  <div class="min-h-screen">
    <!-- Dashboard Header -->
    <div class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1
            class="text-3xl md:text-4xl font-bold text-white font-montserrat mb-2"
          >
            Нейро Анализ
          </h1>
          <p class="text-slate-400">
            Картирование когнитивных функций и личностная оценка в реальном
            времени
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <div
            class="bg-slate-800/50 rounded-xl px-4 py-3 border border-cyan-500/20 backdrop-blur-sm"
          >
            <div class="text-cyan-400/70 text-xs font-mono mb-1">ID СЕССИИ</div>
            <div class="text-white font-mono text-sm">{{ sessionId }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      <!-- Cognitive Scan Card -->
      <div
        class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
        @mouseenter="activeCard = 'cognitive'"
        @mouseleave="activeCard = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-cyan-400/70 text-xs font-mono tracking-wider">
              КОГНИТИВНОЕ СКАНИРОВАНИЕ
            </div>
            <div
              class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center transition-transform duration-300"
              :class="{ 'scale-110': activeCard === 'cognitive' }"
            >
              <i class="fas fa-brain text-cyan-400 text-lg"></i>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-3xl font-bold text-white mb-1 font-mono">
              {{ animatedStats.cognitive }}%
            </div>
            <div class="text-slate-400 text-sm">Степень завершения</div>
          </div>
          <div class="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
              :style="{ width: `${animatedStats.cognitive}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Active Tests Card -->
      <div
        class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden"
        @mouseenter="activeCard = 'tests'"
        @mouseleave="activeCard = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-purple-400/70 text-xs font-mono tracking-wider">
              АКТИВНЫЕ ТЕСТЫ
            </div>
            <div
              class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center transition-transform duration-300"
              :class="{ 'scale-110': activeCard === 'tests' }"
            >
              <i class="fas fa-vial text-purple-400 text-lg"></i>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-3xl font-bold text-white mb-1 font-mono">
              {{ stats.activeTests.current }}/{{ stats.activeTests.total }}
            </div>
            <div class="text-slate-400 text-sm">Экспериментов запущено</div>
          </div>
          <div class="flex space-x-1">
            <div
              v-for="i in stats.activeTests.total"
              :key="i"
              class="flex-1 h-2 rounded-full transition-all duration-300"
              :class="
                i <= stats.activeTests.current
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-slate-700/50'
              "
            ></div>
          </div>
        </div>
      </div>

      <!-- Data Points Card -->
      <div
        class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-6 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden"
        @mouseenter="activeCard = 'data'"
        @mouseleave="activeCard = null"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="text-emerald-400/70 text-xs font-mono tracking-wider">
              ТОЧКИ ДАННЫХ
            </div>
            <div
              class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center transition-transform duration-300"
              :class="{ 'scale-110': activeCard === 'data' }"
            >
              <i class="fas fa-database text-emerald-400 text-lg"></i>
            </div>
          </div>
          <div class="mb-3">
            <div class="text-3xl font-bold text-white mb-1 font-mono">
              {{ formatNumber(animatedStats.dataPoints) }}
            </div>
            <div class="text-slate-400 text-sm">Собранных инсайтов</div>
          </div>
          <div class="flex items-center space-x-2 text-emerald-400 text-sm">
            <i class="fas fa-arrow-up text-xs"></i>
            <span class="font-mono">+{{ stats.dataPointsGrowth }}%</span>
            <span class="text-slate-500">за неделю</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Experiments -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white font-montserrat">
          Последние Эксперименты
        </h2>
        <button
          class="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center space-x-2 transition-colors"
        >
          <span>Посмотреть все</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
      <div class="space-y-3">
        <div
          v-for="experiment in recentExperiments"
          :key="experiment.id"
          class="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 group"
        >
          <div class="flex items-center space-x-4 flex-1 min-w-0">
            <div class="relative">
              <div
                :class="getStatusColorClass(experiment.status)"
                class="w-3 h-3 rounded-full"
              ></div>
              <div
                v-if="experiment.status === 'in-progress'"
                :class="getStatusColorClass(experiment.status, true)"
                class="absolute inset-0 w-3 h-3 rounded-full animate-ping"
              ></div>
            </div>
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center"
              :class="getExperimentBgClass(experiment.type)"
            >
              <i :class="experiment.icon" class="text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-white font-medium mb-1 group-hover:text-cyan-400 transition-colors"
              >
                {{ experiment.name }}
              </div>
              <div class="text-slate-400 text-sm">
                {{ experiment.description }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right hidden sm:block">
              <div class="text-slate-400 text-xs font-mono mb-1">
                {{ experiment.date }}
              </div>
              <div
                class="text-xs font-medium"
                :class="getStatusTextClass(experiment.status)"
              >
                {{ getStatusLabel(experiment.status) }}
              </div>
            </div>
            <button
              class="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <i class="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <h2 class="text-2xl font-bold text-white mb-6 font-montserrat">
        Быстрые Действия
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="action in quickActions"
          :key="action.name"
          @click="action.handler"
          class="p-5 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10">
            <div
              class="w-12 h-12 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            >
              <i :class="action.icon" class="text-xl text-cyan-400"></i>
            </div>
            <div
              class="text-white font-medium mb-2 group-hover:text-cyan-400 transition-colors"
            >
              {{ action.name }}
            </div>
            <div class="text-slate-400 text-sm">{{ action.description }}</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

definePageMeta({
  layout: "laboratory",
});

const activeCard = ref(null);

const sessionId = computed(() => {
  return `LAB-${Date.now().toString(36).toUpperCase()}`;
});

const stats = reactive({
  cognitive: 87.3,
  activeTests: {
    current: 3,
    total: 5,
  },
  dataPoints: 1247,
  dataPointsGrowth: 12.5,
});

const animatedStats = reactive({
  cognitive: 0,
  dataPoints: 0,
});

const recentExperiments = ref([
  {
    id: 1,
    name: "Эмоциональный Компас",
    description: "Оценка эмоционального интеллекта",
    status: "completed",
    date: "2 часа назад",
    icon: "fas fa-heart-pulse text-emerald-400",
    type: "emotional",
  },
  {
    id: 2,
    name: "Анализ Большой Пятёрки",
    description: "Картирование личностных черт",
    status: "in-progress",
    date: "1 день назад",
    icon: "fas fa-brain text-amber-400",
    type: "personality",
  },
  {
    id: 3,
    name: "Идентификация Архетипов",
    description: "Открытие юнгианских архетипов",
    status: "pending",
    date: "3 дня назад",
    icon: "fas fa-masks-theater text-slate-400",
    type: "archetype",
  },
  {
    id: 4,
    name: "Когнитивные Паттерны",
    description: "Анализ мыслительных процессов",
    status: "completed",
    date: "5 дней назад",
    icon: "fas fa-network-wired text-emerald-400",
    type: "cognitive",
  },
]);

const quickActions = [
  {
    name: "Новое Сканирование",
    description: "Запустить когнитивную оценку",
    icon: "fas fa-brain-circuit",
    handler: () => console.log("Starting new scan..."),
  },
  {
    name: "Экспорт Данных",
    description: "Скачать данные исследований",
    icon: "fas fa-download",
    handler: () => console.log("Exporting data..."),
  },
  {
    name: "Обновить Профиль",
    description: "Актуализировать личные данные",
    icon: "fas fa-sync",
    handler: () => console.log("Updating profile..."),
  },
  {
    name: "Настройки",
    description: "Конфигурация лаборатории",
    icon: "fas fa-cog",
    handler: () => console.log("Opening settings..."),
  },
];

const getStatusColorClass = (status, isPing = false) => {
  const colors = {
    completed: isPing ? "bg-emerald-400/30" : "bg-emerald-400",
    "in-progress": isPing ? "bg-amber-400/30" : "bg-amber-400",
    pending: isPing ? "bg-slate-400/30" : "bg-slate-400",
  };
  return colors[status] || colors.pending;
};

const getStatusTextClass = (status) => {
  const colors = {
    completed: "text-emerald-400",
    "in-progress": "text-amber-400",
    pending: "text-slate-400",
  };
  return colors[status] || colors.pending;
};

const getStatusLabel = (status) => {
  const labels = {
    completed: "Завершено",
    "in-progress": "В процессе",
    pending: "Ожидает",
  };
  return labels[status] || "Неизвестно";
};

const getExperimentBgClass = (type) => {
  const classes = {
    emotional: "bg-emerald-500/10",
    personality: "bg-amber-500/10",
    archetype: "bg-slate-500/10",
    cognitive: "bg-cyan-500/10",
  };
  return classes[type] || "bg-slate-500/10";
};

const formatNumber = (num) => {
  return num.toLocaleString("ru-RU");
};

const animateNumbers = () => {
  const duration = 1500;
  const steps = 60;
  const interval = duration / steps;

  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    animatedStats.cognitive = Math.floor(stats.cognitive * progress * 10) / 10;
    animatedStats.dataPoints = Math.floor(stats.dataPoints * progress);

    if (currentStep >= steps) {
      animatedStats.cognitive = stats.cognitive;
      animatedStats.dataPoints = stats.dataPoints;
      clearInterval(timer);
    }
  }, interval);
};

onMounted(() => {
  setTimeout(animateNumbers, 300);
});
</script>
