<template>
  <NuxtLink
    :to="to"
    class="mobile-station group flex flex-col items-center p-3 rounded-xl transition-all duration-300 relative overflow-hidden text-center"
    :class="
      active
        ? `bg-gradient-to-br from-${gradientFrom}/20 to-${gradientTo}/20 border-2 border-${gradientFrom}/40 shadow-lg shadow-${gradientFrom}/20`
        : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-transparent hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-500/20'
    "
    @click.native="$emit('click')"
  >
    <div
      class="instrument-icon w-12 h-12 rounded-xl flex items-center justify-center relative z-10 mb-2 transition-transform duration-300 group-hover:scale-110"
      :class="`bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`"
    >
      <i class="fas text-white text-base" :class="icon"></i>
    </div>
    <div class="relative z-10 w-full">
      <div class="text-slate-800 dark:text-white font-semibold text-xs leading-tight truncate mb-0.5">
        {{ title }}
      </div>
      <div class="text-slate-600 dark:text-slate-400 text-xs leading-tight truncate">
        {{ subtitle }}
      </div>
    </div>
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

defineEmits(["click"]);
</script>
