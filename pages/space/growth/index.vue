<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <Breadcrumbs />
      <!-- Page Header -->
      <div class="mb-12">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight">
              Пространство Роста
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-base font-medium leading-relaxed max-w-2xl">
              Инструменты для осознанного развития личности и эмоционального интеллекта
            </p>
          </div>
        </div>
      </div>

      <!-- Categories Sections -->
      <div class="space-y-16">

        <!-- Emotional Intelligence -->
        <section>
          <h2
            class="text-xl font-bold mb-8 flex items-center gap-3 uppercase tracking-tight text-zinc-900 dark:text-white">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <i class="fas fa-heart text-cyan-600 dark:text-cyan-400"></i>
            </div>
            Эмоциональный Интеллект
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div v-for="experiment in getToolsByCategory('emotional')" :key="experiment.id"
              class="experiment-card group bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm"
              @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">

              <!-- Card Header -->
              <div class="relative p-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <div class="relative z-10">
                  <div class="flex items-start justify-between mb-6">
                    <div
                      class="w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-cyan-500/10 transition-colors shadow-inner">
                      <i
                        :class="[experiment.icon, 'text-2xl text-zinc-600 dark:text-zinc-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400']"></i>
                    </div>
                    <div
                      class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      {{ getStatusText(experiment.status) }}
                    </div>
                  </div>
                  <h3 class="text-2xl font-black mb-3 uppercase tracking-tight">
                    {{ experiment.name }}
                  </h3>
                  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium line-clamp-2">
                    {{ experiment.description }}
                  </p>
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-8">
                <!-- Meta Info -->
                <div class="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Длительность</div>
                    <div class="text-sm font-bold flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
                      <i class="fas fa-clock text-cyan-600 dark:text-cyan-400 text-xs"></i>
                      <span>{{ experiment.duration }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Вопросов</div>
                    <div class="text-sm font-bold flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
                      <i class="fas fa-list-check text-cyan-600 dark:text-cyan-400 text-xs"></i>
                      <span>{{ experiment.questions }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Сложность</div>
                    <div class="flex items-center space-x-1.5">
                      <i v-for="i in 3" :key="i" class="fas fa-circle text-[8px]" :class="i <= experiment.difficulty
                        ? 'text-cyan-500'
                        : 'text-zinc-200 dark:text-zinc-800'
                        "></i>
                    </div>
                  </div>
                </div>

                <!-- Progress Bar (if in progress) -->
                <div v-if="experiment.status === 'in-progress'" class="mb-8">
                  <div class="flex justify-between items-center mb-2.5">
                    <span class="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Прогресс</span>
                    <span class="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                      {{ experiment.progress }}%
                    </span>
                  </div>
                  <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                      :style="{ width: `${experiment.progress}%` }"></div>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-8">
                  <span v-for="tag in experiment.tags" :key="tag"
                    class="px-2.5 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    {{ tag }}
                  </span>
                </div>

                <!-- Action Button -->
                <button @click="handleExperimentAction(experiment)"
                  class="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-cyan-500/20 active:scale-95"
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
          <h2
            class="text-xl font-bold mb-8 flex items-center gap-3 uppercase tracking-tight text-zinc-900 dark:text-white">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <i class="fas fa-balance-scale text-blue-600 dark:text-blue-400"></i>
            </div>
            Жизненный Баланс и Планирование
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div v-for="experiment in getToolsByCategory('planning')" :key="experiment.id"
              class="experiment-card group bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm"
              @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">

              <!-- Card Header -->
              <div class="relative p-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <div class="relative z-10">
                  <div class="flex items-start justify-between mb-6">
                    <div
                      class="w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-blue-500/10 transition-colors shadow-inner">
                      <i
                        :class="[experiment.icon, 'text-2xl text-zinc-600 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400']"></i>
                    </div>
                    <div
                      class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      {{ getStatusText(experiment.status) }}
                    </div>
                  </div>
                  <h3 class="text-2xl font-black mb-3 uppercase tracking-tight">
                    {{ experiment.name }}
                  </h3>
                  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium line-clamp-2">
                    {{ experiment.description }}
                  </p>
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-8">
                <!-- Meta Info -->
                <div class="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Длительность</div>
                    <div class="text-sm font-bold flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
                      <i class="fas fa-clock text-blue-600 dark:text-blue-400 text-xs"></i>
                      <span>{{ experiment.duration }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Вопросов</div>
                    <div class="text-sm font-bold flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
                      <i class="fas fa-list-check text-blue-600 dark:text-blue-400 text-xs"></i>
                      <span>{{ experiment.questions }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Сложность</div>
                    <div class="flex items-center space-x-1.5">
                      <i v-for="i in 3" :key="i" class="fas fa-circle text-[8px]" :class="i <= experiment.difficulty
                        ? 'text-blue-500'
                        : 'text-zinc-200 dark:text-zinc-800'
                        "></i>
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-8">
                  <span v-for="tag in experiment.tags" :key="tag"
                    class="px-2.5 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    {{ tag }}
                  </span>
                </div>

                <!-- Action Button -->
                <button @click="handleExperimentAction(experiment)"
                  class="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-blue-500/20 active:scale-95"
                  :class="getActionButtonClass(experiment.status, 'planning')">
                  <i :class="getActionIcon(experiment.status)"></i>
                  <span>{{ getActionText(experiment.status) }}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Mindfulness & Reflection -->
        <section>
          <h2
            class="text-xl font-bold mb-8 flex items-center gap-3 uppercase tracking-tight text-zinc-900 dark:text-white">
            <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <i class="fas fa-spa text-purple-600 dark:text-purple-400"></i>
            </div>
            Осознанность и Рефлексия
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div v-for="experiment in getToolsByCategory('mindfulness')" :key="experiment.id"
              class="experiment-card group bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm"
              @mouseenter="hoveredCard = experiment.id" @mouseleave="hoveredCard = null">

              <!-- Card Header -->
              <div class="relative p-8 border-b border-zinc-100 dark:border-zinc-800/50">
                <div class="relative z-10">
                  <div class="flex items-start justify-between mb-6">
                    <div
                      class="w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-purple-500/10 transition-colors shadow-inner">
                      <i
                        :class="[experiment.icon, 'text-2xl text-zinc-600 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400']"></i>
                    </div>
                    <div
                      class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      {{ getStatusText(experiment.status) }}
                    </div>
                  </div>
                  <h3 class="text-2xl font-black mb-3 uppercase tracking-tight">
                    {{ experiment.name }}
                  </h3>
                  <p class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium line-clamp-2">
                    {{ experiment.description }}
                  </p>
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-8">
                <!-- Meta Info -->
                <div class="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Длительность</div>
                    <div class="text-sm font-bold flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
                      <i class="fas fa-clock text-purple-600 dark:text-purple-400 text-xs"></i>
                      <span>{{ experiment.duration }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Вопросов</div>
                    <div class="text-sm font-bold flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
                      <i class="fas fa-list-check text-purple-600 dark:text-purple-400 text-xs"></i>
                      <span>{{ experiment.questions }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Сложность</div>
                    <div class="flex items-center space-x-1.5">
                      <i v-for="i in 3" :key="i" class="fas fa-circle text-[8px]" :class="i <= experiment.difficulty
                        ? 'text-purple-500'
                        : 'text-zinc-200 dark:text-zinc-800'
                        "></i>
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-8">
                  <span v-for="tag in experiment.tags" :key="tag"
                    class="px-2.5 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    {{ tag }}
                  </span>
                </div>

                <!-- Action Button -->
                <button @click="handleExperimentAction(experiment)"
                  class="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-purple-500/20 active:scale-95"
                  :class="getActionButtonClass(experiment.status, 'mindfulness')">
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

const getActionButtonClass = (status, category = 'emotional') => {
  const accentColors = {
    emotional: "bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 shadow-cyan-500/25",
    planning: "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 shadow-blue-500/25",
    mindfulness: "bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400 shadow-purple-500/25",
  };

  const accent = accentColors[category] || accentColors.emotional;

  const classes = {
    completed: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700",
    "in-progress": `${accent} text-white border-transparent`,
    available: `${accent} text-white border-transparent`,
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