<!-- pages/lab/psychology/mindfulness.vue -->
<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/5 via-slate-50 to-slate-50 dark:from-teal-500/10 dark:via-slate-950 dark:to-slate-950 pb-8 transition-colors duration-500"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      <!-- Header -->
      <div v-if="!activeSession" class="mb-8">
        <div class="flex-1">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight"
          >
            ОСОЗНАННОСТЬ И МЕДИТАЦИЯ
          </h1>
          <p
            class="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base"
          >
            Практики присутствия, медитативные техники и путь к внутреннему
            спокойствию
          </p>
        </div>
      </div>

      <!-- Active Session Display -->
      <transition name="slide-fade">
        <div
          v-if="activeSession"
          class="mb-4 md:mb-12 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 md:p-8 border border-teal-200/50 dark:border-teal-500/30 relative overflow-hidden shadow-lg dark:shadow-none ring-1 ring-teal-500/10"
        >
          <!-- Visuals Background -->
          <div class="absolute inset-0 rounded-2xl overflow-hidden z-0">
            <MeditationVisuals :is-active="!isSessionPaused" :intensity="0.5" />
          </div>

          <div class="relative z-10 text-center">
            <!-- Top Controls (Music) -->
            <div class="absolute top-0 right-0 z-50">
              <div class="relative">
                <button
                  @click="toggleVolumeSlider"
                  class="w-10 h-10 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <i
                    :class="
                      isMusicPlaying ? 'fas fa-music' : 'fas fa-volume-mute'
                    "
                  ></i>
                </button>

                <!-- Vertical Volume Slider -->
                <transition name="fade">
                  <div
                    v-if="showVolumeSlider"
                    class="absolute top-12 right-0 w-12 h-36 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-full shadow-xl border border-teal-100 dark:border-teal-500/30 flex flex-col items-center justify-between py-4"
                  >
                    <!-- Volume Bar (clickable) -->
                    <div
                      @click="handleVolumeBarClick"
                      class="h-24 w-3 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer hover:w-4 transition-all"
                    >
                      <div
                        class="absolute bottom-0 left-0 w-full bg-teal-500 rounded-full transition-all duration-100"
                        :style="{ height: `${musicVolume}%` }"
                      ></div>
                    </div>

                    <!-- Volume Text -->
                    <div
                      class="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold"
                    >
                      {{ Math.round(musicVolume) }}
                    </div>

                    <!-- Toggle Button -->
                    <button
                      @click="toggleMusic"
                      class="text-xs text-teal-600 dark:text-teal-400 hover:scale-110 transition-transform"
                    >
                      <i
                        :class="
                          isMusicPlaying
                            ? 'fas fa-volume-up'
                            : 'fas fa-volume-off'
                        "
                      ></i>
                    </button>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Session Type -->
            <div class="mb-4 md:mb-6">
              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30"
              >
                <i
                  :class="activeSession.icon"
                  class="text-teal-600 dark:text-teal-400"
                ></i>
                <span
                  class="text-teal-700 dark:text-teal-300 font-medium text-sm"
                  >{{ activeSession.title }}</span
                >
              </div>
            </div>

            <!-- Timer & Guidance -->
            <div class="mb-4 md:mb-8 relative z-10">
              <!-- Fixed height container to prevent layout jumps -->
              <div
                class="h-24 md:h-40 flex items-center justify-center mb-4 md:mb-8 px-4"
              >
                <transition name="blur-fade" mode="out-in">
                  <div
                    :key="
                      currentInstruction ? currentInstruction.text : 'default'
                    "
                    class="max-w-3xl mx-auto text-center"
                  >
                    <p
                      v-if="currentInstruction"
                      class="text-xl md:text-3xl font-serif font-medium leading-relaxed tracking-wide text-teal-900 dark:text-teal-50 drop-shadow-sm"
                    >
                      {{ currentInstruction.text }}
                    </p>
                    <p
                      v-else
                      class="text-teal-700/60 dark:text-teal-200/60 text-sm font-medium tracking-widest uppercase"
                    >
                      {{ sessionMessage }}
                    </p>
                  </div>
                </transition>
              </div>

              <div
                class="text-4xl md:text-5xl font-bold text-teal-900/20 dark:text-teal-100/20 font-mono tracking-wider transition-all duration-500 hover:text-teal-900/40 dark:hover:text-teal-100/40"
              >
                {{ formatTime(sessionTimeRemaining) }}
              </div>
            </div>

            <!-- Breathing Pacer (Visual Anchor) -->
            <div class="flex justify-center mb-8 md:mb-12 relative">
              <!-- Outer Glow -->
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-500/20 blur-3xl transition-all duration-[4000ms] ease-in-out pointer-events-none"
                :class="{
                  'scale-150 opacity-60': isBreathingIn,
                  'scale-100 opacity-30': !isBreathingIn,
                }"
              ></div>

              <!-- Main Circle -->
              <div class="relative w-48 h-48 flex items-center justify-center">
                <!-- Progress Ring Background -->
                <svg
                  class="absolute inset-0 transform -rotate-90 w-48 h-48 drop-shadow-lg"
                >
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    class="text-slate-200 dark:text-slate-800/50"
                  />
                  <!-- Progress Arc -->
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    class="text-teal-500 dark:text-teal-400 transition-all duration-1000"
                    :style="{
                      strokeDasharray: `${2 * Math.PI * 88}`,
                      strokeDashoffset: `${
                        2 * Math.PI * 88 * (1 - sessionProgress)
                      }`,
                    }"
                    stroke-linecap="round"
                  />
                </svg>

                <!-- Breathing Center -->
                <div
                  class="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg dark:shadow-teal-500/50 flex items-center justify-center transition-all duration-[4000ms] ease-in-out z-10"
                  :class="breathingScale"
                >
                  <div class="text-white font-medium text-center opacity-90">
                    <div class="text-lg">{{ currentBreathingPhase }}</div>
                    <div
                      v-if="
                        activeSession?.id === 'box-breathing' ||
                        activeSession?.id === '478-breathing' ||
                        activeSession?.id === 'coherent-breathing' ||
                        activeSession?.id === 'alternate-nostril'
                      "
                      class="text-xs opacity-75"
                    >
                      {{ breathingPhaseTimer }}с
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Control Buttons -->
            <div class="flex flex-wrap justify-center gap-3 relative z-20">
              <button
                v-if="!isSessionPaused"
                @click="pauseSession"
                class="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center gap-2 shadow-sm dark:shadow-none"
              >
                <i class="fas fa-pause"></i>
                <span>Пауза</span>
              </button>
              <button
                v-else
                @click="resumeSession"
                class="px-6 py-3 rounded-xl bg-teal-500 border border-teal-400 text-white hover:bg-teal-600 transition-all duration-300 flex items-center gap-2 shadow-sm dark:shadow-none"
              >
                <i class="fas fa-play"></i>
                <span>Продолжить</span>
              </button>
              <button
                @click="endSession"
                class="px-6 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2 shadow-sm dark:shadow-none"
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
            class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3"
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
            @start="(tech, dur) => startMeditation(tech, dur)"
          />
        </div>
      </div>

      <!-- Breathing Exercises -->
      <div v-if="!activeSession" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3"
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
            @start="(ex, dur) => startBreathing(ex, dur)"
          />
        </div>
      </div>

      <!-- Mindfulness Activities -->
      <div v-if="!activeSession" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3"
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
        <div
          class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <h3
            class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"
          >
            <i class="fas fa-chart-line text-teal-600 dark:text-teal-400"></i>
            Прогресс за неделю
          </h3>

          <!-- Login CTA for non-authenticated users -->
          <div v-if="!user" class="text-center py-8">
            <div class="mb-4">
              <i class="fas fa-chart-bar text-teal-500/30 text-5xl"></i>
            </div>
            <h4
              class="text-lg font-semibold text-slate-900 dark:text-white mb-2"
            >
              Отслеживайте свой прогресс
            </h4>
            <p class="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              Войдите или зарегистрируйтесь, чтобы сохранять историю медитаций и
              отслеживать свой прогресс
            </p>
            <NuxtLink
              to="/login"
              class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-colors duration-300"
            >
              <i class="fas fa-sign-in-alt"></i>
              <span>Войти</span>
            </NuxtLink>
          </div>

          <!-- Real data for authenticated users -->
          <div v-else>
            <div class="space-y-3 mb-6">
              <div
                v-for="day in weeklyProgress"
                :key="day.day"
                class="flex items-center gap-4"
              >
                <div class="w-16 text-slate-500 dark:text-slate-400 text-sm">
                  {{ day.day }}
                </div>
                <div
                  class="flex-1 h-8 bg-slate-100 dark:bg-slate-900/50 rounded-lg overflow-hidden relative"
                >
                  <div
                    class="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
                    :style="{ width: `${(day.minutes / 60) * 100}%` }"
                  ></div>
                  <div
                    class="absolute inset-0 flex items-center justify-end px-3"
                  >
                    <span
                      class="text-xs font-mono text-slate-700 dark:text-white"
                      >{{ day.minutes }} мин</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-teal-500/10 rounded-xl p-4 border border-teal-500/20"
            >
              <div class="flex items-center justify-between">
                <span class="text-slate-600 dark:text-slate-300 text-sm"
                  >Среднее время в день</span
                >
                <span class="text-teal-600 dark:text-teal-400 font-bold"
                  >{{ averageDaily }} мин</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div
          class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <h3
            class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"
          >
            <i class="fas fa-trophy text-yellow-500 dark:text-yellow-400"></i>
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
                :class="
                  achievement.unlocked
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-600'
                "
              >
                {{ achievement.title }}
              </div>
              <div
                class="text-xs"
                :class="
                  achievement.unlocked
                    ? 'text-slate-500 dark:text-slate-400'
                    : 'text-slate-400 dark:text-slate-700'
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
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center"
              >
                <i
                  class="fas fa-book-open text-purple-600 dark:text-purple-400 text-xl"
                ></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                  Гид по медитации
                </h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                  Советы для начинающих
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700/50 transition-colors"
              >
                <h4
                  class="text-slate-900 dark:text-white font-medium mb-2 flex items-center gap-2"
                >
                  <i
                    class="fas fa-lightbulb text-yellow-500 dark:text-yellow-400 text-sm"
                  ></i>
                  Создайте пространство
                </h4>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                  Найдите тихое место, где вас никто не потревожит. Убедитесь,
                  что вам комфортно.
                </p>
              </div>

              <div
                class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700/50 transition-colors"
              >
                <h4
                  class="text-slate-900 dark:text-white font-medium mb-2 flex items-center gap-2"
                >
                  <i
                    class="fas fa-clock text-cyan-600 dark:text-cyan-400 text-sm"
                  ></i>
                  Начните с малого
                </h4>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                  5-10 минут в день достаточно для начала. Регулярность важнее
                  длительности.
                </p>
              </div>

              <div
                class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700/50 transition-colors"
              >
                <h4
                  class="text-slate-900 dark:text-white font-medium mb-2 flex items-center gap-2"
                >
                  <i
                    class="fas fa-smile text-emerald-600 dark:text-emerald-400 text-sm"
                  ></i>
                  Будьте терпеливы
                </h4>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
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
                <i
                  class="fas fa-heart text-teal-600 dark:text-teal-400 text-xl"
                ></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                  Польза медитации
                </h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                  Научно доказанные эффекты
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3">
              <div
                class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700/50 transition-colors"
              >
                <i
                  class="fas fa-brain text-teal-600 dark:text-teal-400 mt-1"
                ></i>
                <div>
                  <h4
                    class="text-slate-900 dark:text-white font-medium text-sm mb-1"
                  >
                    Улучшение концентрации
                  </h4>
                  <p class="text-slate-600 dark:text-slate-400 text-xs">
                    Усиление способности фокусироваться на задачах
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700/50 transition-colors"
              >
                <i
                  class="fas fa-shield-alt text-cyan-600 dark:text-cyan-400 mt-1"
                ></i>
                <div>
                  <h4
                    class="text-slate-900 dark:text-white font-medium text-sm mb-1"
                  >
                    Снижение стресса
                  </h4>
                  <p class="text-slate-600 dark:text-slate-400 text-xs">
                    Уменьшение уровня кортизола и тревожности
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700/50 transition-colors"
              >
                <i
                  class="fas fa-bed text-purple-600 dark:text-purple-400 mt-1"
                ></i>
                <div>
                  <h4
                    class="text-slate-900 dark:text-white font-medium text-sm mb-1"
                  >
                    Лучший сон
                  </h4>
                  <p class="text-slate-600 dark:text-slate-400 text-xs">
                    Улучшение качества и глубины сна
                  </p>
                </div>
              </div>

              <div
                class="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700/50 transition-colors"
              >
                <i
                  class="fas fa-smile-beam text-yellow-500 dark:text-yellow-400 mt-1"
                ></i>
                <div>
                  <h4
                    class="text-slate-900 dark:text-white font-medium text-sm mb-1"
                  >
                    Эмоциональное здоровье
                  </h4>
                  <p class="text-slate-600 dark:text-slate-400 text-xs">
                    Повышение позитивных эмоций и самооценки
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden YouTube Player for Background Music -->
    <div id="youtube-player" style="display: none"></div>
  </div>
