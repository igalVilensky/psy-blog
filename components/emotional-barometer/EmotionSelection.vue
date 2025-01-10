<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h2 class="text-2xl text-white/90 font-medium mb-3">
        Как вы себя чувствуете сегодня?
      </h2>
      <p class="text-slate-300 text-lg">
        Выберите эмоцию, которую вы сейчас испытываете. Это поможет вам лучше
        понять свое эмоциональное состояние.
      </p>
    </div>

    <!-- Emotions Grid Container -->
    <div class="flex flex-col gap-6 sm:gap-8">
      <!-- First Row - 3 emotions -->
      <div class="grid grid-cols-3 gap-3 sm:gap-6">
        <button
          v-for="emotion in emotions.slice(0, 3)"
          :key="emotion.id"
          @click="$emit('select-emotion', emotion)"
          class="group relative"
        >
          <!-- Hover Effect Background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>

          <!-- Main Button Content -->
          <div
            :class="[
              'relative py-6 sm:py-8 px-3 sm:px-4 rounded-xl transition-all duration-300',
              'backdrop-blur-sm border w-full h-full',
              selectedEmotion?.id === emotion.id
                ? 'bg-gradient-to-r from-[#0EA5E9]/40 to-[#E879F9]/40 border-[#0EA5E9]/50 shadow-lg shadow-[#0EA5E9]/20'
                : 'bg-[#1A1F35]/40 border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/30',
            ]"
          >
            <!-- Emotion Icon -->
            <div
              class="text-3xl sm:text-4xl mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110"
            >
              {{ emotionMapper[emotion.id] }}
            </div>
            <!-- Emotion Name -->
            <div
              class="text-sm sm:text-base font-medium text-slate-300 break-words"
            >
              {{ emotion.name }}
            </div>
            <!-- Selection Indicator -->
            <div
              v-if="selectedEmotion?.id === emotion.id"
              class="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5"
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

      <!-- Second Row - 2 emotions -->
      <div class="px-8 sm:px-16">
        <div class="grid grid-cols-2 gap-3 sm:gap-6">
          <button
            v-for="emotion in emotions.slice(3, 5)"
            :key="emotion.id"
            @click="$emit('select-emotion', emotion)"
            class="group relative"
          >
            <!-- Hover Effect Background -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- Main Button Content -->
            <div
              :class="[
                'relative py-6 sm:py-8 px-3 sm:px-4 rounded-xl transition-all duration-300',
                'backdrop-blur-sm border w-full h-full',
                selectedEmotion?.id === emotion.id
                  ? 'bg-gradient-to-r from-[#0EA5E9]/40 to-[#E879F9]/40 border-[#0EA5E9]/50 shadow-lg shadow-[#0EA5E9]/20'
                  : 'bg-[#1A1F35]/40 border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/30',
              ]"
            >
              <!-- Emotion Icon -->
              <div
                class="text-3xl sm:text-4xl mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110"
              >
                {{ emotionMapper[emotion.id] }}
              </div>
              <!-- Emotion Name -->
              <div
                class="text-sm sm:text-base font-medium text-slate-300 break-words"
              >
                {{ emotion.name }}
              </div>
              <!-- Selection Indicator -->
              <div
                v-if="selectedEmotion?.id === emotion.id"
                class="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5"
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
