<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div
      class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4"
    >
      <div class="flex items-center gap-4">
        <div class="bg-sky-500/10 rounded-xl p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-sky-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Личностный рост</h3>
      </div>
      <div>
        <div class="flex justify-between text-sm text-slate-300 mb-2">
          <span>Пройдено тестов</span>
          <span class="font-bold text-white">
            {{ stats.testsCompleted }} / {{ stats.totalTests }}
          </span>
        </div>
        <div class="w-full bg-white/10 rounded-full h-2.5">
          <div
            class="bg-sky-500 h-2.5 rounded-full"
            :style="{
              width: `${(stats.testsCompleted / stats.totalTests) * 100}%`,
            }"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4"
    >
      <div class="flex items-center gap-4">
        <div class="bg-emerald-500/10 rounded-xl p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Ваша траектория</h3>
      </div>
      <div>
        <div class="flex justify-between text-sm text-slate-300 mb-2">
          <span>Активность</span>
          <span class="font-bold text-white">
            {{ stats.streakDays }} дней подряд
          </span>
        </div>
        <div class="w-full bg-white/10 rounded-full h-2.5">
          <div
            class="bg-emerald-500 h-2.5 rounded-full"
            :style="{
              width: `${Math.min((stats.streakDays / 30) * 100, 100)}%`,
            }"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4"
    >
      <div class="flex items-center gap-4">
        <div class="bg-purple-500/10 rounded-xl p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Последние действия</h3>
      </div>
      <ul class="space-y-2 text-sm text-slate-300">
        <li
          v-for="action in actions.slice(0, 3)"
          :key="action.id"
          class="flex justify-between"
        >
          <span class="">{{ action.description }}</span>
          <span class="text-white/50 ml-4">{{ action.date }}</span>
        </li>
      </ul>
    </div>

    <div
      class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-sky-500/20 space-y-4"
    >
      <div class="flex items-center gap-4">
        <div class="bg-pink-500/10 rounded-xl p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-pink-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-lienjoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-white/90">Рекомендации</h3>
      </div>
      <ul class="space-y-2 text-sm text-slate-300">
        <li
          v-for="recommendation in recommendations.slice(0, 3)"
          :key="recommendation.id"
          class="flex items-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-pink-500 mr-2 mt-1 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ recommendation.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({
      testsCompleted: 0,
      totalTests: 0,
      streakDays: 0,
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