</template>

<script setup>
import MeditationCard from "~/components/lab/psychology/MeditationCard.vue";
import BreathingCard from "~/components/lab/psychology/BreathingCard.vue";
import MindfulnessActivityCard from "~/components/lab/psychology/MindfulnessActivityCard.vue";
import MeditationVisuals from "~/components/lab/psychology/MeditationVisuals.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import {
  getMeditationData,
  saveMeditationSession,
  getWeeklyProgress,
} from "~/api/firebase/meditationSessions";
import { getAuth, onAuthStateChanged } from "firebase/auth";

definePageMeta({
  layout: "laboratory",
});

const { $firestore } = useNuxtApp();

// Authentication
const auth = getAuth();
const user = ref(null);
const isAuthReady = ref(false);

// Session state
const activeSession = ref(null);
const sessionTimeRemaining = ref(0);
const sessionTotalTime = ref(0);
const isSessionPaused = ref(false);
const sessionMessage = ref("");
let sessionInterval = null;

// Music player state (YouTube)
const youtubePlayer = ref(null);
const isMusicPlaying = ref(false);
const musicVolume = ref(30); // Default volume at 30%
const isYouTubeReady = ref(false);
const showVolumeSlider = ref(false);
let volumeHideTimer = null;

// YouTube meditation music video ID (8-hour ambient music)
const MEDITATION_MUSIC_VIDEO_ID = "lTRiuFIWV54"; // 8-hour peaceful relaxing music

