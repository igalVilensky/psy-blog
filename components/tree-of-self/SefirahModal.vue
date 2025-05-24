<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-slate-900 rounded-xl p-6 max-w-lg w-full mx-4 overflow-y-auto max-h-[80vh]"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-white">
          {{ sefirah?.name || "Sefirah Details" }}
        </h2>
        <button
          class="text-gray-400 hover:text-white transition-colors"
          @click="closeModal"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>
      <SefirotProgressCard
        v-if="sefirah"
        :sefirah="sefirah"
        :is-active="true"
        :ring-color="ringColor"
        :progress-class="progressClass"
        :level-badge-class="levelBadgeClass"
        :progress-bar-class="progressBarClass"
        :set-active-card="setActiveCard"
        :log-action="logAction"
      />
    </div>
  </div>
</template>

<script setup>
import SefirotProgressCard from "~/components/tree-of-self/SefirotProgressCard.vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  sefirah: {
    type: Object,
    default: null,
  },
  ringColor: {
    type: String,
    required: true,
  },
  progressClass: {
    type: String,
    required: true,
  },
  levelBadgeClass: {
    type: String,
    required: true,
  },
  progressBarClass: {
    type: String,
    required: true,
  },
  setActiveCard: {
    type: Function,
    required: true,
  },
  logAction: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};
</script>
