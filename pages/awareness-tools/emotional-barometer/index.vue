<template>
  <div
    class="bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] min-h-screen py-12 relative overflow-hidden"
  >
    <!-- Neon glow line at the top -->
    <div
      class="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-purple-400/50 via-cyan-400/50 to-purple-400/50"
    ></div>

    <div class="container mx-auto px-4 max-w-7xl relative z-10">
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <div
          class="inline-block px-6 py-2 bg-gradient-to-b from-[#1A1F35] to-indigo-600 rounded-full text-white font-medium mb-6 shadow-lg"
        >
          Эмоциональный Барометр
        </div>
        <h1
          class="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          Понимаем ваши эмоции
        </h1>
        <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Эмоциональный Барометр — это инструмент, который помогает вам лучше
          понять свои эмоции, отслеживать их интенсивность и находить способы
          справляться с ними.
        </p>
      </section>

      <!-- Message for Unauthenticated Users -->
      <div
        v-if="!user"
        class="bg-[#1E1B4B]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-12 mb-12 max-w-4xl mx-auto text-center border border-indigo-500/20"
      >
        <p class="text-lg sm:text-xl text-gray-300 mb-6">
          Чтобы начать использовать инструмент, пожалуйста, войдите или
          зарегистрируйтесь.
        </p>
        <div class="flex justify-center gap-4">
          <NuxtLink
            to="/login"
            class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all shadow-md"
          >
            Войти
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="px-6 py-3 bg-white border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-md"
          >
            Зарегистрироваться
          </NuxtLink>
        </div>
      </div>

      <!-- Emotional Barometer Section -->
      <div
        v-if="user"
        class="bg-[#1E1B4B]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-12 mb-12 max-w-4xl mx-auto border border-indigo-500/20"
      >
        <h2 class="text-2xl font-bold text-white mb-8">Измерьте свои эмоции</h2>

        <!-- Step Indicator -->
        <StepIndicator :current-step="currentStep" :step-title="stepTitle" />

        <!-- Step 1: Emotion Selection -->
        <div v-if="currentStep === 1">
          <EmotionSelection
            :emotions="emotionsRef"
            :selected-emotion="selectedEmotion"
            @select-emotion="selectEmotion"
          />
        </div>

        <!-- Step 2: Sub-Emotion Selection -->
        <div v-if="currentStep === 2 && selectedEmotion">
          <SubEmotionSelection
            :sub-emotions="subEmotions"
            :selected-sub-emotion="selectedSubEmotion"
            @select-sub-emotion="selectSubEmotion"
          />
        </div>

        <!-- Step 3: Intensity Level -->
        <div v-if="currentStep === 3 && selectedEmotion">
          <IntensityLevel
            :selected-emotion="selectedEmotion"
            v-model:intensity-level="intensityLevel"
          />
        </div>

        <!-- Step 4: Journal Entry -->
        <div v-if="currentStep === 4 && selectedEmotion">
          <JournalEntry
            v-model:journal-entry="journalEntry"
            v-model:perception-entry="perceptionEntry"
            v-model:coping-entry="copingEntry"
          />
        </div>

        <!-- Step 5: Life Spheres Selection -->
        <div v-if="currentStep === 5 && selectedEmotion">
          <LifeSpheresSelection
            :life-spheres="lifeSpheresRef"
            :selected-tags="selectedTags"
            @toggle-tag="toggleTag"
          />
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-end mt-8 gap-4">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all shadow-md"
          >
            Назад
          </button>
          <button
            v-if="currentStep < 5"
            @click="nextStep"
            :disabled="!canProceed"
            :class="[
              'px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg transition-all shadow-md',
              canProceed
                ? 'hover:from-indigo-600 hover:to-blue-600'
                : 'opacity-50 cursor-not-allowed',
            ]"
          >
            Далее
          </button>
          <button
            v-if="currentStep === 5"
            @click="handleSubmit"
            :disabled="!canSubmit"
            :class="[
              'px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg transition-all shadow-md',
              canSubmit
                ? 'hover:from-indigo-600 hover:to-blue-600'
                : 'opacity-50 cursor-not-allowed',
            ]"
          >
            Сохранить
          </button>
        </div>
      </div>

      <!-- Links to Additional Tools -->
      <div
        v-if="user"
        class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <template v-if="hasStatsData">
          <NuxtLink
            to="/awareness-tools/emotional-barometer/analysis"
            class="bg-[#1E1B4B]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 hover:shadow-xl transition-all text-center border border-indigo-500/20"
          >
            <h3 class="text-xl font-semibold text-indigo-400 mb-2">
              Анализ Эмоций
            </h3>
            <p class="text-sm text-gray-300">
              Изучите свои эмоциональные паттерны
            </p>
          </NuxtLink>
          <NuxtLink
            to="/awareness-tools/emotional-barometer/journal-history"
            class="bg-[#1E1B4B]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 hover:shadow-xl transition-all text-center border border-indigo-500/20"
          >
            <h3 class="text-xl font-semibold text-indigo-400 mb-2">
              История Журнала
            </h3>
            <p class="text-sm text-gray-300">Просмотрите ваши прошлые записи</p>
          </NuxtLink>
        </template>
        <template v-else>
          <div
            class="bg-[#1E1B4B]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-50 cursor-not-allowed text-center border border-indigo-500/20"
          >
            <h3 class="text-xl font-semibold text-indigo-400 mb-2">
              Анализ Эмоций
            </h3>
            <p class="text-sm text-gray-300">
              Изучите свои эмоциональные паттерны
            </p>
          </div>
          <div
            class="bg-[#1E1B4B]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-50 cursor-not-allowed text-center border border-indigo-500/20"
          >
            <h3 class="text-xl font-semibold text-indigo-400 mb-2">
              История Журнала
            </h3>
            <p class="text-sm text-gray-300">Просмотрите ваши прошлые записи</p>
          </div>
        </template>
      </div>
    </div>

    <!-- Recommendations Modal -->
    <RecommendationsModal
      :is-open="showModal"
      :emotion="{ name: selectedSubEmotion }"
      :intensity="intensityLevel"
      :recommendations="currentRecommendations"
      @close="closeModal"
    />

    <!-- Notification -->
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
import StepIndicator from "~/components/emotional-barometer/StepIndicator.vue";
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

