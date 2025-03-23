<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-3xl px-4 xl:px-0 py-8 sm:py-12">
      <!-- Question Card -->
      <div
        v-if="currentQuestion && !showAgeInput && !showResults"
        class="bg-slate-900/60 backdrop-blur-xl rounded-xl transition-all duration-300 hover:bg-slate-900/80 mb-12 border border-white/5"
      >
        <!-- Question Header -->
        <div class="p-6 sm:p-8 border-b border-white/5">
          <h2 class="text-xl sm:text-2xl font-bold text-white">
            {{ currentQuestion.questionText }}
          </h2>
          <!-- Display Trait Name -->
          <p class="text-sm text-slate-300 mt-2">
            <strong>Текущий аспект:</strong> {{ currentQuestion.trait }}
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="px-6 sm:px-8 py-4 border-b border-white/5">
          <div class="flex justify-between text-sm text-slate-200 mb-2">
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
          <div class="w-full bg-slate-800/50 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
              :style="{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }"
            ></div>
          </div>
        </div>

        <!-- Answer Options -->
        <div class="p-6 sm:p-8 space-y-4">
          <button
            v-for="(option, index) in answerOptions"
            :key="index"
            @click="handleAnswerSelection(index)"
            :disabled="isAnswering"
            class="w-full text-left p-4 rounded-lg transition-all duration-200 group"
            :class="[
              selectedAnswer === index
                ? 'bg-gradient-to-r from-blue-500/10 via-green-500/10 to-teal-500/10 border-blue-500/50'
                : 'bg-slate-800/50 hover:bg-slate-800/80 border-white/5',
              'border',
            ]"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
                :class="[
                  selectedAnswer === index
                    ? 'border-blue-400'
                    : 'border-slate-400 group-hover:border-blue-400/50',
                ]"
              >
                <div
                  v-if="selectedAnswer === index"
                  class="w-3 h-3 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
                ></div>
              </div>
              <span
                class="text-base sm:text-lg"
                :class="[
                  selectedAnswer === index
                    ? 'text-white'
                    : 'text-slate-200 group-hover:text-white',
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
            class="w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-slate-800/50 hover:bg-slate-800/80 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/5"
          >
            <i class="fas fa-arrow-left"></i>
            Предыдущий вопрос
          </button>
        </div>
      </div>

      <!-- Age Input Section -->
      <div
        v-if="showAgeInput"
        class="bg-slate-900/60 backdrop-blur-xl rounded-xl transition-all duration-300 hover:bg-slate-900/80 mb-12 border border-white/5 p-8"
      >
        <h2 class="text-xl sm:text-2xl font-bold text-white mb-4">
          Пожалуйста, укажите ваш возраст:
        </h2>
        <input
          v-model="userAge"
          type="number"
          min="10"
          max="100"
          class="w-full p-3 rounded-lg bg-slate-800/50 border border-white/5 text-white focus:outline-none focus:border-blue-500"
          placeholder="Введите ваш возраст"
        />
        <button
          @click="submitAge"
          class="mt-4 w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-slate-800/50 hover:bg-slate-800/80 text-white flex items-center justify-center gap-2 border border-white/5"
        >
          Подтвердить
        </button>
      </div>

      <!-- Final Scores Section -->
      <div
        v-if="showResults"
        class="bg-slate-900/60 rounded-xl p-8 mt-12 border border-white/5"
      >
        <h3 class="text-2xl font-bold text-white">Ваши результаты</h3>

        <!-- Display Trait Scores -->
        <div
          v-for="(score, trait) in calculatedScores.traitScores"
          :key="trait"
          class="mt-4"
        >
          <p class="text-lg text-slate-200">
            <strong>{{ trait }}:</strong> {{ Math.round(score) }} из 120
          </p>
        </div>

        <!-- Display Facet Scores -->
        <div
          v-for="(facets, trait) in calculatedScores.facetScores"
          :key="trait"
          class="mt-6"
        >
          <h4 class="text-xl text-slate-200">
            <strong>{{ trait }} Facets:</strong>
          </h4>
          <div v-for="(facetScore, facet) in facets" :key="facet" class="mt-2">
            <p class="text-sm text-slate-300">
              <strong>{{ facet }}:</strong> {{ Math.round(facetScore) }} из 20
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { questions } from "@/data/big-5-model/questions.js";

// State
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref({});
const isAnswering = ref(false);
const calculatedScores = ref({});
const showAgeInput = ref(false);
const userAge = ref(null);
const showResults = ref(false);

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

const calculateTraitScores = () => {
  console.log("🔹 Starting score calculation...");

  // Initialize trait and facet scores
  let traitScores = {
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

    console.log(
      `🟢 Q${question.id} | Trait: ${question.trait}, Facet: ${question.facet} | Answer: ${answer}, Reversed: ${reversed}, Final Score: ${score}`
    );

    // Update facet scores
    if (
      facetScores[question.trait] &&
      facetScores[question.trait][question.facet]
    ) {
      facetScores[question.trait][question.facet].raw += score;
      facetScores[question.trait][question.facet].count += 1;

      console.log(
        `✅ Updated ${question.trait} - ${question.facet}: Raw ${
          facetScores[question.trait][question.facet].raw
        }, Count ${facetScores[question.trait][question.facet].count}`
      );
    } else {
      console.warn(
        `⚠️ Facet "${question.facet}" not found in trait "${question.trait}"`
      );
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
  Object.keys(traitScores).forEach((trait) => {
    traitScores[trait] = Object.values(facetScores[trait]).reduce(
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

  Object.keys(traitScores).forEach((trait) => {
    traitScores[trait] = adjustScoresBasedOnAge(trait, traitScores[trait]);
  });

  console.log("🔹 Final Scores:", { traitScores, facetScores });

  // Store the final calculated scores
  calculatedScores.value = { traitScores, facetScores };
  showResults.value = true;
};
</script>
