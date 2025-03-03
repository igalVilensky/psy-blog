<template>
  <div class="relative min-h-screen px-4 sm:px-0">
    <div class="container mx-auto max-w-6xl relative z-10 py-16">
      <!-- Enhanced Profile Header -->
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
      <div
        class="bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 shadow-2xl"
      >
        <!-- Title and Progress Bar -->
        <div
          class="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8 mb-8"
        >
          <!-- Title -->
          <h2 class="text-2xl font-bold text-white/90 flex-shrink-0">
            <i class="fas fa-user-edit text-[#0EA5E9] mr-3"></i>О себе
          </h2>

          <!-- Progress Bar -->
          <div class="w-full sm:w-auto flex items-center gap-4 sm:gap-4">
            <span class="text-slate-400 text-sm whitespace-nowrap"
              >Заполнено:</span
            >
            <div
              class="w-24 sm:w-32 bg-[#1A1F35]/40 rounded-full h-2 flex-grow"
            >
              <div
                class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] h-2 rounded-full transition-all duration-500"
                :style="{ width: bioCompletionPercentage + '%' }"
              ></div>
            </div>
            <span class="text-slate-300 text-sm font-medium whitespace-nowrap">
              {{ bioCompletionPercentage }}%
            </span>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loadingBio"
          class="flex flex-col items-center justify-center h-64"
        >
          <i class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9] mb-4"></i>
          <p class="text-slate-300">Загрузка данных...</p>
        </div>

        <!-- Bio Data -->
        <div v-else class="space-y-8">
          <!-- Info Cards Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <!-- Profession -->
            <div
              class="bg-[#1A1F35]/40 p-4 sm:p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-3 sm:gap-4 mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i
                    class="fas fa-briefcase text-[#0EA5E9] text-sm sm:text-base"
                  ></i>
                </div>
                <p class="text-slate-400 font-medium text-sm sm:text-base">
                  Профессия
                </p>
              </div>
              <p v-if="profession" class="text-white/90 text-base sm:text-lg">
                {{ profession }}
              </p>
              <p v-else class="text-slate-400 text-sm">Не указано</p>
            </div>

            <!-- Social Media -->
            <div
              class="bg-[#1A1F35]/40 p-4 sm:p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-3 sm:gap-4 mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i
                    class="fas fa-share-alt text-[#0EA5E9] text-sm sm:text-base"
                  ></i>
                </div>
                <p class="text-slate-400 font-medium text-sm sm:text-base">
                  Социальные сети
                </p>
              </div>
              <div v-if="socialMedia?.length > 0" class="space-y-2">
                <div
                  v-for="(platform, index) in socialMedia"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <i
                    :class="{
                      'fab fa-telegram': platform.type === 'telegram',
                      'fab fa-vk': platform.type === 'vk',
                      'fab fa-instagram': platform.type === 'instagram',
                      'fab fa-facebook': platform.type === 'facebook',
                    }"
                    class="text-[#0EA5E9] text-lg"
                  ></i>
                  <a
                    :href="platform.url"
                    target="_blank"
                    class="text-white/90 text-base sm:text-lg hover:underline truncate max-w-[200px] sm:max-w-[300px]"
                    :title="platform.url"
                  >
                    {{ platform.url }}
                  </a>
                </div>
              </div>
              <p v-else class="text-slate-400 text-sm">Не указано</p>
            </div>

            <!-- Age -->
            <div
              class="bg-[#1A1F35]/40 p-4 sm:p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-3 sm:gap-4 mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i
                    class="fas fa-birthday-cake text-[#0EA5E9] text-sm sm:text-base"
                  ></i>
                </div>
                <p class="text-slate-400 font-medium text-sm sm:text-base">
                  Возраст
                </p>
              </div>
              <p v-if="age" class="text-white/90 text-base sm:text-lg">
                {{ age }}
              </p>
              <p v-else class="text-slate-400 text-sm">Не указано</p>
            </div>

            <!-- Gender -->
            <div
              class="bg-[#1A1F35]/40 p-4 sm:p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-3 sm:gap-4 mb-3">
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i
                    class="fas fa-venus-mars text-[#0EA5E9] text-sm sm:text-base"
                  ></i>
                </div>
                <p class="text-slate-400 font-medium text-sm sm:text-base">
                  Пол
                </p>
              </div>
              <p v-if="gender" class="text-white/90 text-base sm:text-lg">
                {{ gender }}
              </p>
              <p v-else class="text-slate-400 text-sm">Не указано</p>
            </div>
          </div>

          <!-- About Text -->
          <div
            class="bg-[#1A1F35]/40 p-6 sm:p-8 rounded-2xl border border-white/5"
          >
            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center"
              >
                <i
                  class="fas fa-quote-right text-[#0EA5E9] text-lg sm:text-xl"
                ></i>
              </div>
              <p class="text-slate-400 font-medium text-base sm:text-lg">
                О себе
              </p>
            </div>
            <p
              v-if="aboutYourself"
              class="text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-line"
            >
              {{ aboutYourself }}
            </p>
            <p v-else class="text-slate-400 text-sm">Расскажите о себе...</p>
          </div>

          <!-- CTA to Fill Missing Data -->
          <div v-if="bioCompletionPercentage < 100" class="text-center">
            <NuxtLink
              to="/profile/settings"
              class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 hover:shadow-lg"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
              >
                <i class="fas fa-plus"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fas fa-plus mr-2"></i>Добавить информацию
              </span>
              <span class="relative invisible">Добавить информацию</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Emotional Barometer Section -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 mb-8"
      >
        <h2 class="text-xl font-bold text-white/90 mb-4">
          <i class="fas fa-chart-line text-[#0EA5E9] mr-2"></i>
          Эмоциональный компас
        </h2>

        <!-- CTA Link with Hover Effect -->
        <div v-if="emotionBarometerStats.totalEntries > 0" class="mb-6">
          <Button
            to="/awareness-tools/emotional-compass"
            text="Перейти к барометру"
            iconClass="fas fa-arrow-right"
            gradientStart="#0EA5E9"
            gradientEnd="#E879F9"
            textColor="#0EA5E9"
            customClass="flex-1 lg:flex-initial border-[#0EA5E9]/20"
          />
        </div>

        <!-- Loading State -->
        <div
          v-if="loadingEmotionBarometer"
          class="flex flex-col items-center justify-center h-64"
        >
          <i class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9] mb-4"></i>
          <p class="text-slate-300">Загрузка данных...</p>
        </div>

        <!-- No Data State -->

        <div
          v-else-if="emotionBarometerStats.totalEntries === 0"
          class="empty-state"
        >
          <div
            class="flex flex-col items-center justify-center h-64 text-center"
          >
            <i
              class="fas fa-chart-pie text-4xl text-[#0EA5E9] mb-4 animate-bounce"
            ></i>
            <p class="text-slate-300">Нет данных для отображения.</p>
            <p class="text-sm text-slate-400 mt-2">
              Начните использовать Эмоциональный компас, чтобы отслеживать свои
              эмоции
            </p>
            <NuxtLink
              to="/awareness-tools/emotional-compass"
              class="mt-4 relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#0EA5E9]/20"
            >
              <i class="fas fa-play-circle text-sm mr-2"></i>
              Пройти тест
            </NuxtLink>
          </div>
        </div>

        <!-- Stats Grid -->
        <div v-else>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <!-- Total Entries -->
            <div
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-calculator text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Всего записей</p>
              </div>
              <p class="text-white/90 text-2xl font-bold">
                {{ emotionBarometerStats.totalEntries }}
              </p>
            </div>

            <!-- Most Common Emotion -->
            <div
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-heart text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Частая эмоция</p>
              </div>
              <p class="text-white/90 text-2xl font-bold">
                {{ emotionBarometerStats.mostCommonEmotion }}
              </p>
            </div>

            <!-- Average Intensity -->
            <div
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-tachometer-alt text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Средняя интенсивность</p>
              </div>
              <p class="text-white/90 text-2xl font-bold">
                {{ emotionBarometerStats.averageIntensity.toFixed(1) }}
              </p>
            </div>

            <!-- Most Common Tag -->
            <div
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-tags text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Частая сфера жизни</p>
              </div>
              <p class="text-white/90 text-2xl font-bold">
                {{ emotionBarometerStats.mostCommonTag }}
              </p>
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

      <!-- Psychological Profile Section -->
      <PsychologicalProfile
        :archetypes="archetypeScores"
        :loading="loadingAssessments"
      />
    </div>

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
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useNotification } from "@/composables/useNotification";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Chart, registerables } from "chart.js";
import ProfileHeader from "~/components/profile/ProfileHeader.vue";
import Button from "~/components/base/Button.vue";
import Notification from "~/components/base/Notification.vue";
import PsychologicalProfile from "~/components/profile/PsychologicalProfile.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";

