<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="perspective-1000 cursor-pointer" @click="toggleCardFlip">
        <div
          class="transition-transform duration-700 transform-style-3d"
          :class="{ 'rotate-y-180': isFlipped }"
        >
          <!-- Front of Card -->
          <div
            class="relative w-full h-full bg-white rounded-xl shadow-lg p-12 backface-hidden"
          >
            <div class="text-center">
              <h2 class="text-2xl font-bold text-blue-600 mb-4">Карта дня</h2>
              <p class="text-gray-600 mb-6">
                Нажмите, чтобы открыть глубокий разговор с собой
              </p>
              <div
                class="w-full h-64 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <img
                  :src="currentCard.image"
                  alt="Card Illustration"
                  class="w-full h-48 object-cover rounded-lg mb-6"
                />
              </div>
            </div>
          </div>

          <!-- Back of Card -->
          <div
            class="absolute top-0 w-full h-full bg-white rounded-xl shadow-lg p-6 rotate-y-180 backface-hidden"
          >
            <div>
              <h3 class="text-2xl font-bold text-blue-600 mb-4">
                {{ currentCard.title }}
              </h3>
              <img
                :src="currentCard.image"
                alt="Card Illustration"
                class="w-full h-48 object-cover rounded-lg mb-6"
              />
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-700">
                  Вопросы для размышления:
                </h4>
                <ul class="list-disc list-inside text-gray-600 space-y-2">
                  <li
                    v-for="(question, index) in currentCard.questions"
                    :key="index"
                  >
                    {{ question }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cards = [
  {
    title: "Путешествие внутрь себя",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Что я чувствую прямо сейчас?",
      "Какие мои скрытые желания?",
      "Что мне мешает быть счастливым?",
    ],
  },
  {
    title: "Связи и отношения",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Какие отношения для меня важны?",
      "Что я могу улучшить в общении?",
      "Как я проявляю заботу о близких?",
    ],
  },
  {
    title: "Личный рост",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Чему я хочу научиться?",
      "Какие у меня есть страхи?",
      "Что делает меня сильным?",
    ],
  },
];

const isFlipped = ref(false);
const currentCardIndex = ref(2);

const currentCard = computed(() => cards[currentCardIndex.value]);

const toggleCardFlip = () => {
  if (!isFlipped.value) {
    currentCardIndex.value = Math.floor(Math.random() * cards.length);
  }
  isFlipped.value = !isFlipped.value;
};
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
