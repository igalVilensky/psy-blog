<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-start/20 to-purple-end/20 rounded-full blur-3xl animate-slow-pulse"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gradient-blue-start/20 to-gradient-blue-end/20 rounded-full blur-3xl animate-slow-drift"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gradient-orange-start/10 to-gradient-orange-end/10 rounded-full blur-3xl animate-slow-float"
      ></div>
    </div>

    <!-- Floating Hearts on Mouse Move -->
    <transition-group name="heart-float">
      <div
        v-for="heart in floatingHearts"
        :key="'heart-' + heart.id"
        class="fixed pointer-events-none text-2xl z-40 animate-float-up"
        :style="{
          left: heart.x + 'px',
          top: heart.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      >
        💖
      </div>
    </transition-group>

    <!-- Main Content -->
    <div
      class="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8 py-12 md:py-16"
      @mousemove="handleMouseMove"
      @click="handleClick"
    >
      <div class="max-w-5xl w-full">
        <!-- Main Card -->
        <div
          class="bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 p-4 sm:p-6 md:p-12 lg:p-16 transform hover:scale-[1.01] transition-all duration-500"
          :class="{ 'animate-pulse-slow': clickCount > 5 }"
        >
          <!-- Header Section -->
          <div ref="confettiTrigger" class="text-center mb-8 md:mb-12">
            <!-- Animated Icon -->
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 md:mb-8 bg-gradient-to-br from-gradient-purple-start to-gradient-purple-end rounded-full flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300 cursor-pointer animate-bounce-subtle"
              @click="triggerSpecialEffect"
            >
              <i
                class="fas fa-gift text-3xl sm:text-4xl md:text-5xl text-white animate-wiggle"
              ></i>
            </div>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gradient-purple-start via-gradient-purple-end to-gradient-blue-end bg-clip-text text-transparent mb-4 md:mb-6 leading-tight px-2 animate-gradient-x"
            >
              С Днём Рождения, Настя! 🎉
            </h1>

            <p
              class="text-xl sm:text-2xl md:text-3xl text-white mb-3 md:mb-4 font-light px-2 animate-fade-in-up"
            >
              Моя дорогая!
            </p>
            <p
              class="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4 animate-fade-in-up-delay"
            >
              От всего сердца, от твоего любящего мужа и наших замечательных
              детей: Амели, Натаниэля и Адриэля 💕
            </p>
          </div>

          <!-- CTA Button -->
          <div class="text-center mb-8 md:mb-12 px-2">
            <button
              @click="revealSurprise"
              class="group relative px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg md:text-xl text-white shadow-2xl hover:shadow-purple-start/50 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto animate-pulse-glow"
            >
              <span
                class="relative z-10 flex items-center gap-2 sm:gap-3 justify-center"
              >
                <i
                  :class="
                    showSurprise ? 'fas fa-kiss-wink-heart' : 'fas fa-sparkles'
                  "
                  class="animate-spin-slow"
                ></i>
                <span class="whitespace-nowrap">{{
                  showSurprise
                    ? "Послать тысячу поцелуев 💋"
                    : "Открыть подарок ✨"
                }}</span>
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-gradient-purple-end to-gradient-purple-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </button>

            <p
              v-if="!showSurprise"
              class="text-white/60 text-sm mt-4 animate-pulse"
            >
              💡 Нажми на подарок сверху для сюрприза!
            </p>
          </div>

          <!-- Surprise Content -->
          <transition name="fade-slide">
            <div v-if="showSurprise" class="space-y-6 md:space-y-8">
              <!-- Main Gift Section -->
              <div
                class="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 shadow-xl hover:border-white/30 transition-all duration-300"
              >
                <div class="text-center mb-6 md:mb-8">
                  <a
                    href="https://www.mindqlab.com"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end rounded-full text-white font-semibold text-sm sm:text-base md:text-lg mb-4 md:mb-6 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 animate-bounce-subtle"
                  >
                    <i class="fas fa-globe animate-spin-slow"></i>
                    <span>mindqlab.com</span>
                    <i class="fas fa-external-link-alt text-xs sm:text-sm"></i>
                  </a>
                  <h2
                    class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight px-2"
                  >
                    Твоя лаборатория осознанного развития
                  </h2>
                  <div
                    class="w-20 sm:w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end mx-auto rounded-full animate-pulse-glow"
                  ></div>
                </div>

                <div class="space-y-4 sm:space-y-6 text-white">
                  <p
                    class="text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto px-2"
                  >
                    Моя любимая, этот домен — это твоё
                    <span
                      class="font-semibold bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end bg-clip-text text-transparent"
                      >стратегическое пространство</span
                    >
                    для создания платформы осознанного развития. Здесь ты
                    сможешь помогать людям проходить их путь к целостности,
                    объединяя древнюю мудрость и современные методики.
                  </p>

                  <!-- Concept Cards -->
                  <div
                    class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 md:mt-8 mb-6 md:mb-8"
                  >
                    <div
                      class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-110 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:rotate-3"
                      @mouseenter="createSparkles($event)"
                    >
                      <div
                        class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-float"
                      >
                        <i
                          class="fas fa-brain text-xl sm:text-2xl text-white"
                        ></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                        Mind
                      </h3>
                      <p class="text-xs sm:text-sm text-white/80">
                        Разум, мышление и сознание
                      </p>
                    </div>

                    <div
                      class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-110 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:rotate-3"
                      @mouseenter="createSparkles($event)"
                    >
                      <div
                        class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-float"
                        style="animation-delay: 0.2s"
                      >
                        <i
                          class="fas fa-chart-line text-xl sm:text-2xl text-white"
                        ></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                        Q
                      </h3>
                      <p class="text-xs sm:text-sm text-white/80">
                        Коэффициенты развития
                      </p>
                    </div>

                    <div
                      class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-110 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:rotate-3"
                      @mouseenter="createSparkles($event)"
                    >
                      <div
                        class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-float"
                        style="animation-delay: 0.4s"
                      >
                        <i
                          class="fas fa-flask text-xl sm:text-2xl text-white"
                        ></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                        Lab
                      </h3>
                      <p class="text-xs sm:text-sm text-white/80">
                        Лаборатория экспериментов
                      </p>
                    </div>
                  </div>

                  <!-- Platform Features -->
                  <div
                    class="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <h4
                      class="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
                    >
                      <i
                        class="fas fa-compass text-yellow-400 animate-spin-slow"
                      ></i>
                      <span>Твоя платформа личностного роста</span>
                    </h4>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div
                        class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-400/30 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:-rotate-1"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-book-open text-blue-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Курсы и гайды</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Образовательные программы для осознанного развития
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-400/30 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:rotate-1"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-podcast text-purple-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Подкасты</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Инсайты и советы по личностному росту
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-400/30 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:-rotate-1"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-tools text-green-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Инструменты осознанности</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Эмоциональный компас, Колесо баланса и другие
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-400/30 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:rotate-1"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-users text-pink-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Сообщество</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Пространство для роста и поддержки
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Intelligence Types -->
                  <div
                    class="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20"
                  >
                    <h4
                      class="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
                    >
                      <i
                        class="fas fa-lightbulb text-yellow-400 animate-pulse"
                      ></i>
                      <span>Все виды интеллекта в одном месте</span>
                    </h4>

                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      <div
                        v-for="(intel, idx) in intelligenceTypes"
                        :key="intel.code"
                        class="bg-gradient-to-br backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border transform hover:scale-110 transition-all duration-300 cursor-pointer"
                        :class="intel.classes"
                        :style="{ animationDelay: idx * 0.1 + 's' }"
                        @click="playSound"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            :class="intel.icon"
                            class="text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-sm sm:text-base"
                            :class="intel.textColor"
                            >{{ intel.code }}</span
                          >
                        </div>
                        <p class="text-xs text-white/80">{{ intel.desc }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Vision Section -->
                  <div
                    class="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-gradient-blue-start hover:border-l-8 transition-all duration-300"
                  >
                    <h4
                      class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2"
                    >
                      <i
                        class="fas fa-rocket text-gradient-orange-start animate-bounce"
                      ></i>
                      <span>Твой путь к воплощению мечты</span>
                    </h4>
                    <div class="space-y-2 sm:space-y-3 text-white/90">
                      <div
                        v-for="(item, idx) in visionItems"
                        :key="idx"
                        class="flex items-start gap-2 sm:gap-3 hover:translate-x-2 transition-transform duration-300"
                      >
                        <i
                          class="fas fa-check-circle text-gradient-mint-start mt-1 flex-shrink-0 text-sm sm:text-base animate-pulse"
                          :style="{ animationDelay: idx * 0.2 + 's' }"
                        ></i>
                        <span class="text-sm sm:text-base">{{ item }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Closing Message -->
                  <div class="text-center py-4 sm:py-6">
                    <p
                      class="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-gradient-mint-start to-gradient-purple-end bg-clip-text text-transparent mb-4 sm:mb-6 px-2 animate-gradient-x"
                    >
                      MindQLab — это бесконечное пространство для твоего
                      творчества и помощи людям!
                    </p>
                    <div
                      class="max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <p
                        class="text-sm sm:text-base text-white/90 leading-relaxed italic"
                      >
                        <i class="fas fa-quote-left text-white/40 mr-2"></i>
                        Я верю в тебя и знаю, что ты создашь нечто удивительное.
                        Наша семья — твоя самая надёжная поддержка. Наши дети
                        учатся у тебя каждый день, как расти и развиваться, как
                        быть сильной и мудрой.
                        <i class="fas fa-quote-right text-white/40 ml-2"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Kids Section -->
              <div
                class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 md:mt-8"
              >
                <div
                  v-for="(kid, idx) in kids"
                  :key="kid.name"
                  class="group bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-110 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                  :style="{ animationDelay: idx * 0.15 + 's' }"
                  @click="celebrateKid(kid.name)"
                >
                  <div
                    :class="kid.bgGradient"
                    class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center shadow-lg transition-shadow animate-float"
                    :style="{ animationDelay: idx * 0.2 + 's' }"
                  >
                    <i
                      :class="kid.icon"
                      class="text-2xl sm:text-3xl text-white"
                    ></i>
                  </div>
                  <h4 class="font-bold text-lg sm:text-xl text-white mb-2">
                    {{ kid.name }}
                  </h4>
                  <p class="text-xs sm:text-sm text-white/80">
                    {{ kid.message }}
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Footer Message -->
        <div class="text-center mt-6 md:mt-8 px-4">
          <p class="text-white/70 text-base sm:text-lg animate-pulse">
            <i class="fas fa-heart text-red-400 animate-heartbeat"></i>
            С безграничной любовью, твоя семья
            <i class="fas fa-heart text-red-400 animate-heartbeat"></i>
          </p>
          <p class="text-white/50 text-sm mt-2">
            💡 Кликай везде для волшебства! ✨
          </p>
        </div>
      </div>
    </div>

    <!-- Kiss Effect Emojis -->
    <transition-group name="kiss">
      <div
        v-for="kiss in kisses"
        :key="'kiss-' + kiss.id"
        class="fixed pointer-events-none text-2xl sm:text-3xl md:text-4xl z-50"
        :style="{
          left: kiss.x + 'px',
          top: kiss.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      >
        💋
      </div>
    </transition-group>

    <!-- Sparkles -->
    <transition-group name="sparkle">
      <div
        v-for="sparkle in sparkles"
        :key="'sparkle-' + sparkle.id"
        class="fixed pointer-events-none text-xl z-50"
        :style="{
          left: sparkle.x + 'px',
          top: sparkle.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      >
        ✨
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import confetti from "canvas-confetti";

definePageMeta({
  layout: "empty",
});

const showSurprise = ref(false);
const confettiTrigger = ref(null);
const kisses = ref([]);
const floatingHearts = ref([]);
const sparkles = ref([]);
const clickCount = ref(0);
let kissIdCounter = 0;
let heartIdCounter = 0;
let sparkleIdCounter = 0;

const intelligenceTypes = [
  {
    code: "IQ",
    desc: "Логическое мышление",
    icon: "fas fa-puzzle-piece text-blue-400",
    textColor: "text-blue-300",
    classes:
      "from-blue-500/20 to-blue-600/20 border-blue-400/30 hover:from-blue-500/30 hover:to-blue-600/30",
  },
  {
    code: "EQ",
    desc: "Эмоциональный интеллект",
    icon: "fas fa-heart text-green-400",
    textColor: "text-green-300",
    classes:
      "from-green-500/20 to-green-600/20 border-green-400/30 hover:from-green-500/30 hover:to-green-600/30",
  },
  {
    code: "AQ",
    desc: "Адаптивность",
    icon: "fas fa-sync text-red-400",
    textColor: "text-red-300",
    classes:
      "from-red-500/20 to-red-600/20 border-red-400/30 hover:from-red-500/30 hover:to-red-600/30",
  },
  {
    code: "CQ",
    desc: "Креативность",
    icon: "fas fa-palette text-yellow-400",
    textColor: "text-yellow-300",
    classes:
      "from-yellow-500/20 to-yellow-600/20 border-yellow-400/30 hover:from-yellow-500/30 hover:to-yellow-600/30",
  },
  {
    code: "SQ",
    desc: "Социальный интеллект",
    icon: "fas fa-users text-indigo-400",
    textColor: "text-indigo-300",
    classes:
      "from-indigo-500/20 to-indigo-600/20 border-indigo-400/30 hover:from-indigo-500/30 hover:to-indigo-600/30",
  },
  {
    code: "+ новые Q",
    desc: "Которые ты откроешь",
    icon: "fas fa-infinity text-pink-400",
    textColor: "text-pink-300",
    classes:
      "from-pink-500/20 to-pink-600/20 border-pink-400/30 hover:from-pink-500/30 hover:to-pink-600/30",
  },
];

const visionItems = [
  "Создавай трансформационные программы развития",
  "Делись своими знаниями через курсы и подкасты",
  "Создавай уникальные инструменты самопознания",
  "Строй сообщество осознанных людей",
  "Помогай людям находить их путь к целостности",
];

const kids = [
  {
    name: "Амели",
    icon: "fas fa-crown",
    message: "Видит в тебе пример сильной женщины",
    bgGradient:
      "bg-gradient-to-br from-pink-400 to-pink-600 group-hover:shadow-pink-500/50",
  },
  {
    name: "Натаниэль",
    icon: "fas fa-star",
    message: "Твой самый вдохновлённый ученик",
    bgGradient:
      "bg-gradient-to-br from-blue-400 to-blue-600 group-hover:shadow-blue-500/50",
  },
  {
    name: "Адриэль",
    icon: "fas fa-heart",
    message: "Чувствует твою мудрость каждый день",
    bgGradient:
      "bg-gradient-to-br from-green-400 to-green-600 group-hover:shadow-green-500/50",
  },
];

const revealSurprise = () => {
  if (!showSurprise.value) {
    // Epic confetti celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#B44CFF", "#FF4DFF", "#00FF88", "#3A1CFF"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#B44CFF", "#FF4DFF", "#00FF88", "#3A1CFF"],
      });
    }, 250);

    showSurprise.value = true;

    setTimeout(() => {
      confettiTrigger.value?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  } else {
    // Show kiss effect when already revealed
    createKissEffect();
  }
};

