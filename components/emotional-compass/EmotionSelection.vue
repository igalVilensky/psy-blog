<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    <button
      v-for="emotion in emotions"
      :key="emotion.id"
      @click="$emit('select-emotion', emotion)"
      class="group relative p-4 rounded-2xl transition-all duration-300 border hover:-translate-y-1"
      :class="[
        selectedEmotion?.id === emotion.id
          ? 'bg-slate-800 border-transparent ring-2 ring-offset-2 ring-offset-slate-900'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
      ]"
      :style="{
        '--ring-color': emotion.color || '#06b6d4'
      }"
    >
      <!-- Active Glow -->
      <div
        v-if="selectedEmotion?.id === emotion.id"
        class="absolute inset-0 rounded-2xl opacity-20 blur-xl transition-opacity duration-500"
        :class="emotion.activeColor || 'bg-cyan-500'"
      ></div>

      <!-- Icon -->
      <div
        class="relative w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        :class="[
          selectedEmotion?.id === emotion.id
            ? 'bg-white/10'
            : 'bg-slate-800'
        ]"
        :style="{
            background: selectedEmotion?.id === emotion.id ? emotion.activeColor : ''
        }"
      >
        <span class="text-3xl">{{ emotion.emoji || '❤️' }}</span>
      </div>

      <!-- Label -->
      <div class="relative text-center">
        <span
          class="block text-sm font-bold tracking-wide transition-colors duration-300"
          :class="[
            selectedEmotion?.id === emotion.id
              ? 'text-white'
              : 'text-slate-400 group-hover:text-slate-200'
          ]"
        >
          {{ emotion.name }}
        </span>
      </div>
      
      <!-- Ring Color Style -->
      <component is="style" v-if="selectedEmotion?.id === emotion.id">
        .ring-offset-slate-900 { --tw-ring-color: {{ emotion.activeColor ? 'var(--tw-ring-color)' : '#06b6d4' }}; }
      </component>
    </button>
  </div>
</template>

<script setup>
defineProps({
  emotions: {
    type: Array,
    required: true,
  },
  selectedEmotion: {
    type: Object,
    default: null,
  },
});

defineEmits(["select-emotion"]);
</script>

<style scoped>
/* Custom ring color handling if needed, though inline style is often easier for dynamic colors */
</style>
