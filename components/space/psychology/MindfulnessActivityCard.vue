<!-- components/space/psychology/MindfulnessActivityCard.vue -->
<template>
  <div @click="$emit('start', activity)"
    class="activity-card group relative p-5 rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.02]"
    :class="[
      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:shadow-black/50',
    ]">
    <!-- Background Gradient -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${activity.color}`"></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon -->
      <div class="flex items-center justify-between mb-4">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
          :class="[
            `bg-gradient-to-br ${activity.color} bg-opacity-10 dark:bg-opacity-20`,
            'text-white'
          ]">
          <i :class="activity.icon" class="text-xl text-white drop-shadow-md"></i>
        </div>

        <!-- Duration Badge -->
        <div
          class="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <i class="fas fa-clock"></i>
          <span>{{ activity.duration }} мин</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
        {{ activity.title }}
      </h3>

      <!-- Description -->
      <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
        {{ activity.description }}
      </p>

      <!-- Start Button -->
      <button
        class="w-full py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 group-hover:border-teal-200 dark:group-hover:border-teal-700/50 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2">
        <i class="fas fa-play"></i>
        <span>Начать практику</span>
      </button>
    </div>

    <!-- Decorative Corner -->
    <div class="absolute bottom-0 right-0 w-16 h-16 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
      :class="`bg-gradient-to-tl ${activity.color}`" style="clip-path: polygon(100% 100%, 0 100%, 100% 0)"></div>
  </div>
</template>

<script setup>
defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

defineEmits(["start"]);
</script>

<style scoped>
.activity-card {
  @apply hover:shadow-slate-900/50;
}
</style>
