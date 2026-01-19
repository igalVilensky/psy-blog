<template>
  <!-- Loading State -->
  <div
    class="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-500 flex flex-col font-sans">
    <TopBar />

    <div class="flex-1 max-w-7xl mx-auto px-6 sm:px-8 pb-24 pt-12 sm:pt-20 w-full">

      <!-- Profile Header -->
      <ProfileHeader :avatarUrl="avatarUrl" :loading="loading"
        :displayName="authStore.user?.displayName || 'Пользователь'" :email="authStore.user?.email || 'Email не указан'"
        :userInitial="authStore.user?.displayName?.charAt(0).toUpperCase()" @update:avatarUrl="avatarUrl = $event"
        @logout="logoutUser" @notify="handleNotification($event)" />

      <!-- Bio Section -->
      <BioSection :loading="loadingBio" :profession="profession" :socialMedia="socialMedia" :age="age" :gender="gender"
        :aboutYourself="aboutYourself" />

      <!-- Navigation Tabs -->
      <div class="mb-12 border-b border-stone-200 dark:border-stone-800">
        <div class="flex gap-8 overflow-x-auto pb-0 no-scrollbar">
          <button @click="activeTab = 'overview'" class="tab-link pb-4 px-2"
            :class="activeTab === 'overview' ? 'tab-link-active' : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'">
            <span class="text-xs font-bold uppercase tracking-widest">Обзор</span>
          </button>
          <button @click="activeTab = 'flows'" class="tab-link pb-4 px-2"
            :class="activeTab === 'flows' ? 'tab-link-active' : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'">
            <span class="text-xs font-bold uppercase tracking-widest">Потоки</span>
          </button>
        </div>
      </div>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Onboarding CTA -->
        <div class="col-span-1 lg:col-span-2" v-if="!authStore.user?.onboardingCompleted">
          <div
            class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 border-l-4 border-l-stone-900 dark:border-l-white">
            <div>
              <h3 class="text-xl font-bold text-stone-900 dark:text-white mb-3 uppercase tracking-tight">Персональная
                настройка</h3>
              <p class="text-stone-600 dark:text-stone-400 text-sm font-medium">Пройдите короткий опрос, чтобы система
                подготовила для вас индивидуальный план развития.</p>
            </div>
            <NuxtLink to="/onboarding"
              class="px-8 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-stone-800 dark:hover:bg-stone-200 transition-all whitespace-nowrap">
              Начать опрос
            </NuxtLink>
          </div>
        </div>

        <div class="col-span-1 lg:col-span-2" v-else>
          <div
            class="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-l-emerald-500">
            <div>
              <h3 class="text-xl font-bold text-stone-900 dark:text-white mb-2 uppercase tracking-tight">Статус
                профиля: Настроен</h3>
              <p class="text-stone-600 dark:text-stone-400 text-sm font-medium">Ваша персональная карта развития
                построена. Вы можете обновить её в любое время.</p>
            </div>
            <NuxtLink to="/onboarding"
              class="px-8 py-3 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-stone-800 transition-all whitespace-nowrap">
              Обновить оценку
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Lab Flows Tab -->

      <!-- Lab Flows Tab -->
      <div v-if="activeTab === 'flows'" class="flows-section">
        <div class="settings-card">
          <div class="flex items-center gap-3 mb-6">
            <div class="settings-icon-wrapper">
              <i class="fas fa-stream text-cyan-600 dark:text-cyan-400"></i>
            </div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
              Публичные потоки
            </h2>
          </div>

          <!-- Loading State -->
          <div v-if="loadingFlows" class="loading-state">
            <div class="loading-content">
              <i class="fas fa-spinner fa-spin text-4xl text-cyan-600 dark:text-cyan-400 mb-4"></i>
              <p class="text-gray-700 dark:text-slate-300">Загрузка потоков...</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="publicFlows.length === 0" class="empty-state">
            <div class="empty-content">
              <div class="empty-icon">
                <i class="fas fa-stream text-5xl text-cyan-600 dark:text-cyan-400"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Нет публичных потоков
              </h3>
              <p class="text-gray-600 dark:text-slate-400 mb-6">
                Этот пользователь еще не опубликовал потоки.
              </p>
              <NuxtLink to="/lab/builder" class="start-button">
                <span class="button-gradient"></span>
                <span class="button-content">
                  <i class="fas fa-plus-circle mr-2"></i>
                  Создать поток
                </span>
              </NuxtLink>
            </div>
          </div>

          <!-- Flows Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="flow in publicFlows" :key="flow.id" @click="navigateToFlow(flow.id)"
              class="flow-card-mini group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md cursor-pointer dark:border-slate-700 dark:bg-slate-800">
              <!-- Header -->
              <div class="mb-3">
                <h3 class="truncate text-lg font-bold text-slate-900 dark:text-white">
                  {{ flow.name }}
                </h3>
                <p v-if="flow.description" class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {{ flow.description }}
                </p>
              </div>

              <!-- Badges -->
              <div class="mb-3 flex flex-wrap gap-2">
                <span
                  class="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
                  {{ flowTypes[flow.type] || 'Поток' }}
                </span>
                <span
                  class="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {{ flowCategories[flow.category] || 'Общее' }}
                </span>
              </div>

              <!-- Stats -->
              <div class="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div class="flex items-center gap-1">
                  <i class="fas fa-puzzle-piece"></i>
                  <span>{{ flow.modules?.length || 0 }} модулей</span>
                </div>
                <div v-if="flow.estimatedDuration" class="flex items-center gap-1">
                  <i class="fas fa-clock"></i>
                  <span>~{{ flow.estimatedDuration }} мин</span>
                </div>
                <div v-if="flow.timesUsed > 0" class="flex items-center gap-1">
                  <i class="fas fa-play-circle"></i>
                  <span>{{ flow.timesUsed }}x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <Footer />
    <!-- Notification Component -->
    <Notification v-if="notificationMessage" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-50" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotification } from "@/composables/useNotification";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Chart, registerables } from "chart.js";
