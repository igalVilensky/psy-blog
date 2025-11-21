<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Modal -->
    <div
      class="relative w-full max-w-2xl bg-white dark:bg-[#1A1F35]/95 rounded-2xl border border-cyan-500/20 shadow-xl"
    >
      <!-- Close button -->
      <button
        @click="onClose"
        class="absolute top-4 right-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-white transition-colors duration-200"
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
        <h2 class="text-2xl text-slate-900 dark:text-white/90 font-medium mb-3">
          Рекомендации для вас
        </h2>
        <p class="text-slate-600 dark:text-slate-300 text-lg">
          Персональные советы для улучшения состояния
        </p>
      </div>

      <!-- Content -->
      <div class="px-6 pb-6 space-y-6">
        <!-- Emotion Summary -->
        <div
          class="backdrop-blur-sm border border-cyan-500/20 bg-slate-50 dark:bg-[#1A1F35]/40 rounded-xl p-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div>
                <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                          ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]'
                          : 'bg-cyan-200 dark:bg-[#0EA5E9]/30',
                      ]"
                    />
                  </div>
                  <span class="text-xs text-slate-500 dark:text-slate-400/70"
                    >{{ intensity }}/10</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Что можно сделать:</p>
          <div class="space-y-2">
            <div
              v-for="(rec, index) in recommendations"
              :key="index"
              class="group relative"
            >
              <!-- Hover Effect Background -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <!-- Main Content -->
              <div
                class="relative flex items-start gap-3 p-4 rounded-xl backdrop-blur-sm border border-cyan-500/20 bg-slate-50 dark:bg-[#1A1F35]/40 group-hover:border-cyan-500/30 transition-all duration-300"
              >
                <div
                  class="w-6 h-6 rounded-full bg-cyan-100 dark:bg-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <span class="text-xs font-medium text-cyan-600 dark:text-[#0EA5E9]">{{
                    index + 1
                  }}</span>
                </div>
                <p class="text-sm text-slate-700 dark:text-slate-300/90">{{ rec }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 flex justify-end gap-3 border-t border-cyan-500/20">
        <Button
          :text="'Закрыть'"
          :iconClass="'fas fa-times'"
          :textColor="'#CBD5E1'"
          customClass="'px-4 py-2 text-sm font-medium border border-cyan-500/20 bg-white dark:bg-[#1A1F35]/40 hover:bg-slate-100 dark:hover:bg-[#1A1F35]/60 backdrop-blur-sm text-slate-600 dark:text-slate-300'"
          :isLink="false"
          @click="onClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "~/components/base/Button.vue";

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
