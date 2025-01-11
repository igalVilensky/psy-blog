<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
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

    <div class="container mx-auto px-4 max-w-7xl relative z-10 py-16">
      <!-- Enhanced Profile Header -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-10 mb-8 shadow-2xl"
      >
        <div
          class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8"
        >
          <div class="flex flex-col sm:flex-row items-center gap-8 w-full">
            <!-- Enhanced Avatar Section -->
            <div class="relative group">
              <UserAvatar
                :avatarUrl="avatarUrl"
                :loading="loading"
                :userInitial="
                  authStore.user?.displayName?.charAt(0).toUpperCase()
                "
                @update:avatarUrl="avatarUrl = $event"
                class="w-32 h-32 rounded-full border-4 border-[#0EA5E9]/30 transition-transform duration-300 group-hover:scale-105"
              />
              <div
                class="absolute -bottom-2 right-0 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] p-2 rounded-full shadow-lg"
              >
                <i class="fas fa-camera text-white"></i>
              </div>
            </div>

            <!-- Enhanced User Info -->
            <div class="text-center sm:text-left">
              <h1 class="text-3xl font-bold text-white/90 mb-3">
                {{ authStore.user?.displayName || "User" }}
              </h1>
              <p class="text-lg text-slate-300 font-medium mb-4">
                {{ authStore.user?.email || "Email not provided" }}
              </p>
              <div class="flex flex-wrap gap-3">
                <span
                  class="px-4 py-1.5 bg-[#0EA5E9]/20 rounded-full text-[#0EA5E9] text-sm font-medium"
                >
                  <i class="fas fa-user-circle mr-2"></i>Profile
                </span>
                <span
                  class="px-4 py-1.5 bg-[#E879F9]/20 rounded-full text-[#E879F9] text-sm font-medium"
                >
                  <i class="fas fa-chart-line mr-2"></i>Analytics
                </span>
              </div>
            </div>
          </div>

          <!-- Enhanced Action Buttons -->
          <div class="flex gap-4">
            <NuxtLink
              to="/profile/settings"
              class="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 hover:shadow-lg"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
              >
                <i class="fas fa-cog"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fas fa-cog mr-2"></i>Настройки
              </span>
              <span class="relative invisible">Настройки</span>
            </NuxtLink>

            <button
              @click="logoutUser"
              class="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 hover:shadow-lg"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
              >
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>Выйти
              </span>
              <span class="relative invisible">Выйти</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Bio Section -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-10 mb-8 shadow-2xl"
      >
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-white/90">
            <i class="fas fa-user-edit text-[#0EA5E9] mr-3"></i>О себе
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-slate-400 text-sm">Заполнено:</span>
            <div class="w-32 bg-[#1A1F35]/40 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] h-2 rounded-full transition-all duration-500"
                :style="{ width: bioCompletionPercentage + '%' }"
              ></div>
            </div>
            <span class="text-slate-300 text-sm font-medium"
              >{{ bioCompletionPercentage }}%</span
            >
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loadingBio"
          class="flex flex-col items-center justify-center h-40"
        >
          <div
            class="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="text-slate-300 mt-4">Загрузка данных...</p>
        </div>

        <!-- No Data State -->
        <div
          v-else-if="!bioDataExists"
          class="flex flex-col items-center justify-center h-64 text-center"
        >
          <div
            class="w-20 h-20 bg-[#0EA5E9]/20 rounded-full flex items-center justify-center mb-6"
          >
            <i class="fas fa-user-edit text-4xl text-[#0EA5E9]"></i>
          </div>
          <p class="text-xl text-slate-300 mb-4">Добавьте информацию о себе</p>
          <p class="text-slate-400 mb-6 max-w-md">
            Расскажите о себе, чтобы другие пользователи могли лучше узнать вас
          </p>
          <NuxtLink
            to="/profile/settings"
            class="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 hover:shadow-lg"
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

        <!-- Bio Data -->
        <div v-else class="space-y-8">
          <!-- Info Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-if="profession"
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-briefcase text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Профессия</p>
              </div>
              <p class="text-white/90 text-lg">{{ profession }}</p>
            </div>

            <div
              v-if="socialMedia"
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-share-alt text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Социальные сети</p>
              </div>
              <p class="text-white/90 text-lg">{{ socialMedia }}</p>
            </div>

            <div
              v-if="age"
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-birthday-cake text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Возраст</p>
              </div>
              <p class="text-white/90 text-lg">{{ age }}</p>
            </div>

            <div
              v-if="gender"
              class="bg-[#1A1F35]/40 p-6 rounded-2xl border border-white/5 hover:border-[#0EA5E9]/30 transition-colors group"
            >
              <div class="flex items-center gap-4 mb-3">
                <div
                  class="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#0EA5E9]/30 transition-colors"
                >
                  <i class="fas fa-venus-mars text-[#0EA5E9]"></i>
                </div>
                <p class="text-slate-400 font-medium">Пол</p>
              </div>
              <p class="text-white/90 text-lg">{{ gender }}</p>
            </div>
          </div>

          <!-- About Text -->
          <div class="bg-[#1A1F35]/40 p-8 rounded-2xl border border-white/5">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center"
              >
                <i class="fas fa-quote-right text-[#0EA5E9] text-xl"></i>
              </div>
              <p class="text-slate-400 font-medium text-lg">О себе</p>
            </div>
            <p
              class="text-white/90 text-lg leading-relaxed whitespace-pre-line"
            >
              {{ aboutYourself }}
            </p>
          </div>
        </div>
      </div>

      <!-- Emotional Barometer Section -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8"
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
          <i class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9] mb-4"></i>
          <p class="text-slate-300">Загрузка данных...</p>
        </div>

        <!-- No Data State -->
        <div
          v-else-if="emotionBarometerStats.totalEntries === 0"
          class="flex flex-col items-center justify-center h-64 text-center"
        >
          <div
            class="w-20 h-20 bg-[#0EA5E9]/20 rounded-full flex items-center justify-center mb-6"
          >
            <i class="fas fa-chart-pie text-4xl text-[#0EA5E9]"></i>
          </div>
          <p class="text-xl text-slate-300 mb-4">Нет данных для отображения</p>
          <p class="text-slate-400 mb-6 max-w-md">
            Начните использовать эмоциональный барометр, чтобы отслеживать свои
            эмоции
          </p>
          <NuxtLink
            to="/awareness-tools/emotional-barometer"
            class="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 hover:shadow-lg"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
            >
              <i class="fas fa-play-circle"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fas fa-play-circle mr-2"></i>Перейти к барометру
            </span>
            <span class="relative invisible">Перейти к барометру</span>
          </NuxtLink>
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

      <!-- Enhanced Activity Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Favorite Posts -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white/90">
              <i class="fas fa-bookmark text-[#E879F9] mr-2"></i>
              Избранные статьи
            </h2>
            <button
              class="group relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#E879F9]/20 hover:shadow-lg"
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

          <div class="space-y-4">
            <div
              v-for="i in 3"
              :key="i"
              class="group flex gap-4 p-4 rounded-xl hover:bg-[#0EA5E9]/10 transition-colors border border-transparent hover:border-[#0EA5E9]/20"
            >
              <img
                :src="hostImage"
                class="w-24 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform"
              />
              <div>
                <h3
                  class="font-medium text-white/90 mb-2 group-hover:text-[#0EA5E9] transition-colors"
                >
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
          class="lg:col-span-2 bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
        >
          <h2 class="text-xl font-bold text-white/90 mb-6">
            <i class="fas fa-history text-[#E879F9] mr-2"></i>
            Недавняя активность
          </h2>
          <div class="space-y-6">
            <div v-for="i in 4" :key="i" class="flex items-start gap-4 group">
              <div
                class="w-10 h-10 rounded-xl bg-[#E879F9]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E879F9]/30 transition-colors"
              >
                <i class="fas fa-book-reader text-[#E879F9]"></i>
              </div>
              <div class="flex-grow">
                <p
                  class="text-white/90 group-hover:text-[#E879F9] transition-colors"
                >
                  Прочитали статью "Название статьи"
                </p>
                <p class="text-sm text-slate-400">2 часа назад</p>
              </div>
              <div
                class="w-8 h-8 rounded-lg bg-[#1A1F35]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i class="fas fa-chevron-right text-[#E879F9] text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
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

const auth = getAuth();
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

// Initialize onAuthStateChanged
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

    // Fetch bio data
    await fetchBioData(currentUser.uid);

    // Fetch emotion barometer stats
    try {
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

    // Fetch the latest assessment results
    await fetchLatestAssessment(currentUser.uid);

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
