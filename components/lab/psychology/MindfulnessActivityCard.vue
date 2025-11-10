<!-- components/lab/psychology/MindfulnessActivityCard.vue -->
<template>
  <div
    @click="$emit('start', activity)"
    class="activity-card group relative p-5 rounded-xl border-2 transition-all duration-500 cursor-pointer overflow-hidden hover:scale-105"
    :class="[
      'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50 hover:shadow-xl',
    ]"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${activity.color}`"
      style="opacity: 0.05"
    ></div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon -->
      <div class="flex items-center justify-between mb-4">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          :class="`bg-slate-700/50 text-slate-400 group-hover:shadow-lg`"
        >
          <i
            :class="activity.icon"
            class="text-xl group-hover:text-white transition-colors"
          ></i>
        </div>

        <!-- Duration Badge -->
        <div
          class="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/30"
        >
          <i class="fas fa-clock"></i>
          <span>{{ activity.duration }} мин</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors"
      >
        {{ activity.title }}
      </h3>

      <!-- Description -->
      <p
        class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors mb-4"
      >
        {{ activity.description }}
      </p>

      <!-- Start Button -->
      <button
        class="w-full py-2.5 rounded-lg bg-slate-700/30 text-slate-400 border border-slate-600/30 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 group-hover:text-purple-400 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
      >
        <i class="fas fa-play"></i>
        <span>Начать практику</span>
      </button>
    </div>

    <!-- Decorative Corner -->
    <div
      class="absolute bottom-0 right-0 w-16 h-16 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
      :class="`bg-gradient-to-tl ${activity.color}`"
      style="clip-path: polygon(100% 100%, 0 100%, 100% 0)"
    ></div>
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
