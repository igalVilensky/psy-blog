<template>
  <div
    class="nback-test min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 transition-colors duration-500"
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
          class="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight gradient-text"
        >
          N-BACK TEST
        </h1>
        <p
          class="text-slate-600 dark:text-purple-300/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
        >
          Золотой стандарт тренировки рабочей памяти. Используется для оценки
          флюидного интеллекта
        </p>

        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
        >
          <div class="info-card-small">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-2 sm:mb-3 mx-auto"
            >
              <i class="fas fa-brain text-purple-400 text-lg sm:text-xl"></i>
            </div>
            <div class="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              3 уровня
            </div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">1-Back → 3-Back</div>
          </div>
          <div class="info-card-small">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-2 sm:mb-3 mx-auto"
            >
              <i class="fas fa-clock text-cyan-400 text-lg sm:text-xl"></i>
            </div>
            <div class="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
              5-8 мин
            </div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Длительность</div>
          </div>
          <div class="info-card-small">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-2 sm:mb-3 mx-auto"
            >
              <i class="fas fa-chart-line text-blue-400 text-lg sm:text-xl"></i>
            </div>
            <div class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              Научно
            </div>
            <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Валидирован</div>
          </div>
        </div>

        <div class="info-card max-w-2xl mx-auto mb-6 sm:mb-8 mx-2">
          <div class="flex items-start gap-3 sm:gap-4">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1"
            >
              <i
                class="fas fa-info-circle text-purple-600 dark:text-purple-400 text-sm sm:text-base"
              ></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Что измеряет этот тест?
              </h3>
              <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                N-Back Test — один из самых эффективных тестов для оценки
                <strong class="text-purple-600 dark:text-purple-400">рабочей памяти</strong> и
                <strong class="text-cyan-600 dark:text-cyan-400">флюидного интеллекта</strong>.
                Регулярная тренировка N-Back может улучшить когнитивные
                способности на 40%!
              </p>
            </div>
          </div>
        </div>

        <button
          @click="phase = 'instructions'"
          class="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
        >
          <i class="fas fa-play mr-2"></i>
          Начать тест
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>

      <!-- Instructions Screen -->
      <div v-if="phase === 'instructions'" class="max-w-2xl mx-auto pt-4">
        <div class="text-center mb-6 sm:mb-8">
          <h2
            class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 gradient-text"
          >
            Как играть?
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Это просто, но сложно! 🧠
          </p>
        </div>

        <div class="space-y-4 sm:space-y-6 mb-6 sm:mb-8 px-2">
          <div class="instruction-card">
            <div class="flex items-start gap-3 sm:gap-4">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold text-sm sm:text-base">1</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Смотрите на буквы
                </h3>
                <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  На экране будут появляться буквы одна за другой:
                  <span class="text-purple-600 dark:text-purple-400 font-mono text-xs sm:text-sm"
                    >A → B → C → A...</span
                  >
                </p>
              </div>
            </div>
          </div>

          <div class="instruction-card">
            <div class="flex items-start gap-3 sm:gap-4">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold text-sm sm:text-base">2</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Нажимайте SPACE при совпадении
                </h3>
                <p
                  class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3"
                >
                  Нажмите <kbd class="kbd">SPACE</kbd> или кнопку "MATCH", когда
                  текущая буква совпадает с буквой
                  <strong class="text-cyan-600 dark:text-cyan-400">N шагов назад</strong>
                </p>
                <div
                  class="bg-slate-100 dark:bg-slate-800/50 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3 text-xs sm:text-sm"
                >
                  <div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      1-Back (легко):
                    </div>
                    <div class="text-slate-900 dark:text-white">
                      Последовательность:
                      <span class="text-purple-600 dark:text-purple-400 font-mono">A → B → B</span>
                    </div>
                    <div class="text-emerald-600 dark:text-emerald-400">
                      ✓ Нажмите! (B повторяется сразу)
                    </div>
                  </div>
                  <div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      2-Back (средне):
                    </div>
                    <div class="text-slate-900 dark:text-white">
                      Последовательность:
                      <span class="text-purple-600 dark:text-purple-400 font-mono">A → B → A</span>
                    </div>
                    <div class="text-emerald-600 dark:text-emerald-400">
                      ✓ Нажмите! (A была 2 шага назад)
                    </div>
                  </div>
                  <div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      3-Back (сложно):
                    </div>
                    <div class="text-slate-900 dark:text-white">
                      Последовательность:
                      <span class="text-purple-600 dark:text-purple-400 font-mono"
                        >A → B → C → A</span
                      >
                    </div>
                    <div class="text-emerald-600 dark:text-emerald-400">
                      ✓ Нажмите! (A была 3 шага назад)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="instruction-card">
            <div class="flex items-start gap-3 sm:gap-4">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold text-sm sm:text-base">3</span>
              </div>
              <div class="text-left flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Пройдите все уровни
                </h3>
                <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Начните с 1-Back, затем перейдете к 2-Back и 3-Back. Каждый
                  уровень по 20 букв. Зарабатывайте очки за правильные ответы!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 mx-2"
        >
          <div class="flex items-start gap-3">
            <i
              class="fas fa-gamepad text-blue-600 dark:text-blue-400 text-lg sm:text-xl mt-0.5"
            ></i>
            <div class="flex-1">
              <h4 class="text-slate-900 dark:text-white font-semibold mb-1 text-sm sm:text-base">
                Игровые механики
              </h4>
              <ul class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm space-y-1">
                <li class="flex items-start gap-1">
                  <span class="text-blue-600 dark:text-blue-400 mt-0.5">🎯</span>
                  <span
                    ><strong>Комбо:</strong> Серия правильных ответов
                    увеличивает очки</span
                  >
                </li>
                <li class="flex items-start gap-1">
                  <span class="text-cyan-600 dark:text-cyan-400 mt-0.5">⚡</span>
                  <span
                    ><strong>Реакция:</strong> Быстрый ответ = больше
                    баллов</span
                  >
                </li>
                <li class="flex items-start gap-1">
                  <span class="text-red-600 dark:text-red-400 mt-0.5">❌</span>
                  <span
                    ><strong>Штрафы:</strong> Ложные нажатия снижают комбо</span
                  >
                </li>
              </ul>
            </div>
          </div>
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
            @click="startTest"
            class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 order-1 sm:order-2"
          >
            Поехали! 🚀
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
                {{ currentTrial }}/{{ trialsPerLevel }}
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div
            class="relative h-1.5 sm:h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
          >
            <div
              class="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300"
              :style="{ width: `${(currentTrial / trialsPerLevel) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Main Display Area -->
        <div class="game-area mb-6 sm:mb-8">
          <!-- Letter Display -->
          <div v-if="!betweenLevels" class="letter-display">
            <div
              class="letter-box"
              :class="{
                'letter-correct': showFeedback && lastCorrect,
                'letter-wrong': showFeedback && !lastCorrect,
              }"
            >
              {{ currentLetter }}
            </div>

            <!-- Feedback -->
            <div v-if="showFeedback" class="feedback-text">
              <span
                v-if="lastCorrect"
                class="text-emerald-600 dark:text-emerald-400 text-xl sm:text-2xl"
                >✓ Верно! +{{ lastPoints }}</span
              >
              <span v-else class="text-red-600 dark:text-red-400 text-xl sm:text-2xl"
                >✗ Мимо!</span
              >
            </div>
          </div>

          <!-- Between Levels -->
          <div v-else class="between-levels">
            <div class="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
            <h3 class="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {{ nLevel - 1 }}-Back пройден!
            </h3>
            <p class="text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Точность: {{ levelAccuracy }}%
            </p>
            <p class="text-cyan-600 dark:text-cyan-400 text-base sm:text-lg">
              Переход к {{ nLevel }}-Back...
            </p>
          </div>

          <!-- History Trail -->
          <div v-if="!betweenLevels" class="history-trail">
            <div
              v-for="(letter, index) in displayHistory"
              :key="index"
              class="history-item"
              :class="{
                'history-target': index === displayHistory.length - nLevel - 1,
              }"
            >
              {{ letter }}
            </div>
          </div>
        </div>

        <!-- Match Button -->
        <div class="text-center mb-4 sm:mb-6">
          <button
            @click="handleMatch"
            class="match-button"
            :disabled="betweenLevels"
            :class="{ 'match-active': matchPressed }"
          >
            <div class="flex flex-col items-center justify-center h-full">
              <div class="text-xs text-white/80 mb-1 leading-tight">
                SPACE или нажми
              </div>
              <div
                class="text-2xl sm:text-3xl font-black text-white leading-none"
              >
                MATCH
              </div>
              <div class="text-xs text-white/70 mt-1 leading-tight">
                Совпадение с N-назад
              </div>
            </div>
          </button>
        </div>

        <!-- Helper -->
        <div class="info-card text-center mx-2">
          <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Текущая буква совпадает с буквой
            <strong class="text-purple-600 dark:text-purple-400"
              >{{ nLevel }} {{ nLevel === 1 ? "шаг" : "шага" }}</strong
            >
            назад? Нажми MATCH!
          </div>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-if="phase === 'result'" class="max-w-3xl mx-auto pt-4">
        <div class="text-center mb-8 sm:mb-12">
          <div class="inline-block mb-4 sm:mb-6">
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center animate-bounce-slow"
            >
              <i
                class="fas fa-trophy text-white text-3xl sm:text-4xl lg:text-5xl"
              ></i>
            </div>
          </div>
          <h2
            class="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 gradient-text"
          >
            Тест завершен! 🎮
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-lg">
            Вот ваши результаты по N-Back тесту
          </p>
        </div>

        <!-- Total Score -->
        <div class="mb-6 sm:mb-8">
          <div class="performance-card text-center">
            <div
              class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2"
            >
              Финальный счёт
            </div>
            <div
              class="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 mb-3 sm:mb-4"
            >
              {{ score }}
            </div>
            <div class="text-lg sm:text-xl text-slate-600 dark:text-slate-300">
              {{ getScoreRating() }}
            </div>
          </div>
        </div>

        <!-- Level Results -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <div class="result-card">
            <div class="flex items-center gap-3 mb-3 sm:mb-4">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
              >
                <span class="text-white text-lg sm:text-xl font-bold">1</span>
              </div>
              <div class="text-left">
                <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">1-Back</div>
                <div class="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {{ results.level1.accuracy }}%
                </div>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {{ results.level1.hits }}/{{ results.level1.targets }} совпадений
            </div>
          </div>

          <div class="result-card">
            <div class="flex items-center gap-3 mb-3 sm:mb-4">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
              >
                <span class="text-white text-lg sm:text-xl font-bold">2</span>
              </div>
              <div class="text-left">
                <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">2-Back</div>
                <div class="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {{ results.level2.accuracy }}%
                </div>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {{ results.level2.hits }}/{{ results.level2.targets }} совпадений
            </div>
          </div>

          <div class="result-card">
            <div class="flex items-center gap-3 mb-3 sm:mb-4">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center"
              >
                <span class="text-white text-lg sm:text-xl font-bold">3</span>
              </div>
              <div class="text-left">
                <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">3-Back</div>
                <div class="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {{ results.level3.accuracy }}%
                </div>
              </div>
            </div>
            <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {{ results.level3.hits }}/{{ results.level3.targets }} совпадений
            </div>
          </div>
        </div>

        <!-- Performance Stats -->
        <div class="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div class="stat-comparison">
            <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">Общая точность</div>
            <div class="text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400">
              {{ overallAccuracy }}%
            </div>
          </div>
          <div class="stat-comparison">
            <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">Макс. комбо</div>
            <div class="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {{ maxCombo }}x
            </div>
          </div>
          <div class="stat-comparison">
            <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">Средняя реакция</div>
            <div class="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {{ avgReactionTime }}ms
            </div>
          </div>
        </div>

        <!-- Interpretation -->
        <div class="info-card mb-6 sm:mb-8">
          <div class="flex items-start gap-3 sm:gap-4">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1"
            >
              <i class="fas fa-brain text-purple-400 text-sm sm:text-base"></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Интерпретация результатов
              </h3>
              <div
                class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                <p>
                  <strong class="text-emerald-600 dark:text-emerald-400">1-Back</strong> оценивает
                  базовую рабочую память и внимание.
                </p>
                <p>
                  <strong class="text-cyan-600 dark:text-cyan-400">2-Back</strong> требует более
                  активной работы рабочей памяти и является хорошим показателем
                  флюидного интеллекта.
                </p>
                <p>
                  <strong class="text-purple-600 dark:text-purple-400">3-Back</strong> — очень
                  сложный уровень, требующий высокой концентрации и эффективной
                  рабочей памяти.
                </p>
                <p class="text-blue-600 dark:text-blue-400">
                  💡 Регулярная тренировка N-Back может улучшить рабочую память
                  и когнитивные способности!
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="info-card mb-6 sm:mb-8">
          <div class="flex items-start gap-3 sm:gap-4">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1"
            >
              <i
                class="fas fa-lightbulb text-cyan-400 text-sm sm:text-base"
              ></i>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Как улучшить результаты
              </h3>
              <ul class="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-purple-600 dark:text-purple-400 mt-0.5 text-xs"></i>
                  <span>Практикуйте N-Back ежедневно по 10-15 минут</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-purple-600 dark:text-purple-400 mt-0.5 text-xs"></i>
                  <span
                    >Используйте вокализацию (проговаривайте буквы про
                    себя)</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-purple-600 dark:text-purple-400 mt-0.5 text-xs"></i>
                  <span
                    >Постепенно увеличивайте сложность (4-Back, 5-Back)</span
                  >
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check text-purple-600 dark:text-purple-400 mt-0.5 text-xs"></i>
                  <span
                    >Тренируйтесь в спокойной обстановке без отвлечений</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            @click="restartTest"
            class="btn-primary px-6 sm:px-8 py-3 text-base sm:text-lg order-1"
          >
            <i class="fas fa-redo mr-2"></i>
            Пройти снова
          </button>
          <button
            @click="shareResults"
            class="btn-secondary px-6 sm:px-8 py-3 text-base sm:text-lg order-2"
          >
            <i class="fas fa-share mr-2"></i>
            Поделиться
          </button>
          <NuxtLink
            to="/space/brain-training"
            class="btn-secondary px-6 sm:px-8 py-3 text-base sm:text-lg text-center inline-flex items-center justify-center order-3"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            К играм
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

