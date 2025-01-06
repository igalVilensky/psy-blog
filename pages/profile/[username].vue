<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div
          class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4"
        >
          <div
            class="flex flex-col items-center sm:flex-row sm:items-center gap-6 w-full"
          >
            <!-- Profile Avatar -->
            <UserAvatar
              :avatarUrl="avatarUrl"
              :loading="loading"
              :userInitial="
                authStore.user?.displayName?.charAt(0).toUpperCase()
              "
              @update:avatarUrl="avatarUrl = $event"
            />

            <!-- Greeting & Status -->
            <div class="text-center sm:text-left w-full max-w-60 sm:max-w-xs">
              <h1 class="text-2xl font-bold text-gray-800 mb-2">
                {{ authStore.user?.displayName || "User" }}
              </h1>
              <p class="text-gray-600 font-semibold">
                <span class="truncate block">
                  [{{ authStore.user?.email || "Email not provided" }}]
                </span>
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 w-full sm:w-auto">
            <button
              class="flex-1 sm:flex-initial px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i class="fas fa-cog mr-2"></i>
              Настройки
            </button>
            <button
              @click="logoutUser"
              class="flex-1 sm:flex-initial px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Выйти
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <PsychologicalProfile :archetypes="archetypeScores" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Statistics Section - Takes full width on mobile, 2 columns on large screens -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Emotional Barometer Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <!-- Title -->
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-chart-line text-indigo-600 mr-2"></i>
              Эмоциональный барометр
            </h2>

            <!-- Stats Grid - 2 columns on larger screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <!-- Total Entries -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Всего записей</div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ emotionBarometerStats.totalEntries }}
                </div>
              </div>

              <!-- Most Common Emotion -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Частая эмоция</div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ emotionBarometerStats.mostCommonEmotion || "Нет данных" }}
                </div>
              </div>

              <!-- Average Intensity -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">
                  Средняя интенсивность
                </div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ emotionBarometerStats.averageIntensity.toFixed(1) || "0" }}
                </div>
              </div>

              <!-- Most Common Tag -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Частая сфера жизни</div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ emotionBarometerStats.mostCommonTag || "Нет данных" }}
                </div>
              </div>
            </div>

            <!-- Emotion Distribution Chart -->
            <div class="mt-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Распределение эмоций
              </h3>
              <canvas ref="emotionChart" class="w-full max-h-64"></canvas>
            </div>

            <!-- CTA Link -->
            <div class="mt-8 text-center">
              <NuxtLink
                to="/awareness-tools/emotional-barometer"
                class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg overflow-hidden transition-colors"
              >
                <!-- Text and Icon -->
                <span class="relative z-10">
                  <i class="fas fa-arrow-right text-sm mr-2"></i>
                  Перейти к барометру
                </span>

                <!-- Hover Background -->
                <div
                  class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-indigo-700 transition-transform duration-300"
                ></div>
              </NuxtLink>
            </div>
          </div>

          <!-- Digital Emotion Diary Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fa fa-book-open text-pink-600 mr-2"></i>
              Цифровой дневник эмоций
            </h2>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Количество записей</div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ emotionStats.entriesCount }}
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Изученные эмоции</div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ emotionStats.unlockedEmotions.length }}
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="text-sm text-gray-600 mb-2">Последняя запись</div>
                <div class="text-2xl font-bold text-gray-800">
                  {{ getLastEntryDate() }}
                </div>
              </div>
            </div>

            <!-- Digital Diary Chart -->
            <div class="mt-8">
              <canvas ref="blogStatsChart" class="w-full"></canvas>
            </div>
          </div>
        </div>

        <!-- Right Sidebar Content -->
        <div class="space-y-8">
          <!-- Favorite Posts -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-bookmark text-pink-600 mr-2"></i>
                Избранные статьи
              </h2>
              <button
                class="text-sm text-gray-600 hover:text-pink-600 transition-colors"
              >
                Смотреть все
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="i in 3"
                :key="i"
                class="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  :src="hostImage"
                  class="w-24 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 class="font-medium text-gray-800 mb-2">
                    Название избранной статьи
                  </h3>
                  <div class="flex items-center text-sm text-gray-600">
                    <span class="flex items-center">
                      <i class="far fa-clock mr-1"></i>
                      5 мин чтения
                    </span>
                    <span class="mx-2">•</span>
                    <span class="text-pink-600">Личностный рост</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-history text-pink-600 mr-2"></i>
              Недавняя активность
            </h2>
            <div class="space-y-4">
              <div v-for="i in 4" :key="i" class="flex items-start gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-book-reader text-pink-600"></i>
                </div>
                <div>
                  <p class="text-gray-800">
                    Прочитали статью "Название статьи"
                  </p>
                  <p class="text-sm text-gray-500">2 часа назад</p>
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
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Chart, registerables } from "chart.js";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";
import UserAvatar from "~/components/profile/UserAvatar.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import PsychologicalProfile from "~/components/profile/PsychologicalProfile.vue";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
Chart.register(...registerables);

