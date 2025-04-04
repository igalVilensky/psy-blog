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

      <!-- Spheres Grid - Improved Layout -->
      <div class="w-full max-w-6xl">
        <!-- Top Row: 3 cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Essence Sphere (Adam Kadmon) -->
          <div
            class="sphere bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all transform hover:translate-y-[-4px] duration-300"
          >
            <h3 class="text-lg font-bold text-white/90 mb-6 flex items-center">
              <i class="fas fa-seedling text-[#0EA5E9] mr-3"></i>
              Сущность
            </h3>
            <div
              v-if="loadingBio"
              class="flex justify-center items-center h-48"
            >
              <i class="fas fa-spinner fa-spin text-[#0EA5E9] text-xl"></i>
            </div>
            <div v-else class="space-y-3">
              <p class="text-slate-300">
                Профессия: {{ profession || "Не указано" }}
              </p>
              <p class="text-slate-300">Возраст: {{ age || "Не указано" }}</p>
              <p class="text-slate-300">Пол: {{ gender || "Не указано" }}</p>
              <p class="text-slate-300 truncate">
                Соцсети: {{ socialMedia || "Не указано" }}
              </p>
              <p class="text-slate-300 truncate">
                О себе: {{ aboutYourself || "Не указано" }}
              </p>
              <div
                class="sphere-progress mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                  :style="`width: ${calculateEssenceProgress()}%`"
                ></div>
              </div>
            </div>
          </div>

          <!-- Insight Sphere (Atzilut) -->
          <div
            class="sphere bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all transform hover:translate-y-[-4px] duration-300"
          >
            <h3 class="text-lg font-bold text-white/90 mb-6 flex items-center">
              <i class="fas fa-lightbulb text-[#0EA5E9] mr-3"></i>
              Прозрение
            </h3>
            <div
              v-if="loadingAssessments"
              class="flex justify-center items-center h-48"
            >
              <i class="fas fa-spinner fa-spin text-[#0EA5E9] text-xl"></i>
            </div>
            <div v-else class="space-y-3">
              <p class="text-slate-300">
                Пройдено архетипов: {{ archetypeScores.length }}
              </p>
              <p class="text-slate-300">Основной архетип: {{ topArchetype }}</p>
              <p class="text-slate-300">Курсы: {{ coursesProgress.length }}</p>
              <div
                class="sphere-progress mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                  :style="`width: ${Math.min(
                    archetypeScores.length * 20,
                    100
                  )}%`"
                ></div>
              </div>
              <Button
                to="/courses"
                text="Подробнее"
                iconClass="fas fa-arrow-right"
                gradientStart="#0EA5E9"
                gradientEnd="#E879F9"
                textColor="white"
                customClass="mt-6 w-full"
              />
            </div>
          </div>

          <!-- Inner Realm Sphere (Beriah) -->
          <div
            class="sphere bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all transform hover:translate-y-[-4px] duration-300"
          >
            <h3 class="text-lg font-bold text-white/90 mb-6 flex items-center">
              <i class="fas fa-heart text-[#0EA5E9] mr-3"></i>
              Внутренний Мир
            </h3>
            <div
              v-if="loadingEmotionBarometer"
              class="flex justify-center items-center h-48"
            >
              <i class="fas fa-spinner fa-spin text-[#0EA5E9] text-xl"></i>
            </div>
            <div
              v-else-if="emotionBarometerStats.totalEntries > 0"
              class="space-y-3"
            >
              <p class="text-slate-300">
                Записей: {{ emotionBarometerStats.totalEntries }}
              </p>
              <p class="text-slate-300">
                Основная эмоция: {{ emotionBarometerStats.mostCommonEmotion }}
              </p>
              <p class="text-slate-300">
                Средняя интенсивность:
                {{ emotionBarometerStats.averageIntensity.toFixed(1) }}
              </p>
              <div
                class="sphere-progress mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                  :style="`width: ${Math.min(
                    emotionBarometerStats.totalEntries * 10,
                    100
                  )}%`"
                ></div>
              </div>
              <Button
                to="/awareness-tools/emotional-compass"
                text="Исследовать"
                iconClass="fas fa-arrow-right"
                gradientStart="#0EA5E9"
                gradientEnd="#E879F9"
                textColor="white"
                customClass="mt-6 w-full"
              />
            </div>
            <div
              v-else
              class="text-center text-slate-400 flex flex-col items-center justify-center h-48"
            >
              <i
                class="fas fa-wind text-[#0EA5E9] text-3xl mb-3 opacity-50"
              ></i>
              <p>Нет данных об эмоциях.</p>
              <NuxtLink
                to="/awareness-tools/emotional-compass"
                class="text-[#0EA5E9] hover:underline mt-4"
              >
                Попробовать Эмоциональный Компас
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Bottom Row: 2 cards in center -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-2xl mx-auto">
          <!-- Evolution Sphere (Yetzirah) -->
          <div
            class="sphere bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all transform hover:translate-y-[-4px] duration-300"
          >
            <h3 class="text-lg font-bold text-white/90 mb-6 flex items-center">
              <i class="fas fa-arrow-up text-[#0EA5E9] mr-3"></i>
              Эволюция
            </h3>
            <div v-if="loading" class="flex justify-center items-center h-48">
              <i class="fas fa-spinner fa-spin text-[#0EA5E9] text-xl"></i>
            </div>
            <div v-else-if="dailyGrowthSpark.length > 0" class="space-y-3">
              <p class="text-slate-300">
                Инсайтов: {{ dailyGrowthSpark.length }}
              </p>
              <p class="text-slate-300">Последний: {{ latestGrowthSpark }}</p>
              <div
                class="sphere-progress mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                  :style="`width: ${Math.min(
                    dailyGrowthSpark.length * 20,
                    100
                  )}%`"
                ></div>
              </div>
              <Button
                to="/growth-tools"
                text="Добавить инсайт"
                iconClass="fas fa-arrow-right"
                gradientStart="#0EA5E9"
                gradientEnd="#E879F9"
                textColor="white"
                customClass="mt-6 w-full"
              />
            </div>
            <div
              v-else
              class="text-center text-slate-400 flex flex-col items-center justify-center h-48"
            >
              <i
                class="fas fa-lightbulb text-[#0EA5E9] text-3xl mb-3 opacity-50"
              ></i>
              <p>Нет данных о росте.</p>
              <NuxtLink
                to="/growth-tools"
                class="text-[#0EA5E9] hover:underline mt-4"
              >
                Добавить инсайт
              </NuxtLink>
            </div>
          </div>

          <!-- Action Sphere (Assiyah) -->
          <div
            class="sphere bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all transform hover:translate-y-[-4px] duration-300"
          >
            <h3 class="text-lg font-bold text-white/90 mb-6 flex items-center">
              <i class="fas fa-running text-[#0EA5E9] mr-3"></i>
              Действие
            </h3>
            <div
              v-if="loadingEmotionBarometer"
              class="flex justify-center items-center h-48"
            >
              <i class="fas fa-spinner fa-spin text-[#0EA5E9] text-xl"></i>
            </div>
            <div
              v-else-if="
                emotionBarometerStats.totalEntries > 0 ||
                archetypeScores.length > 0
              "
              class="space-y-3"
            >
              <p class="text-slate-300">
                Использований компаса:
                {{ emotionBarometerStats.totalEntries }}
              </p>
              <p class="text-slate-300">
                Пройдено тестов: {{ archetypeScores.length }}
              </p>
              <div
                class="sphere-progress mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                  :style="`width: ${Math.min(
                    emotionBarometerStats.totalEntries * 10 +
                      archetypeScores.length * 10,
                    100
                  )}%`"
                ></div>
              </div>
              <Button
                to="/awareness-tools"
                text="Исследовать инструменты"
                iconClass="fas fa-arrow-right"
                gradientStart="#0EA5E9"
                gradientEnd="#E879F9"
                textColor="white"
                customClass="mt-6 w-full"
              />
            </div>
            <div
              v-else
              class="text-center text-slate-400 flex flex-col items-center justify-center h-48"
            >
              <i
                class="fas fa-shoe-prints text-[#0EA5E9] text-3xl mb-3 opacity-50"
              ></i>
              <p>Нет данных о поведении.</p>
              <NuxtLink
                to="/awareness-tools"
                class="text-[#0EA5E9] hover:underline mt-4"
              >
                Исследовать инструменты
              </NuxtLink>
            </div>
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
import Button from "~/components/base/Button.vue";
import Notification from "~/components/base/Notification.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";

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
const dailyGrowthSpark = ref([]);
const latestGrowthSpark = computed(() =>
  dailyGrowthSpark.value.length > 0 ? dailyGrowthSpark.value[0] : "Н/Д"
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

const fetchGrowthSpark = async () => {
  dailyGrowthSpark.value = []; // Replace with actual API call when available
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
      fetchGrowthSpark(),
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

.sphere {
  min-height: 250px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.sphere:after {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(14, 165, 233, 0.05),
    transparent
  );
  transform: rotate(45deg);
  pointer-events: none;
}

@media (min-width: 1024px) {
  .sphere {
    min-height: 300px;
  }
  .sphere:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px -5px rgba(14, 165, 233, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
