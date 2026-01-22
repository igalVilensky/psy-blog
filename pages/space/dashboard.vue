<!-- pages/space/dashboard.vue -->
<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-500 relative">
    <!-- Dynamic Loading State -->
    <div v-if="loading"
      class="absolute inset-0 z-50 bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-4">
      <div class="relative w-24 h-24 mb-8">
        <!-- Neural-like Spinner -->
        <div class="absolute inset-0 rounded-full border-4 border-stone-200 dark:border-stone-800"></div>
        <div class="absolute inset-0 rounded-full border-4 border-stone-900 border-t-transparent animate-spin">
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <i class="fas fa-brain text-4xl text-stone-900 dark:text-white animate-pulse"></i>
        </div>
      </div>
      <div class="text-center space-y-2">
        <h3 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-widest animate-pulse">Загрузка
          Данных</h3>
        <p class="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wide">Синхронизация профиля...
        </p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />

      <!-- Unauthorized State -->
      <DashboardGuestView v-if="!authStore.user" />

      <!-- Dashboard Content (Authorized Only) -->
      <div v-else class="space-y-12 pb-24">

        <!-- Pillar 0: Hero & Insight -->
        <DashboardHero :user-name="authStore.user?.displayName" :streak="metrics.streakDays"
          :last-activity="exercisesList[0]" @quick-action="handleQuickAction" />

        <!-- Tab Navigation - Profile Style -->
        <div class="border-b border-stone-200 dark:border-stone-800 mb-8">
          <nav class="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
              activeTab === tab.id
                ? 'border-stone-900 dark:border-white text-stone-900 dark:text-white'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 dark:text-stone-400 dark:hover:text-stone-300 dark:hover:border-stone-700',
              'whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm uppercase tracking-wider transition-colors duration-200 flex items-center gap-2'
            ]">
              <i :class="tab.icon"></i>
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Pillar Content with Transition -->
        <Transition mode="out-in" name="fade">
          <!-- Pillar 1: Identity (Personality & Soul) -->
          <section v-if="activeTab === 'identity'" key="identity" id="identity">
            <IdentityPillar :traits="personalityTraits" :archetypes="archetypeScores" :achievements="achievements" />
          </section>

          <!-- Pillar 2: Cognition (Brain Performance) -->
          <section v-else-if="activeTab === 'cognition'" key="cognition" id="cognition">
            <CognitivePillar :summary="trainingSummary" :exercises="exercisesList" :heatmap="heatmapData"
              :total-active-days="metrics.totalActiveDays" @select-exercise="openExerciseDetails" />
          </section>

          <!-- Pillar 3: Emotion (Mental Balance) -->
          <section v-else-if="activeTab === 'emotion'" key="emotion" id="emotion">
            <EmotionalPillar :intensity="animatedStats.averageIntensity.toFixed(1)"
              :common-emotion="emotionBarometerStats.mostCommonEmotion" :total-entries="animatedStats.emotionEntries" />
          </section>
        </Transition>

        <!-- Secondary Cognitive Test Results -->
        <div v-if="testResultsList.length > 0"
          class="mt-12 bg-white dark:bg-stone-900 p-8 border border-stone-200 dark:border-stone-800 border-l-4 border-l-stone-900 dark:border-l-white">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
              Результаты Тестов</h2>
            <NuxtLink to="/space/tests"
              class="text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center gap-2 transition-colors">
              Библиотека тестов <i class="fas fa-arrow-right"></i>
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="test in testResultsList" :key="test.id"
              class="p-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 transition-all hover:border-stone-400 dark:hover:border-stone-500 group">
              <div class="flex items-center gap-3 mb-3">
                <div
                  class="w-8 h-8 bg-white dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700">
                  <i :class="test.icon"
                    class="text-sm text-stone-400 group-hover:text-stone-900 dark:text-stone-500 dark:group-hover:text-white transition-colors"></i>
                </div>
                <span class="text-xs font-bold uppercase text-stone-600 dark:text-stone-300 truncate">{{ test.title
                }}</span>
              </div>
              <div class="text-xl font-bold text-stone-900 dark:text-white">{{ test.score }}{{ test.unit }}
              </div>
              <div class="text-[10px] text-stone-400 uppercase tracking-wide mt-1">Лучший: {{ test.lastPlayed }}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-12">
          <button @click="refreshData"
            class="flex items-center gap-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <i class="fas fa-sync" :class="{ 'animate-spin': loading }"></i>
            ОБНОВИТЬ ДАННЫЕ
          </button>
        </div>
      </div>

      <!-- Exercise Details Modal - Simplified -->
      <div v-if="isExerciseModalOpen" class="relative z-50">
        <div class="fixed inset-0 bg-stone-900/80 backdrop-blur-sm transition-opacity" @click="closeExerciseModal">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div
              class="w-full max-w-2xl transform overflow-hidden bg-white dark:bg-stone-900 p-8 text-left align-middle shadow-xl transition-all border-2 border-stone-900 dark:border-white"
              @click.stop>
              <div
                class="flex items-center justify-between mb-6 border-b-2 border-stone-100 dark:border-stone-800 pb-4">
                <div class="flex items-center space-x-4">
                  <div v-if="selectedExercise"
                    class="w-12 h-12 flex items-center justify-center bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <i :class="selectedExercise.icon" class="text-xl text-stone-900 dark:text-white"></i>
                  </div>
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-wide">{{
                    selectedExercise?.title }}</h3>
                </div>
                <button @click="closeExerciseModal"
                  class="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>

              <div class="space-y-8" v-if="selectedExercise">
                <!-- Stats Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    class="bg-stone-50 dark:bg-stone-800 p-4 border border-stone-200 dark:border-stone-700 text-center">
                    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                      Средний
                    </div>
                    <div class="text-xl font-bold text-stone-900 dark:text-white">
                      {{ selectedExercise.avgScore }}{{ selectedExercise.unit }}
                    </div>
                  </div>
                  <div class="bg-stone-50 dark:bg-stone-800 p-4 border-l-4 border-emerald-500 text-center">
                    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                      Лучший
                    </div>
                    <div class="text-xl font-bold text-stone-900 dark:text-white">
                      {{ selectedExercise.bestScore }}{{ selectedExercise.unit }}
                    </div>
                  </div>
                  <div
                    class="bg-stone-50 dark:bg-stone-800 p-4 border border-stone-200 dark:border-stone-700 text-center">
                    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                      Сессий
                    </div>
                    <div class="text-xl font-bold text-stone-900 dark:text-white">
                      {{ selectedExercise.playCount || selectedExercise.totalSessions || 0 }}
                    </div>
                  </div>
                  <div class="bg-stone-50 dark:bg-stone-800 p-4 border-l-4 border-purple-500 text-center">
                    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                      Уровень
                    </div>
                    <div class="text-xl font-bold text-stone-900 dark:text-white">
                      {{ Math.floor((selectedExercise.totalSessions || 0) / 5) + 1 }}
                    </div>
                  </div>
                </div>

                <!-- History List -->
                <div>
                  <h4 class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">
                    История сессий
                  </h4>
                  <div
                    class="max-h-48 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-600">
                    <div v-for="(session, index) in selectedExercise.history || []" :key="index"
                      class="flex items-center justify-between p-3 border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                      <div class="flex items-center space-x-3">
                        <div class="w-1.5 h-1.5" :class="session.score >= 80
                          ? 'bg-emerald-500'
                          : session.score >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                          "></div>
                        <span class="text-xs font-mono text-stone-500">{{
                          formatDate(session.date)
                        }}</span>
                      </div>
                      <span class="font-bold text-sm text-stone-900 dark:text-white">
                        {{ session.score }}{{ selectedExercise.unit }}
                      </span>
                    </div>
                    <div v-if="!selectedExercise.history?.length"
                      class="text-center py-4 text-xs text-stone-400 italic">
                      История пуста
                    </div>
                  </div>
                </div>

                <div class="flex justify-end gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button type="button"
                    class="px-6 py-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                    @click="closeExerciseModal">
                    Закрыть
                  </button>
                  <NuxtLink :to="selectedExercise.link"
                    class="px-6 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors">
                    <i class="fas fa-play mr-2"></i>
                    Начать
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
import DashboardHero from "~/components/space/dashboard/DashboardHero.vue";
import IdentityPillar from "~/components/space/dashboard/IdentityPillar.vue";
import CognitivePillar from "~/components/space/dashboard/CognitivePillar.vue";
import EmotionalPillar from "~/components/space/dashboard/EmotionalPillar.vue";

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
const animatedStats = reactive({
  emotionEntries: 0,
  averageIntensity: 0,
});
const activeTab = ref('identity');
const tabs = [
  { id: 'identity', label: 'Идентичность', icon: 'fas fa-fingerprint' },
  { id: 'cognition', label: 'Когниция', icon: 'fas fa-brain' },
  { id: 'emotion', label: 'Эмоции', icon: 'fas fa-heart-pulse' },
];
const sessionId = computed(() => `LAB-${Date.now().toString(36).toUpperCase()}`);

