<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50/50 to-white dark:from-zinc-950/50 dark:to-black text-zinc-900 dark:text-white font-sans transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <Breadcrumbs />

      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Тесты и методики
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed max-w-2xl font-medium">
              Профессиональные инструменты для исследования личности и когнитивных способностей
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div
                class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                {{ tests.length }}</div>
              <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-bold">
                Всего
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-zinc-900 dark:text-white">
                {{tests.filter(t => t.category === 'psychology').length}}
              </div>
              <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-bold">
                Психология
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-zinc-900 dark:text-white">
                {{tests.filter(t => t.category === 'cognitive').length}}
              </div>
              <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-bold">
                Когнитивные
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Navigation -->
      <div class="flex flex-wrap items-center gap-2 mb-8">
        <button v-for="filter in filters" :key="filter.value" @click="currentFilter = filter.value"
          class="px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl" :class="[
            currentFilter === filter.value
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400'
          ]">
          <i :class="[filter.icon, 'mr-2']"></i>
          {{ filter.label }}
        </button>
      </div>

      <!-- Category Description -->
      <div
        class="mb-8 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-cyan-500 rounded-2xl">
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl">
            <i :class="[currentCategoryInfo.icon, 'text-cyan-600 dark:text-cyan-400']"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-2">
              {{ currentCategoryInfo.title }}
            </h3>
            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm font-medium">
              {{ currentCategoryInfo.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tests Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="test in filteredTests" :key="test.id" :to="test.disabled ? '' : test.link"
          class="test-category-card group relative" :class="[test.disabled ? 'cursor-not-allowed' : 'cursor-pointer']">

          <!-- Icon Header -->
          <div class="flex items-start justify-between mb-4 relative">
            <div class="icon-wrapper relative">
              <i :class="test.icon" class="text-cyan-600 dark:text-cyan-400 text-xl"></i>

              <!-- Lock overlay for disabled tests -->
              <div v-if="test.disabled"
                class="absolute inset-0 bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center rounded-xl">
                <i class="fas fa-lock text-zinc-400 dark:text-zinc-600 text-sm"></i>
              </div>
            </div>
            <span class="difficulty-badge"
              :class="test.disabled ? 'text-zinc-400 dark:text-zinc-600 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800' : 'text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800'">
              {{ test.difficulty }}
            </span>
          </div>

          <!-- Content -->
          <h3 class="text-lg font-bold mb-2 transition-colors"
            :class="test.disabled ? 'text-zinc-400 dark:text-zinc-600' : (!test.disabled && 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400')">
            {{ test.title }}
          </h3>
          <p class="text-sm mb-1 font-bold uppercase tracking-wide"
            :class="test.disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'">
            {{ test.subtitle }}
          </p>
          <p class="text-sm leading-relaxed mb-4 line-clamp-3 font-medium"
            :class="test.disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-600 dark:text-zinc-300'">
            {{ test.description }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t"
            :class="test.disabled ? 'border-zinc-200 dark:border-zinc-800' : 'border-zinc-200 dark:border-zinc-800'">
            <div class="flex items-center gap-2"
              :class="test.disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'">
              <i class="fas fa-clock text-xs"></i>
              <span class="text-xs font-bold">{{ test.duration }}</span>
            </div>
            <div class="flex items-center gap-2"
              :class="test.disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-emerald-600 dark:text-emerald-400'">
              <i class="fas text-xs" :class="test.disabled ? 'fa-lock' : 'fa-check-circle'"></i>
              <span class="text-xs font-bold">{{ test.disabled ? 'Скоро' : 'Доступен' }}</span>
            </div>
          </div>

          <!-- Disabled overlay -->
          <div v-if="test.disabled" class="absolute inset-0 pointer-events-none">
          </div>
        </NuxtLink>
      </div>

      <!-- Quick Tests Section -->
      <div class="mt-16 mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold uppercase tracking-tight">БЫСТРЫЕ ТЕСТЫ</h2>
          <span class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Менее 5 минут</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink to="/space/tests/digit-span" class="quick-test-card group">
            <div class="quick-icon-wrapper">
              <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-lg"></i>
            </div>
            <h4
              class="text-sm font-bold mt-3 mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Объем памяти</h4>
            <p class="text-zinc-500 dark:text-zinc-400 text-xs font-medium">5 мин</p>
          </NuxtLink>

          <div v-for="quickTest in quickTests" :key="quickTest.id" class="quick-test-card relative overflow-hidden"
            :class="[quickTest.disabled ? 'cursor-not-allowed' : 'cursor-pointer']">

            <div class="quick-icon-wrapper relative">
              <i :class="quickTest.icon" class="text-cyan-600 dark:text-cyan-400 text-lg"></i>

              <!-- Lock overlay for disabled tests -->
              <div v-if="quickTest.disabled"
                class="absolute inset-0 bg-zinc-50/90 dark:bg-zinc-900/90 flex items-center justify-center rounded-xl">
                <i class="fas fa-lock text-zinc-400 dark:text-zinc-600 text-sm"></i>
              </div>
            </div>

            <h4 class="text-sm font-bold mt-3 mb-1"
              :class="quickTest.disabled ? 'text-zinc-400 dark:text-zinc-600' : ''">
              {{ quickTest.title }}
            </h4>
            <p class="text-xs font-medium"
              :class="quickTest.disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'">
              {{ quickTest.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <div
        class="p-6 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-cyan-500 bg-white dark:bg-zinc-900 rounded-2xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            class="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 rounded-xl">
            <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-bold mb-1">Как выбрать тест?</h4>
            <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
              Когнитивные тесты оценивают работу мозга (память, внимание), а психологические — особенности личности и
              характера.
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
    icon: 'fas fa-flask'
  },
  psychology: {
    title: 'Психология Личности',
    description: 'Глубинные методики для исследования вашего характера, мотивов, бессознательных установок и эмоциональной сферы. Познай себя настоящего.',
    icon: 'fas fa-user-astronaut'
  },
  cognitive: {
    title: 'Когнитивные Функции',
    description: 'Интерактивные тесты для оценки производительности мозга: рабочей памяти, внимания, скорости реакции и логического мышления. Измерь свой потенциал.',
    icon: 'fas fa-brain'
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
    difficulty: "Средняя",
    duration: "25 мин",
    link: "/space/tests/life-purpose-archetype",
    category: "psychology",
    disabled: false
  },
  {
    id: "big-5-model",
    title: "Большая Пятёрка",
    subtitle: "Научная модель личности",
    description: "Золотой стандарт современной психометрии. Оценка 5 ключевых черт: Экстраверсия, Доброжелательность, Добросовестность, Нейротизм, Открытость.",
    icon: "fas fa-chart-bar",
    difficulty: "Средняя",
    duration: "20 мин",
    link: "/space/tests/big-5-model",
    category: "psychology",
    disabled: false
  },
  // --- Cognitive ---
  {
    id: "digit-span",
    title: "Тест объема памяти",
    subtitle: "Рабочая память (Digit Span)",
    description: "Классический нейропсихологический тест (WAIS) на объем слуховой рабочей памяти. Способность удерживать числа в уме.",
    icon: "fas fa-sort-numeric-up",
    difficulty: "Средняя",
    duration: "5-8 мин",
    link: "/space/tests/digit-span",
    category: "cognitive",
    disabled: false
  },
  {
    id: "nback",
    title: "Тест N-Back",
    subtitle: "Флюидный интеллект",
    description: "Продвинутая задача на рабочую память и контроль внимания. Доказанная эффективность в улучшении когнитивных способностей.",
    icon: "fas fa-layer-group",
    difficulty: "Сложная",
    duration: "5-10 мин",
    link: "/space/tests/nback",
    category: "cognitive",
    disabled: false
  },
  {
    id: "trail-making",
    title: "TMT Тест",
    subtitle: "Когнитивная гибкость (Trail Making)",
    description: "Тест на визуальное внимание и переключаемость. Соедините точки в правильном порядке максимально быстро.",
    icon: "fas fa-route",
    difficulty: "Легкая",
    duration: "3-5 мин",
    link: "/space/tests/trail-making",
    category: "cognitive",
    disabled: false
  },
  // --- Placeholders (Coming Soon) ---
  {
    id: "stroop",
    title: "Эффект Струпа",
    subtitle: "Тормозной контроль",
    description: "Тест на способность подавлять автоматические реакции. Называйте цвет шрифта, игнорируя значение слова.",
    icon: "fas fa-font",
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
    difficulty: "Сложная",
    duration: "20 мин",
    link: "/space/tests/raven",
    category: "cognitive",
    disabled: false
  },
  {
    id: "eq",
    title: "Эмоциональный Интеллект",
    subtitle: "Эмпатия и самоконтроль",
    description: "Оценка вашей способности распознавать свои и чужие эмоции, управлять ими и использовать для решения задач.",
    icon: "fas fa-heart",
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

// --- Quick Tests Data ---
const quickTests = [
  {
    id: 1,
    title: "Реакция",
    icon: "fas fa-bolt",
    time: "2 мин",
    disabled: true,
  },
  {
    id: 2,
    title: "Внимание",
    icon: "fas fa-eye",
    time: "2 мин",
    disabled: true,
  },
  {
    id: 3,
    title: "Паттерны",
    icon: "fas fa-shapes",
    time: "3 мин",
    disabled: true,
  },
  {
    id: 4,
    title: "Счет",
    icon: "fas fa-calculator",
    time: "3 мин",
    disabled: true,
  },
];
</script>

<style scoped>
.stat-card {
  @apply text-center px-4 py-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 min-w-[100px] rounded-xl;
}

.test-category-card {
  @apply relative p-6 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 transition-all duration-300 block bg-white dark:bg-zinc-900 rounded-2xl;
}

.test-category-card:not(.cursor-not-allowed):hover {
  @apply bg-zinc-50 dark:bg-zinc-800/50 shadow-lg;
}

.icon-wrapper {
  @apply w-12 h-12 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl;
}

.difficulty-badge {
  @apply px-2.5 py-1 text-xs font-bold uppercase tracking-wider border rounded-lg;
}

.quick-test-card {
  @apply p-4 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 block text-center bg-white dark:bg-zinc-900 relative rounded-xl;
}

.quick-icon-wrapper {
  @apply w-12 h-12 mx-auto flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl;
}
</style>