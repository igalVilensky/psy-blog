<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/60 flex justify-center items-start md:items-center z-[999] backdrop-blur-sm overflow-y-auto"
      @click="handleOverlayClick"
    >
      <div
        class="bg-white rounded-2xl w-[95%] max-w-[500px] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up my-4"
        @click.stop
      >
        <!-- Modal header with progress indicator -->
        <div class="p-4 border-b border-gray-100 relative">
          <h2 class="text-xl font-semibold text-gray-800">
            Ежедневная искра роста
          </h2>
          <div class="mt-3">
            <div class="flex justify-between mb-2">
              <div
                v-for="(step, index) in [
                  'Эмоциональная проницательность',
                  'Проверка энергии',
                  'Поделитесь открытием',
                ]"
                :key="index"
                :class="[
                  'flex flex-col items-center flex-1',
                  getStageIndex(currentStage) === index ? 'text-blue-500' : '',
                  getStageIndex(currentStage) > index ? 'text-green-500' : '',
                ]"
              >
                <div
                  :class="[
                    'w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mb-1 transition-all',
                    getStageIndex(currentStage) === index
                      ? 'bg-blue-500 text-white'
                      : getStageIndex(currentStage) > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600',
                  ]"
                >
                  {{ index + 1 }}
                </div>
                <div class="text-xs hidden sm:block">{{ step }}</div>
                <div class="text-xs sm:hidden">
                  {{
                    index === 0 ? "Эмоция" : index === 1 ? "Энергия" : "Совет"
                  }}
                </div>
              </div>
            </div>
            <div class="h-1 bg-gray-200 rounded-full relative">
              <div
                class="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
                :style="`width: ${progressPercentage}%`"
              ></div>
            </div>
          </div>
          <div class="absolute top-4 right-12 text-sm text-gray-600">
            <i class="fas fa-star text-yellow-400"></i> {{ points }}
          </div>
          <button
            class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full transition-all"
            @click="confirmClose"
            aria-label="Закрыть"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-4 overflow-y-auto max-h-[70vh]">
          <!-- Stage 1: Emotion Insight Game -->
          <div v-if="currentStage === 'emotion'" class="space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-base font-medium">
                Эмоциональная проницательность
              </h3>
              <div class="flex gap-1">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="text-lg transition-all"
                  :class="{
                    'opacity-30': winCount < i,
                    'scale-110': winCount >= i,
                  }"
                >
                  <i class="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 p-3 rounded-xl text-center">
              <p class="text-gray-700 italic text-sm">
                {{ currentScenario.prompt }}
              </p>
            </div>
            <div class="flex justify-center gap-3">
              <div
                v-for="(emotion, index) in currentScenario.emotions"
                :key="index"
                @click="handleEmotionClick(index)"
                :class="[
                  'w-20 h-16 flex flex-col items-center justify-center bg-gray-50 rounded-xl cursor-pointer transition-all border-2',
                  selectedIndex === index
                    ? 'border-blue-500'
                    : 'border-transparent',
                  isCorrect && selectedIndex === index
                    ? 'bg-green-100 border-green-500 scale-105'
                    : '',
                  isWrong && selectedIndex === index
                    ? 'bg-red-100 border-red-500 animate-shake'
                    : '',
                  'hover:-translate-y-1 hover:shadow-md',
                ]"
              >
                <span class="text-xl">{{ emotion.emoji }}</span>
                <span class="text-xs mt-1">{{ emotion.label }}</span>
              </div>
            </div>
            <div
              v-if="feedback"
              :class="[
                'p-2 rounded-lg text-center font-medium text-sm',
                isCorrect
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700',
              ]"
            >
              {{ feedback }}
            </div>
            <button
              v-if="gameComplete"
              @click="nextRound"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all hover:-translate-y-1 mx-auto block text-sm"
            >
              {{ winCount >= 3 ? "Продолжить" : "Следующий вопрос" }}
            </button>
          </div>

          <!-- Stage 2: Energy Tracker -->
          <div v-if="currentStage === 'energy'" class="text-center space-y-4">
            <h3 class="text-base font-medium">Как ваша энергия сегодня?</h3>
            <div>
              <div class="text-4xl mb-2 transition-all">{{ energyEmoji }}</div>
              <div class="text-base font-medium text-gray-700">
                {{ energyLevel }} - {{ energyFeedback }}
              </div>
            </div>
            <div class="flex items-center px-2">
              <span class="text-xs text-gray-600 w-8 text-right">Низкая</span>
              <input
                type="range"
                v-model="energyLevel"
                min="0"
                max="10"
                step="1"
                class="flex-1 h-2 mx-2 rounded-full appearance-none bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
              />
              <span class="text-xs text-gray-600 w-8 text-left">Высокая</span>
            </div>
            <div class="bg-gray-50 p-3 rounded-xl">
              <h4 class="text-sm font-medium mb-2">Топливо для роста</h4>
              <div class="flex flex-wrap justify-center gap-2">
                <div
                  v-for="(item, index) in growthFuelItems"
                  :key="index"
                  :class="[
                    'flex flex-col items-center p-2 w-16 bg-white rounded-lg cursor-pointer transition-all border',
                    item.selected
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-200 hover:bg-blue-50',
                  ]"
                  @click="toggleFuelItem(index)"
                >
                  <i :class="['fas', item.icon, 'text-lg mb-1']"></i>
                  <span class="text-xs text-center">{{ item.label }}</span>
                </div>
              </div>
            </div>
            <button
              @click="submitEnergy"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all hover:-translate-y-1 text-sm"
            >
              Продолжить
            </button>
          </div>

          <!-- Stage 3: Tip Input -->
          <div v-if="currentStage === 'tip'" class="text-center space-y-4">
            <h3 class="text-base font-medium">Поделитесь своим открытием</h3>
            <p class="text-gray-600 text-sm">
              Что помогло вам вырасти? Поделитесь, чтобы вдохновить других.
            </p>
            <div class="flex flex-wrap justify-center gap-2">
              <span
                v-for="(category, index) in tipCategories"
                :key="index"
                :class="[
                  'px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 cursor-pointer transition-all',
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200',
                ]"
                @click="selectedCategory = category"
              >
                {{ category }}
              </span>
            </div>
            <div class="relative">
              <textarea
                v-model="tip"
                placeholder="Введите совет, открытие или напоминание..."
                rows="3"
                maxlength="280"
                class="w-full p-3 border border-gray-200 rounded-lg resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              ></textarea>
              <div class="absolute bottom-2 right-3 text-xs text-gray-500">
                {{ tip.length }}/280
              </div>
            </div>
            <div
              class="flex items-center justify-center gap-2 text-xs text-gray-600"
            >
              <label class="relative inline-block w-8 h-4">
                <input
                  type="checkbox"
                  v-model="isAnonymous"
                  class="opacity-0 w-0 h-0"
                />
                <span
                  class="absolute inset-0 cursor-pointer bg-gray-300 rounded-full transition-all before:absolute before:h-3 before:w-3 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all"
                  :class="{ 'bg-blue-500 before:translate-x-4': isAnonymous }"
                ></span>
              </label>
              <span>Поделиться анонимно</span>
            </div>
            <div class="flex justify-center gap-3">
              <button
                @click="skipTip"
                class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
              >
                Пропустить
              </button>
              <button
                @click="submitTip"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-blue-600 hover:-translate-y-1 text-sm"
                :class="{ 'bg-gray-400 cursor-not-allowed': tip.trim() === '' }"
                :disabled="tip.trim() === ''"
              >
                Отправить
              </button>
            </div>
          </div>

          <!-- Final Stage: Success -->
          <div
            v-if="currentStage === 'success'"
            class="text-center space-y-4 py-3"
          >
            <div class="text-4xl animate-bounce-in">
              <i class="fas fa-check-circle text-green-500"></i>
            </div>
            <h3 class="text-base font-medium">Отличная работа!</h3>
            <p class="text-sm">
              Вы завершили сегодняшнюю искру роста. Возвращайтесь завтра за
              новым вызовом!
            </p>
            <div class="bg-gray-50 p-3 rounded-xl">
              <p class="text-gray-700 text-sm">
                Сегодня вы: {{ successSummary }}
              </p>
            </div>
            <div
              class="flex items-center justify-center gap-2 bg-orange-50 p-2 rounded-lg w-fit mx-auto"
            >
              <i class="fas fa-fire text-orange-500"></i>
              <span class="text-sm">Серия: {{ streakDays }} дней</span>
            </div>
            <!-- Netzach Progress Indicator -->
            <div class="bg-gray-50 p-3 rounded-xl text-gray-700 text-sm">
              <p>
                Прогресс Нецаха: {{ sefirotProgress.netzach.displayProgress }}%
                ({{ sefirotProgress.netzach.dailyActions }}/{{
                  sefirotProgress.netzach.maxActions
                }}
                действий)
              </p>
              <div class="w-48 mx-auto bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  class="h-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300"
                  :style="{
                    width: `${sefirotProgress.netzach.displayProgress}%`,
                  }"
                ></div>
              </div>
              <p class="mt-2">
                Очки: {{ sefirotProgress.netzach.points }} | Уровень:
                {{ sefirotProgress.netzach.level }}
              </p>
            </div>
            <!-- Chesed Progress Indicator -->
            <div class="bg-gray-50 p-3 rounded-xl text-gray-700 text-sm">
              <p>
                Прогресс Хеседа: {{ sefirotProgress.chesed.displayProgress }}%
                ({{ sefirotProgress.chesed.dailyActions }}/{{
                  sefirotProgress.chesed.maxActions
                }}
                действий)
              </p>
              <div class="w-48 mx-auto bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  class="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-300"
                  :style="{
                    width: `${sefirotProgress.chesed.displayProgress}%`,
                  }"
                ></div>
              </div>
              <p class="mt-2">
                Очки: {{ sefirotProgress.chesed.points }} | Уровень:
                {{ sefirotProgress.chesed.level }}
              </p>
            </div>
            <button
              @click="closeModal"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all hover:-translate-y-1 text-sm"
            >
              Завершить
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div
      v-if="showConfirmation"
      class="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]"
      @click="cancelClose"
    >
      <div
        class="bg-white p-5 rounded-xl w-[90%] max-w-[300px] text-center"
        @click.stop
      >
        <h3 class="text-base font-medium">Вы уверены?</h3>
        <p class="mt-2 text-sm">
          Ваш прогресс будет потерян, если вы выйдете сейчас.
        </p>
        <div class="flex justify-center gap-3 mt-4">
          <button
            @click="cancelClose"
            class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
          >
            Отмена
          </button>
          <button
            @click="closeModal"
            class="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all text-sm"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>

    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-50"
    />
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  getDailyGrowthSparkData,
  saveDailyGrowthSparkEntry,
} from "~/api/firebase/dailyGrowthSpark";
import { useNotification } from "@/composables/useNotification";
import Notification from "~/components/base/Notification.vue";

