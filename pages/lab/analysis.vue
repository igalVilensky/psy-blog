<!-- pages/lab/analysis.vue -->
<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
  >
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
          <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
            Профиль личности
          </h2>
          <div class="text-xs text-slate-500 dark:text-slate-400 font-mono">
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
              class="absolute inset-0 border border-slate-200 dark:border-slate-700/30 rounded-full"
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
              <div class="w-full h-px bg-slate-200 dark:bg-slate-700/50"></div>
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
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400'
                  "
                >
                  {{ trait.name }}
                </div>
                <div class="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  {{ trait.value }}%
                </div>
              </div>
            </div>
          </div>
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
              <td class="px-4 py-3 hidden sm:table-cell">
                <span class="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {{ exercise.category }}
                </span>
              </td>
              <td class="px-4 py-3 text-center font-mono">
                <span :class="getScoreColor(exercise.avgScore)">{{ exercise.avgScore }}%</span>
              </td>
              <td class="px-4 py-3 text-right hidden sm:table-cell font-mono text-xs">
                {{ exercise.lastPlayed }}
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
             <div class="grid grid-cols-3 gap-4 mb-8">
                <div class="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg text-center">
                   <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Ср. Оценка</div>
                   <div class="text-xl font-bold text-slate-900 dark:text-white font-mono">{{ selectedExercise.avgScore }}%</div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg text-center">
                   <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Сессий</div>
                   <div class="text-xl font-bold text-slate-900 dark:text-white font-mono">{{ selectedExercise.totalSessions }}</div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg text-center">
                   <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Рекорд</div>
                   <div class="text-xl font-bold text-slate-900 dark:text-white font-mono">{{ selectedExercise.bestScore }}%</div>
                </div>
             </div>

             <h4 class="font-bold text-slate-900 dark:text-white mb-4">История активностей</h4>
             <div class="space-y-3">
                 <div 
                   v-for="(session, idx) in selectedExercise.history" 
                   :key="idx"
                   class="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                 >
                    <div class="flex items-center space-x-3">
                       <span class="text-xs font-mono text-slate-400">{{ idx + 1 }}</span>
                       <span class="text-sm text-slate-600 dark:text-slate-300">
                          {{ new Date(session.timestamp.seconds * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) }}
                       </span>
                    </div>
                    <div class="flex items-center space-x-4">
                       <div class="text-xs text-slate-500">
                          {{ (session.avgReactionTime || 0).toFixed(0) }} мс
                       </div>
                       <div class="font-bold font-mono" :class="getScoreColor((session.score / 10) * 100)">
                          {{ (session.score / 10) * 100 }}%
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
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
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
        history: patternResults.value // Pass full history for details view
    };

    if (patternResults.value.length > 0) {
        const scores = patternResults.value.map(r => (r.score / 10) * 100);
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const best = Math.max(...scores);
        const last = new Date(patternResults.value[0].timestamp.seconds * 1000).toLocaleDateString("ru-RU");

        patternEntry = { ...patternEntry, avgScore: avg, bestScore: best, lastPlayed: last, totalSessions: scores.length };
    }

    // Combine with mocks (sorted by last played naturally if we had dates, here just unshift active one)
    const list = [patternEntry, ...mockExercises];
    
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

const getTraitLabelPosition = (index) => {
  const angle = (360 / personalityTraits.length) * index - 90; // -90 to start from top
  const radius = 42; // Distance from center in percentage (must be < 50)
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

  return {
    left: `${x}%`,
    top: `${y}%`,
  };
};

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
    // Determine unique days with activity
    const days = new Set(patternResults.value.map(r => {
        if (!r.timestamp) return null;
        return new Date(r.timestamp.seconds * 1000).toDateString();
    }));
    return days.size; // Simplified "streak" as "active days count" for MVP
}

function processHeatmapData(results) {
    // Fill the grid based on results
    // We Map results to the 52x7 grid.
    // Week 52 = Current Week
    const map = {};
    const now = new Date();
    
    results.forEach(res => {
        if (!res.timestamp) return;
        const date = new Date(res.timestamp.seconds * 1000);
        
        // Calculate weeks diff
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const weeksAgo = Math.floor(diffDays / 7);
        
        if (weeksAgo < 52) {
             const weekIdx = 52 - weeksAgo; // 52 is rightmost
             const dayIdx = date.getDay() === 0 ? 7 : date.getDay(); // 1-7 (Mon-Sun)
             
             // Setup intensity color
             const intensity = res.score > 8 ? 5 : res.score > 5 ? 3 : 1;
             const colors = [
                "bg-emerald-500/20",
                "bg-emerald-500/40",
                "bg-emerald-500/60",
                "bg-emerald-500/80",
                "bg-emerald-500"
             ];
             map[`${weekIdx}-${dayIdx}`] = colors[intensity - 1] || "bg-emerald-500/20";
        }
    });
    heatmapData.value = map;
}

// Fetch Data
async function fetchStats() {
    if (!authStore.user) return;
    
    try {
        const q = query(
            collection($firestore, `users/${authStore.user.uid}/patternDetectionResults`),
            orderBy("timestamp", "desc")
        );
        
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => doc.data());
        
        patternResults.value = results;
        processHeatmapData(results);
        
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
