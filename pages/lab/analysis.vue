<!-- pages/lab/analysis.vue -->
<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-container">
        <div class="loading-spinner-wrapper">
          <div class="spinner-ring spinner-ring-1"></div>
          <div class="spinner-ring spinner-ring-2"></div>
          <div class="spinner-ring spinner-ring-3"></div>
          <div class="spinner-core">
            <i class="fas fa-chart-line text-3xl text-cyan-600 dark:text-cyan-400"></i>
          </div>
        </div>
        <div class="loading-text">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Загрузка анализа</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">Подготовка данных...</p>
        </div>
        <div class="loading-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <Breadcrumbs />
    <!-- Page Header -->
    <div class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight"
          >
            Обсерватория Роста
          </h1>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            Визуализация прогресса и аналитика личностного развития
          </p>
        </div>
        <div class="flex items-center space-x-3 mb-4 sm:mb-0">
          <select
            v-model="selectedPeriod"
            class="px-4 py-2 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
          >
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="quarter">Квартал</option>
            <option value="year">Год</option>
          </select>
          <button
            class="px-4 py-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/40 text-sm font-medium hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 transition-all flex items-center space-x-2"
          >
            <i class="fas fa-download text-xs"></i>
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden group shadow-sm dark:shadow-none"
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
                <i class="fas fa-arrow-trend-up text-emerald-600 dark:text-emerald-400"></i>
              </div>
              <div class="text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                +{{ metrics.growth }}%
              </div>
            </div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ metrics.growthScore }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Индекс роста</div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-5 border border-cyan-500/20 relative overflow-hidden group shadow-sm dark:shadow-none"
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
                <i class="fas fa-bolt text-cyan-600 dark:text-cyan-400"></i>
              </div>
              <div class="text-cyan-600 dark:text-cyan-400 text-xs font-mono">
                {{ metrics.streakDays }}д
              </div>
            </div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ metrics.activityScore }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Активность</div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-5 border border-purple-500/20 relative overflow-hidden group shadow-sm dark:shadow-none"
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
                <i class="fas fa-lightbulb text-purple-600 dark:text-purple-400"></i>
              </div>
              <div class="text-purple-600 dark:text-purple-400 text-xs font-mono">
                +{{ metrics.insightsNew }}
              </div>
            </div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ metrics.totalInsights }}
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Инсайтов</div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-5 border border-amber-500/20 relative overflow-hidden group shadow-sm dark:shadow-none"
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
                <i class="fas fa-check-circle text-amber-600 dark:text-amber-400"></i>
              </div>
              <div class="text-amber-600 dark:text-amber-400 text-xs font-mono">
                {{ metrics.completedTests }}/{{ metrics.totalTests }}
              </div>
            </div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
              {{ metrics.completionRate }}%
            </div>
            <div class="text-slate-500 dark:text-slate-400 text-xs">Завершено</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Progress Over Time -->
      <div class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
            Прогресс со временем
          </h2>
          <button class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
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
              <div class="text-slate-500 dark:text-slate-400 text-xs font-mono">
                {{ bar.label }}
              </div>
              <div
                v-if="hoveredBar === index"
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-cyan-500/50 rounded-lg px-2 py-1 text-xs text-white font-mono whitespace-nowrap z-10"
              >
                {{ bar.value }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Distribution -->
      <div class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
            Распределение по категориям
          </h2>
          <button class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
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
                <span class="text-slate-700 dark:text-white text-sm font-medium">{{
                  category.name
                }}</span>
              </div>
              <span class="text-slate-500 dark:text-slate-400 text-sm font-mono"
                >{{ category.percentage }}%</span
              >
            </div>
            <div
              class="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden"
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
        class="lg:col-span-2 bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none"
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
              Профиль личности (Big Five)
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Основано на результатах теста Big 5
            </p>
          </div>
          <div class="flex items-center gap-3">
            <NuxtLink
              to="/lab/tests/big-5-model"
              class="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors border border-purple-500/20"
            >
              <i class="fas fa-brain mr-1"></i>
              Пройти тест
            </NuxtLink>
            <div class="text-xs text-slate-500 dark:text-slate-400 font-mono">
              ОБНОВЛЕНО: {{ lastUpdated }}
            </div>
          </div>
        </div>
        <div class="relative h-80 flex items-center justify-center">
          <!-- Radar Chart SVG -->
          <svg viewBox="0 0 500 500" class="w-full h-full max-w-md">
            <!-- Background circles -->
            <circle
              v-for="i in 5"
              :key="`circle-${i}`"
              cx="250"
              cy="250"
              :r="i * 40"
              fill="none"
              stroke="currentColor"
              class="stroke-slate-200 dark:stroke-slate-700/30"
              stroke-width="1.5"
            />

            <!-- Radar axes -->
            <line
              v-for="(trait, index) in personalityTraits"
              :key="`axis-${trait.name}`"
              x1="250"
              y1="250"
              :x2="getAxisEndpoint(index).x"
              :y2="getAxisEndpoint(index).y"
              stroke="currentColor"
              class="stroke-slate-200 dark:stroke-slate-700/50"
              stroke-width="1.5"
            />

            <!-- Data polygon -->
            <polygon
              :points="radarPolygonPoints"
              class="fill-cyan-500/20 dark:fill-cyan-400/10 stroke-cyan-500 dark:stroke-cyan-400"
              stroke-width="3"
            />

            <!-- Data points -->
            <circle
              v-for="(point, index) in radarDataPoints"
              :key="`point-${index}`"
              :cx="point.x"
              :cy="point.y"
              :r="hoveredTrait === personalityTraits[index].name ? 8 : 6"
              :fill="getTraitColor(personalityTraits[index].color)"
              class="transition-all duration-300 cursor-pointer"
              @mouseenter="hoveredTrait = personalityTraits[index].name"
              @mouseleave="hoveredTrait = null"
            />

            <!-- Trait labels -->
            <g
              v-for="(trait, index) in personalityTraits"
              :key="`label-${trait.name}`"
            >
              <text
                :x="getLabelPosition(index).x"
                :y="getLabelPosition(index).y"
                text-anchor="middle"
                class="text-sm font-semibold fill-slate-700 dark:fill-slate-300 cursor-pointer select-none"
                @mouseenter="hoveredTrait = trait.name"
                @mouseleave="hoveredTrait = null"
              >
                {{ trait.name }}
              </text>
              <text
                :x="getLabelPosition(index).x"
                :y="getLabelPosition(index).y + 18"
                text-anchor="middle"
                class="text-base font-bold fill-cyan-600 dark:fill-cyan-400 select-none"
              >
                {{ trait.value }}%
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Recent Achievements -->
      <div class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6 font-montserrat">
          Достижения
        </h2>
        <div class="space-y-4">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="p-4 rounded-xl border transition-all duration-300 cursor-pointer group"
            :class="[
              achievement.unlocked
                ? 'bg-white dark:bg-slate-800/50 border-amber-500/30 hover:border-amber-500/50'
                : 'bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700/30 hover:border-slate-300 dark:hover:border-slate-700/50',
            ]"
          >
            <div class="flex items-start space-x-3">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                :class="
                  achievement.unlocked ? achievement.bgClass : 'bg-slate-200 dark:bg-slate-700/50'
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
                    achievement.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'
                  "
                >
                  {{ achievement.name }}
                </h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs mb-2">
                  {{ achievement.description }}
                </p>
                <div
                  v-if="achievement.unlocked"
                  class="text-xs text-amber-600 dark:text-amber-400 font-mono"
                >
                  {{ achievement.date }}
                </div>
                <div v-else class="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  Заблокировано
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Performance Section -->
    <div class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
          Эффективность тренировок
        </h2>
        <div class="flex items-center space-x-2">
           <span class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
             {{ trainingSummary.totalExercises }} упражнений
           </span>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
           <div>
             <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Средняя точность</div>
             <div class="text-2xl font-bold text-slate-900 dark:text-white font-mono">{{ trainingSummary.avgAccuracy }}%</div>
           </div>
           <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
             <i class="fas fa-bullseye text-emerald-500"></i>
           </div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
           <div>
             <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Всего сессий</div>
             <div class="text-2xl font-bold text-slate-900 dark:text-white font-mono">{{ trainingSummary.totalSessions }}</div>
           </div>
           <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
             <i class="fas fa-layer-group text-blue-500"></i>
           </div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
           <div>
             <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Лучший результат</div>
             <div class="text-2xl font-bold text-slate-900 dark:text-white font-mono">{{ trainingSummary.bestScore }}%</div>
           </div>
           <div class="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
             <i class="fas fa-trophy text-amber-500"></i>
           </div>
        </div>
      </div>

      <!-- Compact Exercise List -->
      <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700/50">
        <table class="w-full text-left text-sm text-slate-500 dark:text-slate-400">
          <thead class="bg-slate-50 dark:bg-slate-800/80 text-xs uppercase font-medium text-slate-500 dark:text-slate-400">
            <tr>
              <th scope="col" class="px-4 py-3">Упражнение</th>
              <th scope="col" class="px-4 py-3 hidden sm:table-cell">Категория</th>
              <th scope="col" class="px-4 py-3 text-center">Ср. Оценка</th>
              <th scope="col" class="px-4 py-3 text-right hidden sm:table-cell">Последняя игра</th>
              <th scope="col" class="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-slate-900/20">
            <tr 
              v-for="exercise in exercisesList" 
              :key="exercise.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
              @click="openExerciseDetails(exercise)"
            >
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="exercise.bgClass">
                    <i :class="exercise.icon"></i>
                  </div>
                  <span>{{ exercise.title }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-right">
                <i class="fas fa-chevron-right text-xs"></i>
              </td>
            </tr>
            <tr v-if="exercisesList.length === 0">
              <td colspan="5" class="px-4 py-8 text-center text-slate-500">
                 Нет данных о тренировках
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Activity Heatmap -->
    <div class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
          Тепловая карта активности
        </h2>
        <div class="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Меньше</span>
          <div class="flex space-x-1">
            <div class="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700/50"></div>
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
        class="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"
      >
        <span>52 недели активности</span>
        <span>{{ metrics.totalActiveDays }} активных дней</span>
      </div>
    </div>
    </div>
    <!-- Exercise Details Modal -->
    <div 
      v-if="showExerciseDetails && selectedExercise"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="closeExerciseDetails"
    >
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
         <!-- Header -->
         <div class="p-6 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
            <div class="flex items-center space-x-4">
               <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="selectedExercise.bgClass">
                  <i :class="selectedExercise.icon" class="text-xl"></i>
               </div>
               <div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ selectedExercise.title }}</h3>
                  <div class="text-sm text-slate-500 dark:text-slate-400 capitalize">{{ selectedExercise.category }}</div>
               </div>
            </div>
            <button @click="closeExerciseDetails" class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
               <i class="fas fa-times text-xl"></i>
            </button>
         </div>

         <!-- Scrollable Body -->
         <div class="p-6 overflow-y-auto flex-1">
             <!-- Performance Overview -->
             <div class="mb-6">
                <h4 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Общая производительность</h4>
                <div class="grid grid-cols-3 gap-4">
                   <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800/30">
                      <div class="flex items-center justify-between mb-2">
                         <span class="text-xs font-medium text-purple-700 dark:text-purple-300">Средний балл</span>
                         <i class="fas fa-chart-line text-purple-500"></i>
                      </div>
                      <div class="text-3xl font-bold text-purple-900 dark:text-purple-100 font-mono mb-1">{{ selectedExercise.avgScore }}%</div>
                      <div class="text-xs text-purple-600 dark:text-purple-400">Точность ответов</div>
                   </div>
                   
                   <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                      <div class="flex items-center justify-between mb-2">
                         <span class="text-xs font-medium text-cyan-700 dark:text-cyan-300">Лучший результат</span>
                         <i class="fas fa-trophy text-cyan-500"></i>
                      </div>
                      <div class="text-3xl font-bold text-cyan-900 dark:text-cyan-100 font-mono mb-1">{{ selectedExercise.bestScore }}%</div>
                      <div class="text-xs text-cyan-600 dark:text-cyan-400">Максимальная точность</div>
                   </div>
                   
                   <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                      <div class="flex items-center justify-between mb-2">
                         <span class="text-xs font-medium text-emerald-700 dark:text-emerald-300">Всего сессий</span>
                         <i class="fas fa-layer-group text-emerald-500"></i>
                      </div>
                      <div class="text-3xl font-bold text-emerald-900 dark:text-emerald-100 font-mono mb-1">{{ selectedExercise.totalSessions }}</div>
                      <div class="text-xs text-emerald-600 dark:text-emerald-400">Завершённых попыток</div>
                   </div>
                </div>
             </div>

             <!-- Performance Insight -->
             <div v-if="selectedExercise.avgScore > 0" class="mb-6 p-4 rounded-xl" :class="selectedExercise.avgScore >= 75 ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : selectedExercise.avgScore >= 50 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'">
                <div class="flex items-start gap-3">
                   <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="selectedExercise.avgScore >= 75 ? 'bg-green-500/20' : selectedExercise.avgScore >= 50 ? 'bg-yellow-500/20' : 'bg-orange-500/20'">
                      <i class="fas" :class="selectedExercise.avgScore >= 75 ? 'fa-check-circle text-green-600 dark:text-green-400' : selectedExercise.avgScore >= 50 ? 'fa-info-circle text-yellow-600 dark:text-yellow-400' : 'fa-exclamation-circle text-orange-600 dark:text-orange-400'"></i>
                   </div>
                   <div class="flex-1">
                      <div class="font-semibold mb-1" :class="selectedExercise.avgScore >= 75 ? 'text-green-900 dark:text-green-100' : selectedExercise.avgScore >= 50 ? 'text-yellow-900 dark:text-yellow-100' : 'text-orange-900 dark:text-orange-100'">
                         {{ selectedExercise.avgScore >= 75 ? 'Отличная работа!' : selectedExercise.avgScore >= 50 ? 'Хороший прогресс' : 'Есть куда расти' }}
                      </div>
                      <div class="text-sm" :class="selectedExercise.avgScore >= 75 ? 'text-green-700 dark:text-green-300' : selectedExercise.avgScore >= 50 ? 'text-yellow-700 dark:text-yellow-300' : 'text-orange-700 dark:text-orange-300'">
                         {{ selectedExercise.avgScore >= 75 ? 'Ваша точность выше 75% — продолжайте в том же духе!' : selectedExercise.avgScore >= 50 ? 'Средняя точность 50-75% — регулярная практика улучшит результаты.' : 'Точность ниже 50% — попробуйте начать с более лёгкого уровня.' }}
                      </div>
                   </div>
                </div>
             </div>

             <!-- Session History -->
             <div>
                <div class="flex items-center justify-between mb-4">
                   <h4 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">История тренировок</h4>
                   <span class="text-xs text-slate-400">{{ selectedExercise.totalSessions }} {{ selectedExercise.totalSessions === 1 ? 'сессия' : selectedExercise.totalSessions < 5 ? 'сессии' : 'сессий' }}</span>
                </div>
                
                <div v-if="selectedExercise.history && selectedExercise.history.length > 0" class="space-y-2">
                   <div 
                     v-for="(session, idx) in selectedExercise.history" 
                     :key="idx"
                     class="group relative p-4 rounded-xl border transition-all hover:shadow-md"
                     :class="session.score > 10 ? (session.score >= 75 ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30 hover:border-green-300' : session.score >= 50 ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-slate-300' : 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/30 hover:border-orange-300') : ((session.score / 10) * 100 >= 75 ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30 hover:border-green-300' : (session.score / 10) * 100 >= 50 ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-slate-300' : 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/30 hover:border-orange-300')"
                   >
                      <!-- Session Number Badge -->
                      <div class="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                         {{ idx + 1 }}
                      </div>
                      
                      <div class="flex items-center justify-between">
                         <!-- Date & Time -->
                         <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                               <i class="fas fa-calendar-alt text-slate-400 text-xs"></i>
                               <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  {{ new Date((session.timestamp?.seconds || session.createdAt?.seconds) * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) }}
                               </span>
                               <span class="text-xs text-slate-500">
                                  {{ new Date((session.timestamp?.seconds || session.createdAt?.seconds) * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }}
                               </span>
                            </div>
                            
                            <!-- Metrics Row -->
                            <div class="flex items-center gap-4">
                               <!-- Score -->
                               <div class="flex items-center gap-2">
                                  <i class="fas fa-bullseye text-xs" :class="session.score > 10 ? (session.score >= 75 ? 'text-green-500' : session.score >= 50 ? 'text-slate-500' : 'text-orange-500') : ((session.score / 10) * 100 >= 75 ? 'text-green-500' : (session.score / 10) * 100 >= 50 ? 'text-slate-500' : 'text-orange-500')"></i>
                                  <span class="text-xs text-slate-500 dark:text-slate-400">Точность:</span>
                                  <span class="font-bold font-mono text-sm" :class="getScoreColor(session.score > 10 ? session.score : (session.score / 10) * 100)">
                                     {{ session.score > 10 ? session.score : (session.score / 10) * 100 }}%
                                  </span>
                               </div>
                               
                               <!-- Reaction Time -->
                               <div class="flex items-center gap-2">
                                  <i class="fas fa-clock text-xs text-cyan-500"></i>
                                  <span class="text-xs text-slate-500 dark:text-slate-400">Скорость:</span>
                                  <span class="font-mono text-sm text-slate-700 dark:text-slate-300">
                                     {{ (session.avgReactionTime || session.avgRT || 0).toFixed(0) }} мс
                                  </span>
                               </div>
                            </div>
                         </div>
                         
                         <!-- Performance Badge -->
                         <div class="ml-4">
                            <div class="px-3 py-1 rounded-full text-xs font-semibold" :class="session.score > 10 ? (session.score >= 75 ? 'bg-green-500 text-white' : session.score >= 50 ? 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200' : 'bg-orange-500 text-white') : ((session.score / 10) * 100 >= 75 ? 'bg-green-500 text-white' : (session.score / 10) * 100 >= 50 ? 'bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200' : 'bg-orange-500 text-white')">
                               {{ session.score > 10 ? (session.score >= 75 ? 'Отлично' : session.score >= 50 ? 'Хорошо' : 'Нужна практика') : ((session.score / 10) * 100 >= 75 ? 'Отлично' : (session.score / 10) * 100 >= 50 ? 'Хорошо' : 'Нужна практика') }}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div v-else class="text-center py-8 text-slate-500">
                   <i class="fas fa-inbox text-3xl mb-2 opacity-50"></i>
                   <p>Нет данных о тренировках</p>
                </div>
             </div>
         </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const { $firestore } = useNuxtApp();
const authStore = useAuthStore();
const selectedPeriod = ref("month");
const activeMetric = ref(null);
const hoveredBar = ref(null);
const hoveredCategory = ref(null);
const hoveredTrait = ref(null);

// Real Data State
const patternResults = ref([]);
const mentalShiftResults = ref([]);
const big5Result = ref(null);
const heatmapData = ref({});
const isLoading = ref(true);

// Exercise Stats State
const selectedExercise = ref(null);
const showExerciseDetails = ref(false);

const mockExercises = [
    {
        id: "nback-lite",
        title: "N-Back Lite",
        category: "Память",
        avgScore: 0,
        bestScore: 0,
        lastPlayed: "-",
        totalSessions: 0,
        icon: "fas fa-layer-group text-blue-600 dark:text-blue-400",
        bgClass: "bg-blue-500/10"
    },
    {
        id: "stroop-test",
        title: "Тест Струпа",
        category: "Внимание",
        avgScore: 0,
        bestScore: 0,
        lastPlayed: "-",
        totalSessions: 0,
        icon: "fas fa-font text-purple-600 dark:text-purple-400",
        bgClass: "bg-purple-500/10"
    },
     {
        id: "schulte-table",
        title: "Таблицы Шульте",
        category: "Внимание",
        avgScore: 0,
        bestScore: 0,
        lastPlayed: "-",
        totalSessions: 0,
        icon: "fas fa-table-cells text-emerald-600 dark:text-emerald-400",
        bgClass: "bg-emerald-500/10"
    }
];

// Computed Exercise List (Real + Mock)
const exercisesList = computed(() => {
    // Process Pattern Detection Results
    let patternEntry = {
        id: "pattern-detection-mini",
        title: "Pattern Detection Mini",
        category: "Логика",
        avgScore: 0,
        bestScore: 0,
        lastPlayed: "-",
        totalSessions: 0,
        icon: "fas fa-shapes text-amber-600 dark:text-amber-400",
        bgClass: "bg-amber-500/10",
        history: patternResults.value
    };

    if (patternResults.value.length > 0) {
        const scores = patternResults.value.map(r => (r.score / 10) * 100);
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const best = Math.max(...scores);
        const last = new Date(patternResults.value[0].timestamp.seconds * 1000).toLocaleDateString("ru-RU");

        patternEntry = { ...patternEntry, avgScore: avg, bestScore: best, lastPlayed: last, totalSessions: scores.length };
    }

    // Process Mental Shift Results
    let mentalShiftEntry = {
        id: "mental-shift",
        title: "Mental Shift",
        category: "Ментальная гибкость",
        avgScore: 0,
        bestScore: 0,
        lastPlayed: "-",
        totalSessions: 0,
        icon: "fas fa-brain text-pink-600 dark:text-pink-400",
        bgClass: "bg-pink-500/10",
        history: mentalShiftResults.value
    };

    if (mentalShiftResults.value.length > 0) {
        const scores = mentalShiftResults.value.map(r => r.score || 0);
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const best = Math.max(...scores);
        const last = new Date(mentalShiftResults.value[0].createdAt.seconds * 1000).toLocaleDateString("ru-RU");

        mentalShiftEntry = { ...mentalShiftEntry, avgScore: avg, bestScore: best, lastPlayed: last, totalSessions: scores.length };
    }

    // Combine with mocks
    const list = [patternEntry, mentalShiftEntry, ...mockExercises];
    
    // Sort: active exercises first
    return list.sort((a, b) => b.totalSessions - a.totalSessions); 
});

// Training Summary
const trainingSummary = computed(() => {
    const list = exercisesList.value;
    const active = list.filter(e => e.totalSessions > 0);
    
    const totalSessions = active.reduce((sum, e) => sum + e.totalSessions, 0);
    const avgAccuracy = active.length > 0 
        ? Math.round(active.reduce((sum, e) => sum + e.avgScore, 0) / active.length) 
        : 0;
    const bestScore = active.length > 0 
        ? Math.max(...active.map(e => e.bestScore)) 
        : 0;

    return {
        totalExercises: active.length,
        totalSessions,
        avgAccuracy,
        bestScore
    };
});


// Metrics (Mixed real + mock for now)
const metrics = computed(() => {
    // Real counts
    const totalPatterns = patternResults.value.length;
    const completedTests = totalPatterns; // Add other tests here later
    
    // Mock values for unrelated stats
    return {
        growthScore: 8.7,
        growth: 12.3,
        activityScore: totalPatterns > 0 ? 90 + Math.min(totalPatterns, 10) : 0, 
        streakDays: calculateStreak(),
        totalInsights: 147,
        insightsNew: 23,
        completionRate: 68,
        completedTests: completedTests,
        totalTests: 25,
        totalActiveDays: Object.keys(heatmapData.value).length,
    }
});

const lastUpdated = ref(new Date().toLocaleDateString('ru-RU'));

// Real Progress Data (Mocked for generic chart for now, but could be specific)
const progressData = [
  { label: "Пн", value: 45 },
  { label: "Вт", value: 68 },
  { label: "Ср", value: 82 },
  { label: "Чт", value: 75 },
  { label: "Пт", value: 91 },
  { label: "Сб", value: 88 },
  { label: "Вс", value: 94 },
];

// Categories with Real Data Integration
const categories = computed(() => [
  {
    name: "Эмоциональный интеллект",
    percentage: 85, // Mock
    icon: "fas fa-heart-pulse text-pink-600 dark:text-pink-400",
    bgClass: "bg-pink-500/10",
    barClass: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
  {
    name: "Личность",
    percentage: 72, // Mock 
    // Ideally this would be an aggregate of the Big 5 traits or similar, for now kept as Mock or avg of Big 5?
    icon: "fas fa-brain text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-500/10",
    barClass: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    name: "Когнитивные функции",
    percentage: calculateCognitiveScore(), // Real
    icon: "fas fa-network-wired text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-500/10",
    barClass: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    name: "Ценности",
    percentage: 91, // Mock
    icon: "fas fa-gem text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10",
    barClass: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
  {
    name: "Креативность",
    percentage: 56, // Mock
    icon: "fas fa-lightbulb text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/10",
    barClass: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
]);

const personalityTraits = computed(() => {
    if (!big5Result.value || !big5Result.value.traitScores) {
        // Return zeros if no data to show empty state
        return [
           { name: "Открытость", value: 0, color: "bg-cyan-400" },
           { name: "Добросовестность", value: 0, color: "bg-purple-400" },
           { name: "Экстраверсия", value: 0, color: "bg-pink-400" },
           { name: "Доброжелательность", value: 0, color: "bg-emerald-400" },
           { name: "Нейротизм", value: 0, color: "bg-amber-400" },
        ];
    }

    const { traitScores } = big5Result.value;
    const normalize = (val) => Math.round((val / 120) * 100);

    return [
       { name: "Открытость", value: normalize(traitScores.открытость_опыту), color: "bg-cyan-400" },
       { name: "Добросовестность", value: normalize(traitScores.добросовестность), color: "bg-purple-400" },
       { name: "Экстраверсия", value: normalize(traitScores.экстраверсия), color: "bg-pink-400" },
       { name: "Доброжелательность", value: normalize(traitScores.доброжелательность), color: "bg-emerald-400" },
       { name: "Нейротизм", value: normalize(traitScores.нейротизм), color: "bg-amber-400" }, 
    ];
});

const achievements = [
  {
    id: 1,
    name: "Первооткрыватель",
    description: "Завершён первый эксперимент",
    icon: "fas fa-rocket text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-500/10",
    unlocked: true,
    date: "3 дня назад",
  },
  {
    id: 2,
    name: "Марафонец",
    description: "7 дней подряд активности",
    icon: "fas fa-fire text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/10",
    unlocked: true,
    date: "Сегодня",
  },
  {
    id: 3,
    name: "Аналитик",
    description: "Завершено 10 экспериментов",
    icon: "fas fa-chart-line text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10",
    unlocked: true,
    date: "1 неделю назад",
  },
  {
    id: 4,
    name: "Мастер разума",
    description: "Завершено 50 экспериментов",
    icon: "fas fa-crown text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-500/10",
    unlocked: false,
    date: null,
  },
];

// Methods
const openExerciseDetails = (exercise) => {
    // Only open if there is history or specific details implementation
    if (exercise.history && exercise.history.length > 0) {
        selectedExercise.value = exercise;
        showExerciseDetails.value = true;
    }
};

const closeExerciseDetails = () => {
    showExerciseDetails.value = false;
    selectedExercise.value = null;
};

const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400 font-bold';
    if (score >= 75) return 'text-cyan-600 dark:text-cyan-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-slate-500 dark:text-slate-400';
};

// Convert Tailwind color class to actual color for SVG
const getTraitColor = (colorClass) => {
  const colorMap = {
    'bg-cyan-400': '#22d3ee',
    'bg-purple-400': '#c084fc',
    'bg-pink-400': '#f472b6',
    'bg-emerald-400': '#34d399',
    'bg-amber-400': '#fbbf24',
  };
  return colorMap[colorClass] || '#22d3ee';
};

// Radar chart calculations
const getAxisEndpoint = (index) => {
  const angle = (360 / personalityTraits.value.length) * index - 90;
  const radius = 200; // Max radius in SVG units
  const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
  return { x, y };
};

const getDataPoint = (index, value) => {
  const angle = (360 / personalityTraits.value.length) * index - 90;
  const maxRadius = 200;
  const radius = (value / 100) * maxRadius; // Scale based on percentage
  const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
  return { x, y };
};

const getLabelPosition = (index) => {
  const angle = (360 / personalityTraits.value.length) * index - 90;
  const radius = 220; // Position labels just outside the chart
  const x = 250 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 250 + radius * Math.sin((angle * Math.PI) / 180);
  return { x, y };
};

const radarDataPoints = computed(() => {
  return personalityTraits.value.map((trait, index) => 
    getDataPoint(index, trait.value)
  );
});

const radarPolygonPoints = computed(() => {
  return radarDataPoints.value
    .map(point => `${point.x},${point.y}`)
    .join(' ');
});

const getHeatmapColor = (week, day) => {
    // Generate date for this cell (assuming grid represents last 52 weeks)
    // Simplified: Mapping week/day to a relative activity intensity
    // In a real production app, we would map exact dates to cells.
    // For this prototype, we'll hash the week/day to check against our date set 
    // BUT since we want to show REAL data, let's Map:
    // week 1-52, day 1-7. 
    // Let's assume Week 52 is THIS week.
    
    // Correct approach: Calculate date for this cell
    // This is a bit complex for a simple grid without a date library, 
    // so we will simulate "recent" activity based on our loaded data.
    
    // Better visual hack for now: 
    // Check if we have any activity on "day of year" corresponding to this slot?
    // Let's just use a simple frequency map if we wanted exactness, 
    // but without moment/date-fns it's verbose. 
    
    // Implementation:
    // If we have data, we try to populate the end of the grid (recent weeks).
    const cellId = `${week}-${day}`;
    // Use the `heatmapData` map which keys are "Week-Day" or similar? 
    // No, heatmapData has keys like "2023-10-25".
    // Let's return a default based on props if no complex logic:
    
    if (patternResults.value.length === 0) return "bg-slate-200 dark:bg-slate-700/50";
    
    // Random visual fill based on data presence to show "Life" for now
    // Since mapping 365 rects to exact dates strictly in CSS grid without JS date logic is hard here.
    // We will just use a randomized pattern that is seeded by our data presence.
    if (heatmapData.value[`${week}-${day}`]) {
         return heatmapData.value[`${week}-${day}`];
    }
    
    return "bg-slate-200 dark:bg-slate-700/50";
};

// Calculations
function calculateCognitiveScore() {
    if (patternResults.value.length === 0) return 0;
    
    // Average score of patterns * 10 (since pattern is 0-10)
    const total = patternResults.value.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const maxPossible = patternResults.value.length * 10;
    
    // Return percentage 
    return Math.round((total / maxPossible) * 100) || 0;
}

function calculateStreak() {
    // Combine all exercise results
    const allResults = [...patternResults.value, ...mentalShiftResults.value];
    
    // Determine unique days with activity
    const days = new Set(allResults.map(r => {
        if (!r.timestamp && !r.createdAt) return null;
        const timestamp = r.timestamp || r.createdAt;
        return new Date(timestamp.seconds * 1000).toDateString();
    }).filter(Boolean));
    
    return days.size;
}

function processHeatmapData(allResults) {
    // Fill the grid based on ALL exercise results
    const map = {};
    const now = new Date();
    
    allResults.forEach(res => {
        const timestamp = res.timestamp || res.createdAt;
        if (!timestamp) return;
        
        const date = new Date(timestamp.seconds * 1000);
        
        // Calculate weeks diff
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const weeksAgo = Math.floor(diffDays / 7);
        
        if (weeksAgo < 52) {
             const weekIdx = 52 - weeksAgo;
             const dayIdx = date.getDay() === 0 ? 7 : date.getDay();
             
             // Setup intensity color based on score
             let intensity = 1;
             if (res.score > 10) {
                 // Mental Shift uses 0-100 scale
                 intensity = res.score > 80 ? 5 : res.score > 60 ? 4 : res.score > 40 ? 3 : res.score > 20 ? 2 : 1;
             } else if (res.score !== undefined) {
                 // Pattern Detection uses 0-10 scale
                 intensity = res.score > 8 ? 5 : res.score > 6 ? 4 : res.score > 4 ? 3 : res.score > 2 ? 2 : 1;
             }
             
             const colors = [
                "bg-emerald-500/20",
                "bg-emerald-500/40",
                "bg-emerald-500/60",
                "bg-emerald-500/80",
                "bg-emerald-500"
             ];
             
             // If cell already has data, use the higher intensity
             const cellKey = `${weekIdx}-${dayIdx}`;
             if (map[cellKey]) {
                 const currentIntensity = colors.indexOf(map[cellKey]) + 1;
                 intensity = Math.max(intensity, currentIntensity);
             }
             
             map[cellKey] = colors[intensity - 1] || "bg-emerald-500/20";
        }
    });
    heatmapData.value = map;
}

// Fetch Data
async function fetchStats() {
    if (!authStore.user) return;
    isLoading.value = true;
    
    try {
        // Fetch Pattern Results
        const qPatterns = query(
            collection($firestore, `users/${authStore.user.uid}/patternDetectionResults`),
            orderBy("timestamp", "desc")
        );
        
        const snapshotPatterns = await getDocs(qPatterns);
        const patternsData = snapshotPatterns.docs.map(doc => doc.data());
        patternResults.value = patternsData;

        // Fetch Mental Shift Results
        const qMentalShift = query(
            collection($firestore, `users/${authStore.user.uid}/mentalShiftResults`),
            orderBy("createdAt", "desc")
        );
        
        const snapshotMentalShift = await getDocs(qMentalShift);
        const mentalShiftData = snapshotMentalShift.docs.map(doc => doc.data());
        mentalShiftResults.value = mentalShiftData;

        // Process heatmap with ALL exercise data
        const allResults = [...patternsData, ...mentalShiftData];
        processHeatmapData(allResults);

        // Fetch Big 5 Results
        const qBig5 = query(
            collection($firestore, `users/${authStore.user.uid}/big5Results`),
            orderBy("timestamp", "desc"),
            limit(1)
        );
        const snapshotBig5 = await getDocs(qBig5);
        if (!snapshotBig5.empty) {
            big5Result.value = snapshotBig5.docs[0].data();
        }
        
    } catch (e) {
        console.error("Error fetching stats:", e);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchStats();
});
</script>

<style scoped>
/* Loading Overlay Styles */
.loading-overlay {
  @apply fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm;
}

@media (min-width: 1024px) {
  .loading-overlay {
    margin-left: 280px; /* Offset for lab sidebar on desktop */
  }
}

.loading-container {
  @apply flex flex-col items-center gap-8;
}

.loading-spinner-wrapper {
  @apply relative w-24 h-24;
}

.spinner-ring {
  @apply absolute inset-0 border-4 border-transparent rounded-full;
  animation: spin 3s linear infinite;
}

.spinner-ring-1 {
  @apply border-t-cyan-500;
  animation-duration: 2s;
}

.spinner-ring-2 {
  @apply border-r-cyan-400;
  animation-duration: 2.5s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-cyan-300;
  animation-duration: 3s;
}

.spinner-core {
  @apply absolute inset-0 flex items-center justify-center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

.loading-text {
  @apply text-center;
}

.loading-progress {
  @apply w-64 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-cyan-500 via-cyan-500 to-pink-500 rounded-full;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 75%;
    margin-left: 0%;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}
</style>
