<!-- pages/space/psychology/mindfulness.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-black px-6 py-8 transition-colors duration-500">
    <div class="max-w-7xl mx-auto space-y-12">
      <Breadcrumbs />

      <!-- Header -->
      <div v-if="!activeSession" class="space-y-4">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
          Осознанность<br /><span class="text-cyan-600 dark:text-cyan-400">&</span> Медитация
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-2xl">
          Практики присутствия, медитативные техники и ваш путь к внутреннему спокойствию в цифровой лаборатории.
        </p>
      </div>

      <!-- Active Session Display (Immersive Mode) -->
      <transition name="slide-up">
        <div v-if="activeSession"
          class="bg-zinc-900 dark:bg-zinc-950 rounded-[3rem] p-8 md:p-16 border border-zinc-800 shadow-2xl relative overflow-hidden ring-1 ring-white/5">

          <!-- Meditation Visuals Background -->
          <div class="absolute inset-0 opacity-40">
            <MeditationVisuals :is-active="!isSessionPaused" :intensity="0.5" />
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent pointer-events-none">
          </div>

          <div class="relative z-10 max-w-4xl mx-auto">
            <!-- Top Controls -->
            <div class="absolute -top-4 -right-4 md:top-0 md:right-0 flex items-center gap-4">
              <div class="relative flex items-center">
                <transition name="fade">
                  <div v-if="showVolumeSlider"
                    class="mr-4 w-32 h-2 bg-zinc-800 rounded-full cursor-pointer relative group overflow-hidden"
                    @click="handleVolumeBarClick">
                    <div class="absolute inset-0 bg-cyan-500/20"></div>
                    <div class="h-full bg-cyan-500 transition-all duration-150" :style="{ width: `${musicVolume}%` }">
                    </div>
                  </div>
                </transition>

                <button @click="toggleVolumeSlider"
                  class="w-12 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-cyan-400 flex items-center justify-center transition-all duration-300 border border-zinc-700">
                  <i :class="isMusicPlaying ? 'fas fa-music' : 'fas fa-volume-mute'"></i>
                </button>
              </div>
            </div>

            <!-- Session Indicator -->
            <div class="text-center mb-10">
              <div
                class="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-zinc-800/80 border border-zinc-700 backdrop-blur-md mb-6">
                <i :class="activeSession.icon" class="text-cyan-400"></i>
                <span class="text-zinc-300 font-black uppercase tracking-widest text-[10px]">{{ activeSession.title
                }}</span>
              </div>
            </div>

            <!-- Guidance Text (Centerpiece) -->
            <div class="h-48 md:h-64 flex items-center justify-center mb-12">
              <transition name="blur-fade" mode="out-in">
                <div :key="currentInstruction ? currentInstruction.text : 'default'" class="text-center space-y-6">
                  <p v-if="currentInstruction"
                    class="text-4xl md:text-5xl font-black leading-tight tracking-tighter text-white uppercase italic drop-shadow-2xl">
                    {{ currentInstruction.text }}
                  </p>
                  <p v-else class="text-zinc-500 font-black tracking-widest uppercase text-sm">
                    {{ sessionMessage }}
                  </p>
                </div>
              </transition>
            </div>

            <!-- Breathing Sphere -->
            <div class="flex justify-center mb-16 relative">
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] transition-all duration-[4000ms] ease-in-out pointer-events-none"
                :class="{ 'scale-150 opacity-100': isBreathingIn, 'scale-100 opacity-40': !isBreathingIn }"></div>

              <div class="relative w-56 h-56 flex items-center justify-center">
                <!-- Outer Progress Ring -->
                <svg class="absolute inset-0 transform -rotate-90 w-56 h-56">
                  <circle cx="112" cy="112" r="108" stroke="currentColor" stroke-width="1" fill="none"
                    class="text-zinc-800" />
                  <circle cx="112" cy="112" r="108" stroke="currentColor" stroke-width="2" fill="none"
                    class="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000"
                    :style="{
                      strokeDasharray: `${2 * Math.PI * 108}`,
                      strokeDashoffset: `${2 * Math.PI * 108 * (1 - sessionProgress)}`,
                    }" stroke-linecap="round" />
                </svg>

                <!-- Core Breathing Sphere -->
                <div
                  class="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all duration-[4000ms] ease-in-out z-10 border border-white/20"
                  :class="breathingScale">
                  <div class="text-white text-center">
                    <div class="text-xs font-black uppercase tracking-widest mb-1">{{ currentBreathingPhase }}</div>
                    <div v-if="breathingPhaseTimer < 20" class="text-3xl font-black tabular-nums tracking-tighter">
                      {{ breathingPhaseTimer }}<span class="text-sm">с</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timer & Controls -->
            <div class="space-y-10">
              <div class="text-center">
                <span class="text-6xl md:text-8xl font-black text-zinc-800 tabular-nums tracking-tight">
                  {{ formatTime(sessionTimeRemaining) }}
                </span>
              </div>

              <div class="flex flex-wrap justify-center gap-4">
                <button v-if="!isSessionPaused" @click="pauseSession"
                  class="px-12 py-5 rounded-2xl bg-zinc-800 text-white font-black uppercase tracking-widest text-[10px] hover:bg-zinc-700 transition-all border border-zinc-700 shadow-xl">
                  <i class="fas fa-pause mr-2"></i>
                  Пауза
                </button>
                <button v-else @click="resumeSession"
                  class="px-12 py-5 rounded-2xl bg-cyan-500 text-white font-black uppercase tracking-widest text-[10px] hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-500/20">
                  <i class="fas fa-play mr-2"></i>
                  Продолжить
                </button>
                <button @click="endSession"
                  class="px-12 py-5 rounded-2xl bg-zinc-800 text-red-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all border border-red-500/20">
                  <i class="fas fa-stop mr-2"></i>
                  Завершить
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Main Content Grids -->
      <div v-if="!activeSession" class="space-y-24">

        <!-- Meditation Grid -->
        <section class="space-y-10">
          <div class="flex items-end justify-between border-b-2 border-zinc-900 pb-4">
            <h2 class="text-4xl font-black uppercase tracking-tighter leading-none">
              Медитативные <span class="text-cyan-600">Практики</span>
            </h2>
            <div class="hidden md:block text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {{ meditationTechniques.length }} ТЕХНИК ДОСТУПНО
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MeditationCard v-for="technique in meditationTechniques" :key="technique.id" :technique="technique"
              @start="(tech, dur) => startMeditation(tech, dur)" />
          </div>
        </section>

        <!-- Breathing Exercises -->
        <section class="space-y-10">
          <div class="flex items-end justify-between border-b-2 border-zinc-900 pb-4">
            <h2 class="text-4xl font-black uppercase tracking-tighter leading-none">
              Дыхательная <span class="text-purple-600">Инженерия</span>
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BreathingCard v-for="breathing in breathingExercises" :key="breathing.id" :exercise="breathing"
              @start="(ex, dur) => startBreathing(ex, dur)" />
          </div>
        </section>

        <!-- Mindfulness Activities -->
        <section class="space-y-10">
          <div class="flex items-end justify-between border-b-2 border-zinc-900 pb-4">
            <h2 class="text-4xl font-black uppercase tracking-tighter leading-none">
              Протоколы <span class="text-orange-600">Осознанности</span>
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MindfulnessActivityCard v-for="activity in mindfulnessActivities" :key="activity.id" :activity="activity"
              @start="startActivity(activity)" />
          </div>
        </section>

        <!-- Stats & Tracking -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
          <!-- Weekly Progress -->
          <div class="bg-zinc-900 rounded-[3rem] p-10 md:p-12 border border-zinc-800 shadow-2xl">
            <div class="flex items-center justify-between mb-12">
              <h3 class="text-3xl font-black text-white uppercase tracking-tighter">
                Активность
              </h3>
              <div
                class="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <i class="fas fa-chart-line text-cyan-400"></i>
              </div>
            </div>

            <ClientOnly>
              <div v-if="!user" class="text-center py-10 space-y-6">
                <div
                  class="w-24 h-24 bg-zinc-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-zinc-700 shadow-2xl">
                  <i class="fas fa-lock text-3xl text-zinc-600"></i>
                </div>
                <p class="text-zinc-500 font-medium max-w-xs mx-auto">Авторизуйтесь для сохранения прогресса и
                  разблокировки аналитики.</p>
                <NuxtLink to="/login"
                  class="inline-block px-10 py-4 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500 hover:text-white transition-all">
                  Авторизация
                </NuxtLink>
              </div>

              <div v-else class="space-y-6">
                <div class="space-y-4 mb-10">
                  <div v-for="day in weeklyProgress" :key="day.day" class="flex items-center gap-4">
                    <div class="w-10 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                      {{ day.day }}
                    </div>
                    <div class="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden relative">
                      <div class="h-full bg-cyan-500 transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                        :style="{ width: `${Math.min((day.minutes / 60) * 100, 100)}%` }"></div>
                    </div>
                    <div class="w-16 text-right text-zinc-300 font-mono text-xs font-bold">{{ day.minutes }}м</div>
                  </div>
                </div>

                <div class="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700 flex items-center justify-between">
                  <span class="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Среднее / День</span>
                  <span class="text-2xl font-black text-white uppercase italic tracking-tighter">{{ averageDaily }}
                    мин</span>
                </div>
              </div>
            </ClientOnly>
          </div>

          <!-- Achievements -->
          <div
            class="bg-zinc-100 dark:bg-zinc-900/40 rounded-[3rem] p-10 md:p-12 border border-zinc-200 dark:border-zinc-800">
            <div class="flex items-center justify-between mb-12">
              <h3 class="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                Достижения
              </h3>
              <div
                class="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                <i class="fas fa-trophy text-purple-400"></i>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div v-for="achievement in achievements" :key="achievement.id"
                class="p-4 rounded-3xl border text-center transition-all duration-500 group" :class="achievement.unlocked
                  ? 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-xl scale-100'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800/50 opacity-40 grayscale scale-95'
                  ">
                <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-500">{{ achievement.icon
                }}</div>
                <div class="text-[10px] font-black uppercase tracking-widest leading-tight"
                  :class="achievement.unlocked ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'">
                  {{ achievement.title }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Resources & Tips (Editorial Style) -->
        <section class="bg-zinc-900 rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
          <div class="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-0"></div>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div class="space-y-12">
              <div class="space-y-4">
                <h3 class="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                  Гид по <br /><span class="text-purple-500">Глубине</span>
                </h3>
                <p class="text-zinc-500 font-medium">Краткие протоколы для повышения качества вашей практики.</p>
              </div>

              <div class="space-y-6">
                <div class="flex gap-6 group">
                  <div
                    class="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700 group-hover:bg-purple-500 group-hover:border-transparent transition-all duration-500 shrink-0">
                    <i class="fas fa-lightbulb text-white text-xl"></i>
                  </div>
                  <div class="space-y-1">
                    <h4 class="text-lg font-black text-white uppercase tracking-tight">Создайте пространство</h4>
                    <p class="text-stone-500 text-sm leading-relaxed">Найдите место без сенсорных раздражителей. Тишина
                      — это архитектура фокуса.</p>
                  </div>
                </div>

                <div class="flex gap-6 group">
                  <div
                    class="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700 group-hover:bg-cyan-500 group-hover:border-transparent transition-all duration-500 shrink-0">
                    <i class="fas fa-clock text-white text-xl"></i>
                  </div>
                  <div class="space-y-1">
                    <h4 class="text-lg font-black text-white uppercase tracking-tight">Биологический ритм</h4>
                    <p class="text-stone-500 text-sm leading-relaxed">Регулярность важнее интенсивности. 5 минут каждое
                      утро перестраивают нейронные связи.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-zinc-800/40 rounded-[3rem] p-10 border border-zinc-700 space-y-8">
              <h4 class="text-2xl font-black text-white uppercase tracking-tighter">Функциональные бенефиты</h4>
              <div class="grid grid-cols-1 gap-4">
                <div v-for="benefit in [
                  { title: 'Нейропластичность', desc: 'Укрепление префронтальной коры', icon: 'fa-brain', color: 'text-cyan-400' },
                  { title: 'Гомеостаз', desc: 'Снижение уровня кортизола', icon: 'fa-shield-alt', color: 'text-purple-400' },
                  { title: 'Когниция', desc: 'Повышение рабочей памяти', icon: 'fa-target', color: 'text-orange-400' }
                ]" :key="benefit.title"
                  class="flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <i :class="['fas', benefit.icon, benefit.color]" class="text-xl w-8 text-center"></i>
                  <div>
                    <div class="text-sm font-black text-white uppercase tracking-widest">{{ benefit.title }}</div>
                    <div class="text-xs text-zinc-500">{{ benefit.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Hidden YouTube Player for Background Music -->
    <div id="youtube-player" style="display: none"></div>
  </div>
</template>

<script setup>
import MeditationCard from "~/components/space/psychology/MeditationCard.vue";
import BreathingCard from "~/components/space/psychology/BreathingCard.vue";
import MindfulnessActivityCard from "~/components/space/psychology/MindfulnessActivityCard.vue";
import MeditationVisuals from "~/components/space/psychology/MeditationVisuals.vue";
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

useHead({
  title: "Медитация и Осознанность",
  meta: [
    {
      name: "description",
      content:
        "Практики осознанности, медитации и дыхательные упражнения для улучшения ментального здоровья и снижения стресса.",
    },
    {
      property: "og:title",
      content: "Медитация и Осознанность | MindQ Lab",
    },
    {
      property: "og:description",
      content:
        "Практики осознанности, медитации и дыхательные упражнения для улучшения ментального здоровья и снижения стресса.",
    },
    {
      property: "og:image",
      content: "/images/mindfulness-og.jpg", // Assuming an image exists or will be added, using a placeholder for now
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
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
  @apply bg-white dark:bg-zinc-800/30 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-700/50 shadow-sm dark:shadow-none transition-all duration-500;
}

/* Animations */
.slide-up-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.7, 0, 0.84, 0);
}

.slide-up-enter-from {
  transform: translateY(100px);
  opacity: 0;
  filter: blur(20px);
}

.slide-up-leave-to {
  transform: translateY(-50px);
  opacity: 0;
  filter: blur(10px);
}

/* Blur Fade Transition for Guidance Text */
.blur-fade-enter-active,
.blur-fade-leave-active {
  transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.blur-fade-enter-from,
.blur-fade-leave-to {
  opacity: 0;
  filter: blur(15px);
  transform: scale(0.95);
}

.blur-fade-enter-to,
.blur-fade-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}

/* Custom Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
