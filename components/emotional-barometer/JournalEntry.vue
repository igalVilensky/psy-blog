<template>
  <div class="space-y-6 w-full max-w-2xl mx-auto">
    <!-- Original Question -->
    <div class="transition-all duration-500">
      <p class="text-indigo-200/80 mb-3">
        Опишите, что вызвало эту эмоцию и какие мысли у вас возникли:
      </p>
      <textarea
        ref="journalTextarea"
        v-model="journalEntry"
        class="w-full p-4 text-base bg-[#1E1B4B]/40 backdrop-blur-sm border border-indigo-500/20 rounded-xl text-white/90 placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300"
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
      <p class="text-indigo-200/80 mb-3">
        Как эта ситуация повлияла на ваше восприятие себя и окружающих?
      </p>
      <textarea
        ref="perceptionTextarea"
        v-model="perceptionEntry"
        class="w-full p-4 text-base bg-[#1E1B4B]/40 backdrop-blur-sm border border-indigo-500/20 rounded-xl text-white/90 placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300"
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
      <p class="text-indigo-200/80 mb-3">
        Какие стратегии совладания вы использовали или могли бы использовать в
        подобной ситуации?
      </p>
      <textarea
        ref="copingTextarea"
        v-model="copingEntry"
        class="w-full p-4 text-base bg-[#1E1B4B]/40 backdrop-blur-sm border border-indigo-500/20 rounded-xl text-white/90 placeholder-indigo-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all duration-300"
        rows="4"
        placeholder="Опишите ваши стратегии..."
      ></textarea>
    </div>

    <!-- Continue Button -->
    <div v-if="showContinueButton" class="mt-6">
      <button
        @click="handleContinue"
        class="group relative px-6 py-3 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white rounded-xl text-sm font-medium hover:from-indigo-500/90 hover:to-purple-500/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
      >
        <div class="relative z-10 flex items-center">
          Продолжить
          <span
            class="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            >→</span
          >
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
      </button>
    </div>

    <!-- Completion Message -->
    <div
      v-if="isCompleted"
      class="mt-6 text-center px-6 py-4 rounded-xl backdrop-blur-sm border border-indigo-500/20 bg-[#1E1B4B]/40"
    >
      <p class="text-indigo-200">
        <span class="mr-2">Спасибо за ваши ответы!</span>
        <span class="text-xl">✨</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive, computed } from "vue";

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

const currentStep = ref("journal");

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
  }
  return false;
});

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
