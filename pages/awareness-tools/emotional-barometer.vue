<template>
  <div
    class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-6 sm:py-12"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Emotional Barometer Section -->
        <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4A4238]">
            Эмоциональный Барометр
          </h2>
          <!-- Step Indicator -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <span class="text-sm text-gray-600">Шаг {{ currentStep }}/4</span>
              <span class="text-sm text-gray-600">{{ stepTitle }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-[#FF6B6B] h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(currentStep / 4) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Step 1: Emotion Selection -->
          <div v-if="currentStep === 1">
            <p class="text-sm text-gray-600 mb-3">
              Выберите эмоцию, которую вы сейчас испытываете. Это поможет вам
              лучше понять свое эмоциональное состояние.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              <button
                v-for="emotion in emotions"
                :key="emotion.id"
                @click="selectEmotion(emotion)"
                :class="[
                  'py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm',
                  selectedEmotion?.id === emotion.id
                    ? `${emotion.activeColor} text-white`
                    : `${emotion.color} hover:opacity-80`,
                ]"
              >
                {{ emotion.name }}
              </button>
            </div>
          </div>

          <!-- Step 2: Intensity Level -->
          <div v-if="currentStep === 2">
            <div class="mb-3">
              <p class="text-sm text-gray-600">
                Оцените силу вашей эмоции "{{ selectedEmotion?.name }}" от 1 до
                10:
              </p>
              <ul class="text-xs text-gray-500 mt-2 space-y-1">
                <li>1-3: Слабое ощущение</li>
                <li>4-7: Умеренное влияние</li>
                <li>8-10: Сильное воздействие</li>
              </ul>
            </div>
            <input
              type="range"
              v-model="intensityLevel"
              min="1"
              max="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span class="block text-center mt-2 text-sm font-medium">
              {{ intensityLevel }}/10
            </span>
          </div>

          <!-- Journal Entry Form -->
          <div v-if="selectedEmotion" class="mt-4 sm:mt-6">
            <!-- Step 3: Journal Entry -->
            <div v-if="currentStep === 3">
              <p class="text-sm text-gray-600 mb-3">
                Опишите, что вызвало эту эмоцию и какие мысли у вас возникли:
              </p>
              <textarea
                v-model="journalEntry"
                class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                rows="4"
                placeholder="Опишите ваши мысли и чувства..."
              ></textarea>
            </div>

            <!-- Step 4: Life Spheres -->
            <div v-if="currentStep === 4">
              <p class="text-sm text-gray-600 mb-3">
                Выберите сферы жизни, к которым относится эта эмоция:
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="sphere in lifeSpheres"
                  :key="sphere.name"
                  @click="toggleTag(sphere.name)"
                  :class="[
                    'px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm transition-all',
                    selectedTags.includes(sphere.name)
                      ? sphere.activeColor
                      : sphere.color,
                    selectedTags.includes(sphere.name)
                      ? 'text-white'
                      : 'text-gray-700',
                  ]"
                >
                  {{ sphere.name }}
                </button>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-6">
              <button
                v-if="currentStep > 1"
                @click="previousStep"
                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Назад
              </button>
              <button
                v-if="currentStep < 4"
                @click="nextStep"
                :disabled="!canProceed"
                :class="[
                  'px-4 py-2 text-sm rounded-lg ml-auto',
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
                  'px-4 py-2 text-sm rounded-lg ml-auto',
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
        </div>

        <!-- Analysis Section -->
        <EmotionalAnalysis :patterns="emotionPatterns" />

        <!-- Journal History Section -->
        <JournalHistory
          :emotions="emotions"
          :lifeSpheres="lifeSpheres"
          :entries="entries"
        />
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
import EmotionalAnalysis from "~/components/emotional-barometer/EmotionalAnalysis.vue";
import JournalHistory from "~/components/emotional-barometer/JournalHistory.vue";

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
      console.log("Loaded entries:", entries.value);
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

// Emotion pattern analysis
const emotionPatterns = computed(() => {
  const patterns = entries.value.reduce((acc, entry) => {
    if (!acc[entry.emotion]) {
      acc[entry.emotion] = {
        count: 0,
        avgIntensity: 0,
        commonSpheres: {},
      };
    }
    acc[entry.emotion].count++;
    acc[entry.emotion].avgIntensity += entry.intensity;
    entry.tags.forEach((tag) => {
      acc[entry.emotion].commonSpheres[tag] =
        (acc[entry.emotion].commonSpheres[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Calculate averages
  Object.keys(patterns).forEach((emotion) => {
    patterns[emotion].avgIntensity /= patterns[emotion].count;
  });

  return patterns;
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
</script>
