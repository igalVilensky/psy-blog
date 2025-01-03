<template>
  <div
    class="bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen py-6 sm:py-12"
  >
    <div class="container px-4 max-w-7xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-8">
        <h1 class="text-4xl sm:text-6xl font-bold text-[#4A4238] mb-4">
          Эмоциональный Барометр
        </h1>
        <p class="text-lg sm:text-xl text-gray-600">Понимаем ваши эмоции</p>
      </div>

      <!-- Emotional Barometer Section -->
      <div
        class="bg-white shadow-xl rounded-2xl p-4 sm:p-6 mb-8 max-w-3xl w-full mx-auto"
      >
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
          <SubEmotionSelection
            :sub-emotions="subEmotions"
            :selected-sub-emotion="selectedSubEmotion"
            @select-sub-emotion="selectSubEmotion"
          />
        </div>
        <div v-if="currentStep === 3 && selectedEmotion">
          <IntensityLevel
            :selected-emotion="selectedEmotion"
            v-model:intensity-level="intensityLevel"
          />
        </div>
        <div v-if="currentStep === 4 && selectedEmotion">
          <div v-if="currentStep === 4 && selectedEmotion">
            <JournalEntry
              v-model:journal-entry="journalEntry"
              v-model:perception-entry="perceptionEntry"
              v-model:coping-entry="copingEntry"
            />
          </div>
        </div>
        <div v-if="currentStep === 5 && selectedEmotion">
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
            v-if="currentStep < 5"
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
            v-if="currentStep === 5"
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
          :emotion="{ name: selectedSubEmotion }"
          :intensity="intensityLevel"
          :recommendations="currentRecommendations"
          @close="closeModal"
        />
      </div>

      <!-- Links to Additional Tools -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full mx-auto"
      >
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
import SubEmotionSelection from "~/components/emotional-barometer/SubEmotionSelection.vue";

const emotions = [
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-yellow-500",
  },
  {
    id: 2,
    name: "Грусть",
    color: "bg-blue-100",
    activeColor: "bg-blue-500",
  },
  {
    id: 3,
    name: "Страх",
    color: "bg-purple-100",
    activeColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Гнев",
    color: "bg-red-100",
    activeColor: "bg-red-500",
  },
  {
    id: 5,
    name: "Удивление",
    color: "bg-green-100",
    activeColor: "bg-green-500",
  },
];

const subEmotionsMap = {
  Радость: [
    "Восторг",
    "Удовольствие",
    "Гордость",
    "Облегчение",
    "Счастье",
    "Благодарность",
    "Эйфория",
    "Вдохновение",
  ],
  Грусть: [
    "Одиночество",
    "Потеря",
    "Разочарование",
    "Тоска",
    "Сожаление",
    "Печаль",
    "Уныние",
    "Грусть",
  ],
  Страх: [
    "Тревога",
    "Паника",
    "Неуверенность",
    "Опасение",
    "Ужас",
    "Беспокойство",
    "Шок",
    "Тревожность",
  ],
  Гнев: [
    "Раздражение",
    "Ярость",
    "Обида",
    "Негодование",
    "Злость",
    "Враждебность",
    "Гнев",
    "Агрессия",
  ],
  Удивление: [
    "Изумление",
    "Вдохновение",
    "Ошеломление",
    "Любопытство",
    "Изумление",
    "Шок",
    "Неожиданность",
    "Потрясение",
  ],
};

