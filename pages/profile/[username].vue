<template>
  <div class="relative min-h-screen px-4 xl:px-0">
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
      <BioSection
        :loading="loadingBio"
        :profession="profession"
        :socialMedia="socialMedia"
        :age="age"
        :gender="gender"
        :aboutYourself="aboutYourself"
      />

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
import BioSection from "~/components/profile/BioSection.vue";
import Button from "~/components/base/Button.vue";
import Notification from "~/components/base/Notification.vue";
import PsychologicalProfile from "~/components/profile/PsychologicalProfile.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";

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
      console.log(data);
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

      // Transform the scores into the format expected by the component, including guide URLs
      archetypeScores.value = Object.entries(assessment.scores).map(
        ([name, level]) => ({
          name,
          level: parseFloat(level),
          icon: getIconForArchetype(name),
          guideUrl: archetypeGuides[name] || "#", // Add guide URL
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

// Logout user
const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};

const handleNotification = ({ message, type }) => {
  showNotification(message, type);
};
</script>