import ProfileHeader from "~/components/profile/ProfileHeader.vue";
import BioSection from "~/components/profile/BioSection.vue";
import TopBar from "~/components/navigation/TopBar.vue";
import Footer from "~/components/ui/Footer.vue";
import Button from "~/components/base/Button.vue";
import Notification from "~/components/base/Notification.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";

definePageMeta({
  layout: "empty",
  seo: {
    noindex: true,
    nofollow: true,
  },
});

// Register Chart.js plugins
Chart.register(...registerables);

// Google Drive links for the 12 archetypes
const archetypeGuides = {
  воин: "https://drive.google.com/uc?export=download&id=1Z9XqjKfmXtIuPkpqFjlZf0UeK5uZd4-7",
  мудрец:
    "https://drive.google.com/uc?export=download&id=1jRFDKQh_LeSy_hFS-rBic-qOXhwN1w9d",
  искатель:
    "https://drive.google.com/uc?export=download&id=1t9Eyq6mPBA-Zh1YPkDjtnoAicYIYdnSL",
  творец:
    "https://drive.google.com/uc?export=download&id=1EB-sU__obr0nar984wxVEOWvMGU3LWNg",
  правитель:
    "https://drive.google.com/uc?export=download&id=1kC5TMJUWRAy5pKXOlW4qlAx6PXoe--2g",
  маг: "https://drive.google.com/uc?export=download&id=1r-5W_RuCHRXJX6QOXmmQT8TL7asKvGAQ",
  любовник:
    "https://drive.google.com/uc?export=download&id=1NzU0BGyZGTTqx_1kCnyr97CFbRIg72PN",
  шут: "https://drive.google.com/uc?export=download&id=1Vecj9bKoGI2iRulAjBSMAAe_A0A526BV",
  сирота:
    "https://drive.google.com/uc?export=download&id=1lqXNJNpE2S96t4bioP5ZUHd-tsu_To0B",
  опекун:
    "https://drive.google.com/uc?export=download&id=1MjruEXhQa24RGxpEHiuLszqbu3_1OBeY",
  простодушный:
    "https://drive.google.com/uc?export=download&id=1JLFEcqtBb6rT7QWW6BAwbRi0o17tAJ6E",
  бунтарь:
    "https://drive.google.com/uc?export=download&id=1nET_NObXciLQlL44TB_Jo6qPEmR-4Nd4",
};

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

// Refs for loading states and data
const isLoading = ref(true);
const loading = ref(true);
const loadingBio = ref(true);
const loadingEmotionBarometer = ref(true);
const loadingAssessments = ref(false);
const avatarUrl = ref(null);
const emotionChart = ref(null);
const activeTab = ref("overview");
const chartInstance = ref(null);

