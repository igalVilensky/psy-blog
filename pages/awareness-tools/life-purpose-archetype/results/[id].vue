<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto px-4 max-w-4xl relative z-10 py-12">
      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EA5E9] mx-auto"
        ></div>
        <p class="mt-4 text-slate-300">Загрузка результатов...</p>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6"
      >
        <p class="text-red-400">{{ error }}</p>
      </div>

      <!-- Results display -->
      <div v-else-if="result" class="space-y-8">
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <h1
            class="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
          >
            Результаты архетипа жизненного предназначения
          </h1>
          <p class="text-slate-300 mb-2">
            Дата прохождения: {{ formatDate(result.timestamp) }}
          </p>

          <!-- 3 Dominant Archetypes -->

          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-3 text-slate-300">
              Ваши три доминирующих архетипа:
            </h2>
            <ul class="space-y-2">
              <li
                v-for="({ archetype, score }, index) in topArchetypes"
                :key="archetype"
                class="flex items-center justify-between bg-[#1A1F35]/40 p-4 rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
              >
                <span class="font-medium capitalize text-slate-300">
                  {{ index + 1 }}. {{ archetype }}
                </span>
                <span class="text-slate-400">{{ score }}</span>
              </li>
            </ul>
          </div>

          <!-- Scores Breakdown -->
          <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4 text-slate-300">
              Распределение баллов:
            </h2>
            <div class="space-y-4">
              <div
                v-for="(score, archetype) in result.scores"
                :key="archetype"
                class="bg-[#1A1F35]/40 p-4 rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
              >
                <div class="flex justify-between items-center">
                  <span class="font-medium capitalize text-slate-300">{{
                    archetype
                  }}</span>
                  <span class="text-slate-400">{{ Math.round(score) }}</span>
                </div>
                <div class="w-full bg-[#1E293B]/60 rounded-full h-2.5 mt-2">
                  <div
                    class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] h-2.5 rounded-full"
                    :style="{ width: `${((score - 6) / (30 - 6)) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-between mt-8">
          <NuxtLink
            to="/awareness-tools/life-purpose-archetype"
            class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0EA5E9]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
            >
              <i class="fas fa-arrow-left"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:-translate-x-full ease"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Назад к тесту
            </span>
            <span class="relative invisible">Назад к тесту</span>
          </NuxtLink>

          <NuxtLink
            to="/awareness-tools/life-purpose-archetype/explanation"
            class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0EA5E9]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
            >
              <i class="fas fa-book"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fas fa-book mr-2"></i>
              Подробное объяснение архетипов
            </span>
            <span class="relative invisible"
              >Подробное объяснение архетипов</span
            >
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
