<template>
  <div
    class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white font-sans transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <Breadcrumbs />
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Пространство Роста
            </h1>
            <p class="text-stone-600 dark:text-stone-400 text-base">
              Инструменты для осознанного развития личности и эмоционального интеллекта
            </p>
          </div>
        </div>

        <!-- Categories Sections -->
        <div class="space-y-12">

          <!-- Emotional Intelligence -->
          <section>
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <i class="fas fa-heart"></i>
              Эмоциональный Интеллект
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div v-for="experiment in getToolsByCategory('emotional')" :key="experiment.id"
                class="experiment-card bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white transition-all duration-300"
                @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">

                <!-- Card Header -->
                <div class="relative p-6 border-b-2 border-stone-900 dark:border-white">
                  <div class="relative z-10">
                    <div class="flex items-start justify-between mb-4">
                      <div
                        class="w-14 h-14 flex items-center justify-center border-2 border-stone-900 dark:border-white">
                        <i :class="experiment.icon"></i>
                      </div>
                      <div class="px-3 py-1 border-2 border-stone-900 dark:border-white text-xs font-medium">
                        {{ getStatusText(experiment.status) }}
                      </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2">
                      {{ experiment.name }}
                    </h3>
                    <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                      {{ experiment.description }}
                    </p>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-6">
                  <!-- Meta Info -->
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Длительность</div>
                      <div class="text-sm font-medium flex items-center space-x-1">
                        <i class="fas fa-clock text-xs"></i>
                        <span>{{ experiment.duration }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Вопросов</div>
                      <div class="text-sm font-medium flex items-center space-x-1">
                        <i class="fas fa-list-check text-xs"></i>
                        <span>{{ experiment.questions }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Сложность</div>
                      <div class="flex items-center space-x-1">
                        <i v-for="i in 3" :key="i" class="fas fa-circle text-xs" :class="i <= experiment.difficulty
                          ? ''
                          : 'text-stone-300 dark:text-stone-700'
                          "></i>
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar (if in progress) -->
                  <div v-if="experiment.status === 'in-progress'" class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-stone-500 dark:text-stone-400 text-xs">Прогресс</span>
                      <span class="text-xs font-mono">
                        {{ experiment.progress }}%
                      </span>
                    </div>
                    <div class="w-full bg-stone-200 dark:bg-stone-700 h-2 overflow-hidden">
                      <div class="h-full bg-stone-900 dark:bg-white transition-all duration-500"
                        :style="{ width: `${experiment.progress}%` }"></div>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-6">
                    <span v-for="tag in experiment.tags" :key="tag"
                      class="px-2 py-1 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs">
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Action Button -->
                  <button @click="handleExperimentAction(experiment)"
                    class="w-full py-3 border-2 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    :class="getActionButtonClass(experiment.status)">
                    <i :class="getActionIcon(experiment.status)"></i>
                    <span>{{ getActionText(experiment.status) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Life Balance -->
          <section>
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <i class="fas fa-balance-scale"></i>
              Жизненный Баланс и Планирование
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div v-for="experiment in getToolsByCategory('planning')" :key="experiment.id"
                class="experiment-card bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white transition-all duration-300"
                @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">

                <!-- Card Header -->
                <div class="relative p-6 border-b-2 border-stone-900 dark:border-white">
                  <div class="relative z-10">
                    <div class="flex items-start justify-between mb-4">
                      <div
                        class="w-14 h-14 flex items-center justify-center border-2 border-stone-900 dark:border-white">
                        <i :class="experiment.icon"></i>
                      </div>
                      <div class="px-3 py-1 border-2 border-stone-900 dark:border-white text-xs font-medium">
                        {{ getStatusText(experiment.status) }}
                      </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2">
                      {{ experiment.name }}
                    </h3>
                    <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                      {{ experiment.description }}
                    </p>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-6">
                  <!-- Meta Info -->
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Длительность</div>
                      <div class="text-sm font-medium flex items-center space-x-1">
                        <i class="fas fa-clock text-xs"></i>
                        <span>{{ experiment.duration }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Вопросов</div>
                      <div class="text-sm font-medium flex items-center space-x-1">
                        <i class="fas fa-list-check text-xs"></i>
                        <span>{{ experiment.questions }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Сложность</div>
                      <div class="flex items-center space-x-1">
                        <i v-for="i in 3" :key="i" class="fas fa-circle text-xs" :class="i <= experiment.difficulty
                          ? ''
                          : 'text-stone-300 dark:text-stone-700'
                          "></i>
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar (if in progress) -->
                  <div v-if="experiment.status === 'in-progress'" class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-stone-500 dark:text-stone-400 text-xs">Прогресс</span>
                      <span class="text-xs font-mono">
                        {{ experiment.progress }}%
                      </span>
                    </div>
                    <div class="w-full bg-stone-200 dark:bg-stone-700 h-2 overflow-hidden">
                      <div class="h-full bg-stone-900 dark:bg-white transition-all duration-500"
                        :style="{ width: `${experiment.progress}%` }"></div>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-6">
                    <span v-for="tag in experiment.tags" :key="tag"
                      class="px-2 py-1 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs">
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Action Button -->
                  <button @click="handleExperimentAction(experiment)"
                    class="w-full py-3 border-2 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    :class="getActionButtonClass(experiment.status)">
                    <i :class="getActionIcon(experiment.status)"></i>
                    <span>{{ getActionText(experiment.status) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Mindfulness & Reflection -->
          <section>
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
              <i class="fas fa-spa"></i>
              Осознанность и Рефлексия
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div v-for="experiment in getToolsByCategory('mindfulness')" :key="experiment.id"
                class="experiment-card bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white transition-all duration-300"
                @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">

                <!-- Card Header -->
                <div class="relative p-6 border-b-2 border-stone-900 dark:border-white">
                  <div class="relative z-10">
                    <div class="flex items-start justify-between mb-4">
                      <div
                        class="w-14 h-14 flex items-center justify-center border-2 border-stone-900 dark:border-white">
                        <i :class="experiment.icon"></i>
                      </div>
                      <div class="px-3 py-1 border-2 border-stone-900 dark:border-white text-xs font-medium">
                        {{ getStatusText(experiment.status) }}
                      </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2">
                      {{ experiment.name }}
                    </h3>
                    <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                      {{ experiment.description }}
                    </p>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-6">
                  <!-- Meta Info -->
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Длительность</div>
                      <div class="text-sm font-medium flex items-center space-x-1">
                        <i class="fas fa-clock text-xs"></i>
                        <span>{{ experiment.duration }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Вопросов</div>
                      <div class="text-sm font-medium flex items-center space-x-1">
                        <i class="fas fa-list-check text-xs"></i>
                        <span>{{ experiment.questions }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="text-stone-500 text-xs mb-1">Сложность</div>
                      <div class="flex items-center space-x-1">
                        <i v-for="i in 3" :key="i" class="fas fa-circle text-xs" :class="i <= experiment.difficulty
                          ? ''
                          : 'text-stone-300 dark:text-stone-700'
                          "></i>
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar (if in progress) -->
                  <div v-if="experiment.status === 'in-progress'" class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-stone-500 dark:text-stone-400 text-xs">Прогресс</span>
                      <span class="text-xs font-mono">
                        {{ experiment.progress }}%
                      </span>
                    </div>
                    <div class="w-full bg-stone-200 dark:bg-stone-700 h-2 overflow-hidden">
                      <div class="h-full bg-stone-900 dark:bg-white transition-all duration-500"
                        :style="{ width: `${experiment.progress}%` }"></div>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-6">
                    <span v-for="tag in experiment.tags" :key="tag"
                      class="px-2 py-1 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs">
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Action Button -->
                  <button @click="handleExperimentAction(experiment)"
                    class="w-full py-3 border-2 font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    :class="getActionButtonClass(experiment.status)">
                    <i :class="getActionIcon(experiment.status)"></i>
                    <span>{{ getActionText(experiment.status) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
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
  total: 4,
  completed: 0,
  inProgress: 0,
  available: 4,
};

const experiments = ref([
  {
    id: "emotional-compass",
    name: "Эмоциональный Компас",
    description:
      "Глубокий анализ эмоционального интеллекта и способности к эмпатии",
    category: "emotional",
    icon: "fas fa-compass",
    duration: "15 мин",
    questions: 42,
    difficulty: 2,
    status: "available",
    tags: ["эмоции", "эмпатия", "самосознание"],
    path: "/space/growth/emotional-compass",
  },
  {
    id: "wheel-of-life",
    name: "Колесо Баланса",
    description: "Оцените удовлетворенность различными сферами вашей жизни",
    category: "planning",
    icon: "fas fa-yin-yang",
    duration: "10 мин",
    questions: 8,
    difficulty: 1,
    status: "available",
    tags: ["баланс", "жизнь", "планирование"],
    path: "/space/growth/wheel-of-life",
  },

  {
    id: "daily-growth-spark",
    name: "Ежедневная Искра Роста",
    description: "Ежедневные задания для личностного роста и осознанности",
    category: "mindfulness",
    icon: "fas fa-bolt",
    duration: "5 мин",
    questions: 1,
    difficulty: 1,
    status: "available",
    tags: ["рост", "ежедневно", "осознанность"],
    path: "/space/growth/daily-growth-spark",
  },
  {
    id: "deep-conversation",
    name: "Глубокий Разговор",
    description: "Метафорические карты для поиска внутренних ответов и инсайтов",
    category: "mindfulness",
    icon: "fas fa-layer-group",
    duration: "10 мин",
    questions: 15,
    difficulty: 1,
    status: "available",
    tags: ["самопознание", "инсайты", "рефлексия"],
    path: "/space/growth/deep-conversation",
  },
  {
    id: "habit-mood-journal",
    name: "Дневник Состояния",
    description: "Компактный трекер ваших привычек и эмоциональных состояний",
    category: "planning",
    icon: "fas fa-feather-pointed",
    duration: "1 мин",
    questions: 1,
    difficulty: 1,
    status: "available",
    tags: ["привычки", "настроение", "микро-практика"],
    path: "/space/growth/habit-mood-journal",
  },
]);

const getToolsByCategory = (cat) => experiments.value.filter(e => e.category === cat);

const filteredExperiments = computed(() => {
  if (activeFilter.value === "all") {
    return experiments.value;
  }
  return experiments.value.filter(
    (exp) => exp.status === "in-progress" || exp.status === "available"
  );
});

const getStatusText = (status) => {
  const texts = {
    completed: "Завершено",
    "in-progress": "В процессе",
    available: "Доступно",
  };
  return texts[status] || "Доступно";
};

const getActionButtonClass = (status) => {
  const classes = {
    completed: "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800",
    "in-progress": "border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900",
    available: "border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900",
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
    available: "Начать практику",
  };
  return texts[status] || "Начать";
};

const handleExperimentAction = (experiment) => {
  if (experiment.path) {
    navigateTo(experiment.path);
  }
};
</script>