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
const customNeed = ref('');

// Data Model
const sessionData = reactive({
  affect: { valence: 0, arousal: 0, intensity: 5 },
  labeling: null, // { primary, secondary, ... }
  somatic: { locations: [] },
  context: { triggers: [], notes: '' },
  needs: [] // New field: покоя, тепла, опоры, отдыха, и т.д.
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
  if (step.value === 1) return true;
  if (step.value === 2) return !!sessionData.labeling;
  if (step.value === 5 && sessionMode.value === 'deep') return sessionData.needs.length > 0;
  return true;
});

const currentStepTitle = computed(() => {
  const titles = {
    1: 'АФФЕКТИВНАЯ СЕТКА',
    2: 'ВЫБОР ЭМОЦИИ',
    3: 'ГДЕ ЭТО В ТЕЛЕ?',
    4: 'КОНТЕКСТ И ТРИГГЕРЫ',
    5: 'ПОТРЕБНОСТИ'
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
    needs: []
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

const toggleNeed = (need) => {
  const index = sessionData.needs.indexOf(need);
  if (index === -1) {
    sessionData.needs.push(need);
  } else {
    sessionData.needs.splice(index, 1);
  }
};

const addCustomNeed = () => {
  const val = customNeed.value.trim();
  if (val && !sessionData.needs.includes(val)) {
    sessionData.needs.push(val);
    customNeed.value = '';
  }
};

const saveEntry = async () => {
  if (!canProceed.value) return;

  const payload = {
    affect: sessionData.affect,
    labeling: sessionData.labeling,
    somatic: sessionData.somatic,
    context: sessionData.context,
    needs: sessionData.needs,
    mode: sessionMode.value
  };

  showRecommendations.value = true;
  recommendationLoading.value = true;
  recommendationError.value = null;

  try {
    // 1. If not quick mode, get AI insights FIRST
    if (sessionMode.value !== 'quick') {
      const recommendations = await emotionBarometerService.getRecommendations(payload, onboardingData.value);
      if (recommendations) {
        recommendationData.value = recommendations;
        // Inject AI results into payload for persistence
        payload.reflection = recommendations.reflection;
        payload.shortSummary = recommendations.shortSummary;
      } else {
        recommendationError.value = "Не удалось получить рекомендации";
      }
    } else {
      // Quick mode preset
      recommendationData.value = {
        mode: 'quick',
        message: 'Ваше состояние успешно зафиксировано. Регулярное отслеживание помогает лучше понимать себя.'
      };
    }

    // 2. Save the final payload (including AI reflection if applicable)
    await emotionBarometerService.saveEntry(db, user.value, payload, showNotification);

  } catch (e) {
    console.error("Save/Analyze error:", e);
    recommendationError.value = "Произошла ошибка при сохранении или анализе";
  } finally {
    recommendationLoading.value = false;
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
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-500 font-sans selection:bg-cyan-500/30">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <Breadcrumbs />

      <!-- Header -->
      <section class="text-center mb-12 mt-8">
        <h1
          class="text-3xl sm:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 tracking-tight uppercase">
          ЭМОЦИОНАЛЬНЫЙ КОМПАС
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base font-medium">
          Точная калибровка эмоций. Назови, чтобы управлять.
        </p>
      </section>

      <!-- Mode Selection (Only visible if not started) -->
      <div v-if="!sessionStarted && !loading" class="max-w-4xl mx-auto mb-16 animate-fadeIn">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Quick Pulse -->
          <button @click="startSession('quick')"
            class="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 transition-all text-left shadow-sm hover:shadow-xl hover:shadow-cyan-500/10">
            <div class="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">30с</div>
            <div
              class="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-bolt text-2xl"></i>
            </div>
            <h3 class="text-xl font-black mb-3 uppercase tracking-tight">Быстрый скан</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Быстрая фиксация валентности
              и энергии. Для частого отслеживания.</p>
          </button>

          <!-- Standard Calibration -->
          <button @click="startSession('standard')"
            class="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all text-left shadow-sm hover:shadow-xl hover:shadow-blue-500/10 ring-1 ring-blue-500/10">
            <div class="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">2м</div>
            <div
              class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-compass text-2xl"></i>
            </div>
            <h3 class="text-xl font-black mb-3 uppercase tracking-tight text-blue-600 dark:text-blue-400">Стандарт</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Полный чекин. Нюансы эмоций,
              тело и контекст.</p>
          </button>

          <!-- Deep Diagnostic -->
          <button @click="startSession('deep')"
            class="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-all text-left shadow-sm hover:shadow-xl hover:shadow-purple-500/10">
            <div class="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">5м+</div>
            <div
              class="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-microscope text-2xl"></i>
            </div>
            <h3 class="text-xl font-black mb-3 uppercase tracking-tight">Глубоко</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Сложные состояния. Глубокий
              анализ и стратегии регуляции.</p>
          </button>
        </div>
      </div>

      <!-- Active Session Interface -->
      <div v-if="sessionStarted" class="max-w-3xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-10 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-1000 ease-out"
            :style="{ width: `${progressPercentage}%` }"></div>
        </div>

        <!-- Step Container -->
        <div
          class="bg-white dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-500/5 overflow-hidden min-h-[550px] flex flex-col">

          <!-- Step Header -->
          <div
            class="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center bg-zinc-50/30 dark:bg-zinc-800/20">
            <h2 class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              {{ currentStepTitle }}
            </h2>
            <button @click="cancelSession"
              class="w-8 h-8 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>

          <!-- Step Content -->
          <div class="flex-1 p-8 md:p-12 flex flex-col items-center justify-center">

            <!-- Step 1: Affect Grid -->
            <div v-if="step === 1" class="w-full animate-fadeIn max-w-lg">
              <p class="text-center text-zinc-500 dark:text-zinc-400 mb-10 font-medium">Определите свое текущее
                положение на сетке состояний</p>
              <AffectGrid v-model="sessionData.affect" @change="onAffectChange" />
            </div>

            <!-- Step 2: Emotion Wheel (Family & Nuance) -->
            <div v-if="step === 2" class="w-full animate-fadeIn">
              <EmotionWheel :quadrant-id="currentQuadrant?.id" v-model="sessionData.labeling" @select="nextStep" />
            </div>

            <!-- Step 3: Somatic Marker -->
            <div v-if="step === 3" class="w-full animate-fadeIn">
              <p class="text-center text-zinc-500 dark:text-zinc-400 mb-10 font-medium">Где в теле ощущается эта эмоция?
                <br>
                <span class="text-[10px] font-black uppercase tracking-widest opacity-50">(напряжение, тяжесть,
                  пульсация)</span>
              </p>
              <BodyMapper v-model="sessionData.somatic.locations" />
            </div>

            <!-- Step 4: Context -->
            <div v-if="step === 4" class="w-full animate-fadeIn">
              <p class="text-center text-zinc-500 dark:text-zinc-400 mb-10 font-medium">Какие внешние или внутренние
                факторы влияют на это?</p>
              <ContextTagSelector v-model="sessionData.context.triggers" />
            </div>

            <!-- Step 5: Needs (Only for Deep Mode) -->
            <div v-if="step === 5" class="w-full animate-fadeIn space-y-8 max-w-lg">
              <div class="text-center">
                <p class="text-zinc-500 dark:text-zinc-400 mb-2 font-medium">Чего вашему состоянию хочется прямо сейчас?
                </p>
                <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400">Выберите ключевые потребности
                </p>
              </div>

              <div class="flex flex-wrap justify-center gap-3">
                <button
                  v-for="need in ['Покоя', 'Тепла', 'Опоры', 'Отдыха', 'Безопасности', 'Принятия', 'Движения', 'Выражения', 'Тишины', 'Контакта']"
                  :key="need" @click="toggleNeed(need)"
                  class="px-5 py-2.5 rounded-2xl border transition-all text-sm font-bold uppercase tracking-widest"
                  :class="[
                    sessionData.needs.includes(need)
                      ? 'bg-purple-600 dark:bg-purple-500 text-white border-transparent shadow-lg shadow-purple-500/25 scale-105'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-purple-300'
                  ]">
                  {{ need }}
                </button>
              </div>

              <div class="relative mt-10 w-full">
                <input v-model="customNeed" @keydown.enter="addCustomNeed" type="text"
                  placeholder="Добавить свой вариант..."
                  class="w-full px-6 py-4 pr-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm font-medium" />
                <button @click="addCustomNeed"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl text-purple-600 hover:bg-purple-500/10 transition-colors"
                  :disabled="!customNeed.trim()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

          </div>

          <!-- Footer / Navigation -->
          <div
            class="p-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
            <button v-if="step > 1" @click="prevStep"
              class="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all shadow-sm">
              <i class="fas fa-chevron-left mr-2"></i> Назад
            </button>
            <div v-else></div>

            <button @click="handleNext" :disabled="!canProceed"
              class="px-10 py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-xs transition-all shadow-xl flex items-center gap-3 active:scale-95"
              :class="[
                canProceed
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/40'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              ]">
              <span v-if="isLastStep">Сохранить</span>
              <span v-else>Далее</span>
              <i class="fas" :class="isLastStep ? 'fa-check' : 'fa-arrow-right'"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- History / Stats Links (Visible when not in session) -->
      <div v-if="!sessionStarted" class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16 animate-fadeIn">
        <NuxtLink to="/space/growth/emotional-compass/analysis"
          class="p-8 rounded-[2rem] bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 transition-all group shadow-sm hover:shadow-xl">
          <div class="flex items-center gap-6">
            <div
              class="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-chart-pie text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-black uppercase tracking-tight group-hover:text-cyan-600 transition-colors">Анализ
              </h3>
              <p class="text-sm text-zinc-500 font-medium">Эмоциональные паттерны</p>
            </div>
            <i
              class="fas fa-arrow-right ml-auto text-zinc-300 group-hover:text-cyan-500 transition-all group-hover:translate-x-1"></i>
          </div>
        </NuxtLink>
        <NuxtLink to="/space/growth/emotional-compass/journal-history"
          class="p-8 rounded-[2rem] bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-all group shadow-sm hover:shadow-xl">
          <div class="flex items-center gap-6">
            <div
              class="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-history text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-black uppercase tracking-tight group-hover:text-purple-600 transition-colors">
                История</h3>
              <p class="text-sm text-zinc-500 font-medium">Журнал записей</p>
            </div>
            <i
              class="fas fa-arrow-right ml-auto text-zinc-300 group-hover:text-purple-500 transition-all group-hover:translate-x-1"></i>
          </div>
        </NuxtLink>
      </div>

      <!-- AI Recommendations Modal -->
      <AIRecommendationsModal :is-open="showRecommendations" :loading="recommendationLoading"
        :error="recommendationError" :data="recommendationData" @close="closeRecommendations" />

    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
