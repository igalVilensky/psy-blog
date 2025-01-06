<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex-grow flex items-center justify-center px-4"
    :style="{ minHeight: 'calc(100vh - 150px)' }"
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
              <h2 class="text-2xl font-bold text-gray-800 mb-4">Карта дня</h2>
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
            class="absolute top-0 w-full h-fit bg-white rounded-xl shadow-lg p-6 rotate-y-180 backface-hidden"
          >
            <div>
              <h3 class="text-2xl font-bold text-blue-600 mb-4">
                {{ currentCard.title }}
              </h3>
              <img
                src="https://i.pinimg.com/originals/a7/61/9b/a7619b50601cf51ef0029c6cdf8c7bc8.jpg"
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
import { ref, computed, onMounted } from "vue";

// Define the cards array
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
  {
    title: "Цели и мечты",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Какие у меня долгосрочные цели?",
      "Как я могу приблизиться к своей мечте?",
      "Какие шаги я могу предпринять прямо сейчас?",
    ],
  },
  {
    title: "Здоровье и благополучие",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Что я могу сделать для улучшения своего здоровья?",
      "Как я могу заботиться о своем теле?",
      "Какие здоровые привычки мне стоит развивать?",
    ],
  },
  {
    title: "Творчество и вдохновение",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Что меня вдохновляет?",
      "Как я могу развивать свое творчество?",
      "Что нового я могу создать?",
    ],
  },
  {
    title: "Прощение и отпускание",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Кого или что мне нужно простить?",
      "Что я могу отпустить, чтобы двигаться дальше?",
      "Как я могу освободить себя от обид?",
    ],
  },
  {
    title: "Мудрость и самоосознание",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Что мне важно понять о себе?",
      "Как я могу стать более осознанным?",
      "Какие уроки жизни я могу извлечь?",
    ],
  },
  {
    title: "День благодарности",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "За что я благодарен сегодня?",
      "Какие моменты наполняют меня радостью?",
      "Как я могу выразить благодарность людям в моей жизни?",
    ],
  },
  {
    title: "Окружение и энергия",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Какое окружение поддерживает меня?",
      "Какие люди в моей жизни поднимают мой дух?",
      "Что я могу изменить в своем окружении для улучшения настроения?",
    ],
  },
  {
    title: "Управление временем",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Как я могу эффективнее использовать свое время?",
      "Что для меня является приоритетом?",
      "Как я могу избежать прокрастинации?",
    ],
  },
  {
    title: "Позитивное мышление",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Какие мысли помогают мне оставаться позитивным?",
      "Что я могу сделать, чтобы настроиться на позитив?",
      "Как я могу изменить свой взгляд на сложные ситуации?",
    ],
  },
  {
    title: "Риски и изменения",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Какие риски я готов взять на себя?",
      "Как я могу адаптироваться к изменениям?",
      "Что нового я могу попробовать в своей жизни?",
    ],
  },
  {
    title: "Прошлое и будущее",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Что я могу извлечь из своего прошлого?",
      "Какие шаги мне нужно предпринять, чтобы изменить свое будущее?",
      "Что я хочу достичь в следующие пять лет?",
    ],
  },
  {
    title: "Финансовая осознанность",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Как я могу улучшить свою финансовую осознанность?",
      "Что мне нужно сделать, чтобы достичь финансовой независимости?",
      "Какие шаги я могу предпринять для улучшения финансового благополучия?",
    ],
  },
];

// Flip logic
const isFlipped = ref(false);

// Set the current card index based on the current day
const currentCardIndex = ref(0);

const currentCard = computed(() => cards[currentCardIndex.value]);

// Function to calculate the current card index based on the current date
const setCardOfTheDay = () => {
  const currentDate = new Date();
  const dayOfYear = Math.floor(
    (currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000
  );
  currentCardIndex.value = dayOfYear % cards.length; // Ensure it loops back to the first card after the last one
};

// Toggle card flip
const toggleCardFlip = () => {
  isFlipped.value = !isFlipped.value;
};

// Set the card of the day when the component is mounted
onMounted(() => {
  setCardOfTheDay();
});
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