const loading = ref(true);
const loadingAssessments = ref(false);
const avatarUrl = ref(null); // Store the uploaded avatar URL
const blogStatsChart = ref(null);
const emotionChart = ref(null);
const emotionStats = ref({
  entriesCount: 0,
  recentEntries: [],
  unlockedEmotions: [],
});
const emotionBarometerStats = ref({
  totalEntries: 0,
  mostCommonEmotion: "",
  averageIntensity: 0,
  mostCommonTag: "",
  emotionDistribution: {},
});
const latestAssessment = ref(null);
const assessmentError = ref(null);
const archetypeScores = ref([]);

const auth = getAuth();
const authStore = useAuthStore();
const router = useRouter();

// Fetch the latest assessment results
const fetchLatestAssessment = async (userId) => {
  loadingAssessments.value = true;
  assessmentError.value = null;

  try {
    const db = getFirestore();
    const { success, assessment } = await getLatestUserAssessment(db, userId);

    if (success) {
      latestAssessment.value = assessment;

      // Transform the scores into the format expected by the component
      archetypeScores.value = Object.entries(assessment.scores).map(
        ([name, level]) => ({
          name,
          level: parseFloat(level), // Ensure level is a number
          color: getColorForArchetype(name), // Add a function to assign colors
          icon: getIconForArchetype(name), // Add a function to assign icons
        })
      );
    } else {
      assessmentError.value = "Не удалось загрузить результаты теста.";
    }
  } catch (error) {
    console.error("Error fetching latest assessment:", error);
    assessmentError.value = "Произошла ошибка при загрузке результатов.";
  } finally {
    loadingAssessments.value = false;
  }
};

const getColorForArchetype = (name) => {
  const colors = {
    творец: "purple", // Creative and imaginative
    исследователь: "blue", // Adventurous and curious
    мудрец: "green", // Knowledgeable and wise
    воин: "red", // Bold and strong
    маг: "indigo", // Mystical and powerful
    заботливый: "pink", // Caring and empathetic
    наставник: "teal", // Stable and grounded
    правитель: "yellow", // Regal and authoritative
    друг: "orange", // Warm and friendly
    шут: "yellow", // Playful and vibrant
    мятежник: "gray", // Rebellious and unconventional
    герой: "emerald", // Heroic and passionate
  };
  return colors[name] || "gray"; // Default to gray if not found
};

const getIconForArchetype = (name) => {
  const icons = {
    творец: "fa-paint-brush",
    исследователь: "fa-compass",
    мудрец: "fa-book",
    воин: "fa-shield-alt",
    маг: "fa-magic",
    заботливый: "fa-heart",
    наставник: "fa-chalkboard-teacher",
    правитель: "fa-crown",
    друг: "fa-handshake",
    шут: "fa-laugh",
    мятежник: "fa-fire",
    герой: "fa-shield-alt",
  };
  return icons[name] || "fa-question";
};

onAuthStateChanged(auth, async (currentUser) => {
  loading.value = true;
  if (currentUser) {
    // Store user data in your store (useAuthStore) or wherever you need it
    authStore.user = currentUser;

    // Fetch the avatar URL from Firestore (do not rely solely on currentUser.avatarUrl)
    const db = getFirestore();
    authStore.user = currentUser;
    avatarUrl.value = await fetchUserAvatarUrl(currentUser.uid);
    // Load emotion data
    await loadEmotionData(currentUser.uid);
    await fetchLatestAssessment(currentUser.uid);
    // Load the emotion barometer data

    try {
      const { success, stats } = await getEmotionBarometerStats(
        db,
        currentUser.uid
      );
      if (success) {
        emotionBarometerStats.value = stats;
      } else {
        console.error(
          "Failed to fetch emotion barometer stats:",
          stats.message
        );
      }
    } catch (error) {
      console.error("Error loading emotion barometer data:", error);
    }

    // Initialize both charts
    if (blogStatsChart.value) {
      new Chart(blogStatsChart.value, {
        type: "bar",
        data: {
          labels: [
            "Прочитано статей",
            "Количество записей",
            "Изученные эмоции",
          ],
          datasets: [
            {
              label: "Статистика",
              data: [
                24,
                emotionStats.value.entriesCount,
                emotionStats.value.unlockedEmotions.length,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    if (emotionChart.value) {
      const distribution = emotionBarometerStats.value.emotionDistribution;
      new Chart(emotionChart.value, {
        type: "doughnut",
        data: {
          labels: Object.keys(distribution),
          datasets: [
            {
              data: Object.values(distribution),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }
    loading.value = false;
  } else {
    // User is signed out, clear avatarUrl
    avatarUrl.value = null;
  }
});

// Original loadEmotionData function
const loadEmotionData = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, "emotion_diary", userId);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      emotionStats.value = {
        entriesCount: data.entriesCount || 0,
        recentEntries: data.recentEntries || [],
        unlockedEmotions: data.unlockedEmotions || [],
      };
    }
  } catch (error) {
    console.error("Error loading emotion data:", error);
  }
};

const getLastEntryDate = () => {
  if (emotionStats.value.recentEntries?.length > 0) {
    const lastEntry = emotionStats.value.recentEntries[0];
    if (lastEntry.date && lastEntry.date.seconds) {
      const date = new Date(lastEntry.date.seconds * 1000);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  }
  return "Нет записей";
};

const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