const createKissEffect = () => {
  // Create multiple kisses at random positions
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const kiss = {
        id: kissIdCounter++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      kisses.value.push(kiss);

      // Remove kiss after animation
      setTimeout(() => {
        const index = kisses.value.findIndex((k) => k.id === kiss.id);
        if (index > -1) {
          kisses.value.splice(index, 1);
        }
      }, 2000);
    }, i * 50);
  }
};

const handleMouseMove = (e) => {
  // Occasionally spawn a heart on mouse move
  if (Math.random() > 0.97) {
    const heart = {
      id: heartIdCounter++,
      x: e.clientX,
      y: e.clientY,
    };
    floatingHearts.value.push(heart);

    setTimeout(() => {
      const index = floatingHearts.value.findIndex((h) => h.id === heart.id);
      if (index > -1) {
        floatingHearts.value.splice(index, 1);
      }
    }, 2000);
  }
};

const handleClick = (e) => {
  clickCount.value++;

  // Create sparkles on click
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const sparkle = {
        id: sparkleIdCounter++,
        x: e.clientX + (Math.random() - 0.5) * 50,
        y: e.clientY + (Math.random() - 0.5) * 50,
      };
      sparkles.value.push(sparkle);

      setTimeout(() => {
        const index = sparkles.value.findIndex((s) => s.id === sparkle.id);
        if (index > -1) {
          sparkles.value.splice(index, 1);
        }
      }, 1000);
    }, i * 50);
  }
};