// Stats (will be loaded from Firebase for authenticated users)
const totalSessions = ref(0);
const totalMinutes = ref(0);
const currentStreak = ref(0);
const mindfulnessScore = ref(0);
const isLoadingData = ref(false);

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

const currentInstruction = computed(() => {
  if (!activeSession.value?.guidance) return null;

  const elapsedTime = sessionTotalTime.value - sessionTimeRemaining.value;
  return activeSession.value.guidance.find(
    (step) => elapsedTime >= step.start && elapsedTime < step.end
  );
});

// Box breathing cycle (4 phases: inhale, hold, exhale, hold)
const boxBreathingPhase = ref(0); // 0=inhale, 1=hold, 2=exhale, 3=hold
const breathingPhaseTimer = ref(4);
let breathingInterval = null;
let breathingPhaseInterval = null;

// Computed properties for breathing display
const currentBreathingPhase = computed(() => {
  const exerciseId = activeSession.value?.id;

  if (exerciseId === "box-breathing") {
    const phases = ["Вдох", "Задержка", "Выдох", "Задержка"];
    return phases[boxBreathingPhase.value];
  } else if (exerciseId === "478-breathing") {
    const phases = ["Вдох", "Задержка", "Выдох"];
    return phases[boxBreathingPhase.value];
  } else if (exerciseId === "coherent-breathing") {
    return boxBreathingPhase.value === 0 ? "Вдох" : "Выдох";
  } else if (exerciseId === "alternate-nostril") {
    const phases = ["Левая вдох", "Правая выдох", "Правая вдох", "Левая выдох"];
    return phases[boxBreathingPhase.value];
  }

  // For meditation exercises, use simple in/out
  return isBreathingIn.value ? "Вдох" : "Выдох";
});

