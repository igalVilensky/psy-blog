<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Tests Section -->
    <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4">
      <div class="flex items-center gap-4">
        <div class="bg-sky-500/10 rounded-xl p-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Тесты</h3>
      </div>
      <div v-if="stats.tests?.completedTest">
        <div class="text-sm text-slate-300 mb-2">
          <span>Завершён: {{ stats.tests.completedTest.name }}</span>
        </div>
        <ul class="text-sm text-slate-300 space-y-1">
          <li v-for="(archetype, index) in stats.tests.completedTest
            .topArchetypes" :key="index">
            {{ archetype.name }} ({{ archetype.score }})
          </li>
        </ul>
        <a v-if="stats?.tests?.ctas?.length" :href="stats?.tests?.ctas[0]?.link"
          class="text-sky-400 hover:text-sky-300 text-sm font-medium mt-2 inline-block">
          Пройти {{ stats?.tests?.ctas[0]?.name }}
          <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
      <div v-else>
        <div class="text-sm text-slate-300 mb-2">
          <span>Пройдите тесты, чтобы узнать себя лучше!</span>
        </div>
        <div class="space-y-2">
          <a v-for="cta in stats?.tests?.ctas" :key="cta?.name" :href="cta?.link"
            class="text-sky-400 hover:text-sky-300 text-sm font-medium block">
            {{ cta?.name }} <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Courses Section -->
    <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4">
      <div class="flex items-center gap-4">
        <div class="bg-emerald-500/10 rounded-xl p-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Курсы</h3>
      </div>
      <div v-if="stats.courses?.purchasedCourses.length > 0">
        <ul class="text-sm text-slate-300 space-y-1">
          <li v-for="(course, index) in stats.courses.purchasedCourses" :key="index">
            {{ course.name }} ({{ course.progressPercentage }}% завершено)
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="text-sm text-slate-300 mb-2">
          <span>Начните обучение с наших курсов!</span>
        </div>
        <a :href="stats?.courses?.cta?.link" class="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
          Перейти к курсам <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>

    <!-- Recent Actions Section -->
    <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4">
      <div class="flex items-center gap-4">
        <div class="bg-purple-500/10 rounded-xl p-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Последние действия</h3>
      </div>
      <ul class="space-y-2 text-sm text-slate-300">
        <li v-for="action in actions.slice(0, 3)" :key="action.id" class="flex justify-between">
          <span>{{ action.description }}</span>
          <span class="text-white/50 ml-4">{{ action.date }}</span>
        </li>
      </ul>
    </div>

    <!-- Tools Section -->
    <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4">
      <div class="flex items-center gap-4">
        <div class="bg-pink-500/10 rounded-xl p-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Инструменты</h3>
      </div>
      <div v-if="stats.tools?.emotionStats">
        <div class="text-sm text-slate-300 mb-2">
          <span>
            Записей в эмоциональном барометре:
            {{ stats.tools.emotionStats.totalEntries }}
          </span>
        </div>
        <a :href="stats.tools.reminder.link" class="text-pink-400 hover:text-pink-300 text-sm font-medium">
          Добавить запись <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
      <div v-else>
        <div class="text-sm text-slate-300 mb-2">
          <span>Попробуйте эмоциональный барометр!</span>
        </div>
        <a :href="stats?.tools?.cta?.link" class="text-pink-400 hover:text-pink-300 text-sm font-medium">
          Начать <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({
      tests: null,
      courses: null,
      tools: null,
    }),
  },
  actions: {
    type: Array,
    default: () => [],
  },
  recommendations: {
    type: Array,
    default: () => [],
  },
});
</script>