// Step titles
const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Выбор эмоции";
    case 2:
      return "Выбор подэмоции";
    case 3:
      return "Интенсивность";
    case 4:
      return "Описание";
    case 5:
      return "Сферы жизни";
    default:
      return "";
  }
});

// Validation for each step
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return selectedEmotion.value !== null; // Primary emotion must be selected
    case 2:
      return selectedSubEmotion.value !== null; // Sub-emotion must be selected
    case 3:
      return true; // Intensity level is always valid due to the default value
    case 4:
      return (
        journalEntry.value.trim().length > 0 &&
        perceptionEntry.value.trim().length > 0 &&
        copingEntry.value.trim().length > 0
      );
    case 5:
      return selectedTags.value.length > 0; // At least one life sphere must be selected
    default:
      return false; // Safety fallback for invalid steps
  }
});

// Recommendations based on patterns
const currentRecommendations = computed(() => {
  if (!selectedSubEmotion.value) return [];

  return recommendationsRef.value[selectedSubEmotion.value] || [];
});

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;

    // Fetch statistics
    const statsResult = await getEmotionBarometerStats(db, currentUser.uid);
    if (statsResult.success) {
      stats.value = statsResult.stats;
      console.log("Emotion Barometer Stats:", stats.value);
    } else {
      console.log("Failed to fetch stats:", statsResult.message);
      stats.value = null;
    }
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
  // Reset form after closing modal
  currentStep.value = 1;
  selectedEmotion.value = null;
  intensityLevel.value = 5;
  journalEntry.value = "";
  selectedTags.value = [];
};

const selectEmotion = (emotion) => {
  selectedEmotion.value = emotion;
  subEmotions.value = subEmotionsMapRef.value[emotion.name] || []; // Properly map emotions to sub-emotions
  selectedSubEmotion.value = null; // Reset sub-emotion when the main emotion changes
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
    entry: journalEntry.value, // Original journal entry
    perception: perceptionEntry.value, // New field for perception entry
    coping: copingEntry.value, // New field for coping entry
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