const breathingScale = computed(() => {
  const exerciseId = activeSession.value?.id;

  if (exerciseId === "box-breathing") {
    // Scale based on box breathing phase
    if (boxBreathingPhase.value === 0) return "scale-110"; // Inhale
    if (boxBreathingPhase.value === 1) return "scale-110"; // Hold (full)
    if (boxBreathingPhase.value === 2) return "scale-90"; // Exhale
    if (boxBreathingPhase.value === 3) return "scale-90"; // Hold (empty)
  } else if (exerciseId === "478-breathing") {
    if (boxBreathingPhase.value === 0) return "scale-110"; // Inhale
    if (boxBreathingPhase.value === 1) return "scale-110"; // Hold
    if (boxBreathingPhase.value === 2) return "scale-90"; // Exhale
  } else if (exerciseId === "coherent-breathing") {
    return boxBreathingPhase.value === 0 ? "scale-110" : "scale-90"; // Inhale : Exhale
  } else if (exerciseId === "alternate-nostril") {
    // Phases 0 and 2 are inhale, 1 and 3 are exhale
    return boxBreathingPhase.value === 0 || boxBreathingPhase.value === 2
      ? "scale-110"
      : "scale-90";
  }

  // For meditation exercises, use simple in/out
  return isBreathingIn.value ? "scale-110" : "scale-90";
});

