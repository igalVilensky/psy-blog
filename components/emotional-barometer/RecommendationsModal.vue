<template>
  <BaseModal :is-open="isOpen" @close="onClose">
    <!-- Header slot -->
    <template #header>
      <div class="flex items-center gap-3">
        <div class="h-8 w-1 bg-[#FF6B6B] rounded-full"></div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800">
            Рекомендации для вас
          </h2>
          <p class="text-sm text-gray-500 mt-1">
            Персональные советы для улучшения состояния
          </p>
        </div>
      </div>
    </template>

    <!-- Content slot -->
    <template #content>
      <div class="space-y-6">
        <!-- Emotion Summary -->
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div>
                <p class="text-sm font-medium text-gray-700">
                  {{ emotion.name }}
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <div class="flex">
                    <div
                      v-for="n in 10"
                      :key="n"
                      :class="[
                        'w-4 h-1 rounded-sm mr-0.5',
                        n <= intensity ? 'bg-[#FF6B6B]' : 'bg-gray-200',
                      ]"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500">{{ intensity }}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-gray-700">Что можно сделать:</p>
          <div class="space-y-2">
            <div
              v-for="(rec, index) in recommendations"
              :key="index"
              class="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 hover:border-[#FF6B6B]/20 hover:bg-[#FF6B6B]/5 transition-all duration-300"
            >
              <div
                class="w-6 h-6 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <span class="text-xs font-medium text-[#FF6B6B]">{{
                  index + 1
                }}</span>
              </div>
              <p class="text-sm text-gray-700">{{ rec }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Footer slot -->
    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="onClose"
          class="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors"
        >
          Закрыть
        </button>
        <button
          type="button"
          @click="onClose"
          class="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8787] text-white text-sm font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          Понятно
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/base/BaseModal.vue";

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
