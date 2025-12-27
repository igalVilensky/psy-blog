<!-- pages/space/dashboard.vue -->
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative">
    <!-- LOADING_STATE_PLACEHOLDER -->
    <div v-if="loading" class="absolute inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <div class="loading-container">
        <div class="loading-spinner-wrapper">
          <div class="spinner-ring spinner-ring-1"></div>
          <div class="spinner-ring spinner-ring-2"></div>
          <div class="spinner-ring spinner-ring-3"></div>
          <div class="spinner-core">
            <i class="fas fa-brain text-3xl text-cyan-600 dark:text-cyan-400"></i>
          </div>
        </div>
        <div class="loading-text">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Загрузка центра управления</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">Синхронизация данных...</p>
        </div>
        <div class="loading-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />

      <!-- Unauthorized State -->
      <DashboardGuestView v-if="!authStore.user" />

      <!-- Dashboard Content (Authorized Only) -->
      <div v-else class="space-y-8">
        <!-- Dashboard Header -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight">
                Центр Управления
              </h1>
              <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Единая панель мониторинга вашего прогресса, состояния и активности
              </p>
            </div>
          </div>
        </div>





        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Progress Over Time -->
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
                Прогресс со временем
              </h2>
            </div>
            <div class="h-64 flex items-end justify-between space-x-2">
              <div v-for="(bar, index) in progressData" :key="index"
                class="flex-1 relative group h-full flex flex-col justify-end" @mouseenter="hoveredBar = index"
                @mouseleave="hoveredBar = null">
                <div
                  class="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg transition-all duration-500 cursor-pointer"
                  :style="{ height: `${bar.value}%` }" :class="{
                    'opacity-100 scale-105': hoveredBar === index,
                    'opacity-70': hoveredBar !== null && hoveredBar !== index,
                  }"></div>
                <div class="text-center mt-2">
                  <div class="text-slate-500 dark:text-slate-400 text-xs font-mono">
                    {{ bar.label }}
                  </div>
                  <div v-if="hoveredBar === index"
                    class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-cyan-500/50 rounded-lg px-2 py-1 text-xs text-white font-mono whitespace-nowrap z-10 shadow-lg">
                    {{ bar.absoluteValue }} {{ bar.absoluteValue === 1 ? 'действие' : (bar.absoluteValue > 1 &&
                      bar.absoluteValue < 5 ? 'действия' : 'действий') }} </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Category Distribution -->
            <div
              class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
                  Распределение по категориям
                </h2>

              </div>
              <div class="space-y-4">
                <div v-for="category in categories" :key="category.name" class="group cursor-pointer"
                  @mouseenter="hoveredCategory = category.name" @mouseleave="hoveredCategory = null">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300"
                        :class="[
                          category.bgClass,
                          hoveredCategory === category.name ? 'scale-110' : '',
                        ]">
                        <i :class="category.icon" class="text-sm"></i>
                      </div>
                      <span class="text-slate-700 dark:text-white text-sm font-medium">{{
                        category.name
                      }}</span>
                    </div>
                    <span class="text-slate-500 dark:text-slate-400 text-sm font-mono">{{ category.percentage }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" :class="[
                      category.barClass,
                      hoveredCategory === category.name
                        ? 'opacity-100'
                        : 'opacity-70',
                    ]" :style="{ width: `${category.percentage}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Training Performance Section (Moved) -->
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none mb-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
                Эффективность тренировок
              </h2>
              <div class="flex items-center space-x-2">
                <span
                  class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                  {{ trainingSummary.totalExercises }} упражнений
                </span>
              </div>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Средняя точность</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white font-mono">{{
                    trainingSummary.avgAccuracy
                  }}%</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <i class="fas fa-bullseye text-emerald-500"></i>
                </div>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Всего сессий</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white font-mono">{{
                    trainingSummary.totalSessions }}</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <i class="fas fa-layer-group text-blue-500"></i>
                </div>
              </div>
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Лучший результат</div>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white font-mono">{{ trainingSummary.bestScore
                  }}%</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <i class="fas fa-trophy text-amber-500"></i>
                </div>
              </div>
            </div>

            <!-- Compact Exercise List -->
            <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-left text-sm text-slate-500 dark:text-slate-400">
                <thead
                  class="bg-slate-50 dark:bg-slate-800/80 text-xs uppercase font-medium text-slate-500 dark:text-slate-400">
                  <tr>
                    <th scope="col" class="px-4 py-3">Упражнение</th>
                    <th scope="col" class="px-4 py-3 hidden sm:table-cell">Категория</th>
                    <th scope="col" class="px-4 py-3 text-center">Ср. Оценка</th>
                    <th scope="col" class="px-4 py-3 text-right hidden sm:table-cell">Последняя игра</th>
                    <th scope="col" class="px-4 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-slate-900/20">
                  <tr v-for="exercise in exercisesList" :key="exercise.id"
                    class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                    @click="openExerciseDetails(exercise)">
                    <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="exercise.bgClass">
                          <i :class="exercise.icon"></i>
                        </div>
                        <span>{{ exercise.title }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 hidden sm:table-cell">
                      <span class="text-slate-600 dark:text-slate-400">{{ exercise.category }}</span>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <span class="font-mono font-medium text-slate-900 dark:text-white">{{ exercise.avgScore }}{{ exercise.unit }}</span>
                    </td>
                    <td class="px-4 py-3 text-right hidden sm:table-cell">
                      <span class="text-slate-600 dark:text-slate-400">{{ exercise.lastPlayed }}</span>
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

          <!-- Quick Stats (Restored) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <!-- Cognitive Scan Card (Emotion) -->
            <div
              class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 group relative overflow-hidden shadow-sm dark:shadow-none"
              @mouseenter="activeCard = 'cognitive'" @mouseleave="activeCard = null">
              <div
                class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                  <div class="text-cyan-600 dark:text-cyan-400/70 text-xs font-mono tracking-wider">
                    ЭМОЦИОНАЛЬНЫЙ АНАЛИЗ
                  </div>
                  <div
                    class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center transition-transform duration-300"
                    :class="{ 'scale-110': activeCard === 'cognitive' }">
                    <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 text-lg"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
                    {{ animatedStats.emotionEntries }}
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">Записей в барометре</div>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                    :style="{
                      width: `${Math.min(
                        100,
                        (animatedStats.emotionEntries / 10) * 100
                      )}%`,
                    }"></div>
                </div>
              </div>
            </div>

            <!-- Active Tests Card (Archetypes) -->
            <div
              class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden shadow-sm dark:shadow-none"
              @mouseenter="activeCard = 'tests'" @mouseleave="activeCard = null">
              <div
                class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                  <div class="text-purple-600 dark:text-purple-400/70 text-xs font-mono tracking-wider">
                    АРХЕТИПЫ
                  </div>
                  <div
                    class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center transition-transform duration-300"
                    :class="{ 'scale-110': activeCard === 'tests' }">
                    <i class="fas fa-vial text-purple-600 dark:text-purple-400 text-lg"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
                    {{ archetypeScores.length }}
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">
                    Проанализированных архетипов
                  </div>
                </div>
                <div class="flex space-x-1">
                  <div v-for="i in 5" :key="i" class="flex-1 h-2 rounded-full transition-all duration-300" :class="i <= Math.min(5, archetypeScores.length)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-slate-200 dark:bg-slate-700/50'
                    "></div>
                </div>
              </div>
            </div>

            <!-- Data Points Card (Stats) -->
            <div
              class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-6 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden shadow-sm dark:shadow-none"
              @mouseenter="activeCard = 'data'" @mouseleave="activeCard = null">
              <div
                class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                  <div class="text-emerald-600 dark:text-emerald-400/70 text-xs font-mono tracking-wider">
                    СТАТИСТИКА
                  </div>
                  <div
                    class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center transition-transform duration-300"
                    :class="{ 'scale-110': activeCard === 'data' }">
                    <i class="fas fa-database text-emerald-600 dark:text-emerald-400 text-lg"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-mono">
                    {{ animatedStats.averageIntensity.toFixed(1) }}
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">
                    Средняя интенсивность эмоций
                  </div>
                </div>
                <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-sm">
                  <i class="fas fa-heart text-xs"></i>
                  <span class="font-mono">{{
                    emotionBarometerStats.mostCommonEmotion
                  }}</span>
                  <span class="text-slate-500 dark:text-slate-500">частая эмоция</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Personality Radar & Recent Achievements -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <!-- Personality Radar -->
            <div
              class="lg:col-span-2 bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat">
                    Профиль личности (Big Five)
                  </h2>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Основано на результатах теста Big 5
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <NuxtLink to="/space/tests/big-5-model"
                    class="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors border border-purple-500/20">
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
                  <circle v-for="i in 5" :key="`circle-${i}`" cx="250" cy="250" :r="i * 40" fill="none"
                    stroke="currentColor" class="stroke-slate-200 dark:stroke-slate-700/30" stroke-width="1.5" />

                  <!-- Radar axes -->
                  <line v-for="(trait, index) in personalityTraits" :key="`axis-${trait.name}`" x1="250" y1="250"
                    :x2="getAxisEndpoint(index).x" :y2="getAxisEndpoint(index).y" stroke="currentColor"
                    class="stroke-slate-200 dark:stroke-slate-700/50" stroke-width="1.5" />

                  <!-- Data polygon -->
                  <polygon :points="radarPolygonPoints"
                    class="fill-cyan-500/20 dark:fill-cyan-400/10 stroke-cyan-500 dark:stroke-cyan-400"
                    stroke-width="3" />

                  <!-- Data points -->
                  <circle v-for="(point, index) in radarDataPoints" :key="`point-${index}`" :cx="point.x" :cy="point.y"
                    :r="hoveredTrait === personalityTraits[index].name ? 8 : 6"
                    :fill="getTraitColor(personalityTraits[index].color)"
                    class="transition-all duration-300 cursor-pointer"
                    @mouseenter="hoveredTrait = personalityTraits[index].name" @mouseleave="hoveredTrait = null" />

                  <!-- Trait labels -->
                  <g v-for="(trait, index) in personalityTraits" :key="`label-${trait.name}`">
                    <text :x="getLabelPosition(index).x" :y="getLabelPosition(index).y" text-anchor="middle"
                      class="text-sm font-semibold fill-slate-700 dark:fill-slate-300 cursor-pointer select-none"
                      @mouseenter="hoveredTrait = trait.name" @mouseleave="hoveredTrait = null">
                      {{ trait.name }}
                    </text>
                    <text :x="getLabelPosition(index).x" :y="getLabelPosition(index).y + 18" text-anchor="middle"
                      class="text-base font-bold fill-cyan-600 dark:fill-cyan-400 select-none">
                      {{ trait.value }}%
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Recent Achievements -->
            <div v-if="achievements?.length > 0"
              class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6 font-montserrat">
                Достижения
              </h2>
              <div class="space-y-4">
                <div v-for="achievement in achievements" :key="achievement.id"
                  class="p-4 rounded-xl border transition-all duration-300 cursor-pointer group" :class="[
                    achievement.unlocked
                      ? 'bg-white dark:bg-slate-800/50 border-amber-500/30 hover:border-amber-500/50'
                      : 'bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700/30 hover:border-slate-300 dark:hover:border-slate-700/50',
                  ]">
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      :class="achievement.unlocked ? achievement.bgClass : 'bg-slate-200 dark:bg-slate-700/50'
                        ">
                      <i :class="achievement.icon" class="text-xl"
                        :style="{ opacity: achievement.unlocked ? 1 : 0.3 }"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-medium mb-1" :class="achievement.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'
                        ">
                        {{ achievement.name }}
                      </h3>
                      <p class="text-slate-500 dark:text-slate-400 text-xs mb-2">
                        {{ achievement.description }}
                      </p>
                      <div v-if="achievement.unlocked" class="text-xs text-amber-600 dark:text-amber-400 font-mono">
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



          <!-- Activity Heatmap -->
          <div
            class="bg-white dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
                  <div v-for="day in 7" :key="`${week}-${day}`"
                    class="w-3 h-3 rounded cursor-pointer transition-all duration-200 hover:scale-125"
                    :class="getHeatmapColor(week, day)" :title="`Неделя ${week}, День ${day}`"></div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>52 недели активности</span>
              <span>{{ metrics.totalActiveDays }} активных дней</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div v-if="!loading">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-montserrat">
              Быстрые Действия
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <NuxtLink to="/space/growth/emotional-compass"
                class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                    <i class="fas fa-heart-pulse text-xl text-emerald-600 dark:text-emerald-400"></i>
                  </div>
                  <div
                    class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Эмоциональный Компас
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">Запись эмоций и анализ</div>
                </div>
              </NuxtLink>

              <button @click="viewArchetypes"
                class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                    <i class="fas fa-brain text-xl text-amber-600 dark:text-amber-400"></i>
                  </div>
                  <div
                    class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Архетипы
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">Просмотр результатов теста</div>
                </div>
              </button>

              <NuxtLink to="/profile"
                class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                    <i class="fas fa-user text-xl text-cyan-600 dark:text-cyan-400"></i>
                  </div>
                  <div
                    class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Профиль
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">Управление данными</div>
                </div>
              </NuxtLink>

              <button
                class="p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group text-left relative overflow-hidden shadow-sm dark:shadow-none"
                @click="refreshData">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                <div class="relative z-10">
                  <div
                    class="w-12 h-12 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                    <i class="fas fa-sync text-xl text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div
                    class="text-slate-900 dark:text-white font-medium mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Обновить
                  </div>
                  <div class="text-slate-500 dark:text-slate-400 text-sm">Синхронизировать данные</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Exercise Details Modal -->
        <div v-if="isExerciseModalOpen" class="relative z-50">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/25 dark:bg-black/40 backdrop-blur-sm transition-opacity"
            @click="closeExerciseModal"></div>

          <!-- Modal Panel -->
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <div
                class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all border border-slate-200 dark:border-slate-700"
                @click.stop>
                <div
                  class="text-lg font-medium leading-6 text-slate-900 dark:text-white flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div v-if="selectedExercise" class="w-10 h-10 rounded-lg flex items-center justify-center"
                      :class="selectedExercise.bgClass">
                      <i :class="selectedExercise.icon"></i>
                    </div>
                    <span>{{ selectedExercise?.title }}</span>
                  </div>
                  <button @click="closeExerciseModal"
                    class="text-slate-400 hover:text-slate-500 dark:hover:text-white transition-colors">
                    <i class="fas fa-times"></i>
                  </button>
                </div>

                <div class="mt-6 space-y-6" v-if="selectedExercise">
                  <!-- Stats Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
                      <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Средний счет
                      </div>
                      <div class="text-lg font-bold text-slate-900 dark:text-white font-mono">
                        {{ selectedExercise.avgScore }}{{ selectedExercise.unit }}
                      </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
                      <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Лучший счет
                      </div>
                      <div class="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {{ selectedExercise.bestScore }}{{ selectedExercise.unit }}
                      </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
                      <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Сессий
                      </div>
                      <div class="text-lg font-bold text-slate-900 dark:text-white font-mono">
                        {{ selectedExercise.playCount || selectedExercise.totalSessions || 0 }}
                      </div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-center">
                      <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Уровень
                      </div>
                      <div class="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">
                        {{ Math.floor((selectedExercise.totalSessions || 0) / 5) + 1 }}
                      </div>
                    </div>
                  </div>

                  <!-- History List -->
                  <div>
                    <h4 class="text-sm font-medium text-slate-900 dark:text-white mb-3">
                      История сессий
                    </h4>
                    <div
                      class="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                      <div v-for="(session, index) in selectedExercise.history || []" :key="index"
                        class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                        <div class="flex items-center space-x-3">
                          <div class="w-2 h-2 rounded-full" :class="session.score >= 80
                            ? 'bg-emerald-500'
                            : session.score >= 60
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                            "></div>
                          <span class="text-sm text-slate-600 dark:text-slate-300">{{
                            formatDate(session.date)
                          }}</span>
                        </div>
                        <span class="font-mono text-sm font-medium text-slate-900 dark:text-white">
                          {{ session.score }}{{ selectedExercise.unit }}
                        </span>
                      </div>
                      <div v-if="!selectedExercise.history?.length"
                        class="text-center py-4 text-sm text-slate-500 dark:text-slate-400">
                        История пуста
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex justify-end gap-3">
                    <button type="button"
                      class="inline-flex justify-center rounded-lg border border-transparent bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 transition-all"
                      @click="closeExerciseModal">
                      Закрыть
                    </button>
                    <NuxtLink :to="selectedExercise.link"
                      class="inline-flex justify-center rounded-lg border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 transition-all shadow-lg shadow-cyan-500/30">
                      <i class="fas fa-play mr-2"></i>
                      Начать тренировку
                    </NuxtLink>
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
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc, collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import DashboardGuestView from "~/components/space/DashboardGuestView.vue";

definePageMeta({
  layout: "laboratory",
});

const router = useRouter();
const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

// --- STATE from DASHBOARD ---
const loading = ref(true);
const emotionBarometerStats = ref({
  totalEntries: 0,
  mostCommonEmotion: "",
  averageIntensity: 0,
  mostCommonTag: "",
  emotionDistribution: {},
});
const archetypeScores = ref([]);
const profession = ref("");
const activeCard = ref(null);
const animatedStats = reactive({
  emotionEntries: 0,
  averageIntensity: 0,
});
const sessionId = computed(() => `LAB-${Date.now().toString(36).toUpperCase()}`);

// --- STATE from ANALYSIS ---
const selectedPeriod = ref("month");
const activeMetric = ref(null);
const hoveredBar = ref(null);
const hoveredCategory = ref(null);
const hoveredTrait = ref(null);
const patternResults = ref([]);
const mentalShiftResults = ref([]);
const targetTrackingResults = ref([]);
const doubleGameResults = ref([]);
const big5Result = ref(null);
const assessmentTimestamp = ref(null);
const heatmapData = ref({});
const lastUpdated = ref(new Date().toLocaleDateString('ru-RU'));
const selectedExercise = ref(null);


// --- REPLACEMENT FOR FAKE DATA ---

// Real Achievements Calculation
const achievements = computed(() => {
  const list = [];

  // 1. Big 5 Achievement
  if (big5Result.value) {
    list.push({
      id: 'big5',
      name: 'Познание себя',
      description: 'Пройден тест личности Big 5',
      icon: 'fas fa-fingerprint text-purple-600 dark:text-purple-400',
      bgClass: 'bg-purple-500/10',
      unlocked: true,
      date: formatDate(big5Result.value.timestamp?.seconds * 1000)
    });
  }

  // 2. Archetypes Achievement
  if (archetypeScores.value.length > 0) {
    list.push({
      id: 'archetypes',
      name: 'Архитектор Личности',
      description: 'Определены ведущие архетипы',
      icon: 'fas fa-shapes text-amber-600 dark:text-amber-400',
      bgClass: 'bg-amber-500/10',
      unlocked: true,
      date: formatDate(new Date()) // Archetypes don't always have a timestamp in the simplified return
    });
  }

  // 3. First Workout Achievement
  const totalSessions = patternResults.value.length + mentalShiftResults.value.length + targetTrackingResults.value.length;
  if (totalSessions > 0) {
    list.push({
      id: 'first-workout',
      name: 'Первые шаги',
      description: 'Завершена первая тренировка мозга',
      icon: 'fas fa-dumbbell text-cyan-600 dark:text-cyan-400',
      bgClass: 'bg-cyan-500/10',
      unlocked: true,
      date: formatDate(new Date()) // Approximate
    });
  }

  // 4. Emotional Intelligence
  if (emotionBarometerStats.value.totalEntries > 0) {
    list.push({
      id: 'emotion',
      name: 'Эмоциональный Интеллект',
      description: 'Начато отслеживание эмоций',
      icon: 'fas fa-heart text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-500/10',
      unlocked: true,
      date: 'Активно'
    });
  }

  return list;
});

// Real Progress Data Calculation (Interaction Counts)
const progressData = computed(() => {
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const now = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return {
      date: d,
      label: days[d.getDay()],
      value: 0
    };
  });

  // Helper to add interaction
  const addInteraction = (timestamp) => {
    if (!timestamp) return;
    // Handle both Firestore Timestamp (seconds) and Date/String objects
    let date;
    if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) return;

    date.setHours(0, 0, 0, 0);
    const dayStat = last7Days.find(d => d.date.getTime() === date.getTime());
    if (dayStat) {
      dayStat.value++;
    }
  };

  // 1. Pattern Results
  patternResults.value.forEach(r => addInteraction(r.createdAt));
  // 2. Mental Shift Results (Note: mentalShiftResults uses createdAt sometimes, check data)
  mentalShiftResults.value.forEach(r => addInteraction(r.createdAt || r.timestamp));
  // 3. Big 5 Result
  if (big5Result.value?.timestamp) addInteraction(big5Result.value.timestamp);
  // 4. Assessment Result
  if (assessmentTimestamp.value) addInteraction(assessmentTimestamp.value);
  // 5. Double Game Results
  doubleGameResults.value.forEach(r => addInteraction(r.timestamp));

  // Normalize for display (if max is 0, default to 10 scale, otherwise scale relative to max)
  const maxVal = Math.max(...last7Days.map(d => d.value));
  const scale = maxVal > 0 ? 100 / Math.max(maxVal, 5) : 1; // Scale so max bar is full or reasonable

  return last7Days.map(d => ({
    label: d.label,
    value: d.value > 0 ? Math.round((d.value / Math.max(maxVal, 5)) * 85) : 0, // Visual height %
    absoluteValue: d.value // Actual count for tooltip
  }));
});

// --- COMPUTED from ANALYSIS ---
const exercisesList = computed(() => {
  const list = [];

  // Pattern Detection (N-Back)
  if (patternResults.value.length > 0) {
    const history = patternResults.value.map(r => ({
      date: r.createdAt ? new Date(r.createdAt.seconds * 1000) : new Date(),
      score: r.accuracy !== undefined ? r.accuracy : (r.score > 100 ? 100 : r.score)
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "pattern-detection",
      title: "Pattern Detection",
      category: "Память",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-layer-group text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-500/10",
      history: history,
      icon: "fas fa-layer-group text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-500/10",
      history: history,
      link: "/space/tests/nback",
      unit: '%'
    });
  }

  // Mental Shift (Trail Making)
  if (mentalShiftResults.value.length > 0) {
    const history = mentalShiftResults.value.map(r => ({
      date: (r.createdAt || r.timestamp) ? new Date((r.createdAt || r.timestamp).seconds * 1000) : new Date(),
      score: r.score !== undefined ? Math.max(0, Math.min(100, r.score)) : 0
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "mental-shift",
      title: "Mental Shift",
      category: "Гибкость",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-route text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-500/10",
      history: history,
      icon: "fas fa-route text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-500/10",
      history: history,
      link: "/space/tests/trail-making",
      unit: '%'
    });
  }

  // Target Tracking (Зрительное внимание)
  if (targetTrackingResults.value.length > 0) {
    const history = targetTrackingResults.value.map(r => ({
      date: r.createdAt ? new Date(r.createdAt.seconds * 1000) : new Date(),
      // Target Tracking использует accuracy, которая уже в процентах
      score: r.accuracy !== undefined ? r.accuracy :
        (r.hits !== undefined && r.totalTargets !== undefined ?
          Math.round((r.hits / r.totalTargets) * 100) : 0)
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "target-tracking",
      title: "Target Tracking",
      category: "Внимание",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-crosshairs text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-500/10",
      history: history,
      icon: "fas fa-crosshairs text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-500/10",
      history: history,
      link: "/space/brain-training/target-tracking", // Убедитесь, что этот маршрут существует
      unit: '%'
    });
  }

  // Double Game
  if (doubleGameResults.value.length > 0) {
    const history = doubleGameResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.score || 0,
      mode: r.settings?.mode === 'timer' ? '30 Sec' : 'Endless'
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "double",
      title: "Double",
      category: "Внимание",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-clone text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-500/10",
      history: history,
      icon: "fas fa-clone text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-500/10",
      history: history,
      link: "/space/brain-training/double",
      unit: ''
    });
  }

  return list.sort((a, b) => b.totalSessions - a.totalSessions);
});

const trainingSummary = computed(() => {
  const list = exercisesList.value;
  const active = list.filter(e => e.totalSessions > 0);
  const totalSessions = active.reduce((sum, e) => sum + e.totalSessions, 0);

  // Ensure we don't display > 100%
  let avg = 0;
  let best = 0;

  if (active.length > 0) {
    avg = Math.round(active.reduce((sum, e) => sum + e.avgScore, 0) / active.length);
    best = Math.max(...active.map(e => e.bestScore));
  }

  return {
    totalExercises: active.length,
    totalSessions,
    avgAccuracy: Math.min(100, avg),
    bestScore: Math.min(100, best)
  };
});

const metrics = computed(() => {
  const totalPatterns = patternResults.value.length;
  const totalShift = mentalShiftResults.value.length;
  const completed = totalPatterns + totalShift;

  return {
    growthScore: 0,
    growth: 0,
    activityScore: calculateStreak() * 10,
    streakDays: calculateStreak(),
    totalInsights: 0,
    insightsNew: 0,
    completionRate: 100,
    completedTests: completed,
    totalTests: completed,
    totalActiveDays: Object.keys(heatmapData.value).length,
  }
});

const categories = computed(() => [
  { name: "Когнитивные функции", percentage: calculateCognitiveScore(), icon: "fas fa-network-wired text-cyan-600 dark:text-cyan-400", bgClass: "bg-cyan-500/10", barClass: "bg-gradient-to-r from-cyan-500 to-blue-500" },
]);

const personalityTraits = computed(() => {
  if (!big5Result.value || !big5Result.value.traitScores) {
    return [
      { name: "Открытость", value: 0, color: "bg-cyan-400" },
      { name: "Добросовестность", value: 0, color: "bg-purple-400" },
      { name: "Экстраверсия", value: 0, color: "bg-pink-400" },
      { name: "Доброжелательность", value: 0, color: "bg-emerald-400" },
      { name: "Нейротизм", value: 0, color: "bg-amber-400" },
    ];
  }
  const { traitScores } = big5Result.value;
  // Normalize Big 5 scores (usually 0-60 or 0-120 range depending on implementation, clamping to 100)
  // Assuming max raw score might be around 50-60 for some tests, or 120. 
  // Logic from original code: (val / 120) * 100.
  const normalize = (val) => Math.round((val / 120) * 100);

  return [
    { name: "Открытость", value: normalize(traitScores.открытость_опыту), color: "bg-cyan-400" },
    { name: "Добросовестность", value: normalize(traitScores.добросовестность), color: "bg-purple-400" },
    { name: "Экстраверсия", value: normalize(traitScores.экстраверсия), color: "bg-pink-400" },
    { name: "Доброжелательность", value: normalize(traitScores.доброжелательность), color: "bg-emerald-400" },
    { name: "Нейротизм", value: normalize(traitScores.нейротизм), color: "bg-amber-400" },
  ];
});

const radarDataPoints = computed(() => personalityTraits.value.map((trait, index) => getDataPoint(index, trait.value)));
const radarPolygonPoints = computed(() => radarDataPoints.value.map(point => `${point.x},${point.y}`).join(' '));

// --- FUNCTIONS from ANALYSIS & DASHBOARD ---
function calculateCognitiveScore() {
  // Объединяем результаты всех тренировок
  const allResults = [...patternResults.value, ...mentalShiftResults.value, ...targetTrackingResults.value, ...doubleGameResults.value];
  if (allResults.length === 0) return 0;

  // Рассчитываем среднюю точность по всем тренировкам
  const total = allResults.reduce((acc, curr) => {
    if (curr.accuracy !== undefined) return acc + curr.accuracy;
    if (curr.score !== undefined) return acc + (curr.score > 100 ? 100 : curr.score);
    return acc;
  }, 0);

  return Math.round(total / allResults.length) || 0;
}

function calculateStreak() {
  const allResults = [...patternResults.value, ...mentalShiftResults.value, ...targetTrackingResults.value, ...doubleGameResults.value];
  const days = new Set(allResults.map(r => {
    if (!r.createdAt) return null;
    return new Date(r.createdAt.seconds * 1000).toDateString();
  }).filter(Boolean));
  return days.size;
}
function processHeatmapData(allResults) {
  const map = {};
  const now = new Date();
  allResults.forEach(res => {
    if (!res.createdAt) return;
    const date = new Date(res.createdAt.seconds * 1000);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksAgo = Math.floor(diffDays / 7);
    if (weeksAgo < 52) {
      const weekIdx = 52 - weeksAgo;
      const dayIdx = date.getDay() === 0 ? 7 : date.getDay();
      let intensity = 1;
      // Simplified intensity logic
      if ((res.score || res.accuracy) > 0) intensity = 2; // Any activity

      const colors = ["bg-emerald-500/20", "bg-emerald-500/40", "bg-emerald-500/60", "bg-emerald-500/80", "bg-emerald-500"];
      const cellKey = `${weekIdx}-${dayIdx}`;
      if (map[cellKey]) {
        const currentIntensity = colors.indexOf(map[cellKey]) + 1;
        intensity = Math.max(intensity, currentIntensity + 1); // Increase intensity with more activity
      }
      map[cellKey] = colors[Math.min(intensity, 5) - 1];
    }
  });
  heatmapData.value = map;
}

// Radar Chart Math
const getAxisEndpoint = (index) => {
  const angle = (360 / personalityTraits.value.length) * index - 90;
  const radius = 200;
  return { x: 250 + radius * Math.cos((angle * Math.PI) / 180), y: 250 + radius * Math.sin((angle * Math.PI) / 180) };
};
const getDataPoint = (index, value) => {
  const angle = (360 / personalityTraits.value.length) * index - 90;
  const maxRadius = 200;
  const radius = (value / 100) * maxRadius;
  return { x: 250 + radius * Math.cos((angle * Math.PI) / 180), y: 250 + radius * Math.sin((angle * Math.PI) / 180) };
};
const getLabelPosition = (index) => {
  const angle = (360 / personalityTraits.value.length) * index - 90;
  const radius = 220;
  return { x: 250 + radius * Math.cos((angle * Math.PI) / 180), y: 250 + radius * Math.sin((angle * Math.PI) / 180) };
};
const getTraitColor = (colorClass) => {
  const colorMap = { 'bg-cyan-400': '#22d3ee', 'bg-purple-400': '#c084fc', 'bg-pink-400': '#f472b6', 'bg-emerald-400': '#34d399', 'bg-amber-400': '#fbbf24' };
  return colorMap[colorClass] || '#22d3ee';
};
const getHeatmapColor = (week, day) => {
  if (heatmapData.value[`${week}-${day}`]) return heatmapData.value[`${week}-${day}`];
  return "bg-slate-200 dark:bg-slate-700/50"; // Fixed: Empty cells are now dark in dark mode
};

const isExerciseModalOpen = ref(false);

// Modals
const openExerciseDetails = (exercise) => {
  if (exercise.history && exercise.history.length > 0) {
    selectedExercise.value = exercise;
    isExerciseModalOpen.value = true;
  }
};
const closeExerciseModal = () => {
  isExerciseModalOpen.value = false;
  selectedExercise.value = null;
};
const getScoreColor = (score) => {
  if (score >= 90) return 'text-emerald-600 dark:text-emerald-400 font-bold';
  if (score >= 75) return 'text-cyan-600 dark:text-cyan-400';
  if (score >= 60) return 'text-amber-600 dark:text-amber-400';
  return 'text-slate-500 dark:text-slate-400';
};
const viewArchetypes = () => router.push("/profile#psychological-profile");
const refreshData = () => { loading.value = true; fetchUserData(); };

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d);
};

const animateNumbers = () => {
  const duration = 1500; const steps = 60; const interval = duration / steps;
  let currentStep = 0;
  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    animatedStats.emotionEntries = Math.floor(emotionBarometerStats.value.totalEntries * progress);
    animatedStats.averageIntensity = emotionBarometerStats.value.averageIntensity * progress;
    if (currentStep >= steps) {
      animatedStats.emotionEntries = emotionBarometerStats.value.totalEntries;
      animatedStats.averageIntensity = emotionBarometerStats.value.averageIntensity;
      clearInterval(timer);
    }
  }, interval);
};

// Combined Data Fetcher
const fetchUserData = async () => {
  if (!authStore.user) return;
  try {
    const db = getFirestore();
    const userRef = doc(db, "users", authStore.user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) profession.value = userSnap.data().profession || "";

    // Dashboard: Emotion Stats
    const { success, stats } = await getEmotionBarometerStats(db, authStore.user.uid);
    if (success) emotionBarometerStats.value = stats;

    // Dashboard: Assessment
    const { success: assessmentSuccess, assessment } = await getLatestUserAssessment(db, authStore.user.uid);
    if (assessmentSuccess && assessment) {
      if (assessment.timestamp) {
        assessmentTimestamp.value = assessment.timestamp;
      } else if (assessment.createdAt) {
        assessmentTimestamp.value = assessment.createdAt;
      } else {
        // Fallback: If assessment exists but has no date (shouldn't happen with new logic), use 'now' to match Achievements behavior?
        // But valid data saves are preferred. Let's assume correct data flow. 
        // If the user literally just did it, maybe the hook returned a fresh object without timestamp?
        // Adding a console log would be good, but I'll stick to checking createdAt.
        // ALSO: assessment might return `date` field?
        if (assessment.date) assessmentTimestamp.value = assessment.date;
      }
      archetypeScores.value = Object.entries(assessment.scores).map(([name, level]) => ({ name, level: parseFloat(level) }));
    }

    // Pattern Detection Results (Legacy/Standard)
    const qPatterns = query(collection(db, `users/${authStore.user.uid}/patternDetectionResults`), orderBy("createdAt", "desc"));
    const snapshotPatterns = await getDocs(qPatterns);
    patternResults.value = snapshotPatterns.docs.map(doc => doc.data());

    // Mental Shift Results (Legacy/Standard)
    const qMentalShift = query(collection(db, `users/${authStore.user.uid}/mentalShiftResults`), orderBy("createdAt", "desc"));
    const snapshotMentalShift = await getDocs(qMentalShift);
    mentalShiftResults.value = snapshotMentalShift.docs.map(doc => doc.data());

    // Target Tracking Results
    const qTargetTracking = query(collection(db, `users/${authStore.user.uid}/targetTrackingResults`), orderBy("createdAt", "desc"));
    const snapshotTargetTracking = await getDocs(qTargetTracking);
    targetTrackingResults.value = snapshotTargetTracking.docs.map(doc => doc.data());
    console.log('Target Tracking Results:', targetTrackingResults.value);
    console.log('Target Tracking Count:', targetTrackingResults.value.length);

    // Double Game Results
    const qDouble = query(collection(db, `users/${authStore.user.uid}/doubleGameResults`), orderBy("timestamp", "desc"));
    const snapshotDouble = await getDocs(qDouble);
    doubleGameResults.value = snapshotDouble.docs.map(doc => doc.data());

    // Analysis: Heatmap
    processHeatmapData([...patternResults.value, ...mentalShiftResults.value, ...targetTrackingResults.value, ...doubleGameResults.value]);

    // Analysis: Big 5
    const qBig5 = query(collection(db, `users/${authStore.user.uid}/big5Results`), orderBy("timestamp", "desc"), limit(1));
    const snapshotBig5 = await getDocs(qBig5);
    if (!snapshotBig5.empty) big5Result.value = snapshotBig5.docs[0].data();

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
    setTimeout(animateNumbers, 300);
  }
};

onMounted(async () => {
  await authStore.initAuth();
  if (authStore.user) {
    await fetchUserData();
  } else {
    loading.value = false;
  }
});

</script>

<style scoped>
/* Loading State Styles */


.loading-container {
  @apply flex flex-col items-center gap-8;
}

.loading-spinner-wrapper {
  @apply relative w-32 h-32;
}

.spinner-ring {
  @apply absolute inset-0 rounded-full border-4 border-transparent;
  animation: spin 3s linear infinite;
}

.spinner-ring-1 {
  @apply border-t-cyan-500;
  animation-duration: 2s;
}

.spinner-ring-2 {
  @apply border-r-blue-500;
  animation-duration: 3s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-purple-500;
  animation-duration: 4s;
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

  0%,
  100% {
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
  @apply h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full;
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

