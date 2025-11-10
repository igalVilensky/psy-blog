<!-- pages/lab/psychology/mindfulness.vue -->
<template>
  <div class="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
          <NuxtLink
            to="/lab/psychology"
            class="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
          >
            <i class="fas fa-arrow-left"></i>
          </NuxtLink>
          <div class="flex-1">
            <h1
              class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-montserrat gradient-text"
            >
              ОСОЗНАННОСТЬ И МЕДИТАЦИЯ
            </h1>
            <p class="text-slate-400 mt-2 text-sm md:text-base">
              Практики присутствия, медитативные техники и путь к внутреннему
              спокойствию
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div
            class="stat-card group hover:scale-105 transition-transform duration-300"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl font-bold text-teal-400 font-mono">
                {{ totalSessions }}
              </div>
              <i
                class="fas fa-spa text-teal-400/30 group-hover:text-teal-400/60 transition-colors"
              ></i>
            </div>
            <div class="text-slate-400 text-xs uppercase tracking-wide">
              Всего сессий
            </div>
          </div>

          <div
            class="stat-card group hover:scale-105 transition-transform duration-300"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl font-bold text-purple-400 font-mono">
                {{ totalMinutes }}
              </div>
              <i
                class="fas fa-clock text-purple-400/30 group-hover:text-purple-400/60 transition-colors"
              ></i>
            </div>
            <div class="text-slate-400 text-xs uppercase tracking-wide">
              Минут практики
            </div>
          </div>

          <div
            class="stat-card group hover:scale-105 transition-transform duration-300"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl font-bold text-cyan-400 font-mono">
                {{ currentStreak }}
              </div>
              <i
                class="fas fa-fire text-cyan-400/30 group-hover:text-cyan-400/60 transition-colors"
              ></i>
            </div>
            <div class="text-slate-400 text-xs uppercase tracking-wide">
              Дней подряд
            </div>
          </div>

          <div
            class="stat-card group hover:scale-105 transition-transform duration-300"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl font-bold text-emerald-400 font-mono">
                {{ mindfulnessScore }}%
              </div>
              <i
                class="fas fa-heart text-emerald-400/30 group-hover:text-emerald-400/60 transition-colors"
              ></i>
            </div>
            <div class="text-slate-400 text-xs uppercase tracking-wide">
              Осознанность
            </div>
          </div>
        </div>
      </div>

      <!-- Active Session Display -->
      <transition name="slide-fade">
        <div
          v-if="activeSession"
          class="mb-12 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl p-6 md:p-8 border border-teal-500/30"
        >
          <div class="text-center">
            <!-- Session Type -->
            <div class="mb-6">
              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30"
              >
                <i :class="activeSession.icon" class="text-teal-400"></i>
                <span class="text-teal-300 font-medium text-sm">{{
                  activeSession.title
                }}</span>
              </div>
            </div>

            <!-- Timer Display -->
            <div class="mb-8">
              <div
                class="text-7xl md:text-8xl font-bold text-white font-mono mb-4 tracking-wider"
              >
                {{ formatTime(sessionTimeRemaining) }}
              </div>
              <div class="text-slate-400 text-sm">{{ sessionMessage }}</div>
            </div>

            <!-- Progress Circle -->
            <div class="flex justify-center mb-8">
              <div class="relative w-48 h-48">
                <svg class="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="none"
                    class="text-slate-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="none"
                    class="text-teal-400 transition-all duration-1000"
                    :style="{
                      strokeDasharray: `${2 * Math.PI * 88}`,
                      strokeDashoffset: `${
                        2 * Math.PI * 88 * (1 - sessionProgress)
                      }`,
                    }"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white">
                      {{ Math.round(sessionProgress * 100) }}%
                    </div>
                    <div class="text-xs text-slate-400">завершено</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Control Buttons -->
            <div class="flex flex-wrap justify-center gap-3">
              <button
                v-if="!isSessionPaused"
                @click="pauseSession"
                class="px-6 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 transition-all duration-300 flex items-center gap-2"
              >
                <i class="fas fa-pause"></i>
                <span>Пауза</span>
              </button>
              <button
                v-else
                @click="resumeSession"
                class="px-6 py-3 rounded-xl bg-teal-500 border border-teal-400 text-white hover:bg-teal-600 transition-all duration-300 flex items-center gap-2"
              >
                <i class="fas fa-play"></i>
                <span>Продолжить</span>
              </button>
              <button
                @click="endSession"
                class="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
              >
                <i class="fas fa-stop"></i>
                <span>Завершить</span>
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Meditation Techniques Grid -->
      <div v-if="!activeSession" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-xl md:text-2xl font-bold text-white flex items-center gap-3"
          >
            <span
              class="w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"
            ></span>
            Медитативные практики
          </h2>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <MeditationCard
            v-for="technique in meditationTechniques"
            :key="technique.id"
            :technique="technique"
            @start="startMeditation(technique)"
          />
        </div>
      </div>

      <!-- Breathing Exercises -->
      <div v-if="!activeSession" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-xl md:text-2xl font-bold text-white flex items-center gap-3"
          >
            <span
              class="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"
            ></span>
            Дыхательные упражнения
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <BreathingCard
            v-for="breathing in breathingExercises"
            :key="breathing.id"
            :exercise="breathing"
            @start="startBreathing(breathing)"
          />
        </div>
      </div>

      <!-- Mindfulness Activities -->
      <div v-if="!activeSession" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-xl md:text-2xl font-bold text-white flex items-center gap-3"
          >
            <span
              class="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
            ></span>
            Практики осознанности
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MindfulnessActivityCard
            v-for="activity in mindfulnessActivities"
            :key="activity.id"
            :activity="activity"
            @start="startActivity(activity)"
          />
        </div>
      </div>

      <!-- Progress Tracking -->
      <div
        v-if="!activeSession"
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
      >
        <!-- Weekly Progress -->
        <div class="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <i class="fas fa-chart-line text-teal-400"></i>
            Прогресс за неделю
          </h3>

          <div class="space-y-3 mb-6">
            <div
              v-for="day in weeklyProgress"
              :key="day.day"
              class="flex items-center gap-4"
            >
              <div class="w-16 text-slate-400 text-sm">{{ day.day }}</div>
              <div
                class="flex-1 h-8 bg-slate-900/50 rounded-lg overflow-hidden relative"
              >
                <div
                  class="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
                  :style="{ width: `${(day.minutes / 60) * 100}%` }"
                ></div>
                <div
                  class="absolute inset-0 flex items-center justify-end px-3"
                >
                  <span class="text-xs font-mono text-white"
                    >{{ day.minutes }} мин</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="bg-teal-500/10 rounded-xl p-4 border border-teal-500/20">
            <div class="flex items-center justify-between">
              <span class="text-slate-300 text-sm">Среднее время в день</span>
              <span class="text-teal-400 font-bold"
                >{{ averageDaily }} мин</span
              >
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <i class="fas fa-trophy text-yellow-400"></i>
            Достижения
          </h3>

          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="achievement in achievements"
              :key="achievement.id"
              class="achievement-card"
              :class="
                achievement.unlocked
                  ? 'achievement-unlocked'
                  : 'achievement-locked'
              "
            >
              <div class="text-3xl mb-2">{{ achievement.icon }}</div>
              <div
                class="text-sm font-semibold mb-1"
                :class="achievement.unlocked ? 'text-white' : 'text-slate-600'"
              >
                {{ achievement.title }}
              </div>
              <div
                class="text-xs"
                :class="
                  achievement.unlocked ? 'text-slate-400' : 'text-slate-700'
                "
              >
                {{ achievement.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources & Tips -->
      <div
        v-if="!activeSession"
        class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 md:p-8 border border-purple-500/20"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center"
              >
                <i class="fas fa-book-open text-purple-400 text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Гид по медитации</h3>
                <p class="text-slate-400 text-sm">Советы для начинающих</p>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="bg-slate-900/30 rounded-lg p-4 border border-purple-500/10"
              >
                <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                  <i class="fas fa-lightbulb text-yellow-400 text-sm"></i>
                  Создайте пространство
                </h4>
                <p class="text-slate-400 text-sm">
                  Найдите тихое место, где вас никто не потревожит. Убедитесь,
                  что вам комфортно.
                </p>
              </div>

              <div
                class="bg-slate-900/30 rounded-lg p-4 border border-purple-500/10"
              >
                <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                  <i class="fas fa-clock text-cyan-400 text-sm"></i>
                  Начните с малого
                </h4>
                <p class="text-slate-400 text-sm">
                  5-10 минут в день достаточно для начала. Регулярность важнее
                  длительности.
                </p>
              </div>

              <div
                class="bg-slate-900/30 rounded-lg p-4 border border-purple-500/10"
              >
                <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                  <i class="fas fa-smile text-emerald-400 text-sm"></i>
                  Будьте терпеливы
                </h4>
                <p class="text-slate-400 text-sm">
                  Отвлечение мыслей — это нормально. Просто мягко возвращайте
                  внимание к практике.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center"
              >
                <i class="fas fa-heart text-teal-400 text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Польза медитации</h3>
                <p class="text-slate-400 text-sm">Научно доказанные эффекты</p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3">
              <div
                class="flex items-start gap-3 bg-slate-900/30 rounded-lg p-4 border border-teal-500/10"
              >
                <i class="fas fa-brain text-teal-400 mt-1"></i>
                <div>
                  <h4 class="text-white font-medium text-sm mb-1">
                    Улучшение концентрации
                  </h4>
                  <p class="text-slate-400 text-xs">
                    Усиление способности фокусироваться на задачах
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 bg-slate-900/30 rounded-lg p-4 border border-teal-500/10"
              >
                <i class="fas fa-shield-alt text-cyan-400 mt-1"></i>
                <div>
                  <h4 class="text-white font-medium text-sm mb-1">
                    Снижение стресса
                  </h4>
                  <p class="text-slate-400 text-xs">
                    Уменьшение уровня кортизола и тревожности
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 bg-slate-900/30 rounded-lg p-4 border border-teal-500/10"
              >
                <i class="fas fa-bed text-purple-400 mt-1"></i>
                <div>
                  <h4 class="text-white font-medium text-sm mb-1">
                    Лучший сон
                  </h4>
                  <p class="text-slate-400 text-xs">
                    Улучшение качества и глубины сна
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 bg-slate-900/30 rounded-lg p-4 border border-teal-500/10"
              >
                <i class="fas fa-smile-beam text-yellow-400 mt-1"></i>
                <div>
                  <h4 class="text-white font-medium text-sm mb-1">
                    Эмоциональное здоровье
                  </h4>
                  <p class="text-slate-400 text-xs">
                    Повышение позитивных эмоций и самооценки
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MeditationCard from "~/components/lab/psychology/MeditationCard.vue";
import BreathingCard from "~/components/lab/psychology/BreathingCard.vue";
import MindfulnessActivityCard from "~/components/lab/psychology/MindfulnessActivityCard.vue";

definePageMeta({
  layout: "laboratory",
});

// Session state
const activeSession = ref(null);
const sessionTimeRemaining = ref(0);
const sessionTotalTime = ref(0);
const isSessionPaused = ref(false);
const sessionMessage = ref("");
let sessionInterval = null;

// Stats
const totalSessions = ref(47);
const totalMinutes = ref(523);
const currentStreak = ref(7);
const mindfulnessScore = ref(78);

// Progress
const weeklyProgress = ref([
  { day: "Пн", minutes: 15 },
  { day: "Вт", minutes: 20 },
  { day: "Ср", minutes: 10 },
  { day: "Чт", minutes: 25 },
  { day: "Пт", minutes: 15 },
  { day: "Сб", minutes: 30 },
  { day: "Вс", minutes: 20 },
]);

const averageDaily = computed(() => {
  const total = weeklyProgress.value.reduce((sum, day) => sum + day.minutes, 0);
  return Math.round(total / 7);
});

const sessionProgress = computed(() => {
  if (sessionTotalTime.value === 0) return 0;
  return 1 - sessionTimeRemaining.value / sessionTotalTime.value;
});

// Meditation techniques
const meditationTechniques = [
  {
    id: "mindful-breathing",
    title: "Осознанное дыхание",
    description: "Фокус на естественном ритме дыхания для успокоения ума",
    icon: "fas fa-wind",
    duration: [5, 10, 15, 20],
    difficulty: "Начальный",
    color: "from-teal-500 to-cyan-500",
    benefits: ["Снижение стресса", "Улучшение концентрации"],
  },
  {
    id: "body-scan",
    title: "Сканирование тела",
    description: "Последовательное внимание к ощущениям в разных частях тела",
    icon: "fas fa-male",
    duration: [10, 15, 20, 30],
    difficulty: "Начальный",
    color: "from-purple-500 to-pink-500",
    benefits: ["Расслабление", "Телесная осознанность"],
  },
  {
    id: "loving-kindness",
    title: "Медитация любящей доброты",
    description: "Развитие сострадания к себе и другим",
    icon: "fas fa-heart",
    duration: [10, 15, 20],
    difficulty: "Средний",
    color: "from-pink-500 to-rose-500",
    benefits: ["Эмпатия", "Позитивные эмоции"],
  },
  {
    id: "walking-meditation",
    title: "Медитация при ходьбе",
    description: "Осознанное внимание к процессу движения",
    icon: "fas fa-walking",
    duration: [10, 15, 20, 30],
    difficulty: "Начальный",
    color: "from-emerald-500 to-green-500",
    benefits: ["Энергия", "Заземление"],
  },
  {
    id: "visualization",
    title: "Визуализация",
    description: "Создание мысленных образов для релаксации",
    icon: "fas fa-eye",
    duration: [10, 15, 20],
    difficulty: "Средний",
    color: "from-indigo-500 to-purple-500",
    benefits: ["Творчество", "Глубокая релаксация"],
  },
  {
    id: "mantra",
    title: "Мантра-медитация",
    description: "Повторение звука или фразы для фокусировки ума",
    icon: "fas fa-om",
    duration: [10, 15, 20, 30],
    difficulty: "Средний",
    color: "from-orange-500 to-amber-500",
    benefits: ["Ментальная ясность", "Духовность"],
  },
];

// Breathing exercises
const breathingExercises = [
  {
    id: "box-breathing",
    title: "Квадратное дыхание",
    description: "4-4-4-4: вдох, задержка, выдох, задержка",
    icon: "fas fa-square",
    duration: [3, 5, 10],
    pattern: "Вдох 4с → Задержка 4с → Выдох 4с → Задержка 4с",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "478-breathing",
    title: "Дыхание 4-7-8",
    description: "Техника для быстрого расслабления и засыпания",
    icon: "fas fa-moon",
    duration: [3, 5, 10],
    pattern: "Вдох 4с → Задержка 7с → Выдох 8с",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "alternate-nostril",
    title: "Попеременное дыхание",
    description: "Балансировка энергии через ноздри",
    icon: "fas fa-balance-scale",
    duration: [5, 10, 15],
    pattern: "Левая → Правая → Правая → Левая",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "coherent-breathing",
    title: "Когерентное дыхание",
    description: "5 вдохов в минуту для баланса",
    icon: "fas fa-wave-square",
    duration: [5, 10, 15],
    pattern: "Вдох 6с → Выдох 6с",
    color: "from-purple-500 to-pink-500",
  },
];

// Mindfulness activities
const mindfulnessActivities = [
  {
    id: "mindful-eating",
    title: "Осознанный приём пищи",
    description: "Полное внимание к вкусу, текстуре и аромату",
    icon: "fas fa-utensils",
    duration: 15,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "mindful-listening",
    title: "Осознанное слушание",
    description: "Глубокое внимание к звукам вокруг",
    icon: "fas fa-headphones",
    duration: 10,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "gratitude-practice",
    title: "Практика благодарности",
    description: "Осознание того, за что вы благодарны",
    icon: "fas fa-heart",
    duration: 10,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "five-senses",
    title: "Упражнение 5 чувств",
    description: "5 вещей видите, 4 слышите, 3 чувствуете...",
    icon: "fas fa-hand-sparkles",
    duration: 5,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "mindful-journaling",
    title: "Осознанное письмо",
    description: "Записывайте мысли и чувства без суждения",
    icon: "fas fa-pen",
    duration: 15,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "nature-connection",
    title: "Связь с природой",
    description: "Осознанное присутствие на свежем воздухе",
    icon: "fas fa-tree",
    duration: 20,
    color: "from-green-500 to-emerald-500",
  },
];

// Achievements
const achievements = ref([
  {
    id: 1,
    title: "Первый шаг",
    description: "1 сессия",
    icon: "🌱",
    unlocked: true,
  },
  {
    id: 2,
    title: "Неделя практики",
    description: "7 дней подряд",
    icon: "🔥",
    unlocked: true,
  },
  {
    id: 3,
    title: "Час тишины",
    description: "60 минут практики",
    icon: "⏱️",
    unlocked: true,
  },
  {
    id: 4,
    title: "Месяц осознанности",
    description: "30 дней",
    icon: "🌙",
    unlocked: false,
  },
  {
    id: 5,
    title: "Мастер медитации",
    description: "100 сессий",
    icon: "🧘",
    unlocked: false,
  },
  {
    id: 6,
    title: "Дзен",
    description: "1000 минут",
    icon: "☯️",
    unlocked: false,
  },
]);

// Methods
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const startMeditation = (technique) => {
  activeSession.value = technique;
  sessionTotalTime.value = technique.duration[1] * 60; // Use middle duration as default
  sessionTimeRemaining.value = sessionTotalTime.value;
  isSessionPaused.value = false;
  sessionMessage.value = "Найдите удобное положение и закройте глаза...";
  startSessionTimer();
};

const startBreathing = (exercise) => {
  activeSession.value = exercise;
  sessionTotalTime.value = exercise.duration[1] * 60;
  sessionTimeRemaining.value = sessionTotalTime.value;
  isSessionPaused.value = false;
  sessionMessage.value = `Следуйте паттерну: ${exercise.pattern}`;
  startSessionTimer();
};

const startActivity = (activity) => {
  activeSession.value = activity;
  sessionTotalTime.value = activity.duration * 60;
  sessionTimeRemaining.value = sessionTotalTime.value;
  isSessionPaused.value = false;
  sessionMessage.value = "Сосредоточьтесь на настоящем моменте...";
  startSessionTimer();
};

const startSessionTimer = () => {
  if (sessionInterval) clearInterval(sessionInterval);

  sessionInterval = setInterval(() => {
    if (!isSessionPaused.value && sessionTimeRemaining.value > 0) {
      sessionTimeRemaining.value--;

      // Update message based on progress
      const progress = sessionProgress.value;
      if (progress < 0.25) {
        sessionMessage.value = "Настройтесь на практику...";
      } else if (progress < 0.5) {
        sessionMessage.value = "Углубляйте концентрацию...";
      } else if (progress < 0.75) {
        sessionMessage.value = "Оставайтесь в моменте...";
      } else if (progress < 0.95) {
        sessionMessage.value = "Скоро завершение...";
      }

      if (sessionTimeRemaining.value === 0) {
        completeSession();
      }
    }
  }, 1000);
};

const pauseSession = () => {
  isSessionPaused.value = true;
  sessionMessage.value = "Практика приостановлена";
};

const resumeSession = () => {
  isSessionPaused.value = false;
  sessionMessage.value = "Продолжаем практику...";
};

const endSession = () => {
  if (sessionInterval) clearInterval(sessionInterval);

  const completedTime = Math.floor(
    (sessionTotalTime.value - sessionTimeRemaining.value) / 60
  );
  if (completedTime > 0) {
    totalSessions.value++;
    totalMinutes.value += completedTime;
  }

  activeSession.value = null;
  sessionTimeRemaining.value = 0;
  sessionTotalTime.value = 0;
  isSessionPaused.value = false;
};

const completeSession = () => {
  if (sessionInterval) clearInterval(sessionInterval);

  const completedTime = Math.floor(sessionTotalTime.value / 60);
  totalSessions.value++;
  totalMinutes.value += completedTime;
  mindfulnessScore.value = Math.min(mindfulnessScore.value + 1, 100);

  sessionMessage.value = "🎉 Практика завершена! Отличная работа!";

  setTimeout(() => {
    activeSession.value = null;
    sessionTimeRemaining.value = 0;
    sessionTotalTime.value = 0;
  }, 3000);
};

onUnmounted(() => {
  if (sessionInterval) clearInterval(sessionInterval);
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  @apply bg-slate-800/30 rounded-xl p-4 border border-slate-700/50;
}

.achievement-card {
  @apply bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 text-center transition-all duration-300;
}

.achievement-unlocked {
  @apply border-yellow-500/30 bg-yellow-500/5 hover:scale-105;
}

.achievement-locked {
  @apply opacity-50 grayscale;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
