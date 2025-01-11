<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Profile Header -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8"
      >
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
              <h1 class="text-2xl font-bold text-white/90 mb-2">
                {{ authStore.user?.displayName || "User" }}
              </h1>
              <p class="text-slate-300 font-semibold">
                <span class="truncate block">
                  [{{ authStore.user?.email || "Email not provided" }}]
                </span>
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 w-full sm:w-auto">
            <!-- Settings Button with Hover Effect -->
            <NuxtLink
              to="/profile/settings"
              class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
              >
                <i class="fas fa-cog"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fas fa-cog mr-2"></i>
                Настройки
              </span>
              <span class="relative invisible">Настройки</span>
            </NuxtLink>

            <!-- Logout Button with Hover Effect -->
            <button
              @click="logoutUser"
              class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
              >
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>
                Выйти
              </span>
              <span class="relative invisible">Выйти</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <PsychologicalProfile
        :archetypes="archetypeScores"
        :loading="loadingAssessments"
      />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Statistics Section -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Emotional Barometer Stats -->
          <div
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
          >
            <h2 class="text-xl font-bold text-white/90 mb-4">
              <i class="fas fa-chart-line text-[#0EA5E9] mr-2"></i>
              Эмоциональный барометр
            </h2>

            <!-- CTA Link with Hover Effect -->
            <div v-if="emotionBarometerStats.totalEntries > 0" class="mb-6">
              <NuxtLink
                to="/awareness-tools/emotional-barometer"
                class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-arrow-right"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
                >
                  <i class="fas fa-arrow-right mr-2"></i>
                  Перейти к барометру
                </span>
                <span class="relative invisible">Перейти к барометру</span>
              </NuxtLink>
            </div>

            <!-- Loading State -->
            <div
              v-if="loadingEmotionBarometer"
              class="flex flex-col items-center justify-center h-64"
            >
              <i
                class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9] mb-4"
              ></i>
              <p class="text-slate-300">Загрузка данных...</p>
            </div>

            <!-- No Data State -->
            <div
              v-else-if="emotionBarometerStats.totalEntries === 0"
              class="flex flex-col items-center justify-center h-64 text-center"
            >
              <i class="fas fa-chart-pie text-4xl text-[#0EA5E9] mb-4"></i>
              <p class="text-slate-300">Нет данных для отображения.</p>
              <p class="text-sm text-slate-400 mt-2">
                Начните использовать эмоциональный барометр, чтобы отслеживать
                свои эмоции.
              </p>
              <NuxtLink
                to="/awareness-tools/emotional-barometer"
                class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-play-circle"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
                >
                  <i class="fas fa-play-circle mr-2"></i>
                  Перейти к барометру
                </span>
                <span class="relative invisible">Перейти к барометру</span>
              </NuxtLink>
            </div>

            <!-- Stats Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <!-- Total Entries -->
              <div
                class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 border border-white/10"
              >
                <div class="text-sm text-slate-400 mb-2">Всего записей</div>
                <div class="text-2xl font-bold text-white/90">
                  {{ emotionBarometerStats.totalEntries }}
                </div>
              </div>

              <!-- Most Common Emotion -->
              <div
                class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 border border-white/10"
              >
                <div class="text-sm text-slate-400 mb-2">Частая эмоция</div>
                <div class="text-2xl font-bold text-white/90">
                  {{ emotionBarometerStats.mostCommonEmotion }}
                </div>
              </div>

              <!-- Average Intensity -->
              <div
                class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 border border-white/10"
              >
                <div class="text-sm text-slate-400 mb-2">
                  Средняя интенсивность
                </div>
                <div class="text-2xl font-bold text-white/90">
                  {{ emotionBarometerStats.averageIntensity.toFixed(1) }}
                </div>
              </div>

              <!-- Most Common Tag -->
              <div
                class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 border border-white/10"
              >
                <div class="text-sm text-slate-400 mb-2">
                  Частая сфера жизни
                </div>
                <div class="text-2xl font-bold text-white/90">
                  {{ emotionBarometerStats.mostCommonTag }}
                </div>
              </div>
            </div>

            <!-- Emotion Distribution Chart -->
            <div v-if="emotionBarometerStats.totalEntries > 0" class="mt-8">
              <h3 class="text-lg font-semibold text-white/90 mb-4">
                Распределение эмоций
              </h3>
              <canvas ref="emotionChart" class="w-full max-h-64"></canvas>
            </div>
          </div>
        </div>

        <!-- Right Sidebar Content -->
        <div class="space-y-8">
          <!-- Favorite Posts -->
          <div
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-white/90">
                <i class="fas fa-bookmark text-[#E879F9] mr-2"></i>
                Избранные статьи
              </h2>
              <button
                class="group relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#E879F9]/20"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#E879F9] to-[#C084FC] group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-arrow-right"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-[#E879F9] transition-all duration-300 transform group-hover:translate-x-full ease"
                >
                  Смотреть все
                </span>
                <span class="relative invisible">Смотреть все</span>
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="i in 3"
                :key="i"
                class="flex gap-4 p-4 rounded-lg hover:bg-[#0EA5E9]/10 transition-colors"
              >
                <img
                  :src="hostImage"
                  class="w-24 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 class="font-medium text-white/90 mb-2">
                    Название избранной статьи
                  </h3>
                  <div class="flex items-center text-sm text-slate-400">
                    <span class="flex items-center">
                      <i class="far fa-clock mr-1"></i>
                      5 мин чтения
                    </span>
                    <span class="mx-2">•</span>
                    <span class="text-[#E879F9]">Личностный рост</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
          >
            <h2 class="text-xl font-bold text-white/90 mb-6">
              <i class="fas fa-history text-[#E879F9] mr-2"></i>
              Недавняя активность
            </h2>
            <div class="space-y-4">
              <div v-for="i in 4" :key="i" class="flex items-start gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-[#E879F9]/20 flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-book-reader text-[#E879F9]"></i>
                </div>
                <div>
                  <p class="text-white/90">
                    Прочитали статью "Название статьи"
                  </p>
                  <p class="text-sm text-slate-400">2 часа назад</p>
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
import { ref, nextTick } from "vue";

