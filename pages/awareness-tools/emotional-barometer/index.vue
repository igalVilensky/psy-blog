<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-7xl relative z-10 pb-12 pt-6">
      <!-- Hero Section (hidden when showStartButton is false) -->
      <section v-if="showStartButton" class="text-center">
        <h1
          class="text-4xl sm:text-5xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight"
        >
          Понимаем ваши эмоции
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Эмоциональный Барометр — это инструмент, который помогает вам лучше
          понять свои эмоции, отслеживать их интенсивность и находить способы
          справляться с ними.
        </p>
      </section>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center gap-3 sm:gap-4 mt-24"
      >
        <i class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9]"></i>
        <p class="text-slate-300 text-base sm:text-lg font-medium">
          Пожалуйста, подождите...
        </p>
      </div>

      <div v-else>
        <!-- Unauthenticated Section -->
        <div
          v-if="!user"
          class="relative group overflow-hidden bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 sm:p-12 mb-12 max-w-4xl mx-auto"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <p class="text-xl text-slate-300 mb-8">
            Чтобы начать использовать инструмент, пожалуйста, войдите или
            зарегистрируйтесь.
          </p>
          <div class="flex justify-center gap-6 relative z-10">
            <NuxtLink
              to="/login"
              class="px-8 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#0EA5E9]/25 transition-all duration-300 relative z-10"
            >
              Войти
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-8 py-3 bg-white/10 border border-[#0EA5E9]/50 text-[#0EA5E9] rounded-xl font-medium hover:bg-white/20 transition-all duration-300 relative z-10"
            >
              Зарегистрироваться
            </NuxtLink>
          </div>
        </div>

        <!-- Start Button (shown only when showStartButton is true) -->
        <div v-if="user && showStartButton" class="text-center mt-8 mb-10">
          <button
            @click="startEntry"
            class="px-8 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#0EA5E9]/25 transition-all duration-300"
          >
            Добавить запись
          </button>
        </div>

        <!-- Main Barometer Section (shown only when showStartButton is false) -->
        <div
          v-if="user && !showStartButton"
          class="relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 sm:p-12 mb-12 max-w-4xl mx-auto"
        >
          <!-- Step Progress -->
          <div
            class="flex items-center justify-center gap-2 sm:gap-3 mb-6 px-4"
          >
            <template v-for="step in 5" :key="step">
              <div class="flex items-center">
                <div
                  :class="[
                    'w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500',
                    currentStep >= step
                      ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] scale-100'
                      : 'bg-white/20 scale-90',
                  ]"
                ></div>
                <div
                  v-if="step < 5"
                  :class="[
                    'h-0.5 w-8 sm:w-16 transition-all duration-500',
                    currentStep > step
                      ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]'
                      : 'bg-white/20',
                  ]"
                ></div>
              </div>
            </template>
          </div>

          <!-- Step Content -->
          <div
            v-if="currentStep === 1"
            key="emotion"
            class="transition-all duration-300"
          >
            <EmotionSelection
              :emotions="emotionsRef"
              :selected-emotion="selectedEmotion"
              @select-emotion="selectEmotion"
            />
          </div>

          <div v-if="currentStep === 2 && selectedEmotion" key="subemotion">
            <SubEmotionSelection
              :sub-emotions="subEmotions"
              :selected-sub-emotion="selectedSubEmotion"
              @select-sub-emotion="selectSubEmotion"
            />
          </div>

          <div v-if="currentStep === 3 && selectedEmotion" key="intensity">
            <IntensityLevel
              :selected-emotion="selectedEmotion"
              v-model:intensity-level="intensityLevel"
            />
          </div>

          <div v-if="currentStep === 4 && selectedEmotion" key="journal">
            <JournalEntry
              v-model:journal-entry="journalEntry"
              v-model:perception-entry="perceptionEntry"
              v-model:coping-entry="copingEntry"
            />
          </div>

          <div v-if="currentStep === 5 && selectedEmotion" key="spheres">
            <LifeSpheresSelection
              :life-spheres="lifeSpheresRef"
              :selected-tags="selectedTags"
              @toggle-tag="toggleTag"
            />
          </div>

          <!-- Navigation -->
          <div class="flex justify-end mt-12 gap-4">
            <button
              v-if="currentStep > 1"
              @click="previousStep"
              class="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Назад
            </button>
            <button
              v-if="currentStep < 5"
              @click="nextStep"
              :disabled="!canProceed"
              class="px-8 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0EA5E9]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              Далее
            </button>
            <button
              v-if="currentStep === 5"
              @click="handleSubmit"
              :disabled="!canSubmit"
              class="px-8 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0EA5E9]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              Сохранить
            </button>
          </div>
        </div>

        <!-- Tools Section -->
        <div
          v-if="user"
          class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20"
        >
          <template v-if="hasStatsData">
            <NuxtLink
              to="/awareness-tools/emotional-barometer/analysis"
              class="group relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:shadow-xl transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <h3 class="text-2xl font-semibold text-[#0EA5E9] mb-3">
                Анализ Эмоций
              </h3>
              <p class="text-slate-300">Изучите свои эмоциональные паттерны</p>
            </NuxtLink>

            <NuxtLink
              to="/awareness-tools/emotional-barometer/journal-history"
              class="group relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:shadow-xl transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <h3 class="text-2xl font-semibold text-[#0EA5E9] mb-3">
                История Журнала
              </h3>
              <p class="text-slate-300">Просмотрите ваши прошлые записи</p>
            </NuxtLink>
          </template>
          <template v-else>
            <div
              class="bg-[#1A1F35]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-50 cursor-not-allowed text-center border border-white/10"
            >
              <h3 class="text-xl font-semibold text-[#0EA5E9] mb-2">
                Анализ Эмоций
              </h3>
              <p class="text-sm text-slate-300">
                Изучите свои эмоциональные паттерны
              </p>
            </div>
            <div
              class="bg-[#1A1F35]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-50 cursor-not-allowed text-center border border-white/10"
            >
              <h3 class="text-xl font-semibold text-[#0EA5E9] mb-2">
                История Журнала
              </h3>
              <p class="text-sm text-slate-300">
                Просмотрите ваши прошлые записи
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <RecommendationsModal
      :is-open="showModal"
      :emotion="{ name: selectedSubEmotion }"
      :intensity="intensityLevel"
      :recommendations="currentRecommendations"
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
import { ref, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import RecommendationsModal from "~/components/emotional-barometer/RecommendationsModal.vue";
import EmotionSelection from "~/components/emotional-barometer/EmotionSelection.vue";
import IntensityLevel from "~/components/emotional-barometer/IntensityLevel.vue";
import JournalEntry from "~/components/emotional-barometer/JournalEntry.vue";
import LifeSpheresSelection from "~/components/emotional-barometer/LifeSpheresSelection.vue";
import SubEmotionSelection from "~/components/emotional-barometer/SubEmotionSelection.vue";
import Notification from "~/components/base/Notification.vue";
import { useNotification } from "@/composables/useNotification";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { emotions } from "~/data/emotionalBarometer/emotions.js";
import { subEmotionsMap } from "~/data/emotionalBarometer/subEmotionsMap";
import { lifeSpheres } from "~/data/emotionalBarometer/lifeSpheres";
import { recommendations } from "~/data/emotionalBarometer/recommendations";

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

const emotionsRef = ref(emotions);
const subEmotionsMapRef = ref(subEmotionsMap);
const lifeSpheresRef = ref(lifeSpheres);
const recommendationsRef = ref(recommendations);

const user = ref(null);
const loading = ref(true);
const auth = getAuth();
const db = getFirestore();
const currentStep = ref(1);
const showModal = ref(false);
const selectedEmotion = ref(null);
const intensityLevel = ref(5);
const journalEntry = ref("");
const selectedTags = ref([]);
const stats = ref(null);
const subEmotions = ref([]);
const selectedSubEmotion = ref(null);
const perceptionEntry = ref("");
const copingEntry = ref("");
const showStartButton = ref(true); // Initially show the "Добавить запись" button

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
        copingEntry.value.trim().length > 0
      );
    case 5:
      return selectedTags.value.length > 0;
    default:
      return false;
  }
});