// Simple breathing pacer logic (4s in, 4s out) for non-box breathing
const isBreathingIn = ref(true);

watch(isSessionPaused, (paused) => {
  if (paused) {
    clearInterval(breathingInterval);
    clearInterval(breathingPhaseInterval);
  } else if (activeSession.value) {
    startBreathingPacer();
  }
});

const startBreathingPacer = () => {
  clearInterval(breathingInterval);
  clearInterval(breathingPhaseInterval);

  const exerciseId = activeSession.value?.id;

  if (exerciseId === "box-breathing") {
    // Box breathing: 4 phases of 4 seconds each
    boxBreathingPhase.value = 0;
    breathingPhaseTimer.value = 4;

    breathingPhaseInterval = setInterval(() => {
      breathingPhaseTimer.value--;
      if (breathingPhaseTimer.value <= 0) {
        breathingPhaseTimer.value = 4;
      }
    }, 1000);

    breathingInterval = setInterval(() => {
      boxBreathingPhase.value = (boxBreathingPhase.value + 1) % 4;
      breathingPhaseTimer.value = 4;
    }, 4000);
  } else if (exerciseId === "478-breathing") {
    // 4-7-8 breathing
    boxBreathingPhase.value = 0;
    breathingPhaseTimer.value = 4;

    breathingPhaseInterval = setInterval(() => {
      breathingPhaseTimer.value--;
      if (breathingPhaseTimer.value <= 0) {
        // Move to next phase
        const currentPhase = boxBreathingPhase.value;
        if (currentPhase === 0) {
          // After inhale (4s), go to hold (7s)
          boxBreathingPhase.value = 1;
          breathingPhaseTimer.value = 7;
        } else if (currentPhase === 1) {
          // After hold (7s), go to exhale (8s)
          boxBreathingPhase.value = 2;
          breathingPhaseTimer.value = 8;
        } else {
          // After exhale (8s), back to inhale (4s)
          boxBreathingPhase.value = 0;
          breathingPhaseTimer.value = 4;
        }
      }
    }, 1000);
  } else if (exerciseId === "coherent-breathing") {
    // Coherent breathing: 6s in, 6s out
    boxBreathingPhase.value = 0;
    breathingPhaseTimer.value = 6;

    breathingPhaseInterval = setInterval(() => {
      breathingPhaseTimer.value--;
      if (breathingPhaseTimer.value <= 0) {
        boxBreathingPhase.value = boxBreathingPhase.value === 0 ? 2 : 0;
        breathingPhaseTimer.value = 6;
      }
    }, 1000);
  } else if (exerciseId === "alternate-nostril") {
    // Alternate nostril: 4 phases of 4s each
    boxBreathingPhase.value = 0;
    breathingPhaseTimer.value = 4;

    breathingPhaseInterval = setInterval(() => {
      breathingPhaseTimer.value--;
      if (breathingPhaseTimer.value <= 0) {
        breathingPhaseTimer.value = 4;
      }
    }, 1000);

    breathingInterval = setInterval(() => {
      boxBreathingPhase.value = (boxBreathingPhase.value + 1) % 4;
      breathingPhaseTimer.value = 4;
    }, 4000);
  } else {
    // Simple breathing for meditation
    isBreathingIn.value = true;
    breathingInterval = setInterval(() => {
      isBreathingIn.value = !isBreathingIn.value;
    }, 4000);
  }
};

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
    guidance: [
      {
        start: 0,
        end: 10,
        text: "Устройтесь поудобнее. Спина прямая, плечи расслаблены.",
      },
      {
        start: 10,
        end: 20,
        text: "Мягко прикройте глаза. Сделайте глубокий вдох...",
      },
      { start: 20, end: 30, text: "...и медленный, плавный выдох." },
      {
        start: 30,
        end: 60,
        text: "Перенесите внимание на дыхание. Почувствуйте, как воздух входит и выходит.",
      },
      {
        start: 60,
        end: 120,
        text: "Не пытайтесь контролировать дыхание. Просто наблюдайте за ним.",
      },
      {
        start: 120,
        end: 180,
        text: "Если мысли отвлекают вас — это нормально. Мягко верните внимание к дыханию.",
      },
      {
        start: 180,
        end: 240,
        text: "Почувствуйте движение живота и грудной клетки при каждом вдохе.",
      },
      {
        start: 240,
        end: 300,
        text: "Вы здесь и сейчас. Только вы и ваше дыхание.",
      },
      {
        start: 300,
        end: 9999,
        text: "Продолжайте наблюдать за дыханием в тишине...",
      },
    ],
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
// Load meditation data from Firebase
const loadMeditationData = async () => {
  if (!process.client) return;

  const { $firestore } = useNuxtApp();

  // Wait for auth to be ready
  if (!isAuthReady.value) {
    return;
  }

  // Check if user is properly authenticated and firestore is available
  if (!user.value?.uid || !$firestore) {
    weeklyProgress.value = [
      { day: "Пн", minutes: 0 },
      { day: "Вт", minutes: 0 },
      { day: "Ср", minutes: 0 },
      { day: "Чт", minutes: 0 },
      { day: "Пт", minutes: 0 },
      { day: "Сб", minutes: 0 },
      { day: "Вс", minutes: 0 },
    ];
    return;
  }

  isLoadingData.value = true;
  try {
    // Load user's meditation data
    const data = await getMeditationData($firestore, user.value.uid);
    if (data) {
      totalSessions.value = data.totalSessions || 0;
      totalMinutes.value = data.totalMinutes || 0;
      currentStreak.value = data.currentStreak || 0;
    }

    // Load weekly progress
    const progress = await getWeeklyProgress($firestore, user.value.uid);
    if (progress.length > 0) {
      weeklyProgress.value = progress;
    }
  } catch (error) {
    console.error("❌ Error loading meditation data:", error);
    // Fallback to empty data on error
    weeklyProgress.value = [
      { day: "Пн", minutes: 0 },
      { day: "Вт", minutes: 0 },
      { day: "Ср", minutes: 0 },
      { day: "Чт", minutes: 0 },
      { day: "Пт", minutes: 0 },
      { day: "Сб", minutes: 0 },
      { day: "Вс", minutes: 0 },
    ];
  } finally {
    isLoadingData.value = false;
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const startMeditation = (technique, selectedDuration) => {
  activeSession.value = technique;
  // Use selectedDuration if provided, otherwise fallback to middle duration
  const duration = selectedDuration || technique.duration[1];

  sessionTotalTime.value = duration * 60;
  sessionTimeRemaining.value = sessionTotalTime.value;
  isSessionPaused.value = false;
  sessionMessage.value = "Найдите удобное положение и закройте глаза...";

  startBreathingPacer();
  startSessionTimer();
};

const startBreathing = (exercise, selectedDuration) => {
  activeSession.value = exercise;
  // Use selectedDuration if provided, otherwise fallback to middle duration
  const duration = selectedDuration || exercise.duration[1];
  sessionTotalTime.value = duration * 60;
  sessionTimeRemaining.value = sessionTotalTime.value;
  isSessionPaused.value = false;
  sessionMessage.value = `Следуйте паттерну: ${exercise.pattern}`;

  startBreathingPacer();
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
  if (isMusicPlaying.value && youtubePlayer.value) {
    try {
      youtubePlayer.value.pauseVideo();
    } catch (err) {
      console.error("YouTube pause error:", err);
    }
  }
};

const resumeSession = () => {
  isSessionPaused.value = false;
  sessionMessage.value = "Продолжаем практику...";
  if (isMusicPlaying.value && youtubePlayer.value) {
    try {
      youtubePlayer.value.playVideo();
    } catch (err) {
      console.error("YouTube resume error:", err);
    }
  }
};

const endSession = async () => {
  if (sessionInterval) clearInterval(sessionInterval);
  clearInterval(breathingInterval);
  clearInterval(breathingPhaseInterval);

  const completedTime = Math.floor(sessionTotalTime.value / 60);

  const { $firestore } = useNuxtApp();

  // Save progress when manually ending session
  if (user.value?.uid && completedTime > 0 && $firestore) {
    try {
      const success = await saveMeditationSession(
        $firestore,
        user.value.uid,
        completedTime
      );
      if (success) {
        // Reload data to update UI
        setTimeout(() => {
          loadMeditationData();
        }, 500);
      }
    } catch (error) {
      console.error("❌ Error saving manual session:", error);
      // Fallback to local stats
      updateLocalStats(completedTime);
    }
  } else if (completedTime > 0) {
    // Update local stats for non-logged-in users
    updateLocalStats(completedTime);
  }

  activeSession.value = null;
  sessionTimeRemaining.value = 0;
  sessionTotalTime.value = 0;
  isSessionPaused.value = false;

  // Stop music when session ends
  stopMusic();
};

const completeSession = async () => {
  if (sessionInterval) clearInterval(sessionInterval);

  const completedTime = Math.floor(sessionTotalTime.value / 60);
  const { $firestore } = useNuxtApp();

  // Save to Firebase if user is logged in AND firestore is available
  if (user.value?.uid && completedTime > 0 && $firestore) {
    try {
      const success = await saveMeditationSession(
        $firestore,
        user.value.uid,
        completedTime
      );
      if (success) {
        // Small delay to ensure data is written before reading
        setTimeout(() => {
          loadMeditationData();
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Error saving session to Firebase:", error);
      // Fallback to local stats if Firebase save fails
      updateLocalStats(completedTime);
    }
  } else {
    // Update local stats for non-logged-in users
    updateLocalStats(completedTime);
  }

  sessionMessage.value = "🎉 Практика завершена! Отличная работа!";

  setTimeout(() => {
    activeSession.value = null;
    sessionTimeRemaining.value = 0;
    sessionTotalTime.value = 0;
    stopMusic();
  }, 3000);
};

// Helper function to update local stats
const updateLocalStats = (completedTime) => {
  totalSessions.value++;
  totalMinutes.value += completedTime;
  mindfulnessScore.value = Math.min(mindfulnessScore.value + 1, 100);
};

// YouTube Music control methods
const toggleMusic = () => {
  // Toggle mute/unmute
  isMusicPlaying.value = !isMusicPlaying.value;
  if (isMusicPlaying.value) {
    if (youtubePlayer.value && youtubePlayer.value.playVideo) {
      youtubePlayer.value.playVideo();
    } else {
      initYouTubePlayer();
    }
  } else {
    if (youtubePlayer.value && youtubePlayer.value.pauseVideo) {
      youtubePlayer.value.pauseVideo();
    }
  }
};

const stopMusic = () => {
  if (youtubePlayer.value && youtubePlayer.value.pauseVideo) {
    youtubePlayer.value.pauseVideo();
  }
  isMusicPlaying.value = false;
};

const updateVolume = () => {
  if (youtubePlayer.value && youtubePlayer.value.setVolume) {
    youtubePlayer.value.setVolume(musicVolume.value);
  }
  resetVolumeHideTimer();
};

const toggleVolumeSlider = () => {
  showVolumeSlider.value = !showVolumeSlider.value;
  // Clear any existing timer when toggling
  clearTimeout(volumeHideTimer);
};

const hideVolumeSlider = () => {
  showVolumeSlider.value = false;
  clearTimeout(volumeHideTimer);
};

const resetVolumeHideTimer = () => {
  clearTimeout(volumeHideTimer);
  volumeHideTimer = setTimeout(() => {
    showVolumeSlider.value = false;
  }, 2000); // Auto-hide 2 seconds after volume change
};

const handleVolumeBarClick = (event) => {
  const bar = event.currentTarget;
  const rect = bar.getBoundingClientRect();
  const clickY = event.clientY - rect.top;
  const barHeight = rect.height;

  // Calculate volume (inverted because we want bottom = 100%, top = 0%)
  const newVolume = Math.round(((barHeight - clickY) / barHeight) * 100);
  musicVolume.value = Math.max(0, Math.min(100, newVolume));

  // If music is not playing and user changes volume, start playing
  if (!isMusicPlaying.value && musicVolume.value > 0) {
    isMusicPlaying.value = true;
    if (youtubePlayer.value && youtubePlayer.value.playVideo) {
      youtubePlayer.value.playVideo();
    } else {
      initYouTubePlayer();
    }
  }

  updateVolume();
  resetVolumeHideTimer();
};

const initYouTubePlayer = () => {
  if (process.client && !youtubePlayer.value) {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  }
};

const createPlayer = () => {
  youtubePlayer.value = new window.YT.Player("youtube-player", {
    height: "0",
    width: "0",
    videoId: MEDITATION_MUSIC_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: MEDITATION_MUSIC_VIDEO_ID,
      start: 16, // Start at 16 seconds to skip intro
    },
    events: {
      onReady: (event) => {
        isYouTubeReady.value = true;
        event.target.setVolume(musicVolume.value);
        event.target.seekTo(16, true); // Seek to 16 seconds
        event.target.playVideo();
        isMusicPlaying.value = true;
      },
      onStateChange: (event) => {
        // YouTube Player States: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
        if (event.data === 0) {
          // Video ended, restart from beginning (16 seconds)
          event.target.seekTo(16, true);
          event.target.playVideo();
        } else if (event.data === 1) {
          // Playing
          isMusicPlaying.value = true;
        } else if (event.data === 2) {
          // Paused
          if (isMusicPlaying.value && !isSessionPaused.value) {
            // If we expect it to be playing but it paused, resume it
            event.target.playVideo();
          }
        }
      },
    },
  });
};

onUnmounted(() => {
  if (sessionInterval) clearInterval(sessionInterval);
  stopMusic();
});

// Load data on mount
onMounted(() => {
  // Listen for auth state changes (client-side only)
  if (process.client) {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      isAuthReady.value = true;

      if (firebaseUser) {
        loadMeditationData();
      } else {
        // User is not logged in, use local data
        weeklyProgress.value = [
          { day: "Пн", minutes: 0 },
          { day: "Вт", minutes: 0 },
          { day: "Ср", minutes: 0 },
          { day: "Чт", minutes: 0 },
          { day: "Пт", minutes: 0 },
          { day: "Сб", minutes: 0 },
          { day: "Вс", minutes: 0 },
        ];
      }
    });

    // Cleanup on unmount
    onUnmounted(() => {
      unsubscribe();
    });
  }
});
</script>

<style scoped>
.stat-card {
  @apply bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none;
}

.achievement-card {
  @apply bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 text-center transition-all duration-300 shadow-sm dark:shadow-none;
}

.achievement-unlocked {
  @apply border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/5 hover:scale-105;
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

/* Blur Fade Transition for Guidance Text */
.blur-fade-enter-active,
.blur-fade-leave-active {
  transition: all 1s ease;
}

.blur-fade-enter-from,
.blur-fade-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: scale(0.98);
}

.blur-fade-enter-to,
.blur-fade-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
</style>