definePageMeta({
  layout: "laboratory",
});

const letters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T",
];

// Game state
const phase = ref("intro"); // intro, instructions, test, result
const nLevel = ref(1); // 1, 2, or 3
const currentTrial = ref(0);
const trialsPerLevel = 20;
const sequence = ref([]);
const currentLetter = ref("");
const displayHistory = ref([]);
const score = ref(0);
const combo = ref(0);
const maxCombo = ref(0);
const matchPressed = ref(false);
const showFeedback = ref(false);
const lastCorrect = ref(false);
const lastPoints = ref(0);
const betweenLevels = ref(false);
const levelAccuracy = ref(0);

// Timing
const letterInterval = ref(null);
const feedbackTimeout = ref(null);
const trialStartTime = ref(0);
const reactionTimes = ref([]);

// Results tracking
const results = ref({
  level1: {
    hits: 0,
    misses: 0,
    falseAlarms: 0,
    correctRejections: 0,
    targets: 0,
    accuracy: 0,
  },
  level2: {
    hits: 0,
    misses: 0,
    falseAlarms: 0,
    correctRejections: 0,
    targets: 0,
    accuracy: 0,
  },
  level3: {
    hits: 0,
    misses: 0,
    falseAlarms: 0,
    correctRejections: 0,
    targets: 0,
    accuracy: 0,
  },
});

