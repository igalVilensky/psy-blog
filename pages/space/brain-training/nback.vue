<template>
  <div
    class="nback-training min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 transition-colors duration-500"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Intro Screen -->
      <div v-if="phase === 'intro'" class="text-center pt-4 sm:pt-8">
        <div class="mb-6 sm:mb-8">
          <div class="inline-block relative">
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center mb-4 sm:mb-6 animate-pulse-slow"
            >
              <i
                class="fas fa-layer-group text-white text-3xl sm:text-4xl lg:text-5xl"
              ></i>
            </div>
            <div
              class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce-slow"
            >
              <i class="fas fa-star text-white text-xs sm:text-sm"></i>
            </div>
          </div>
        </div>

        <h1
          class="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight gradient-text uppercase"
        >
          N-Back Тренировка
        </h1>
        <p
          class="text-slate-600 dark:text-purple-300/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
        >
          Улучшайте свою рабочую память и концентрацию. Выберите уровень сложности и начните тренировку!
        </p>

        <!-- Level Selection -->
        <div class="max-w-xl mx-auto mb-8 sm:mb-12 px-2">
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
            Выберите уровень N:
          </div>
          <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              v-for="n in [1, 2, 3, 4, 5]"
              :key="n"
              @click="nLevel = n"
              class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center"
              :class="nLevel === n 
                ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/30 scale-110' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-500/50'"
            >
              <span class="text-xl sm:text-2xl font-bold">{{ n }}</span>
              <span class="text-[8px] sm:text-[10px] uppercase font-medium">Back</span>
            </button>
          </div>
          <div class="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
            Чем выше N, тем больше элементов нужно удерживать в памяти.
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
        >
          <div class="info-card-small">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-2 sm:mb-3 mx-auto"
            >
              <i class="fas fa-brain text-purple-400 text-lg sm:text-xl"></i>
            </div>
            <div class="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">
              Рабочая память
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Основной фокус</div>
          </div>
          <div class="info-card-small">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-2 sm:mb-3 mx-auto"
            >
              <i class="fas fa-infinity text-cyan-400 text-lg sm:text-xl"></i>
            </div>
            <div class="text-base sm:text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-1">
              Режим практики
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">Без ограничений</div>
          </div>
        </div>

        <button
          @click="phase = 'instructions'"
          class="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
        >
          <i class="fas fa-play mr-2"></i>
          Инструкции
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- Instructions Screen -->
      <div v-if="phase === 'instructions'" class="max-w-2xl mx-auto pt-4">
        <div class="text-center mb-6 sm:mb-8">
          <h2
            class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 gradient-text"
          >
            Как тренироваться?
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Уровень N = {{ nLevel }}-Back
          </p>
        </div>

        <div class="instruction-card mb-6">
           <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed py-4 text-center">
             Нажимайте <span class="text-emerald-500 font-bold">ДА</span> (или SPACE), если текущая буква совпадает с той, что была 
             <strong class="text-purple-600 dark:text-purple-400">{{ nLevel }} {{ nLevel === 1 ? 'шаг' : 'шага' }} назад</strong>.
             Иначе нажимайте <span class="text-red-500 font-bold">НЕТ</span> (или ВЛЕВО).
           </p>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          <button
            @click="phase = 'intro'"
            class="btn-secondary py-3 order-2 sm:order-1"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Назад
          </button>
          <button
            @click="startTraining"
            class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 order-1 sm:order-2"
          >
            Начать тренировку! 🚀
          </button>
        </div>
      </div>

      <!-- Test Screen -->
      <div v-if="phase === 'test'" class="max-w-3xl mx-auto pt-2">
        <!-- Header Stats -->
        <div class="mb-6 sm:mb-8">
          <div
            class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4"
          >
            <div class="stat-box">
              <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Уровень</div>
              <div class="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
                {{ nLevel }}-BACK
              </div>
            </div>
            <div class="stat-box">
              <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Очки</div>
              <div class="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">
                {{ score }}
              </div>
            </div>
            <div class="stat-box">
              <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Комбо</div>
              <div class="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                {{ combo }}x
              </div>
            </div>
            <div class="stat-box">
              <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Прогресс</div>
              <div class="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {{ currentTrial }}/{{ trialsPerSession }}
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div
            class="relative h-1.5 sm:h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
          >
            <div
              class="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300"
              :style="{ width: `${(currentTrial / trialsPerSession) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Main Display Area -->
        <div class="game-area mb-6 sm:mb-8 select-none">
          <!-- Letter Display -->
          <div v-if="!betweenLevels" class="w-full flex justify-center relative perspective-1000">
             <!-- Swipe Hints -->
            <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8 pointer-events-none opacity-20">
               <div class="flex flex-col items-center">
                 <i class="fas fa-arrow-left text-2xl sm:text-3xl mb-1 sm:mb-2"></i>
                 <span class="text-[10px] sm:text-xs font-bold uppercase">НЕТ</span>
               </div>
               <div class="flex flex-col items-center">
                 <i class="fas fa-arrow-right text-2xl sm:text-3xl mb-1 sm:mb-2"></i>
                 <span class="text-[10px] sm:text-xs font-bold uppercase">ДА</span>
               </div>
            </div>

            <div
              class="letter-box-enhanced cursor-grab active:cursor-grabbing"
              :class="{
                'letter-correct': showFeedback && lastCorrect,
                'letter-wrong': showFeedback && !lastCorrect,
                'transition-all duration-300': !isDragging
              }"
              :style="{
                transform: `translateX(${cardOffset}px) rotate(${cardOffset / 10}deg)`,
                opacity: responseGiven ? 0 : 1
              }"
              @mousedown="onDragStart"
              @touchstart="onDragStart"
            >
              {{ currentLetter }}
              
              <!-- Feedback Overlay -->
              <div v-if="showFeedback" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <i v-if="lastCorrect" class="fas fa-check text-emerald-500 text-6xl opacity-50"></i>
                <i v-else class="fas fa-times text-red-500 text-6xl opacity-50"></i>
              </div>
            </div>
          </div>

          <!-- Feedback text underneath -->
          <div v-if="showFeedback && !betweenLevels" class="h-8 flex items-center justify-center mt-4">
             <span
                v-if="lastCorrect"
                class="text-emerald-600 dark:text-emerald-400 text-xl font-bold"
                >✓ Верно! +{{ lastPoints }}</span
              >
              <span v-else class="text-red-600 dark:text-red-400 text-xl font-bold"
                >✗ Ошибка!</span
              >
          </div>
        </div>

        <!-- Match Buttons -->
        <div class="flex justify-center gap-4 mb-6 sm:mb-8">
          <button
            @click="handleResponse(false)"
            class="choice-button choice-no"
            :disabled="betweenLevels || responseGiven"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl sm:text-3xl font-black">НЕТ</span>
              <span class="text-[10px] opacity-70 uppercase mt-1">ArrowLeft</span>
            </div>
          </button>

          <button
            @click="handleResponse(true)"
            class="choice-button choice-yes"
            :disabled="betweenLevels || responseGiven"
            :class="{ 'match-active': matchPressed }"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl sm:text-3xl font-black">ДА</span>
              <span class="text-[10px] opacity-70 uppercase mt-1">SPACE</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-if="phase === 'result'" class="max-w-3xl mx-auto pt-4">
        <div class="text-center mb-8 sm:mb-12">
          <div class="inline-block mb-4 sm:mb-6">
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-cyan-500 flex items-center justify-center"
            >
              <i
                class="fas fa-check-circle text-white text-3xl sm:text-4xl lg:text-5xl"
              ></i>
            </div>
          </div>
          <h2
            class="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 gradient-text"
          >
            Тренировка завершена!
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-lg">
            Ваш результат на уровне {{ nLevel }}-Back
          </p>
        </div>

        <!-- Total Score -->
        <div class="mb-6 sm:mb-8">
          <div class="performance-card text-center">
            <div
              class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2"
            >
              Очки за сессию
            </div>
            <div
              class="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 mb-3 sm:mb-4"
            >
              {{ score }}
            </div>
            <div class="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6">
               <div class="text-center">
                  <div class="text-xs text-slate-500 uppercase">Точность</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ accuracy }}%</div>
               </div>
               <div class="text-center">
                  <div class="text-xs text-slate-500 uppercase">Реакция</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ avgReactionTime }}мс</div>
               </div>
               <div class="text-center">
                  <div class="text-xs text-slate-500 uppercase">Комбо</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white">{{ maxCombo }}x</div>
               </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            @click="restartTraining"
            class="btn-primary px-6 sm:px-8 py-3 text-base sm:text-lg order-1"
          >
            <i class="fas fa-redo mr-2"></i>
            Ещё раз
          </button>
          <NuxtLink
            to="/space/brain-training"
            class="btn-secondary px-6 sm:px-8 py-3 text-base sm:text-lg text-center inline-flex items-center justify-center order-2"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            К списку игр
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

