<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
    <!-- Header with Progress -->
    <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4">
      <div class="max-w-3xl mx-auto w-full">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold text-slate-900 dark:text-white">
            Персональная настройка
          </h1>
          <span class="text-sm text-slate-500 dark:text-slate-400">
            Шаг {{ currentStep }} из {{ totalSteps }}
          </span>
        </div>
        <!-- Progress Bar -->
        <div class="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-8">
      <div class="flex-1">
        <Transition name="fade" mode="out-in">
          <component 
            :is="currentStepComponent" 
            v-model="answers"
            @next="nextStep"
            @back="prevStep"
          />
        </Transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Import Steps
import StepGoals from './StepGoals.vue';
import StepModality from './StepModality.vue';
import StepEmotionalBaseline from './StepEmotionalBaseline.vue';
import StepLifeDomains from './StepLifeDomains.vue';
import StepBehavioralPersona from './StepBehavioralPersona.vue';
import StepValues from './StepValues.vue';
import StepGuidanceLevel from './StepGuidanceLevel.vue';
import OnboardingCompletion from './OnboardingCompletion.vue';

const router = useRouter();
const authStore = useAuthStore();
const db = getFirestore();

const steps = [
  StepGoals,
  StepModality,
  StepEmotionalBaseline,
  StepLifeDomains,
  StepBehavioralPersona,
  StepValues,
  StepGuidanceLevel,
  OnboardingCompletion
];

const currentStepIndex = ref(0);
const answers = ref({
  goals: [],
  modalities: [],
  emotionalBaseline: {
    stress: 5,
    energy: 5,
    stability: 5
  },
  domains: [],
  persona: {
    thinking: '',
    processing: '',
    structure: '',
    tone: ''
  },
  values: [],
  guidanceLevel: ''
});

const currentStep = computed(() => currentStepIndex.value + 1);
const totalSteps = steps.length;
const currentStepComponent = computed(() => steps[currentStepIndex.value]);

const nextStep = async () => {
  if (currentStepIndex.value < steps.length - 1) {
    // If moving to the completion step (last step), save data first
    if (currentStepIndex.value === steps.length - 2) {
      await saveOnboardingData();
    }
    currentStepIndex.value++;
  }
};

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

const saveOnboardingData = async () => {
  if (!authStore.user) return;

  try {
    const userId = authStore.user.uid;
    const userRef = doc(db, 'users', userId);
    const onboardingRef = doc(db, 'users', userId, 'onboarding', 'main');

    // Save onboarding data
    await setDoc(onboardingRef, {
      ...answers.value,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Mark onboarding as completed
    await setDoc(userRef, {
      onboardingCompleted: true
    }, { merge: true });

    // Update local store
    authStore.user.onboardingCompleted = true;

    // Call AI Summary API
    await generateAiSummary(userId);

  } catch (error) {
    console.error('Error saving onboarding data:', error);
    // Handle error (show toast, etc.)
  }
};

const generateAiSummary = async (userId) => {
  try {
    const { data } = await useFetch('/api/ai/user-summary', {
      method: 'POST',
      body: {
        uid: userId,
        onboarding: answers.value
      }
    });

    if (data.value) {
      // Save the generated summary to Firestore
      const summaryRef = doc(db, 'users', userId, 'aiSummary', 'latest');
      await setDoc(summaryRef, data.value);
    }
  } catch (error) {
    console.error('Error generating AI summary:', error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