const currentLevelStats = ref({
  hits: 0,
  misses: 0,
  falseAlarms: 0,
  correctRejections: 0,
  targets: 0,
});

// Computed
const overallAccuracy = computed(() => {
  const total =
    results.value.level1.targets +
    results.value.level2.targets +
    results.value.level3.targets;
  const hits =
    results.value.level1.hits +
    results.value.level2.hits +
    results.value.level3.hits;
  return total > 0 ? Math.round((hits / total) * 100) : 0;
});

const avgReactionTime = computed(() => {
  if (reactionTimes.value.length === 0) return 0;
  const sum = reactionTimes.value.reduce((a, b) => a + b, 0);
  return Math.round(sum / reactionTimes.value.length);
});

// Functions
const generateSequence = (n, length) => {
  const seq = [];
  const targetProbability = 0.25; // 25% chance of match

  // Generate first N letters randomly
  for (let i = 0; i < n; i++) {
    seq.push(letters[Math.floor(Math.random() * letters.length)]);
  }

  // Generate remaining letters
  for (let i = n; i < length; i++) {
    if (Math.random() < targetProbability) {
      // Create a match
      seq.push(seq[i - n]);
    } else {
      // Random letter that's different from N-back
      let newLetter;
      do {
        newLetter = letters[Math.floor(Math.random() * letters.length)];
      } while (newLetter === seq[i - n]);
      seq.push(newLetter);
    }
  }

  return seq;
};

