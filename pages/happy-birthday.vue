<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 relative overflow-hidden pt-4">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-slow-drift">
      </div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-slow-float">
      </div>
    </div>

    <!-- Floating Balloons on Mouse Move -->
    <transition-group name="balloon-float">
      <div v-for="balloon in floatingBalloons" :key="'balloon-' + balloon.id"
        class="fixed pointer-events-none text-xl sm:text-2xl z-40 animate-float-up" :style="{
          left: balloon.x + 'px',
          top: balloon.y + 'px',
          transform: 'translate(-50%, -50%)',
        }">
        🎈
      </div>
    </transition-group>

    <!-- Main Content -->
    <div
      class="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 py-8 sm:py-12 md:py-16"
      @mousemove="handleMouseMove" @click="handleClick">
      <div class="max-w-6xl w-full">
        <!-- Main Card -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 px-4 pt-6 sm:p-6 md:p-10 lg:p-16 transform hover:scale-[1.01] transition-all duration-500">
          <!-- Header Section -->
          <div ref="confettiTrigger" class="text-center mb-6 sm:mb-8 md:mb-16">
            <!-- Animated Birthday Icon -->
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-6 sm:mb-8 md:mb-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300 cursor-pointer animate-bounce-subtle"
              @click="triggerSpecialEffect">
              <i class="fas fa-birthday-cake text-3xl sm:text-4xl md:text-5xl text-white animate-wiggle"></i>
            </div>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 leading-tight px-2 animate-gradient-x font-birthday">
              С Днём Рождения, моя дорогая Настя! 🎉
            </h1>

            <p
              class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 sm:mb-6 md:mb-8 lg:mb-12 max-w-3xl mx-auto px-4 leading-relaxed animate-fade-in-up-delay font-reading">
              От всего сердца, от твоего любящего мужа и наших замечательных
              детей: Амели, Натаниэля и Адриэля 💕
            </p>
          </div>

          <!-- CTA Button -->
          <div class="text-center mb-8 sm:mb-10 md:mb-16 px-2">
            <button @click="revealSurprise"
              class="group relative px-6 sm:px-10 md:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto animate-pulse-glow">
              <span class="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4 justify-center">
                <i :class="showSurprise ? 'fas fa-kiss-wink-heart' : 'fas fa-sparkles'
                  " class="animate-spin-slow text-base sm:text-lg md:text-xl"></i>
                <span class="whitespace-nowrap font-greeting">{{
                  showSurprise
                    ? "Послать тысячу поцелуев 💋"
                    : "Открыть подарок ✨"
                }}</span>
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </button>

            <p v-if="!showSurprise" class="text-gray-500 text-sm sm:text-base mt-4 sm:mt-6 font-reading">
              💡 Нажми на подарок сверху для сюрприза!
            </p>
          </div>

          <!-- Surprise Content -->
          <transition name="fade-slide">
            <div v-if="showSurprise" class="space-y-6 sm:space-y-8 md:space-y-12">
              <!-- Kids Gallery Integrated -->
              <FamilyPhotoCard />
              <!-- Kids Gallery Integrated -->
              <KidsGallery />
              <!-- Main Gift Section -->
              <div
                class="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 lg:p-14 border border-pink-200 shadow-xl hover:border-pink-300 transition-all duration-300">
                <div class="text-center mb-6 sm:mb-8 md:mb-12">
                  <a href="https://www.mindqlab.com" target="_blank"
                    class="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 animate-bounce-subtle">
                    <i class="fas fa-globe animate-spin-slow text-sm sm:text-base"></i>
                    <span>mindqlab.com</span>
                    <i class="fas fa-external-link-alt text-xs sm:text-sm"></i>
                  </a>
                  <h2
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 leading-tight px-2 font-greeting">
                    Твоя лаборатория осознанного развития
                  </h2>
                  <div
                    class="w-20 sm:w-24 md:w-28 h-1.5 sm:h-2 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full">
                  </div>
                </div>

                <div class="space-y-4 sm:space-y-6 md:space-y-8 text-gray-700">
                  <p
                    class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-center max-w-4xl mx-auto px-2 font-reading">
                    Моя любимая, этот домен — это твоё
                    <span
                      class="font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">стратегическое
                      пространство</span>
                    для создания платформы осознанного развития. Здесь ты
                    сможешь помогать людям проходить их путь к целостности,
                    объединяя древнюю мудрость и современные методики.
                  </p>

                  <!-- Concept Cards -->
                  <div
                    class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-12 mb-6 sm:mb-8 md:mb-12">
                    <div
                      class="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-200 text-center transform hover:scale-110 hover:bg-white transition-all duration-300 cursor-pointer hover:rotate-3 shadow-lg"
                      @mouseenter="createSparkles($event)">
                      <div
                        class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-float">
                        <i class="fas fa-brain text-xl sm:text-2xl md:text-3xl text-white"></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 font-greeting">
                        Mind
                      </h3>
                      <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                        Разум, мышление и сознание
                      </p>
                    </div>

                    <div
                      class="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-pink-200 text-center transform hover:scale-110 hover:bg-white transition-all duration-300 cursor-pointer hover:rotate-3 shadow-lg"
                      @mouseenter="createSparkles($event)">
                      <div
                        class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-float"
                        style="animation-delay: 0.2s">
                        <i class="fas fa-chart-line text-xl sm:text-2xl md:text-3xl text-white"></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 font-greeting">
                        Q
                      </h3>
                      <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                        Коэффициенты развития
                      </p>
                    </div>

                    <div
                      class="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200 text-center transform hover:scale-110 hover:bg-white transition-all duration-300 cursor-pointer hover:rotate-3 shadow-lg"
                      @mouseenter="createSparkles($event)">
                      <div
                        class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-float"
                        style="animation-delay: 0.4s">
                        <i class="fas fa-flask text-xl sm:text-2xl md:text-3xl text-white"></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 font-greeting">
                        Lab
                      </h3>
                      <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                        Лаборатория экспериментов
                      </p>
                    </div>
                  </div>

                  <!-- Platform Features -->
                  <div
                    class="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 border border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg">
                    <h4
                      class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 font-greeting">
                      <i class="fas fa-compass text-yellow-500 animate-spin-slow text-lg sm:text-xl md:text-2xl"></i>
                      <span>Твоя платформа личностного роста</span>
                    </h4>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div
                        class="bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-blue-300 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:-rotate-1">
                        <div class="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                          <i class="fas fa-book-open text-blue-500 text-base sm:text-xl md:text-2xl"></i>
                          <span class="font-bold text-gray-800 text-base sm:text-lg md:text-xl font-greeting">Курсы и
                            гайды</span>
                        </div>
                        <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                          Образовательные программы для осознанного развития
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-purple-100 to-purple-200 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-purple-300 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:rotate-1">
                        <div class="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                          <i class="fas fa-podcast text-purple-500 text-base sm:text-xl md:text-2xl"></i>
                          <span
                            class="font-bold text-gray-800 text-base sm:text-lg md:text-xl font-greeting">Подкасты</span>
                        </div>
                        <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                          Инсайты и советы по личностному росту
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-green-100 to-green-200 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-300 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:-rotate-1">
                        <div class="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                          <i class="fas fa-tools text-green-500 text-base sm:text-xl md:text-2xl"></i>
                          <span
                            class="font-bold text-gray-800 text-base sm:text-lg md:text-xl font-greeting">Инструменты
                            осознанности</span>
                        </div>
                        <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                          Эмоциональный компас, Колесо баланса и другие
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-pink-100 to-pink-200 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-pink-300 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:rotate-1">
                        <div class="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                          <i class="fas fa-users text-pink-500 text-base sm:text-xl md:text-2xl"></i>
                          <span
                            class="font-bold text-gray-800 text-base sm:text-lg md:text-xl font-greeting">Сообщество</span>
                        </div>
                        <p class="text-xs sm:text-sm md:text-base text-gray-600 font-reading">
                          Пространство для роста и поддержки
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Intelligence Types -->
                  <div
                    class="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 border border-orange-200">
                    <h4
                      class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 font-greeting">
                      <i class="fas fa-lightbulb text-yellow-500 text-lg sm:text-xl md:text-2xl"></i>
                      <span>Все виды интеллекта в одном месте</span>
                    </h4>

                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                      <div v-for="(intel, idx) in intelligenceTypes" :key="intel.code"
                        class="bg-gradient-to-br backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border transform hover:scale-110 transition-all duration-300 cursor-pointer shadow-md"
                        :class="intel.classes" :style="{ animationDelay: idx * 0.1 + 's' }">
                        <div class="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <i :class="intel.icon" class="text-base sm:text-lg md:text-xl"></i>
                          <span class="font-bold text-base sm:text-lg md:text-xl font-greeting"
                            :class="intel.textColor">{{ intel.code }}</span>
                        </div>
                        <p class="text-xs sm:text-sm text-gray-600 font-reading">
                          {{ intel.desc }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Vision Section -->
                  <div
                    class="bg-gradient-to-r from-pink-100 to-orange-100 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-l-4 border-blue-500 hover:border-l-8 transition-all duration-300 shadow-lg">
                    <h4
                      class="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 font-greeting">
                      <i class="fas fa-rocket text-orange-500 animate-bounce text-base sm:text-lg md:text-xl"></i>
                      <span>Твой путь к воплощению мечты</span>
                    </h4>
                    <div class="space-y-2 sm:space-y-3 md:space-y-4 text-gray-700">
                      <div v-for="(item, idx) in visionItems" :key="idx"
                        class="flex items-start gap-2 sm:gap-3 md:gap-4 hover:translate-x-2 transition-transform duration-300">
                        <i
                          class="fas fa-check-circle text-green-500 mt-0.5 sm:mt-1 flex-shrink-0 text-sm sm:text-base md:text-xl"></i>
                        <span class="text-sm sm:text-base md:text-lg font-reading">{{ item }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Closing Message -->
                  <div class="text-center py-4 sm:py-6 md:py-8">
                    <p
                      class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-500 to-purple-500 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 px-2 animate-gradient-x font-greeting">
                      MindQLab — это бесконечное пространство для твоего
                      творчества и помощи людям!
                    </p>
                    <div
                      class="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-pink-200 hover:border-pink-300 transition-all duration-300 hover:scale-105 shadow-lg">
                      <p class="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed italic font-reading">
                        <i class="fas fa-quote-left text-gray-400 mr-2 sm:mr-3"></i>
                        Я верю в тебя и знаю, что ты создашь нечто удивительное.
                        Наша семья — твоя самая надёжная поддержка. Наши дети
                        учатся у тебя каждый день, как расти и развиваться, как
                        быть сильной и мудрой.
                        <i class="fas fa-quote-right text-gray-400 ml-2 sm:ml-3"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Footer Message -->
        <div class="text-center mt-6 sm:mt-8 md:mt-12 px-4">
          <p class="text-gray-600 text-base sm:text-lg md:text-xl font-greeting">
            <i class="fas fa-heart text-red-500 animate-heartbeat"></i>
            С безграничной любовью, твоя семья
            <i class="fas fa-heart text-red-500 animate-heartbeat"></i>
          </p>
          <p class="text-gray-500 text-sm sm:text-base mt-2 sm:mt-3 font-reading">
            💡 Кликай везде для волшебства! ✨
          </p>
        </div>
      </div>
    </div>

    <!-- Kiss Effect Emojis -->
    <transition-group name="kiss">
      <div v-for="kiss in kisses" :key="'kiss-' + kiss.id"
        class="fixed pointer-events-none text-xl sm:text-2xl md:text-3xl lg:text-4xl z-50" :style="{
          left: kiss.x + 'px',
          top: kiss.y + 'px',
          transform: 'translate(-50%, -50%)',
        }">
        💋
      </div>
    </transition-group>

    <!-- Sparkles -->
    <transition-group name="sparkle">
      <div v-for="sparkle in sparkles" :key="'sparkle-' + sparkle.id"
        class="fixed pointer-events-none text-base sm:text-lg md:text-xl z-50" :style="{
          left: sparkle.x + 'px',
          top: sparkle.y + 'px',
          transform: 'translate(-50%, -50%)',
        }">
        ✨
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import KidsGallery from "@/components/KidsGallery.vue";
import FamilyPhotoCard from "~/components/FamilyPhotoCard.vue";
import confetti from "canvas-confetti";
import * as Tone from "tone";

