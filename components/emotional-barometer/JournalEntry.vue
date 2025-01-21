<template>
  <div class="space-y-6 w-full max-w-2xl mx-auto">
    <!-- Progress Steps -->
    <div class="flex items-center justify-center gap-2 sm:gap-3 my-8">
      <template v-for="(step, index) in steps" :key="index">
        <div class="flex items-center">
          <div class="relative group">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500',
                getCurrentStepStyle(step.id),
              ]"
            >
              <i :class="step.icon" class="text-sm"></i>
            </div>
            <!-- Step Label Tooltip -->
            <div
              class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap"
            >
              <span
                class="text-xs text-slate-300 bg-[#1A1F35]/80 px-2 py-1 rounded"
              >
                {{ step.label }}
              </span>
            </div>
          </div>
          <div
            v-if="index < steps.length - 1"
            :class="[
              'h-0.5 w-12 sm:w-16 transition-all duration-500',
              getConnectorStyle(step.id),
            ]"
          ></div>
        </div>
      </template>
    </div>

    <!-- Original Question -->
    <div class="transition-all duration-500">
      <p class="text-slate-300 my-4 md:mb-8 flex items-center gap-2">
        <i class="fas fa-pen-fancy text-[#0EA5E9]"></i>
        Опишите, что вызвало эту эмоцию и какие мысли у вас возникли:
      </p>
      <div class="relative">
        <textarea
          ref="journalTextarea"
          v-model="journalEntry"
          class="w-full p-4 text-base bg-[#1A1F35]/40 backdrop-blur-sm border border-[#0EA5E9]/20 rounded-xl text-white/90 placeholder-slate-400/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9]/50 transition-all duration-300"
          rows="4"
          placeholder="Опишите ваши мысли и чувства..."
          @input="handleInput('journal')"
        ></textarea>
        <div class="absolute bottom-2 right-2 text-xs text-slate-400">
          {{ journalEntry.length }}/{{ minCharacters }} минимум
        </div>
      </div>
    </div>

    <!-- Additional Question 1 -->
    <div
      v-if="sections.perception.visible"
      :class="{ 'opacity-0 translate-y-4': !sections.perception.visible }"
      class="transition-all duration-500"
    >
      <p class="text-slate-300 mb-3 flex items-center gap-2">
        <i class="fas fa-eye text-[#0EA5E9]"></i>
        Как эта ситуация повлияла на ваше восприятие себя и окружающих?
      </p>
      <div class="relative">
        <textarea
          ref="perceptionTextarea"
          v-model="perceptionEntry"
          class="w-full p-4 text-base bg-[#1A1F35]/40 backdrop-blur-sm border border-[#0EA5E9]/20 rounded-xl text-white/90 placeholder-slate-400/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9]/50 transition-all duration-300"
          rows="4"
          placeholder="Опишите изменения в вашем восприятии..."
          @input="handleInput('perception')"
        ></textarea>
        <div class="absolute bottom-2 right-2 text-xs text-slate-400">
          {{ perceptionEntry.length }}/{{ minCharacters }} минимум
        </div>
      </div>
    </div>

    <!-- Additional Question 2 -->
    <div
      v-if="sections.coping.visible"
      :class="{ 'opacity-0 translate-y-4': !sections.coping.visible }"
      class="transition-all duration-500"
    >
      <p class="text-slate-300 mb-3 flex items-center gap-2">
        <i class="fas fa-shield-alt text-[#0EA5E9]"></i>
        Какие стратегии совладания вы использовали или могли бы использовать в
        подобной ситуации?
      </p>
      <div class="relative">
        <textarea
          ref="copingTextarea"
          v-model="copingEntry"
          class="w-full p-4 text-base bg-[#1A1F35]/40 backdrop-blur-sm border border-[#0EA5E9]/20 rounded-xl text-white/90 placeholder-slate-400/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9]/50 transition-all duration-300"
          rows="4"
          placeholder="Опишите ваши стратегии..."
          @input="handleInput('coping')"
        ></textarea>
        <div class="absolute bottom-2 right-2 text-xs text-slate-400">
          {{ copingEntry.length }}/{{ minCharacters }} минимум
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div v-if="showContinueButton" class="mt-6">
      <button
        @click="handleContinue"
        class="group relative px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-xl text-sm font-medium hover:from-[#0EA5E9]/90 hover:to-[#E879F9]/90 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-300 w-full sm:w-auto"
      >
        <div class="relative z-10 flex items-center justify-center">
          Продолжить
          <i
            class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"
          ></i>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
      </button>
    </div>

    <!-- Completion Message -->
    <div
      v-if="isCompleted"
      class="mt-6 text-center px-6 py-4 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 transform transition-all duration-500"
    >
      <p class="text-slate-300 flex items-center justify-center gap-2">
        <i class="fas fa-check-circle text-green-400"></i>
        <span>Спасибо за ваши ответы!</span>
        <span class="text-xl animate-pulse">✨</span>
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

const steps = [
  { id: "journal", label: "Мысли и чувства", icon: "fas fa-pen-fancy" },
  { id: "perception", label: "Восприятие", icon: "fas fa-eye" },
  { id: "coping", label: "Стратегии", icon: "fas fa-shield-alt" },
];

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

function getCurrentStepStyle(stepId) {
  const isActive = currentStep.value === stepId;
  const isPast = isPastStep(stepId);

  if (isActive) {
    return "border-2 border-[#0EA5E9] bg-[#1A1F35] text-[#0EA5E9]";
  } else if (isPast) {
    return "bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white";
  }
  return "bg-[#1A1F35]/40 text-slate-400";
}

function getConnectorStyle(stepId) {
  return isPastStep(stepId)
    ? "bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
    : "bg-slate-600";
}

function isPastStep(stepId) {
  const stepOrder = ["journal", "perception", "coping"];
  const currentIndex = stepOrder.indexOf(currentStep.value);
  const stepIndex = stepOrder.indexOf(stepId);
  return stepIndex < currentIndex;
}

function handleInput(type) {
  if (type === "journal") {
    emit("update:journal-entry", journalEntry.value);
  } else if (type === "perception") {
    emit("update:perception-entry", perceptionEntry.value);
  } else if (type === "coping") {
    emit("update:coping-entry", copingEntry.value);
  }
}

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

watch(
  [journalEntry, perceptionEntry, copingEntry],
  ([newJournal, newPerception, newCoping]) => {
    emit("update:journal-entry", newJournal);
    emit("update:perception-entry", newPerception);
    emit("update:coping-entry", newCoping);
  }
);
</script>
