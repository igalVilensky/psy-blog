<template>
  <div class="hero-section relative">
    <div class="relative z-10 w-full lg:max-w-6xl lg:mx-auto">
      <div
        class="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-12 bg-white/5 backdrop-blur-lg"
        >
          <!-- Левая колонка: Приветствие и статистика -->
          <div class="p-6 sm:p-8 lg:col-span-7">
            <h1
              class="text-3xl sm:text-4xl font-bold text-white mb-3 transition-all"
            >
              <span
                class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              >
                {{
                  isLoggedIn
                    ? `С возвращением, ${userName}!`
                    : "Откройте свою истинную сущность"
                }}
              </span>
            </h1>
            <p class="text-lg text-slate-300 mb-8 max-w-2xl">
              {{
                isLoggedIn
                  ? "Продолжайте свое путешествие к самопознанию. Ваши результаты и прогресс отражены ниже."
                  : "Пройдите наши научно обоснованные тесты личности и отправьтесь в увлекательное путешествие к самопознанию и внутренней гармонии."
              }}
            </p>

            <!-- Сетка статистики для авторизованных пользователей -->
            <div
              v-if="isLoggedIn"
              class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <!-- Статистика тестов -->
              <div
                class="bg-gradient-to-br from-indigo-900/60 to-indigo-800/40 backdrop-blur-sm rounded-xl p-5 border border-indigo-700/30 hover:border-indigo-500/50 transition-all shadow-lg group"
              >
                <div class="flex items-center mb-3">
                  <div class="p-2 bg-indigo-500/20 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3
                    class="font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors"
                  >
                    Ваши тесты
                  </h3>
                </div>

                <div v-if="stats.tests?.completedTest" class="space-y-3">
                  <p class="text-white/80 text-sm font-medium">
                    {{ stats.tests.completedTest.name }}
                  </p>
                  <div class="space-y-2">
                    <div
                      v-for="(archetype, index) in stats.tests.completedTest
                        .topArchetypes"
                      :key="index"
                      class="space-y-1"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-xs text-indigo-200">{{
                          archetype.name
                        }}</span>
                        <span class="text-xs font-medium text-white"
                          >{{ Math.round(archetype.score) }}%</span
                        >
                      </div>
                      <div class="w-full bg-indigo-900/50 rounded-full h-1.5">
                        <div
                          class="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                          :style="`width: ${archetype.score}%`"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-indigo-200/80 mb-4 text-sm">
                  Тесты еще не пройдены
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                  <a
                    v-for="cta in stats.tests?.ctas"
                    :key="cta.name"
                    :href="cta.link"
                    class="text-xs px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm hover:shadow flex items-center"
                  >
                    <span>{{ cta.name }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Статистика курсов -->
              <div
                class="bg-gradient-to-br from-amber-900/60 to-amber-800/40 backdrop-blur-sm rounded-xl p-5 border border-amber-700/30 hover:border-amber-500/50 transition-all shadow-lg group"
              >
                <div class="flex items-center mb-3">
                  <div class="p-2 bg-amber-500/20 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3
                    class="font-semibold text-amber-300 group-hover:text-amber-200 transition-colors"
                  >
                    Ваши курсы
                  </h3>
                </div>

                <div
                  v-if="stats.courses?.purchasedCourses?.length"
                  class="space-y-3"
                >
                  <div
                    v-for="(course, index) in stats.courses.purchasedCourses"
                    :key="index"
                    class="space-y-1"
                  >
                    <p class="text-white/80 text-sm">{{ course.name }}</p>
                    <div class="flex justify-between text-xs text-amber-200/80">
                      <span>Прогресс</span>
                      <span>{{ course.progressPercentage }}%</span>
                    </div>
                    <div class="w-full bg-amber-900/50 rounded-full h-1.5">
                      <div
                        class="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full"
                        :style="`width: ${course.progressPercentage}%`"
                      ></div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-amber-200/80 mb-4 text-sm">
                  Курсы еще не приобретены
                </div>

                <div v-if="stats.courses?.cta" class="mt-4">
                  <a
                    :href="stats.courses.cta.link"
                    class="text-xs px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg transition-colors shadow-sm hover:shadow flex items-center w-fit"
                  >
                    <span>Просмотреть курсы</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Статистика инструментов -->
              <div
                class="bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 backdrop-blur-sm rounded-xl p-5 border border-emerald-700/30 hover:border-emerald-500/50 transition-all shadow-lg group"
              >
                <div class="flex items-center mb-3">
                  <div class="p-2 bg-emerald-500/20 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    class="font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors"
                  >
                    Ваши инструменты
                  </h3>
                </div>

                <div v-if="stats.tools?.emotionStats" class="space-y-2">
                  <p class="text-white/80 text-sm">Барометр эмоций</p>
                  <div class="flex items-end">
                    <p
                      class="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors"
                    >
                      {{ stats.tools.emotionStats.totalEntries }}
                    </p>
                    <p class="text-xs text-emerald-200/70 ml-2 mb-1">
                      Всего записей
                    </p>
                  </div>
                  <div class="mt-2 border-t border-emerald-700/30 pt-2">
                    <p class="text-xs text-emerald-200/80">Последняя запись:</p>
                    <p class="text-sm text-white/80">
                      {{ stats.tools.emotionStats.lastEntry || "Вчера, 19:45" }}
                    </p>
                  </div>
                </div>
                <div v-else class="text-emerald-200/80 mb-4 text-sm">
                  Инструменты еще не использованы
                </div>

                <div class="mt-4">
                  <a
                    v-if="stats.tools?.cta"
                    :href="stats.tools.cta.link"
                    class="text-xs px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm hover:shadow flex items-center w-fit"
                  >
                    <span>Попробовать барометр эмоций</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    v-else-if="stats.tools?.reminder"
                    :href="stats.tools.reminder.link"
                    class="text-xs px-3 py-1.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm hover:shadow flex items-center w-fit"
                  >
                    <span>Записать эмоции сегодня</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Кнопки CTA для неавторизованных пользователей -->
            <div v-if="!isLoggedIn" class="flex flex-wrap gap-4 mb-8">
              <a
                href="/login"
                class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center"
              >
                <span>Войти</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="/register"
                class="px-6 py-3 bg-transparent border border-indigo-500 text-indigo-400 font-medium rounded-lg hover:bg-indigo-900/30 hover:text-indigo-300 transition-all"
              >
                Начать
              </a>
            </div>
          </div>

          <!-- Правая колонка: Действия и рекомендации -->
          <div
            class="bg-gray-900/50 p-6 sm:p-8 lg:col-span-5 border-l border-white/5"
          >
            <div v-if="isLoggedIn" class="mb-8">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-xl font-semibold text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Недавняя активность
                </h2>
                <a
                  href="/activity"
                  class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >Все</a
                >
              </div>
              <ul class="space-y-3">
                <li
                  v-for="action in recentActions"
                  :key="action.id"
                  class="flex justify-between items-center p-4 bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-lg backdrop-blur-sm transition-all group"
                >
                  <div class="flex items-center">
                    <div class="w-2 h-2 rounded-full bg-indigo-500 mr-3"></div>
                    <span
                      class="text-gray-300 group-hover:text-white transition-colors"
                      >{{ action.description }}</span
                    >
                  </div>
                  <span
                    class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors"
                    >{{ action.date }}</span
                  >
                </li>
                <li
                  v-if="recentActions.length === 0"
                  class="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm text-gray-400 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Нет недавней активности
                </li>
              </ul>
            </div>

            <div>
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-xl font-semibold text-white flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18.573a9.026 9.026 0 01-4.5-1.22 1 1 0 01-.53-.88 1.5 1.5 0 01.043-.243A9.976 9.976 0 015.25 14.5c1.592.648 3.445.869 5.25.635a1.5 1.5 0 01.243-.043 1 1 0 01.887.53 9.026 9.026 0 01-1.22 4.5 1 1 0 01-.881.53 1.5 1.5 0 01-.242-.043 9.976 9.976 0 01-3.287-1.535z"
                    />
                  </svg>
                  {{ isLoggedIn ? "Рекомендуем для вас" : "Популярные тесты" }}
                </h2>
                <a
                  v-if="isLoggedIn"
                  href="/recommendations"
                  class="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >Все</a
                >
              </div>
              <ul class="space-y-3">
                <li
                  v-for="(rec, index) in recommendations"
                  :key="rec.id"
                  class="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm relative overflow-hidden group transition-all hover:bg-indigo-950/20"
                  :class="{
                    'border-l-4 border-l-indigo-500': index % 3 === 0,
                    'border-l-4 border-l-purple-500': index % 3 === 1,
                    'border-l-4 border-l-pink-500': index % 3 === 2,
                  }"
                >
                  <div
                    class="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 opacity-10 rounded-full"
                    :class="{
                      'bg-indigo-500': index % 3 === 0,
                      'bg-purple-500': index % 3 === 1,
                      'bg-pink-500': index % 3 === 2,
                    }"
                  ></div>
                  <p
                    class="text-gray-300 group-hover:text-white transition-colors relative z-10"
                  >
                    {{ rec.text }}
                  </p>
                  <a
                    :href="rec.link || '#'"
                    class="mt-2 inline-flex items-center text-xs font-medium"
                    :class="{
                      'text-indigo-400 hover:text-indigo-300': index % 3 === 0,
                      'text-purple-400 hover:text-purple-300': index % 3 === 1,
                      'text-pink-400 hover:text-pink-300': index % 3 === 2,
                    }"
                  >
                    Подробнее
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li
                  v-if="!isLoggedIn"
                  class="p-4 bg-white/5 border border-white/10 border-l-4 border-l-amber-500 rounded-lg backdrop-blur-sm relative overflow-hidden group transition-all hover:bg-amber-900/20"
                >
                  <div
                    class="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 bg-amber-500 opacity-10 rounded-full"
                  ></div>
                  <p
                    class="text-gray-300 group-hover:text-white transition-colors relative z-10"
                  >
                    Пройти тест на архетипы
                  </p>
                  <a
                    href="/tests/archetypes"
                    class="mt-2 inline-flex items-center text-xs font-medium text-amber-400 hover:text-amber-300"
                  >
                    Подробнее
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li
                  v-if="!isLoggedIn"
                  class="p-4 bg-white/5 border border-white/10 border-l-4 border-l-emerald-500 rounded-lg backdrop-blur-sm relative overflow-hidden group transition-all hover:bg-emerald-900/20"
                >
                  <div
                    class="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 bg-emerald-500 opacity-10 rounded-full"
                  ></div>
                  <p
                    class="text-gray-300 group-hover:text-white transition-colors relative z-10"
                  >
                    Попробовать оценку личности по Большой пятерке
                  </p>
                  <a
                    href="/tests/big-five"
                    class="mt-2 inline-flex items-center text-xs font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Подробнее
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "~/stores/auth";

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
  recentActions: {
    type: Array,
    default: () => [],
  },
  recommendations: {
    type: Array,
    default: () => [],
  },
});

const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(() => {
  if (!authStore.user) return "";
  return authStore.user.displayName || "Пользователь";
});
</script>
