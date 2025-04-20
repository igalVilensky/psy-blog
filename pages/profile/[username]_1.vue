<template>
  <div
    class="container mx-auto max-w-6xl relative z-10 py-12 px-4 sm:px-6 xl:px-0"
  >
    <!-- Profile Header -->
    <div class="profile-header mb-10 text-center">
      <h1 class="text-2xl sm:text-3xl font-semibold text-white/95 mb-3">
        С возвращением, {{ authStore.user?.displayName || "Путешественник" }}!
      </h1>
      <p class="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl mx-auto">
        Ваша Психологическая Карта — обзор вашего роста. Углубитесь в детали на
        <router-link
          to="/tree-of-self"
          class="text-[#0EA5E9] hover:text-[#E879F9] transition-colors duration-300 underline underline-offset-2"
        >
          Древе Себя </router-link
        >.
      </p>
    </div>

    <!-- Psychological Map Container -->
    <div class="flex flex-col items-center gap-10 mb-16 relative">
      <!-- Kabbalistic Tree Visualization -->
      <div class="w-full flex justify-center mb-6">
        <KabbalisticTree
          :loading="loading"
          :loading-bio="loadingBio"
          :loading-emotion-barometer="loadingEmotionBarometer"
          :loading-assessments="loadingAssessments"
          :bio-data="{ profession, age, gender }"
          :emotion-data="emotionBarometerStats"
          :insight-data="{ archetypeScores, topArchetype, coursesProgress }"
          :growth-data="growthData"
          :action-data="{ emotionBarometerStats, archetypeScores }"
          :calculate-essence-progress="calculateEssenceProgress"
          :avatar-url="avatarUrl"
          :user-initial="authStore.user?.displayName?.charAt(0).toUpperCase()"
          class="transform-gpu transition-all duration-500"
          :class="{ 'scale-95 opacity-75': loading }"
        />
      </div>

      <!-- Kabbalistic Worlds Cards -->
      <div
        class="w-full max-w-4xl bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-lg shadow-indigo-900/20"
      >
        <h3 class="text-xl font-semibold text-white/95 mb-6 flex items-center">
          <i class="fas fa-tree text-[#0EA5E9] mr-3"></i>
          Миры вашего роста
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Сущность -->
          <router-link
            to="/profile"
            class="group relative bg-[#1E293B]/70 rounded-xl p-5 hover:bg-[#7B68EE]/20 border border-[#7B68EE]/10 hover:border-[#7B68EE]/30 transition-all duration-300 overflow-hidden"
          >
            <div class="flex flex-col">
              <span class="text-[#9F87FF] font-semibold text-lg mb-1"
                >Сущность</span
              >
              <span class="text-slate-300 text-xs">Ваше ядро и потенциал</span>
              <div class="mt-4">
                <div
                  class="w-full bg-slate-800/70 rounded-full h-2.5 backdrop-blur"
                >
                  <div
                    class="bg-gradient-to-r from-[#7B68EE] to-[#9F87FF] h-2.5 rounded-full shadow-inner transition-all duration-700 ease-out"
                    :style="{ width: `${calculateEssenceProgress()}%` }"
                  ></div>
                </div>
                <span
                  class="text-slate-200 text-xs mt-2 inline-block font-medium"
                >
                  {{ calculateEssenceProgress() }}%
                </span>
              </div>
              <div
                class="mt-3 text-sm text-[#9F87FF] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
              >
                Заполнить профиль
                <i class="fas fa-arrow-right ml-1 text-xs"></i>
              </div>
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#7B68EE]/30 group-hover:bg-[#7B68EE] transition-colors duration-300"
            ></div>
            <div
              class="absolute inset-0 bg-[#7B68EE]/10 rounded-xl animate-pulse"
              v-if="calculateEssenceProgress() < 50"
            ></div>
          </router-link>

          <!-- Прозрение -->
          <router-link
            to="/assessments"
            class="group relative bg-[#1E293B]/70 rounded-xl p-5 hover:bg-[#0EA5E9]/20 border border-[#0EA5E9]/10 hover:border-[#0EA5E9]/30 transition-all duration-300 overflow-hidden"
          >
            <div class="flex flex-col">
              <span class="text-[#38BDF8] font-semibold text-lg mb-1"
                >Прозрение</span
              >
              <span class="text-slate-300 text-xs">Мудрость и ясность</span>
              <div class="mt-4">
                <div
                  class="w-full bg-slate-800/70 rounded-full h-2.5 backdrop-blur"
                >
                  <div
                    class="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] h-2.5 rounded-full shadow-inner transition-all duration-700 ease-out"
                    :style="{ width: `${calculateInsightProgress()}%` }"
                  ></div>
                </div>
                <span
                  class="text-slate-200 text-xs mt-2 inline-block font-medium"
                >
                  {{ calculateInsightProgress() }}%
                </span>
              </div>
              <div
                class="mt-3 text-sm text-[#38BDF8] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
              >
                Пройти тест <i class="fas fa-arrow-right ml-1 text-xs"></i>
              </div>
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#0EA5E9]/30 group-hover:bg-[#0EA5E9] transition-colors duration-300"
            ></div>
            <div
              class="absolute inset-0 bg-[#0EA5E9]/10 rounded-xl animate-pulse"
              v-if="calculateInsightProgress() < 50"
            ></div>
          </router-link>

          <!-- Внутренний Мир -->
          <router-link
            to="/emotion-barometer"
            class="group relative bg-[#1E293B]/70 rounded-xl p-5 hover:bg-[#EC4899]/20 border border-[#EC4899]/10 hover:border-[#EC4899]/30 transition-all duration-300 overflow-hidden"
          >
            <div class="flex flex-col">
              <span class="text-[#FB7BC9] font-semibold text-lg mb-1"
                >Внутренний Мир</span
              >
              <span class="text-slate-300 text-xs">Эмоции и глубина</span>
              <div class="mt-4">
                <div
                  class="w-full bg-slate-800/70 rounded-full h-2.5 backdrop-blur"
                >
                  <div
                    class="bg-gradient-to-r from-[#EC4899] to-[#FB7BC9] h-2.5 rounded-full shadow-inner transition-all duration-700 ease-out"
                    :style="{ width: `${calculateInnerRealmProgress()}%` }"
                  ></div>
                </div>
                <span
                  class="text-slate-200 text-xs mt-2 inline-block font-medium"
                >
                  {{ calculateInnerRealmProgress() }}%
                </span>
              </div>
              <div
                class="mt-3 text-sm text-[#FB7BC9] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
              >
                Записать эмоцию <i class="fas fa-arrow-right ml-1 text-xs"></i>
              </div>
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#EC4899]/30 group-hover:bg-[#EC4899] transition-colors duration-300"
            ></div>
            <div
              class="absolute inset-0 bg-[#EC4899]/10 rounded-xl animate-pulse"
              v-if="calculateInnerRealmProgress() < 50"
            ></div>
          </router-link>

          <!-- Эволюция -->
          <router-link
            to="/daily-growth-spark"
            class="group relative bg-[#1E293B]/70 rounded-xl p-5 hover:bg-[#10B981]/20 border border-[#10B981]/10 hover:border-[#10B981]/30 transition-all duration-300 overflow-hidden"
          >
            <div class="flex flex-col">
              <span class="text-[#34D399] font-semibold text-lg mb-1"
                >Эволюция</span
              >
              <span class="text-slate-300 text-xs">Формирование и рост</span>
              <div class="mt-4">
                <div
                  class="w-full bg-slate-800/70 rounded-full h-2.5 backdrop-blur"
                >
                  <div
                    class="bg-gradient-to-r from-[#10B981] to-[#34D399] h-2.5 rounded-full shadow-inner transition-all duration-700 ease-out"
                    :style="{ width: `${calculateEvolutionProgress()}%` }"
                  ></div>
                </div>
                <span
                  class="text-slate-200 text-xs mt-2 inline-block font-medium"
                >
                  {{ calculateEvolutionProgress() }}%
                </span>
              </div>
              <div
                class="mt-3 text-sm text-[#34D399] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
              >
                Добавить инсайт <i class="fas fa-arrow-right ml-1 text-xs"></i>
              </div>
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#10B981]/30 group-hover:bg-[#10B981] transition-colors duration-300"
            ></div>
            <div
              class="absolute inset-0 bg-[#10B981]/10 rounded-xl animate-pulse"
              v-if="calculateEvolutionProgress() < 50"
            ></div>
          </router-link>

          <!-- Действие -->
          <router-link
            to="/courses"
            class="group relative bg-[#1E293B]/70 rounded-xl p-5 hover:bg-[#F59E0B]/20 border border-[#F59E0B]/10 hover:border-[#F59E0B]/30 transition-all duration-300 overflow-hidden"
          >
            <div class="flex flex-col">
              <span class="text-[#FBBF24] font-semibold text-lg mb-1"
                >Действие</span
              >
              <span class="text-slate-300 text-xs"
                >Воплощение и результаты</span
              >
              <div class="mt-4">
                <div
                  class="w-full bg-slate-800/70 rounded-full h-2.5 backdrop-blur"
                >
                  <div
                    class="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] h-2.5 rounded-full shadow-inner transition-all duration-700 ease-out"
                    :style="{ width: `${calculateActionProgress()}%` }"
                  ></div>
                </div>
                <span
                  class="text-slate-200 text-xs mt-2 inline-block font-medium"
                >
                  {{ calculateActionProgress() }}%
                </span>
              </div>
              <div
                class="mt-3 text-sm text-[#FBBF24] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"
              >
                Пройти курс <i class="fas fa-arrow-right ml-1 text-xs"></i>
              </div>
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-[#F59E0B]/30 group-hover:bg-[#F59E0B] transition-colors duration-300"
            ></div>
            <div
              class="absolute inset-0 bg-[#F59E0B]/10 rounded-xl animate-pulse"
              v-if="calculateActionProgress() < 50"
            ></div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-50 fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNotification } from "@/composables/useNotification";
