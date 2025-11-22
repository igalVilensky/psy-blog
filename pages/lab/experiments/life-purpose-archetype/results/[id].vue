<template>
  <div
    class="relative min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1A1F38]"
  >
    <div
      class="absolute inset-0 bg-[url('/images/constellation-bg.svg')] opacity-20"
    ></div>
    <div
      class="container mx-auto px-4 xl:px-0 max-w-6xl relative z-10 py-10 lg:py-20"
    >
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-[#3A1CFF]/20 rounded-full animate-spin"
          ></div>
          <div
            class="w-16 h-16 border-4 border-t-[#00E6FF] rounded-full animate-spin absolute top-0 left-0"
          ></div>
        </div>
        <p class="mt-6 text-slate-300 text-lg animate-pulse">
          Анализируем ваши результаты...
        </p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="rounded-2xl bg-[#1A2038] backdrop-blur-xl border-2 border-[#FF3D00]/20 p-8 shadow-xl"
      >
        <div class="flex items-center gap-3">
          <i class="fas fa-exclamation-circle text-[#FF3D00] text-xl"></i>
          <p class="text-[#FF3D00]">{{ error }}</p>
        </div>
      </div>

      <!-- Results Display -->
      <div v-else-if="result" class="space-y-12">
        <!-- Header Section -->
        <div class="text-center">
          <h1
            class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] mb-4"
          >
            Ваш Архетип Жизненного Предназначения
          </h1>
          <p class="text-slate-300">
            <i class="fas fa-calendar-alt mr-2"></i>
            {{ formatDate(result.timestamp) }}
          </p>
        </div>

        <!-- Top 3 Archetypes Card -->
        <div
          class="bg-[#1A2038]/80 backdrop-blur-xl rounded-2xl border border-[#3A1CFF]/30 py-8 px-4 sm:px-8 shadow-lg"
        >
          <h2
            class="text-2xl font-semibold text-white mb-8 flex items-center gap-3 flex-col text-center sm:flex-row sm:text-left"
          >
            <i class="fas fa-crown text-[#F59E0B]"></i>
            Ваши Доминирующие Архетипы
          </h2>

          <!-- Registration CTA - Redesigned -->
          <div v-if="!auth.currentUser" class="mb-12">
            <div
              class="relative overflow-hidden bg-gradient-to-r from-[#3A1CFF]/10 to-[#00E6FF]/10 rounded-xl p-1"
            >
              <div
                class="absolute inset-0 bg-[url('/images/pattern-bg.svg')] opacity-10"
              ></div>
              <div
                class="bg-[#252B45]/90 rounded-lg py-8 px-4 sm:px-8 relative"
              >
                <div
                  class="absolute top-0 right-0 transform translate-x-8 -translate-y-8"
                >
                  <div
                    class="w-32 h-32 rounded-full bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] opacity-20 blur-2xl"
                  ></div>
                </div>

                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <!-- CTA Section -->
                  <div
                    class="bg-[#1A2038] p-6 rounded-lg border border-[#3A1CFF]/30 shadow-xl text-center order-1 md:order-2"
                  >
                    <div class="inline-block mb-4">
                      <div
                        class="w-16 h-16 bg-gradient-to-r from-[#3A1CFF]/20 to-[#00E6FF]/20 rounded-xl flex items-center justify-center"
                      >
                        <i
                          class="fas fa-unlock-alt text-2xl text-[#00E6FF]"
                        ></i>
                      </div>
                    </div>
                    <h4 class="text-xl font-semibold text-white mb-2">
                      Хотите получить подробные гайды?
                    </h4>
                    <p class="text-slate-400 mb-6">
                      Зарегистрируйтесь и скачайте их бесплатно!
                    </p>
                    <RouterLink
                      :to="{
                        path: '/register',
                        query: { assessmentId: assessmentId },
                      }"
                      class="w-full inline-block bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:from-[#2A15CC] hover:to-[#00B8D4] transition-all duration-300"
                    >
                      <i class="fas fa-user-plus mr-2"></i>
                      Создать бесплатный аккаунт
                    </RouterLink>
                  </div>

                  <!-- Benefits Section -->
                  <div class="order-2 md:order-1 hidden sm:block">
                    <h3 class="text-2xl font-bold text-white mb-4">
                      Преимущества регистрации
                    </h3>
                    <p class="text-slate-300 mb-6">
                      Получите доступ к дополнительным возможностям для
                      раскрытия вашего потенциала:
                    </p>
                    <ul class="space-y-3 text-left text-slate-200">
                      <li class="flex items-start gap-3">
                        <div
                          class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] flex items-center justify-center"
                        >
                          <i class="fas fa-check text-xs text-white"></i>
                        </div>
                        <span
                          >Подробные гайды по вашим доминирующим архетипам</span
                        >
                      </li>
                      <li class="flex items-start gap-3">
                        <div
                          class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] flex items-center justify-center"
                        >
                          <i class="fas fa-check text-xs text-white"></i>
                        </div>
                        <span>Доступ к результатам в любое время</span>
                      </li>
                      <li class="flex items-start gap-3">
                        <div
                          class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] flex items-center justify-center"
                        >
                          <i class="fas fa-check text-xs text-white"></i>
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
              class="relative bg-gradient-to-r from-[#252B45] to-[#1E253A] rounded-xl p-6 border border-[#3A1CFF]/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3A1CFF]/10 group"
            >
              <div
                class="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-r from-[#B44CFF] to-[#FF4DFF] flex items-center justify-center text-white font-bold shadow-lg"
              >
                {{ index + 1 }}
              </div>
              <div class="mb-4 mt-2">
                <div
                  class="w-12 h-12 rounded-lg bg-[#1A2038] border border-[#3A1CFF]/20 flex items-center justify-center mb-3 group-hover:bg-[#3A1CFF]/10 transition-all duration-300"
                >
                  <i
                    :class="`fas ${getArchetypeIcon(
                      archetype
                    )} text-[#00E6FF] text-xl`"
                  ></i>
                </div>
                <h3 class="text-xl font-semibold text-white capitalize">
                  {{ archetype }}
                </h3>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-sm text-slate-400">Уровень</div>
                <div
                  class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF]"
                >
                  {{ score }}
                </div>
              </div>
              <button
                v-if="auth.currentUser"
                @click="handleDownload(guideUrl)"
                class="mt-4 w-full bg-[#1A2038] hover:bg-[#3A1CFF]/10 text-[#00E6FF] py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border border-[#3A1CFF]/20"
              >
                <i class="fas fa-download"></i>
                <span>Скачать гайд</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Detailed Scores -->
        <div
          class="bg-[#1A2038]/80 backdrop-blur-xl rounded-2xl border border-[#3A1CFF]/30 py-8 px-4 sm:px-8 shadow-lg"
        >
          <h2
            class="text-2xl font-semibold text-white mb-8 flex items-center gap-3"
          >
            <i class="fas fa-chart-bar text-[#00FF88]"></i>
            Подробный Анализ
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="(score, archetype) in result.scores"
              :key="archetype"
              class="group bg-gradient-to-r from-[#252B45] to-[#1E253A] rounded-xl p-5 border border-[#3A1CFF]/20 transition-all duration-300 hover:border-[#00E6FF]/30 hover:shadow-md"
            >
              <div class="flex flex-wrap justify-between items-center mb-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-lg bg-[#1A2038] border border-[#3A1CFF]/20 flex items-center justify-center group-hover:bg-[#3A1CFF]/10 transition-all duration-300"
                  >
                    <i
                      :class="`fas ${getArchetypeIcon(
                        archetype
                      )} text-[#00E6FF] text-sm`"
                    ></i>
                  </div>
                  <span class="font-medium capitalize text-white">{{
                    archetype
                  }}</span>
                </div>
                <span class="text-[#00E6FF] font-semibold text-xl"
                  >{{ Math.round(score) }}/30</span
                >
              </div>
              <div class="w-full bg-[#1A2038] rounded-full h-3 overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] transition-all duration-500 group-hover:shadow-[0_0_10px_rgba(0,230,255,0.5)]"
                  :style="{ width: `${(score / 30) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button
            :text="'Вернуться к тесту'"
            :iconClass="'fas fa-arrow-left'"
            :textColor="'#CBD5E1'"
            :customClass="'flex-1 p-4 bg-[#1A2038] hover:bg-[#252B45] border border-[#3A1CFF]/20 transition-all duration-300 rounded-xl'"
            :to="'/lab/experiments/life-purpose-archetype'"
            :isLink="true"
          />
          <Button
            :text="'Изучить описания архетипов'"
            :iconClass="'fas fa-book'"
            :textColor="'#ffffff'"
            :customClass="'flex-1 p-4 bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF] inline-flex border-none rounded-xl hover:shadow-lg hover:from-[#2A15CC] hover:to-[#00B8D4] transition-all duration-300'"
            :to="'/lab/experiments/life-purpose-archetype/explanation'"
            :isLink="true"
          />
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