const handleQuickAction = (action) => {
  if (action === 'test') router.push('/space/tests');
  if (action === 'emotion') router.push('/space/growth/emotional-compass');
  if (action === 'archetypes') viewArchetypes();
};

// --- STATE from ANALYSIS ---
const selectedPeriod = ref("month");
const activeMetric = ref(null);
const patternResults = ref([]);
const mentalShiftResults = ref([]);
const targetTrackingResults = ref([]);
const doubleGameResults = ref([]);
const nbackTestResults = ref([]);
const nbackTrainingResults = ref([]);
const digitSpanResults = ref([]);
const trailMakingResults = ref([]);
const anagramResults = ref([]);
const logicPairsResults = ref([]);
const ravenResults = ref([]);
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
  const totalSessions = patternResults.value.length + mentalShiftResults.value.length + targetTrackingResults.value.length + anagramResults.value.length + logicPairsResults.value.length + ravenResults.value.length;
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
  patternResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  // 2. Mental Shift Results
  mentalShiftResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  // 3. Big 5 Result
  if (big5Result.value) addInteraction(big5Result.value.timestamp || big5Result.value.createdAt);
  // 4. Assessment Result
  if (assessmentTimestamp.value) addInteraction(assessmentTimestamp.value);
  // 5. Double Game Results
  doubleGameResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  // 6. New Tests Results
  nbackTestResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  nbackTrainingResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  digitSpanResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  trailMakingResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  // 7. Anagram Results
  anagramResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  // 8. Logic Pairs Results
  logicPairsResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));
  // 9. Raven Results
  ravenResults.value.forEach(r => addInteraction(r.timestamp || r.createdAt));

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
      title: "Поиск паттернов",
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
      title: "Переключение",
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
      title: "Слежение за целью",
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
      title: "Дубль",
      category: "Внимание",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-clone text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-500/10",
      history: history,
      link: "/space/brain-training/double",
      unit: ''
    });
  }

  // N-Back Training
  if (nbackTrainingResults.value.length > 0) {
    const history = nbackTrainingResults.value.map(r => ({
      date: (r.timestamp || r.createdAt) ? new Date((r.timestamp || r.createdAt).seconds * 1000) : new Date(),
      score: r.score || 0
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "nback-training",
      title: "N-Back Тренировка",
      category: "Память",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-brain text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-500/10",
      history: history,
      link: "/space/brain-training/nback",
      unit: ''
    });
  }

  // Anagrams
  if (anagramResults.value.length > 0) {
    const history = anagramResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.score || 0
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "anagrams",
      title: "Анаграммы",
      category: "Вербальность",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-font text-cyan-600 dark:text-cyan-400",
      bgClass: "bg-cyan-500/10",
      history: history,
      link: "/space/brain-training/anagrams",
      unit: ''
    });
  }

  // Logic Pairs
  if (logicPairsResults.value.length > 0) {
    const history = logicPairsResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.score || 0
    }));

    const scores = history.map(h => h.score);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const last = history[0].date.toLocaleDateString("ru-RU");

    list.push({
      id: "logic-pairs",
      title: "Логические Пары",
      category: "Логика",
      avgScore: avg,
      bestScore: best,
      lastPlayed: last,
      totalSessions: history.length,
      icon: "fas fa-th-large text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-500/10",
      history: history,
      link: "/space/brain-training/logic-pairs",
      unit: ''
    });
  }

  return list.sort((a, b) => b.totalSessions - a.totalSessions);
});

