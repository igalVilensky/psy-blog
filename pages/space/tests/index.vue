<template>
  <div
    class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white font-sans transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <Breadcrumbs />

      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Тесты и методики
            </h1>
            <p class="text-stone-600 dark:text-stone-400 text-base leading-relaxed max-w-2xl">
              Профессиональные инструменты для исследования личности и когнитивных способностей
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-2xl font-bold text-stone-900 dark:text-white">{{ tests.length }}</div>
              <div class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                Всего
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-stone-900 dark:text-white">
                {{tests.filter(t => t.category === 'psychology').length}}
              </div>
              <div class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                Психология
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-stone-900 dark:text-white">
                {{tests.filter(t => t.category === 'cognitive').length}}
              </div>
              <div class="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                Когнитивные
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Navigation -->
      <div class="flex flex-wrap items-center gap-2 mb-8">
        <button v-for="filter in filters" :key="filter.value" @click="currentFilter = filter.value"
          class="px-5 py-2.5 text-sm font-medium transition-all duration-300 border-2" :class="[
            currentFilter === filter.value
              ? 'bg-stone-900 dark:bg-white border-stone-900 dark:border-white text-white dark:text-stone-900'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-stone-900 dark:hover:border-white hover:text-stone-900 dark:hover:text-white'
          ]">
          <i :class="[filter.icon, 'mr-2']"></i>
          {{ filter.label }}
        </button>
      </div>

      <!-- Category Description -->
      <div class="mb-8 p-6 bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-white">
        <div class="flex items-start gap-4">
          <div
            class="w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 border-stone-900 dark:border-white">
            <i :class="[currentCategoryInfo.icon, 'text-stone-900 dark:text-white']"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-2">
              {{ currentCategoryInfo.title }}
            </h3>
            <p class="text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
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
            <div class="icon-wrapper border-2 border-stone-900 dark:border-white relative">
              <i :class="test.icon" class="text-stone-900 dark:text-white text-xl"></i>

              <!-- Lock overlay for disabled tests -->
              <div v-if="test.disabled"
                class="absolute inset-0 bg-white/90 dark:bg-stone-900/90 flex items-center justify-center">
                <i class="fas fa-lock text-stone-900 dark:text-white text-sm"></i>
              </div>
            </div>
            <span class="difficulty-badge"
              :class="test.disabled ? 'text-stone-400 dark:text-stone-600 border-stone-400 dark:border-stone-600' : ''">
              {{ test.difficulty }}
            </span>
          </div>

          <!-- Content -->
          <h3 class="text-lg font-semibold mb-2 transition-colors"
            :class="test.disabled ? 'text-stone-400 dark:text-stone-600' : (!test.disabled && 'group-hover:text-stone-900 dark:group-hover:text-white')">
            {{ test.title }}
          </h3>
          <p class="text-sm mb-1 font-medium"
            :class="test.disabled ? 'text-stone-400 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'">
            {{ test.subtitle }}
          </p>
          <p class="text-sm leading-relaxed mb-4 line-clamp-3"
            :class="test.disabled ? 'text-stone-400 dark:text-stone-600' : 'text-stone-600 dark:text-stone-300'">
            {{ test.description }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t-2"
            :class="test.disabled ? 'border-stone-400 dark:border-stone-600' : 'border-stone-900 dark:border-white'">
            <div class="flex items-center gap-2" :class="test.disabled ? 'text-stone-400 dark:text-stone-600' : ''">
              <i class="fas fa-clock text-xs"></i>
              <span class="text-xs font-medium">{{ test.duration }}</span>
            </div>
            <div class="flex items-center gap-2" :class="test.disabled ? 'text-stone-400 dark:text-stone-600' : ''">
              <i class="fas text-xs" :class="test.disabled ? 'fa-lock' : 'fa-check-circle'"></i>
              <span class="text-xs font-medium">{{ test.disabled ? 'Скоро' : 'Доступен' }}</span>
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
          <h2 class="text-xl font-semibold">БЫСТРЫЕ ТЕСТЫ</h2>
          <span class="text-sm text-stone-500 dark:text-stone-400">Менее 5 минут</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink to="/space/tests/digit-span" class="quick-test-card group">
            <div class="quick-icon-wrapper border-2 border-stone-900 dark:border-white">
              <i class="fas fa-brain text-stone-900 dark:text-white text-lg"></i>
            </div>
            <h4 class="text-sm font-medium mt-3 mb-1">Объем памяти</h4>
            <p class="text-stone-500 dark:text-stone-400 text-xs">5 мин</p>
          </NuxtLink>

          <div v-for="quickTest in quickTests" :key="quickTest.id" class="quick-test-card relative overflow-hidden"
            :class="[quickTest.disabled ? 'cursor-not-allowed' : 'cursor-pointer']">

            <div class="quick-icon-wrapper border-2 border-stone-900 dark:border-white relative">
              <i :class="quickTest.icon" class="text-stone-900 dark:text-white text-lg"></i>

              <!-- Lock overlay for disabled tests -->
              <div v-if="quickTest.disabled"
                class="absolute inset-0 bg-stone-50/90 dark:bg-stone-900/90 flex items-center justify-center">
                <i class="fas fa-lock text-stone-900 dark:text-white text-sm"></i>
              </div>
            </div>

            <h4 class="text-sm font-medium mt-3 mb-1"
              :class="quickTest.disabled ? 'text-stone-400 dark:text-stone-600' : ''">
              {{ quickTest.title }}
            </h4>
            <p class="text-xs"
              :class="quickTest.disabled ? 'text-stone-400 dark:text-stone-600' : 'text-stone-500 dark:text-stone-400'">
              {{ quickTest.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <div class="p-6 border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-900">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            class="w-12 h-12 border-2 border-stone-900 dark:border-white flex items-center justify-center flex-shrink-0">
            <i class="fas fa-info-circle text-stone-900 dark:text-white text-xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold mb-1">Как выбрать тест?</h4>
            <p class="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
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
  @apply text-center px-4 py-3 border-2 border-stone-900 dark:border-white bg-white dark:bg-stone-900 min-w-[100px];
}

.test-category-card {
  @apply relative p-6 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white transition-all duration-300 block bg-white dark:bg-stone-900;
}

.test-category-card:not(.cursor-not-allowed):hover {
  @apply bg-stone-50 dark:bg-stone-800;
}

.icon-wrapper {
  @apply w-12 h-12 flex items-center justify-center flex-shrink-0;
}

.difficulty-badge {
  @apply px-2.5 py-1 text-xs font-semibold uppercase tracking-wider border-2 border-stone-900 dark:border-white;
}

.quick-test-card {
  @apply p-4 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 block text-center bg-white dark:bg-stone-900 relative;
}

.quick-icon-wrapper {
  @apply w-10 h-10 mx-auto flex items-center justify-center;
}
</style>