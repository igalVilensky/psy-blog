<!-- pages/lab/analysis.vue -->
<template>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <div>
          <h1
            class="text-3xl md:text-4xl font-bold text-white font-montserrat mb-2"
          >
            Обсерватория Роста
          </h1>
          <p class="text-slate-400">
            Визуализация прогресса и аналитика личностного развития
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <select
            v-model="selectedPeriod"
            class="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
          >
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="quarter">Квартал</option>
            <option value="year">Год</option>
          </select>
          <button
            class="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-sm font-medium hover:bg-emerald-500/30 transition-all flex items-center space-x-2"
          >
            <i class="fas fa-download text-xs"></i>
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden group"
          @mouseenter="activeMetric = 'growth'"
          @mouseleave="activeMetric = null"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center transition-transform duration-300"
                :class="{ 'scale-110': activeMetric === 'growth' }"
              >
                <i class="fas fa-arrow-trend-up text-emerald-400"></i>
              </div>
              <div class="text-emerald-400 text-xs font-mono">
                +{{ metrics.growth }}%
              </div>
            </div>
            <div class="text-2xl font-bold text-white mb-1 font-mono">
              {{ metrics.growthScore }}
            </div>
            <div class="text-slate-400 text-xs">Индекс роста</div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-5 border border-cyan-500/20 relative overflow-hidden group"
          @mouseenter="activeMetric = 'activity'"
          @mouseleave="activeMetric = null"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center transition-transform duration-300"
                :class="{ 'scale-110': activeMetric === 'activity' }"
              >
                <i class="fas fa-bolt text-cyan-400"></i>
              </div>
              <div class="text-cyan-400 text-xs font-mono">
                {{ metrics.streakDays }}д
              </div>
            </div>
            <div class="text-2xl font-bold text-white mb-1 font-mono">
              {{ metrics.activityScore }}
            </div>
            <div class="text-slate-400 text-xs">Активность</div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-5 border border-purple-500/20 relative overflow-hidden group"
          @mouseenter="activeMetric = 'insights'"
          @mouseleave="activeMetric = null"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center transition-transform duration-300"
                :class="{ 'scale-110': activeMetric === 'insights' }"
              >
                <i class="fas fa-lightbulb text-purple-400"></i>
              </div>
              <div class="text-purple-400 text-xs font-mono">
                +{{ metrics.insightsNew }}
              </div>
            </div>
            <div class="text-2xl font-bold text-white mb-1 font-mono">
              {{ metrics.totalInsights }}
            </div>
            <div class="text-slate-400 text-xs">Инсайтов</div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl p-5 border border-amber-500/20 relative overflow-hidden group"
          @mouseenter="activeMetric = 'completion'"
          @mouseleave="activeMetric = null"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div
                class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center transition-transform duration-300"
                :class="{ 'scale-110': activeMetric === 'completion' }"
              >
                <i class="fas fa-check-circle text-amber-400"></i>
              </div>
              <div class="text-amber-400 text-xs font-mono">
                {{ metrics.completedTests }}/{{ metrics.totalTests }}
              </div>
            </div>
            <div class="text-2xl font-bold text-white mb-1 font-mono">
              {{ metrics.completionRate }}%
            </div>
            <div class="text-slate-400 text-xs">Завершено</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Progress Over Time -->
      <div class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white font-montserrat">
            Прогресс со временем
          </h2>
          <button class="text-slate-400 hover:text-white transition-colors">
            <i class="fas fa-expand text-sm"></i>
          </button>
        </div>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div
            v-for="(bar, index) in progressData"
            :key="index"
            class="flex-1 relative group"
            @mouseenter="hoveredBar = index"
            @mouseleave="hoveredBar = null"
          >
            <div
              class="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg transition-all duration-500 cursor-pointer"
              :style="{ height: `${bar.value}%` }"
              :class="{
                'opacity-100 scale-105': hoveredBar === index,
                'opacity-70': hoveredBar !== null && hoveredBar !== index,
              }"
            ></div>
            <div class="text-center mt-2">
              <div class="text-slate-400 text-xs font-mono">
                {{ bar.label }}
              </div>
              <div
                v-if="hoveredBar === index"
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-cyan-500/50 rounded-lg px-2 py-1 text-xs text-white font-mono whitespace-nowrap"
              >
                {{ bar.value }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Distribution -->
      <div class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white font-montserrat">
            Распределение по категориям
          </h2>
          <button class="text-slate-400 hover:text-white transition-colors">
            <i class="fas fa-expand text-sm"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div
            v-for="category in categories"
            :key="category.name"
            class="group cursor-pointer"
            @mouseenter="hoveredCategory = category.name"
            @mouseleave="hoveredCategory = null"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300"
                  :class="[
                    category.bgClass,
                    hoveredCategory === category.name ? 'scale-110' : '',
                  ]"
                >
                  <i :class="category.icon" class="text-sm"></i>
                </div>
                <span class="text-white text-sm font-medium">{{
                  category.name
                }}</span>
              </div>
              <span class="text-slate-400 text-sm font-mono"
                >{{ category.percentage }}%</span
              >
            </div>
            <div
              class="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden"
            >
              <div
                class="h-full rounded-full transition-all duration-500"
                :class="[
                  category.barClass,
                  hoveredCategory === category.name
                    ? 'opacity-100'
                    : 'opacity-70',
                ]"
                :style="{ width: `${category.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Personality Radar & Recent Achievements -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Personality Radar -->
      <div
        class="lg:col-span-2 bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white font-montserrat">
            Профиль личности
          </h2>
          <div class="text-xs text-slate-400 font-mono">
            ОБНОВЛЕНО: {{ lastUpdated }}
          </div>
        </div>
        <div class="relative h-80 flex items-center justify-center">
          <!-- Radar Chart Simulation -->
          <div class="relative w-72 h-72">
            <!-- Background circles -->
            <div
              v-for="i in 5"
              :key="i"
              class="absolute inset-0 border border-slate-700/30 rounded-full"
              :style="{
                width: `${i * 20}%`,
                height: `${i * 20}%`,
                top: `${50 - i * 10}%`,
                left: `${50 - i * 10}%`,
              }"
            ></div>

            <!-- Radar axes -->
            <div
              v-for="(trait, index) in personalityTraits"
              :key="trait.name"
              class="absolute top-1/2 left-1/2 origin-left"
              :style="{
                transform: `rotate(${
                  (360 / personalityTraits.length) * index
                }deg)`,
                width: '50%',
              }"
            >
              <div class="w-full h-px bg-slate-700/50"></div>
            </div>

            <!-- Trait labels and values -->
            <div
              v-for="(trait, index) in personalityTraits"
              :key="`label-${trait.name}`"
              class="absolute"
              :style="getTraitLabelPosition(index)"
            >
              <div
                class="transform -translate-x-1/2 -translate-y-1/2 text-center group cursor-pointer"
                @mouseenter="hoveredTrait = trait.name"
                @mouseleave="hoveredTrait = null"
              >
                <div
                  class="w-3 h-3 rounded-full mb-2 mx-auto transition-all duration-300"
                  :class="[
                    trait.color,
                    hoveredTrait === trait.name ? 'scale-150' : '',
                  ]"
                ></div>
                <div
                  class="text-xs font-medium transition-colors duration-300"
                  :class="
                    hoveredTrait === trait.name
                      ? 'text-white'
                      : 'text-slate-400'
                  "
                >
                  {{ trait.name }}
                </div>
                <div class="text-xs font-mono text-cyan-400">
                  {{ trait.value }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Achievements -->
      <div class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <h2 class="text-xl font-bold text-white mb-6 font-montserrat">
          Достижения
        </h2>
        <div class="space-y-4">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="p-4 rounded-xl border transition-all duration-300 cursor-pointer group"
            :class="[
              achievement.unlocked
                ? 'bg-slate-800/50 border-amber-500/30 hover:border-amber-500/50'
                : 'bg-slate-800/20 border-slate-700/30 hover:border-slate-700/50',
            ]"
          >
            <div class="flex items-start space-x-3">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                :class="
                  achievement.unlocked ? achievement.bgClass : 'bg-slate-700/50'
                "
              >
                <i
                  :class="achievement.icon"
                  class="text-xl"
                  :style="{ opacity: achievement.unlocked ? 1 : 0.3 }"
                ></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-medium mb-1"
                  :class="
                    achievement.unlocked ? 'text-white' : 'text-slate-500'
                  "
                >
                  {{ achievement.name }}
                </h3>
                <p class="text-slate-400 text-xs mb-2">
                  {{ achievement.description }}
                </p>
                <div
                  v-if="achievement.unlocked"
                  class="text-xs text-amber-400 font-mono"
                >
                  {{ achievement.date }}
                </div>
                <div v-else class="text-xs text-slate-500 font-mono">
                  Заблокировано
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Heatmap -->
    <div class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-white font-montserrat">
          Тепловая карта активности
        </h2>
        <div class="flex items-center space-x-2 text-xs text-slate-400">
          <span>Меньше</span>
          <div class="flex space-x-1">
            <div class="w-3 h-3 rounded bg-slate-700/50"></div>
            <div class="w-3 h-3 rounded bg-emerald-500/20"></div>
            <div class="w-3 h-3 rounded bg-emerald-500/40"></div>
            <div class="w-3 h-3 rounded bg-emerald-500/60"></div>
            <div class="w-3 h-3 rounded bg-emerald-500/80"></div>
            <div class="w-3 h-3 rounded bg-emerald-500"></div>
          </div>
          <span>Больше</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="inline-flex space-x-1">
          <div v-for="week in 52" :key="week" class="flex flex-col space-y-1">
            <div
              v-for="day in 7"
              :key="`${week}-${day}`"
              class="w-3 h-3 rounded cursor-pointer transition-all duration-200 hover:scale-125"
              :class="getHeatmapColor(week, day)"
              :title="`Неделя ${week}, День ${day}`"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="mt-4 flex items-center justify-between text-xs text-slate-400"
      >
        <span>52 недели активности</span>
        <span>{{ metrics.totalActiveDays }} активных дней</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "laboratory",
});

