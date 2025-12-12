<!-- pages/lab/tests/index.vue -->
<template>
  <div class="cognitive-tests-station min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              ТЕСТЫ И МЕТОДИКИ
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Профессиональные инструменты для исследования личности и когнитивных способностей
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ tests.length }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Всего
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {{ tests.filter(t => t.category === 'psychology').length }}
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Психология
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                 {{ tests.filter(t => t.category === 'cognitive').length }}
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Когнитивные
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Navigation -->
      <div class="flex flex-wrap items-center gap-2 mb-8">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="currentFilter = filter.value"
          class="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ring-1 ring-inset"
          :class="[
            currentFilter === filter.value
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 ring-transparent shadow-lg transform scale-105'
              : 'bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 ring-slate-200 dark:ring-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800'
          ]"
        >
          <i :class="[filter.icon, 'mr-2']"></i>
          {{ filter.label }}
        </button>
      </div>

      <!-- Category Description -->
      <div class="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 backdrop-blur-sm animate-fade-in">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="currentCategoryInfo.iconBg">
            <i :class="[currentCategoryInfo.icon, 'text-white']"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {{ currentCategoryInfo.title }}
            </h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {{ currentCategoryInfo.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tests Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="test in filteredTests"
          :key="test.id"
          :to="test.disabled ? '' : test.link"
          class="test-category-card group animate-fade-in-up"
          :class="[test.disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer']"
        >
          <!-- Icon Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="icon-wrapper" :class="test.iconBg">
              <i :class="test.icon" class="text-white text-xl"></i>
            </div>
            <span class="difficulty-badge" :class="getDifficultyClass(test.difficulty)">
              {{ test.difficulty }}
            </span>
          </div>

          <!-- Content -->
          <h3
            class="text-lg font-semibold text-slate-900 dark:text-white mb-2 transition-colors"
            :class="!test.disabled && 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400'"
          >
            {{ test.title }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-1 font-medium">{{ test.subtitle }}</p>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
            {{ test.description }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/50">
            <div class="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <i class="fas fa-clock text-xs"></i>
              <span class="text-xs font-medium">{{ test.duration }}</span>
            </div>
            <div class="flex items-center gap-2" :class="test.disabled ? 'text-slate-400' : 'text-purple-600 dark:text-purple-400'">
              <i class="fas text-xs" :class="test.disabled ? 'fa-lock' : 'fa-check-circle'"></i>
              <span class="text-xs font-medium">{{ test.disabled ? 'Скоро' : 'Доступен' }}</span>
            </div>
          </div>

          <!-- Hover Effect -->
          <div v-if="!test.disabled" class="card-shine"></div>

          <!-- Coming Soon Overlay -->
          <div v-if="test.disabled"
            class="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-2xl pointer-events-none">
          </div>
        </NuxtLink>
      </div>

       <!-- Quick Tests Section (Always visible or filtered? Keeping visible as a separate block for now) -->
       <div class="mt-16 mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">БЫСТРЫЕ ТЕСТЫ</h2>
          <span class="text-sm text-slate-500 dark:text-slate-400">Менее 5 минут</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink to="/lab/tests/digit-span" class="quick-test-card group">
            <div class="quick-icon-wrapper" style="background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);">
              <i class="fas fa-brain text-white text-lg group-hover:scale-110 transition-transform"></i>
            </div>
            <h4 class="text-slate-800 dark:text-white text-sm font-medium mt-3 mb-1">Digit Span</h4>
            <p class="text-slate-500 dark:text-slate-400 text-xs">5 мин</p>
          </NuxtLink>

          <div v-for="quickTest in quickTests" :key="quickTest.id" class="quick-test-card relative overflow-hidden"
            :class="[quickTest.disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer']">
            <div class="quick-icon-wrapper" :style="{ background: quickTest.gradient }">
              <i :class="quickTest.icon" class="text-white text-lg"></i>
            </div>
            <h4 class="text-slate-800 dark:text-white text-sm font-medium mt-3 mb-1">
              {{ quickTest.title }}
            </h4>
            <p class="text-slate-500 dark:text-slate-400 text-xs">{{ quickTest.time }}</p>

            <!-- Coming Soon Overlay -->
            <div v-if="quickTest.disabled"
              class="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-xl">
              <div class="p-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 shadow-sm">
                 <i class="fas fa-lock text-slate-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
       <!-- Info Banner -->
       <div class="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="text-slate-900 dark:text-white font-semibold mb-1">Как выбрать тест?</h4>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Когнитивные тесты оценивают работу мозга (память, внимание), а психологические — особенности личности и характера. 
              Для комплексного самопознания рекомендуем проходить и те, и другие.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

useHead({
  title: "Тесты и Методики",
  meta: [
    {
      name: "description",
      content:
        "Каталог профессиональных психологических и когнитивных тестов для оценки личности, памяти, внимания и мышления.",
    }
  ],
});

// --- State ---
const currentFilter = ref('all');

const filters = [
  { label: 'Все тесты', value: 'all', icon: 'fas fa-th-large' },
  { label: 'Психологические', value: 'psychology', icon: 'fas fa-user-astronaut' },
  { label: 'Когнитивные', value: 'cognitive', icon: 'fas fa-brain' },
];

const categoriesInfo = {
  all: {
    title: 'Полный каталог',
    description: 'Все доступные инструменты для исследования вашего разума. От классических психологических опросников до интерактивных задач на когнитивные способности.',
    icon: 'fas fa-flask',
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600'
  },
  psychology: {
    title: 'Психология Личности',
    description: 'Глубинные методики для исследования вашего характера, мотивов, бессознательных установок и эмоциональной сферы. Познай себя настоящего.',
    icon: 'fas fa-user-astronaut',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600'
  },
  cognitive: {
    title: 'Когнитивные Функции',
    description: 'Интерактивные тесты для оценки производительности мозга: рабочей памяти, внимания, скорости реакции и логического мышления. Измерь свой потенциал.',
    icon: 'fas fa-brain',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600'
  }
};

const currentCategoryInfo = computed(() => categoriesInfo[currentFilter.value]);

// --- Tests Data ---
const tests = [
  // --- Psychological ---
  {
    id: "life-purpose-archetype",
    title: "12 Архетипов",
    subtitle: "Юнгианская психология",
    description: "Определение доминирующих архетипов в вашем бессознательном. Поймите свои истинные мотивы и жизненный сценарий.",
    icon: "fas fa-star",
    iconBg: "bg-gradient-to-br from-indigo-500 to-violet-600",
    difficulty: "Средняя",
    duration: "25 мин",
    link: "/lab/tests/life-purpose-archetype",
    category: "psychology",
    disabled: false
  },
  {
    id: "big-5-model",
    title: "Большая Пятёрка",
    subtitle: "Научная модель личности",
    description: "Золотой стандарт современной психометрии. Оценка 5 ключевых черт: Экстраверсия, Доброжелательность, Добросовестность, Нейротизм, Открытость.",
    icon: "fas fa-chart-bar",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    difficulty: "Средняя",
    duration: "20 мин",
    link: "/lab/tests/big-5-model",
    category: "psychology",
    disabled: false
  },
  // --- Cognitive ---
  {
    id: "digit-span",
    title: "Digit Span Test",
    subtitle: "Рабочая память",
    description: "Классический нейропсихологический тест (WAIS) на объем слуховой рабочей памяти. Способность удерживать числа в уме.",
    icon: "fas fa-sort-numeric-up",
    iconBg: "bg-gradient-to-br from-cyan-500 to-purple-600",
    difficulty: "Средняя",
    duration: "5-8 мин",
    link: "/lab/tests/digit-span",
    category: "cognitive",
    disabled: false
  },
  {
    id: "nback",
    title: "N-Back Test",
    subtitle: "Флюидный интеллект",
    description: "Продвинутая задача на рабочую память и контроль внимания. Доказанная эффективность в улучшении когнитивных способностей.",
    icon: "fas fa-layer-group",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
    difficulty: "Сложная",
    duration: "5-10 мин",
    link: "/lab/tests/nback",
    category: "cognitive",
    disabled: false
  },
  {
    id: "trail-making",
    title: "Trail Making Test",
    subtitle: "Когнитивная гибкость",
    description: "Тест на визуальное внимание и переключаемость. Соедините точки в правильном порядке максимально быстро.",
    icon: "fas fa-route",
    iconBg: "bg-gradient-to-br from-emerald-500 to-cyan-600",
    difficulty: "Легкая",
    duration: "3-5 мин",
    link: "/lab/tests/trail-making",
    category: "cognitive",
    disabled: false
  },
  // --- Placeholders (Coming Soon) ---
  {
    id: "stroop",
    title: "Эффект Струпа",
    subtitle: "Тормозным контроль",
    description: "Тест на способность подавлять автоматические реакции. Называйте цвет шрифта, игнорируя значение слова.",
    icon: "fas fa-font",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    difficulty: "Средняя",
    duration: "5 мин",
    category: "cognitive",
    disabled: true
  },
  {
    id: "raven",
    title: "Матрицы Равена",
    subtitle: "Абстрактная логика",
    description: "Оценка невербального интеллекта и способности к абстрактному мышлению через поиск закономерностей.",
    icon: "fas fa-th",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    difficulty: "Сложная",
    duration: "20 мин",
    category: "cognitive",
    disabled: true
  },
  {
    id: "eq",
    title: "Эмоциональный Интеллект",
    subtitle: "Эмпатия и самоконтроль",
    description: "Оценка вашей способности распознавать свои и чужие эмоции, управлять ими и использовать для решения задач.",
    icon: "fas fa-heart",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    difficulty: "Средняя",
    duration: "15 мин",
    category: "psychology",
    disabled: true
  },
  {
    id: "burnout",
    title: "Шкала Выгорания",
    subtitle: "Психологическое состояние",
    description: "Диагностика уровня профессионального и эмоционального выгорания. Забота о ментальном здоровье.",
    icon: "fas fa-battery-quarter",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-700",
    difficulty: "Легкая",
    duration: "5 мин",
    category: "psychology",
    disabled: true
  }
];

const filteredTests = computed(() => {
  if (currentFilter.value === 'all') return tests;
  return tests.filter(test => test.category === currentFilter.value);
});


// --- Quick Tests Data (Visual placeholders mostly) ---
const quickTests = [
  {
    id: 1,
    title: "Реакция",
    icon: "fas fa-bolt",
    time: "2 мин",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    disabled: true,
  },
  {
    id: 2,
    title: "Внимание",
    icon: "fas fa-eye",
    time: "2 мин",
    gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
    disabled: true,
  },
   {
    id: 3,
    title: "Паттерны",
    icon: "fas fa-shapes",
    time: "3 мин",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    disabled: true,
  },
  {
    id: 4,
    title: "Счет",
    icon: "fas fa-calculator",
    time: "3 мин",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    disabled: true,
  },
];

const getDifficultyClass = (difficulty) => {
  const classes = {
    'Легкая': "difficulty-easy",
    'Средняя': "difficulty-medium",
    'Сложная': "difficulty-hard",
  };
  return classes[difficulty] || "difficulty-medium";
};

const getScoreClass = (score) => {
  if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 75) return "text-cyan-600 dark:text-cyan-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-orange-600 dark:text-orange-400";
};
</script>

<style scoped>
.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 shadow-sm dark:shadow-none min-w-[100px];
}

.test-category-card {
  @apply relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 block overflow-hidden shadow-sm dark:shadow-none;
}

.test-category-card:not(.cursor-not-allowed):hover {
  @apply bg-slate-50 dark:bg-slate-900/70 transform -translate-y-1 shadow-lg shadow-cyan-500/10;
}

.card-shine {
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] transition-transform duration-1000;
}

.test-category-card:hover .card-shine {
  @apply translate-x-[100%];
}

.icon-wrapper {
  @apply w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg;
}

.difficulty-badge {
  @apply px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider;
}

.difficulty-easy {
  @apply bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20;
}

.difficulty-medium {
  @apply bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20;
}

.difficulty-hard {
  @apply bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20;
}

.quick-test-card {
  @apply p-4 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-purple-500/10 hover:border-purple-500/30 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300 block text-center shadow-sm dark:shadow-none relative;
}

.quick-test-card:not(.cursor-not-allowed):hover {
  @apply transform -translate-y-1;
}

.quick-icon-wrapper {
  @apply w-10 h-10 mx-auto rounded-xl flex items-center justify-center shadow-md;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fadeInUp 0.3s ease-out forwards;
}
</style>
