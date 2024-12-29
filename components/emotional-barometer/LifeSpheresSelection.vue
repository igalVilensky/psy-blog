<template>
  <div>
    <p class="text-sm text-gray-600 mb-3">
      Выберите сферы жизни, к которым относится эта эмоция:
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="sphere in lifeSpheres"
        :key="sphere.name"
        @click="$emit('toggle-tag', sphere.name)"
        :class="[
          'px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm transition-all',
          selectedTags.includes(sphere.name)
            ? sphere.activeColor
            : sphere.color,
          selectedTags.includes(sphere.name) ? 'text-white' : 'text-gray-700',
        ]"
      >
        {{ sphere.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  lifeSpheres: {
    type: Array,
    required: true,
  },
  selectedTags: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["toggle-tag"]);
</script>
