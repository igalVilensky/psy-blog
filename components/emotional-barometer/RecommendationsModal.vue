<template>
  <BaseModal :is-open="isOpen" @close="onClose">
    <!-- Header slot -->
    <template #header> Рекомендации для вас </template>

    <!-- Content slot -->
    <template #content>
      <p class="text-sm text-gray-600 mb-3">
        Основываясь на вашей эмоции "{{ emotion?.name }}" ({{ intensity }}/10),
        мы предлагаем:
      </p>
      <ul class="list-disc pl-5 space-y-2">
        <li
          v-for="(rec, index) in recommendations"
          :key="index"
          class="text-sm text-gray-700"
        >
          {{ rec }}
        </li>
      </ul>
    </template>

    <!-- Footer slot -->
    <template #footer>
      <button
        type="button"
        @click="onClose"
        class="inline-flex w-full justify-center rounded-md bg-[#FF6B6B] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#FF5252] sm:ml-3 sm:w-auto"
      >
        Понятно
      </button>
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