// Register Chart.js plugins
Chart.register(...registerables);

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

// Refs for loading states and data
const loading = ref(true);
const loadingBio = ref(true);
const loadingEmotionBarometer = ref(true);
const loadingAssessments = ref(false);
const avatarUrl = ref(null);
const emotionChart = ref(null);

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

// Initialize auth store
const authStore = useAuthStore();
const router = useRouter();

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

// Get icon for archetype
const getIconForArchetype = (name) => {
  const icons = {
    творец: "fa-paint-brush", // Painter's brush for creators
    исследователь: "fa-compass", // Compass for explorers
    мудрец: "fa-book-open", // Open book for sages
    воин: "fa-shield-alt", // Shield for warriors
    маг: "fa-magic", // Magic wand for magicians
    заботливый: "fa-heart", // Hands with a heart for caregivers
    наставник: "fa-chalkboard-teacher", // Chalkboard teacher for mentors
    правитель: "fa-crown", // Crown for rulers
    друг: "fa-handshake", // Handshake for friends
    шут: "fa-laugh", // Laughing face for jesters
    мятежник: "fa-fire", // Fire for rebels
    герой: "fa-medal", // Medal for heroes (unique icon)
  };
  return icons[name] || "fa-question"; // Default to question mark if not found
};

// Initialize auth and fetch data
onMounted(async () => {
  await authStore.initAuth(); // Initialize auth

  if (authStore.user) {
    // Fetch the user's avatar URL
    avatarUrl.value = await fetchUserAvatarUrl(authStore.user.uid);

    // Fetch bio data
    await fetchBioData(authStore.user.uid);

    // Fetch emotion barometer stats
    try {
      const db = getFirestore();
      const { success, stats } = await getEmotionBarometerStats(
        db,
        authStore.user.uid
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

    // Fetch the latest assessment results
    await fetchLatestAssessment(authStore.user.uid);

    // Set loading to false after all data is fetched
    loading.value = false;
  } else {
    // If the user is not logged in, clear the avatar URL
    avatarUrl.value = null;
  }
});

// Check if bio data exists
const bioDataExists = computed(() => {
  return (
    profession.value ||
    socialMedia.value ||
    age.value ||
    gender.value ||
    aboutYourself.value
  );
});

// Calculate bio completion percentage
const bioCompletionPercentage = computed(() => {
  const fields = [
    profession.value,
    socialMedia.value,
    age.value,
    gender.value,
    aboutYourself.value,
  ];
  const filledFields = fields.filter((field) => field).length;
  return (filledFields / fields.length) * 100;
});

// Logout user
const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};

const handleNotification = ({ message, type }) => {
  showNotification(message, type);
};
</script>
