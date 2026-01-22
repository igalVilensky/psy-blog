<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
    <div class="container mx-auto max-w-3xl px-4 xl:px-0 py-8 sm:py-12">
      <Breadcrumbs />

      <!-- Question Card -->
      <div v-if="currentQuestion && !showAgeInput && !showResults"
        class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 mb-12">
        <!-- Question Header -->
        <div class="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {{ currentQuestion.questionText }}
          </h2>
          <!-- Display Trait Name -->
          <div class="flex items-center gap-2">
            <span
              class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              {{ currentQuestion.trait }}
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="px-6 sm:px-8 py-6 border-b border-slate-200 dark:border-slate-800">
          <div class="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
            <span>Вопрос {{ currentQuestionIndex + 1 }} из {{ totalQuestions }}</span>
            <span>{{ Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100) }}%</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              :style="{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }"></div>
          </div>
        </div>

        <!-- Answer Options -->
        <div class="p-6 sm:p-8 space-y-4">
          <button v-for="(option, index) in answerOptions" :key="index" @click="handleAnswerSelection(index)"
            :disabled="isAnswering"
            class="w-full text-left p-4 rounded-xl transition-all duration-200 group border-2 relative overflow-hidden"
            :class="[
              selectedAnswer === index
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-500 shadow-md'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800',
            ]">
            <div class="flex items-center gap-4 relative z-10">
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200"
                :class="[
                  selectedAnswer === index
                    ? 'border-blue-500'
                    : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400',
                ]">
                <div v-if="selectedAnswer === index" class="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <span class="text-base sm:text-lg font-medium transition-colors duration-200" :class="[
                selectedAnswer === index
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white',
              ]">
                {{ option.text }}
              </span>
            </div>
          </button>
        </div>

        <!-- Navigation Controls -->
        <div class="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
          <button @click="previousQuestion" :disabled="currentQuestionIndex === 0"
            class="w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border"
            :class="[
              currentQuestionIndex === 0
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-transparent cursor-not-allowed'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow'
            ]">
            <i class="fas fa-arrow-left"></i>
            Предыдущий вопрос
          </button>
        </div>
      </div>

      <!-- Age Input Section -->
      <div v-if="showAgeInput"
        class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 animate-fade-in-up">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Пожалуйста, укажите ваш возраст
        </h2>
        <div class="max-w-sm mx-auto">
          <input v-model="userAge" type="number" min="10" max="100"
            class="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-center text-xl font-bold mb-6"
            placeholder="Ваш возраст" />
          <button @click="submitAge"
            class="w-full px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1">
            Подтвердить и получить результаты
          </button>
        </div>
      </div>

      <!-- Final Scores Section -->
      <div v-if="showResults" class="space-y-8 animate-fade-in-up">
        <div
          class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
          <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Ваш Психологический Портрет
            </span>
          </h3>

          <!-- Display Trait Scores -->
          <div class="grid gap-6">
            <div v-for="(score, trait) in calculatedScores.traitScores" :key="trait"
              class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div class="flex justify-between items-end mb-4">
                <h4 class="text-xl font-bold text-slate-900 dark:text-white capitalize">{{ trait }}</h4>
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ Math.round(score) }}/120</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: `${(score / 120) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Display Facet Scores -->
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(facets, trait) in calculatedScores.facetScores" :key="trait"
            class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-6">
            <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <i class="fas fa-chart-pie text-blue-500"></i>
              <span class="capitalize">{{ trait }}</span> - Детализация
            </h4>
            <div class="space-y-4">
              <div v-for="(facetScore, facet) in facets" :key="facet">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-slate-600 dark:text-slate-400 capitalize">{{ facet }}</span>
                  <span class="font-medium text-slate-900 dark:text-white">{{ Math.round(facetScore) }}/20</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div class="bg-blue-500 dark:bg-blue-400 h-full rounded-full"
                    :style="{ width: `${(facetScore / 20) * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <NuxtLink to="/space/growth/big-5-model"
            class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md">
            <i class="fas fa-arrow-left mr-2"></i>
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { questions } from "@/data/big-5-model/questions.js";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import { useAuthStore } from "~/stores/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

definePageMeta({
  layout: "laboratory",
});

const { $firestore } = useNuxtApp();
const authStore = useAuthStore();

// State
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref({});
const isAnswering = ref(false);
const calculatedScores = ref({});
const showAgeInput = ref(false);
const userAge = ref(null);
const showResults = ref(false);
const isSaving = ref(false);

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
  if (isAnswering.value) return;
  isAnswering.value = true;

  selectAnswer(index);
  setTimeout(() => {
    nextQuestion();
    isAnswering.value = false;
  }, 300);
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

const nextQuestion = () => {
  if (selectedAnswer.value === null || selectedAnswer.value === undefined) {
    console.warn("No answer selected for the current question.");
    return;
  }

  if (isLastQuestion.value) {
    showAgeInput.value = true;
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

const submitAge = () => {
  if (!userAge.value || userAge.value < 10 || userAge.value > 100) {
    alert("Пожалуйста, введите корректный возраст (от 10 до 100).");
    return;
  }
  showAgeInput.value = false;
  calculateTraitScores();
};

const saveResults = async (traitScores, facetScores) => {
  if (!authStore.user) return;

  isSaving.value = true;
  try {
    await addDoc(collection($firestore, `users/${authStore.user.uid}/big5Results`), {
      traitScores,
      facetScores,
      age: userAge.value,
      timestamp: serverTimestamp(),
      questionsCount: totalQuestions.value
    });
  } catch (e) {
    console.error("Error saving results:", e);
  } finally {
    isSaving.value = false;
  }
};

const calculateTraitScores = () => {

  // Initialize trait and facet scores
  let traitScores = {
    neyrotizm: 0,
    extraversion: 0,
    openness: 0,
    agreeableness: 0,
    conscientiousness: 0,
  };

  // Mapping for Russian keys if needed, but let's stick to what was there or map to English keys for DB?
  // The original code used Russian keys: 'нейротизм', etc. 
  // Let's keep using the russian keys for internal calculation to match data references, 
  // but maybe save them as English keys if preferred? 
  // For consistency with existing code, I will use the RUSSIAN keys locally first.

  let localTraitScores = {
    нейротизм: 0,
    экстраверсия: 0,
    открытость_опыту: 0,
    доброжелательность: 0,
    добросовестность: 0,
  };

  let facetScores = {
    нейротизм: {
      тревожность: { raw: 0, count: 0 },
      злость: { raw: 0, count: 0 },
      депрессия: { raw: 0, count: 0 },
      самосознание: { raw: 0, count: 0 },
      неумеренность: { raw: 0, count: 0 },
      ранимость: { raw: 0, count: 0 },
    },
    экстраверсия: {
      дружелюбие: { raw: 0, count: 0 },
      общительность: { raw: 0, count: 0 },
      настойчивость: { raw: 0, count: 0 },
      уровень_активности: { raw: 0, count: 0 },
      азартность: { raw: 0, count: 0 },
      жизнерадостность: { raw: 0, count: 0 },
    },
    открытость_опыту: {
      воображение: { raw: 0, count: 0 },
      творческие_интересы: { raw: 0, count: 0 },
      эмоциональность: { raw: 0, count: 0 },
      авантюрность: { raw: 0, count: 0 },
      интеллект: { raw: 0, count: 0 },
      либерализм: { raw: 0, count: 0 },
    },
    доброжелательность: {
      доверие: { raw: 0, count: 0 },
      нравственность: { raw: 0, count: 0 },
      альтруизм: { raw: 0, count: 0 },
      сотрудничество: { raw: 0, count: 0 },
      скромность: { raw: 0, count: 0 },
      сочувствие: { raw: 0, count: 0 },
    },
    добросовестность: {
      самоэффективность: { raw: 0, count: 0 },
      организованность: { raw: 0, count: 0 },
      ответственность: { raw: 0, count: 0 },
      целеустремленность: { raw: 0, count: 0 },
      самодисциплина: { raw: 0, count: 0 },
      осторожность: { raw: 0, count: 0 },
    },
  };

  // Calculate scores
  questionsRef.value.forEach((question) => {
    const answer = userAnswers.value[question.id];
    if (!answer) {
      console.warn(`⚠️ Missing answer for question ${question.id}`);
      return;
    }

    const reversed = question.keyed;
    const score = reversed ? 6 - answer : answer;

    // Update facet scores
    if (
      facetScores[question.trait] &&
      facetScores[question.trait][question.facet]
    ) {
      facetScores[question.trait][question.facet].raw += score;
      facetScores[question.trait][question.facet].count += 1;
    }
  });

  // Calculate final facet scores (scaled to 20)
  Object.keys(facetScores).forEach((trait) => {
    Object.keys(facetScores[trait]).forEach((facet) => {
      const { raw, count } = facetScores[trait][facet];
      facetScores[trait][facet] = count > 0 ? Math.round((raw / count) * 5) : 0;
    });
  });

  // Calculate trait scores (sum of facet scores)
  Object.keys(localTraitScores).forEach((trait) => {
    localTraitScores[trait] = Object.values(facetScores[trait]).reduce(
      (sum, facetScore) => sum + facetScore,
      0
    );
  });

  // Apply age adjustments
  const adjustScoresBasedOnAge = (trait, score) => {
    const ageAdjustment = {
      нейротизм: -0.5 * (userAge.value / 10),
      экстраверсия: -0.3 * (userAge.value / 10),
      открытость_опыту: -0.2 * (userAge.value / 10),
      доброжелательность: 0.5 * (userAge.value / 10),
      добросовестность: 0.7 * (userAge.value / 10),
    };
    return Math.min(Math.max(score + ageAdjustment[trait], 0), 120);
  };

  Object.keys(localTraitScores).forEach((trait) => {
    localTraitScores[trait] = adjustScoresBasedOnAge(trait, localTraitScores[trait]);
  });

  // Store the final calculated scores
  calculatedScores.value = { traitScores: localTraitScores, facetScores };
  showResults.value = true;

  // Save to Firestore
  saveResults(localTraitScores, facetScores);
};
</script>
