<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <div
      class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20"
    >
      <h3 class="text-lg font-medium text-white mb-2">Тесты</h3>
      <p class="text-slate-300">
        {{ stats.testsCompleted }} из {{ stats.totalTests }} тестов завершено
      </p>
    </div>
    <div
      class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20"
    >
      <h3 class="text-lg font-medium text-white mb-2">Последние действия</h3>
      <ul class="text-slate-300 text-sm">
        <li v-for="action in actions" :key="action.id" class="mb-1">
          {{ action.description }} – {{ action.date }}
        </li>
      </ul>
    </div>
    <div
      class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20"
    >
      <h3 class="text-lg font-medium text-white mb-2">Рекомендации</h3>
      <ul class="text-slate-300 text-sm">
        <li
          v-for="recommendation in recommendations"
          :key="recommendation.id"
          class="mb-1"
        >
          {{ recommendation.text }}
        </li>
      </ul>
    </div>
    <div
      class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20"
    >
      <h3 class="text-lg font-medium text-white mb-2">Активность</h3>
      <p class="text-slate-300">
        Вы активны {{ stats.streakDays }} дней подряд!
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: Object,
  actions: Array,
  recommendations: Array,
});
</script>