// Lab Flows Data
const publicFlows = ref([]);
const loadingFlows = ref(false);

const flowTypes = {
  routine: 'Рутина',
  protocol: 'Протокол',
  session: 'Сессия',
  custom: 'Свободный'
};

const flowCategories = {
  morning: 'Утро',
  evening: 'Вечер',
  stress: 'Стресс',
  focus: 'Фокус',
  sleep: 'Сон',
  growth: 'Рост',
  custom: 'Другое'
};

// Bio Data
const profession = ref("");
const socialMedia = ref("");
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");

// Emotion Barometer Stats
const emotionBarometerStats = ref({
  totalEntries: 0,
  mostCommonEmotion: "",
  averageIntensity: 0,
  mostCommonTag: "",
  emotionDistribution: {},
});

// Psychological Profile Data
const latestAssessment = ref(null);
const assessmentError = ref(null);
const archetypeScores = ref([]);

// AI Summary Data
const aiSummary = ref(null);
const loadingAiSummary = ref(false);

// Sample data for other sections
const bigFiveTraits = [
  { name: "Открытость", value: 78 },
  { name: "Добросовестность", value: 65 },
  { name: "Экстраверсия", value: 82 },
  { name: "Доброжелательность", value: 70 },
  { name: "Нейротизм", value: 45 },
];

const cognitiveStyles = [
  { name: "Логическое мышление", level: 8 },
  { name: "Креативность", level: 7 },
  { name: "Интуиция", level: 9 },
  { name: "Эмпатия", level: 6 },
];

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Watch for tab changes to initialize chart when emotions tab is selected
watch(activeTab, async (newTab) => {
  if (
    newTab === "emotions" &&
    emotionBarometerStats.value.totalEntries > 0 &&
    !chartInstance.value
  ) {
    await nextTick();
    initializeChart();
  }

  // Load flows when flows tab is selected (only if user is authenticated)
  if (newTab === "flows" && publicFlows.value.length === 0 && authStore.user) {
    await fetchPublicFlows(authStore.user.uid);
  }
});

// Auth protection at the start of onMounted
onMounted(async () => {
  isLoading.value = true; // Ensure loading is true from the start

  await authStore.initAuth();

  if (!authStore.user) {
    router.push("/login");
    return;
  }

  // Verify username matches current user
  const currentUsername = authStore.user.displayName?.replace(/\s/g, "-");
  if (route.params.username !== currentUsername) {
    router.push(`/profile/${currentUsername}`);
    return;
  }

  // Now load the user's data
  await loadUserData();
});

// Separate function for loading user data
const loadUserData = async () => {
  try {
    // Start all data loading operations in parallel
    const [avatarData, bioData, emotionData, assessmentData, aiSummaryData] =
      await Promise.allSettled([
        fetchUserAvatarUrl(authStore.user.uid),
        fetchBioData(authStore.user.uid),
        fetchEmotionBarometerData(authStore.user.uid),
        fetchLatestAssessment(authStore.user.uid),
        fetchAiSummary(authStore.user.uid),
      ]);

    // Handle results
    if (avatarData.status === "fulfilled") {
      avatarUrl.value = avatarData.value;
    }

    // Handle other data loading results
    if (emotionData.status === "fulfilled") {
    } else if (emotionData.status === "rejected") {
      console.error("❌ Emotion data loading failed:", emotionData.reason);
    }

    if (assessmentData.status === "fulfilled") {
    } else if (assessmentData.status === "rejected") {
      console.error(
        "❌ Assessment data loading failed:",
        assessmentData.reason
      );
    }

    if (aiSummaryData.status === "fulfilled") {
    } else if (aiSummaryData.status === "rejected") {
      console.error("❌ AI summary loading failed:", aiSummaryData.reason);
    }
  } catch (error) {
    console.error("Error loading user data:", error);
    showNotification("Произошла ошибка при загрузке данных", "error");
  } finally {
    isLoading.value = false;
    loading.value = false;
  }
};

// Fetch Bio Data
const fetchBioData = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      profession.value = data.profession || "";
      socialMedia.value = data.socialMedia || "";
      age.value = data.age || "";
      gender.value = data.gender || "";
      aboutYourself.value = data.aboutYourself || "";
    }
  } catch (error) {
    console.error("Error fetching bio data:", error);
  } finally {
    loadingBio.value = false;
  }
};

