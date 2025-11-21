<!-- components/lab/psychology/BreathingCard.vue -->
<template>
  <div
    class="breathing-card group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden hover:scale-105"
    :class="[
      'border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl hover:border-slate-300/50 dark:hover:border-slate-600/50 hover:shadow-lg dark:hover:shadow-2xl shadow-sm dark:shadow-none',
    ]"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${exercise.color}`"
      style="opacity: 0.05"
    ></div>

    <!-- Content -->
    <div class="relative z-10">
      <div class="flex items-start gap-4 mb-4">
        <!-- Icon -->
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
          :class="`bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 group-hover:shadow-lg`"
        >
          <i
            :class="exercise.icon"
            class="text-2xl group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
          ></i>
        </div>

        <!-- Title & Description -->
        <div class="flex-1">
          <h3
            class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors"
          >
            {{ exercise.title }}
          </h3>
          <p
            class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors"
          >
            {{ exercise.description }}
          </p>
        </div>
      </div>

      <!-- Pattern Display -->
      <div
        class="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-200 dark:border-slate-700/30"
      >
        <div class="text-xs text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wide">
          Паттерн дыхания
        </div>
        <div class="text-sm text-cyan-600 dark:text-cyan-400 font-mono">
          {{ exercise.pattern }}
        </div>
      </div>

      <!-- Duration Options -->
      <div
        class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/50"
      >
        <div class="flex items-center gap-2">
          <i class="fas fa-clock text-slate-500 dark:text-slate-500 text-xs"></i>
          <span class="text-slate-500 dark:text-slate-500 text-xs">Длительность</span>
        </div>
        <div class="flex gap-2">
          <button
            v-for="duration in exercise.duration"
            :key="duration"
            @click="$emit('start', exercise, duration)"
            class="text-xs px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600/30 hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 font-medium"
          >
            {{ duration }} мин
          </button>
        </div>
      </div>

      <!-- Hover Indicator -->
      <div
        class="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
      >
        <div class="text-xs text-slate-500 dark:text-slate-500 text-center">
          <i class="fas fa-hand-pointer mr-1"></i>
          Выберите длительность для начала
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});

defineEmits(["start"]);
</script>

<style scoped>
.breathing-card {
  @apply hover:shadow-slate-900/50;
}
</style>
