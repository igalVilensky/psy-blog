<template>
  <div class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
    <button
      v-for="sphere in lifeSpheres"
      :key="sphere.name"
      @click="$emit('toggle-tag', sphere.name)"
      class="group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border overflow-hidden"
      :class="[
        selectedTags.includes(sphere.name)
          ? 'bg-slate-800 border-transparent ring-1 ring-offset-1 ring-offset-slate-900'
          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
      ]"
      :style="{
          '--ring-color': sphere.color ? extractColor(sphere.color) : '#06b6d4'
      }"
    >
      <!-- Active Background -->
      <div
        v-if="selectedTags.includes(sphere.name)"
        class="absolute inset-0 opacity-20 transition-opacity duration-300"
        :class="sphere.color"
      ></div>
      
      <span class="relative z-10 flex items-center gap-2">
        <i v-if="selectedTags.includes(sphere.name)" class="fas fa-check text-xs"></i>
        {{ sphere.name }}
      </span>

      <!-- Ring Color Style -->
      <component is="style" v-if="selectedTags.includes(sphere.name)">
        .ring-offset-slate-900 { --tw-ring-color: var(--ring-color); }
      </component>
    </button>
  </div>
</template>

<script setup>
defineProps({
  lifeSpheres: {
    type: Array,
    required: true,
  },
  selectedTags: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["toggle-tag"]);

// Helper to extract a color from the gradient class string (simplified)
// In a real app, you might have a better mapping, but for now we default to cyan if complex
const extractColor = (gradientClass) => {
    // This is a hacky way to get a color for the ring. 
    // Ideally pass a solid color prop or map it.
    if (gradientClass.includes('orange')) return '#f97316';
    if (gradientClass.includes('blue')) return '#0ea5e9';
    if (gradientClass.includes('purple')) return '#a855f7';
    if (gradientClass.includes('red')) return '#ef4444';
    if (gradientClass.includes('green')) return '#22c55e';
    if (gradientClass.includes('teal')) return '#14b8a6';
    return '#06b6d4';
}
</script>
