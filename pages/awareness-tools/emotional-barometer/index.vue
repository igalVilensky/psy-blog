<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#0F172A]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-float"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float-delay"
        ></div>
        <!-- Animated Grid -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]/80"
        >
          <div class="absolute inset-0 bg-grid-white/[0.02] animate-grid"></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-7xl relative z-10">
      <!-- Hero Section -->
      <section class="text-center mb-16 pt-12">
        <div class="relative inline-block group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"
          ></div>
          <div
            class="relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-medium backdrop-blur-sm border border-white/10"
          >
            Эмоциональный Барометр
          </div>
        </div>
        <h1
          class="text-5xl sm:text-6xl font-bold mt-8 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight"
        >
          Понимаем ваши эмоции
        </h1>
        <p
          class="text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed"
        >
          Эмоциональный Барометр — это инструмент, который помогает вам лучше
          понять свои эмоции, отслеживать их интенсивность и находить способы
          справляться с ними.
        </p>
      </section>

      <!-- Unauthenticated Section -->
      <div
        v-if="!user"
        class="relative group overflow-hidden bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8 sm:p-12 mb-12 max-w-4xl mx-auto"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
        <p class="text-xl text-indigo-100 mb-8">
          Чтобы начать использовать инструмент, пожалуйста, войдите или
          зарегистрируйтесь.
        </p>
        <div class="flex justify-center gap-6 relative z-10">
          <NuxtLink
            to="/login"
            class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 relative z-10"
          >
            Войти
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="px-8 py-3 bg-white/10 border border-indigo-500/50 text-indigo-300 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 relative z-10"
          >
            Зарегистрироваться
          </NuxtLink>
        </div>
      </div>

      <!-- Main Barometer Section -->
      <div
        v-if="user"
        class="relative bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8 sm:p-12 mb-12 max-w-4xl mx-auto"
      >
        <!-- Step Progress -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 mb-12 px-4">
          <template v-for="step in 5" :key="step">
            <div class="flex items-center">
              <div
                :class="[
                  'w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500',
                  currentStep >= step
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-100'
                    : 'bg-white/20 scale-90',
                ]"
              ></div>
              <div
                v-if="step < 5"
                :class="[
                  'h-0.5 w-8 sm:w-16 transition-all duration-500',
                  currentStep > step
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                    : 'bg-white/20',
                ]"
              ></div>
            </div>
          </template>
        </div>

        <h2 class="text-3xl font-bold text-white mb-8 text-center">
          {{ stepTitle }}
        </h2>

        <!-- Step Content -->
        <transition-group name="fade-slide" mode="out-in">
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
        </transition-group>

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
            class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            Далее
          </button>
          <button
            v-if="currentStep === 5"
            @click="handleSubmit"
            :disabled="!canSubmit"
            class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
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
            class="group relative bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl p-8 border border-indigo-500/20 hover:shadow-xl transition-all duration-500"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            ></div>
            <h3 class="text-2xl font-semibold text-indigo-300 mb-3">
              Анализ Эмоций
            </h3>
            <p class="text-gray-300">Изучите свои эмоциональные паттерны</p>
          </NuxtLink>

          <NuxtLink
            to="/awareness-tools/emotional-barometer/journal-history"
            class="group relative bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl p-8 border border-indigo-500/20 hover:shadow-xl transition-all duration-500"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            ></div>
            <h3 class="text-2xl font-semibold text-indigo-300 mb-3">
              История Журнала
            </h3>
            <p class="text-gray-300">Просмотрите ваши прошлые записи</p>
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

// Recommendations based on patterns
const currentRecommendations = computed(() => {
  if (!selectedSubEmotion.value) return [];
  return recommendationsRef.value[selectedSubEmotion.value] || [];
});

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    const statsResult = await getEmotionBarometerStats(db, currentUser.uid);
    if (statsResult.success) {
      stats.value = statsResult.stats;
    } else {
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
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delay {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 25s ease-in-out infinite;
  animation-delay: -10s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
