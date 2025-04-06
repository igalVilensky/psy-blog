<template>
  <div class="container mx-auto max-w-6xl relative z-10 py-12 px-6 xl:px-0">
    <!-- Profile Header -->
    <div>
      <ProfileHeader
        :avatarUrl="avatarUrl"
        :loading="loading"
        :displayName="authStore.user?.displayName || 'Пользователь'"
        :email="authStore.user?.email || 'Email не указан'"
        :userInitial="authStore.user?.displayName?.charAt(0).toUpperCase()"
        @update:avatarUrl="avatarUrl = $event"
        @logout="logoutUser"
        @notify="handleNotification($event)"
      />
    </div>

    <!-- Psychological Map Container -->
    <div class="psychological-map flex flex-col items-center gap-8 mb-16">
      <h2
        class="text-2xl sm:text-3xl lg:text-4xl font-bold sm:my-8 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] bg-clip-text text-transparent"
      >
        Ваша Психологическая Карта
      </h2>

      <!-- Kabbalistic Tree Visualization -->
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
      />

      <!-- Kabbalistic Worlds Legend -->
      <div
        class="w-full max-w-4xl bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
      >
        <h3 class="text-lg font-semibold text-white/90 mb-4 flex items-center">
          <i class="fas fa-tree text-[#0EA5E9] mr-2"></i>
          Каббалистические миры
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div class="flex flex-col">
            <span class="text-[#7B68EE] font-medium">Адам Кадмон</span>
            <span class="text-slate-300">Сущность, потенциал</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[#0EA5E9] font-medium">Ацилут</span>
            <span class="text-slate-300">Мудрость, ясность</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[#EC4899] font-medium">Брия</span>
            <span class="text-slate-300">Эмоции, глубина</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[#10B981] font-medium">Йецира</span>
            <span class="text-slate-300">Формирование, рост</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[#F59E0B] font-medium">Асия</span>
            <span class="text-slate-300">Действие, материя</span>
          </div>
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
import ProfileHeader from "~/components/profile/ProfileHeader.vue";
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
  if (success) {
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

// Calculate Progress for Essence Sphere
const calculateEssenceProgress = () => {
  let filledFields = 0;
  if (profession.value !== "Не указано") filledFields++;
  if (socialMedia.value !== "Не указано") filledFields++;
  if (age.value !== "Не указано") filledFields++;
  if (gender.value !== "Не указано") filledFields++;
  if (aboutYourself.value !== "Не указано") filledFields++;
  return (filledFields / 5) * 100; // 5 fields total
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
.psychological-map {
  position: relative;
}

/* Star field background on the page to represent Kabbalistic cosmos */
.psychological-map:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      circle at 25% 25%,
      rgba(14, 165, 233, 0.05) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(232, 121, 249, 0.05) 1px,
      transparent 1px
    );
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  z-index: -1;
  pointer-events: none;
}
</style>
