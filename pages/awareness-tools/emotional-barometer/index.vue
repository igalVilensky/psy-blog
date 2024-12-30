<template>
  <div
    class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-6 sm:py-12"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-8">
        <h1 class="text-4xl sm:text-6xl font-bold text-[#4A4238] mb-4">
          Эмоциональный Барометр
        </h1>
        <p class="text-lg sm:text-xl text-gray-600">Понимаем ваши эмоции</p>
      </div>

      <!-- Emotional Barometer Section -->
      <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6 mb-8">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4A4238]">
          Измерьте свои эмоции
        </h2>

        <StepIndicator :current-step="currentStep" :step-title="stepTitle" />

        <div v-if="currentStep === 1">
          <EmotionSelection
            :emotions="emotions"
            :selected-emotion="selectedEmotion"
            @select-emotion="selectEmotion"
          />
        </div>
        <div v-if="currentStep === 2 && selectedEmotion">
          <IntensityLevel
            :selected-emotion="selectedEmotion"
            v-model:intensity-level="intensityLevel"
          />
        </div>
        <div v-if="currentStep === 3 && selectedEmotion">
          <JournalEntry v-model:journal-entry="journalEntry" />
        </div>
        <div v-if="currentStep === 4 && selectedEmotion">
          <LifeSpheresSelection
            :life-spheres="lifeSpheres"
            :selected-tags="selectedTags"
            @toggle-tag="toggleTag"
          />
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-end mt-6">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 mr-2"
          >
            Назад
          </button>
          <button
            v-if="currentStep < 4"
            @click="nextStep"
            :disabled="!canProceed"
            :class="[
              'px-4 py-2 text-sm rounded-lg',
              canProceed
                ? 'bg-[#FF6B6B] text-white hover:bg-[#FF5252]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            Далее
          </button>
          <button
            v-if="currentStep === 4"
            @click="handleSubmit"
            :disabled="!canSubmit"
            :class="[
              'px-4 py-2 text-sm rounded-lg',
              canSubmit
                ? 'bg-[#FF6B6B] text-white hover:bg-[#FF5252]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            Сохранить
          </button>
        </div>

        <!-- Recommendations Modal -->
        <RecommendationsModal
          :is-open="showModal"
          :emotion="selectedEmotion"
          :intensity="intensityLevel"
          :recommendations="currentRecommendations"
          @close="closeModal"
        />
      </div>

      <!-- Links to Additional Tools -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/awareness-tools/emotional-barometer/analysis"
          class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow text-center"
        >
          <h3 class="text-lg font-semibold text-[#FF6B6B]">Анализ Эмоций</h3>
          <p class="text-sm text-gray-600">
            Изучите свои эмоциональные паттерны
          </p>
        </a>
        <a
          href="/awareness-tools/emotional-barometer/journal-history"
          class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow text-center"
        >
          <h3 class="text-lg font-semibold text-[#FF6B6B]">История Журнала</h3>
          <p class="text-sm text-gray-600">Просмотрите ваши прошлые записи</p>
        </a>
      </div>
    </div>
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

const emotions = [
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-yellow-500",
  },
  {
    id: 2,
    name: "Тревога",
    color: "bg-purple-100",
    activeColor: "bg-purple-500",
  },
  { id: 3, name: "Злость", color: "bg-red-100", activeColor: "bg-red-500" },
  { id: 4, name: "Грусть", color: "bg-blue-100", activeColor: "bg-blue-500" },
  {
    id: 5,
    name: "Вдохновение",
    color: "bg-green-100",
    activeColor: "bg-green-500",
  },
  {
    id: 6,
    name: "Спокойствие",
    color: "bg-teal-100",
    activeColor: "bg-teal-500",
  },
];

const lifeSpheres = [
  { name: "Работа", color: "bg-blue-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Семья", color: "bg-green-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Здоровье", color: "bg-purple-100", activeColor: "bg-[#FF6B6B]" },
  {
    name: "Личностный рост",
    color: "bg-yellow-100",
    activeColor: "bg-[#FF6B6B]",
  },
  { name: "Отношения", color: "bg-pink-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Хобби", color: "bg-orange-100", activeColor: "bg-[#FF6B6B]" },
];

const user = ref(null);
const auth = getAuth();
const db = getFirestore();
const currentStep = ref(1);
const showModal = ref(false);
const selectedEmotion = ref(null);
const intensityLevel = ref(5);
const journalEntry = ref("");
const selectedTags = ref([]);
const entries = ref([]);

// Step titles
const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Выбор эмоции";
    case 2:
      return "Интенсивность";
    case 3:
      return "Описание";
    case 4:
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
      return true; // Always true as we have a default value
    case 3:
      return journalEntry.value.trim().length > 0;
    default:
      return true;
  }
});

// Recommendations based on patterns
const currentRecommendations = computed(() => {
  if (!selectedEmotion.value) return [];

  const recommendations = {
    Тревога: [
      "Попробуйте дыхательные упражнения (4-7-8)",
      "Запишите свои мысли и попробуйте их оспорить",
      "Совершите короткую прогулку на свежем воздухе",
    ],
    Злость: [
      "Сделайте паузу перед реакцией",
      "Выполните физические упражнения",
      "Переключитесь на другую активность",
    ],
    Грусть: [
      "Поговорите с близким человеком",
      "Сделайте что-то приятное для себя",
      "Вспомните хорошие моменты",
    ],
  };

  return recommendations[selectedEmotion.value.name] || [];
});

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    loadDataFromFirebase(currentUser.uid);
  }
});

const canSubmit = computed(() => {
  return selectedTags.value.length > 0;
});

// Navigation functions
const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
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
    intensity: intensityLevel.value,
    entry: journalEntry.value,
    tags: [...selectedTags.value],
    timestamp: new Date().toISOString(),
  };

  try {
    // Get current data first
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(userRef, {
        entries: arrayUnion(newEntry),
        lastUpdated: new Date().toISOString(),
      });
    } else {
      // Create new document
      await setDoc(userRef, {
        entries: [newEntry],
        lastUpdated: new Date().toISOString(),
      });
    }

    console.log("Entry saved successfully to Firebase!");

    // Show recommendations modal if available
    if (currentRecommendations.value.length > 0) {
      showModal.value = true;
    } else {
      closeModal();
    }

    loadDataFromFirebase(user.value.uid);
  } catch (error) {
    console.error("Error saving entry to Firebase:", error);
  }
};

// Load entries from Firebase
const loadDataFromFirebase = async (userId) => {
  const userRef = doc(db, "emotion_barometer", userId);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      entries.value = data.entries || [];
    } else {
      console.log("No entries found for user");
      entries.value = [];
    }
  } catch (error) {
    console.error("Error loading data from Firebase:", error);
  }
};

// HandleSubmit with the Firebase version
const handleSubmit = () => {
  if (!canSubmit.value) return;
  saveEntryToFirebase();
};
</script>