definePageMeta({
  layout: "laboratory",
});

const { $firestore, $userId } = useNuxtApp();

const letters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T",
];

// Game state
const phase = ref("intro"); // intro, instructions, test, result
const nLevel = ref(2); 
const currentTrial = ref(0);
const trialsPerSession = 30;
const sequence = ref([]);
const currentLetter = ref("");
const score = ref(0);
const combo = ref(0);
const maxCombo = ref(0);
const lastPoints = ref(0);
const responseGiven = ref(false);
const matchPressed = ref(false);
const showFeedback = ref(false);
const lastCorrect = ref(false);

// Swipe state
const cardOffset = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const dragThreshold = 100;

const hits = ref(0);
const misses = ref(0);
const falseAlarms = ref(0);
const correctRejections = ref(0);
const targetsCount = ref(0);

// Timing
const letterInterval = ref(null);
const feedbackTimeout = ref(null);
const trialStartTime = ref(0);
const reactionTimes = ref([]);

// Computed
const accuracy = computed(() => {
  if (targetsCount.value === 0) return 0;
  return Math.round((hits.value / targetsCount.value) * 100);
});

const avgReactionTime = computed(() => {
  if (reactionTimes.value.length === 0) return 0;
  const sum = reactionTimes.value.reduce((a, b) => a + b, 0);
  return Math.round(sum / reactionTimes.value.length);
});

