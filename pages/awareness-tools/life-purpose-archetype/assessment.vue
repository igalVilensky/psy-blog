<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- Progress Bar -->
      <div class="mb-8 flex justify-between items-center">
        <button
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
          class="px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-300"
          :class="{
            'opacity-50 cursor-not-allowed': currentQuestionIndex === 0,
          }"
        >
          ← Назад
        </button>
        <div class="flex-grow">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span
              >Вопрос {{ currentQuestionIndex + 1 }} из
              {{ totalQuestions }}</span
            >
            <span
              >{{
                Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
              }}%</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              :style="{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Question Card -->
      <div
        v-if="currentQuestion"
        class="bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          {{ currentQuestion.questionText }}
        </h2>

        <!-- Answer Options -->
        <div class="space-y-4">
          <button
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="
              selectAnswer(index);
              nextQuestion();
            "
            class="w-full text-left p-4 rounded-lg border transition-all duration-200"
            :class="[
              selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50',
            ]"
          >
            <div class="flex items-center">
              <div
                class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center"
                :class="[
                  selectedAnswer === index
                    ? 'border-indigo-500'
                    : 'border-gray-300',
                ]"
              >
                <div
                  v-if="selectedAnswer === index"
                  class="w-3 h-3 bg-indigo-500 rounded-full"
                ></div>
              </div>
              <span class="text-lg">{{ option.text }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useFirestore } from "~/plugins/firebase";
import { getAuth } from "firebase/auth";
import {
  submitAssessment,
  saveAssessmentProgress,
} from "~/api/firebase/assessments";
import { questions } from "~/data/questions.js";

const router = useRouter();
const db = useFirestore();
const auth = getAuth();

// State
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref({});
const isLoading = ref(false);
const error = ref(null);

// Questions data with all 12 Jungian Archetypes
const questionsRef = ref(questions);

const answerOptions = [
  { text: "Совершенно не согласен", value: 1 },
  { text: "Скорее не согласен", value: 2 },
  { text: "Нейтрально", value: 3 },
  { text: "Скорее согласен", value: 4 },
  { text: "Полностью согласен", value: 5 },
];

// Computed properties
const totalQuestions = computed(() => questionsRef.value.length);
const currentQuestion = computed(
  () => questionsRef.value[currentQuestionIndex.value]
);
const isLastQuestion = computed(
  () => currentQuestionIndex.value === totalQuestions.value - 1
);

// Methods
const selectAnswer = (index) => {
  selectedAnswer.value = index;
  userAnswers.value[currentQuestion.value.id] = answerOptions[index].value;
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedAnswer.value = userAnswers.value[
      questionsRef.value[currentQuestionIndex.value].id
    ]
      ? answerOptions.findIndex(
          (opt) =>
            opt.value ===
            userAnswers.value[questionsRef.value[currentQuestionIndex.value].id]
        )
      : null;
  }
};

const nextQuestion = async () => {
  if (isLastQuestion.value) {
    await submitAssessmentHandler();
  } else {
    currentQuestionIndex.value++;
    selectedAnswer.value = userAnswers.value[
      questionsRef.value[currentQuestionIndex.value].id
    ]
      ? answerOptions.findIndex(
          (opt) =>
            opt.value ===
            userAnswers.value[questionsRef.value[currentQuestionIndex.value].id]
        )
      : null;
  }
};

const calculateArchetypeScores = (answers) => {
  const scores = {
    творец: 0,
    исследователь: 0,
    мудрец: 0,
    воин: 0,
    маг: 0,
    заботливый: 0,
    наставник: 0,
    правитель: 0,
    друг: 0,
    шут: 0,
    мятежник: 0,
    герой: 0,
  };

  questionsRef.value.forEach((question) => {
    const answer = answers[question.id] || 0;
    Object.keys(question.relatedArchetypes).forEach((archetype) => {
      scores[archetype] += answer * question.relatedArchetypes[archetype];
    });
  });

  const totalPossibleScore = totalQuestions.value * 5;
  Object.keys(scores).forEach((archetype) => {
    let adjustedScore = (scores[archetype] / totalPossibleScore) * 100;
    scores[archetype] = Math.min(Math.max(adjustedScore, 0), 100).toFixed(1);
  });

  return scores;
};

const submitAssessmentHandler = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error(
        "Пожалуйста, войдите в систему для сохранения результатов"
      );
    }

    // Calculate scores
    const scores = calculateArchetypeScores(userAnswers.value);

    // Submit assessment
    const result = await submitAssessment(
      db,
      currentUser.uid,
      userAnswers.value,
      scores
    );

    if (result.success && result.assessmentId) {
      router.push(
        `/awareness-tools/life-purpose-archetype/results/${result.assessmentId}`
      );
    } else {
      throw new Error(result.message || "Не удалось сохранить результаты");
    }
  } catch (err) {
    console.error("Error submitting assessment:", err);
    error.value = err.message || "Произошла ошибка при сохранении результатов";
  } finally {
    isLoading.value = false;
  }
};

// Save progress function
const saveProgress = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    await saveAssessmentProgress(db, currentUser.uid, {
      currentQuestionIndex: currentQuestionIndex.value,
      answers: userAnswers.value,
    });
  } catch (err) {
    console.error("Error saving progress:", err);
  }
};

// Watch for changes to save progress
watch(
  userAnswers,
  () => {
    saveProgress();
  },
  { deep: true }
);
</script>
