<template>
  <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
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
    <div class="flex flex-col gap-6">
      <!-- First Row - 3 emotions -->
      <div class="grid grid-cols-3 gap-4">
        <button
          v-for="emotion in emotions.slice(0, 3)"
          :key="emotion.id"
          @click="$emit('select-emotion', emotion)"
          :class="[
            'group relative py-4 px-3 rounded-xl transition-all duration-300',
            'hover:transform hover:scale-105',
            selectedEmotion?.id === emotion.id
              ? `${emotion.activeColor} text-white shadow-lg`
              : `${emotion.color} hover:opacity-90 shadow-sm hover:shadow-md`,
          ]"
        >
          <!-- Emotion Icon -->
          <div class="text-2xl mb-2">{{ emotion.icon || "😊" }}</div>
          <!-- Emotion Name -->
          <div class="text-sm font-medium">{{ emotion.name }}</div>
          <!-- Selection Indicator -->
          <div
            v-if="selectedEmotion?.id === emotion.id"
            class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          ></div>
        </button>
      </div>

      <!-- Second Row - 2 emotions -->
      <div class="grid grid-cols-2 gap-4 px-12">
        <button
          v-for="emotion in emotions.slice(3, 5)"
          :key="emotion.id"
          @click="$emit('select-emotion', emotion)"
          :class="[
            'group relative py-4 px-3 rounded-xl transition-all duration-300',
            'hover:transform hover:scale-105',
            selectedEmotion?.id === emotion.id
              ? `${emotion.activeColor} text-white shadow-lg`
              : `${emotion.color} hover:opacity-90 shadow-sm hover:shadow-md`,
          ]"
        >
          <!-- Emotion Icon -->
          <div class="text-2xl mb-2">{{ emotion.icon || "😊" }}</div>
          <!-- Emotion Name -->
          <div class="text-sm font-medium">{{ emotion.name }}</div>
          <!-- Selection Indicator -->
          <div
            v-if="selectedEmotion?.id === emotion.id"
            class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          ></div>
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
    default: () => [
      {
        id: 1,
        name: "Радость",
        color: "bg-yellow-100",
        activeColor: "bg-yellow-500",
        icon: "😊",
      },
      {
        id: 2,
        name: "Грусть",
        color: "bg-blue-100",
        activeColor: "bg-blue-500",
        icon: "😢",
      },
      {
        id: 3,
        name: "Злость",
        color: "bg-red-100",
        activeColor: "bg-red-500",
        icon: "😠",
      },
      {
        id: 4,
        name: "Страх",
        color: "bg-purple-100",
        activeColor: "bg-purple-500",
        icon: "😨",
      },
      {
        id: 5,
        name: "Спокойствие",
        color: "bg-green-100",
        activeColor: "bg-green-500",
        icon: "😌",
      },
    ],
  },
  selectedEmotion: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["select-emotion"]);
</script>