const startTest = () => {
  phase.value = "test";
  nLevel.value = 1;
  score.value = 0;
  combo.value = 0;
  maxCombo.value = 0;
  reactionTimes.value = [];
  results.value = {
    level1: {
      hits: 0,
      misses: 0,
      falseAlarms: 0,
      correctRejections: 0,
      targets: 0,
      accuracy: 0,
    },
    level2: {
      hits: 0,
      misses: 0,
      falseAlarms: 0,
      correctRejections: 0,
      targets: 0,
      accuracy: 0,
    },
    level3: {
      hits: 0,
      misses: 0,
      falseAlarms: 0,
      correctRejections: 0,
      targets: 0,
      accuracy: 0,
    },
  };
  startLevel();
};

const startLevel = () => {
  currentTrial.value = 0;
  sequence.value = generateSequence(nLevel.value, trialsPerLevel);
  displayHistory.value = [];
  currentLevelStats.value = {
    hits: 0,
    misses: 0,
    falseAlarms: 0,
    correctRejections: 0,
    targets: 0,
  };
  betweenLevels.value = false;
  nextTrial();
};

const nextTrial = () => {
  if (currentTrial.value >= trialsPerLevel) {
    endLevel();
    return;
  }

  currentLetter.value = sequence.value[currentTrial.value];
  displayHistory.value.push(currentLetter.value);
  if (displayHistory.value.length > 5) {
    displayHistory.value.shift();
  }

  trialStartTime.value = Date.now();
  matchPressed.value = false;
  showFeedback.value = false;

  currentTrial.value++;
};

