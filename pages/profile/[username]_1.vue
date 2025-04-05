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
      <div class="w-full max-w-6xl mb-12 relative">
        <!-- Connection Lines -->
        <div class="absolute inset-0 z-0 hidden md:block">
          <!-- Central axis -->
          <div
            class="absolute top-1/2 left-1/2 h-full w-0.5 bg-gradient-to-b from-[#0EA5E9]/50 to-[#E879F9]/50 transform -translate-x-1/2 -translate-y-1/2"
          ></div>

          <!-- Horizontal connecting lines -->
          <div
            class="absolute top-[15%] left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9]/30 to-[#E879F9]/30"
          ></div>
          <div
            class="absolute top-[50%] left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9]/30 to-[#E879F9]/30"
          ></div>
          <div
            class="absolute top-[85%] left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9]/30 to-[#E879F9]/30"
          ></div>
        </div>

        <!-- Tree of Life Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <!-- Adam Kadmon (Crown) - Essence -->
          <div class="md:col-start-2 md:col-span-1">
            <div
              class="sphere bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 hover:shadow-lg hover:shadow-[#7B68EE]/20 transition-all transform hover:translate-y-[-4px] duration-300 relative overflow-hidden"
            >
              <!-- Decorative Element -->
              <div
                class="absolute top-0 right-0 w-24 h-24 bg-[#7B68EE]/10 rounded-full blur-2xl"
              ></div>

              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-white/90 flex items-center">
                  <i class="fas fa-crown text-[#7B68EE] mr-3"></i>
                  Сущность
                </h3>
                <span class="text-xs text-white/50">Адам Кадмон</span>
              </div>

              <p class="text-sm text-white/60 mb-4">
                Ваша истинная природа, основа всего, потенциал души.
              </p>

              <div
                v-if="loadingBio"
                class="flex justify-center items-center h-36"
              >
                <i class="fas fa-spinner fa-spin text-[#7B68EE] text-xl"></i>
              </div>
              <div v-else class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Профессия:</span>
                  <span class="text-white font-medium">{{
                    profession || "Не указано"
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Возраст:</span>
                  <span class="text-white font-medium">{{
                    age || "Не указано"
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Пол:</span>
                  <span class="text-white font-medium">{{
                    gender || "Не указано"
                  }}</span>
                </div>

                <div
                  class="sphere-progress mt-6 h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-gradient-to-r from-[#7B68EE] to-[#E879F9]"
                    :style="`width: ${calculateEssenceProgress()}%`"
                  ></div>
                </div>

                <Button
                  to="/profile/edit"
                  text="Редактировать"
                  iconClass="fas fa-pen"
                  gradientStart="#7B68EE"
                  gradientEnd="#E879F9"
                  textColor="white"
                  customClass="mt-4 w-full"
                />
              </div>
            </div>
          </div>

          <!-- Empty cell for grid spacing -->
          <div class="hidden md:block"></div>

          <!-- Empty cell for grid spacing -->
          <div class="hidden md:block"></div>

          <!-- Atzilut (Wisdom) - Insight -->
          <div class="md:col-start-1 md:col-span-1">
            <div
              class="sphere bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all transform hover:translate-y-[-4px] duration-300 relative overflow-hidden"
            >
              <!-- Decorative Element -->
              <div
                class="absolute top-0 right-0 w-24 h-24 bg-[#0EA5E9]/10 rounded-full blur-2xl"
              ></div>

              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-white/90 flex items-center">
                  <i class="fas fa-lightbulb text-[#0EA5E9] mr-3"></i>
                  Прозрение
                </h3>
                <span class="text-xs text-white/50">Ацилут</span>
              </div>

              <p class="text-sm text-white/60 mb-4">
                Интеллектуальное понимание, сфера мудрости и осознания.
              </p>

              <div
                v-if="loadingAssessments"
                class="flex justify-center items-center h-36"
              >
                <i class="fas fa-spinner fa-spin text-[#0EA5E9] text-xl"></i>
              </div>
              <div v-else class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Пройдено архетипов:</span>
                  <span class="text-white font-medium">{{
                    archetypeScores.length
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Основной архетип:</span>
                  <span class="text-white font-medium">{{ topArchetype }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Курсы:</span>
                  <span class="text-white font-medium">{{
                    coursesProgress.length
                  }}</span>
                </div>

                <div
                  class="sphere-progress mt-6 h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-gradient-to-r from-[#0EA5E9] to-[#9333EA]"
                    :style="`width: ${Math.min(
                      archetypeScores.length * 20,
                      100
                    )}%`"
                  ></div>
                </div>

                <Button
                  to="/courses"
                  text="Исследовать архетипы"
                  iconClass="fas fa-arrow-right"
                  gradientStart="#0EA5E9"
                  gradientEnd="#9333EA"
                  textColor="white"
                  customClass="mt-4 w-full"
                />
              </div>
            </div>
          </div>

          <!-- Beriah (Understanding) - Inner Realm -->
          <div class="md:col-start-3 md:col-span-1">
            <div
              class="sphere bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 hover:shadow-lg hover:shadow-[#EC4899]/20 transition-all transform hover:translate-y-[-4px] duration-300 relative overflow-hidden"
            >
              <!-- Decorative Element -->
              <div
                class="absolute top-0 right-0 w-24 h-24 bg-[#EC4899]/10 rounded-full blur-2xl"
              ></div>

              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-white/90 flex items-center">
                  <i class="fas fa-heart text-[#EC4899] mr-3"></i>
                  Внутренний Мир
                </h3>
                <span class="text-xs text-white/50">Брия</span>
              </div>

              <p class="text-sm text-white/60 mb-4">
                Эмоциональный мир, глубина чувств и переживаний.
              </p>

              <div
                v-if="loadingEmotionBarometer"
                class="flex justify-center items-center h-36"
              >
                <i class="fas fa-spinner fa-spin text-[#EC4899] text-xl"></i>
              </div>
              <div
                v-else-if="emotionBarometerStats.totalEntries > 0"
                class="space-y-3"
              >
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Записей:</span>
                  <span class="text-white font-medium">{{
                    emotionBarometerStats.totalEntries
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Основная эмоция:</span>
                  <span class="text-white font-medium">{{
                    emotionBarometerStats.mostCommonEmotion
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Интенсивность:</span>
                  <span class="text-white font-medium">{{
                    emotionBarometerStats.averageIntensity.toFixed(1)
                  }}</span>
                </div>

                <div
                  class="sphere-progress mt-6 h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-gradient-to-r from-[#EC4899] to-[#E879F9]"
                    :style="`width: ${Math.min(
                      emotionBarometerStats.totalEntries * 10,
                      100
                    )}%`"
                  ></div>
                </div>

                <Button
                  to="/awareness-tools/emotional-compass"
                  text="Эмоциональный компас"
                  iconClass="fas fa-compass"
                  gradientStart="#EC4899"
                  gradientEnd="#E879F9"
                  textColor="white"
                  customClass="mt-4 w-full"
                />
              </div>
              <div
                v-else
                class="flex flex-col items-center justify-center h-36 space-y-3"
              >
                <i class="fas fa-wind text-[#EC4899] text-2xl opacity-50"></i>
                <p class="text-center text-slate-400">Нет данных об эмоциях</p>
                <NuxtLink
                  to="/awareness-tools/emotional-compass"
                  class="text-[#EC4899] hover:underline text-sm"
                >
                  Начать исследование
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Yetzirah (Formation) - Evolution -->
          <div class="md:col-start-1 md:col-span-1">
            <div
              class="sphere bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 hover:shadow-lg hover:shadow-[#10B981]/20 transition-all transform hover:translate-y-[-4px] duration-300 relative overflow-hidden"
            >
              <!-- Decorative Element -->
              <div
                class="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/10 rounded-full blur-2xl"
              ></div>

              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-white/90 flex items-center">
                  <i class="fas fa-arrow-up text-[#10B981] mr-3"></i>
                  Эволюция
                </h3>
                <span class="text-xs text-white/50">Йецира</span>
              </div>

              <p class="text-sm text-white/60 mb-4">
                Личностный рост, формирование и преобразование.
              </p>

              <div v-if="loading" class="flex justify-center items-center h-36">
                <i class="fas fa-spinner fa-spin text-[#10B981] text-xl"></i>
              </div>
              <div v-else-if="dailyGrowthSpark.length > 0" class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Инсайтов:</span>
                  <span class="text-white font-medium">{{
                    dailyGrowthSpark.length
                  }}</span>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="text-slate-300 whitespace-nowrap"
                    >Последний:</span
                  >
                  <span class="text-white font-medium truncate">{{
                    latestGrowthSpark
                  }}</span>
                </div>

                <div
                  class="sphere-progress mt-6 h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-gradient-to-r from-[#10B981] to-[#3B82F6]"
                    :style="`width: ${Math.min(
                      dailyGrowthSpark.length * 20,
                      100
                    )}%`"
                  ></div>
                </div>

                <Button
                  to="/growth-tools"
                  text="Добавить инсайт"
                  iconClass="fas fa-plus"
                  gradientStart="#10B981"
                  gradientEnd="#3B82F6"
                  textColor="white"
                  customClass="mt-4 w-full"
                />
              </div>
              <div
                v-else
                class="flex flex-col items-center justify-center h-36 space-y-3"
              >
                <i
                  class="fas fa-lightbulb text-[#10B981] text-2xl opacity-50"
                ></i>
                <p class="text-center text-slate-400">Нет данных о росте</p>
                <NuxtLink
                  to="/growth-tools"
                  class="text-[#10B981] hover:underline text-sm"
                >
                  Начать путь роста
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Assiyah (Action) - Action -->
          <div class="md:col-start-3 md:col-span-1">
            <div
              class="sphere bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 hover:shadow-lg hover:shadow-[#F59E0B]/20 transition-all transform hover:translate-y-[-4px] duration-300 relative overflow-hidden"
            >
              <!-- Decorative Element -->
              <div
                class="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/10 rounded-full blur-2xl"
              ></div>

              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-white/90 flex items-center">
                  <i class="fas fa-running text-[#F59E0B] mr-3"></i>
                  Действие
                </h3>
                <span class="text-xs text-white/50">Асия</span>
              </div>

              <p class="text-sm text-white/60 mb-4">
                Материальный план, поведение и конкретные действия.
              </p>

              <div
                v-if="loadingEmotionBarometer"
                class="flex justify-center items-center h-36"
              >
                <i class="fas fa-spinner fa-spin text-[#F59E0B] text-xl"></i>
              </div>
              <div
                v-else-if="
                  emotionBarometerStats.totalEntries > 0 ||
                  archetypeScores.length > 0
                "
                class="space-y-3"
              >
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Использований компаса:</span>
                  <span class="text-white font-medium">{{
                    emotionBarometerStats.totalEntries
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Пройдено тестов:</span>
                  <span class="text-white font-medium">{{
                    archetypeScores.length
                  }}</span>
                </div>

                <div
                  class="sphere-progress mt-6 h-2 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444]"
                    :style="`width: ${Math.min(
                      emotionBarometerStats.totalEntries * 10 +
                        archetypeScores.length * 10,
                      100
                    )}%`"
                  ></div>
                </div>

                <Button
                  to="/awareness-tools"
                  text="Все инструменты"
                  iconClass="fas fa-tools"
                  gradientStart="#F59E0B"
                  gradientEnd="#EF4444"
                  textColor="white"
                  customClass="mt-4 w-full"
                />
              </div>
              <div
                v-else
                class="flex flex-col items-center justify-center h-36 space-y-3"
              >
                <i
                  class="fas fa-shoe-prints text-[#F59E0B] text-2xl opacity-50"
                ></i>
                <p class="text-center text-slate-400">Нет данных о поведении</p>
                <NuxtLink
                  to="/awareness-tools"
                  class="text-[#F59E0B] hover:underline text-sm"
                >
                  Исследовать инструменты
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  min-height: 300px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 10;
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
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: rotate(45deg);
  pointer-events: none;
}

@media (min-width: 1024px) {
  .sphere:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px -5px rgba(14, 165, 233, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
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
