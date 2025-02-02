<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto px-4 max-w-5xl relative z-10 py-8 lg:py-16">
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
        class="rounded-2xl bg-[#1A2038] backdrop-blur-xl border-2 border-[#FF3D00]/20 p-8"
      >
        <div class="flex items-center gap-3">
          <i class="fas fa-exclamation-circle text-[#FF3D00] text-xl"></i>
          <p class="text-[#FF3D00]">{{ error }}</p>
        </div>
      </div>

      <!-- Results Display -->
      <div v-else-if="result" class="space-y-10">
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
          class="bg-[#1A2038] backdrop-blur-xl rounded-2xl border-2 border-[#3A1CFF]/30 p-6 lg:p-8 transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(58,28,255,0.2)]"
        >
          <h2
            class="text-2xl font-semibold text-white mb-6 flex items-center gap-3"
          >
            <i class="fas fa-crown text-[#F59E0B]"></i>
            Ваши Доминирующие Архетипы
          </h2>

          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="({ archetype, score }, index) in topArchetypes"
              :key="archetype"
              class="relative bg-[#252B45] rounded-xl p-6 border-2 border-[#3A1CFF]/20 transform transition-all duration-300 hover:-translate-y-1"
            >
              <div
                class="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-[#B44CFF] to-[#FF4DFF] flex items-center justify-center text-white font-bold shadow-lg"
              >
                {{ index + 1 }}
              </div>
              <h3 class="text-xl font-medium text-white mt-2 capitalize">
                {{ archetype }}
              </h3>
              <div class="mt-3 flex items-end justify-between">
                <div class="text-sm text-slate-300">Балл</div>
                <div class="text-2xl font-semibold text-[#00E6FF]">
                  {{ score }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Scores -->
        <div
          class="bg-[#1A2038] backdrop-blur-xl rounded-2xl border-2 border-[#3A1CFF]/30 p-6 lg:p-8"
        >
          <h2
            class="text-2xl font-semibold text-white mb-6 flex items-center gap-3"
          >
            <i class="fas fa-chart-bar text-[#00FF88]"></i>
            Подробный Анализ
          </h2>

          <div class="space-y-6">
            <div
              v-for="(score, archetype) in result.scores"
              :key="archetype"
              class="group bg-[#252B45] rounded-xl p-5 border-2 border-[#3A1CFF]/20 transition-all duration-300 hover:border-[#00E6FF]/30"
            >
              <div class="flex flex-wrap justify-between items-center mb-3">
                <span class="font-medium capitalize text-lg text-white">{{
                  archetype
                }}</span>
                <span class="text-[#00E6FF] font-semibold text-xl"
                  >{{ Math.round(score) }}/30</span
                >
              </div>
              <div class="w-full bg-[#1A2038] rounded-full h-3">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF9E00] transition-all duration-500 group-hover:shadow-[0_0_10px_rgba(255,61,0,0.5)]"
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
            :customClass="'flex-1 p-4 bg-[#1A2038] hover:bg-[#252B45] border-2 border-[#3A1CFF]/20 transition-all duration-300'"
            :to="'/awareness-tools/life-purpose-archetype'"
            :isLink="true"
          />

          <Button
            :text="'Изучить описания архетипов'"
            :iconClass="'fas fa-book'"
            :textColor="'#ffffff'"
            :customClass="'flex-1 p-4 bg-gradient-to-r from-purple-500 to-cyan-500 inline-flex border-[#0EA5E9]'"
            :to="'/awareness-tools/life-purpose-archetype/explanation'"
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

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const auth = getAuth();

// State
const result = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Computed value for the dominant archetype
const dominantArchetype = computed(() => {
  if (!result.value?.scores) {
    console.warn("No scores found in result:", result.value); // Debug: Log if scores are missing
    return null;
  }

  const dominant = Object.entries(result.value.scores).reduce((a, b) =>
    parseFloat(a[1]) > parseFloat(b[1]) ? a : b
  )[0];

  return dominant === "unknown" ? "Не определено" : dominant;
});

// Computed value for the top 3 dominant archetypes
const topArchetypes = computed(() => {
  if (!result.value?.scores) return [];

  // Convert the scores object to an array of [archetype, score] pairs
  const scoresArray = Object.entries(result.value.scores);

  // Sort the array in descending order by score and take the top 3
  return scoresArray
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([archetype, score]) => ({ archetype, score: Math.round(score) }));
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

// Load assessment results
const loadAssessmentResult = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error(
        "Пожалуйста, войдите в систему для просмотра результатов"
      );
    }

    const { success, assessment, message } = await getAssessment(
      db,
      route.params.id
    );

    if (!success) {
      throw new Error(message);
    }

    // Verify the result belongs to the current user
    if (assessment.userId !== currentUser.uid) {
      throw new Error("У вас нет доступа к этим результатам");
    }

    result.value = assessment;
  } catch (err) {
    console.error("Error loading assessment result:", err); // Debug: Log errors
    error.value = err.message || "Произошла ошибка при загрузке результатов";

    // Redirect to main page if result not found or unauthorized
    if (err.message.includes("не найдены") || err.message.includes("доступа")) {
      router.push("/tools/life-purpose-archetype");
    }
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle hooks
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
