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
      <p class="text-slate-300 flex items-center gap-2 mb-3">
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
        <i class="fas fa-pen-fancy text-[#0EA5E9] absolute top-2 right-2"></i>
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
        <i class="fas fa-eye text-[#0EA5E9] absolute top-2 right-2"></i>
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
        Осознайте закрытую потребность. Чего Вы хотите?
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
        <i class="fas fa-shield-alt text-[#0EA5E9] absolute top-2 right-2"></i>
        <div class="absolute bottom-2 right-2 text-xs text-slate-400">
          {{ copingEntry.length }}/{{ minCharacters }} минимум
        </div>
      </div>
    </div>

    <!-- Additional Question 3 (New) -->
    <div
      v-if="sections.action.visible"
      :class="{ 'opacity-0 translate-y-4': !sections.action.visible }"
      class="transition-all duration-500"
    >
      <p class="text-slate-300 mb-3 flex items-center gap-2">
        Что можете сделать уже сейчас?
      </p>
      <div class="relative">
        <textarea
          ref="actionTextarea"
          v-model="actionEntry"
          class="w-full p-4 text-base bg-[#1A1F35]/40 backdrop-blur-sm border border-[#0EA5E9]/20 rounded-xl text-white/90 placeholder-slate-400/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9]/50 transition-all duration-300"
          rows="4"
          placeholder="Опишите ваши действия..."
          @input="handleInput('action')"
        ></textarea>
        <i class="fas fa-running text-[#0EA5E9] absolute top-2 right-2"></i>
        <div class="absolute bottom-2 right-2 text-xs text-slate-400">
          {{ actionEntry.length }}/{{ minCharacters }} минимум
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div v-if="showContinueButton" class="mt-6">
      <Button
        :text="'Продолжить'"
        :iconClass="'fas fa-arrow-right'"
        :gradientStart="'#0EA5E9'"
        :gradientEnd="'#E879F9'"
        :textColor="'#ffffff'"
        customClass="bg-gradient-to-r from-purple-500 to-cyan-500 border-[#0EA5E9]/20"
        :isLink="false"
        @click="handleContinue"
      />
    </div>

    <!-- Completion Message -->
    <div
      v-if="isCompleted"
      class="mt-6 text-center px-4 py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 transform transition-all duration-500"
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
import Button from "~/components/base/Button.vue";

const props = defineProps({
  journalEntry: { type: String, default: "" },
  perceptionEntry: { type: String, default: "" },
  copingEntry: { type: String, default: "" },
  actionEntry: { type: String, default: "" }, // New prop for fourth question
});

const emit = defineEmits([
  "update:journal-entry",
  "update:perception-entry",
  "update:coping-entry",
  "update:action-entry", // New emit for fourth question
]);

const journalEntry = ref(props.journalEntry);
const perceptionEntry = ref(props.perceptionEntry);
const copingEntry = ref(props.copingEntry);
const actionEntry = ref(props.actionEntry); // New ref for fourth question

const journalTextarea = ref(null);
const perceptionTextarea = ref(null);
const copingTextarea = ref(null);
const actionTextarea = ref(null); // New ref for fourth textarea

const minCharacters = 10;

const steps = [
  { id: "journal", label: "Мысли и чувства", icon: "fas fa-pen-fancy" },
  { id: "perception", label: "Восприятие", icon: "fas fa-eye" },
  { id: "coping", label: "Стратегии", icon: "fas fa-shield-alt" },
  { id: "action", label: "Действия", icon: "fas fa-running" }, // New step
];

const sections = reactive({
  perception: { visible: false },
  coping: { visible: false },
  action: { visible: false }, // New section
});

const currentStep = ref("journal");

const isCompleted = computed(() => {
  return sections.action.visible && actionEntry.value.length >= minCharacters;
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
    return (
      copingEntry.value.length >= minCharacters && !sections.action.visible
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
  const stepOrder = ["journal", "perception", "coping", "action"];
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
  } else if (type === "action") {
    emit("update:action-entry", actionEntry.value); // New handler
  }
}

const handleContinue = () => {
  if (currentStep.value === "journal") {
    sections.perception.visible = true;
    currentStep.value = "perception";
    setTimeout(() => perceptionTextarea.value?.focus(), 100);
  } else if (currentStep.value === "perception") {
    sections.coping.visible = true;
    currentStep.value = "coping";
    setTimeout(() => copingTextarea.value?.focus(), 100);
  } else if (currentStep.value === "coping") {
    sections.action.visible = true;
    currentStep.value = "action";
    setTimeout(() => actionTextarea.value?.focus(), 100);
  }
};

watch(
  [journalEntry, perceptionEntry, copingEntry, actionEntry],
  ([newJournal, newPerception, newCoping, newAction]) => {
    emit("update:journal-entry", newJournal);
    emit("update:perception-entry", newPerception);
    emit("update:coping-entry", newCoping);
    emit("update:action-entry", newAction); // New watcher
  }
);
</script>
