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
            <div class="relative group">
              <div
                v-if="avatarUrl && !loading"
                class="w-24 h-24 rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100"
              >
                <img
                  :src="avatarUrl"
                  alt="Avatar"
                  class="w-full h-full object-cover"
                />
              </div>

              <div
                v-else-if="loading"
                class="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center ring-2 ring-offset-2 ring-gray-100"
              >
                <i class="fas fa-spinner fa-spin fa-2x text-[#FF6B6B]"></i>
              </div>
              <div
                v-else
                class="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center ring-2 ring-offset-2 ring-gray-100"
              >
                <span class="text-3xl font-semibold text-pink-600">
                  {{ authStore.user?.displayName?.charAt(0).toUpperCase() }}
                </span>
              </div>

              <label class="absolute inset-0 w-24 h-24 cursor-pointer">
                <input
                  type="file"
                  @change="onFileChange"
                  accept="image/*"
                  class="hidden"
                />
                <div
                  class="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <i class="fas fa-camera text-white text-xl"></i>
                </div>
              </label>
            </div>

            <!-- Greeting & Status -->
            <div class="w-full max-w-60 sm:max-w-xs">
              <h1 class="text-2xl font-bold text-gray-800 mb-2">
                {{ authStore.user?.displayName || "User" }}
              </h1>
              <p class="text-gray-600 font-semibold">
                <span class="truncate block"
                  >[{{ authStore.user?.email || "Email not provided" }}]</span
                >
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

      <!-- new sections -->

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
            >
              <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-brain text-pink-600 mr-2"></i>
                Психологический профиль
              </h2>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'flex-1 sm:flex-initial px-3 py-1 rounded-lg text-sm transition-colors whitespace-nowrap',
                    activeTab === tab.id
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  {{ tab.name }}
                </button>
              </div>
            </div>

            <!-- Rest of the code remains the same -->
            <!-- Archetypes Section -->
            <div v-if="activeTab === 'archetypes'" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="archetype in archetypes"
                  :key="archetype.name"
                  class="bg-gray-50 rounded-lg p-6 flex items-center gap-4"
                >
                  <div
                    :class="[
                      'w-16 h-16 rounded-full flex items-center justify-center',
                      `bg-${archetype.color}-100`,
                    ]"
                  >
                    <i
                      :class="[
                        'fas',
                        archetype.icon,
                        `text-${archetype.color}-600 text-2xl`,
                      ]"
                    ></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{ archetype.name }}
                    </h3>
                    <div class="flex items-center mt-2">
                      <div class="h-2 bg-gray-200 rounded-full w-32">
                        <div
                          class="h-2 rounded-full bg-pink-600"
                          :style="{ width: `${archetype.level}%` }"
                        ></div>
                      </div>
                      <span class="ml-2 text-sm text-gray-600"
                        >{{ archetype.level }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Big Five Section -->
            <div v-if="activeTab === 'bigFive'" class="space-y-6">
              <div
                v-for="trait in bigFiveTraits"
                :key="trait.name"
                class="space-y-2"
              >
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 font-medium">{{
                    trait.name
                  }}</span>
                  <span class="text-sm text-gray-600">{{ trait.value }}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full">
                  <div
                    class="h-2 rounded-full"
                    :class="`bg-${trait.color}-600`"
                    :style="{ width: `${trait.value}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Cognitive Styles Section -->
            <div v-if="activeTab === 'cognitive'" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="style in cognitiveStyles"
                  :key="style.name"
                  class="bg-gray-50 rounded-lg p-6"
                >
                  <h3 class="font-semibold text-gray-800 mb-2">
                    {{ style.name }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-4">
                    {{ style.description }}
                  </p>
                  <div class="flex items-center gap-2">
                    <i :class="['fas', style.icon, 'text-pink-600']"></i>
                    <span class="text-sm font-medium"
                      >{{ style.level }}/10</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar Stats -->
        <div class="space-y-8">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-chart-line text-pink-600 mr-2"></i>
              Развитие личности
            </h2>
            <div class="space-y-4">
              <div
                v-for="stat in personalStats"
                :key="stat.name"
                class="flex items-center justify-between"
              >
                <span class="text-gray-700">{{ stat.name }}</span>
                <span class="font-semibold text-gray-900">{{
                  stat.value
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Statistics Section - Takes full width on mobile, 2 columns on large screens -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Emotional Barometer Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-chart-line text-pink-600 mr-2"></i>
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
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Chart, registerables } from "chart.js";
import {
  fetchUserAvatarUrl,
  updateUserAvatarUrl,
} from "~/api/firebase/userProfile";

import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";

Chart.register(...registerables);

const loading = ref(true);
const avatarUrl = ref(null); // Store the uploaded avatar URL
const blogStatsChart = ref(null);
const emotionChart = ref(null);
const activeTab = ref("archetypes");
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

const auth = getAuth();
const authStore = useAuthStore();
const router = useRouter();

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

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = await uploadAvatar(file);
    if (url) {
      avatarUrl.value = url; // Set the uploaded avatar URL
      console.log("Avatar uploaded successfully:", avatarUrl.value);
    }
  }
};

// The upload function
const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=b19c8d945e3c37e4760b8ce4cf983904",
      { method: "POST", body: formData }
    );
    const result = await response.json();

    if (!result.success) throw new Error("Image upload failed");

    const { uid } = getAuth().currentUser;
    const { success, message } = await updateUserAvatarUrl(
      uid,
      result.data.url
    );

    if (success) {
      avatarUrl.value = result.data.url;
      console.log("Avatar updated:", avatarUrl.value);
    } else {
      console.error("Avatar update failed:", message);
    }
  } catch (error) {
    console.error("Avatar upload error:", error.message);
  }
};

const tabs = [
  { id: "archetypes", name: "Архетипы" },
  { id: "bigFive", name: "Big Five" },
  { id: "cognitive", name: "Когнитивные стили" },
];

const archetypes = [
  { name: "Герой", level: 75, color: "pink", icon: "fa-shield-alt" },
  { name: "Мудрец", level: 60, color: "blue", icon: "fa-book" },
  { name: "Творец", level: 85, color: "purple", icon: "fa-paint-brush" },
  { name: "Искатель", level: 70, color: "green", icon: "fa-compass" },
];

const bigFiveTraits = [
  { name: "Открытость новому", value: 78, color: "pink" },
  { name: "Добросовестность", value: 65, color: "blue" },
  { name: "Экстраверсия", value: 82, color: "green" },
  { name: "Доброжелательность", value: 70, color: "purple" },
  { name: "Нейротизм", value: 45, color: "yellow" },
];

const cognitiveStyles = [
  {
    name: "Логическое мышление",
    description: "Способность к анализу и структурированию информации",
    level: 8,
    icon: "fa-brain",
  },
  {
    name: "Креативность",
    description: "Способность находить нестандартные решения",
    level: 7,
    icon: "fa-lightbulb",
  },
  {
    name: "Интуиция",
    description: "Развитость внутреннего чутья",
    level: 9,
    icon: "fa-eye",
  },
  {
    name: "Эмпатия",
    description: "Понимание эмоций других людей",
    level: 6,
    icon: "fa-heart",
  },
];

const personalStats = [
  { name: "Уровень осознанности", value: "7/10" },
  { name: "Эмоциональный интеллект", value: "75%" },
  { name: "Стрессоустойчивость", value: "8/10" },
  { name: "Адаптивность", value: "82%" },
];
</script>
