<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';
import { useNotification } from '~/composables/useNotification';
import { emotionBarometerService } from '~/services/emotionBarometerService';
import { emotionalQuadrants } from '~/data/emotionalBarometer/emotions';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Components
import AffectGrid from '~/components/emotional-compass/v2/AffectGrid.vue';
import EmotionWheel from '~/components/emotional-compass/v2/EmotionWheel.vue';
import BodyMapper from '~/components/emotional-compass/v2/BodyMapper.vue';
import ContextTagSelector from '~/components/emotional-compass/v2/ContextTagSelector.vue';
import AIRecommendationsModal from '~/components/emotional-compass/v2/AIRecommendationsModal.vue';

definePageMeta({
  layout: "laboratory",
});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { showNotification } = useNotification();
const db = getFirestore();

// State
const loading = ref(false);
const sessionStarted = ref(false);
const sessionMode = ref('standard'); // quick, standard, deep
const step = ref(1);

// Recommendation State
const showRecommendations = ref(false);
const recommendationLoading = ref(false);
const recommendationError = ref(null);
const recommendationData = ref(null);
const onboardingData = ref(null);

// Data Model
const sessionData = reactive({
  affect: { valence: 0, arousal: 0, intensity: 5 },
  labeling: null, // { primary, secondary, ... }
  somatic: { locations: [] },
  context: { triggers: [], notes: '' },
  cognition: { narrative: '', facts: '' }
});

const currentQuadrant = computed(() => {
  const { valence, arousal } = sessionData.affect;
  return emotionalQuadrants.find(q => 
    valence >= q.valenceRange[0] && valence <= q.valenceRange[1] &&
    arousal >= q.arousalRange[0] && arousal <= q.arousalRange[1]
  );
});

const totalSteps = computed(() => {
  if (sessionMode.value === 'quick') return 2;
  if (sessionMode.value === 'standard') return 4;
  return 5;
});

const isLastStep = computed(() => step.value === totalSteps.value);

const canProceed = computed(() => {
  if (step.value === 1) return true; // Always can proceed from grid
  if (step.value === 2) return !!sessionData.labeling;
  return true; // Optional steps
});

const currentStepTitle = computed(() => {
  const titles = {
    1: 'АФФЕКТИВНАЯ СЕТКА',
    2: 'ВЫБОР ЭМОЦИИ',
    3: 'ТЕЛЕСНЫЙ СКАН',
    4: 'КОНТЕКСТ И ТРИГГЕРЫ',
    5: 'КОГНИТИВНЫЙ АНАЛИЗ'
  };
  return titles[step.value];
});

const progressPercentage = computed(() => (step.value / totalSteps.value) * 100);

// Actions
const startSession = (mode) => {
  sessionMode.value = mode;
  sessionStarted.value = true;
  step.value = 1;
  // Reset data
  Object.assign(sessionData, {
    affect: { valence: 0, arousal: 0, intensity: 5 },
    labeling: null,
    somatic: { locations: [] },
    context: { triggers: [], notes: '' },
    cognition: { narrative: '', facts: '' }
  });
};

const cancelSession = () => {
  sessionStarted.value = false;
};

const nextStep = () => {
  if (step.value < totalSteps.value) {
    step.value++;
  }
};

const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const handleNext = () => {
  if (isLastStep.value) {
    saveEntry();
  } else {
    nextStep();
  }
};

const onAffectChange = (val) => {
  // Update intensity from the grid component
  if (val.intensity !== undefined) {
    sessionData.affect.intensity = val.intensity;
  }
};

const saveEntry = async () => {
  loading.value = true;
  
  const payload = {
    mode: sessionMode.value,
    affect: sessionData.affect,
    labeling: sessionData.labeling,
    somatic: sessionData.somatic,
    context: sessionData.context,
    cognition: sessionData.cognition,
    // Flatten for easier querying if needed
    tags: [
      ...(sessionData.context.triggers || []),
      ...(sessionData.somatic.locations || [])
    ]
  };

  const result = await emotionBarometerService.saveEntry(db, user.value, payload, showNotification);
  
  loading.value = false;

  if (result.success) {
    // Open Recommendations Modal
    showRecommendations.value = true;
    recommendationLoading.value = true;
    recommendationError.value = null;
    
    // Fetch Recommendations
    const recommendations = await emotionBarometerService.getRecommendations(payload, onboardingData.value);
    
    recommendationLoading.value = false;
    
    if (recommendations && !recommendations.error) {
      recommendationData.value = recommendations;
    } else {
      recommendationError.value = "Не удалось получить рекомендации. Попробуйте позже.";
    }
  }
};

const closeRecommendations = () => {
  showRecommendations.value = false;
  sessionStarted.value = false; // Reset to home
};

