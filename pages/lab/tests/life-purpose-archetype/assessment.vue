<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="container mx-auto max-w-3xl px-4 xl:px-0 py-8 sm:py-12">
      <Breadcrumbs />
      
      <!-- Question Card -->
      <div
        v-if="currentQuestion"
        class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:shadow-xl border border-slate-200 dark:border-slate-800 shadow-lg mb-12"
      >
        <!-- Question Header -->
        <div class="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            {{ currentQuestion.questionText }}
          </h2>
        </div>

        <!-- Progress Bar -->
        <div class="px-6 sm:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div class="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            <span
              >Вопрос {{ currentQuestionIndex + 1 }} из
              {{ totalQuestions }}</span
            >
            <span class="text-purple-600 dark:text-purple-400"
              >{{
                Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
              }}%</span
            >
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              class="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              :style="{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }"
            ></div>
          </div>
        </div>

        <!-- Answer Options -->
        <div class="p-6 sm:p-8 space-y-3">
          <button
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="handleAnswerSelection(index)"
            :disabled="isAnswering"
            class="w-full text-left p-4 rounded-xl transition-all duration-200 group border-2 relative overflow-hidden"
            :class="[
              selectedAnswer === index
                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 dark:border-purple-500 shadow-md'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-slate-50 dark:hover:bg-slate-800',
            ]"
          >
            <div class="flex items-center gap-4 relative z-10">
              <div
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0"
                :class="[
                  selectedAnswer === index
                    ? 'border-purple-500 dark:border-purple-400'
                    : 'border-slate-300 dark:border-slate-600 group-hover:border-purple-400',
                ]"
              >
                <div
                  v-if="selectedAnswer === index"
                  class="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full"
                ></div>
              </div>
              <span
                class="text-base sm:text-lg font-medium transition-colors"
                :class="[
                  selectedAnswer === index
                    ? 'text-purple-900 dark:text-white'
                    : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white',
                ]"
              >
                {{ option.text }}
              </span>
            </div>
          </button>
        </div>

        <!-- Navigation Controls -->
        <div class="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
          <button
            @click="previousQuestion"
            :disabled="currentQuestionIndex === 0"
            class="w-full px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border"
            :class="[
               currentQuestionIndex === 0 
               ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-transparent cursor-not-allowed' 
               : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow'
            ]"
          >
            <i class="fas fa-arrow-left"></i>
            Предыдущий вопрос
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
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const router = useRouter();
const db = useFirestore();
const auth = getAuth();

// State
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref({});
const isLoading = ref(false);
const error = ref(null);
const isAnswering = ref(false); // Prevent fast clicks

// Questions data
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

const handleAnswerSelection = (index) => {
  if (isAnswering.value) return; // Prevent multiple clicks
  isAnswering.value = true; // Disable further clicks

  selectAnswer(index);
  setTimeout(() => {
    nextQuestion();
    isAnswering.value = false; // Re-enable clicks after moving to the next question
  }, 300); // 300ms delay
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
  if (selectedAnswer.value === null || selectedAnswer.value === undefined) {
    console.warn("No answer selected for the current question.");
    return; // Don't proceed if no answer is selected
  }

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
    простодушный: 0,
    сирота: 0,
    воин: 0,
    опекун: 0,
    искатель: 0,
    любовник: 0,
    бунтарь: 0,
    творец: 0,
    маг: 0,
    правитель: 0,
    мудрец: 0,
    шут: 0,
  };

  questionsRef.value.forEach((question) => {
    const answer = answers[question.id] || 0; // Get the user's answer or default to 0
    const archetype = question.relatedArchetype?.toLowerCase();

    if (!archetype) {
      console.warn(`Undefined archetype for question ID: ${question.id}`);
      return; // Skip questions without archetype mappings
    }

    if (scores.hasOwnProperty(archetype)) {
      scores[archetype] += answer; // Add the score to the appropriate archetype
    } else {
      console.warn(
        `Invalid archetype: ${archetype} for question ID: ${question.id}`
      );
    }
  });

  return scores;
};

// const submitAssessmentHandler = async () => {
//   if (isLoading.value) return;

//   isLoading.value = true;
//   error.value = null;

//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       throw new Error(
//         "Пожалуйста, войдите в систему для сохранения результатов"
//       );
//     }

//     // Calculate scores
//     const scores = calculateArchetypeScores(userAnswers.value);

//     // Submit assessment
//     const result = await submitAssessment(
//       db,
//       currentUser.uid,
//       userAnswers.value,
//       scores
//     );

//     if (result.success && result.assessmentId) {
//       router.push(
//         `/lab/experiments/life-purpose-archetype/results/${result.assessmentId}`
//       );
//     } else {
//       throw new Error(result.message || "Не удалось сохранить результаты");
//     }
//   } catch (err) {
//     console.error("Error submitting assessment:", err); // Debug: Log errors
//     error.value = err.message || "Произошла ошибка при сохранении результатов";
//   } finally {
//     isLoading.value = false;
//   }
// };

// Save progress function

const submitAssessmentHandler = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null; // Get userId or allow null

    // Calculate scores
    const scores = calculateArchetypeScores(userAnswers.value);

    // Submit assessment
    const result = await submitAssessment(
      db,
      userId,
      userAnswers.value,
      scores
    );

    if (result.success && result.assessmentId) {
      router.push(
        `/lab/experiments/life-purpose-archetype/results/${result.assessmentId}`
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

const saveProgress = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await saveAssessmentProgress(db, currentUser.uid, {
        currentQuestionIndex: currentQuestionIndex.value,
        answers: userAnswers.value,
      });
    } else {
      // Save progress to localStorage for anonymous users
      localStorage.setItem(
        "assessmentProgress",
        JSON.stringify({
          currentQuestionIndex: currentQuestionIndex.value,
          answers: userAnswers.value,
        })
      );
    }
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
