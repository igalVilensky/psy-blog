<!-- components/space/psychology/BreathingCard.vue -->
<template>
  <div
    class="breathing-card group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.02]"
    :class="[
      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:shadow-black/50',
    ]">
    <!-- Background Gradient -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${exercise.color}`"></div>

    <!-- Content -->
    <div class="relative z-10">
      <div class="flex items-start gap-4 mb-4">
        <!-- Icon -->
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 shadow-sm"
          :class="[
            `bg-gradient-to-br ${exercise.color} bg-opacity-10 dark:bg-opacity-20`,
            'text-white'
          ]">
          <i :class="exercise.icon" class="text-2xl text-white drop-shadow-md"></i>
        </div>

        <!-- Title & Description -->
        <div class="flex-1">
          <h3
            class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {{ exercise.title }}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {{ exercise.description }}
          </p>
        </div>
      </div>

      <!-- Pattern Display -->
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-100 dark:border-slate-700">
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide font-semibold">
          Паттерн дыхания
        </div>
        <div class="text-sm text-teal-600 dark:text-teal-400 font-mono font-medium">
          {{ exercise.pattern }}
        </div>
      </div>

      <!-- Duration Options -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div
          class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <i class="fas fa-play-circle text-teal-500"></i>
          Начать практику
        </div>
        <div class="flex gap-2 flex-wrap">
          <button v-for="duration in exercise.duration" :key="duration" @click.stop="$emit('start', exercise, duration)"
            class="group/btn relative flex-1 min-w-[60px] text-xs font-bold py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              :class="`bg-gradient-to-r ${exercise.color}`"></div>
            <span
              class="relative z-10 flex items-center justify-center gap-1 group-hover/btn:text-white transition-colors duration-300">
              <span>{{ duration }}</span>
              <span class="text-[10px] opacity-70">мин</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Hover Indicator -->
      <div
        class="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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
