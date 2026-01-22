<!-- components/space/brain-training/GamesView.vue -->
<template>
  <div class="games-station transition-colors duration-500">
    <div class="space-y-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Игровой Зал
            </h2>
            <p class="text-slate-600 dark:text-cyan-300/70 text-sm sm:text-base leading-relaxed max-w-2xl">
              Тренируйте логику, память и внимание через увлекательные игровые задачи
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {{ totalGames }}
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Игр
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {{ userLevel }}
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Уровень
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id"
            class="filter-tab" :class="activeCategory === category.id ? 'filter-tab-active' : ''">
            <i :class="category.icon" class="mr-2"></i>
            {{ category.label }}
          </button>
        </div>
      </div>



      <!-- Games Grid -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">
            {{ getCategoryTitle(activeCategory) }}
          </h2>
          <div class="flex items-center gap-3">
            <span class="text-sm text-slate-500 dark:text-slate-400">Сортировка:</span>
            <select v-model="sortBy"
              class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-cyan-500/20 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-white focus:outline-none focus:border-cyan-500/40 cursor-pointer">
              <option value="popular">Популярные</option>
              <option value="new">Новые</option>
              <option value="rating">Рейтинг</option>
              <option value="difficulty">Сложность</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="game in filteredGames" :key="game.id" class="game-card"
            :class="[game.disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer']"
            @click="!game.disabled && playGame(game)">
            <!-- Game Icon -->
            <div class="game-icon-wrapper" :style="{ background: game.gradient }">
              <i :class="game.icon" class="text-white text-3xl"></i>
            </div>

            <!-- Game Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                  {{ t(game.title) }}
                </h3>
                <span class="difficulty-badge" :class="getDifficultyClass(game.difficulty)">
                  {{ game.difficulty }}
                </span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                {{ game.description }}
              </p>

              <!-- Game Stats -->
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-3">
                  <span class="text-slate-500 dark:text-slate-400">
                    <i class="fas fa-gamepad mr-1 text-cyan-600 dark:text-cyan-400"></i>
                    {{ game.plays }}
                  </span>
                  <span class="text-slate-500 dark:text-slate-400">
                    <i class="fas fa-star mr-1 text-yellow-500 dark:text-yellow-400"></i>
                    {{ game.rating }}
                  </span>
                </div>
                <span class="text-cyan-600 dark:text-cyan-400 font-medium">{{
                  game.duration
                }}</span>
              </div>

              <!-- Progress Bar (if user played) -->
              <div v-if="game.progress > 0" class="mt-4">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-slate-500 dark:text-slate-400">Прогресс</span>
                  <span class="text-cyan-600 dark:text-cyan-400 font-medium">{{ game.progress }}%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                  <div
                    class="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                    :style="{ width: `${game.progress}%` }"></div>
                </div>
              </div>
            </div>

            <!-- Hover Effect -->
            <div v-if="!game.disabled" class="card-glow"></div>

            <!-- Coming Soon Overlay -->
            <div v-if="game.disabled"
              class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-20 rounded-2xl">
              <div
                class="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/50 text-slate-300 text-sm font-medium shadow-xl backdrop-blur-md">
                <i class="fas fa-clock mr-2 text-cyan-500"></i>
                Скоро
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Challenges -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <!-- Daily Challenge -->
        <div class="info-card">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <i class="fas fa-calendar-day text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                Ежедневный челлендж
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Обновляется каждый день</p>
            </div>
          </div>
          <div class="space-y-3">
            <div v-for="challenge in dailyChallenges" :key="challenge.id" class="challenge-item">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg" :style="{ background: challenge.gradient }">
                    <div class="w-full h-full flex items-center justify-center">
                      <i :class="challenge.icon" class="text-white text-sm"></i>
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-slate-800 dark:text-white">
                      {{ challenge.title }}
                    </div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">
                      {{ challenge.description }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <i v-if="challenge.completed" class="fas fa-check-circle text-emerald-500 dark:text-emerald-400"></i>
                  <span v-else class="text-cyan-600 dark:text-cyan-400 text-xs font-medium">+{{ challenge.reward }}
                    XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="info-card">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <i class="fas fa-trophy text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Достижения</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ unlockedAchievements }}/{{ totalAchievements }}
                разблокировано
              </p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item" :class="achievement.unlocked
              ? 'achievement-unlocked'
              : 'achievement-locked'
              ">
              <div class="achievement-icon" :class="achievement.unlocked ? '' : 'opacity-30'">
                <i :class="achievement.icon" class="text-2xl"></i>
              </div>
              <div class="text-xs text-center mt-2 font-medium"
                :class="achievement.unlocked ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'">
                {{ achievement.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Section -->
      <div
        class="tips-section p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-lightbulb text-purple-600 dark:text-purple-400 text-xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="text-slate-900 dark:text-white font-semibold mb-2">
              Советы для эффективной тренировки
            </h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-start gap-2">
                <span class="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                <span>Занимайтесь регулярно - даже 10 минут в день приносят
                  результат</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                <span>Чередуйте разные типы игр для комплексного развития</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                <span>Постепенно увеличивайте сложность для лучших
                  результатов</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { t } from "~/utils/translations";

const activeCategory = ref("all");
const sortBy = ref("popular");
const totalGames = ref(24);
const userLevel = ref(7);
const unlockedAchievements = ref(8);
const totalAchievements = ref(15);

const categories = [
  { id: "all", label: "Все игры", icon: "fas fa-th" },
  { id: "memory", label: "Память", icon: "fas fa-brain" },
  { id: "logic", label: "Логика", icon: "fas fa-puzzle-piece" },
  { id: "attention", label: "Внимание", icon: "fas fa-eye" },
  { id: "speed", label: "Скорость", icon: "fas fa-bolt" },
];



const games = [
  {
    id: 1,
    title: "Запомни последовательность",
    description: "Запоминайте порядок появления элементов и воспроизводите их",
    icon: "fas fa-list-ol",
    category: "memory",
    difficulty: "Легкая",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    plays: "1.8K",
    rating: "4.6",
    duration: "3-5 мин",
    progress: 65,
    disabled: true,
  },
  {
    id: 2,
    title: "Судоку",
    description: "Классическая головоломка с числами для развития логики",
    icon: "fas fa-th",
    category: "logic",
    difficulty: "Средняя",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    plays: "3.2K",
    rating: "4.9",
    duration: "10-15 мин",
    progress: 0,
    disabled: true,
  },
  {
    id: 3,
    title: "Найди отличия",
    description:
      "Тренируйте внимательность, находя различия между изображениями",
    icon: "fas fa-search",
    category: "attention",
    difficulty: "Легкая",
    gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
    plays: "2.1K",
    rating: "4.5",
    duration: "5-7 мин",
    progress: 45,
    disabled: true,
  },
  {
    id: 4,
    title: "Скоростной счет",
    description: "Решайте математические примеры на скорость",
    icon: "fas fa-calculator",
    category: "speed",
    difficulty: "Средняя",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    plays: "1.5K",
    rating: "4.4",
    duration: "3-5 мин",
    progress: 80,
    disabled: true,
  },
  {
    id: "memory",
    title: "Парные карточки",
    description: "Находите пары одинаковых карточек, тренируя память",
    icon: "fas fa-clone",
    category: "memory",
    difficulty: "Легкая",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
    plays: "2.8K",
    rating: "4.7",
    duration: "5-8 мин",
    progress: 30,
  },
  {
    id: 6,
    title: "Ханойская башня",
    description: "Переместите диски, следуя правилам древней головоломки",
    icon: "fas fa-layer-group",
    category: "logic",
    difficulty: "Сложная",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    plays: "980",
    rating: "4.8",
    duration: "10-20 мин",
    progress: 0,
    disabled: true,
  },
  {
    id: "stroop",
    title: "Цветовой Струп",
    description: "Назовите цвет текста, игнорируя его значение",
    icon: "fas fa-palette",
    category: "attention",
    difficulty: "Средняя",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
    plays: "1.2K",
    rating: "4.3",
    duration: "2-4 мин",
    progress: 55,
  },
  {
    id: 8,
    title: "Быстрая реакция",
    description: "Нажимайте на правильные объекты как можно быстрее",
    icon: "fas fa-hand-pointer",
    category: "speed",
    difficulty: "Легкая",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    plays: "3.5K",
    rating: "4.6",
    duration: "2-3 мин",
    progress: 90,
    disabled: true,
  },
  {
    id: "reaction", // Verified ID from cleanup
    title: "Скоростная реакция",
    description: "Кликните как можно быстрее после сигнала зелёного цвета",
    icon: "fas fa-bolt",
    category: "speed",
    difficulty: "Средняя",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    plays: "1.2K",
    rating: "4.7",
    duration: "2-3 мин",
    progress: 0,
    disabled: false
  },
  {
    id: 9, // Ensuring IDs are unique enough or string based
    title: "Шахматные задачи",
    description:
      "Решайте тактические позиции и развивайте стратегическое мышление",
    icon: "fas fa-chess",
    category: "logic",
    difficulty: "Сложная",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    plays: "1.6K",
    rating: "4.9",
    duration: "15-25 мин",
    progress: 20,
    disabled: true,
  },
];

const dailyChallenges = [
  {
    id: 1,
    title: "Мастер памяти",
    description: "Пройдите 3 игры на память",
    icon: "fas fa-brain",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    reward: 50,
    completed: false,
  },
  {
    id: 2,
    title: "Логический гений",
    description: "Решите 5 логических задач",
    icon: "fas fa-lightbulb",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    reward: 75,
    completed: true,
  },
  {
    id: 3,
    title: "Спринтер",
    description: "Завершите игру за 2 минуты",
    icon: "fas fa-bolt",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    reward: 100,
    completed: false,
  },
];

const achievements = [
  { id: 1, title: "Новичок", icon: "fas fa-seedling", unlocked: true },
  { id: 2, title: "Мастер", icon: "fas fa-star", unlocked: true },
  { id: 3, title: "Гений", icon: "fas fa-brain", unlocked: true },
  { id: 4, title: "Марафон", icon: "fas fa-running", unlocked: true },
  { id: 5, title: "Перфекционист", icon: "fas fa-trophy", unlocked: true },
  { id: 6, title: "Быстрый", icon: "fas fa-bolt", unlocked: true },
  { id: 7, title: "Терпеливый", icon: "fas fa-hourglass", unlocked: true },
  { id: 8, title: "Стратег", icon: "fas fa-chess-knight", unlocked: true },
  { id: 9, title: "Легенда", icon: "fas fa-crown", unlocked: false },
  { id: 10, title: "Коллекционер", icon: "fas fa-gem", unlocked: false },
  { id: 11, title: "Непобедимый", icon: "fas fa-shield-alt", unlocked: false },
  { id: 12, title: "Чемпион", icon: "fas fa-medal", unlocked: false },
];

const filteredGames = computed(() => {
  let filtered = games;

  if (activeCategory.value !== "all") {
    filtered = games.filter((game) => game.category === activeCategory.value);
  }

  // Sort enabled games first (disabled false or undefined)
  filtered = filtered.slice().sort((a, b) => {
    const aDisabled = a.disabled === true ? 1 : 0;
    const bDisabled = b.disabled === true ? 1 : 0;
    return aDisabled - bDisabled;
  });

  return filtered;
});

const getCategoryTitle = (categoryId) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.label : "Все игры";
};

const getDifficultyClass = (difficulty) => {
  const classes = {
    Легкая: "difficulty-easy",
    Средняя: "difficulty-medium",
    Сложная: "difficulty-hard",
  };
  return classes[difficulty] || "difficulty-medium";
};

const playGame = (game) => {
  // Navigate to reaction.vue for the reaction game
  if (game.id === "reaction") {
    navigateTo("/space/brain-training/reaction");
  } else {
    // For other games, use their ID
    navigateTo(`/space/brain-training/${game.id}`);
  }
};
</script>

<style scoped>
.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 shadow-sm dark:shadow-none;
}

.filter-tab {
  @apply px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/30;
}

.filter-tab-active {
  @apply bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/40;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40;
}

.game-preview-card {
  @apply w-full h-64 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none;
}

.preview-icon-wrapper {
  @apply w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center;
}

.game-card {
  @apply relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col shadow-sm dark:shadow-none;
}

.game-card:hover {
  @apply bg-slate-50 dark:bg-slate-900/70 transform -translate-y-1 shadow-lg shadow-cyan-500/10;
}

.card-glow {
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] transition-transform duration-1000 pointer-events-none;
}

.game-card:hover .card-glow {
  @apply translate-x-[100%];
}

.game-icon-wrapper {
  @apply w-16 h-16 rounded-xl flex items-center justify-center mb-4 flex-shrink-0;
}

.difficulty-badge {
  @apply px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0;
}

.difficulty-easy {
  @apply bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20;
}

.difficulty-medium {
  @apply bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20;
}

.difficulty-hard {
  @apply bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20;
}

.info-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 backdrop-blur-sm shadow-sm dark:shadow-none;
}

.challenge-item {
  @apply p-4 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300;
}

.achievement-item {
  @apply p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 transition-all duration-300 cursor-pointer;
}

.achievement-unlocked {
  @apply border-yellow-500/30 bg-yellow-500/5;
}

.achievement-locked {
  @apply opacity-50;
}

.achievement-icon {
  @apply w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-yellow-500 dark:text-yellow-400;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .stat-card {
    @apply px-3 py-2;
  }

  .game-card {
    @apply p-4;
  }

  .info-card {
    @apply p-4;
  }
}
</style>