const handleMatch = () => {
  if (matchPressed.value || betweenLevels.value) return;

  matchPressed.value = true;
  const reactionTime = Date.now() - trialStartTime.value;
  reactionTimes.value.push(reactionTime);

  const isTarget =
    currentTrial.value > nLevel.value &&
    sequence.value[currentTrial.value - 1] ===
      sequence.value[currentTrial.value - 1 - nLevel.value];

  if (isTarget) {
    // Hit
    currentLevelStats.value.hits++;
    combo.value++;
    maxCombo.value = Math.max(maxCombo.value, combo.value);

    // Score calculation: base points + combo bonus + speed bonus
    const basePoints = 10 * nLevel.value;
    const comboBonus = Math.floor(combo.value * 2);
    const speedBonus = reactionTime < 500 ? 5 : reactionTime < 1000 ? 3 : 0;
    lastPoints.value = basePoints + comboBonus + speedBonus;
    score.value += lastPoints.value;

    lastCorrect.value = true;
  } else {
    // False alarm
    currentLevelStats.value.falseAlarms++;
    combo.value = 0;
    lastCorrect.value = false;
    lastPoints.value = 0;
  }

  showFeedback.value = true;

  // Continue after delay
  feedbackTimeout.value = setTimeout(() => {
    showFeedback.value = false;
    nextTrial();
  }, 800);
};

