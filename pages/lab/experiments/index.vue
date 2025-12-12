<!-- pages/lab/experiments.vue -->
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight">
              Экспериментальная Станция
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Психологические тесты и инструменты для глубокого самопознания
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="activeFilter = 'all'" class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              :class="activeFilter === 'all'
                  ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 dark:border-purple-500/40'
                  : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600/50'
                ">
              Все тесты
            </button>
            <button @click="activeFilter = 'active'" class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              :class="activeFilter === 'active'
                  ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 dark:border-purple-500/40'
                  : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600/50'
                ">
              Активные
            </button>
          </div>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-purple-500/20 shadow-sm dark:shadow-none">
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ stats.total }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Всего тестов</div>
          </div>
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-emerald-500/20 shadow-sm dark:shadow-none">
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ stats.completed }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Завершено</div>
          </div>
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-amber-500/20 shadow-sm dark:shadow-none">
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ stats.inProgress }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">В процессе</div>
          </div>
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-cyan-500/20 shadow-sm dark:shadow-none">
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ stats.available }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Доступно</div>
          </div>
        </div>
      </div>

      <!-- Experiments Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="experiment in filteredExperiments" :key="experiment.id"
          class="experiment-card bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden hover:border-purple-500/40 transition-all duration-300 group shadow-sm dark:shadow-none"
          @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">
          <!-- Card Header with Gradient -->
          <div class="relative p-6 border-b border-slate-100 dark:border-slate-700/50"
            :class="getGradientClass(experiment.category)">
            <div class="absolute inset-0 opacity-5" :class="getGradientBg(experiment.category)"></div>
            <div class="relative z-10">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300"
                  :class="[
                    getIconBg(experiment.category),
                    hoveredCard === experiment.id ? 'scale-110' : '',
                  ]">
                  <i :class="experiment.icon" class="text-2xl"></i>
                </div>
                <div class="px-3 py-1 rounded-full text-xs font-medium" :class="getStatusBadge(experiment.status)">
                  {{ getStatusText(experiment.status) }}
                </div>
              </div>
              <h3
                class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {{ experiment.name }}
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {{ experiment.description }}
              </p>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-6">
            <!-- Meta Info -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div class="text-slate-500 text-xs mb-1">Длительность</div>
                <div class="text-slate-900 dark:text-white text-sm font-medium flex items-center space-x-1">
                  <i class="fas fa-clock text-cyan-600 dark:text-cyan-400 text-xs"></i>
                  <span>{{ experiment.duration }}</span>
                </div>
              </div>
              <div>
                <div class="text-slate-500 text-xs mb-1">Вопросов</div>
                <div class="text-slate-900 dark:text-white text-sm font-medium flex items-center space-x-1">
                  <i class="fas fa-list-check text-purple-600 dark:text-purple-400 text-xs"></i>
                  <span>{{ experiment.questions }}</span>
                </div>
              </div>
              <div>
                <div class="text-slate-500 text-xs mb-1">Сложность</div>
                <div class="flex items-center space-x-1">
                  <i v-for="i in 3" :key="i" class="fas fa-circle text-xs" :class="i <= experiment.difficulty
                      ? getDifficultyColor(experiment.difficulty)
                      : 'text-slate-300 dark:text-slate-700'
                    "></i>
                </div>
              </div>
            </div>

            <!-- Progress Bar (if in progress) -->
            <div v-if="experiment.status === 'in-progress'" class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-slate-500 dark:text-slate-400 text-xs">Прогресс</span>
                <span class="text-amber-600 dark:text-amber-400 text-xs font-mono">
                  {{ experiment.progress }}%
                </span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  :style="{ width: `${experiment.progress}%` }"></div>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in experiment.tags" :key="tag"
                class="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 rounded text-slate-600 dark:text-slate-400 text-xs">
                {{ tag }}
              </span>
            </div>

            <!-- Action Button -->
            <button @click="handleExperimentAction(experiment)"
              class="w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              :class="getActionButtonClass(experiment.status)">
              <i :class="getActionIcon(experiment.status)"></i>
              <span>{{ getActionText(experiment.status) }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredExperiments.length === 0" class="text-center py-16">
        <div
          class="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-flask text-slate-400 dark:text-slate-600 text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Нет экспериментов</h3>
        <p class="text-slate-500 dark:text-slate-400">
          В этой категории пока нет доступных экспериментов
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const activeFilter = ref("all");
const hoveredCard = ref(null);

const stats = {
  total: 10,
  completed: 4,
  inProgress: 3,
  available: 5,
};

const experiments = ref([
  {
    id: "emotional-compass",
    name: "Эмоциональный Компас",
    description:
      "Глубокий анализ эмоционального интеллекта и способности к эмпатии",
    category: "emotional",
    icon: "fas fa-compass text-pink-600 dark:text-pink-400",
    duration: "15 мин",
    questions: 42,
    difficulty: 2,
    status: "available",
    tags: ["эмоции", "эмпатия", "самосознание"],
    path: "/lab/experiments/emotional-compass",
  },
  {
    id: "wheel-of-life",
    name: "Колесо Баланса",
    description: "Оцените удовлетворенность различными сферами вашей жизни",
    category: "values",
    icon: "fas fa-yin-yang text-purple-600 dark:text-purple-400",
    duration: "10 мин",
    questions: 8,
    difficulty: 1,
    status: "available",
    tags: ["баланс", "жизнь", "планирование"],
    path: "/lab/experiments/wheel-of-life",
  },

  {
    id: "daily-growth-spark",
    name: "Ежедневная Искра Роста",
    description: "Ежедневные задания для личностного роста и осознанности",
    category: "creativity",
    icon: "fas fa-bolt text-amber-600 dark:text-amber-400",
    duration: "5 мин",
    questions: 1,
    difficulty: 1,
    status: "available",
    tags: ["рост", "ежедневно", "осознанность"],
    path: "/lab/experiments/daily-growth-spark",
  },
  {
    id: "deep-conversation",
    name: "Глубокий Разговор",
    description: "Метафорические карты для поиска внутренних ответов и инсайтов",
    category: "cognitive",
    icon: "fas fa-layer-group text-cyan-600 dark:text-cyan-400",
    duration: "10 мин",
    questions: 15,
    difficulty: 1,
    status: "available",
    tags: ["самопознание", "инсайты", "рефлексия"],
    path: "/lab/experiments/deep-conversation",
  },
]);

const filteredExperiments = computed(() => {
  if (activeFilter.value === "all") {
    return experiments.value;
  }
  return experiments.value.filter(
    (exp) => exp.status === "in-progress" || exp.status === "available"
  );
});

const getGradientClass = (category) => {
  const gradients = {
    emotional: "from-pink-500/5",
    personality: "from-purple-500/5",
    archetype: "from-indigo-500/5",
    cognitive: "from-cyan-500/5",
    values: "from-emerald-500/5",
    relationships: "from-rose-500/5",
    creativity: "from-amber-500/5",
    resilience: "from-blue-500/5",
  };
  return gradients[category] || "from-slate-500/5";
};

const getGradientBg = (category) => {
  const gradients = {
    emotional: "bg-gradient-to-br from-pink-500 to-purple-500",
    personality: "bg-gradient-to-br from-purple-500 to-indigo-500",
    archetype: "bg-gradient-to-br from-indigo-500 to-violet-500",
    cognitive: "bg-gradient-to-br from-cyan-500 to-blue-500",
    values: "bg-gradient-to-br from-emerald-500 to-teal-500",
    relationships: "bg-gradient-to-br from-rose-500 to-pink-500",
    creativity: "bg-gradient-to-br from-amber-500 to-orange-500",
    resilience: "bg-gradient-to-br from-blue-500 to-cyan-500",
  };
  return gradients[category] || "bg-gradient-to-br from-slate-500 to-gray-500";
};

const getIconBg = (category) => {
  const backgrounds = {
    emotional: "bg-pink-500/10",
    personality: "bg-purple-500/10",
    archetype: "bg-indigo-500/10",
    cognitive: "bg-cyan-500/10",
    values: "bg-emerald-500/10",
    relationships: "bg-rose-500/10",
    creativity: "bg-amber-500/10",
    resilience: "bg-blue-500/10",
  };
  return backgrounds[category] || "bg-slate-500/10";
};

const getStatusBadge = (status) => {
  const badges = {
    completed:
      "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30",
    "in-progress": "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30",
    available: "bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-cyan-500/30",
  };
  return badges[status] || badges.available;
};

const getStatusText = (status) => {
  const texts = {
    completed: "Завершено",
    "in-progress": "В процессе",
    available: "Доступно",
  };
  return texts[status] || "Доступно";
};

const getDifficultyColor = (difficulty) => {
  const colors = {
    1: "text-emerald-600 dark:text-emerald-400",
    2: "text-amber-600 dark:text-amber-400",
    3: "text-red-600 dark:text-red-400",
  };
  return colors[difficulty] || "text-slate-400";
};

const getActionButtonClass = (status) => {
  const classes = {
    completed:
      "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600/50",
    "in-progress":
      "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25",
    available:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25",
  };
  return classes[status] || classes.available;
};

const getActionIcon = (status) => {
  const icons = {
    completed: "fas fa-check-circle",
    "in-progress": "fas fa-play-circle",
    available: "fas fa-rocket",
  };
  return icons[status] || icons.available;
};

const getActionText = (status) => {
  const texts = {
    completed: "Посмотреть результаты",
    "in-progress": "Продолжить тест",
    available: "Начать эксперимент",
  };
  return texts[status] || "Начать";
};

const handleExperimentAction = (experiment) => {
  if (experiment.path) {
    navigateTo(experiment.path);
  }
};
</script>

<style scoped>
.experiment-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experiment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(168, 85, 247, 0.15);
}
</style>
