<template>
  <div class="w-full mx-auto">
    <p class="text-sm text-gray-600 mb-3">
      Выберите эмоцию, которую вы сейчас испытываете. Это поможет вам лучше
      понять свое эмоциональное состояние.
    </p>

    <div class="flex flex-col gap-4">
      <!-- First row - 3 emotions -->
      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="emotion in emotions.slice(0, 3)"
          :key="emotion.id"
          @click="$emit('select-emotion', emotion)"
          :class="[
            'py-3 rounded-lg transition-all text-sm',
            selectedEmotion?.id === emotion.id
              ? `${emotion.activeColor} text-white`
              : `${emotion.color} hover:opacity-80`,
          ]"
        >
          {{ emotion.name }}
        </button>
      </div>

      <!-- Second row - 2 emotions centered -->
      <div class="grid grid-cols-2 gap-4 px-12">
        <button
          v-for="emotion in emotions.slice(3, 5)"
          :key="emotion.id"
          @click="$emit('select-emotion', emotion)"
          :class="[
            'py-3 rounded-lg transition-all text-sm',
            selectedEmotion?.id === emotion.id
              ? `${emotion.activeColor} text-white`
              : `${emotion.color} hover:opacity-80`,
          ]"
        >
          {{ emotion.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