const checkMiss = () => {
  // Called when trial ends without match press
  const isTarget =
    currentTrial.value > nLevel.value &&
    sequence.value[currentTrial.value - 1] ===
      sequence.value[currentTrial.value - 1 - nLevel.value];

  if (isTarget) {
    // Miss
    currentLevelStats.value.misses++;
    combo.value = 0;
  } else {
    // Correct rejection
    currentLevelStats.value.correctRejections++;
  }
};

const endLevel = () => {
  // Calculate level stats
  currentLevelStats.value.targets =
    currentLevelStats.value.hits + currentLevelStats.value.misses;
  const accuracy =
    currentLevelStats.value.targets > 0
      ? Math.round(
          (currentLevelStats.value.hits / currentLevelStats.value.targets) * 100
        )
      : 0;

  // Save to results
  const levelKey = `level${nLevel.value}`;
  results.value[levelKey] = { ...currentLevelStats.value, accuracy };
  levelAccuracy.value = accuracy;

  if (nLevel.value < 3) {
    // Move to next level
    betweenLevels.value = true;
    setTimeout(() => {
      nLevel.value++;
      startLevel();
    }, 3000);
  } else {
    // Test complete
    saveResults();
    phase.value = "result";
  }
};

const saveResults = async () => {
  const previousResults = JSON.parse(
    localStorage.getItem("nbackResults") || "[]"
  );
  const newResult = {
    date: new Date().toISOString(),
    score: score.value,
    accuracy: overallAccuracy.value,
    maxCombo: maxCombo.value,
    avgReactionTime: avgReactionTime.value,
    level1: results.value.level1.accuracy,
    level2: results.value.level2.accuracy,
    level3: results.value.level3.accuracy,
  };
  previousResults.push(newResult);
  localStorage.setItem("nbackResults", JSON.stringify(previousResults));


};

const getScoreRating = () => {
  if (overallAccuracy.value >= 90) return "Выдающийся результат! 🏆";
  if (overallAccuracy.value >= 75) return "Отличная работа! ⭐";
  if (overallAccuracy.value >= 60) return "Хороший результат! 👍";
  if (overallAccuracy.value >= 45) return "Неплохо!";
  return "Продолжайте практиковаться!";
};

const restartTest = () => {
  phase.value = "intro";
  nLevel.value = 1;
  currentTrial.value = 0;
  sequence.value = [];
  currentLetter.value = "";
  displayHistory.value = [];
  score.value = 0;
  combo.value = 0;
  maxCombo.value = 0;
  matchPressed.value = false;
  showFeedback.value = false;
  betweenLevels.value = false;
  reactionTimes.value = [];
};

const shareResults = () => {
  const text = `🧠 Я прошёл N-Back Test в MindQ Lab!\n\n📊 Мои результаты:\n• Счёт: ${score.value}\n• Точность: ${overallAccuracy.value}%\n• Макс комбо: ${maxCombo.value}x\n\n1-Back: ${results.value.level1.accuracy}%\n2-Back: ${results.value.level2.accuracy}%\n3-Back: ${results.value.level3.accuracy}%\n\nПопробуй и ты! mindqlab.com`;

  if (navigator.share) {
    navigator
      .share({
        title: "N-Back Test - MindQ Lab",
        text: text,
        url: window.location.href,
      })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    alert("Результаты скопированы в буфер обмена!");
  }
};

// Keyboard handler
const handleKeyPress = (event) => {
  if (
    phase.value === "test" &&
    !betweenLevels.value &&
    event.code === "Space"
  ) {
    event.preventDefault();
    if (!matchPressed.value) {
      handleMatch();
    }
  }
};

