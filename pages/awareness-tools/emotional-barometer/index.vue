<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto sm:px-4 max-w-6xl relative z-10 pb-12 pt-6">
      <!-- Hero Section (hidden when showStartButton is false) -->
      <section v-if="showStartButton" class="text-center">
        <h1
          class="text-4xl sm:text-5xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight"
        >
          Анализ и понимание эмоций
        </h1>
        <p class="text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
          Эмоциональный Барометр — инструмент для оценки и осознания
          эмоционального состояния. Он помогает отслеживать динамику эмоций,
          анализировать их влияние и находить эффективные стратегии управления.
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

      <div v-else class="mt-10">
        <!-- Unauthenticated Section -->
        <div
          v-if="!user"
          class="relative text-center bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-12 mb-12 max-w-2xl mx-auto"
        >
          <p class="text-xl text-slate-300 mb-8">
            Чтобы начать использовать инструмент, пожалуйста, войдите или
            зарегистрируйтесь.
          </p>
          <div class="flex justify-center gap-6 flex-col sm:flex-row">
            <Button
              text="Войти"
              iconClass="fas fa-sign-in-alt"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-[#0EA5E9]"
              :isLink="true"
              to="/login"
            />
            <Button
              text="Зарегистрироваться"
              iconClass="fas fa-user-plus"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-[#0EA5E9]"
              :isLink="true"
              to="/register"
            />
          </div>
        </div>

        <!-- Start Button (shown only when showStartButton is true) -->
        <div v-if="user && showStartButton" class="text-center mt-8 mb-10">
          <Button
            text="Добавить запись"
            iconClass="fas fa-plus"
            gradientStart="#8B5CF6"
            gradientEnd="#06B6D4"
            textColor="#FFFFFF"
            customClass="relative bg-gradient-to-r from-purple-500 to-cyan-500 border-[#06B6D4] inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
            :isLink="false"
            @click="startEntry"
          />
        </div>

        <!-- Main Barometer Section (shown only when showStartButton is false) -->
        <div
          v-if="user && !showStartButton"
          class="relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-12 mb-12 max-w-4xl mx-auto transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <!-- Step Progress -->
          <div class="flex items-center justify-center gap-2 sm:gap-3 px-4">
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
          <div
            class="flex justify-between sm:justify-end mt-6 gap-4 w-full max-w-2xl mx-auto"
          >
            <!-- Previous Button -->
            <Button
              v-if="currentStep > 1"
              text="Назад"
              iconClass="fas fa-arrow-left"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-[#0EA5E9]"
              :isLink="false"
              @click="previousStep"
            />

            <!-- Next Button -->
            <Button
              v-if="currentStep < 5"
              text="Далее"
              iconClass="fas fa-arrow-right"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative bg-gradient-to-r from-purple-500 to-cyan-500 inline-flex border-[#0EA5E9] items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group ml-auto sm:ml-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gradient-to-r disabled:hover:from-purple-500 disabled:hover:to-cyan-500"
              :isLink="false"
              :disabled="!canProceed"
              @click="nextStep"
            />

            <!-- Save Button -->
            <Button
              v-if="currentStep === 5"
              text="Сохранить"
              iconClass="fas fa-save"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gradient-to-r disabled:hover:from-purple-500 disabled:hover:to-cyan-500 items-center border-[#0EA5E9] bg-gradient-to-r from-purple-500 to-cyan-500 justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group ml-auto sm:ml-0"
              :isLink="false"
              :disabled="!canSubmit"
              @click="handleSubmit"
            />
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
              class="group relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#0EA5E9]/20 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] transition-all duration-300"
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
              class="group relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#0EA5E9]/20 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] transition-all duration-300"
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
              class="bg-[#1A1F35]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-50 cursor-not-allowed text-center border border-[#0EA5E9]/20"
            >
              <h3 class="text-xl font-semibold text-[#0EA5E9] mb-2">
                Анализ Эмоций
              </h3>
              <p class="text-sm text-slate-300">
                Изучите свои эмоциональные паттерны
              </p>
            </div>
            <div
              class="bg-[#1A1F35]/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 opacity-50 cursor-not-allowed text-center border border-[#0EA5E9]/20"
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
import Button from "~/components/base/Button.vue";

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
const handleSubmit = async () => {
  if (!canSubmit.value) return;

  // Save the entry to Firebase
  await saveEntryToFirebase();

  // Reset all state variables to their initial values
  currentStep.value = 1;
  selectedEmotion.value = null;

  journalEntry.value = "";
  perceptionEntry.value = "";
  copingEntry.value = "";
  selectedTags.value = [];

  subEmotions.value = [];

  // Show the "Добавить запись" button again
  showStartButton.value = true;
};
</script>
