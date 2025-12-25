<template>
  <NuxtLink
    :to="to"
    class="station group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 relative overflow-hidden"
    :class="
      active
        ? `bg-gradient-to-r from-${gradientFrom}/20 to-${gradientTo}/20 border border-${gradientFrom}/40 shadow-lg shadow-${gradientFrom}/10`
        : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-transparent hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-500/20'
    "
  >
    <div
      class="instrument-icon w-9 h-9 rounded-lg flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110"
      :class="`bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`"
    >
      <i class="fas text-white text-sm" :class="icon"></i>
    </div>
    <div class="flex-1 relative z-10 min-w-0">
      <div class="text-slate-900 dark:text-white font-medium text-sm leading-tight truncate">
        {{ title }}
      </div>
      <div class="text-slate-500 dark:text-slate-400 text-xs leading-tight truncate">
        {{ subtitle }}
      </div>
    </div>
    <div
      v-if="active"
      class="activity-pulse w-2 h-2 rounded-full animate-pulse relative z-10"
      :class="`bg-${gradientFrom}`"
    ></div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  gradientFrom: {
    type: String,
    default: "blue-500",
  },
  gradientTo: {
    type: String,
    default: "indigo-600",
  },
});
</script>