// Authentication and Firestore
const auth = getAuth();
const db = getFirestore();
const user = ref(null);

// Notification handling
const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

// Modal visibility
const isVisible = ref(false);
const showConfirmation = ref(false);

// Stage control
const currentStage = ref("emotion"); // 'emotion', 'energy', 'tip', 'success'

// Progress calculation
const getStageIndex = (stage) => {
  const stages = ["emotion", "energy", "tip", "success"];
  return stages.indexOf(stage);
};

const progressPercentage = computed(() => {
  const currentIndex = getStageIndex(currentStage.value);
  const totalStages = 3; // Excluding success stage
  return Math.min(100, (currentIndex / totalStages) * 100);
});

// Streak and points tracking (for Daily Growth Spark)
const streakDays = ref(0);
const points = ref(0);

// State for Sefirot progress (Netzach and Chesed)
const sefirotProgress = ref({
  netzach: {
    dailyActions: 0,
    maxActions: 3,
    points: 0,
    level: 1,
    displayProgress: 0,
  },
  chesed: {
    dailyActions: 0,
    maxActions: 3,
    points: 0,
    level: 1,
    displayProgress: 0,
  },
});

// Calculate daily progress
const calculateDailyProgress = (actions, maxActions) => {
  return Math.round((actions / maxActions) * 100);
};