const triggerSpecialEffect = () => {
  // Fireworks effect
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      zIndex: 100,
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#B44CFF", "#FF4DFF", "#00FF88"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#3A1CFF", "#FFD700", "#FF1493"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#00FF88", "#B44CFF", "#FF4DFF"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ["#FFD700", "#3A1CFF", "#FF1493"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#B44CFF", "#00FF88", "#FFD700"],
  });
};

const createSparkles = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const sparkle = {
        id: sparkleIdCounter++,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
      };
      sparkles.value.push(sparkle);

      setTimeout(() => {
        const index = sparkles.value.findIndex((s) => s.id === sparkle.id);
        if (index > -1) {
          sparkles.value.splice(index, 1);
        }
      }, 1000);
    }, i * 100);
  }
};

const celebrateKid = (kidName) => {
  // Hearts explosion for kid
  const duration = 1500;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ["#FF1493", "#FFD700", "#FF69B4", "#FF4DFF"],
      shapes: ["circle"],
      zIndex: 100,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ["#FF1493", "#FFD700", "#FF69B4", "#FF4DFF"],
      shapes: ["circle"],
      zIndex: 100,
    });
  }, 50);
};
</script>

<style scoped>
@keyframes float-up {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(-100px) scale(1.5);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(180, 76, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(180, 76, 255, 0.8);
  }
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

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(1.1);
  }
  20%,
  40% {
    transform: scale(0.9);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float-up {
  animation: float-up 2s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-gradient-x {
  background-size: 200% auto;
  animation: gradient-x 3s linear infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-fade-in-up-delay {
  animation: fade-in-up 0.8s ease-out 0.2s backwards;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.fade-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.kiss-enter-active {
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.kiss-leave-active {
  transition: all 0.5s ease-out;
}

.kiss-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(-45deg);
}

.kiss-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.5) rotate(0deg);
}

.kiss-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(45deg);
}

.heart-float-enter-active {
  transition: all 2s ease-out;
}

.heart-float-leave-active {
  transition: all 0.5s ease-out;
}

.heart-float-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.heart-float-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(-80px) scale(1.2);
}

.heart-float-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(-120px) scale(0.5);
}

.sparkle-enter-active {
  transition: all 1s ease-out;
}

.sparkle-leave-active {
  transition: all 0.3s ease-out;
}

.sparkle-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(0deg);
}

.sparkle-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
}

.sparkle-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(360deg);
}

/* Background animations */
@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(30px, -30px);
  }
  66% {
    transform: translate(-20px, 20px);
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
}

.animate-slow-pulse {
  animation: slow-pulse 4s ease-in-out infinite;
}

.animate-slow-drift {
  animation: slow-drift 8s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 6s ease-in-out infinite;
}
</style>
