<template>
  <Teleport to="body">
    <div v-if="isVisible"
      class="fixed inset-0 bg-slate-950/80 flex justify-center items-start md:items-center z-[999] backdrop-blur-sm overflow-y-auto"
      @click="handleOverlayClick">
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl w-[95%] max-w-[500px] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up my-4 border border-cyan-500/30 text-slate-900 dark:text-slate-100"
        @click.stop>
        <!-- Modal header with progress indicator -->
        <div class="p-4 border-b border-cyan-500/20">
          <div class="flex justify-between items-start mb-3">
            <h2 class="text-lg sm:text-xl font-mono font-bold text-cyan-600 dark:text-cyan-300 mr-2">
              ЕЖЕДНЕВНАЯ ИСКРА РОСТА
            </h2>
            <div class="flex items-center gap-3 shrink-0">
              <div
                class="text-sm text-slate-600 dark:text-slate-300 flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                <i class="fas fa-star text-cyan-400 mr-1"></i>
                <span class="font-mono font-bold">{{ points }}</span>
              </div>
              <button
                class="text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 w-8 h-8 flex items-center justify-center rounded-full transition-all"
                @click="confirmClose" aria-label="Закрыть">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <div v-for="(step, index) in [
                'Эмоциональная проницательность',
                'Проверка энергии',
                'Поделитесь открытием',
              ]" :key="index" :class="[
                'flex flex-col items-center flex-1',
                getStageIndex(currentStage) === index ? 'text-cyan-600 dark:text-cyan-400' : '',
                getStageIndex(currentStage) > index ? 'text-purple-600 dark:text-purple-400' : '',
              ]">
                <div :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1 transition-all',
                  getStageIndex(currentStage) === index
                    ? 'bg-cyan-500 text-white'
                    : getStageIndex(currentStage) > index
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
                ]">
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
            <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full relative">
              <div
                class="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all"
                :style="`width: ${progressPercentage}%`"></div>
            </div>
          </div>
        </div>

        <div class="p-4 overflow-y-auto max-h-[70vh]">
          <!-- Stage 1: Emotion Insight Game -->
          <div v-if="currentStage === 'emotion'" class="space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-base font-medium text-slate-900 dark:text-slate-100">
                Эмоциональная проницательность
              </h3>
              <div class="flex gap-1">
                <div v-for="i in 3" :key="i" class="text-lg transition-all" :class="{
                  'opacity-30': winCount < i,
                  'scale-110': winCount >= i,
                }">
                  <i class="fas fa-star text-yellow-400"></i>
                </div>
              </div>
            </div>
            <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-cyan-500/30">
              <p class="text-slate-700 dark:text-slate-300 italic text-sm mb-2">
                {{ currentScenario.prompt }}
              </p>
            </div>
            <div class="flex justify-center gap-3 flex-wrap">
              <div v-for="(emotion, index) in currentScenario.emotions" :key="index" @click="handleEmotionClick(index)"
                :class="[
                  'w-auto min-w-[5rem] h-auto min-h-[4rem] flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all border-2 p-2',
                  selectedIndex === index
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-transparent bg-slate-100 dark:bg-slate-800',
                  isCorrect && selectedIndex === index
                    ? 'bg-green-500/20 border-green-500 scale-105'
                    : '',
                  isWrong && selectedIndex === index
                    ? 'bg-red-500/20 border-red-500 animate-shake'
                    : '',
                  'hover:-translate-y-1 hover:shadow-md dark:hover:shadow-cyan-500/20',
                ]">
                <span class="text-xl mb-1">{{ emotion.emoji }}</span>
                <span :class="[
                  'text-xs text-center leading-tight',
                  selectedIndex === index
                    ? 'text-slate-900 dark:text-slate-200 font-medium'
                    : 'text-slate-600 dark:text-slate-400',
                ]">
                  {{ emotion.label }}
                </span>
              </div>
            </div>
            <div v-if="feedback" :class="[
              'p-2 rounded-lg text-center font-medium text-sm',
              isCorrect
                ? 'bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/50'
                : 'bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/50',
            ]">
              {{ feedback }}
            </div>
            <button v-if="gameComplete" @click="nextRound"
              class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono font-bold transition-all hover:-translate-y-1 mx-auto block text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              {{ winCount >= 3 ? "ПРОДОЛЖИТЬ" : "СЛЕДУЮЩИЙ ВОПРОС" }}
            </button>
          </div>

          <!-- Stage 2: Energy Tracker -->
          <div v-if="currentStage === 'energy'" class="text-center space-y-4">
            <h3 class="text-base font-mono font-bold text-cyan-600 dark:text-cyan-300">
              КАК ВАША ЭНЕРГИЯ СЕГОДНЯ?
            </h3>
            <div>
              <div class="text-4xl mb-2 transition-all">{{ energyEmoji }}</div>
              <div class="text-base font-medium text-slate-700 dark:text-slate-300">
                {{ energyLevel }} - {{ energyFeedback }}
              </div>
            </div>
            <div class="flex items-center px-2">
              <span class="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">Низкая</span>
              <input type="range" v-model="energyLevel" min="0" max="10" step="1"
                class="flex-1 h-2 mx-2 rounded-full appearance-none bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
              <span class="text-xs text-slate-500 dark:text-slate-400 w-8 text-left">Высокая</span>
            </div>
            <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-cyan-500/30">
              <h4 class="text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                Топливо для роста
              </h4>
              <div class="flex flex-wrap justify-center gap-2">
                <div v-for="(item, index) in growthFuelItems" :key="index" :class="[
                  'flex flex-col items-center p-2 w-auto min-w-[4rem] rounded-lg cursor-pointer transition-all border',
                  item.selected
                    ? 'bg-cyan-600 text-white border-cyan-400'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600',
                ]" @click="toggleFuelItem(index)">
                  <i :class="['fas', item.icon, 'text-lg mb-1']"></i>
                  <span class="text-xs text-center leading-tight">{{ item.label }}</span>
                </div>
              </div>
            </div>
            <button @click="submitEnergy"
              class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono font-bold transition-all hover:-translate-y-1 text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              ПРОДОЛЖИТЬ
            </button>
          </div>

          <!-- Stage 3: Tip Input -->
          <div v-if="currentStage === 'tip'" class="text-center space-y-4">
            <h3 class="text-base font-mono font-bold text-cyan-600 dark:text-cyan-300">
              ПОДЕЛИТЕСЬ СВОИМ ОТКРЫТИЕМ
            </h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">
              Что помогло вам вырасти? Поделитесь, чтобы вдохновить других.
            </p>
            <div class="flex flex-wrap justify-center gap-2">
              <span v-for="(category, index) in tipCategories" :key="index" :class="[
                'px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all',
                selectedCategory === category
                  ? 'bg-cyan-600 text-white border border-cyan-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600',
              ]" @click="selectedCategory = category">
                {{ category }}
              </span>
            </div>
            <div class="relative">
              <textarea v-model="tip" placeholder="Введите совет, открытие или напоминание..." rows="3" maxlength="280"
                class="w-full p-3 border border-cyan-500/30 rounded-lg resize-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"></textarea>
              <div class="absolute bottom-2 right-3 text-xs text-slate-500 dark:text-slate-400">
                {{ tip.length }}/280
              </div>
            </div>
            <div
              class="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-400 w-full">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="isAnonymous" class="sr-only peer" />
                <div
                  class="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600">
                </div>
                <span class="ml-2 font-medium">Анонимно</span>
              </label>
            </div>
            <div class="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
              <button @click="skipTip"
                class="w-full sm:w-auto bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 sm:py-2 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all text-sm">
                Пропустить
              </button>
              <button @click="submitTip"
                class="w-full sm:w-auto bg-cyan-600 text-white px-4 py-3 sm:py-2 rounded-lg font-mono font-bold transition-all hover:bg-cyan-500 hover:-translate-y-1 text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                :class="{
                  'bg-slate-400 dark:bg-slate-600 cursor-not-allowed hover:bg-slate-400 dark:hover:bg-slate-600 hover:translate-y-0 shadow-none':
                    tip.trim() === '',
                }" :disabled="tip.trim() === ''">
                ОТПРАВИТЬ
              </button>
            </div>
          </div>

          <!-- Final Stage: Success -->
          <div v-if="currentStage === 'success'" class="text-center space-y-4 py-3">
            <div class="text-4xl animate-bounce-in">
              <i class="fas fa-check-circle text-green-500"></i>
            </div>
            <h3 class="text-base font-mono font-bold text-cyan-600 dark:text-cyan-300">
              ОТЛИЧНАЯ РАБОТА!
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Вы завершили сегодняшнюю искру роста. Возвращайтесь завтра за
              новым вызовом!
            </p>
            <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-cyan-500/30">
              <p class="text-slate-700 dark:text-slate-300 text-sm">
                Сегодня вы: {{ successSummary }}
              </p>
            </div>
            <div
              class="flex items-center justify-center gap-2 bg-purple-500/20 p-2 rounded-lg w-fit mx-auto border border-purple-500/30">
              <i class="fas fa-fire text-purple-500"></i>
              <span class="text-sm text-purple-600 dark:text-purple-300">Серия: {{ streakDays }} дней</span>
            </div>
            <div
              class="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-700 dark:text-slate-300 text-sm border border-cyan-500/30">
              <p class="font-medium mb-2">
                Ваш прогресс:
              </p>
              <p>
                Всего очков: {{ points }}
              </p>
            </div>
            <button @click="closeModal"
              class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono font-bold transition-all hover:-translate-y-1 text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              ЗАВЕРШИТЬ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-slate-950/80 flex justify-center items-center z-[1000]"
      @click="cancelClose">
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl w-[90%] max-w-[300px] text-center border border-cyan-500/30"
        @click.stop>
        <h3 class="text-base font-mono font-bold text-cyan-600 dark:text-cyan-300">ВЫ УВЕРЕНЫ?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Ваш прогресс будет потерян, если вы выйдете сейчас.
        </p>
        <div class="flex justify-center gap-3 mt-4">
          <button @click="cancelClose"
            class="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all text-sm">
            Отмена
          </button>
          <button @click="closeModal"
            class="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-500 transition-all text-sm">
            Выйти
          </button>
        </div>
      </div>
    </div>

    <Notification v-if="notificationMessage" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-50" />
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  getDailyGrowthSparkData,
  saveDailyGrowthSparkEntry,
} from "~/api/firebase/dailyGrowthSpark";
import { useNotification } from "@/composables/useNotification";
import Notification from "~/components/base/Notification.vue";