// Calculate level based on points
const calculateLevel = (points) => {
  if (points < 200) return 1;
  if (points < 400) return 2;
  if (points < 1000) return 3;
  if (points < 2000) return 4;
  return 5;
};

// Fetch progress for Netzach and Chesed
const fetchSefirotProgress = async (userId) => {
  try {
    // Fetch progress data
    const progressRef = doc(db, `users/${userId}/progress/sefirot`);
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const progressData = progressSnap.data();
      if (progressData.netzach) {
        sefirotProgress.value.netzach.points = progressData.netzach.points || 0;
        sefirotProgress.value.netzach.level = calculateLevel(
          sefirotProgress.value.netzach.points
        );
      }
      if (progressData.chesed) {
        sefirotProgress.value.chesed.points = progressData.chesed.points || 0;
        sefirotProgress.value.chesed.level = calculateLevel(
          sefirotProgress.value.chesed.points
        );
      }
    }

    // Fetch daily actions
    const today = new Date().toISOString().split("T")[0];
    const dailyRef = doc(db, `users/${userId}/daily/${today}`);
    const dailySnap = await getDoc(dailyRef);

    if (dailySnap.exists()) {
      const dailyData = dailySnap.data();
      sefirotProgress.value.netzach.dailyActions =
        dailyData.netzach?.actions || 0;
      sefirotProgress.value.netzach.displayProgress = calculateDailyProgress(
        sefirotProgress.value.netzach.dailyActions,
        sefirotProgress.value.netzach.maxActions
      );
      sefirotProgress.value.chesed.dailyActions =
        dailyData.chesed?.actions || 0;
      sefirotProgress.value.chesed.displayProgress = calculateDailyProgress(
        sefirotProgress.value.chesed.dailyActions,
        sefirotProgress.value.chesed.maxActions
      );
    }

    // Set up real-time listeners
    onSnapshot(progressRef, (snap) => {
      if (snap.exists()) {
        const progressData = snap.data();
        if (progressData.netzach) {
          sefirotProgress.value.netzach.points =
            progressData.netzach.points || 0;
          sefirotProgress.value.netzach.level = calculateLevel(
            sefirotProgress.value.netzach.points
          );
        }
        if (progressData.chesed) {
          sefirotProgress.value.chesed.points = progressData.chesed.points || 0;
          sefirotProgress.value.chesed.level = calculateLevel(
            sefirotProgress.value.chesed.points
          );
        }
      }
    });

    onSnapshot(dailyRef, (snap) => {
      if (snap.exists()) {
        const dailyData = snap.data();
        sefirotProgress.value.netzach.dailyActions =
          dailyData.netzach?.actions || 0;
        sefirotProgress.value.netzach.displayProgress = calculateDailyProgress(
          sefirotProgress.value.netzach.dailyActions,
          sefirotProgress.value.netzach.maxActions
        );
        sefirotProgress.value.chesed.dailyActions =
          dailyData.chesed?.actions || 0;
        sefirotProgress.value.chesed.displayProgress = calculateDailyProgress(
          sefirotProgress.value.chesed.dailyActions,
          sefirotProgress.value.chesed.maxActions
        );
      } else {
        sefirotProgress.value.netzach.dailyActions = 0;
        sefirotProgress.value.netzach.displayProgress = 0;
        sefirotProgress.value.chesed.dailyActions = 0;
        sefirotProgress.value.chesed.displayProgress = 0;
      }
    });
  } catch (error) {
    console.error("Error fetching Sefirot progress:", error);
    showNotification("Ошибка загрузки прогресса Сфирот.", "error");
  }
};

