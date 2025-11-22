<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="container mx-auto px-4 xl:px-0 max-w-6xl relative z-10 py-10 lg:py-20">
      <Breadcrumbs />
      
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-purple-200 dark:border-purple-900/30 rounded-full animate-spin"
          ></div>
          <div
            class="w-16 h-16 border-4 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin absolute top-0 left-0"
          ></div>
        </div>
        <p class="mt-6 text-slate-600 dark:text-slate-300 text-lg animate-pulse">
          Анализируем ваши результаты...
        </p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-red-200 dark:border-red-500/20 p-8 shadow-xl"
      >
        <div class="flex items-center gap-3">
          <i class="fas fa-exclamation-circle text-red-500 text-xl"></i>
          <p class="text-red-600 dark:text-red-400">{{ error }}</p>
        </div>
      </div>

      <!-- Results Display -->
      <div v-else-if="result" class="space-y-12">
        <!-- Header Section -->
        <div class="text-center animate-fade-in-up">
          <h1
            class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4"
          >
            Ваш Архетип Жизненного Предназначения
          </h1>
          <p class="text-slate-600 dark:text-slate-400">
            <i class="fas fa-calendar-alt mr-2"></i>
            {{ formatDate(result.timestamp) }}
          </p>
        </div>

        <!-- Top 3 Archetypes Card -->
        <div
          class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-8 shadow-xl"
        >
          <h2
            class="text-2xl font-semibold text-slate-900 dark:text-white mb-8 flex items-center gap-3 flex-col text-center sm:flex-row sm:text-left"
          >
            <i class="fas fa-crown text-amber-500"></i>
            Ваши Доминирующие Архетипы
          </h2>

          <!-- Registration CTA - Redesigned -->
          <div v-if="!auth.currentUser" class="mb-12">
            <div
              class="relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-1"
            >
              <div
                class="bg-white/90 dark:bg-slate-800/90 rounded-lg py-8 px-4 sm:px-8 relative backdrop-blur-sm"
              >
                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <!-- CTA Section -->
                  <div
                    class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg text-center order-1 md:order-2"
                  >
                    <div class="inline-block mb-4">
                      <div
                        class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center"
                      >
                        <i
                          class="fas fa-unlock-alt text-2xl text-purple-600 dark:text-purple-400"
                        ></i>
                      </div>
                    </div>
                    <h4 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Хотите получить подробные гайды?
                    </h4>
                    <p class="text-slate-600 dark:text-slate-400 mb-6">
                      Зарегистрируйтесь и скачайте их бесплатно!
                    </p>
                    <RouterLink
                      :to="{
                        path: '/register',
                        query: { assessmentId: assessmentId },
                      }"
                      class="w-full inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-md shadow-purple-500/20"
                    >
                      <i class="fas fa-user-plus mr-2"></i>
                      Создать бесплатный аккаунт
                    </RouterLink>
                  </div>

                  <!-- Benefits Section -->
                  <div class="order-2 md:order-1 hidden sm:block">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Преимущества регистрации
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 mb-6">
                      Получите доступ к дополнительным возможностям для
                      раскрытия вашего потенциала:
                    </p>
                    <ul class="space-y-3 text-left text-slate-700 dark:text-slate-300">
                      <li class="flex items-start gap-3">
                        <div
                          class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                        >
                          <i class="fas fa-check text-xs text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <span
                          >Подробные гайды по вашим доминирующим архетипам</span
                        >
                      </li>
                      <li class="flex items-start gap-3">
                        <div
                          class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                        >
                          <i class="fas fa-check text-xs text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <span>Доступ к результатам в любое время</span>
                      </li>
                      <li class="flex items-start gap-3">
                        <div
                          class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                        >
                          <i class="fas fa-check text-xs text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <span>История тестов для отслеживания прогресса</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            <div
              v-for="({ archetype, score, guideUrl }, index) in topArchetypes"
              :key="archetype"
              class="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div
                class="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg"
              >
                {{ index + 1 }}
              </div>
              <div class="mb-4 mt-2">
                <div
                  class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm"
                >
                  <i
                    :class="`fas ${getArchetypeIcon(
                      archetype
                    )} text-purple-600 dark:text-purple-400 text-xl`"
                  ></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white capitalize">
                  {{ archetype }}
                </h3>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-sm text-slate-500 dark:text-slate-400">Уровень</div>
                <div
                  class="text-2xl font-bold text-purple-600 dark:text-purple-400"
                >
                  {{ score }}
                </div>
              </div>
              <button
                v-if="auth.currentUser"
                @click="handleDownload(guideUrl)"
                class="mt-4 w-full bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700 text-purple-600 dark:text-purple-400 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-500/30 shadow-sm hover:shadow"
              >
                <i class="fas fa-download"></i>
                <span>Скачать гайд</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Detailed Scores -->
        <div
          class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-8 shadow-xl"
        >
          <h2
            class="text-2xl font-semibold text-slate-900 dark:text-white mb-8 flex items-center gap-3"
          >
            <i class="fas fa-chart-bar text-emerald-500"></i>
            Подробный Анализ
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="(score, archetype) in result.scores"
              :key="archetype"
              class="group bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-500/30 hover:shadow-md"
            >
              <div class="flex flex-wrap justify-between items-center mb-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  >
                    <i
                      :class="`fas ${getArchetypeIcon(
                        archetype
                      )} text-purple-600 dark:text-purple-400 text-sm`"
                    ></i>
                  </div>
                  <span class="font-medium capitalize text-slate-900 dark:text-white">{{
                    archetype
                  }}</span>
                </div>
                <span class="text-purple-600 dark:text-purple-400 font-bold text-lg"
                  >{{ Math.round(score) }}/30</span
                >
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  :style="{ width: `${(score / 30) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <NuxtLink
            to="/lab/experiments/life-purpose-archetype"
            class="flex-1 p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <i class="fas fa-arrow-left"></i>
            Вернуться к тесту
          </NuxtLink>
          <NuxtLink
            to="/lab/experiments/life-purpose-archetype/explanation"
            class="flex-1 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-purple-500/20"
          >
            <i class="fas fa-book"></i>
            Изучить описания архетипов
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import { useFirestore } from "~/plugins/firebase";
import Button from "~/components/base/Button.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import { getAssessment } from "~/api/firebase/assessments";

// Google Drive links for the 12 archetypes (using Russian names from your data)
const archetypeGuides = {
  воин: "https://drive.google.com/uc?export=download&id=1Z9XqjKfmXtIuPkpqFjlZf0UeK5uZd4-7", // Warrior
  мудрец:
    "https://drive.google.com/uc?export=download&id=1jRFDKQh_LeSy_hFS-rBic-qOXhwN1w9d", // Sage
  искатель:
    "https://drive.google.com/uc?export=download&id=1t9Eyq6mPBA-Zh1YPkDjtnoAicYIYdnSL", // Explorer
  творец:
    "https://drive.google.com/uc?export=download&id=1EB-sU__obr0nar984wxVEOWvMGU3LWNg", // Creator
  правитель:
    "https://drive.google.com/uc?export=download&id=1kC5TMJUWRAy5pKXOlW4qlAx6PXoe--2g", // Ruler
  маг: "https://drive.google.com/uc?export=download&id=1r-5W_RuCHRXJX6QOXmmQT8TL7asKvGAQ", // Magician
  любовник:
    "https://drive.google.com/uc?export=download&id=1NzU0BGyZGTTqx_1kCnyr97CFbRIg72PN", // Lover
  шут: "https://drive.google.com/uc?export=download&id=1Vecj9bKoGI2iRulAjBSMAAe_A0A526BV", // Jester
  сирота:
    "https://drive.google.com/uc?export=download&id=1lqXNJNpE2S96t4bioP5ZUHd-tsu_To0B", // Orphan (Everyman)
  опекун:
    "https://drive.google.com/uc?export=download&id=1MjruEXhQa24RGxpEHiuLszqbu3_1OBeY", // Caregiver
  простодушный:
    "https://drive.google.com/uc?export=download&id=1JLFEcqtBb6rT7QWW6BAwbRi0o17tAJ6E", // Innocent
  бунтарь:
    "https://drive.google.com/uc?export=download&id=1nET_NObXciLQlL44TB_Jo6qPEmR-4Nd4",
};

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const auth = getAuth();

// State
const result = ref(null);
const isLoading = ref(true);
const error = ref(null);
const assessmentId = ref(route.params.id);

// Computed value for the top 3 dominant archetypes with guide URLs
const topArchetypes = computed(() => {
  if (!result.value?.scores) return [];

  const scoresArray = Object.entries(result.value.scores);
  return scoresArray
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([archetype, score]) => ({
      archetype,
      score: Math.round(score),
      guideUrl: archetypeGuides[archetype] || "#",
    }));
});

