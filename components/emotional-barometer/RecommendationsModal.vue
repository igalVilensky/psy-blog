<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Modal -->
    <div
      class="relative w-full max-w-2xl bg-[#1E1B4B]/95 rounded-2xl border border-indigo-500/20 shadow-xl"
    >
      <!-- Close button -->
      <button
        @click="onClose"
        class="absolute top-4 right-4 text-indigo-200/80 hover:text-white transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Header -->
      <div class="p-6 text-center">
        <h2 class="text-2xl text-white/90 font-medium mb-3">
          Рекомендации для вас
        </h2>
        <p class="text-indigo-200/80 text-lg">
          Персональные советы для улучшения состояния
        </p>
      </div>

      <!-- Content -->
      <div class="px-6 pb-6 space-y-6">
        <!-- Emotion Summary -->
        <div
          class="backdrop-blur-sm border border-indigo-500/20 bg-[#1E1B4B]/40 rounded-xl p-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div>
                <p class="text-sm font-medium text-indigo-200">
                  {{ emotion.name }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="flex">
                    <div
                      v-for="n in 10"
                      :key="n"
                      :class="[
                        'w-4 h-1 rounded-sm mr-0.5',
                        n <= intensity
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'bg-indigo-900/30',
                      ]"
                    />
                  </div>
                  <span class="text-xs text-indigo-300/70"
                    >{{ intensity }}/10</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-indigo-200">Что можно сделать:</p>
          <div class="space-y-2">
            <div
              v-for="(rec, index) in recommendations"
              :key="index"
              class="group relative"
            >
              <!-- Hover Effect Background -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <!-- Main Content -->
              <div
                class="relative flex items-start gap-3 p-4 rounded-xl backdrop-blur-sm border border-indigo-500/20 bg-[#1E1B4B]/40 group-hover:border-indigo-400/30 transition-all duration-300"
              >
                <div
                  class="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <span class="text-xs font-medium text-indigo-300">{{
                    index + 1
                  }}</span>
                </div>
                <p class="text-sm text-indigo-200/90">{{ rec }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 flex justify-end gap-3 border-t border-indigo-500/20">
        <button
          type="button"
          @click="onClose"
          class="px-4 py-2 rounded-xl backdrop-blur-sm border border-indigo-500/20 bg-[#1E1B4B]/40 text-indigo-200 text-sm font-medium hover:bg-[#1E1B4B]/60 transition-all duration-300"
        >
          Закрыть
        </button>
        <button
          type="button"
          @click="onClose"
          class="group relative px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        >
          <div class="relative z-10 text-white">Понятно</div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"
          />
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  emotion: {
    type: Object,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  recommendations: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const onClose = () => {
  emit("close");
};
</script>
