<!-- DesktopSideLegend.vue -->
<template>
  <div
    class="hidden md:block absolute right-16 top-1/3 transform -translate-y-1/2"
  >
    <div
      class="flex flex-col space-y-2 bg-black/40 rounded-lg p-1 border border-white/10"
    >
      <div
        class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
        :class="{ 'bg-white/10': highlightedCategory === 'wisdom' }"
        @click="toggleHighlight('wisdom')"
        role="button"
        aria-label="Highlight Wisdom Sefirot"
      >
        <span
          class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end mr-2"
        ></span>
        <span class="text-gray-200 whitespace-nowrap">Мудрость</span>
      </div>
      <div
        class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
        :class="{ 'bg-white/10': highlightedCategory === 'emotions' }"
        @click="toggleHighlight('emotions')"
        role="button"
        aria-label="Highlight Emotions Sefirot"
      >
        <span
          class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end mr-2"
        ></span>
        <span class="text-gray-200 whitespace-nowrap">Чувства</span>
      </div>
      <div
        class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
        :class="{ 'bg-white/10': highlightedCategory === 'action' }"
        @click="toggleHighlight('action')"
        role="button"
        aria-label="Highlight Action Sefirot"
      >
        <span
          class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-orange-start to-gradient-orange-end mr-2"
        ></span>
        <span class="text-gray-200 whitespace-nowrap">Действия</span>
      </div>
      <div
        class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
        :class="{ 'bg-white/10': highlightedCategory === 'integration' }"
        @click="toggleHighlight('integration')"
        role="button"
        aria-label="Highlight Integration Sefirot"
      >
        <span
          class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end mr-2"
        ></span>
        <span class="text-gray-200 whitespace-nowrap">Интеграция</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  highlightedCategory: {
    type: String,
    default: null,
  },
  toggleHighlight: {
    type: Function,
    required: true,
  },
});
</script>
