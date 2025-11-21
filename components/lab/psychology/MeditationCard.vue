<!-- components/lab/psychology/MeditationCard.vue -->
<template>
  <div
    class="meditation-card group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden hover:scale-105"
    :class="[
      'border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl hover:border-slate-300/50 dark:hover:border-slate-600/50 hover:shadow-lg dark:hover:shadow-2xl shadow-sm dark:shadow-none',
    ]"
    @click="selectDuration"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${technique.color}`"
      style="opacity: 0.05"
    ></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon & Difficulty -->
      <div class="flex items-start justify-between mb-4">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          :class="`bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 group-hover:shadow-lg`"
        >
          <i
            :class="technique.icon"
            class="text-2xl group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
          ></i>
        </div>
        <span
          class="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600/30"
        >
          {{ technique.difficulty }}
        </span>
      </div>

      <!-- Title & Description -->
      <h3
        class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors"
      >
        {{ technique.title }}
      </h3>
      <p
        class="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors"
      >
        {{ technique.description }}
      </p>

      <!-- Benefits -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="benefit in technique.benefits"
          :key="benefit"
          class="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-500 border border-slate-200 dark:border-slate-600/30"
        >
          {{ benefit }}
        </span>
      </div>

      <!-- Duration Options -->
      <div class="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700/50">
        <i class="fas fa-clock text-slate-500 dark:text-slate-500 text-xs"></i>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="duration in technique.duration"
            :key="duration"
            @click.stop="$emit('start', technique, duration)"
            class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600/30 hover:bg-teal-500/20 hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300"
          >
            {{ duration }} мин
          </button>
        </div>
      </div>

      <!-- Hover State Indicator -->
      <div
        class="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
      >
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