import { useAuthStore } from "~/stores/auth";
import { getFirestore } from "firebase/firestore";
import Notification from "~/components/base/Notification.vue";
import KabbalisticTree from "~/components/profile/KabbalisticTree.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";
import { getDailyGrowthSparkData } from "~/api/firebase/dailyGrowthSpark";

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

const loading = ref(true);
const loadingBio = ref(true);
const loadingEmotionBarometer = ref(true);
const loadingAssessments = ref(false);
const avatarUrl = ref(null);
const authStore = useAuthStore();
const router = useRouter();

// Essence Sphere (Bio Data)
const profession = ref("");
const socialMedia = ref("");
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");

// Inner Realm Sphere (Emotional Data)
const emotionBarometerStats = ref({
  totalEntries: 0,
  mostCommonEmotion: "",
  averageIntensity: 0,
  mostCommonTag: "",
  emotionDistribution: {},
});

// Insight Sphere (Cognitive Data)
const archetypeScores = ref([]);
const coursesProgress = ref([]);
const topArchetype = computed(() =>
  archetypeScores.value.length > 0
    ? archetypeScores.value.reduce((max, curr) =>
        curr.level > max.level ? curr : max
      ).name
    : "Н/Д"
);

// Evolution Sphere (Growth Data)
const growthData = ref({
  entries: [],
  streakDays: 0,
  points: 0,
  lastUpdated: null,
});
const latestGrowthSpark = computed(() =>
  growthData.value.entries.length > 0
    ? growthData.value.entries[0].insight || "Н/Д"
    : "Н/Д"
);

