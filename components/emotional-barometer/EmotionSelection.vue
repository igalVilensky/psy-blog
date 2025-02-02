<template>
  <div class="w-full max-w-3xl mx-auto py-6">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <p class="text-slate-300 text-base md:text-lg max-w-xl mx-auto">
        Выберите эмоцию, которую вы сейчас испытываете
      </p>
    </div>

    <!-- Emotions Grid - Single column on mobile, grid on larger screens -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-lg sm:max-w-2xl mx-auto"
    >
      <button
        v-for="emotion in emotions"
        :key="emotion.id"
        @click="$emit('select-emotion', emotion)"
        class="group relative focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 rounded-xl w-full"
      >
        <!-- Hover Effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <!-- Card Content -->
        <div
          :class="[
            'relative rounded-xl transition-all duration-300 h-full',
            'backdrop-blur-sm border flex items-center gap-4 px-4 py-2',
            selectedEmotion?.id === emotion.id
              ? 'bg-gradient-to-r from-[#0EA5E9]/40 to-[#E879F9]/40 border-[#0EA5E9]/50 shadow-lg shadow-[#0EA5E9]/20'
              : 'bg-[#1A1F35]/40 border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/30',
          ]"
        >
          <!-- Emoji Container -->
          <div
            class="flex-shrink-0 text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300"
          >
            {{ emotionMapper[emotion.id] }}
          </div>

          <!-- Text Container -->
          <div class="flex-grow text-left">
            <span class="text-sm md:text-base font-medium text-slate-300">
              {{ emotion.name }}
            </span>
          </div>

          <!-- Selection Indicator -->
          <div
            v-if="selectedEmotion?.id === emotion.id"
            class="absolute -top-1.5 -right-1.5 w-4 h-4"
          >
            <div
              class="absolute inset-0 bg-[#0EA5E9] rounded-full animate-ping opacity-75"
            ></div>
            <div class="absolute inset-0 bg-[#0EA5E9] rounded-full"></div>
            <div class="absolute inset-0.5 bg-white rounded-full"></div>
          </div>
        </div>
      </button>
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

const emotionMapper = {
  1: "😊", // Радость
  2: "😢", // Грусть
  3: "😨", // Страх
  4: "😠", // Гнев
  5: "😲", // Удивление
};

const emit = defineEmits(["select-emotion"]);
</script>