const startEntry = () => {
  showStartButton.value = false; // Hide the button and show the steps
  currentStep.value = 1; // Start from the first step
};

// Recommendations based on patterns
const currentRecommendations = computed(() => {
  if (!selectedSubEmotion.value) return [];
  return recommendationsRef.value[selectedSubEmotion.value] || [];
});

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  loading.value = true;
  if (currentUser) {
    user.value = currentUser;
    const statsResult = await getEmotionBarometerStats(db, currentUser.uid);
    if (statsResult.success) {
      stats.value = statsResult.stats;
    } else {
      stats.value = null;
    }
    loading.value = false;
  }
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
  selectedTags.value = [];
};

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

// Save emotion entry to Firebase
const saveEntryToFirebase = async () => {
  if (!user.value || !canSubmit.value) return;

  const userRef = doc(db, "emotion_barometer", user.value.uid);

  const newEntry = {
    emotion: selectedEmotion.value.name,
    subEmotion: selectedSubEmotion.value,
    intensity: intensityLevel.value,
    entry: journalEntry.value,
    perception: perceptionEntry.value,
    coping: copingEntry.value,
    tags: [...selectedTags.value],
    timestamp: new Date().toISOString(),
  };

  try {
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      await updateDoc(userRef, {
        entries: arrayUnion(newEntry),
        lastUpdated: new Date().toISOString(),
      });
    } else {
      await setDoc(userRef, {
        entries: [newEntry],
        lastUpdated: new Date().toISOString(),
      });
    }

    showNotification("Запись успешно сохранена!", "success");

    if (currentRecommendations.value.length > 0) {
      showModal.value = true;
    } else {
      closeModal();
    }
  } catch (error) {
    console.error("Error saving entry to Firebase:", error);
    showNotification(
      "Ошибка сохранения записи. Пожалуйста, попробуйте еще раз.",
      "error"
    );
  }
};

// HandleSubmit with the Firebase version
const handleSubmit = () => {
  if (!canSubmit.value) return;
  saveEntryToFirebase();
};
</script>
<style scoped>
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1f35;
}

::-webkit-scrollbar-thumb {
  background: #0ea5e9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
</style>
