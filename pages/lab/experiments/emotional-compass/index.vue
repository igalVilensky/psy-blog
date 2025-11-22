<template>
  <div class="min-h-screen text-slate-800 dark:text-slate-200">
    <div class="container mx-auto px-4 xl:px-0 max-w-6xl relative z-10 pt-12 pb-8 md:pb-12">
      <Breadcrumbs />
      <!-- Hero Section -->
      <section v-if="showStartButton" class="text-center mb-12">
        <h1
          class="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-tight font-mono"
        >
          ЭМОЦИОНАЛЬНЫЙ КОМПАС
        </h1>
        <p class="text-slate-600 dark:text-cyan-100/70 max-w-2xl mx-auto leading-relaxed px-2 text-lg">
          Система анализа и калибровки эмоционального состояния. Зафиксируйте
          текущие показатели для дальнейшей обработки и получения рекомендаций.
        </p>
        
        <!-- Guest Warning -->
        <div v-if="!user" class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/80 text-sm">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Гостевой режим: данные сохраняются только в этом браузере</span>
        </div>
      </section>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center gap-4 mt-24"
      >
        <div class="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        <p class="text-cyan-400 font-mono animate-pulse">
          ЗАГРУЗКА МОДУЛЕЙ...
        </p>
      </div>

      <div v-else class="mt-8">
        <!-- Start Button -->
        <div v-if="showStartButton" class="text-center mb-16">
          <button
            @click="startEntry"
            class="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-white transition-all duration-200 bg-cyan-600 font-lg rounded-lg hover:bg-cyan-500 focus:outline-none ring-offset-2 focus:ring-2 ring-cyan-400"
          >
            <span class="absolute w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative flex items-center gap-3">
              <i class="fas fa-plus-circle text-xl"></i>
              НОВАЯ ЗАПИСЬ
            </span>
          </button>
        </div>

        <!-- Main Barometer Section -->
        <div
          v-if="!showStartButton"
          class="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 sm:p-12 mb-12 max-w-4xl mx-auto shadow-lg dark:shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]"
        >
          <!-- Step Progress -->
          <div class="flex items-center justify-center gap-2 sm:gap-3 px-4 mb-12">
            <template v-for="step in 5" :key="step">
              <div class="flex items-center">
                <div
                  :class="[
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-500 border-2',
                    currentStep >= step
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-600 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500',
                  ]"
                >
                  {{ step }}
                </div>
                <div
                  v-if="step < 5"
                  :class="[
                    'h-0.5 w-8 sm:w-16 transition-all duration-500',
                    currentStep > step
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                      : 'bg-slate-200 dark:bg-slate-800',
                  ]"
                ></div>
              </div>
            </template>
          </div>

          <!-- Step Content -->
          <div class="min-h-[400px]">
            <div v-if="currentStep === 1" key="emotion" class="animate-fadeIn">
              <h3 class="text-2xl font-mono text-cyan-600 dark:text-cyan-300 mb-6 text-center">ВЫБОР ЭМОЦИИ</h3>
              <EmotionSelection
                :emotions="emotionsRef"
                :selected-emotion="selectedEmotion"
                @select-emotion="selectEmotion"
              />
            </div>

            <div v-if="currentStep === 2 && selectedEmotion" key="subemotion" class="animate-fadeIn">
               <h3 class="text-2xl font-mono text-cyan-600 dark:text-cyan-300 mb-6 text-center">УТОЧНЕНИЕ СОСТОЯНИЯ</h3>
              <SubEmotionSelection
                :sub-emotions="subEmotions"
                :selected-sub-emotion="selectedSubEmotion"
                @select-sub-emotion="selectSubEmotion"
              />
            </div>

            <div v-if="currentStep === 3 && selectedEmotion" key="intensity" class="animate-fadeIn">
               <h3 class="text-2xl font-mono text-cyan-600 dark:text-cyan-300 mb-6 text-center">УРОВЕНЬ ИНТЕНСИВНОСТИ</h3>
              <IntensityLevel
                :selected-emotion="selectedEmotion"
                v-model:intensity-level="intensityLevel"
              />
            </div>

            <div v-if="currentStep === 4 && selectedEmotion" key="journal" class="animate-fadeIn">
               <h3 class="text-2xl font-mono text-cyan-600 dark:text-cyan-300 mb-6 text-center">ЖУРНАЛ НАБЛЮДЕНИЙ</h3>
              <JournalEntry
                v-model:journal-entry="journalEntry"
                v-model:perception-entry="perceptionEntry"
                v-model:coping-entry="copingEntry"
                v-model:action-entry="actionEntry"
              />
            </div>

            <div v-if="currentStep === 5 && selectedEmotion" key="spheres" class="animate-fadeIn">
               <h3 class="text-2xl font-mono text-cyan-600 dark:text-cyan-300 mb-6 text-center">СФЕРЫ ВЛИЯНИЯ</h3>
              <LifeSpheresSelection
                :life-spheres="lifeSpheresRef"
                :selected-tags="selectedTags"
                @toggle-tag="toggleTag"
              />
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between mt-12 pt-6 border-t border-cyan-500/20">
            <button
              v-if="currentStep > 1"
              @click="previousStep"
              class="px-6 py-2 rounded-lg border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/10 transition-colors font-mono flex items-center gap-2"
            >
              <i class="fas fa-chevron-left"></i> НАЗАД
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < 5"
              @click="nextStep"
              :disabled="!canProceed"
              class="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              ДАЛЕЕ <i class="fas fa-chevron-right"></i>
            </button>

            <button
              v-if="currentStep === 5"
              @click="handleSubmit"
              :disabled="!canSubmit"
              class="px-8 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            >
              <i class="fas fa-save"></i> СОХРАНИТЬ ДАННЫЕ
            </button>
          </div>
        </div>

        <!-- Tools Section -->
        <div
          v-if="showStartButton"
          class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <NuxtLink
            to="/lab/experiments/emotional-compass/analysis"
            :class="[
              'group relative overflow-hidden rounded-2xl p-8 border transition-all duration-300',
              hasStatsData 
                ? 'bg-white dark:bg-slate-900/50 border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                : 'bg-slate-100 dark:bg-slate-900/30 border-slate-300 dark:border-slate-800 opacity-75'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-chart-pie text-2xl text-cyan-400"></i>
              </div>
              <h3 class="text-xl font-mono font-bold text-cyan-600 dark:text-cyan-300 mb-2">АНАЛИЗ ЭМОЦИЙ</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Визуализация паттернов и статистика состояний</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/lab/experiments/emotional-compass/journal-history"
            :class="[
              'group relative overflow-hidden rounded-2xl p-8 border transition-all duration-300',
              hasStatsData 
                ? 'bg-white dark:bg-slate-900/50 border-purple-500/30 hover:border-purple-400 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]' 
                : 'bg-slate-100 dark:bg-slate-900/30 border-slate-300 dark:border-slate-800 opacity-75'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-history text-2xl text-purple-400"></i>
              </div>
              <h3 class="text-xl font-mono font-bold text-purple-600 dark:text-purple-300 mb-2">ИСТОРИЯ_ЖУРНАЛА</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Хронология записей и наблюдений</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AIRecommendationsModal
      :is-open="showModal"
      :emotion="selectedEmotion?.name || ''"
      :sub-emotion="selectedSubEmotion || ''"
      :intensity="intensityLevel"
      :journal-entry="journalEntry"
      :perception-entry="perceptionEntry"
      :coping-entry="copingEntry"
      :action-entry="actionEntry"
      :selected-tags="selectedTags"
      :is-guest="!user"
      @close="closeModal"
    />

    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-50"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AIRecommendationsModal from "~/components/emotional-compass/AIRecommendationsModal.vue";