// Initialize chart function
const initializeChart = () => {
  if (!emotionChart.value) {
    return;
  }

  // Destroy existing chart instance if it exists
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  const distribution = emotionBarometerStats.value.emotionDistribution;

  const ctx = emotionChart.value.getContext("2d");
  chartInstance.value = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(distribution),
      datasets: [
        {
          data: Object.values(distribution),
          backgroundColor: [
            "rgba(6, 182, 212, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(34, 211, 238, 0.8)",
            "rgba(251, 146, 60, 0.8)",
            "rgba(16, 185, 129, 0.8)",
          ],
          borderColor: "rgba(15, 23, 42, 0.8)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "rgba(203, 213, 225, 1)",
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleColor: "rgba(6, 182, 212, 1)",
          bodyColor: "rgba(203, 213, 225, 1)",
          borderColor: "rgba(6, 182, 212, 0.3)",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
        },
      },
    },
  });
};

// Fetch Emotion Barometer Data
const fetchEmotionBarometerData = async (userId) => {
  try {
    const db = getFirestore();
    const { success, stats } = await getEmotionBarometerStats(db, userId);

    if (success) {
      emotionBarometerStats.value = stats;
      console.log("📊 Emotion stats loaded:", stats);
    } else {
      console.error("Failed to fetch emotion barometer stats");
    }
  } catch (error) {
    console.error("Error loading emotion barometer data:", error);
  } finally {
    loadingEmotionBarometer.value = false;
  }
};

// Fetch the latest assessment results
const fetchLatestAssessment = async (userId) => {
  loadingAssessments.value = true;
  assessmentError.value = null;

  try {
    const db = getFirestore();
    const { success, assessment } = await getLatestUserAssessment(db, userId);

    if (success && assessment) {
      latestAssessment.value = assessment;
      console.log("🧠 Assessment loaded:", assessment);

      // Transform the scores into the format expected by the component
      archetypeScores.value = Object.entries(assessment.scores).map(
        ([name, level]) => ({
          name,
          level: parseFloat(level),
          icon: getIconForArchetype(name),
          guideUrl: archetypeGuides[name] || "#",
        })
      );
      console.log("🎯 Archetype scores transformed:", archetypeScores.value);
    } else {
      assessmentError.value = "Не удалось загрузить результаты теста.";
      console.log("❌ No assessment data found");
    }
  } catch (error) {
    console.error("Error fetching latest assessment:", error);
    assessmentError.value = "Произошла ошибка при загрузке результатов.";
  } finally {
    loadingAssessments.value = false;
  }
};

// Fetch AI Summary
const fetchAiSummary = async (userId) => {
  loadingAiSummary.value = true;
  try {
    const db = getFirestore();
    const aiSummaryRef = doc(db, "users", userId, "aiSummary", "latest");
    const aiSummarySnap = await getDoc(aiSummaryRef);

    if (aiSummarySnap.exists()) {
      aiSummary.value = aiSummarySnap.data();
      console.log("🤖 AI Summary loaded:", aiSummary.value);
    } else {
      console.log("ℹ️ No AI summary found");
    }
  } catch (error) {
    console.error("Error fetching AI summary:", error);
  } finally {
    loadingAiSummary.value = false;
  }
};

// Get icon for archetype
const getIconForArchetype = (name) => {
  const icons = {
    творец: "fa-paint-brush",
    исследователь: "fa-compass",
    мудрец: "fa-book-open",
    воин: "fa-shield-alt",
    маг: "fa-magic",
    заботливый: "fa-heart",
    наставник: "fa-chalkboard-teacher",
    правитель: "fa-crown",
    друг: "fa-handshake",
    шут: "fa-laugh",
    мятежник: "fa-fire",
    герой: "fa-medal",
  };
  return icons[name] || "fa-question";
};

// Calculate archetype percentage for progress bar
const calculateArchetypePercentage = (level) => {
  // Assuming level is between 6-30 (from your data)
  const min = 6;
  const max = 30;
  return Math.round(((level - min) / (max - min)) * 100);
};

// Handle download logic
const handleDownload = (url) => {
  if (!url || url === "#") {
    console.log("No guide available for this archetype");
    return;
  }
  console.log("Downloading from:", url);
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Logout user
const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};

