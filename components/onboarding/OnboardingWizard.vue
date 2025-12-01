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
            :key="currentStep"
          />
        </Transition>
      </div>
    </main>
    <!-- Blocking Overlay -->
<div 
  v-if="showBlockingOverlay" 
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
>
  <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl text-center w-80">
    <i class="fas fa-circle-notch fa-spin text-3xl text-cyan-500 mb-4"></i>
    <p class="text-slate-700 dark:text-slate-300 font-medium">
      {{ processingMessage }}
    </p>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

// Steps (import your step components)
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

const isProcessing = ref(false); // prevents double clicks
const processingMessage = ref('');
const showBlockingOverlay = ref(false);


const currentStep = computed(() => currentStepIndex.value + 1);
const totalSteps = steps.length;
const currentStepComponent = computed(() => steps[currentStepIndex.value]);

const nextStep = async () => {
  if (isProcessing.value) return; // ❌ prevents multi-click

  // Normal steps → proceed immediately
  if (currentStepIndex.value < steps.length - 2) {
    currentStepIndex.value++;
    return;
  }

  // Last actionable step → run async sequence
  isProcessing.value = true;
  showBlockingOverlay.value = true;
  processingMessage.value = 'Сохраняем данные...';

  try {
    const saved = await saveOnboardingData();
    if (!saved) {
      throw new Error('failed to save');
    }

    processingMessage.value = 'Готовим персональное AI-резюме...';

    await generateAiSummaryAndSaveToFirestore();

    processingMessage.value = 'Завершаем...';

    // Safe advance to final screen
    currentStepIndex.value++;

  } catch (err) {
    console.error('Error during onboarding final step:', err);
    // Optional: show error message
  } finally {
    // Small delay for UX smoothness
    setTimeout(() => {
      showBlockingOverlay.value = false;
      isProcessing.value = false;
    }, 500);
  }
};


const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

async function saveOnboardingData() {
  if (!authStore.user) {
    console.warn('No authenticated user; cannot save onboarding.');
    return false;
  }

  try {
    const userId = authStore.user.uid;
    const userRef = doc(db, 'users', userId);
    const onboardingRef = doc(db, 'users', userId, 'onboarding', 'main');

    // Check if onboarding already exists to preserve createdAt
    const existingSnap = await getDoc(onboardingRef);
    const isNew = !existingSnap.exists();

    // Merge write: update fields, but preserve createdAt if exists
    const dataToSave = {
      ...answers.value,
      updatedAt: serverTimestamp()
    };

    if (isNew) {
      dataToSave.createdAt = serverTimestamp();
    }

    await setDoc(onboardingRef, dataToSave, { merge: true });

    // Mark onboarding as completed on user doc
    await setDoc(userRef, { onboardingCompleted: true }, { merge: true });

    // Update local store (if your store expects this)
    authStore.user = { ...(authStore.user || {}), onboardingCompleted: true };

    return true;
  } catch (err) {
    console.error('Error saving onboarding data:', err);
    return false;
  }
}

async function generateAiSummaryAndSaveToFirestore() {
  if (!authStore.user) return;

  try {
    const userId = authStore.user.uid;

    // Call server endpoint to generate summary
    const { data, error } = await useFetch('/api/ai/user-summary', {
      method: 'POST',
      body: {
        uid: userId,
        onboarding: answers.value
      }
    });

    if (error.value) {
      console.error('AI summary API error:', error.value);
      return;
    }

    const result = data.value;

    if (!result) {
      console.warn('AI returned no data');
      return;
    }

    // Persist AI summary to Firestore (two locations for convenience)
    const summaryRef = doc(db, 'users', userId, 'aiSummary', 'latest');
    await setDoc(summaryRef, {
      ...result,
      generatedAt: serverTimestamp()
    });

    // Also snapshot to onboarding doc for easier queries
    const onboardingMainRef = doc(db, 'users', userId, 'onboarding', 'main');
    await setDoc(onboardingMainRef, { aiSummary: result, updatedAt: serverTimestamp() }, { merge: true });

  } catch (err) {
    console.error('Error generating or saving AI summary:', err);
  }
}
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
