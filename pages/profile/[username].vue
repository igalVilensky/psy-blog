<template>
  <div
    class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div class="flex items-center gap-6">
            <!-- Profile Avatar -->
            <div class="relative">
              <div
                class="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center"
              >
                <span class="text-3xl font-semibold text-pink-600">
                  {{
                    authStore.user?.displayName?.charAt(0).toUpperCase() || "U"
                  }}
                </span>
              </div>
              <div
                class="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-4 border-white"
              ></div>
            </div>

            <!-- Greeting & Status -->
            <div>
              <h1 class="text-2xl font-bold text-gray-800 mb-2">
                {{ authStore.user?.displayName || "User" }}
              </h1>
              <p class="text-gray-600">Активный пользователь</p>
            </div>
          </div>

          <!-- Actions - Full width on mobile -->
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Favorite Posts -->
        <div class="md:col-span-2">
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

            <!-- Favorite Posts List -->
            <div class="space-y-6">
              <div
                v-for="i in 3"
                :key="i"
                class="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  :src="hostImage"
                  class="w-30 h-20 rounded-lg object-cover"
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
        </div>

        <!-- Stats & Activity -->
        <div class="space-y-8">
          <!-- Quick Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <!-- Blog Stats -->
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-chart-line text-pink-600 mr-2"></i>
              Статистика блога
            </h2>
            <div class="space-y-4 mb-8">
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">Прочитано статей</div>
                <div class="text-xl font-semibold text-gray-800">24</div>
              </div>
            </div>

            <!-- Emotion Diary Stats -->
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fa fa-book-open text-pink-600 mr-2"></i>
              Цифровой дневник эмоций
            </h2>
            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">Количество записей</div>
                <div class="text-xl font-semibold text-gray-800">
                  {{ emotionStats?.entriesCount }}
                </div>
              </div>
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">Изученные эмоции</div>
                <div class="text-xl font-semibold text-gray-800">
                  {{ emotionStats?.unlockedEmotions.length }}
                </div>
              </div>
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">Последняя запись</div>
                <div class="text-base font-semibold text-gray-800">
                  {{ getLastEntryDate() }}
                </div>
              </div>
            </div>
            <canvas ref="blogStatsChart" width="400" height="200"></canvas>
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
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import hostImage from "~/assets/images/podcasts/podcasts.jpeg";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const user = ref(null);
const blogStatsChart = ref(null);
const emotionStats = ref({
  entriesCount: 0,
  recentEntries: [],
  unlockedEmotions: [],
});

const auth = getAuth();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    user.value = currentUser; // Store user data
    await loadEmotionData(currentUser.uid);
    if (blogStatsChart.value) {
      new Chart(blogStatsChart.value, {
        type: "bar", // or 'line', 'pie', etc., based on your need
        data: {
          labels: [
            "Прочитано статей",
            "Количество записей",
            "Изученные эмоции",
          ], // Example labels
          datasets: [
            {
              label: "Статистика",
              data: [
                24,
                emotionStats.value.entriesCount,
                emotionStats.value.unlockedEmotions.length,
              ], // Example data
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
  }
});

onMounted(async () => {
  await authStore.initAuth(); // Wait for auth to initialize

  if (!authStore.user && !authStore.isLoading) {
    router.push("/login"); // Redirect only if the user is null and loading is complete
    return;
  }
});

// Logic to load emotion data
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

// Get the date of the last emotion entry
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