// Functions
const generateSequence = (n, length) => {
  const seq = [];
  const targetProbability = 0.3; 

  for (let i = 0; i < n; i++) {
    seq.push(letters[Math.floor(Math.random() * letters.length)]);
  }

  for (let i = n; i < length; i++) {
    if (Math.random() < targetProbability) {
      seq.push(seq[i - n]);
    } else {
      let newLetter;
      do {
        newLetter = letters[Math.floor(Math.random() * letters.length)];
      } while (newLetter === seq[i - n]);
      seq.push(newLetter);
    }
  }
  return seq;
};

const startTraining = () => {
  phase.value = "test";
  score.value = 0;
  combo.value = 0;
  maxCombo.value = 0;
  hits.value = 0;
  misses.value = 0;
  falseAlarms.value = 0;
  correctRejections.value = 0;
  targetsCount.value = 0;
  reactionTimes.value = [];
  currentTrial.value = 0;
  
  sequence.value = generateSequence(nLevel.value, trialsPerSession);
  showNextTrial();
};

const showNextTrial = () => {
  if (currentTrial.value >= trialsPerSession) {
    endTraining();
    return;
  }

  responseGiven.value = false;
  matchPressed.value = false;
  showFeedback.value = false;
  
  currentLetter.value = sequence.value[currentTrial.value];
  trialStartTime.value = Date.now();
  currentTrial.value++;
};

const handleResponse = (pressedMatch) => {
  if (responseGiven.value) return;
  
  responseGiven.value = true;
  
  const rt = Date.now() - trialStartTime.value;
  const isTarget = currentTrial.value > nLevel.value && currentLetter.value === sequence.value[currentTrial.value - 1 - nLevel.value];
  
  if (isTarget) targetsCount.value++;

  if (pressedMatch) {
    matchPressed.value = true;
    if (isTarget) {
      handleSuccess(rt);
    } else {
      handleFailure(false);
    }
  } else {
    if (!isTarget) {
      handleSuccess(rt, true);
    } else {
      handleFailure(true);
    }
  }

  showFeedback.value = true;
  feedbackTimeout.value = setTimeout(() => {
    cardOffset.value = 0;
    showNextTrial();
  }, 600);
};