const lifeSpheres = [
  {
    name: "Работа",
    color: "bg-blue-100",
    activeColor: "bg-[#FF6B6B]",
    dotColor: "bg-blue-400",
    ringColor: "blue-400",
  },
  {
    name: "Семья",
    color: "bg-green-100",
    activeColor: "bg-[#FF6B6B]",
    dotColor: "bg-green-400",
    ringColor: "green-400",
  },
  {
    name: "Здоровье",
    color: "bg-purple-100",
    activeColor: "bg-[#FF6B6B]",
    dotColor: "bg-purple-400",
    ringColor: "purple-400",
  },
  {
    name: "Личностный рост",
    color: "bg-yellow-100",
    activeColor: "bg-[#FF6B6B]",
    dotColor: "bg-yellow-400",
    ringColor: "yellow-400",
  },
  {
    name: "Отношения",
    color: "bg-pink-100",
    activeColor: "bg-[#FF6B6B]",
    dotColor: "bg-pink-400",
    ringColor: "pink-400",
  },
  {
    name: "Хобби",
    color: "bg-orange-100",
    activeColor: "bg-[#FF6B6B]",
    dotColor: "bg-orange-400",
    ringColor: "orange-400",
  },
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

  const recommendations = {
    // Грусть Sub-emotions
    Одиночество: [
      "Поговорите с близким другом или родственником",
      "Попробуйте заняться волонтерской деятельностью",
      "Запланируйте время на приятные мероприятия",
    ],
    Потеря: [
      "Позвольте себе время для грусти",
      "Ведите дневник, чтобы выразить свои чувства",
      "Обратитесь за поддержкой к психологу или близкому человеку",
    ],
    Разочарование: [
      "Попробуйте переосмыслить ожидания",
      "Сфокусируйтесь на том, что вы можете изменить",
      "Отвлекитесь на что-то приятное, чтобы снизить напряжение",
    ],
    Тоска: [
      "Послушайте музыку, которая поднимает настроение",
      "Прогуляйтесь на свежем воздухе",
      "Попробуйте медитацию для успокоения ума",
    ],
    Сожаление: [
      "Примите прошлые ошибки как уроки для будущего",
      "Извинитесь перед собой или другими, если возможно",
      "Фокусируйтесь на том, что можно сделать сейчас, чтобы улучшить ситуацию",
    ],
    Печаль: [
      "Поплачьте, если чувствуете в этом необходимость — это естественно",
      "Поговорите с кем-то, кто может вас поддержать",
      "Займитесь чем-то, что приносит вам радость, даже если это трудно",
    ],
    Уныние: [
      "Попробуйте составить список достижений, чтобы напомнить себе о позитивных моментах",
      "Сделайте небольшой шаг в направлении вашей цели",
      "Обратитесь за поддержкой к близким или специалисту",
    ],
    Грусть: [
      "Посмотрите вдохновляющий фильм или прочитайте позитивную книгу",
      "Сделайте что-то, что приносит вам удовольствие, например, хобби",
      "Сходите на прогулку или займитесь физической активностью",
    ],

    // Страх Sub-emotions
    Тревога: [
      "Попробуйте дыхательные упражнения (4-7-8)",
      "Запишите свои мысли и найдите рациональные ответы",
      "Сделайте физические упражнения, чтобы снизить напряжение",
    ],
    Паника: [
      "Попробуйте метод заземления (назовите 5 предметов, которые видите)",
      "Медленно дышите, сосредотачиваясь на выдохе",
      "Обратитесь за помощью, если чувствуете, что не справляетесь",
    ],
    Неуверенность: [
      "Составьте список своих достижений",
      "Поговорите с кем-то, кто вас поддерживает",
      "Напомните себе, что неопределенность — это временно",
    ],
    Опасение: [
      "Оцените вероятные исходы и приготовьтесь к ним",
      "Обсудите свои опасения с надежным человеком",
      "Попробуйте представить наихудший сценарий и способы справиться с ним",
    ],
    Ужас: [
      "Закройте глаза и сосредоточьтесь на медленном дыхании",
      "Напомните себе, что это чувство временно и пройдет",
      "Сконцентрируйтесь на чем-то реальном и безопасном рядом с вами",
    ],
    Беспокойство: [
      "Выпишите все свои беспокойства на бумаге, чтобы очистить разум",
      "Сосредоточьтесь на текущем моменте через осознанность",
      "Постарайтесь отвлечь себя приятным занятием или фильмом",
    ],
    Шок: [
      "Попросите поддержку у близкого человека",
      "Позвольте себе время обработать ситуацию",
      "Избегайте принятия серьезных решений в состоянии шока",
    ],
    Тревожность: [
      "Примите, что тревога — это нормальная реакция, но она временная",
      "Выполните несколько легких упражнений на расслабление",
      "Старайтесь не изолироваться — поговорите с кем-то, кому доверяете",
    ],

    // Гнев Sub-emotions
    Раздражение: [
      "Сделайте паузу и глубоко вдохните",
      "Занимайтесь физической активностью, чтобы выплеснуть эмоции",
      "Избегайте ситуаций, вызывающих раздражение, пока не успокоитесь",
    ],
    Ярость: [
      "Найдите безопасный способ выразить свою ярость (например, крик в подушку)",
      "Уединитесь и попробуйте успокоиться",
      "Ведите дневник, чтобы выразить свои эмоции словами",
    ],
    Обида: [
      "Попробуйте понять, почему вы чувствуете обиду",
      "Обсудите свои чувства с человеком, который вас задел",
      "Сосредоточьтесь на прощении ради себя",
    ],
    Негодование: [
      "Напишите письмо, но не отправляйте его, чтобы выразить свои эмоции",
      "Сделайте паузу и попробуйте рационализировать свои чувства",
      "Займитесь физической активностью, чтобы снять напряжение",
    ],
    Злость: [
      "Попробуйте переключить свое внимание на физическую активность",
      "Подумайте, стоит ли эта ситуация ваших эмоций",
      "Изучите технику позитивной переоценки",
    ],
    Враждебность: [
      "Примите, что ваши чувства могут быть не совсем объективны",
      "Попробуйте представить себя на месте другого человека",
      "Займитесь чем-то, что успокаивает вас — прогулка, музыка, медитация",
    ],
    Гнев: [
      "Проведите время на природе, чтобы освободиться от напряжения",
      "Попробуйте записать свои чувства и мысли",
      "Избегайте агрессивных действий — вместо этого дайте себе время успокоиться",
    ],
    Агрессия: [
      "Уединитесь, чтобы избежать конфликтов",
      "Выполните энергичные упражнения, чтобы высвободить эмоции",
      "Сосредоточьтесь на дыхании, чтобы снизить уровень возбуждения",
    ],
  };

  return recommendations[selectedSubEmotion.value] || [];
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
  subEmotions.value = subEmotionsMap[emotion.name] || []; // Properly map emotions to sub-emotions
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

    console.log("Entry saved successfully to Firebase!");

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