definePageMeta({
  layout: "empty",
});

const showSurprise = ref(false);
const confettiTrigger = ref(null);
const kisses = ref([]);
const floatingBalloons = ref([]);
const sparkles = ref([]);
const clickCount = ref(0);
let kissIdCounter = 0;
let balloonIdCounter = 0;
let sparkleIdCounter = 0;
let revealInterval = null;

const intelligenceTypes = [
  {
    code: "IQ",
    desc: "Логическое мышление",
    icon: "fas fa-puzzle-piece text-blue-500",
    textColor: "text-blue-600",
    classes:
      "from-blue-100 to-blue-200 border-blue-300 hover:from-blue-200 hover:to-blue-300",
  },
  {
    code: "EQ",
    desc: "Эмоциональный интеллект",
    icon: "fas fa-heart text-green-500",
    textColor: "text-green-600",
    classes:
      "from-green-100 to-green-200 border-green-300 hover:from-green-200 hover:to-green-300",
  },
  {
    code: "AQ",
    desc: "Адаптивность",
    icon: "fas fa-sync text-red-500",
    textColor: "text-red-600",
    classes:
      "from-red-100 to-red-200 border-red-300 hover:from-red-200 hover:to-red-300",
  },
  {
    code: "CQ",
    desc: "Креативность",
    icon: "fas fa-palette text-yellow-500",
    textColor: "text-yellow-600",
    classes:
      "from-yellow-100 to-yellow-200 border-yellow-300 hover:from-yellow-200 hover:to-yellow-300",
  },
  {
    code: "SQ",
    desc: "Социальный интеллект",
    icon: "fas fa-users text-indigo-500",
    textColor: "text-indigo-600",
    classes:
      "from-indigo-100 to-indigo-200 border-indigo-300 hover:from-indigo-200 hover:to-indigo-300",
  },
  {
    code: "+ новые Q",
    desc: "Которые ты откроешь",
    icon: "fas fa-infinity text-pink-500",
    textColor: "text-pink-600",
    classes:
      "from-pink-100 to-pink-200 border-pink-300 hover:from-pink-200 hover:to-pink-300",
  },
];