// Check auth state and fetch data
onMounted(async () => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      const response = await getDailyGrowthSparkData(db, currentUser.uid);
      if (response.success) {
        streakDays.value = response.data.streakDays;
        points.value = response.data.points;
        const lastUpdated = response.data.lastUpdated;
        const today = new Date().toISOString().split("T")[0];
        if (lastUpdated !== today) {
          isVisible.value = true;
        }
      }
      await fetchSefirotProgress(currentUser.uid);
    } else {
      user.value = null;
      isVisible.value = false;
      sefirotProgress.value = {
        netzach: {
          dailyActions: 0,
          maxActions: 3,
          points: 0,
          level: 1,
          displayProgress: 0,
        },
        chesed: {
          dailyActions: 0,
          maxActions: 3,
          points: 0,
          level: 1,
          displayProgress: 0,
        },
      };
    }
  });
});

// Emotion Insight Game Logic
const emotionScenarios = [
  {
    prompt:
      "Вы только что закончили сложный проект и чувствуете удовлетворение.",
    emotions: [
      { emoji: "😊", label: "Гордость" },
      { emoji: "😢", label: "Грусть" },
      { emoji: "😡", label: "Злость" },
    ],
    correctIndex: 0,
    tip: "Чувствуете гордость? Отмечайте маленькие победы, чтобы оставаться мотивированным!",
  },
  {
    prompt: "Друг отменил планы в последнюю минуту, и вы разочарованы.",
    emotions: [
      { emoji: "😂", label: "Веселье" },
      { emoji: "😔", label: "Разочарование" },
      { emoji: "😊", label: "Счастье" },
    ],
    correctIndex: 1,
    tip: "Разочарование — это нормально. Попробуйте найти радость в неожиданном свободном времени.",
  },
  {
    prompt: "Вы помедитировали и чувствуете спокойствие и сосредоточенность.",
    emotions: [
      { emoji: "😰", label: "Тревога" },
      { emoji: "😌", label: "Спокойствие" },
      { emoji: "😤", label: "Раздражение" },
    ],
    correctIndex: 1,
    tip: "Спокойствие — ваш источник силы. Используйте его для ясности в делах.",
  },
];

