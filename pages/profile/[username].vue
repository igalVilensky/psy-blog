<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-container">
      <div class="loading-spinner-wrapper">
        <div class="spinner-ring spinner-ring-1"></div>
        <div class="spinner-ring spinner-ring-2"></div>
        <div class="spinner-ring spinner-ring-3"></div>
        <div class="spinner-core">
          <i class="fas fa-user text-3xl text-cyan-400"></i>
        </div>
      </div>
      <div class="loading-text">
        <h3 class="text-xl font-bold text-white mb-2">Загрузка профиля</h3>
        <p class="text-slate-400 text-sm">Подготовка данных...</p>
      </div>
      <div class="loading-progress">
        <div class="progress-bar"></div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else class="relative min-h-screen bg-slate-950">
    <div class="max-w-6xl mx-auto px-4 sm:px-0 pb-12 pt-8 sm:pt-12">
      <!-- Back Button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6 group"
      >
        <i
          class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
        ></i>
        Назад на главную
      </NuxtLink>

      <!-- Profile Header -->
      <ProfileHeader
        :avatarUrl="avatarUrl"
        :loading="loading"
        :displayName="authStore.user?.displayName || 'User'"
        :email="authStore.user?.email || 'Email not provided'"
        :userInitial="authStore.user?.displayName?.charAt(0).toUpperCase()"
        @update:avatarUrl="avatarUrl = $event"
        @logout="logoutUser"
        @notify="handleNotification($event)"
      />

      <!-- Bio Section -->
      <BioSection
        :loading="loadingBio"
        :profession="profession"
        :socialMedia="socialMedia"
        :age="age"
        :gender="gender"
        :aboutYourself="aboutYourself"
      />

      <!-- Navigation Tabs -->
      <div class="mb-8">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            @click="activeTab = 'overview'"
            class="filter-tab"
            :class="activeTab === 'overview' ? 'filter-tab-active' : ''"
          >
            <i class="fas fa-th mr-2"></i>
            Обзор
          </button>
          <button
            @click="activeTab = 'emotions'"
            class="filter-tab"
            :class="activeTab === 'emotions' ? 'filter-tab-active' : ''"
          >
            <i class="fas fa-heart mr-2"></i>
            Эмоции
          </button>
          <button
            @click="activeTab = 'archetypes'"
            class="filter-tab"
            :class="activeTab === 'archetypes' ? 'filter-tab-active' : ''"
          >
            <i class="fas fa-users mr-2"></i>
            Архетипы
          </button>
        </div>
      </div>

      <!-- Overview Tab -->
      <div
        v-if="activeTab === 'overview'"
        class="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <!-- Quick Stats -->
        <div class="settings-card">
          <div class="flex items-center gap-3 mb-6">
            <div class="settings-icon-wrapper">
              <i class="fas fa-chart-line text-cyan-400"></i>
            </div>
            <h2 class="text-xl font-bold text-white">Быстрая статистика</h2>
          </div>
          <div class="space-y-4">
            <div class="stat-item">
              <div class="flex items-center gap-3">
                <i class="fas fa-clipboard-list text-cyan-400"></i>
                <span class="text-slate-300">Всего записей</span>
              </div>
              <span class="text-2xl font-bold text-white">{{
                emotionBarometerStats.totalEntries
              }}</span>
            </div>
            <div class="stat-item">
              <div class="flex items-center gap-3">
                <i class="fas fa-smile text-purple-400"></i>
                <span class="text-slate-300">Частая эмоция</span>
              </div>
              <span class="text-lg font-semibold text-purple-400">{{
                emotionBarometerStats.mostCommonEmotion
              }}</span>
            </div>
            <div class="stat-item">
              <div class="flex items-center gap-3">
                <i class="fas fa-tachometer-alt text-emerald-400"></i>
                <span class="text-slate-300">Средняя интенсивность</span>
              </div>
              <span class="text-lg font-semibold text-emerald-400">{{
                emotionBarometerStats.averageIntensity.toFixed(1)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="settings-card">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="settings-icon-wrapper bg-gradient-to-br from-purple-500/20 to-pink-500/20"
            >
              <i class="fas fa-history text-purple-400"></i>
            </div>
            <h2 class="text-xl font-bold text-white">Последняя активность</h2>
          </div>
          <div class="space-y-3">
            <div class="activity-item">
              <div class="activity-icon bg-cyan-500/20">
                <i class="fas fa-heart text-cyan-400 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-slate-300 text-sm">Новая запись эмоций</p>
                <p class="text-slate-500 text-xs mt-1">2 часа назад</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon bg-purple-500/20">
                <i class="fas fa-brain text-purple-400 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-slate-300 text-sm">Пройден тест на архетипы</p>
                <p class="text-slate-500 text-xs mt-1">1 день назад</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon bg-emerald-500/20">
                <i class="fas fa-trophy text-emerald-400 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-slate-300 text-sm">Достижение разблокировано</p>
                <p class="text-slate-500 text-xs mt-1">3 дня назад</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Emotions Tab -->
      <div v-if="activeTab === 'emotions'" class="emotion-barometer-section">
        <div class="section-header">
          <div class="flex items-center gap-3">
            <div class="section-icon-wrapper">
              <i class="fas fa-chart-line text-cyan-400"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">
                Эмоциональный компас
              </h2>
              <p class="text-sm text-slate-400 mt-1">
                Отслеживайте свое эмоциональное состояние
              </p>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div v-if="emotionBarometerStats.totalEntries > 0" class="mb-6">
          <Button
            to="/lab/experiments/emotional-compass"
            text="Перейти к барометру"
            iconClass="fas fa-arrow-right"
            gradientStart="#0EA5E9"
            gradientEnd="#E879F9"
            textColor="#0EA5E9"
            customClass="cta-button-custom"
          />
        </div>

        <!-- Loading State -->
        <div v-if="loadingEmotionBarometer" class="loading-state">
          <div class="loading-content">
            <i class="fas fa-spinner fa-spin text-4xl text-cyan-400 mb-4"></i>
            <p class="text-slate-300">Загрузка данных...</p>
          </div>
        </div>

        <!-- No Data State -->
        <div
          v-else-if="emotionBarometerStats.totalEntries === 0"
          class="empty-state"
        >
          <div class="empty-content">
            <div class="empty-icon">
              <i class="fas fa-chart-pie text-5xl text-cyan-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">
              Нет данных для отображения
            </h3>
            <p class="text-slate-400 mb-6">
              Начните использовать Эмоциональный компас, чтобы отслеживать свои
              эмоции
            </p>
            <NuxtLink
              to="/lab/experiments/emotional-compass"
              class="start-button"
            >
              <span class="button-gradient"></span>
              <span class="button-content">
                <i class="fas fa-play-circle mr-2"></i>
                Начать отслеживание
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Stats Grid -->
        <div v-else>
          <div class="stats-grid">
            <!-- Total Entries -->
            <div class="stat-card">
              <div
                class="stat-icon-wrapper bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
              >
                <i class="fas fa-calculator text-cyan-400 text-xl"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Всего записей</p>
                <p class="stat-value">
                  {{ emotionBarometerStats.totalEntries }}
                </p>
              </div>
            </div>

            <!-- Most Common Emotion -->
            <div class="stat-card">
              <div
                class="stat-icon-wrapper bg-gradient-to-br from-purple-500/20 to-pink-500/20"
              >
                <i class="fas fa-heart text-purple-400 text-xl"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Частая эмоция</p>
                <p class="stat-value">
                  {{ emotionBarometerStats.mostCommonEmotion }}
                </p>
              </div>
            </div>

            <!-- Average Intensity -->
            <div class="stat-card">
              <div
                class="stat-icon-wrapper bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
              >
                <i class="fas fa-tachometer-alt text-emerald-400 text-xl"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Средняя интенсивность</p>
                <p class="stat-value">
                  {{ emotionBarometerStats.averageIntensity.toFixed(1) }}
                </p>
              </div>
            </div>

            <!-- Most Common Tag -->
            <div class="stat-card">
              <div
                class="stat-icon-wrapper bg-gradient-to-br from-orange-500/20 to-red-500/20"
              >
                <i class="fas fa-tags text-orange-400 text-xl"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Частая сфера жизни</p>
                <p class="stat-value">
                  {{ emotionBarometerStats.mostCommonTag }}
                </p>
              </div>
            </div>
          </div>

          <!-- Emotion Distribution Chart -->
          <div class="chart-container">
            <h3 class="chart-title">
              <i class="fas fa-chart-pie text-cyan-400 mr-2"></i>
              Распределение эмоций
            </h3>
            <div class="chart-wrapper">
              <canvas ref="emotionChart" class="w-full h-64"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Archetypes Tab -->
      <div v-if="activeTab === 'archetypes'">
        <!-- Redesigned Psychological Profile to match new style -->
        <div class="settings-card">
          <div class="flex items-center gap-3 mb-6">
            <div class="settings-icon-wrapper">
              <i class="fas fa-brain text-cyan-400"></i>
            </div>
            <h2 class="text-xl font-bold text-white">
              Психологический профиль
            </h2>
          </div>

          <!-- Loading State -->
          <div v-if="loadingAssessments" class="loading-state">
            <div class="loading-content">
              <i class="fas fa-spinner fa-spin text-4xl text-cyan-400 mb-4"></i>
              <p class="text-slate-300">Загрузка профиля...</p>
            </div>
          </div>

          <!-- No Data State -->
          <div
            v-else-if="!archetypeScores || archetypeScores.length === 0"
            class="empty-state"
          >
            <div class="empty-content">
              <div class="empty-icon">
                <i class="fas fa-users text-5xl text-cyan-400"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">
                Нет данных архетипов
              </h3>
              <p class="text-slate-400 mb-6">
                Пройдите тест на архетипы, чтобы увидеть ваш психологический
                профиль
              </p>
              <NuxtLink
                to="/lab/experiments/life-purpose-archetype"
                class="start-button"
              >
                <span class="button-gradient"></span>
                <span class="button-content">
                  <i class="fas fa-play-circle mr-2"></i>
                  Пройти тест
                </span>
              </NuxtLink>
            </div>
          </div>

          <!-- Archetypes Grid -->
          <div v-else class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(archetype, index) in archetypeScores"
                :key="archetype.name"
                class="archetype-card"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center"
                  >
                    <i
                      :class="[
                        'fas',
                        archetype.icon || 'fa-question',
                        'text-cyan-400 text-xl',
                      ]"
                    ></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-white capitalize">
                      {{ archetype.name }}
                    </h3>
                    <p class="text-slate-400 text-sm">
                      Уровень: {{ archetype.level }}
                    </p>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="mb-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-slate-400">Прогресс</span>
                    <span class="text-cyan-400"
                      >{{
                        calculateArchetypePercentage(archetype.level)
                      }}%</span
                    >
                  </div>
                  <div class="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      class="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000"
                      :style="{
                        width: `${calculateArchetypePercentage(
                          archetype.level
                        )}%`,
                      }"
                    ></div>
                  </div>
                </div>

                <!-- Download Button -->
                <button
                  v-if="archetype.guideUrl && archetype.guideUrl !== '#'"
                  @click="handleDownload(archetype.guideUrl)"
                  class="w-full py-2 px-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <i class="fas fa-download text-sm"></i>
                  <span class="text-sm">Скачать гайд</span>
                </button>
              </div>
            </div>

            <!-- Additional Stats -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <!-- Big Five Summary -->
              <div
                class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
              >
                <h3
                  class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
                >
                  <i class="fas fa-star text-purple-400"></i>
                  Big Five Traits
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="trait in bigFiveTraits"
                    :key="trait.name"
                    class="flex items-center justify-between"
                  >
                    <span class="text-slate-300 text-sm">{{ trait.name }}</span>
                    <span class="text-cyan-400 font-semibold"
                      >{{ trait.value }}%</span
                    >
                  </div>
                </div>
              </div>

              <!-- Cognitive Styles Summary -->
              <div
                class="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
              >
                <h3
                  class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
                >
                  <i class="fas fa-brain text-emerald-400"></i>
                  Когнитивные стили
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="style in cognitiveStyles"
                    :key="style.name"
                    class="flex items-center justify-between"
                  >
                    <span class="text-slate-300 text-sm">{{ style.name }}</span>
                    <span class="text-emerald-400 font-semibold"
                      >{{ style.level }}/10</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Component -->
    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-50"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotification } from "@/composables/useNotification";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Chart, registerables } from "chart.js";
