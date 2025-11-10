<!-- components/QuickToolCard.vue -->
<template>
  <div
    class="quick-tool-card group relative p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
    @click="handleToolClick"
  >
    <!-- Background Glow -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>

    <!-- Animated Border -->
    <div
      class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    >
      <div class="absolute inset-[1px] rounded-xl bg-slate-800/30"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center">
      <!-- Icon -->
      <div
        class="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-700/70"
      >
        <i :class="[tool.icon, tool.color]" class="text-xl"></i>
      </div>

      <!-- Title -->
      <h3
        class="text-sm font-semibold text-white mb-1 transition-colors duration-300 group-hover:text-cyan-300"
      >
        {{ tool.title }}
      </h3>

      <!-- Status Indicator -->
      <div class="flex items-center justify-center space-x-1">
        <div class="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
        <span class="text-xs text-slate-400">Готов</span>
      </div>

      <!-- Hover Action -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/80 rounded-xl"
      >
        <div class="text-center">
          <i class="fas fa-play text-cyan-400 text-lg mb-1"></i>
          <span class="text-xs text-cyan-400 font-medium">Запустить</span>
        </div>
      </div>
    </div>

    <!-- Pulse Effect on Hover -->
    <div
      class="absolute inset-0 rounded-xl border-2 border-cyan-400/30 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  tool: {
    type: Object,
    required: true,
  },
});

const handleToolClick = () => {
  // Navigate to the specific tool page or open modal
  const routes = {
    "mood-tracker": "/lab/psychology/mood-tracker",
    "stress-test": "/lab/psychology/stress-test",
    "focus-timer": "/lab/psychology/focus-timer",
    breathing: "/lab/psychology/breathing",
  };

  if (routes[props.tool.id]) {
    navigateTo(routes[props.tool.id]);
  } else {
    // Default behavior - show quick action
    console.log(`Quick tool activated: ${props.tool.title}`);

    // You could also emit an event for parent component to handle
    // emit('tool-activated', props.tool.id);
  }
};
</script>

<style scoped>
.quick-tool-card {
  transform: translateY(0);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.quick-tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.1),
    0 4px 6px -2px rgba(6, 182, 212, 0.05);
}
</style>
