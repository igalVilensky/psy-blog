<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Howl } from "howler";

definePageMeta({
  layout: "laboratory",
});

// Game configuration
const difficulties = {
  easy: { pairs: 8, cols: 4, previewTime: 3 },
  medium: { pairs: 12, cols: 6, previewTime: 5 },
  hard: { pairs: 16, cols: 6, previewTime: 8 },
};

const difficultyLabels = {
  easy: "Легкая",
  medium: "Средняя",
  hard: "Сложная",
};

const icons = [
  "fas fa-star",
  "fas fa-heart",
  "fas fa-moon",
  "fas fa-sun",
  "fas fa-cloud",
  "fas fa-bolt",
  "fas fa-leaf",
  "fas fa-gem",
  "fas fa-football",
  "fas fa-music",
  "fas fa-palette",
  "fas fa-rocket",
  "fas fa-ghost",
  "fas fa-dragon",
  "fas fa-ice-cream",
  "fas fa-crown",
  "fas fa-anchor",
  "fas fa-bell",
  "fas fa-key",
  "fas fa-flag",
  "fas fa-cat",
  "fas fa-dog",
  "fas fa-fish",
  "fas fa-dove",
  "fas fa-spider",
  "fas fa-horse",
  "fas fa-frog",
  "fas fa-hippo",
  "fas fa-otter",
  "fas fa-crow",
];

// Game state
const difficulty = ref("medium");
const cards = ref([]);
const flippedCards = ref([]);
const matchedCards = ref([]);
const moves = ref(0);
const timer = ref(0);
const gameStarted = ref(false);
const gameCompleted = ref(false);
const showPreview = ref(false);
const previewCountdown = ref(0);
const timerInterval = ref(null);
const soundEnabled = ref(true);

// Load sound preference
onMounted(() => {
  const savedSound = localStorage.getItem("memory_sound_enabled");
  if (savedSound !== null) {
    soundEnabled.value = savedSound === "true";
  }
});

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value;
  localStorage.setItem("memory_sound_enabled", soundEnabled.value);
};

// Sounds
const successSound = new Howl({
  src: ["/sounds/success.mp3"],
  volume: 0.5,
  sprite: {
    match: [3000, 2500],
  },
});

const currentConfig = computed(() => difficulties[difficulty.value]);
const totalPairs = computed(() => currentConfig.value.pairs);
const matches = computed(() => matchedCards.value.length / 2);
const previewTime = computed(() => currentConfig.value.previewTime);

const gridClasses = computed(() => ({
  "grid-cols-4": currentConfig.value.cols === 4,
  "grid-cols-6": currentConfig.value.cols === 6,
  "max-w-2xl": currentConfig.value.cols === 4,
  "max-w-4xl": currentConfig.value.cols === 6,
}));

const efficiency = computed(() => {
  const minMoves = totalPairs.value;
  return Math.max(0, Math.round((minMoves / moves.value) * 100));
});

const getMoveRating = computed(() => {
  const minMoves = totalPairs.value;
  const ratio = moves.value / minMoves;

  if (ratio <= 1.2) return "Идеально!";
  if (ratio <= 1.5) return "Отлично";
  if (ratio <= 2) return "Хорошо";
  return "Можно лучше";
});

const getMoveRatingClass = computed(() => {
  const rating = getMoveRating.value;
  return {
    "text-emerald-600 dark:text-emerald-400": rating === "Идеально!",
    "text-cyan-600 dark:text-cyan-400": rating === "Отлично",
    "text-yellow-600 dark:text-yellow-400": rating === "Хорошо",
    "text-orange-600 dark:text-orange-400": rating === "Можно лучше",
  };
});

const getTimeRating = computed(() => {
  const timePerPair = timer.value / totalPairs.value;

  if (timePerPair <= 3) return "Молниеносно!";
  if (timePerPair <= 5) return "Быстро";
  if (timePerPair <= 8) return "Нормально";
  return "Не спеша";
});

const getTimeRatingClass = computed(() => {
  const rating = getTimeRating.value;
  return {
    "text-emerald-600 dark:text-emerald-400": rating === "Молниеносно!",
    "text-cyan-600 dark:text-cyan-400": rating === "Быстро",
    "text-yellow-600 dark:text-yellow-400": rating === "Нормально",
    "text-orange-600 dark:text-orange-400": rating === "Не спеша",
  };
});

// Game functions
const generateCards = () => {
  const pairs = currentConfig.value.pairs;
  const selectedIcons = icons.slice(0, pairs);
  const cardPairs = [...selectedIcons, ...selectedIcons];

  // Shuffle cards
  const shuffled = cardPairs
    .map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return shuffled;
};

