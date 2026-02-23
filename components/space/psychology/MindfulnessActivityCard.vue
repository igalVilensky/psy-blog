<!-- components/space/psychology/MindfulnessActivityCard.vue -->
<template>
  <div @click="$emit('start', activity)"
    class="activity-card group relative p-6 rounded-[2rem] border transition-all duration-700 cursor-pointer overflow-hidden hover:scale-[1.02]"
    :class="[
      'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl dark:hover:shadow-black/60',
    ]">
    <!-- Background Gradient -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
      :class="`bg-gradient-to-br ${activity.color}`"></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon -->
      <div class="flex items-center justify-between mb-6">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-xl"
          :class="[
            `bg-gradient-to-br ${activity.color} bg-opacity-10 dark:bg-opacity-20`,
          ]">
          <i :class="activity.icon" class="text-2xl text-white drop-shadow-2xl"></i>
        </div>

        <!-- Duration Badge -->
        <div
          class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
          <i class="fas fa-clock text-cyan-500"></i>
          <span>{{ activity.duration }} мин</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tight group-hover:text-cyan-500 transition-colors duration-500 leading-tight">
        {{ activity.title }}
      </h3>

      <!-- Description -->
      <p class="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed mb-6">
        {{ activity.description }}
      </p>

      <!-- Start Button -->
      <button
        class="w-full py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 group-hover:bg-cyan-500 group-hover:border-transparent group-hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm">
        <i class="fas fa-play"></i>
        <span>Начать сессию</span>
      </button>
    </div>

    <!-- Decorative Corner -->
    <div class="absolute bottom-0 right-0 w-24 h-24 opacity-0 transition-opacity duration-700 group-hover:opacity-10"
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
  @apply transition-transform duration-700 ease-in-out;
}
</style>
