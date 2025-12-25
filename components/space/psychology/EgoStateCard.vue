<!-- components/space/psychology/EgoStateCard.vue -->
<template>
  <div
    class="ego-state-card relative p-6 border-2 transition-all duration-300 cursor-pointer overflow-hidden group h-full flex flex-col"
    :class="[
      isActive
        ? `border-${state.colorName}-500/50 border-b-0 rounded-t-2xl rounded-b-none bg-${state.colorName}-50 dark:bg-${state.colorName}-950/50`
        : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600/50 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-slate-900/50 shadow-sm dark:shadow-none',
    ]"
    @click="$emit('click')"
  >
    <!-- Animated Background Gradient -->
    <div
      v-if="!isActive"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${state.color}`"
      style="opacity: 0.03"
    ></div>

    <!-- Content -->
    <div class="relative z-10 flex-1 flex flex-col">
      <!-- Icon with Badge -->
      <div class="flex items-start justify-between mb-4">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative"
          :class="[
            isActive
              ? `bg-${state.colorName}-500/20 text-${state.colorName}-600 dark:text-${state.colorName}-400 shadow-lg shadow-${state.colorName}-500/30`
              : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-200 dark:group-hover:bg-slate-700/70',
          ]"
        >
          <i :class="state.icon" class="text-2xl"></i>

          <!-- Usage Badge -->
          <div
            v-if="usagePercentage !== undefined"
            class="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
            :class="[
              isActive
                ? `bg-${state.colorName}-500 text-white shadow-lg shadow-${state.colorName}-500/50`
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-600',
            ]"
          >
            {{ usagePercentage }}%
          </div>
        </div>

        <!-- Active Indicator -->
        <div v-if="isActive" class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <div class="w-2 h-2 rounded-full bg-cyan-400"></div>
        </div>
      </div>

      <!-- Title with Hover Effect -->
      <h3
        class="text-xl font-bold mb-2 transition-all duration-300 tracking-wide"
        :class="
          isActive
            ? `text-${state.colorName}-700 dark:text-${state.colorName}-400 drop-shadow-glow`
            : 'text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 group-hover:tracking-wider'
        "
      >
        {{ state.title }}
      </h3>

      <!-- Description -->
      <p
        class="text-slate-600 dark:text-slate-400 text-sm mb-5 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 flex-1"
      >
        {{ state.description }}
      </p>

      <!-- Characteristics with Enhanced Styling -->
      <div class="space-y-2 mt-auto">
        <div
          v-for="(char, index) in state.characteristics"
          :key="char"
          class="text-xs px-3 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2 transform hover:translate-x-1"
          :class="[
            isActive
              ? `bg-${state.colorName}-500/10 text-${state.colorName}-700 dark:text-${state.colorName}-400 border-${state.colorName}-500/30 shadow-sm`
              : 'bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-500 border-slate-200 dark:border-slate-600/30 group-hover:bg-slate-200 dark:group-hover:bg-slate-700/50 group-hover:text-slate-900 dark:group-hover:text-slate-300 group-hover:border-slate-300 dark:group-hover:border-slate-500/50',
          ]"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div
            class="w-1.5 h-1.5 rounded-full"
            :class="
              isActive ? `bg-${state.colorName}-600 dark:bg-${state.colorName}-400` : 'bg-slate-500 dark:bg-slate-500 group-hover:bg-slate-700 dark:group-hover:bg-slate-400'
            "
          ></div>
          <span class="font-medium">{{ char }}</span>
        </div>
      </div>

      <!-- Hover State Action Hint -->
      <div
        class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        v-if="!isActive"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-500 dark:text-slate-500">Нажмите для подробностей</span>
          <i class="fas fa-arrow-right text-slate-500 dark:text-slate-500"></i>
        </div>
      </div>

      <!-- Active State Info -->
      <div class="mt-4 pt-4 border-t" :class="`border-${state.colorName}-500/30`" v-if="isActive">
        <div class="flex items-center justify-between text-xs">
          <span class="font-medium" :class="`text-${state.colorName}-700 dark:text-${state.colorName}-400`">Активное состояние</span>
          <div class="flex items-center gap-1">
            <i class="fas fa-check-circle" :class="`text-${state.colorName}-700 dark:text-${state.colorName}-400`"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Corner Element -->
    <div
      class="absolute top-0 right-0 w-20 h-20 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
      :class="`bg-gradient-to-br ${state.color}`"
      style="clip-path: polygon(100% 0, 0 0, 100% 100%)"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  state: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  usagePercentage: {
    type: Number,
    default: undefined,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.drop-shadow-glow {
  filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4));
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