// Fetch Data Functions
const fetchBioData = async (userId) => {
  const db = getFirestore();
  const { doc, getDoc } = await import("firebase/firestore");
  const userRef = doc(db, "users", userId);
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      profession.value = data.profession || "Не указано";
      socialMedia.value = data.socialMedia || "Не указано";
      age.value = data.age || "Не указано";
      gender.value = data.gender || "Не указано";
      aboutYourself.value = data.aboutYourself || "Не указано";
    }
  } catch (error) {
    console.error("Error fetching bio data:", error);
  } finally {
    loadingBio.value = false;
  }
};

const fetchEmotionData = async (userId) => {
  const db = getFirestore();
  const { success, stats } = await getEmotionBarometerStats(db, userId);
  if (success) emotionBarometerStats.value = stats;
  loadingEmotionBarometer.value = false;
};

const fetchAssessmentData = async (userId) => {
  loadingAssessments.value = true;
  const db = getFirestore();
  const { success, assessment } = await getLatestUserAssessment(db, userId);
  if (success && assessment) {
    archetypeScores.value = Object.entries(assessment.scores).map(
      ([name, level]) => ({
        name,
        level: parseFloat(level),
      })
    );
  }
  loadingAssessments.value = false;
};

const fetchCoursesProgress = async () => {
  coursesProgress.value =
    archetypeScores.value.length > 0 ? [{ name: "Тест архетипов" }] : [];
};

