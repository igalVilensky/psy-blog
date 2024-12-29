<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="onClose"
      ></div>

      <!-- Modal panel -->
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <!-- Header -->
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    class="text-lg font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    <slot name="header"></slot>
                  </h3>
                  <!-- Content -->
                  <div class="mt-4">
                    <slot name="content"></slot>
                  </div>
                </div>
              </div>
            </div>
            <!-- Footer -->
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <slot name="footer">
                <button
                  type="button"
                  @click="onClose"
                  class="inline-flex w-full justify-center rounded-md bg-[#FF6B6B] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#FF5252] sm:ml-3 sm:w-auto"
                >
                  Закрыть
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const onClose = () => {
  emit("close");
};
</script>
