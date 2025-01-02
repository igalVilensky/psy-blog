<template>
  <div class="space-y-6">
    <!-- Original Question -->
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

    <!-- Additional Question 1 -->
    <div>
      <p class="text-sm text-gray-600 mb-3">
        Как эта ситуация повлияла на ваше восприятие себя и окружающих?
      </p>
      <textarea
        v-model="perceptionEntry"
        class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        rows="4"
        placeholder="Опишите изменения в вашем восприятии..."
      ></textarea>
    </div>

    <!-- Additional Question 2 -->
    <div>
      <p class="text-sm text-gray-600 mb-3">
        Какие стратегии совладания вы использовали или могли бы использовать в
        подобной ситуации?
      </p>
      <textarea
        v-model="copingEntry"
        class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        rows="4"
        placeholder="Опишите ваши стратегии..."
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  journalEntry: {
    type: String,
    default: "",
  },
  perceptionEntry: {
    type: String,
    default: "",
  },
  copingEntry: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "update:journal-entry",
  "update:perception-entry",
  "update:coping-entry",
]);

const journalEntry = ref(props.journalEntry);
const perceptionEntry = ref(props.perceptionEntry);
const copingEntry = ref(props.copingEntry);

// Watch for changes in all entries and emit events
watch(journalEntry, (newValue) => {
  emit("update:journal-entry", newValue);
});

watch(perceptionEntry, (newValue) => {
  emit("update:perception-entry", newValue);
});

watch(copingEntry, (newValue) => {
  emit("update:coping-entry", newValue);
});
</script>
