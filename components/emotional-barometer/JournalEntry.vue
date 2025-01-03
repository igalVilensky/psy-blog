<template>
  <div class="space-y-6">
    <!-- Original Question -->
    <div>
      <p class="text-sm text-gray-600 mb-3">
        Опишите, что вызвало эту эмоцию и какие мысли у вас возникли:
      </p>
      <textarea
        ref="journalTextarea"
        v-model="journalEntry"
        class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        rows="4"
        placeholder="Опишите ваши мысли и чувства..."
      ></textarea>
    </div>

    <!-- Additional Question 1 -->
    <div
      v-if="sections.perception.visible"
      :class="{ 'opacity-0 translate-y-4': !sections.perception.visible }"
      class="transition-all duration-500"
    >
      <p class="text-sm text-gray-600 mb-3">
        Как эта ситуация повлияла на ваше восприятие себя и окружающих?
      </p>
      <textarea
        ref="perceptionTextarea"
        v-model="perceptionEntry"
        class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        rows="4"
        placeholder="Опишите изменения в вашем восприятии..."
      ></textarea>
    </div>

    <!-- Additional Question 2 -->
    <div
      v-if="sections.coping.visible"
      :class="{ 'opacity-0 translate-y-4': !sections.coping.visible }"
      class="transition-all duration-500"
    >
      <p class="text-sm text-gray-600 mb-3">
        Какие стратегии совладания вы использовали или могли бы использовать в
        подобной ситуации?
      </p>
      <textarea
        ref="copingTextarea"
        v-model="copingEntry"
        class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        rows="4"
        placeholder="Опишите ваши стратегии..."
      ></textarea>
    </div>

    <!-- Single Continue Button -->
    <div v-if="showContinueButton" class="mt-3">
      <button
        @click="handleContinue"
        class="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg text-sm hover:bg-[#FF5252] transition-colors"
      >
        Продолжить →
      </button>
    </div>

    <!-- Completion Message -->
    <div v-if="isCompleted" class="mt-3">
      <p class="text-sm text-green-600">Спасибо за ваши ответы! 🎉</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, reactive, computed } from "vue";

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

const journalTextarea = ref(null);
const perceptionTextarea = ref(null);
const copingTextarea = ref(null);

const minCharacters = 10;

const sections = reactive({
  perception: { visible: false },
  coping: { visible: false },
});

const currentStep = ref("journal"); // 'journal', 'perception', 'coping'

const isCompleted = computed(() => {
  return sections.coping.visible && copingEntry.value.length >= minCharacters;
});

const showContinueButton = computed(() => {
  if (currentStep.value === "journal") {
    return (
      journalEntry.value.length >= minCharacters && !sections.perception.visible
    );
  } else if (currentStep.value === "perception") {
    return (
      perceptionEntry.value.length >= minCharacters && !sections.coping.visible
    );
  } else if (currentStep.value === "coping") {
    return false;
  }
  return false;
});

// Watch for changes and emit events
watch(journalEntry, (newValue) => {
  emit("update:journal-entry", newValue);
});

watch(perceptionEntry, (newValue) => {
  emit("update:perception-entry", newValue);
});

watch(copingEntry, (newValue) => {
  emit("update:coping-entry", newValue);
});

const handleContinue = () => {
  if (currentStep.value === "journal") {
    sections.perception.visible = true;
    currentStep.value = "perception";
    setTimeout(() => {
      perceptionTextarea.value?.focus();
    }, 100);
  } else if (currentStep.value === "perception") {
    sections.coping.visible = true;
    currentStep.value = "coping";
    setTimeout(() => {
      copingTextarea.value?.focus();
    }, 100);
  }
};
</script>
