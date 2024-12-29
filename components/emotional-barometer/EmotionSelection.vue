<template>
  <div>
    <p class="text-sm text-gray-600 mb-3">
      Выберите эмоцию, которую вы сейчас испытываете. Это поможет вам лучше
      понять свое эмоциональное состояние.
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
      <button
        v-for="emotion in emotions"
        :key="emotion.id"
        @click="$emit('select-emotion', emotion)"
        :class="[
          'py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm',
          selectedEmotion?.id === emotion.id
            ? `${emotion.activeColor} text-white`
            : `${emotion.color} hover:opacity-80`,
        ]"
      >
        {{ emotion.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  emotions: {
    type: Array,
    required: true,
  },
  selectedEmotion: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["select-emotion"]);
</script>