onMounted(async () => {
  if (user.value) {
    try {
      const onboardingRef = doc(db, 'users', user.value.uid, 'onboarding', 'main');
      const snap = await getDoc(onboardingRef);
      if (snap.exists()) {
        onboardingData.value = snap.data();
      }
    } catch (e) {
      console.error("Failed to fetch onboarding data:", e);
    }
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-cyan-500/30">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      
      <!-- Header -->
      <section class="text-center mb-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-tight font-mono">
          ЭМОЦИОНАЛЬНЫЙ КОМПАС 2.0
        </h1>
        <p class="text-slate-600 dark:text-cyan-100/70 max-w-2xl mx-auto text-sm sm:text-base">
          Точная калибровка эмоций. Назови, чтобы управлять.
        </p>
      </section>

      <!-- Mode Selection (Only visible if not started) -->
      <div v-if="!sessionStarted && !loading" class="max-w-4xl mx-auto mb-12 animate-fadeIn">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Quick Pulse -->
          <button @click="startSession('quick')" class="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-all text-left">
            <div class="absolute top-4 right-4 text-xs font-mono text-slate-400">30с</div>
            <div class="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4 text-cyan-600 dark:text-cyan-400">
              <i class="fas fa-bolt text-xl"></i>
            </div>
            <h3 class="text-lg font-bold mb-2">Быстрый скан</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Быстрая фиксация валентности и энергии. Для частого отслеживания.</p>
          </button>

          <!-- Standard Calibration -->
          <button @click="startSession('standard')" class="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all text-left ring-2 ring-purple-500/20">
            <div class="absolute top-4 right-4 text-xs font-mono text-slate-400">2м</div>
            <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <i class="fas fa-compass text-xl"></i>
            </div>
            <h3 class="text-lg font-bold mb-2">Стандартный анализ</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Полный чекин. Нюансы эмоций, тело и контекст.</p>
          </button>

          <!-- Deep Diagnostic -->
          <button @click="startSession('deep')" class="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-pink-500 transition-all text-left">
            <div class="absolute top-4 right-4 text-xs font-mono text-slate-400">5м+</div>
            <div class="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4 text-pink-600 dark:text-pink-400">
              <i class="fas fa-microscope text-xl"></i>
            </div>
            <h3 class="text-lg font-bold mb-2">Глубокая диагностика</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Работа со сложными состояниями. Когнитивный анализ и стратегии регуляции.</p>
          </button>
        </div>
      </div>

      <!-- Active Session Interface -->
      <div v-if="sessionStarted" class="max-w-3xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-8 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>

        <!-- Step Container -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
          
          <!-- Step Header -->
          <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 class="text-xl font-mono font-bold text-slate-700 dark:text-slate-200">
              {{ currentStepTitle }}
            </h2>
            <button @click="cancelSession" class="text-slate-400 hover:text-red-400 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Step Content -->
          <div class="flex-1 p-6 md:p-8 flex flex-col items-center justify-center">
            
            <!-- Step 1: Affect Grid -->
            <div v-if="step === 1" class="w-full animate-fadeIn">
              <p class="text-center text-slate-500 mb-6">Где вы сейчас находитесь?</p>
              <AffectGrid v-model="sessionData.affect" @change="onAffectChange" />
            </div>

            <!-- Step 2: Emotion Wheel (Family & Nuance) -->
            <div v-if="step === 2" class="w-full animate-fadeIn">
              <EmotionWheel 
                :quadrant-id="currentQuadrant?.id" 
                v-model="sessionData.labeling"
                @select="nextStep" 
              />
            </div>

            <!-- Step 3: Somatic Marker -->
            <div v-if="step === 3" class="w-full animate-fadeIn">
              <p class="text-center text-slate-500 mb-6">Где это ощущается в теле?</p>
              <BodyMapper v-model="sessionData.somatic.locations" />
            </div>

            <!-- Step 4: Context -->
            <div v-if="step === 4" class="w-full animate-fadeIn">
              <p class="text-center text-slate-500 mb-6">Что влияет на это состояние?</p>
              <ContextTagSelector v-model="sessionData.context.triggers" />
            </div>

            <!-- Step 5: Deep Reflection (Only for Deep Mode) -->
            <div v-if="step === 5" class="w-full animate-fadeIn space-y-6">
              <div>
                <label class="block text-sm font-bold text-slate-500 mb-2">МЫСЛИ И ИНТЕРПРЕТАЦИИ</label>
                <textarea 
                  v-model="sessionData.cognition.narrative"
                  placeholder="О чем вы думаете? Чего вы боитесь или что предвкушаете? Как вы объясняете себе это чувство?"
                  class="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-500 mb-2">ФАКТЫ И РЕАЛЬНОСТЬ</label>
                <textarea 
                  v-model="sessionData.cognition.facts"
                  placeholder="Что произошло на самом деле? Какие факты неоспоримы (без ваших домыслов)?"
                  class="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>

          </div>

          <!-- Footer / Navigation -->
          <div class="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <button 
              v-if="step > 1" 
              @click="prevStep"
              class="px-6 py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Назад
            </button>
            <div v-else></div>

            <button 
              @click="handleNext"
              :disabled="!canProceed"
              class="px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
              :class="[
                canProceed 
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:shadow-cyan-500/25 hover:scale-105' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              ]"
            >
              <span v-if="isLastStep">Сохранить</span>
              <span v-else>Далее</span>
              <i class="fas" :class="isLastStep ? 'fa-check' : 'fa-arrow-right'"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- History / Stats Links (Visible when not in session) -->
      <div v-if="!sessionStarted" class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
         <NuxtLink to="/space/growth/emotional-compass/analysis" class="p-6 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600">
                  <i class="fas fa-chart-pie"></i>
               </div>
               <div>
                  <h3 class="font-bold group-hover:text-cyan-500 transition-colors">Анализ</h3>
                  <p class="text-sm text-slate-500">Эмоциональные паттерны</p>
               </div>
            </div>
         </NuxtLink>
         <NuxtLink to="/space/growth/emotional-compass/journal-history" class="p-6 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all group">
            <div class="flex items-center gap-4">
               <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                  <i class="fas fa-history"></i>
               </div>
               <div>
                  <h3 class="font-bold group-hover:text-purple-500 transition-colors">История</h3>
                  <p class="text-sm text-slate-500">Журнал записей</p>
               </div>
            </div>
         </NuxtLink>
      </div>

      <!-- AI Recommendations Modal -->
      <AIRecommendationsModal 
        :is-open="showRecommendations"
        :loading="recommendationLoading"
        :error="recommendationError"
        :data="recommendationData"
        @close="closeRecommendations"
      />

    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