// Auto-advance trial with timer
const startTrialTimer = () => {
  if (letterInterval.value) clearInterval(letterInterval.value);

  letterInterval.value = setInterval(() => {
    if (phase.value === "test" && !betweenLevels.value && !showFeedback.value) {
      if (!matchPressed.value) {
        checkMiss();
      }
      nextTrial();
    }
  }, 2500); // 2.5 seconds per letter
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
  startTrialTimer();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
  if (letterInterval.value) clearInterval(letterInterval.value);
  if (feedbackTimeout.value) clearTimeout(feedbackTimeout.value);
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  @apply inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 
         text-white font-semibold hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 
         transition-all duration-300 transform hover:scale-105 
         shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn-secondary {
  @apply inline-flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600/50 
         text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 
         transition-all duration-300 transform hover:scale-105;
}

.info-card {
  @apply p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-purple-500/10 backdrop-blur-sm shadow-sm dark:shadow-none;
}

.info-card-small {
  @apply p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-purple-500/10 text-center shadow-sm dark:shadow-none;
}

.instruction-card {
  @apply p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 shadow-sm dark:shadow-none;
}

.result-card {
  @apply p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-sm dark:shadow-none;
}

.performance-card {
  @apply p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/80 dark:to-slate-800/80 border border-slate-200 dark:border-purple-500/30 shadow-sm dark:shadow-none;
}

.stat-comparison {
  @apply p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 text-center shadow-sm dark:shadow-none;
}

.stat-box {
  @apply p-2 sm:p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 text-center shadow-sm dark:shadow-none;
}

.game-area {
  @apply relative p-4 sm:p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-purple-500/20 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex flex-col items-center justify-center;
}

.letter-display {
  @apply relative h-48 sm:h-64 flex items-center justify-center bg-white dark:bg-slate-900/30 rounded-3xl border-2 border-slate-200 dark:border-slate-700/50 mb-4 sm:mb-6 shadow-sm dark:shadow-none;
}

.letter-box {
  @apply text-7xl sm:text-9xl font-black text-slate-900 dark:text-white transition-all duration-200;
}

.letter-correct {
  @apply text-emerald-500 scale-125;
}

.letter-wrong {
  @apply text-red-500 scale-90 opacity-50;
}

.feedback-text {
  @apply absolute bottom-4 left-0 right-0 text-center font-bold animate-bounce-slow;
}

.history-trail {
  @apply flex justify-center gap-1 sm:gap-2 h-8 sm:h-10 mb-4 sm:mb-6 overflow-hidden px-2;
}

.history-item {
  @apply w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 
         flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold text-slate-400
         transition-all duration-300;
}

.history-target {
  @apply bg-purple-500/20 border-purple-500/50 text-purple-400 scale-110;
}

.match-button {
  @apply w-full max-w-xs mx-auto sm:max-w-sm lg:max-w-md h-20 sm:h-24 lg:h-28 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600
         text-white font-black cursor-pointer border-2 border-white/20
         transition-all duration-200 transform hover:scale-105 hover:shadow-2xl
         shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60
         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
         active:scale-95 flex items-center justify-center;
}

.match-active {
  @apply scale-95 brightness-110 bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-700
         shadow-inner border-white/30;
}

.between-levels {
  @apply text-center py-8 sm:py-12 lg:py-16;
}

kbd {
  @apply px-2 py-1 text-xs font-semibold text-white bg-slate-700 border border-slate-600 rounded;
}

@keyframes correctPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}

/* Enhanced responsive adjustments */
@media (max-width: 480px) {
  .letter-box {
    @apply w-28 h-28 text-5xl;
  }

  .match-button {
    @apply h-20 max-w-[280px] mx-auto;
  }

  .game-area {
    @apply p-3 min-h-[250px];
  }

  .history-item {
    @apply w-6 h-6 text-base;
  }
}

@media (max-width: 360px) {
  .letter-box {
    @apply w-24 h-24 text-4xl;
  }

  .stat-box {
    @apply p-2;
  }

  .stat-box div:last-child {
    @apply text-lg;
  }
  .match-button {
    @apply h-16 max-w-[260px];
  }

  .match-button .text-2xl {
    @apply text-xl;
  }
}

/* Improved touch targets for mobile */
@media (max-width: 768px) {
  .btn-primary,
  .btn-secondary {
    @apply min-h-[44px];
  }

  .match-button {
    @apply min-h-[60px];
  }
}

/* Better spacing for very small screens */
@media (max-width: 320px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-box {
    @apply text-center;
  }
}
</style>