const currentSetIndex = ref(
  Math.floor(Math.random() * emotionScenarios.length)
);
const currentScenario = computed(() => emotionScenarios[currentSetIndex.value]);
const correctIndex = computed(
  () => emotionScenarios[currentSetIndex.value].correctIndex
);

const selectedIndex = ref(null);
const isCorrect = ref(false);
const isWrong = ref(false);
const feedback = ref("");
const gameComplete = ref(false);
const winCount = ref(0);

const handleEmotionClick = (index) => {
  if (selectedIndex.value !== null || gameComplete.value) return;
  selectedIndex.value = index;

  if (index === correctIndex.value) {
    isCorrect.value = true;
    feedback.value = `Отлично! Вы в гармонии со своими эмоциями. ${
      emotionScenarios[currentSetIndex.value].tip
    }`;
    winCount.value += 1;
    points.value += 10;
    gameComplete.value = true;
  } else {
    isWrong.value = true;
    feedback.value = "Не совсем. Подумайте, что вы чувствуете в этот момент.";
    setTimeout(() => {
      gameComplete.value = true;
    }, 1000);
  }
};

const nextRound = () => {
  if (winCount.value >= 3) {
    currentStage.value = "energy";
    feedback.value = "";
    return;
  }

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * emotionScenarios.length);
  } while (newIndex === currentSetIndex.value);
  currentSetIndex.value = newIndex;

  selectedIndex.value = null;
  isCorrect.value = false;
  isWrong.value = false;
  feedback.value = "";
  gameComplete.value = false;
};

// Energy level logic
const energyLevel = ref(5);
const energyFeedback = computed(() => {
  if (energyLevel.value <= 3) return "День с низкой энергией";
  if (energyLevel.value <= 7) return "Стабильная энергия";
  return "Пик высокой энергии";
});

const energyEmoji = computed(() => {
  if (energyLevel.value <= 2) return "😴";
  if (energyLevel.value <= 4) return "😌";
  if (energyLevel.value <= 6) return "😊";
  if (energyLevel.value <= 8) return "😃";
  return "🤩";
});

// Growth Fuel items with FontAwesome icons
const growthFuelItems = ref([
  { icon: "fa-tint", label: "Пить воду", selected: false },
  { icon: "fa-running", label: "Размяться", selected: false },
  { icon: "fa-apple-alt", label: "Здоровая еда", selected: false },
  { icon: "fa-om", label: "Медитация", selected: false },
  { icon: "fa-book", label: "Учиться", selected: false },
]);

const toggleFuelItem = (index) => {
  growthFuelItems.value[index].selected =
    !growthFuelItems.value[index].selected;
};

const submitEnergy = () => {
  points.value += 5; // Bonus for completing energy stage
  energyLevel.value = Number(energyLevel.value);
  currentStage.value = "tip";
};

// Tip input logic
const tip = ref("");
const isAnonymous = ref(false);
const tipCategories = ref([
  "Работа",
  "Здоровье",
  "Осознанность",
  "Отношения",
  "Обучение",
]);
const selectedCategory = ref("Осознанность");

