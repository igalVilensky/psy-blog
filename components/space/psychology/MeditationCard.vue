<!-- components/space/psychology/MeditationCard.vue -->
<template>
  <div
    class="meditation-card group relative p-8 rounded-[2rem] border transition-all duration-700 cursor-pointer overflow-hidden hover:scale-[1.02]"
    :class="[
      'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl dark:hover:shadow-black/60',
    ]" @click="selectDuration">
    <!-- Background Gradient -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
      :class="`bg-gradient-to-br ${technique.color}`"></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon & Difficulty -->
      <div class="flex items-start justify-between mb-6">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-xl"
          :class="[
            `bg-gradient-to-br ${technique.color} bg-opacity-10 dark:bg-opacity-20`,
          ]">
          <i :class="technique.icon" class="text-3xl text-white drop-shadow-2xl"></i>
        </div>
        <span
          class="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
          {{ technique.difficulty }}
        </span>
      </div>

      <!-- Title & Description -->
      <h3
        class="text-2xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tight group-hover:text-cyan-500 transition-colors duration-500">
        {{ technique.title }}
      </h3>
      <p class="text-zinc-600 dark:text-zinc-400 text-base font-medium mb-6 leading-relaxed">
        {{ technique.description }}
      </p>

      <!-- Benefits -->
      <div class="flex flex-wrap gap-2 mb-8">
        <span v-for="benefit in technique.benefits" :key="benefit"
          class="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700">
          {{ benefit }}
        </span>
      </div>

      <!-- Duration Options -->
      <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
        <div
          class="text-[10px] font-black text-zinc-400 dark:text-zinc-500 mb-4 uppercase tracking-widest flex items-center gap-2">
          <i class="fas fa-bolt text-cyan-500"></i>
          Старт сессии
        </div>
        <div class="flex gap-2 flex-wrap">
          <button v-for="duration in technique.duration" :key="duration"
            @click.stop="$emit('start', technique, duration)"
            class="group/btn relative flex-1 min-w-[70px] text-xs font-black uppercase tracking-widest py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-transparent transition-all duration-500 overflow-hidden">
            <div class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
              :class="`bg-gradient-to-r ${technique.color}`"></div>
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
  technique: {
    type: Object,
    required: true,
  },
});

defineEmits(["start"]);

const selectDuration = () => {
  // Logic could go here
};
</script>

<style scoped>
.meditation-card {
  @apply transition-transform duration-700 ease-in-out;
}
</style>
