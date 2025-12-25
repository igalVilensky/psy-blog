<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    <button v-for="subEmotion in subEmotions" :key="subEmotion" @click="$emit('select-sub-emotion', subEmotion)"
      class="group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border overflow-hidden"
      :class="[
        selectedSubEmotion === subEmotion
          ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500/50 text-cyan-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
          : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
      ]">
      <span class="relative z-10">{{ subEmotion }}</span>

      <!-- Hover Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
      </div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  subEmotions: {
    type: Array,
    required: true,
  },
  selectedSubEmotion: {
    type: String,
    default: null,
  },
});

defineEmits(["select-sub-emotion"]);
</script>