import EmotionSelection from "~/components/emotional-compass/EmotionSelection.vue";
import IntensityLevel from "~/components/emotional-compass/IntensityLevel.vue";
import JournalEntry from "~/components/emotional-compass/JournalEntry.vue";
import LifeSpheresSelection from "~/components/emotional-compass/LifeSpheresSelection.vue";
import SubEmotionSelection from "~/components/emotional-compass/SubEmotionSelection.vue";
import Notification from "~/components/base/Notification.vue";
import { useNotification } from "@/composables/useNotification";
import { emotionBarometerService } from "~/services/emotionBarometerService";
import { emotions } from "~/data/emotionalBarometer/emotions.js";
import { subEmotionsMap } from "~/data/emotionalBarometer/subEmotionsMap";
import { lifeSpheres } from "~/data/emotionalBarometer/lifeSpheres";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

const emotionsRef = ref(emotions);
const subEmotionsMapRef = ref(subEmotionsMap);
const lifeSpheresRef = ref(lifeSpheres);

const user = ref(null);
const loading = ref(true);
const auth = getAuth();
const db = getFirestore();
const currentStep = ref(1);
const showModal = ref(false);
const selectedEmotion = ref(null);
const intensityLevel = ref(5);
const journalEntry = ref("");
const perceptionEntry = ref("");
const copingEntry = ref("");
const actionEntry = ref("");
const selectedTags = ref([]);
const stats = ref(null);
const subEmotions = ref([]);
const selectedSubEmotion = ref(null);
const showStartButton = ref(true);

