<template>
  <div class="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-12">
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
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFirestore } from "~/plugins/firebase";
import { getAuth } from "firebase/auth";
import {
  submitAssessment,
  saveAssessmentProgress,
} from "~/api/firebase/assessments";

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
const questions = ref([
  {
    id: 1,
    questionText: "Мне нравится создавать что-то новое из ничего:",
    relatedArchetypes: {
      творец: 1,
      исследователь: 0.5,
      мудрец: 0.3,
      воин: -0.2,
      маг: 0.5,
      заботливый: -0.1,
      наставник: 0.2,
      правитель: -0.3,
      друг: 0,
      шут: 0,
      мятежник: 0.2,
      герой: 0.1,
    },
  },
  {
    id: 2,
    questionText: "Я часто придумываю новые способы решения задач:",
    relatedArchetypes: {
      творец: 1,
      исследователь: 0.4,
      мудрец: 0.6,
      воин: 0,
      маг: 0.3,
      заботливый: -0.2,
      наставник: 0.5,
      правитель: -0.1,
      друг: 0,
      шут: -0.2,
      мятежник: 0,
      герой: 0,
    },
  },
  {
    id: 3,
    questionText: "Меня вдохновляет возможность экспериментировать:",
    relatedArchetypes: {
      творец: 1,
      исследователь: 0.7,
      мудрец: 0.3,
      воин: 0.1,
      маг: 0.4,
      заботливый: -0.2,
      наставник: 0.2,
      правитель: -0.3,
      друг: -0.1,
      шут: 0.1,
      мятежник: 0.3,
      герой: 0,
    },
  },
  {
    id: 4,
    questionText: "Я чувствую себя в своей стихии, когда сталкиваюсь с риском:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: 1,
      мудрец: -0.2,
      воин: 0.5,
      маг: 0.2,
      заботливый: -0.4,
      наставник: -0.1,
      правитель: -0.3,
      друг: -0.2,
      шут: 0,
      мятежник: 0.4,
      герой: 0.3,
    },
  },
  {
    id: 5,
    questionText: "Я часто ищу новые приключения и путешествия:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 1,
      мудрец: 0.1,
      воин: 0,
      маг: 0.3,
      заботливый: -0.3,
      наставник: 0,
      правитель: -0.4,
      друг: -0.1,
      шут: 0.2,
      мятежник: 0.5,
      герой: 0.2,
    },
  },
  {
    id: 6,
    questionText: "Мне нравится заботиться о других и помогать им:",
    relatedArchetypes: {
      творец: -0.1,
      исследователь: -0.2,
      мудрец: 0.2,
      воин: 0,
      маг: -0.1,
      заботливый: 1,
      наставник: 0.8,
      правитель: 0.2,
      друг: 0.7,
      шут: 0,
      мятежник: -0.3,
      герой: 0.5,
    },
  },
  {
    id: 7,
    questionText: "Я всегда ищу правду и стараюсь понять мир:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.4,
      мудрец: 1,
      воин: 0,
      маг: 0.5,
      заботливый: 0.1,
      наставник: 0.6,
      правитель: 0.2,
      друг: -0.1,
      шут: -0.2,
      мятежник: -0.1,
      герой: 0,
    },
  },
  {
    id: 8,
    questionText: "Я часто чувствую, что могу изменить мир к лучшему:",
    relatedArchetypes: {
      творец: 0.5,
      исследователь: 0.3,
      мудрец: 0.2,
      воин: 0.4,
      маг: 0.6,
      заботливый: 0.7,
      наставник: 0.8,
      правитель: 0.5,
      друг: 0.1,
      шут: 0,
      мятежник: 0.4,
      герой: 1,
    },
  },
  {
    id: 9,
    questionText: "Я люблю вносить порядок в хаос:",
    relatedArchetypes: {
      творец: 0,
      исследователь: -0.3,
      мудрец: 0.6,
      воин: 0.2,
      маг: 0.4,
      заботливый: 0.5,
      наставник: 0.4,
      правитель: 1,
      друг: -0.2,
      шут: -0.4,
      мятежник: -0.5,
      герой: 0.7,
    },
  },
  {
    id: 10,
    questionText: "Я часто веселюсь и стараюсь поднять настроение другим:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 0.4,
      мудрец: -0.1,
      воин: -0.2,
      маг: 0,
      заботливый: 0.3,
      наставник: 0.1,
      правитель: -0.3,
      друг: 0.6,
      шут: 1,
      мятежник: 0.4,
      герой: 0.2,
    },
  },
  {
    id: 11,
    questionText:
      "Я предпочитаю действовать решительно и смело в сложных ситуациях:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: 0.3,
      мудрец: 0,
      воин: 1,
      маг: 0.5,
      заботливый: -0.2,
      наставник: 0.4,
      правитель: 0.7,
      друг: -0.1,
      шут: -0.3,
      мятежник: 0.2,
      герой: 0.8,
    },
  },
  {
    id: 12,
    questionText: "Я люблю вдохновлять других своим примером:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.2,
      мудрец: 0.1,
      воин: 0.5,
      маг: 0.6,
      заботливый: 0.5,
      наставник: 1,
      правитель: 0.3,
      друг: 0.3,
      шут: 0.2,
      мятежник: 0,
      герой: 0.9,
    },
  },
  {
    id: 13,
    questionText: "Меня вдохновляют необычные идеи и концепции:",
    relatedArchetypes: {
      творец: 0.8,
      исследователь: 0.5,
      мудрец: 0.7,
      воин: 0.1,
      маг: 1,
      заботливый: -0.1,
      наставник: 0.4,
      правитель: -0.2,
      друг: 0,
      шут: 0.1,
      мятежник: 0.6,
      герой: 0.2,
    },
  },
  {
    id: 14,
    questionText: "Я часто выступаю за социальные перемены:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.5,
      мудрец: 0.2,
      воин: 0.4,
      маг: 0.3,
      заботливый: 0.6,
      наставник: 0.7,
      правитель: 0.1,
      друг: 0.4,
      шут: 0,
      мятежник: 1,
      герой: 0.8,
    },
  },
  {
    id: 15,
    questionText: "Мне нравится учить других тому, что я знаю:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 0.1,
      мудрец: 0.8,
      воин: 0,
      маг: 0.4,
      заботливый: 0.5,
      наставник: 1,
      правитель: 0.3,
      друг: 0.6,
      шут: 0.2,
      мятежник: -0.1,
      герой: 0.4,
    },
  },
  {
    id: 16,
    questionText: "Меня не пугают сложные задачи, я всегда готов к вызову:",
    relatedArchetypes: {
      творец: 0,
      исследователь: 0.4,
      мудрец: 0.3,
      воин: 1,
      маг: 0.6,
      заботливый: -0.2,
      наставник: 0.5,
      правитель: 0.7,
      друг: 0.1,
      шут: -0.3,
      мятежник: 0.3,
      герой: 0.9,
    },
  },
  {
    id: 17,
    questionText: "Мне нравится быть в центре внимания и устанавливать тренды:",
    relatedArchetypes: {
      творец: 0.6,
      исследователь: 0.5,
      мудрец: -0.1,
      воин: 0.2,
      маг: 0.7,
      заботливый: -0.2,
      наставник: 0.3,
      правитель: 1,
      друг: 0.7,
      шут: 0.8,
      мятежник: 0.5,
      герой: 0.4,
    },
  },
  {
    id: 18,
    questionText: "Я верю в магию и стараюсь использовать ее в жизни:",
    relatedArchetypes: {
      творец: 0.5,
      исследователь: 0.4,
      мудрец: 0.2,
      воин: 0.1,
      маг: 1,
      заботливый: -0.3,
      наставник: 0.6,
      правитель: -0.1,
      друг: 0,
      шут: 0.3,
      мятежник: 0.7,
      герой: 0.3,
    },
  },
  {
    id: 19,
    questionText: "Мне нравится заботиться о тех, кто слабее меня:",
    relatedArchetypes: {
      творец: -0.1,
      исследователь: -0.2,
      мудрец: 0.3,
      воин: 0.2,
      маг: 0,
      заботливый: 1,
      наставник: 0.8,
      правитель: 0.4,
      друг: 0.7,
      шут: 0.1,
      мятежник: -0.2,
      герой: 0.6,
    },
  },
  {
    id: 20,
    questionText: "Я часто ищу новые знания, чтобы расширить свой кругозор:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.5,
      мудрец: 1,
      воин: 0.1,
      маг: 0.7,
      заботливый: 0.2,
      наставник: 0.9,
      правитель: 0.3,
      друг: -0.1,
      шут: -0.2,
      мятежник: 0,
      герой: 0.1,
    },
  },
  {
    id: 21,
    questionText: "Я люблю быть лидером и направлять других:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: -0.1,
      мудрец: 0.4,
      воин: 0.6,
      маг: 0.5,
      заботливый: 0,
      наставник: 0.7,
      правитель: 1,
      друг: 0.3,
      шут: -0.3,
      мятежник: -0.5,
      герой: 0.8,
    },
  },
  {
    id: 22,
    questionText: "Мне нравится разряжать обстановку с помощью юмора:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 0.4,
      мудрец: -0.2,
      воин: -0.3,
      маг: 0,
      заботливый: 0.3,
      наставник: 0.1,
      правитель: -0.4,
      друг: 0.7,
      шут: 1,
      мятежник: 0.5,
      герой: 0.2,
    },
  },
  {
    id: 23,
    questionText: "Я стремлюсь к свободе и независимости от правил:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.7,
      мудрец: -0.1,
      воин: 0.2,
      маг: 0.4,
      заботливый: -0.5,
      наставник: -0.2,
      правитель: -0.7,
      друг: 0.1,
      шут: 0.3,
      мятежник: 1,
      герой: 0.5,
    },
  },
  {
    id: 24,
    questionText: "Я часто чувствую потребность защищать справедливость:",
    relatedArchetypes: {
      творец: 0,
      исследователь: 0.3,
      мудрец: 0.4,
      воин: 0.8,
      маг: 0.2,
      заботливый: 0.7,
      наставник: 0.5,
      правитель: 0.6,
      друг: 0.4,
      шут: -0.1,
      мятежник: 0.9,
      герой: 1,
    },
  },
  {
    id: 25,
    questionText: "Мне важно быть полезным и полезным для других:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: -0.1,
      мудрец: 0.6,
      воин: 0.2,
      маг: 0.3,
      заботливый: 1,
      наставник: 0.8,
      правитель: 0.5,
      друг: 0.7,
      шут: 0,
      мятежник: -0.3,
      герой: 0.6,
    },
  },
  {
    id: 26,
    questionText: "Я люблю размышлять о значении жизни и своего места в ней:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.4,
      мудрец: 1,
      воин: 0.1,
      маг: 0.6,
      заботливый: 0.2,
      наставник: 0.9,
      правитель: 0.2,
      друг: 0,
      шут: -0.2,
      мятежник: -0.1,
      герой: 0.3,
    },
  },
  {
    id: 27,
    questionText: "Мне нравится создавать что-то новое и уникальное:",
    relatedArchetypes: {
      творец: 1,
      исследователь: 0.6,
      мудрец: 0.4,
      воин: 0,
      маг: 0.7,
      заботливый: -0.1,
      наставник: 0.3,
      правитель: -0.2,
      друг: 0.1,
      шут: 0.2,
      мятежник: 0.5,
      герой: 0.1,
    },
  },
  {
    id: 28,
    questionText: "Я часто ищу новые ощущения и приключения:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 1,
      мудрец: 0.2,
      воин: 0.4,
      маг: 0.5,
      заботливый: -0.3,
      наставник: 0.1,
      правитель: -0.4,
      друг: 0.2,
      шут: 0.5,
      мятежник: 0.8,
      герой: 0.3,
    },
  },
  {
    id: 29,
    questionText: "Мне важно иметь контроль над своей жизнью и окружением:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: -0.3,
      мудрец: 0.5,
      воин: 0.7,
      маг: 0.4,
      заботливый: 0,
      наставник: 0.3,
      правитель: 1,
      друг: -0.1,
      шут: -0.5,
      мятежник: -0.6,
      герой: 0.8,
    },
  },
  {
    id: 30,
    questionText: "Мне нравится вдохновлять людей на великие дела:",
    relatedArchetypes: {
      творец: 0.5,
      исследователь: 0.4,
      мудрец: 0.3,
      воин: 0.6,
      маг: 0.7,
      заботливый: 0.8,
      наставник: 1,
      правитель: 0.6,
      друг: 0.5,
      шут: 0.2,
      мятежник: 0,
      герой: 0.9,
    },
  },
  {
    id: 31,
    questionText: "Я предпочитаю одиночество, чтобы лучше понять себя:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 0.1,
      мудрец: 1,
      воин: -0.1,
      маг: 0.6,
      заботливый: 0.3,
      наставник: 0.7,
      правитель: 0.4,
      друг: -0.3,
      шут: -0.4,
      мятежник: 0.2,
      герой: 0,
    },
  },
  {
    id: 32,
    questionText: "Мне нравится вносить вклад в общество через мои действия:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.3,
      мудрец: 0.7,
      воин: 0.5,
      маг: 0.6,
      заботливый: 0.9,
      наставник: 0.8,
      правитель: 0.6,
      друг: 0.5,
      шут: 0.1,
      мятежник: 0.7,
      герой: 1,
    },
  },
  {
    id: 33,
    questionText: "Мне важно быть частью группы и иметь друзей:",
    relatedArchetypes: {
      творец: 0,
      исследователь: 0.2,
      мудрец: 0.1,
      воин: -0.2,
      маг: 0,
      заботливый: 0.7,
      наставник: 0.6,
      правитель: 0.3,
      друг: 1,
      шут: 0.8,
      мятежник: -0.1,
      герой: 0.5,
    },
  },
  {
    id: 34,
    questionText: "Я люблю исследовать неизведанное и неизвестное:",
    relatedArchetypes: {
      творец: 0.5,
      исследователь: 1,
      мудрец: 0.4,
      воин: 0.2,
      маг: 0.6,
      заботливый: -0.2,
      наставник: 0.3,
      правитель: -0.3,
      друг: 0.1,
      шут: 0.4,
      мятежник: 0.7,
      герой: 0.5,
    },
  },
  {
    id: 35,
    questionText: "Я стремлюсь к совершенству в моих действиях и работе:",
    relatedArchetypes: {
      творец: 0.7,
      исследователь: 0.3,
      мудрец: 0.8,
      воин: 0.4,
      маг: 0.5,
      заботливый: 0.2,
      наставник: 0.9,
      правитель: 0.6,
      друг: -0.1,
      шут: -0.2,
      мятежник: 0,
      герой: 0.4,
    },
  },
  {
    id: 36,
    questionText: "Мне важно, чтобы другие ценили мои достижения:",
    relatedArchetypes: {
      творец: 0.6,
      исследователь: 0.2,
      мудрец: 0.5,
      воин: 0.7,
      маг: 0.4,
      заботливый: 0.1,
      наставник: 0.3,
      правитель: 1,
      друг: 0.4,
      шут: 0.3,
      мятежник: -0.1,
      герой: 0.8,
    },
  },
  {
    id: 37,
    questionText: "Я стремлюсь к власти и влиянию на окружающих:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: -0.2,
      мудрец: 0.3,
      воин: 0.5,
      маг: 0.6,
      заботливый: 0,
      наставник: 0.4,
      правитель: 1,
      друг: -0.1,
      шут: -0.5,
      мятежник: -0.3,
      герой: 0.7,
    },
  },
  {
    id: 38,
    questionText: "Мне нравится создавать гармонию и мир вокруг себя:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.1,
      мудрец: 0.6,
      воин: 0.2,
      маг: 0.4,
      заботливый: 0.8,
      наставник: 0.7,
      правитель: 0.5,
      друг: 1,
      шут: 0.3,
      мятежник: -0.2,
      герой: 0.6,
    },
  },
  {
    id: 39,
    questionText: "Я часто думаю о том, как можно улучшить общество:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.2,
      мудрец: 0.7,
      воин: 0.3,
      маг: 0.5,
      заботливый: 0.9,
      наставник: 0.8,
      правитель: 0.6,
      друг: 0.4,
      шут: 0.1,
      мятежник: 1,
      герой: 0.9,
    },
  },
  {
    id: 40,
    questionText: "Я люблю разгадывать загадки и тайны:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 0.5,
      мудрец: 1,
      воин: 0.1,
      маг: 0.7,
      заботливый: 0.3,
      наставник: 0.6,
      правитель: 0.2,
      друг: 0,
      шут: -0.2,
      мятежник: 0.4,
      герой: 0,
    },
  },
  {
    id: 41,
    questionText: "Мне нравится быть в роли героя в глазах других:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: 0.3,
      мудрец: 0.2,
      воин: 0.6,
      маг: 0.4,
      заботливый: 0.5,
      наставник: 0.7,
      правитель: 0.8,
      друг: 0.3,
      шут: 0,
      мятежник: 0.2,
      герой: 1,
    },
  },
  {
    id: 42,
    questionText: "Я часто чувствую потребность в риске и адреналине:",
    relatedArchetypes: {
      творец: 0,
      исследователь: 1,
      мудрец: -0.1,
      воин: 0.7,
      маг: 0.2,
      заботливый: -0.3,
      наставник: 0,
      правитель: -0.2,
      друг: -0.1,
      шут: 0.4,
      мятежник: 0.6,
      герой: 0.5,
    },
  },
  {
    id: 43,
    questionText: "Мне нравится быть учителем и передавать знания:",
    relatedArchetypes: {
      творец: 0.2,
      исследователь: 0.1,
      мудрец: 0.8,
      воин: 0,
      маг: 0.3,
      заботливый: 0.6,
      наставник: 1,
      правитель: 0.4,
      друг: 0.7,
      шут: -0.1,
      мятежник: -0.2,
      герой: 0.5,
    },
  },
  {
    id: 44,
    questionText: "Я часто мечтаю о том, чтобы изменить мир к лучшему:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.3,
      мудрец: 0.2,
      воин: 0.5,
      маг: 0.6,
      заботливый: 0.7,
      наставник: 0.8,
      правитель: 0.5,
      друг: 0.1,
      шут: 0,
      мятежник: 0.4,
      герой: 1,
    },
  },
  {
    id: 45,
    questionText: "Мне нравится исследовать новые культуры и идеи:",
    relatedArchetypes: {
      творец: 0.5,
      исследователь: 1,
      мудрец: 0.6,
      воин: 0.2,
      маг: 0.5,
      заботливый: 0,
      наставник: 0.3,
      правитель: -0.2,
      друг: 0.1,
      шут: 0.3,
      мятежник: 0.7,
      герой: 0.4,
    },
  },
  {
    id: 46,
    questionText: "Я ценю порядок и структуру в моей жизни:",
    relatedArchetypes: {
      творец: -0.1,
      исследователь: -0.4,
      мудрец: 0.7,
      воин: 0.3,
      маг: 0.2,
      заботливый: 0.4,
      наставник: 0.5,
      правитель: 1,
      друг: -0.2,
      шут: -0.5,
      мятежник: -0.6,
      герой: 0.6,
    },
  },
  {
    id: 47,
    questionText:
      "Мне доставляет удовольствие делать что-то неожиданное для других:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.4,
      мудрец: -0.2,
      воин: -0.3,
      маг: 0.1,
      заботливый: 0.5,
      наставник: 0.2,
      правитель: -0.4,
      друг: 0.7,
      шут: 1,
      мятежник: 0.6,
      герой: 0.3,
    },
  },
  {
    id: 48,
    questionText: "В конфликтах я предпочитаю выступать посредником:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: 0,
      мудрец: 0.5,
      воин: 0,
      маг: 0.3,
      заботливый: 1,
      наставник: 0.9,
      правитель: 0.4,
      друг: 0.8,
      шут: 0.2,
      мятежник: -0.1,
      герой: 0.5,
    },
  },
  {
    id: 49,
    questionText: "Мне важно, чтобы мое влияние на мир было значительным:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.2,
      мудрец: 0.3,
      воин: 0.7,
      маг: 0.6,
      заботливый: 0.5,
      наставник: 0.8,
      правитель: 1,
      друг: 0.4,
      шут: -0.3,
      мятежник: 0.1,
      герой: 0.9,
    },
  },
  {
    id: 50,
    questionText:
      "Я часто чувствую, что должен защитить тех, кто не может защитить себя:",
    relatedArchetypes: {
      творец: 0,
      исследователь: 0.2,
      мудрец: 0.3,
      воин: 1,
      маг: 0.1,
      заботливый: 0.8,
      наставник: 0.6,
      правитель: 0.4,
      друг: 0.7,
      шут: -0.1,
      мятежник: 0.5,
      герой: 0.9,
    },
  },
  {
    id: 51,
    questionText:
      "Мне нравится быть источником изменений, даже если это вызывает споры:",
    relatedArchetypes: {
      творец: 0.5,
      исследователь: 0.6,
      мудрец: 0.2,
      воин: 0.3,
      маг: 0.4,
      заботливый: 0,
      наставник: 0.1,
      правитель: -0.2,
      друг: -0.1,
      шут: 0,
      мятежник: 1,
      герой: 0.7,
    },
  },
  {
    id: 52,
    questionText: "Меня привлекает мистика и неизведанные аспекты жизни:",
    relatedArchetypes: {
      творец: 0.3,
      исследователь: 0.5,
      мудрец: 0.7,
      воин: 0,
      маг: 1,
      заботливый: -0.2,
      наставник: 0.4,
      правитель: 0,
      друг: 0.1,
      шут: 0.2,
      мятежник: 0.6,
      герой: 0.3,
    },
  },
  {
    id: 53,
    questionText:
      "Я предпочитаю решать проблемы мирным путем, а не конфронтацией:",
    relatedArchetypes: {
      творец: 0.1,
      исследователь: 0,
      мудрец: 0.6,
      воин: -0.3,
      маг: 0.4,
      заботливый: 1,
      наставник: 0.8,
      правитель: 0.5,
      друг: 0.9,
      шут: 0.3,
      мятежник: -0.2,
      герой: 0.5,
    },
  },
  {
    id: 54,
    questionText:
      "Я чувствую себя комфортно, когда я в центре событий и внимания:",
    relatedArchetypes: {
      творец: 0.4,
      исследователь: 0.3,
      мудрец: -0.1,
      воин: 0.6,
      маг: 0.7,
      заботливый: 0.2,
      наставник: 0.5,
      правитель: 1,
      друг: 0.8,
      шут: 0.9,
      мятежник: 0.4,
      герой: 0.6,
    },
  },

  // Additional questions up to 70...
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
    selectedAnswer.value = userAnswers.value[
      questions.value[currentQuestionIndex.value].id
    ]
      ? answerOptions.findIndex(
          (opt) =>
            opt.value ===
            userAnswers.value[questions.value[currentQuestionIndex.value].id]
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
      questions.value[currentQuestionIndex.value].id
    ]
      ? answerOptions.findIndex(
          (opt) =>
            opt.value ===
            userAnswers.value[questions.value[currentQuestionIndex.value].id]
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

  questions.value.forEach((question) => {
    const answer = answers[question.id] || 0;
    Object.keys(question.relatedArchetypes).forEach((archetype) => {
      scores[archetype] += answer * question.relatedArchetypes[archetype];
    });
  });

  const totalPossibleScore = totalQuestions.value * 5; // Max score per question * total questions
  Object.keys(scores).forEach((archetype) => {
    // Calculate the score percentage and ensure it's between 0 and 100
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
  } catch (error) {
    console.error("Error submitting assessment:", error);
    error.value =
      error.message || "Произошла ошибка при сохранении результатов";
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
  } catch (error) {
    console.error("Error saving progress:", error);
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