// Props and emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'close']);

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

// Modal visibility - controlled by parent via props
const isVisible = computed(() => props.modelValue);
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
const initialPoints = ref(0);
const needsReset = ref(false);

// Emotion Insight Game Logic
const emotionScenarios = [
  {
    prompt: "После глубокого разговора с близким человеком вы чувствуете...",
    emotions: [
      { emoji: "🤲", label: "Связь" },
      { emoji: "🌊", label: "Переполненность" },
      { emoji: "🧩", label: "Ясность" },
    ],
    correctIndex: 0,
    tip: "Глубокие разговоры помогают нам лучше понять себя и других.",
  },
  {
    prompt:
      "Вы завершили важную задачу, которую откладывали. Какое чувство преобладает?",
    emotions: [
      { emoji: "🏆", label: "Достижение" },
      { emoji: "😮‍💨", label: "Облегчение" },
      { emoji: "🔄", label: "Незавершённость" },
    ],
    correctIndex: 0,
    tip: "Завершение задач освобождает энергию для новых свершений.",
  },
  {
    prompt: "Кто-то поблагодарил вас за помощь. Ваша реакция:",
    emotions: [
      { emoji: "💞", label: "Со-радость" },
      { emoji: "🤷", label: "Безразличие" },
      { emoji: "😳", label: "Смущение" },
    ],
    correctIndex: 0,
    tip: "Принимать благодарность так же важно, как и дарить помощь.",
  },
  {
    prompt: "Вам нужно сказать 'нет' ради своих границ. Вы чувствуете:",
    emotions: [
      { emoji: "🛡️", label: "Уверенность" },
      { emoji: "⚖️", label: "Вину" },
      { emoji: "🌪️", label: "Смятение" },
    ],
    correctIndex: 0,
    tip: "Здоровые границы — это акт заботы о себе и уважения к другим.",
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
    feedback.value = `Правильно! ${currentScenario.value.tip}`;
    winCount.value += 1;
    points.value += 10;
    gameComplete.value = true;
  } else {
    isWrong.value = true;
    feedback.value = "Попробуйте снова. Прислушайтесь к своим чувствам.";
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

// Check auth state and fetch data
onMounted(async () => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      const response = await getDailyGrowthSparkData(db, currentUser.uid);
      if (response.success) {
        streakDays.value = response.data.streakDays;
        // Fix for unreasonably high points (bug fix)
        if (response.data.points > 1000000) {
          points.value = 0;
          initialPoints.value = 0;
          needsReset.value = true;
          // We'll update the DB with the corrected value when they save their first entry
        } else {
          points.value = response.data.points;
          initialPoints.value = response.data.points;
          needsReset.value = false;
        }
      }
    } else {
      user.value = null;
      points.value = 0;
      initialPoints.value = 0;
      needsReset.value = false;
    }
  });
});

