<template>
  <div class="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span
            >Вопрос {{ currentQuestionIndex + 1 }} из {{ totalQuestions }}</span
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
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }"
          ></div>
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
            @click="selectAnswer(index)"
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

      <!-- Navigation Buttons -->
      <div class="flex justify-between">
        <button
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
          :class="[
            'px-6 py-3 rounded-lg transition-colors duration-300',
            currentQuestionIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-indigo-600 hover:bg-indigo-50',
          ]"
        >
          ← Назад
        </button>
        <button
          @click="nextQuestion"
          :disabled="selectedAnswer === null"
          class="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {{ isLastQuestion ? "Завершить" : "Далее →" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFirestore } from "~/plugins/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const router = useRouter();
const db = useFirestore();

// State
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref({});

// Mock data (replace with Sanity data)
const questions = ref([
  {
    id: 1,
    questionText: "Что вас больше всего вдохновляет в жизни?",
    relatedArchetypes: ["creator", "explorer", "sage"],
  },
  {
    id: 2,
    questionText: "Как вы обычно решаете сложные проблемы?",
    relatedArchetypes: ["warrior", "sage", "magician"],
  },
  // Add more questions...
]);

const answerOptions = [
  { text: "Совершенно не согласен", value: 1 },
  { text: "Скорее не согласен", value: 2 },
  { text: "Нейтрально", value: 3 },
  { text: "Скорее согласен", value: 4 },
  { text: "Полностью согласен", value: 5 },
];

// Computed properties
const totalQuestions = computed(() => questions.value.length);
const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
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
    selectedAnswer.value = null;
  }
};

const nextQuestion = async () => {
  if (isLastQuestion.value) {
    await submitAssessment();
  } else {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
  }
};

const submitAssessment = async () => {
  try {
    // Calculate archetype scores (implement your scoring logic)
    const scores = calculateArchetypeScores(userAnswers.value);

    // Save to Firebase
    const resultId = crypto.randomUUID();
    await setDoc(doc(db, "archetypeResults", resultId), {
      userId: "current-user-id", // Replace with actual user ID
      timestamp: serverTimestamp(),
      answers: userAnswers.value,
      scores: scores,
      // Add other relevant data
    });

    // Navigate to results page
    router.push(`/tools/life-purpose-archetype/results/${resultId}`);
  } catch (error) {
    console.error("Error submitting assessment:", error);
    // Handle error appropriately
  }
};

const calculateArchetypeScores = (answers) => {
  // Implement your scoring algorithm
  // This is a placeholder implementation
  return {
    creator: 0,
    explorer: 0,
    sage: 0,
    warrior: 0,
    magician: 0,
    // Add other archetypes
  };
};
</script>
