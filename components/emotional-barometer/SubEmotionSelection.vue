<template>
  <div
    class="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
  >
    <div class="flex items-center gap-3 mb-6">
      <div class="h-8 w-1 rounded-full bg-[#FF6B6B]"></div>
      <h3 class="text-lg sm:text-xl font-semibold text-gray-800">
        Выберите подэмоцию:
      </h3>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="subEmotion in subEmotions"
        :key="subEmotion"
        @click="$emit('select-sub-emotion', subEmotion)"
        class="group relative"
      >
        <div
          :class="[
            'px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300',
            'border-2 hover:shadow-md',
            'flex items-center justify-center text-center min-h-[56px]',
            selectedSubEmotion === subEmotion
              ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] text-white border-transparent shadow-lg'
              : 'bg-gray-50 text-gray-700 border-gray-100 hover:border-[#FF6B6B]/20 hover:bg-[#FF6B6B]/5',
          ]"
        >
          {{ subEmotion }}
        </div>
        <!-- Selection indicator -->
        <div
          v-if="selectedSubEmotion === subEmotion"
          class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center"
        >
          <div class="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]"></div>
        </div>
      </button>
    </div>

    <!-- Visual helper text -->
    <div class="mt-4 text-center">
      <p class="text-xs text-gray-500">
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
// Define props with types
defineProps({
  subEmotions: {
    type: Array,
    required: true,
  },
  selectedSubEmotion: {
    type: String,
    default: null,
  },
});

// Define the emitted event
defineEmits(["select-sub-emotion"]);
</script>
