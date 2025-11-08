<template>
  <NuxtLink
    :to="to"
    class="mobile-station group flex flex-col items-center p-3 rounded-xl transition-all duration-300 relative overflow-hidden text-center"
    :class="
      active
        ? 'bg-gradient-to-b from-blue-500/20 to-indigo-500/20 border border-blue-500/40 shadow-lg shadow-blue-500/10'
        : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/50 hover:border-slate-500/20'
    "
    @click.native="$emit('click')"
  >
    <div
      class="instrument-icon w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative z-10 mb-2 transition-transform duration-300 group-hover:scale-110"
    >
      <i class="fas text-white text-base" :class="icon"></i>
    </div>
    <div class="relative z-10 w-full">
      <div class="text-white font-medium text-xs leading-tight truncate mb-0.5">
        {{ title }}
      </div>
      <div class="text-slate-400 text-xs leading-tight truncate">
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
});

defineEmits(["click"]);
</script>
