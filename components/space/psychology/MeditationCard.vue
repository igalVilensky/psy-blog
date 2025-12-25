<!-- components/space/psychology/MeditationCard.vue -->
<template>
  <div
    class="meditation-card group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.02]"
    :class="[
      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:shadow-black/50',
    ]" @click="selectDuration">
    <!-- Background Gradient -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${technique.color}`"></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon & Difficulty -->
      <div class="flex items-start justify-between mb-4">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
          :class="[
            `bg-gradient-to-br ${technique.color} bg-opacity-10 dark:bg-opacity-20`,
            'text-white'
          ]">
          <i :class="technique.icon" class="text-2xl text-white drop-shadow-md"></i>
        </div>
        <span
          class="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
          {{ technique.difficulty }}
        </span>
      </div>

      <!-- Title & Description -->
      <h3
        class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
        {{ technique.title }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
        {{ technique.description }}
      </p>

      <!-- Benefits -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="benefit in technique.benefits" :key="benefit"
          class="text-xs px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
          {{ benefit }}
        </span>
      </div>

      <!-- Duration Options -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div
          class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <i class="fas fa-play-circle text-teal-500"></i>
          Начать практику
        </div>
        <div class="flex gap-2 flex-wrap">
          <button v-for="duration in technique.duration" :key="duration"
            @click.stop="$emit('start', technique, duration)"
            class="group/btn relative flex-1 min-w-[60px] text-xs font-bold py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              :class="`bg-gradient-to-r ${technique.color}`"></div>
            <span
              class="relative z-10 flex items-center justify-center gap-1 group-hover/btn:text-white transition-colors duration-300">
              <span>{{ duration }}</span>
              <span class="text-[10px] opacity-70">мин</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Hover State Indicator -->
      <div
        class="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <span>Выберите длительность</span>
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  technique: {
    type: Object,
    required: true,
  },
});

defineEmits(["start"]);

const selectDuration = () => {
  // Default behavior if clicked on card (not duration button)
  // Could show a modal or auto-select middle duration
  console.log("test");
};
</script>

<style scoped>
.meditation-card {
  @apply hover:shadow-slate-900/50;
}
</style>