const testResultsList = computed(() => {
  const list = [];

  // Digit Span
  if (digitSpanResults.value.length > 0) {
    const history = digitSpanResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.total || r.score || 0,
      level: r.maxLevel || 0
    }));
    const best = Math.max(...history.map(h => h.score));
    list.push({
      id: "digit-span",
      title: "Объем памяти",
      category: "Рабочая память",
      score: best,
      unit: " цифр",
      lastPlayed: history[0].date.toLocaleDateString("ru-RU"),
      icon: "fas fa-sort-numeric-down text-blue-500",
      bgClass: "bg-blue-500/10"
    });
  }

  // N-Back Test
  if (nbackTestResults.value.length > 0) {
    const history = nbackTestResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.score || 0,
      accuracy: r.accuracy || 0
    }));
    const bestAccuracy = Math.max(...history.map(h => h.accuracy));
    list.push({
      id: "nback-test",
      title: "N-Back Тест",
      category: "Флюидный интеллект",
      score: bestAccuracy,
      unit: "%",
      lastPlayed: history[0].date.toLocaleDateString("ru-RU"),
      icon: "fas fa-braille text-purple-500",
      bgClass: "bg-purple-500/10"
    });
  }

  // Trail Making Test
  if (trailMakingResults.value.length > 0) {
    const history = trailMakingResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.baRatio || r.score || 0,
      time: r.totalTime || 0
    }));
    // For Trail Making, a lower baRatio is better, but we display the latest or "best" in a sense.
    // Usually, we just show the most recent or the best score.
    const latest = history[0].score;
    list.push({
      id: "trail-making",
      title: "TMT Тест",
      category: "Когнитивная гибкость",
      score: latest,
      unit: " (B/A)",
      lastPlayed: history[0].date.toLocaleDateString("ru-RU"),
      icon: "fas fa-pen-nib text-emerald-500",
      bgClass: "bg-emerald-500/10"
    });
  }

  // Raven's Matrices
  if (ravenResults.value.length > 0) {
    const history = ravenResults.value.map(r => ({
      date: r.timestamp ? new Date(r.timestamp.seconds * 1000) : new Date(),
      score: r.iqEstimation || (r.score * 5 + 70)
    }));
    const best = Math.max(...history.map(h => h.score));
    list.push({
      id: "raven",
      title: "Матрицы Равена",
      category: "Абстрактная логика",
      score: best,
      unit: " IQ",
      lastPlayed: history[0].date.toLocaleDateString("ru-RU"),
      icon: "fas fa-th text-blue-500",
      bgClass: "bg-blue-500/10"
    });
  }

  return list;
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
  const totalNback = nbackTrainingResults.value.length;
  const totalAnagrams = anagramResults.value.length;
  const totalLogicPairs = logicPairsResults.value.length;
  const totalRaven = ravenResults.value.length;
  const completed = totalPatterns + totalShift + totalNback + totalAnagrams + totalLogicPairs + totalRaven;

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
  // Объединяем результаты всех тренировок и тестов
  const allResults = [
    ...patternResults.value,
    ...mentalShiftResults.value,
    ...targetTrackingResults.value,
    ...doubleGameResults.value,
    ...nbackTrainingResults.value,
    ...nbackTestResults.value,
    ...digitSpanResults.value,
    ...trailMakingResults.value,
    ...anagramResults.value,
    ...logicPairsResults.value,
    ...ravenResults.value
  ];
  if (allResults.length === 0) return 0;

  const total = allResults.reduce((acc, curr) => {
    // Normalization logic
    if (curr.accuracy !== undefined) return acc + curr.accuracy;

    // Digit Span total digits
    if (curr.total !== undefined && curr.forward !== undefined) {
      return acc + Math.min(100, (curr.total / 18) * 100);
    }

    // TMT baRatio
    if (curr.baRatio !== undefined && curr.partA !== undefined) {
      // ratio 2.0 is perfect (100%), ratio 4.0 is 60%, ratio 6 is 20%
      const normalizedTmt = Math.max(10, 100 - (curr.baRatio - 2.0) * 20);
      return acc + Math.min(100, normalizedTmt);
    }

    if (curr.score !== undefined) return acc + (curr.score > 200 ? 100 : (curr.score > 100 ? (curr.score / 160) * 100 : curr.score));
    if (curr.iqEstimation !== undefined) return acc + Math.min(100, (curr.iqEstimation / 140) * 100);
    return acc;
  }, 0);

  return Math.round(total / allResults.length) || 0;
}

