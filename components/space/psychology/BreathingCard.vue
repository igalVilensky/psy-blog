<!-- components/space/psychology/BreathingCard.vue -->
<template>
  <div
    class="breathing-card group relative p-8 rounded-[2rem] border transition-all duration-700 cursor-pointer overflow-hidden hover:scale-[1.02]"
    :class="[
      'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl dark:hover:shadow-black/60',
    ]">
    <!-- Background Gradient -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
      :class="`bg-gradient-to-br ${exercise.color}`"></div>

    <!-- Content -->
    <div class="relative z-10">
      <div class="flex items-start gap-6 mb-8">
        <!-- Icon -->
        <div
          class="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 flex-shrink-0 shadow-2xl"
          :class="[
            `bg-gradient-to-br ${exercise.color} bg-opacity-10 dark:bg-opacity-20`,
          ]">
          <i :class="exercise.icon" class="text-3xl text-white drop-shadow-2xl"></i>
        </div>

        <!-- Title & Description -->
        <div class="flex-1">
          <h3
            class="text-2xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tight group-hover:text-cyan-500 transition-colors duration-500">
            {{ exercise.title }}
          </h3>
          <p class="text-zinc-600 dark:text-zinc-400 text-base font-medium leading-relaxed">
            {{ exercise.description }}
          </p>
        </div>
      </div>

      <!-- Pattern Display -->
      <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-5 mb-8 border border-zinc-100 dark:border-zinc-700">
        <div class="text-[10px] text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-widest font-black">
          Паттерн дыхания
        </div>
        <div class="text-lg text-cyan-500 dark:text-cyan-400 font-mono font-black italic tracking-tighter">
          {{ exercise.pattern }}
        </div>
      </div>

      <!-- Duration Options -->
      <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
        <div
          class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 mb-4 uppercase tracking-widest flex items-center gap-2">
          <i class="fas fa-play-circle text-cyan-500"></i>
          Запуск таймера
        </div>
        <div class="flex gap-2 flex-wrap">
          <button v-for="duration in exercise.duration" :key="duration" @click.stop="$emit('start', exercise, duration)"
            class="group/btn relative flex-1 min-w-[70px] text-xs font-black uppercase tracking-widest py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-transparent transition-all duration-500 overflow-hidden">
            <div class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              :class="`bg-gradient-to-r ${exercise.color}`"></div>
            <span
              class="relative z-10 flex items-center justify-center gap-1 group-hover/btn:text-white transition-colors duration-500">
              <span>{{ duration }}</span>
              <span class="text-[10px] opacity-70">мин</span>
            </span>
          </button>
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
  @apply transition-transform duration-700 ease-in-out;
}
</style>