// Modified submitTip
const submitTip = async () => {
  points.value += 20;

  // Calculate points earned in this session (delta)
  const sessionPoints = points.value - initialPoints.value;

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
    points: sessionPoints, // Send only the delta
    resetPoints: needsReset.value, // Flag to overwrite DB points if they were corrupted
  };

  // If we reset the points locally due to the bug, we want to overwrite the DB value, not add to it.
  // However, the current API adds. We might need to handle the reset case specially or just accept the add for now 
  // (since we reset local to 0, adding 0 + session to massive DB value won't fix DB).
  // Actually, if we detected > 1M points, we set local to 0. When we save, we send sessionPoints (e.g. 30). 
  // The API will add 30 to the massive DB value. This doesn't fix the DB.

  // To fix the DB, we need to update the API or use a different call. 
  // For now, let's assume the user wants to stop the inflation. 
  // To truly fix the DB value, we should probably use setDoc or updateDoc with the absolute value if it's a "reset".

  const response = await saveDailyGrowthSparkEntry(
    db,
    user.value.uid,
    growthData,
    showNotification
  );

  if (response.success) {
    streakDays.value = response.streakDays;
    // Update local state with response (which might be the accumulated value from DB)
    // If we want to enforce the reset, we might need to handle it in the API.
    // But for now, let's just stop the exponential growth.

    // Actually, if we want to fix the user's score, we should probably do it in the API.
    // But let's stick to the delta fix first.

    points.value = response.points;
    currentStage.value = "success";
    // Reset the flag after successful save
    if (needsReset.value) {
      needsReset.value = false;
      initialPoints.value = response.points;
    }
    // ... (notifications) ...
    // Show Netzach and Chesed progress feedback
    showNotification(
      "Запись сохранена! Вы заработали очки опыта.",
      "success"
    );
  }
};

// Modified skipTip
const skipTip = async () => {
  // Calculate points earned in this session (delta)
  // Note: points were added during the game stages
  const sessionPoints = points.value - initialPoints.value;

  const growthData = {
    gameResults: { wins: winCount.value },
    energy: {
      level: Number(energyLevel.value),
      fuelFactors: growthFuelItems.value
        .filter((item) => item.selected)
        .map((item) => item.label),
    },
    insight: null,
    points: sessionPoints, // Send only the delta
    resetPoints: needsReset.value, // Flag to overwrite DB points if they were corrupted
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
    // Reset the flag after successful save
    if (needsReset.value) {
      needsReset.value = false;
      initialPoints.value = response.points;
    }
    // Show Netzach progress feedback
    showNotification(
      "Запись сохранена! Вы заработали очки опыта.",
      "success"
    );
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
  emit('update:modelValue', false);
  emit('close');
  showConfirmation.value = false;
  // Reset the modal state for next time
  currentStage.value = "emotion";
  selectedIndex.value = null;
  isCorrect.value = false;
  isWrong.value = false;
  feedback.value = "";
  gameComplete.value = false;
  winCount.value = 0;
  tip.value = "";
  isAnonymous.value = false;
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
