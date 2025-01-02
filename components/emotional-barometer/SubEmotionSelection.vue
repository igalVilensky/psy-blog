<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Выберите подэмоцию:</h3>
    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="subEmotion in subEmotions"
        :key="subEmotion"
        @click="$emit('select-sub-emotion', subEmotion)"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium',
          selectedSubEmotion === subEmotion
            ? 'bg-[#FF6B6B] text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        ]"
      >
        {{ subEmotion }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Define props with types
defineProps({
  subEmotions: {
    type: Array, // An array of strings for sub-emotions
    required: true,
  },
  selectedSubEmotion: {
    type: String, // A single string for the selected sub-emotion
    default: null,
  },
});

// Define the emitted event
defineEmits(["select-sub-emotion"]);
</script>