const selectedPeriod = ref("month");
const activeMetric = ref(null);
const hoveredBar = ref(null);
const hoveredCategory = ref(null);
const hoveredTrait = ref(null);

const metrics = {
  growthScore: 8.7,
  growth: 12.3,
  activityScore: 94,
  streakDays: 7,
  totalInsights: 147,
  insightsNew: 23,
  completionRate: 68,
  completedTests: 17,
  totalTests: 25,
  totalActiveDays: 127,
};

const lastUpdated = "06.11.2025";

const progressData = [
  { label: "Пн", value: 45 },
  { label: "Вт", value: 68 },
  { label: "Ср", value: 82 },
  { label: "Чт", value: 75 },
  { label: "Пт", value: 91 },
  { label: "Сб", value: 88 },
  { label: "Вс", value: 94 },
];

const categories = [
  {
    name: "Эмоциональный интеллект",
    percentage: 85,
    icon: "fas fa-heart-pulse text-pink-400",
    bgClass: "bg-pink-500/10",
    barClass: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
  {
    name: "Личность",
    percentage: 72,
    icon: "fas fa-brain text-purple-400",
    bgClass: "bg-purple-500/10",
    barClass: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    name: "Когнитивные функции",
    percentage: 68,
    icon: "fas fa-network-wired text-cyan-400",
    bgClass: "bg-cyan-500/10",
    barClass: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    name: "Ценности",
    percentage: 91,
    icon: "fas fa-gem text-emerald-400",
    bgClass: "bg-emerald-500/10",
    barClass: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
  {
    name: "Креативность",
    percentage: 56,
    icon: "fas fa-lightbulb text-amber-400",
    bgClass: "bg-amber-500/10",
    barClass: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
];

const personalityTraits = [
  { name: "Открытость", value: 78, color: "bg-cyan-400" },
  { name: "Добросовестность", value: 85, color: "bg-purple-400" },
  { name: "Экстраверсия", value: 62, color: "bg-pink-400" },
  { name: "Доброжелательность", value: 91, color: "bg-emerald-400" },
  { name: "Нейротизм", value: 43, color: "bg-amber-400" },
];

const achievements = [
  {
    id: 1,
    name: "Первооткрыватель",
    description: "Завершён первый эксперимент",
    icon: "fas fa-rocket text-cyan-400",
    bgClass: "bg-cyan-500/10",
    unlocked: true,
    date: "3 дня назад",
  },
  {
    id: 2,
    name: "Марафонец",
    description: "7 дней подряд активности",
    icon: "fas fa-fire text-amber-400",
    bgClass: "bg-amber-500/10",
    unlocked: true,
    date: "Сегодня",
  },
  {
    id: 3,
    name: "Аналитик",
    description: "Завершено 10 экспериментов",
    icon: "fas fa-chart-line text-emerald-400",
    bgClass: "bg-emerald-500/10",
    unlocked: true,
    date: "1 неделю назад",
  },
  {
    id: 4,
    name: "Мастер разума",
    description: "Завершено 50 экспериментов",
    icon: "fas fa-crown text-purple-400",
    bgClass: "bg-purple-500/10",
    unlocked: false,
    date: null,
  },
];

const getTraitLabelPosition = (index) => {
  const angle = (360 / personalityTraits.length) * index - 90; // -90 to start from top
  const radius = 160; // Distance from center
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

  return {
    left: `${x}%`,
    top: `${y}%`,
  };
};

const getHeatmapColor = (week, day) => {
  // Simulate activity data
  const activity = Math.floor(Math.random() * 6);
  const colors = [
    "bg-slate-700/50",
    "bg-emerald-500/20",
    "bg-emerald-500/40",
    "bg-emerald-500/60",
    "bg-emerald-500/80",
    "bg-emerald-500",
  ];
  return colors[activity];
};
</script>
