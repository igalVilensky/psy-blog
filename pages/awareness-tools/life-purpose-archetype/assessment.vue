<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto px-4 max-w-3xl relative z-10 py-12">
      <!-- Back Navigation -->
      <div class="mb-8">
        <NuxtLink
          to="/awareness-tools/life-purpose-archetype"
          class="inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-colors mb-8 group pl-6 sm:pl-0"
        >
          <i
            class="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform text-current"
          ></i>
          Вернуться к инструментам осознанности
        </NuxtLink>
      </div>
      <!-- Progress Bar -->
      <div class="mb-8 flex gap-4 sm:gap-8 justify-between items-center">
        <button
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
          class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0EA5E9]/20"
          :class="{
            'opacity-50 cursor-not-allowed': currentQuestionIndex === 0,
          }"
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
            Назад
          </span>
          <span class="relative invisible">Назад</span>
        </button>
        <div class="flex-grow">
          <div class="flex justify-between text-sm text-slate-300 mb-2">
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
          <div class="w-full bg-[#1E293B]/60 rounded-full h-2 backdrop-blur-sm">
            <div
              class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] h-2 rounded-full transition-all duration-300"
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
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-6">
          {{ currentQuestion.questionText }}
        </h2>

        <!-- Answer Options -->
        <div class="space-y-4">
          <button
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="handleAnswerSelection(index)"
            class="w-full text-left p-4 rounded-lg border transition-all duration-200 backdrop-blur-sm"
            :class="[
              selectedAnswer === index
                ? 'border-[#0EA5E9] bg-[#0EA5E9]/10'
                : 'border-[#0EA5E9]/20 hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/10',
            ]"
          >
            <div class="flex items-center">
              <div
                class="min-w-6 min-h-6 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center"
                :class="[
                  selectedAnswer === index
                    ? 'border-[#0EA5E9]'
                    : 'border-[#0EA5E9]/50',
                ]"
              >
                <div
                  v-if="selectedAnswer === index"
                  class="w-3 h-3 bg-[#0EA5E9] rounded-full"
                ></div>
              </div>
              <span class="text-lg text-slate-300">{{ option.text }}</span>
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

const handleAnswerSelection = (index) => {
  selectAnswer(index);
  setTimeout(() => {
    nextQuestion();
  }, 300); // 300ms delay before moving to the next question
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
