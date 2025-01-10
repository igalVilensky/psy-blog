<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h2 class="text-2xl text-white/90 font-medium mb-3">
        Выберите подэмоцию:
      </h2>
      <p class="text-slate-300 text-lg">
        Уточните ваше эмоциональное состояние, выбрав один из вариантов ниже.
      </p>
    </div>

    <!-- Sub-emotions Grid -->
    <div class="grid grid-cols-2 gap-3 sm:gap-6">
      <button
        v-for="emotion in subEmotions"
        :key="emotion"
        @click="$emit('select-sub-emotion', emotion)"
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
            selectedSubEmotion === emotion
              ? 'bg-gradient-to-r from-[#0EA5E9]/40 to-[#E879F9]/40 border-[#0EA5E9]/50 shadow-lg shadow-[#0EA5E9]/20'
              : 'bg-[#1A1F35]/40 border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/30',
          ]"
        >
          <!-- Sub-emotion Text -->
          <div
            class="text-sm sm:text-base font-medium text-slate-300 break-words"
          >
            {{ emotion }}
          </div>

          <!-- Selection Indicator -->
          <div
            v-if="selectedSubEmotion === emotion"
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

    <!-- Helper Text -->
    <div class="mt-4 text-center">
      <p class="text-sm text-slate-400">
        {{
          selectedSubEmotion
            ? "Выбрано: " + selectedSubEmotion
            : "Выберите один вариант"
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  subEmotions: {
    type: Array,
    required: true,
  },
  selectedSubEmotion: {
    type: String,
    default: null,
  },
});

defineEmits(["select-sub-emotion"]);
</script>