import ProfileHeader from "~/components/profile/ProfileHeader.vue";
import BioSection from "~/components/profile/BioSection.vue";
import Button from "~/components/base/Button.vue";
import Notification from "~/components/base/Notification.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";

definePageMeta({
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
});

// Auth protection at the start of onMounted
onMounted(async () => {
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
    const [avatarData, bioData, emotionData, assessmentData] =
      await Promise.allSettled([
        fetchUserAvatarUrl(authStore.user.uid),
        fetchBioData(authStore.user.uid),
        fetchEmotionBarometerData(authStore.user.uid),
        fetchLatestAssessment(authStore.user.uid),
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
</script>

<style scoped>
.loading-overlay {
  @apply fixed inset-0 bg-slate-950 z-50 flex items-center justify-center;
}

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
  @apply border-r-purple-500;
  animation-duration: 3s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-pink-500;
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
  @apply w-64 h-1 bg-slate-800 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full;
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

.filter-tab {
  @apply px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
         bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700/50
         hover:border-cyan-500/30 whitespace-nowrap;
}

.filter-tab-active {
  @apply bg-cyan-500/20 text-cyan-300 border-cyan-500/40;
}

.settings-card {
  @apply p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/20 
         backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300;
}

.settings-icon-wrapper {
  @apply w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
         flex items-center justify-center;
}

.stat-item {
  @apply flex items-center justify-between p-4 rounded-lg bg-slate-800/30;
}

.activity-item {
  @apply flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 
         hover:bg-slate-800/50 transition-all duration-300;
}

.activity-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0;
}

.emotion-barometer-section {
  @apply p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/20 
         backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300;
}

.section-header {
  @apply mb-6 pb-6 border-b border-cyan-500/10;
}

.section-icon-wrapper {
  @apply w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
         flex items-center justify-center;
}

.cta-button-custom {
  @apply inline-flex items-center gap-2 px-6 py-3 rounded-xl 
         bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 
         hover:bg-cyan-500/20 hover:border-cyan-500/50 
         transition-all duration-300 font-medium;
}

.loading-state {
  @apply flex items-center justify-center py-24;
}

.loading-content {
  @apply flex flex-col items-center text-center;
}

.empty-state {
  @apply flex items-center justify-center py-16;
}

.empty-content {
  @apply flex flex-col items-center text-center max-w-md;
}

.empty-icon {
  @apply w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
         flex items-center justify-center mb-6 animate-pulse;
}

.start-button {
  @apply relative inline-flex items-center justify-center px-8 py-3 
         rounded-xl overflow-hidden transition-all duration-300 
         hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25;
}

.button-gradient {
  @apply absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500;
}

.start-button:hover .button-gradient {
  @apply scale-110;
}

.button-content {
  @apply relative z-10 text-white font-medium flex items-center;
}

.stats-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8;
}

.stat-card {
  @apply p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 
         hover:border-cyan-500/30 transition-all duration-300 
         flex items-center gap-4;
}

.stat-icon-wrapper {
  @apply w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0;
}

.stat-content {
  @apply flex-1;
}

.stat-label {
  @apply text-slate-400 text-sm mb-1;
}

.stat-value {
  @apply text-white text-2xl font-bold;
}

.chart-container {
  @apply mt-8 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50;
}

.chart-title {
  @apply text-lg font-semibold text-white mb-6 flex items-center;
}

.chart-wrapper {
  @apply max-w-md mx-auto h-64;
}

@media (max-width: 640px) {
  .emotion-barometer-section {
    @apply p-4;
  }
  .stats-grid {
    @apply gap-3;
  }
  .stat-card {
    @apply p-4;
  }
  .chart-container {
    @apply p-4;
  }
  .settings-card {
    @apply p-4;
  }
  .filter-tab {
    @apply px-4 py-2 text-xs;
  }
}
</style>