const handleNoResponse = () => {
  const isTarget = currentTrial.value > nLevel.value && currentLetter.value === sequence.value[currentTrial.value - 1 - nLevel.value];
  if (isTarget) {
    targetsCount.value++;
    handleFailure(true);
  } else {
    handleSuccess(0, true, true);
  }
};

const handleSuccess = (rt, isRejection = false, isSilent = false) => {
  lastCorrect.value = true;
  if (!isRejection) {
    hits.value++;
    reactionTimes.value.push(rt);
    
    const timeBonus = Math.max(0, Math.round((3000 - rt) / 100));
    lastPoints.value = 100 + timeBonus + (combo.value * 10);
    score.value += lastPoints.value;
    combo.value++;
    if (combo.value > maxCombo.value) maxCombo.value = combo.value;
  } else {
    correctRejections.value++;
    if (!isSilent) {
        lastPoints.value = 50;
        score.value += lastPoints.value;
    }
  }
};

const handleFailure = (isMiss) => {
  lastCorrect.value = false;
  combo.value = 0;
  if (isMiss) misses.value++;
  else falseAlarms.value++;
};

const endTraining = () => {
  clearTimeout(letterInterval.value);
  phase.value = "result";
  saveTrainingResults();
};

const saveTrainingResults = async () => {
  const currentUserId = $userId();
  const resultData = {
    timestamp: serverTimestamp(),
    level: nLevel.value,
    score: score.value,
    accuracy: accuracy.value,
    avgReactionTime: avgReactionTime.value,
    maxCombo: maxCombo.value
  };

  if (currentUserId) {
    try {
      await addDoc(collection($firestore, `users/${currentUserId}/nbackTrainingResults`), resultData);
    } catch (e) {
      console.error("Error saving training:", e);
    }
  }
};

const restartTraining = () => {
  phase.value = "intro";
};

// Swipe/Drag Handlers
const onDragStart = (e) => {
  if (phase.value !== "test" || responseGiven.value) return;
  isDragging.value = true;
  startX.value = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
};

const onDragMove = (e) => {
  if (!isDragging.value) return;
  const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  cardOffset.value = currentX - startX.value;
};

const onDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  if (cardOffset.value > dragThreshold) {
    handleResponse(true);
  } else if (cardOffset.value < -dragThreshold) {
    handleResponse(false);
  }
  
  if (!responseGiven.value) {
    cardOffset.value = 0;
  }
};

// Keyboard support
const handleKeydown = (e) => {
  if (phase.value !== "test" || responseGiven.value) return;
  if (e.code === "Space" || e.code === "ArrowRight") {
      e.preventDefault();
      handleResponse(true);
  } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      handleResponse(false);
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchmove", onDragMove, { passive: false });
  window.addEventListener("touchend", onDragEnd);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
  window.removeEventListener("touchmove", onDragMove);
  window.removeEventListener("touchend", onDragEnd);
  if (letterInterval.value) clearTimeout(letterInterval.value);
  if (feedbackTimeout.value) clearTimeout(feedbackTimeout.value);
});
</script>

<style scoped>
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400;
}

.info-card-small {
  @apply p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300;
}

.instruction-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm;
}

.stat-box {
  @apply p-3 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm;
}

.game-area {
  @apply relative aspect-square sm:aspect-video flex items-center justify-center rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden;
}

.letter-box-enhanced {
  @apply relative text-7xl sm:text-9xl font-black text-slate-900 dark:text-white transition-all duration-200 transform scale-100;
}

.choice-button {
  @apply flex-1 max-w-[180px] h-20 sm:h-24 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 shadow-md;
}

.choice-yes {
  @apply bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50;
}

.choice-no {
  @apply bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-300;
}

.performance-card {
  @apply p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg;
}

.btn-primary {
  @apply flex items-center justify-center font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/25;
}

.btn-secondary {
  @apply flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300;
}

.letter-correct {
  @apply text-emerald-500 scale-110;
}

.letter-wrong {
  @apply text-red-500 scale-90;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(0.98); }
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}
</style>
