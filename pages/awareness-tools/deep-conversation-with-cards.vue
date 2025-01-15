<template>
  <div class="relative min-h-screen">
    <!-- Header Section -->
    <header class="pt-8 px-4 relative z-20">
      <!-- Animated Background Gradient -->
      <div
        class="absolute -bottom-4 sm:-bottom-8 inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#E879F9]/10 to-[#0EA5E9]/10 animate-gradient-x"
      ></div>

      <div class="container mx-auto max-w-6xl relative">
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm">
            <li class="flex items-center group">
              <NuxtLink
                to="/"
                class="text-slate-300 hover:text-[#0EA5E9] transition-all duration-300 flex items-center"
              >
                <i class="fas fa-home mr-2 text-[#0EA5E9]"></i>
                <span
                  class="group-hover:translate-x-1 transition-transform duration-300"
                  >Главная</span
                >
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <i class="fas fa-chevron-right text-slate-400 mx-3 text-xs"></i>
              <span class="text-white font-medium" aria-current="page"
                >Карты</span
              >
            </li>
          </ol>
        </nav>

        <!-- Enhanced Title Section -->
        <div>
          <div class="md:inline-block w-full md:w-auto">
            <div
              class="bg-[#0EA5E9]/20 md:bg-transparent px-4 sm:px-6 py-4 md:p-0 rounded-lg"
            >
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Карты для саморазвития
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Animated Background -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Enhanced Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift opacity-60"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse opacity-40"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float opacity-50"
        ></div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="container mx-auto px-4 max-w-6xl relative z-10 pb-24 sm:pt-6 md:pt-20 2xl:pt-0 -mt-4 sm:mt-0"
    >
      <div class="flex items-center justify-center min-h-[calc(100vh-250px)]">
        <div class="w-full max-w-md">
          <!-- Shuffle Button -->
          <div class="flex justify-center -mt-6">
            <button
              @click="shuffleCards"
              class="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Перемешать карту
            </button>
          </div>
          <!-- Card Stack Container -->
          <div class="relative h-[400px] w-full mt-8 sm:mt-12">
            <!-- Stacked Cards -->
            <TransitionGroup
              name="card-stack"
              tag="div"
              class="relative w-full h-full"
            >
              <div
                v-for="(card, index) in visibleCards"
                :key="card.id"
                :style="{
                  transform: `translateY(${index * -4}px) translateX(${
                    index * -2
                  }px) rotate(${index * -0.5}deg)`,
                  zIndex: visibleCards.length - index,
                }"
                class="absolute top-0 left-0 w-full perspective-1000 cursor-pointer transition-all duration-300"
                @click="handleCardClick(card.id)"
              >
                <div
                  class="transition-transform duration-700 transform-style-3d h-[400px]"
                  :class="{
                    'rotate-y-180': card.id === activeCard?.id && isFlipped,
                  }"
                >
                  <!-- Front of Card -->
                  <div
                    class="absolute w-full h-full bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 backface-hidden"
                    :class="{
                      'shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]':
                        card.id === activeCard?.id,
                    }"
                  >
                    <div class="flex flex-col h-full">
                      <h2
                        class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-4"
                      >
                        Карта дня
                      </h2>
                      <p class="text-slate-300 mb-6">
                        Нажмите, чтобы открыть глубокий разговор с собой
                      </p>
                      <div
                        class="flex-grow flex items-center justify-center bg-[#1A1F35]/40 backdrop-blur-xl rounded-lg border border-[#0EA5E9]/20"
                      >
                        <img
                          :src="card.image"
                          alt="Card Illustration"
                          class="w-full h-auto max-h-[200px] object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Back of Card -->
                  <div
                    class="absolute w-full h-full bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 rotate-y-180 backface-hidden overflow-y-auto custom-scrollbar"
                  >
                    <div class="flex flex-col h-full">
                      <h3
                        class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-4"
                      >
                        {{ card.title }}
                      </h3>
                      <div class="relative w-full h-48 mb-6">
                        <img
                          :src="card.image"
                          alt="Card Illustration"
                          class="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div class="flex-grow">
                        <h4 class="text-lg font-semibold text-slate-300 mb-4">
                          Вопросы для размышления:
                        </h4>
                        <ul
                          class="list-disc list-inside text-slate-300 space-y-3"
                        >
                          <li
                            v-for="(question, index) in card.questions"
                            :key="index"
                            class="leading-relaxed"
                          >
                            {{ question }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define the cards array
const allCards = ref([
  {
    id: 1,
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
    id: 2,
    title: "Связи и отношения",
    image:
      "https://play-lh.googleusercontent.com/De2qPOwtHCUMwFdSoEKH0hZ7iSTPMtAXMPWhTba9lnm22qIs5fs1FvYX2RX1VHEzvbQ=w240-h480-rw",
    questions: [
      "Какие отношения для меня важны?",
      "Что я могу улучшить в общении?",
      "Как я проявляю заботу о близких?",
    ],
  },
  {
    id: 3,
    title: "Личный рост",
    image:
      "https://www.oh-cards-institute.org/wp-content/uploads/2012/07/metaphoric-cards-9458-rnd.jpg",
    questions: [
      "Чему я хочу научиться?",
      "Какие у меня есть страхи?",
      "Что делает меня сильным?",
    ],
  },
  {
    id: 4,
    title: "Цели и мечты",
    image:
      "https://www.oh-cards-institute.org/wp-content/uploads/2012/06/cope-cyring-woman-9462-225-rnd.jpg",
    questions: [
      "Какие у меня долгосрочные цели?",
      "Как я могу приблизиться к своей мечте?",
      "Какие шаги я могу предпринять прямо сейчас?",
    ],
  },
  {
    id: 5,
    title: "Здоровье и благополучие",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQut-J6ZAH2wr-epxAp1Ry3V10gduXkXJE4r-Xnn8_rtYqVHFZUlsgtbfZIc2g2CMoQTUw&usqp=CAU",
    questions: [
      "Что я могу сделать для улучшения своего здоровья?",
      "Как я могу заботиться о своем теле?",
      "Какие здоровые привычки мне стоит развивать?",
    ],
  },
  {
    id: 6,
    title: "Творчество и вдохновение",
    image:
      "https://www.oh-cards-institute.org/wp-content/uploads/2014/11/tandoo-30-250.jpg",
    questions: [
      "Что меня вдохновляет?",
      "Как я могу развивать свое творчество?",
      "Что нового я могу создать?",
    ],
  },
  {
    id: 7,
    title: "Прощение и отпускание",
    image:
      "https://www.oh-cards-institute.org/wp-content/uploads/2012/08/20120808-cope-78-9459-rnd.jpg",
    questions: [
      "Кого или что мне нужно простить?",
      "Что я могу отпустить, чтобы двигаться дальше?",
      "Как я могу освободить себя от обид?",
    ],
  },
  {
    id: 8,
    title: "Мудрость и самоосознание",
    image: "https://i.redd.it/it3vw1rvm6zb1.jpg",
    questions: [
      "Что мне важно понять о себе?",
      "Как я могу стать более осознанным?",
      "Какие уроки жизни я могу извлечь?",
    ],
  },
  {
    id: 9,
    title: "День благодарности",
    image:
      "https://i.pinimg.com/236x/4c/6b/68/4c6b688c601505f34044db488587ece0.jpg",
    questions: [
      "За что я благодарен сегодня?",
      "Какие моменты наполняют меня радостью?",
      "Как я могу выразить благодарность людям в моей жизни?",
    ],
  },
  {
    id: 10,
    title: "Окружение и энергия",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZcVA1AtY0_o7xncJZy32fndUHsCW29qRKg&s",
    questions: [
      "Какое окружение поддерживает меня?",
      "Какие люди в моей жизни поднимают мой дух?",
      "Что я могу изменить в своем окружении для улучшения настроения?",
    ],
  },
  {
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
    title: "Финансовая осознанность",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtzVUfvPZSpqunyUw1omIHJ0n1tlZWs13_g&s",
    questions: [
      "Как я могу улучшить свою финансовую осознанность?",
      "Что мне нужно сделать, чтобы достичь финансовой независимости?",
      "Какие шаги я могу предпринять для улучшения финансового благополучия?",
    ],
  },
]);

// Flip logic
const isFlipped = ref(false);
const activeCard = ref(null);
const visibleCards = ref([]);

// Show top 3 cards in the stack
const updateVisibleCards = () => {
  visibleCards.value = allCards.value.slice(0, 5);
};

// Handle card click
const handleCardClick = (cardId) => {
  if (cardId === visibleCards.value[0]?.id) {
    isFlipped.value = !isFlipped.value;
  }
};

// Shuffle cards with animation
const shuffleCards = () => {
  isFlipped.value = false;

  // Animate cards flying out
  visibleCards.value = visibleCards.value.map((card) => ({
    ...card,
    isExiting: true,
  }));

  // After animation, shuffle and update cards
  setTimeout(() => {
    const shuffledCards = [...allCards.value];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    allCards.value = shuffledCards;
    updateVisibleCards();
    activeCard.value = visibleCards.value[0];
  }, 500); // Adjust the delay to match the animation duration
};

// Initialize on mount
onMounted(() => {
  updateVisibleCards();
  activeCard.value = visibleCards.value[0];
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

/* Card stack transitions */
.card-stack-move {
  transition: all 0.5s ease;
}

.card-stack-enter-active,
.card-stack-leave-active {
  transition: all 0.3s ease;
}

.card-stack-enter-from,
.card-stack-leave-to {
  opacity: 0;
  transform: translateY(30px) rotate(10deg);
}

/* Shuffle animation */
.card-stack-leave-active {
  position: absolute;
  transition: all 0.5s ease;
}

.card-stack-leave-to {
  opacity: 0;
  transform: translateX(100%) rotate(30deg);
}

@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
  background-size: 200% 200%;
}
</style>