function calculateStreak() {
  const allResults = [
    ...patternResults.value,
    ...mentalShiftResults.value,
    ...targetTrackingResults.value,
    ...doubleGameResults.value,
    ...nbackTrainingResults.value,
    ...nbackTestResults.value,
    ...digitSpanResults.value,
    ...trailMakingResults.value,
    ...anagramResults.value,
    ...logicPairsResults.value,
    ...ravenResults.value
  ];
  const days = new Set(allResults.map(r => {
    const timestamp = r.createdAt || r.timestamp;
    if (!timestamp) return null;
    return new Date(timestamp.seconds * 1000).toDateString();
  }).filter(Boolean));
  return days.size;
}
function processHeatmapData(allResults) {
  const map = {};
  const now = new Date();
  allResults.forEach(res => {
    const ts = res.timestamp || res.createdAt;
    if (!ts) return;
    const date = new Date(ts.seconds * 1000);
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

    // Double Game Results
    const qDouble = query(collection(db, `users/${authStore.user.uid}/doubleGameResults`), orderBy("timestamp", "desc"));
    const snapshotDouble = await getDocs(qDouble);
    doubleGameResults.value = snapshotDouble.docs.map(doc => doc.data());

    // N-Back Test Results
    const qNbackTest = query(collection(db, `users/${authStore.user.uid}/nbackTestResults`), orderBy("timestamp", "desc"));
    const snapshotNbackTest = await getDocs(qNbackTest);
    nbackTestResults.value = snapshotNbackTest.docs.map(doc => doc.data());

    // N-Back Training Results
    const qNbackTraining = query(collection(db, `users/${authStore.user.uid}/nbackTrainingResults`), orderBy("timestamp", "desc"));
    const snapshotNbackTraining = await getDocs(qNbackTraining);
    nbackTrainingResults.value = snapshotNbackTraining.docs.map(doc => doc.data());

    // Digit Span Results
    const qDigitSpan = query(collection(db, `users/${authStore.user.uid}/digitSpanResults`), orderBy("timestamp", "desc"));
    const snapshotDigitSpan = await getDocs(qDigitSpan);
    digitSpanResults.value = snapshotDigitSpan.docs.map(doc => doc.data());

    // Trail Making Results
    const qTrailMaking = query(collection(db, `users/${authStore.user.uid}/trailMakingResults`), orderBy("timestamp", "desc"));
    const snapshotTrailMaking = await getDocs(qTrailMaking);
    trailMakingResults.value = snapshotTrailMaking.docs.map(doc => doc.data());

    // Anagram Results
    const qAnagrams = query(collection(db, `users/${authStore.user.uid}/anagramResults`), orderBy("timestamp", "desc"));
    const snapshotAnagrams = await getDocs(qAnagrams);
    anagramResults.value = snapshotAnagrams.docs.map(doc => doc.data());

    // Logic Pairs Results
    const qLogicPairs = query(collection(db, `users/${authStore.user.uid}/logicPairsResults`), orderBy("timestamp", "desc"));
    const snapshotLogicPairs = await getDocs(qLogicPairs);
    logicPairsResults.value = snapshotLogicPairs.docs.map(doc => doc.data());

    // Raven Results
    const qRaven = query(collection(db, `users/${authStore.user.uid}/ravenResults`), orderBy("timestamp", "desc"));
    const snapshotRaven = await getDocs(qRaven);
    ravenResults.value = snapshotRaven.docs.map(doc => doc.data());

    // Analysis: Heatmap
    const interactionActivity = [
      ...patternResults.value,
      ...mentalShiftResults.value,
      ...targetTrackingResults.value,
      ...doubleGameResults.value,
      ...nbackTestResults.value,
      ...nbackTrainingResults.value,
      ...digitSpanResults.value,
      ...trailMakingResults.value,
      ...anagramResults.value,
      ...logicPairsResults.value,
      ...ravenResults.value
    ];

    // Include personality tests if they exist
    if (big5Result.value) interactionActivity.push(big5Result.value);
    if (assessmentTimestamp.value) interactionActivity.push({ timestamp: assessmentTimestamp.value });

    processHeatmapData(interactionActivity);

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