// Format timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp.seconds * 1000).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Handle download programmatically
const handleDownload = (url) => {
  if (url === "#") {
    console.log("No guide available for this archetype");
    return; // Ignore if no guide exists
  }
  console.log("Downloading from:", url);
  const link = document.createElement("a");
  link.href = url;
  link.download = ""; // Optional: Set a specific filename here if desired (e.g., "Сирота_Гайд.pdf")
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Load assessment results
const loadAssessmentResult = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const { success, assessment, message } = await getAssessment(
      db,
      route.params.id
    );
    if (!success) throw new Error(message);
    if (assessment.userId && auth.currentUser?.uid !== assessment.userId) {
      throw new Error("У вас нет доступа к этим результатам");
    }
    result.value = assessment;
  } catch (err) {
    console.error("Error loading assessment result:", err);
    error.value = err.message || "Произошла ошибка при загрузке результатов";
    if (err.message.includes("не найдены") || err.message.includes("доступа")) {
      router.push("/tools/life-purpose-archetype");
    }
  } finally {
    isLoading.value = false;
  }
};
function getArchetypeIcon(archetype) {
  const iconMap = {
    творец: "fa-paint-brush", // Creator
    искатель: "fa-compass", // Explorer
    мудрец: "fa-book", // Sage
    опекун: "fa-heart", // Caregiver
    правитель: "fa-crown", // Ruler
    воин: "fa-shield-alt", // Warrior
    маг: "fa-magic", // Magician
    любовник: "fa-heart", // Lover
    шут: "fa-theater-masks", // Jester
    простодушный: "fa-dove", // Innocent
    сирота: "fa-home", // Orphan (Everyman)
    бунтарь: "fa-bolt", // Rebel (Note: "hero" was not in your list, so I assume "бунтарь" replaces it with a fitting icon)
    default: "fa-star", // Fallback
  };

  return iconMap[archetype.toLowerCase()] || iconMap.default;
}

onMounted(() => {
  loadAssessmentResult();
});
</script>

<style scoped>
@keyframes bounceLeft {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50px);
  }
}

.animate-bounceLeft {
  animation: bounceLeft 1s infinite;
}
</style>