const handleNotification = ({ message, type }) => {
  showNotification(message, type);
};

// Fetch public flows for the user
const fetchPublicFlows = async (userId) => {
  loadingFlows.value = true;
  try {
    const db = getFirestore();
    const labFlowsRef = collection(db, 'labFlows');
    const q = query(
      labFlowsRef,
      where('userId', '==', userId),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    publicFlows.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('📚 Public flows loaded:', publicFlows.value.length);
  } catch (error) {
    console.error('Error fetching public flows:', error);
    showNotification('Ошибка при загрузке потоков', 'error');
  } finally {
    loadingFlows.value = false;
  }
};

// Navigate to flow page
const navigateToFlow = (flowId) => {
  router.push(`/lab/flow/${flowId}`);
};
</script>

<style lang="postcss" scoped>
.loading-container {
  @apply flex flex-col items-center text-center;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-progress {
  animation: progress 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.tab-link {
  @apply relative transition-colors duration-300 whitespace-nowrap;
}

.tab-link-active {
  @apply text-stone-900 dark:text-white;
}

.tab-link-active::after {
  content: "";
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-stone-900 dark:bg-white;
}

.settings-card {
  @apply p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between;
}

.settings-icon-wrapper {
  @apply w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center;
}

.stat-item {
  @apply flex items-center justify-between p-6 rounded-2xl bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100/50 dark:border-stone-800/30;
}

.activity-item {
  @apply flex items-start gap-4 p-5 rounded-2xl bg-stone-50/30 dark:bg-stone-800/10 hover:bg-white dark:hover:bg-stone-800/30 transition-all duration-300;
}

.activity-icon {
  @apply w-10 h-10 rounded-xl bg-white dark:bg-stone-800/50 flex items-center justify-center shadow-sm flex-shrink-0;
}

.emotion-barometer-section {
  @apply p-8 sm:p-12 rounded-[3.5rem] bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/50 shadow-sm backdrop-blur-xl transition-all duration-500;
}

.section-header {
  @apply mb-12 pb-8 border-b border-stone-50 dark:border-stone-800/30;
}

.section-icon-wrapper {
  @apply w-14 h-14 rounded-2xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center shadow-sm;
}

.cta-button-custom {
  @apply inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800/50 text-stone-600 dark:text-stone-400 hover:text-cyan-600 hover:border-cyan-500/30 transition-all duration-300 font-medium;
}

.loading-state {
  @apply flex items-center justify-center py-24;
}

.loading-content {
  @apply flex flex-col items-center text-center;
}

.empty-state {
  @apply flex items-center justify-center py-24;
}

.empty-content {
  @apply flex flex-col items-center text-center max-w-md;
}

.empty-icon {
  @apply w-24 h-24 rounded-3xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center mb-8 shadow-sm;
}

.start-button {
  @apply px-10 py-5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-stone-900/10;
}

.stats-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12;
}

.stat-card {
  @apply p-8 rounded-[2rem] bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100/50 dark:border-stone-800/30 transition-all duration-500 flex items-center gap-5;
}

.stat-icon-wrapper {
  @apply w-14 h-14 rounded-2xl bg-white dark:bg-stone-800/40 flex items-center justify-center shadow-sm flex-shrink-0;
}

.stat-label {
  @apply text-stone-400 dark:text-stone-500 text-[10px] uppercase tracking-[0.2em] font-medium mb-1;
}

.stat-value {
  @apply text-stone-900 dark:text-white text-3xl font-light tracking-tight;
}

.chart-container {
  @apply mt-12 p-10 rounded-[3rem] bg-stone-50/30 dark:bg-stone-800/10 border border-stone-100/50 dark:border-stone-800/30;
}

.chart-title {
  @apply text-xl font-light text-stone-900 dark:text-white mb-10 flex items-center uppercase tracking-tight;
}

.chart-wrapper {
  @apply max-w-sm mx-auto h-72;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 640px) {
  .emotion-barometer-section {
    @apply p-6 rounded-[2.5rem];
  }

  .stats-grid {
    @apply gap-4;
  }

  .stat-card {
    @apply p-6;
  }

  .chart-container {
    @apply p-6 rounded-[2rem];
  }

  .settings-card {
    @apply p-6 rounded-[2rem];
  }

  .tab-link {
    @apply py-3;
  }
}
</style>
