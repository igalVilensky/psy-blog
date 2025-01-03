<template>
  <div
    class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg px-3 sm:px-6 pb-6 sm:pt-6"
  >
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">
        Как вы себя чувствуете сегодня?
      </h2>
      <p class="text-sm text-gray-600">
        Выберите эмоцию, которую вы сейчас испытываете. Это поможет вам лучше
        понять свое эмоциональное состояние.
      </p>
    </div>

    <!-- Emotions Grid Container -->
    <div class="flex flex-col gap-4 sm:gap-6">
      <!-- First Row - 3 emotions -->
      <div class="grid grid-cols-3 gap-2 sm:gap-4">
        <button
          v-for="emotion in emotions.slice(0, 3)"
          :key="emotion.id"
          @click="$emit('select-emotion', emotion)"
          :class="[
            'group relative py-3 sm:py-4 px-2 sm:px-3 rounded-xl transition-all duration-300',
            'hover:transform hover:scale-105 w-24 sm:w-32 mx-auto',
            selectedEmotion?.id === emotion.id
              ? `${emotion.activeColor} text-white shadow-lg`
              : `${emotion.color} hover:opacity-90 shadow-sm hover:shadow-md`,
          ]"
        >
          <!-- Emotion Icon -->
          <div class="text-xl sm:text-2xl mb-1 sm:mb-2">
            {{ emotionMapper[emotion.id] }}
          </div>
          <!-- Emotion Name -->
          <div class="text-xs sm:text-sm font-medium break-words">
            {{ emotion.name }}
          </div>
          <!-- Selection Indicator -->
          <div
            v-if="selectedEmotion?.id === emotion.id"
            class="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"
          ></div>
        </button>
      </div>

      <!-- Second Row - 2 emotions -->
      <div class="px-12">
        <div class="grid grid-cols-2 gap-2 sm:gap-4">
          <button
            v-for="emotion in emotions.slice(3, 5)"
            :key="emotion.id"
            @click="$emit('select-emotion', emotion)"
            :class="[
              'group relative py-3 sm:py-4 px-2 sm:px-3 rounded-xl transition-all duration-300',
              'hover:transform hover:scale-105 w-24 sm:w-32 mx-auto',
              selectedEmotion?.id === emotion.id
                ? `${emotion.activeColor} text-white shadow-lg`
                : `${emotion.color} hover:opacity-90 shadow-sm hover:shadow-md`,
            ]"
          >
            <!-- Emotion Icon -->
            <div class="text-xl sm:text-2xl mb-1 sm:mb-2">
              {{ emotionMapper[emotion.id] }}
            </div>
            <!-- Emotion Name -->
            <div class="text-xs sm:text-sm font-medium break-words">
              {{ emotion.name }}
            </div>
            <!-- Selection Indicator -->
            <div
              v-if="selectedEmotion?.id === emotion.id"
              class="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"
            ></div>
          </button>
        </div>
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

// Mapper to link emotions with their corresponding emoji
const emotionMapper = {
  1: "😊", // Радость
  2: "😢", // Грусть
  3: "😨", // Страх
  4: "😠", // Гнев
  5: "😲", // Удивление
};

const emit = defineEmits(["select-emotion"]);
</script>