const visionItems = [
  "Создавай трансформационные программы развития",
  "Делись своими знаниями через курсы и подкасты",
  "Создавай уникальные инструменты самопознания",
  "Строй сообщество осознанных людей",
  "Помогай людям находить их путь к целостности",
];

const revealSurprise = () => {
  playHappyBirthdayMelody();
  if (!showSurprise.value) {
    // Epic confetti celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    revealInterval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(revealInterval);
        revealInterval = null;
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#EC4899", "#F59E0B", "#3B82F6", "#10B981"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#EC4899", "#F59E0B", "#3B82F6", "#10B981"],
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
  // Occasionally spawn a balloon on mouse move
  if (Math.random() > 0.97) {
    const balloon = {
      id: balloonIdCounter++,
      x: e.clientX,
      y: e.clientY,
    };
    floatingBalloons.value.push(balloon);

    setTimeout(() => {
      const index = floatingBalloons.value.findIndex(
        (h) => h.id === balloon.id
      );
      if (index > -1) {
        floatingBalloons.value.splice(index, 1);
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
    colors: ["#EC4899", "#F59E0B", "#10B981"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#3B82F6", "#F59E0B", "#EC4899"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#10B981", "#EC4899", "#F59E0B"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ["#F59E0B", "#3B82F6", "#EC4899"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#EC4899", "#10B981", "#F59E0B"],
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

const playHappyBirthdayMelody = async () => {
  // Happy Birthday melody with notes and durations
  const melody = [
    { note: "G4", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "A4", duration: "4n" },
    { note: "G4", duration: "4n" },
    { note: "C5", duration: "4n" },
    { note: "B4", duration: "2n" },

    { note: "G4", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "A4", duration: "4n" },
    { note: "G4", duration: "4n" },
    { note: "D5", duration: "4n" },
    { note: "C5", duration: "2n" },

    { note: "G4", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "G5", duration: "4n" },
    { note: "E5", duration: "4n" },
    { note: "C5", duration: "4n" },
    { note: "B4", duration: "4n" },
    { note: "A4", duration: "2n" },

    { note: "F5", duration: "8n" },
    { note: "F5", duration: "8n" },
    { note: "E5", duration: "4n" },
    { note: "C5", duration: "4n" },
    { note: "D5", duration: "4n" },
    { note: "C5", duration: "2n" },
  ];

  const synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 0.8,
    },
    volume: -8,
  }).toDestination();

  const now = Tone.now();
  let time = 0;

  melody.forEach(({ note, duration }) => {
    synth.triggerAttackRelease(note, duration, now + time);
    time += Tone.Time(duration).toSeconds();
  });
};

const playSound = (type = "default") => {
  // For intelligence cards - keep simple pleasant tones
  const sounds = {
    IQ: { note: "C5", type: "sine" },
    EQ: { note: "E5", type: "triangle" },
    AQ: { note: "G5", type: "square" },
    CQ: { note: "A5", type: "sawtooth" },
    SQ: { note: "C6", type: "sine" },
    "+ новые Q": { note: "D6", type: "triangle" },
    default: { note: "D5", type: "sine" },
  };

  const soundConfig = sounds[type] || sounds.default;

  const synth = new Tone.Synth({
    oscillator: { type: soundConfig.type },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 0.5,
    },
    volume: -10,
  }).toDestination();

  synth.triggerAttackRelease(soundConfig.note, "8n");
};

// Cleanup on component unmount
onUnmounted(() => {
  if (revealInterval) {
    clearInterval(revealInterval);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap");

.font-birthday {
  font-family: "Dancing Script", cursive;
}

.font-greeting {
  font-family: "Dancing Script", cursive;
  font-weight: 600;
}

.font-reading {
  font-family: "Poppins", sans-serif;
}

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
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
  }

  50% {
    box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
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

.balloon-float-enter-active {
  transition: all 2s ease-out;
}

.balloon-float-leave-active {
  transition: all 0.5s ease-out;
}

.balloon-float-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.balloon-float-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(-80px) scale(1.2);
}

.balloon-float-leave-to {
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
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
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

/* .animate-slow-pulse {
  animation: slow-pulse 4s ease-in-out infinite;
} */

.animate-slow-drift {
  animation: slow-drift 8s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 6s ease-in-out infinite;
}
</style>