const { $markEntry } = useNuxtApp();

// Validation for each step
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return selectedEmotion.value !== null;
    case 2:
      return selectedSubEmotion.value !== null;
    case 3:
      return true;
    case 4:
      return (
        journalEntry.value.trim().length > 0 &&
        perceptionEntry.value.trim().length > 0 &&
        copingEntry.value.trim().length > 0 &&
        actionEntry.value.trim().length > 0
      );
    case 5:
      return selectedTags.value.length > 0;
    default:
      return false;
  }
});

const startEntry = () => {
  showStartButton.value = false;
  currentStep.value = 1;
};

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  loading.value = true;
  user.value = currentUser; // Can be null
  
  // Fetch stats for both user and guest
  const statsResult = await emotionBarometerService.getStats(db, currentUser);
  if (statsResult.success) {
    stats.value = statsResult.stats;
  } else {
    stats.value = null;
  }
  
  loading.value = false;
});

const canSubmit = computed(() => {
  return selectedTags.value.length > 0;
});

const hasStatsData = computed(() => {
  return stats.value && stats.value.totalEntries > 0;
});

// Navigation functions
const nextStep = () => {
  if (canProceed.value && currentStep.value < 5) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const closeModal = () => {
  showModal.value = false;
  currentStep.value = 1;
  selectedEmotion.value = null;
  intensityLevel.value = 5;
  journalEntry.value = "";
  perceptionEntry.value = "";
  copingEntry.value = "";
  actionEntry.value = "";
  selectedTags.value = [];
  subEmotions.value = [];
  showStartButton.value = true;
};

// Emotion and tag selection
const selectEmotion = (emotion) => {
  selectedEmotion.value = emotion;
  subEmotions.value = subEmotionsMapRef.value[emotion.name] || [];
  selectedSubEmotion.value = null;
};

const selectSubEmotion = (subEmotion) => {
  selectedSubEmotion.value = subEmotion;
};

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const handleSubmit = async () => {
  if (!canSubmit.value) return;

  const entryData = {
    emotion: selectedEmotion.value.name,
    subEmotion: selectedSubEmotion.value,
    intensity: intensityLevel.value,
    entry: journalEntry.value,
    perception: perceptionEntry.value,
    coping: copingEntry.value,
    action: actionEntry.value,
    tags: selectedTags.value,
  };

  const response = await emotionBarometerService.saveEntry(
    db,
    user.value,
    entryData,
    showNotification
  );

  if (response.success) {
    if (user.value) {
        $markEntry("emotion"); // Only mark progress for logged users
    }

    showModal.value = true;

    // Reset state
    currentStep.value = 1;
    selectedEmotion.value = null;
    journalEntry.value = "";
    perceptionEntry.value = "";
    copingEntry.value = "";
    actionEntry.value = "";
    selectedTags.value = [];
    subEmotions.value = [];
    showStartButton.value = true;
    
    // Refresh stats
    const statsResult = await emotionBarometerService.getStats(db, user.value);
    if (statsResult.success) {
      stats.value = statsResult.stats;
    }
  }
};
</script>

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