Chart.register(...registerables);

const loading = ref(true);
const loadingEmotionBarometer = ref(true);

const loadingAssessments = ref(false);
const avatarUrl = ref(null); // Store the uploaded avatar URL
const emotionChart = ref(null);

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
  loadingEmotionBarometer.value = true; // Set loading to true initially

  // Initialize Firestore
  const db = getFirestore();

  if (currentUser) {
    // Store user data in the auth store
    authStore.user = currentUser;

    // Fetch the user's avatar URL
    avatarUrl.value = await fetchUserAvatarUrl(currentUser.uid);

    // Fetch the latest assessment results
    await fetchLatestAssessment(currentUser.uid);

    try {
      // Fetch emotion barometer stats
      const { success, stats } = await getEmotionBarometerStats(
        db,
        currentUser.uid
      );

      if (success) {
        // Update the emotion barometer stats
        emotionBarometerStats.value = stats;

        // Use nextTick to ensure the DOM is updated
        await nextTick();

        // Initialize the emotion distribution chart if there are entries
        if (
          emotionBarometerStats.value.totalEntries > 0 &&
          emotionChart.value
        ) {
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
      } else {
        console.error(
          "Failed to fetch emotion barometer stats:",
          stats?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error loading emotion barometer data:", error);
    } finally {
      loadingEmotionBarometer.value = false; // Set loading to false after data is fetched
    }

    // Set loading to false after all data is fetched
    loading.value = false;
  } else {
    // If the user is not logged in, clear the avatar URL
    avatarUrl.value = null;
  }
});

const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
/* Animated Background Grid */
.bg-grid-white {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Floating Animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Grid Animation */
@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

/* Orb Animations */
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1f35;
}

::-webkit-scrollbar-thumb {
  background: #0ea5e9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
</style>