// Modified submitTip with Netzach and Chesed feedback
const submitTip = async () => {
  const oldNetzachLevel = sefirotProgress.value.netzach.level;
  const oldChesedLevel = sefirotProgress.value.chesed.level;
  points.value += 20;
  const growthData = {
    gameResults: { wins: winCount.value },
    energy: {
      level: Number(energyLevel.value),
      fuelFactors: growthFuelItems.value
        .filter((item) => item.selected)
        .map((item) => item.label),
    },
    insight: {
      text: tip.value,
      category: selectedCategory.value,
      isAnonymous: isAnonymous.value,
      displayName: user.value.displayName,
    },
    points: points.value,
  };

  const response = await saveDailyGrowthSparkEntry(
    db,
    user.value.uid,
    growthData,
    showNotification
  );
  if (response.success) {
    streakDays.value = response.streakDays;
    points.value = response.points;
    currentStage.value = "success";
    // Show Netzach and Chesed progress feedback
    showNotification(
      `Запись сохранена! Вы заработали 10 очков для Нецаха (прогресс: ${sefirotProgress.value.netzach.displayProgress}%) и 10 очков для Хеседа (прогресс: ${sefirotProgress.value.chesed.displayProgress}%).`,
      "success"
    );
    // Check for level-ups
    if (sefirotProgress.value.netzach.level > oldNetzachLevel) {
      showNotification(
        `Поздравляем! Вы достигли уровня ${sefirotProgress.value.netzach.level} для Нецаха!`,
        "success"
      );
    }
    if (sefirotProgress.value.chesed.level > oldChesedLevel) {
      showNotification(
        `Поздравляем! Вы достигли уровня ${sefirotProgress.value.chesed.level} для Хеседа!`,
        "success"
      );
    }
  }
};

// Modified skipTip with Netzach feedback only
const skipTip = async () => {
  const oldNetzachLevel = sefirotProgress.value.netzach.level;
  const growthData = {
    gameResults: { wins: winCount.value },
    energy: {
      level: Number(energyLevel.value),
      fuelFactors: growthFuelItems.value
        .filter((item) => item.selected)
        .map((item) => item.label),
    },
    insight: null,
    points: points.value,
  };

  const response = await saveDailyGrowthSparkEntry(
    db,
    user.value.uid,
    growthData,
    showNotification
  );
  if (response.success) {
    streakDays.value = response.streakDays;
    points.value = response.points;
    currentStage.value = "success";
    // Show Netzach progress feedback
    showNotification(
      `Запись сохранена! Вы заработали 10 очков для Нецаха. Текущий прогресс: ${sefirotProgress.value.netzach.displayProgress}% (${sefirotProgress.value.netzach.dailyActions}/${sefirotProgress.value.netzach.maxActions} действий).`,
      "success"
    );
    // Check for level-up
    if (sefirotProgress.value.netzach.level > oldNetzachLevel) {
      showNotification(
        `Поздравляем! Вы достигли уровня ${sefirotProgress.value.netzach.level} для Нецаха!`,
        "success"
      );
    }
  }
};

// Success summary
const successSummary = computed(() => {
  const emotion =
    emotionScenarios[currentSetIndex.value].emotions[
      correctIndex.value
    ].label.toLowerCase();
  const fuel =
    growthFuelItems.value
      .filter((item) => item.selected)
      .map((item) => item.label.toLowerCase())
      .join(", ") || "ничего не выбрано";
  const tipText = tip.value
    ? `поделились советом в категории "${selectedCategory.value}"`
    : "пропустили совет";
  return `чувствовали ${emotion}, имели ${energyFeedback.value.toLowerCase()}, выбрали топливо: ${fuel}, и ${tipText}.`;
});

// Modal control
const handleOverlayClick = (event) => {
  if (event.target.classList.contains("fixed")) confirmClose();
};

const confirmClose = () => {
  showConfirmation.value = true;
};

const cancelClose = () => {
  showConfirmation.value = false;
};

const closeModal = () => {
  isVisible.value = false;
  showConfirmation.value = false;
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid #3b82f6;
  cursor: pointer;
  transition: all 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-8px) rotate(-5deg);
  }
  40% {
    transform: translateX(8px) rotate(5deg);
  }
  60% {
    transform: translateX(-4px) rotate(-3deg);
  }
  80% {
    transform: translateX(4px) rotate(3deg);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}

.animate-bounce-in {
  animation: bounce-in 0.6s;
}

.animate-shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
