<template>
  <div>
    <p class="text-sm text-gray-600 mb-3">
      Опишите, что вызвало эту эмоцию и какие мысли у вас возникли:
    </p>
    <textarea
      v-model="journalEntry"
      class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
      rows="4"
      placeholder="Опишите ваши мысли и чувства..."
    ></textarea>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  journalEntry: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:journal-entry"]);

const journalEntry = ref(props.journalEntry);

// Watch for changes in journalEntry and emit an event
watch(journalEntry, (newValue) => {
  emit("update:journal-entry", newValue);
});
</script>