const fetchGrowthSpark = async (userId) => {
  const db = getFirestore();
  const { success, data } = await getDailyGrowthSparkData(db, userId);
  if (success) {
    growthData.value = data;
  } else {
    console.error("Failed to fetch daily growth spark data");
  }
};

// Calculate Progress for Each World
const calculateEssenceProgress = () => {
  let filledFields = 0;
  if (profession.value !== "Не указано") filledFields++;
  if (socialMedia.value !== "Не указано") filledFields++;
  if (age.value !== "Не указано") filledFields++;
  if (gender.value !== "Не указано") filledFields++;
  if (aboutYourself.value !== "Не указано") filledFields++;
  return Math.round((filledFields / 5) * 100); // 5 fields total
};

const calculateInsightProgress = () => {
  // Example: Progress based on archetype scores or assessments completed
  return archetypeScores.value.length > 0 ? 100 : 0;
};

const calculateInnerRealmProgress = () => {
  // Example: Progress based on emotion barometer entries
  const maxEntries = 10; // Arbitrary max for scaling
  return Math.round(
    Math.min((emotionBarometerStats.value.totalEntries / maxEntries) * 100, 100)
  );
};

const calculateEvolutionProgress = () => {
  // Example: Progress based on growth spark points
  const maxPoints = 100; // Arbitrary max for scaling
  return Math.round(Math.min((growthData.value.points / maxPoints) * 100, 100));
};

const calculateActionProgress = () => {
  // Example: Progress based on courses completed
  return coursesProgress.value.length > 0 ? 50 : 0; // Placeholder
};

onMounted(async () => {
  await authStore.initAuth();
  if (authStore.user) {
    avatarUrl.value = await fetchUserAvatarUrl(authStore.user.uid);
    await Promise.all([
      fetchBioData(authStore.user.uid),
      fetchEmotionData(authStore.user.uid),
      fetchAssessmentData(authStore.user.uid),
      fetchCoursesProgress(),
      fetchGrowthSpark(authStore.user.uid),
    ]);
    loading.value = false;
    // Show welcome notification with slight delay for better UX
    setTimeout(() => {
      showNotification(
        "Добро пожаловать в Пси-Карту! Исследуйте свои Миры и развивайте Древо Себя.",
        "info"
      );
    }, 1000);
  }
});

const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};

const handleNotification = ({ message, type }) => {
  showNotification(message, type);
};
</script>

<style scoped>
/* Progress bar shine effect */
@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* Card hover effects */
.group:hover .animate-pulse {
  animation-play-state: paused;
}

/* Loading skeleton pulse animation */
@keyframes skeleton-pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
}

/* Enhanced focus styles for accessibility */
a:focus,
button:focus {
  outline: 2px solid rgba(99, 102, 241, 0.5);
  outline-offset: 2px;
}

/* Better transitions for hover states */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