const startGame = () => {
  cards.value = generateCards();
  flippedCards.value = [];
  matchedCards.value = [];
  moves.value = 0;
  timer.value = 0;
  gameCompleted.value = false;
  gameStarted.value = true;
  showPreview.value = true;
  previewCountdown.value = previewTime.value;

  // Show all cards immediately for preview
  cards.value.forEach((card) => {
    card.flipped = true;
  });

  // Preview countdown
  const countdown = setInterval(() => {
    previewCountdown.value--;
    if (previewCountdown.value <= 0) {
      clearInterval(countdown);
      showPreview.value = false;
      startTimer();

      // Flip all cards back with a slight delay so player can see the transition
      setTimeout(() => {
        cards.value.forEach((card) => {
          card.flipped = false;
        });
      }, 300);
    }
  }, 1000);
};

const startTimer = () => {
  if (timerInterval.value) clearInterval(timerInterval.value);
  timerInterval.value = setInterval(() => {
    timer.value++;
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

const flipCard = (card) => {
  if (
    !gameStarted.value ||
    gameCompleted.value ||
    showPreview.value ||
    card.flipped ||
    card.matched ||
    flippedCards.value.length >= 2
  ) {
    return;
  }

  card.flipped = true;
  flippedCards.value.push(card);

  if (flippedCards.value.length === 2) {
    moves.value++;
    checkForMatch();
  }
};

const checkForMatch = () => {
  const [card1, card2] = flippedCards.value;

  if (card1.icon === card2.icon) {
    // Match found
    card1.matched = true;
    card2.matched = true;
    matchedCards.value.push(card1.id, card2.id);

    // Play success sound (skipping first 3 seconds)
    if (soundEnabled.value) {
      successSound.play("match");
    }

    if (matchedCards.value.length === cards.value.length) {
      gameCompleted.value = true;
      stopTimer();
    }

    flippedCards.value = [];
  } else {
    // No match - flip back after delay
    setTimeout(() => {
      card1.flipped = false;
      card2.flipped = false;
      flippedCards.value = [];
    }, 1000);
  }
};

const changeDifficulty = () => {
  const levels = Object.keys(difficulties);
  const currentIndex = levels.indexOf(difficulty.value);
  const nextIndex = (currentIndex + 1) % levels.length;
  difficulty.value = levels[nextIndex];
};

const cardClasses = (card) => ({
  flipped: card.flipped || card.matched,
  matched: card.matched,
  "cursor-not-allowed": card.matched || showPreview.value,
});

const shareResults = () => {
  const text = `🎮 Я нашёл все ${totalPairs.value} пар карточек за ${moves.value} ходов и ${timer.value} секунд в игре "Парные карточки"! Попробуйте побить мой рекорд!`;

  if (navigator.share) {
    navigator.share({
      title: "Парные карточки - MindQ",
      text: text,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("Результаты скопированы в буфер обмена!");
  }
};

onUnmounted(() => {
  stopTimer();
});
</script>

<template>
  <div
    class="memory-station min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="mb-12">
        <div class="text-center mb-8">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mb-4">
            ПАРНЫЕ КАРТОЧКИ
          </h1>
          <p class="text-slate-600 dark:text-cyan-300/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Тренируйте память и внимание, находя пары одинаковых карточек
          </p>
        </div>

        <!-- Game Stats -->
        <div class="flex flex-wrap gap-4 justify-center">
          <div class="stat-card">
            <div class="text-3xl lg:text-4xl font-black text-cyan-600 dark:text-cyan-400">
              {{ moves }}
            </div>
            <div class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ходы
            </div>
          </div>
          <div class="stat-card">
            <div class="text-3xl lg:text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {{ matches }} / {{ totalPairs }}
            </div>
            <div class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Найдено пар
            </div>
          </div>
          <div class="stat-card">
            <div class="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400">
              {{ timer }}s
            </div>
            <div class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Время
            </div>
          </div>
        </div>
      </div>

      <!-- Game Controls -->
      <div class="flex flex-wrap gap-4 justify-center mb-8">
        <button @click="startGame" class="btn-primary" :disabled="gameStarted && !gameCompleted">
          <i class="fas fa-play mr-2"></i>
          {{ gameStarted ? "Перезапуск" : "Начать игру" }}
        </button>
        <button @click="changeDifficulty" class="btn-secondary">
          <i class="fas fa-cog mr-2"></i>
          Сложность: {{ difficultyLabels[difficulty] }}
        </button>
        <button @click="toggleSound" class="btn-secondary" title="Включить/выключить звук">
          <i :class="soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute'" class="mr-2"></i>
          Звук: {{ soundEnabled ? 'Вкл' : 'Выкл' }}
        </button>
      </div>

      <!-- Instructions -->
      <div v-if="!gameStarted" class="text-center max-w-2xl mx-auto mb-12">
        <div class="info-card">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">🎯 Как играть?</h3>
          <ol class="space-y-3 text-slate-600 dark:text-slate-300 text-left list-decimal list-inside">
            <li>Нажмите "Начать игру" чтобы стартовать</li>
            <li>Запомните расположение карточек за {{ previewTime }} секунд</li>
            <li>Находите пары одинаковых символов</li>
            <li>Старайтесь сделать как можно меньше ходов!</li>
          </ol>
        </div>
      </div>

      <!-- Game Board -->

      <div v-if="gameStarted" class="game-board-container relative">
        <!-- Preview Banner (FIXED: No longer covers cards) -->
        <div v-if="showPreview"
          class="preview-banner absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-cyan-600/90 text-white px-6 py-3 rounded-full border border-cyan-400/50 backdrop-blur-sm shadow-lg">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span class="font-semibold">Запоминайте! Осталось: {{ previewCountdown }}с</span>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="cards-grid mx-auto mt-16" :class="gridClasses">
          <div v-for="card in cards" :key="card.id" @click="flipCard(card)"
            class="memory-card cursor-pointer transition-all duration-500 transform" :class="cardClasses(card)">
            <div class="card-inner">
              <!-- Card Front -->
              <div class="card-front">
                <div class="card-pattern"></div>
                <i class="fas fa-brain text-cyan-600/50 dark:text-cyan-400/50 text-2xl"></i>
              </div>

              <!-- Card Back -->
              <div class="card-back">
                <i :class="card.icon" class="text-3xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="gameCompleted" class="mt-12">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-4 gradient-text">
            Поздравляем! 🎉
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-300">
            Вы нашли все пары за {{ moves }} ходов и {{ timer }} секунд!
          </p>
        </div>

        <!-- Performance Stats -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="performance-card">
            <div class="text-4xl font-black text-cyan-600 dark:text-cyan-400 mb-2">
              {{ moves }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Всего ходов</div>
            <div class="mt-2 text-xs" :class="getMoveRatingClass">
              {{ getMoveRating }}
            </div>
          </div>
          <div class="performance-card">
            <div class="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
              {{ timer }}s
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Время</div>
            <div class="mt-2 text-xs" :class="getTimeRatingClass">
              {{ getTimeRating }}
            </div>
          </div>
          <div class="performance-card">
            <div class="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
              {{ efficiency }}%
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Эффективность</div>
            <div class="mt-2 text-xs text-cyan-600 dark:text-cyan-400">Точность</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="startGame" class="btn-primary px-8 py-4 text-lg">
            <i class="fas fa-redo mr-2"></i>
            Играть снова
          </button>
          <button @click="shareResults" class="btn-secondary px-8 py-4 text-lg">
            <i class="fas fa-share mr-2"></i>
            Поделиться
          </button>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-12 info-card">
        <h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <i class="fas fa-lightbulb text-yellow-500 dark:text-yellow-400"></i>
          Советы для улучшения памяти
        </h4>
        <div class="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
          <div class="flex items-start gap-2">
            <span class="text-cyan-600 dark:text-cyan-400 mt-1">•</span>
            <span>Создавайте ассоциации между карточками</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-cyan-600 dark:text-cyan-400 mt-1">•</span>
            <span>Разделяйте поле на секции</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-cyan-600 dark:text-cyan-400 mt-1">•</span>
            <span>Запоминайте группы по 2-3 карточки</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-cyan-600 dark:text-cyan-400 mt-1">•</span>
            <span>Используйте мнемонические техники</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  @apply text-center px-6 py-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 backdrop-blur-sm min-w-[120px] shadow-sm dark:shadow-none;
}

.btn-primary {
  @apply inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100;
}

.btn-secondary {
  @apply inline-flex items-center px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600/50 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 transform hover:scale-105 shadow-sm dark:shadow-none;
}

.info-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 backdrop-blur-sm shadow-sm dark:shadow-none;
}

.performance-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/20 text-center shadow-sm dark:shadow-none;
}

.preview-banner {
  /* Positioned at top, doesn't cover cards */
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
}

.cards-grid {
  @apply grid gap-3 sm:gap-4 mx-auto mt-16;
  /* Added top margin for banner */
}

.memory-card {
  @apply aspect-square rounded-xl cursor-pointer transition-all duration-500;
  perspective: 1000px;
}

.card-inner {
  @apply relative w-full h-full transition-transform duration-500;
  transform-style: preserve-3d;
}

.memory-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  @apply absolute inset-0 rounded-xl flex items-center justify-center;
  backface-visibility: hidden;
}

.card-front {
  @apply bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-cyan-500/30 shadow-sm dark:shadow-none;
  transform: rotateY(0deg);
}

.card-back {
  @apply bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md;
  transform: rotateY(180deg);
}

.card-pattern {
  @apply absolute inset-0 opacity-10;
  background: radial-gradient(circle at 25% 25%, #06b6d4 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, #a855f7 0%, transparent 50%);
}

.memory-card.matched .card-back {
  @apply bg-gradient-to-br from-emerald-400 to-emerald-500 opacity-80;
}

.preview-overlay {
  backdrop-filter: blur(8px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .cards-grid {
    @apply gap-2;
  }

  .memory-card {
    @apply rounded-lg;
  }

  .card-back i {
    @apply text-xl;
  }
}

/* Grid sizes for different difficulties */
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-6 {
  grid-template-columns: repeat(6, 1fr);
}

.max-w-2xl {
  max-width: 42rem;
}

.max-w-4xl {
  max-width: 56rem;
}
</style>
