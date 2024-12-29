<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Загрузка результатов...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 p-4 rounded-lg">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Results display -->
    <div v-else-if="result" class="space-y-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold mb-4">
          Результаты архетипа жизненного предназначения
        </h1>
        <p class="text-gray-600 mb-2">
          Дата прохождения: {{ formatDate(result.timestamp) }}
        </p>

        <!-- Dominant Archetype -->
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-3">Ваш доминирующий архетип:</h2>
          <p class="text-2xl font-bold text-indigo-600">
            {{ dominantArchetype }}
          </p>
        </div>

        <!-- Scores Breakdown -->
        <div class="mt-8">
          <h2 class="text-xl font-semibold mb-4">Распределение баллов:</h2>
          <div class="space-y-4">
            <div
              v-for="(score, archetype) in result.scores"
              :key="archetype"
              class="bg-gray-50 p-4 rounded-lg"
            >
              <div class="flex justify-between items-center">
                <span class="font-medium capitalize">{{ archetype }}</span>
                <span class="text-gray-600">{{ Math.round(score) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  class="bg-indigo-600 h-2.5 rounded-full"
                  :style="{ width: `${score}%` }"
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
          class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition-colors"
        >
          Назад к тесту
        </NuxtLink>
        <NuxtLink
          to="/awareness-tools/life-purpose-archetype/explanation"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Подробное объяснение архетипов
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
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
  if (!result.value?.scores) return null;

  return Object.entries(result.value.scores).reduce((a, b) =>
    parseFloat(a[1]) > parseFloat(b[1]) ? a : b
  )[0];
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
    console.error("Error loading assessment result:", err);
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
