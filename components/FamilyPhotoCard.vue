<template>
  <div class="family-photo-section">
    <!-- Header -->
    <div class="relative mb-6 sm:mb-8 md:mb-12">
      <h2 class="section-title">
        <span class="title-text">От всего сердца</span>
        <span class="inline-block ml-2 md:ml-3 animate-pulse">💝</span>
      </h2>
      <p
        class="text-center text-gray-600 text-sm sm:text-base md:text-lg mt-2 md:mt-3 max-w-2xl mx-auto px-4 reading-font"
      >
        Нажми на фото, чтобы прочитать особое послание от меня 💌
      </p>
    </div>

    <!-- Family Card -->
    <div class="family-card-wrapper">
      <div
        class="family-card"
        :class="isOpen ? 'card-open' : 'card-closed'"
        @click="toggleCard"
      >
        <!-- Front Side (Photo) -->
        <div class="card-front">
          <!-- Decorative corner accents -->
          <div class="corner-accent top-left"></div>
          <div class="corner-accent top-right"></div>
          <div class="corner-accent bottom-left"></div>
          <div class="corner-accent bottom-right"></div>

          <!-- Photo Container -->
          <div class="photo-container">
            <div class="photo-glow"></div>
            <div class="photo-frame">
              <img src="/family.jpg" alt="Наша семья" class="family-photo" />
              <div class="photo-border"></div>
            </div>
          </div>

          <!-- Family Label -->
          <div class="family-label">
            <i
              class="fas fa-heart text-rose-500 animate-heartbeat text-base sm:text-lg"
            ></i>
            <span class="label-text">Наша прекрасная семья</span>
            <i
              class="fas fa-heart text-rose-500 animate-heartbeat text-base sm:text-lg"
            ></i>
          </div>

          <!-- Tap Prompt -->
          <div class="tap-prompt">
            <span class="tap-text">Нажми, чтобы прочитать послание</span>
            <i
              class="fas fa-envelope-open-text text-rose-500 text-sm sm:text-base"
            ></i>
          </div>

          <!-- Floating hearts -->
          <div class="hearts-container">
            <span
              v-for="n in 5"
              :key="'static-heart-' + n"
              class="floating-heart"
              :style="{ animationDelay: `${n * 0.8}s` }"
            >
              💕
            </span>
          </div>
        </div>

        <!-- Back Side (Message) -->
        <div class="card-back">
          <div class="message-container">
            <!-- Close button -->
            <button class="close-button" @click.stop="closeCard">
              <i class="fas fa-times"></i>
            </button>

            <!-- Header -->
            <div class="message-header">
              <i class="fas fa-heart text-rose-500 text-lg sm:text-xl"></i>
              <span class="message-title">От твоего любящего мужа</span>
              <i class="fas fa-heart text-rose-500 text-lg sm:text-xl"></i>
            </div>

            <!-- Message Content -->
            <div class="message-content">
              <p class="message-text">
                {{ displayMessage }}
                <span v-if="isTyping" class="typing-cursor">|</span>
              </p>
            </div>

            <!-- Celebration Button -->
            <div class="celebration-section">
              <button @click.stop="celebrateForWife" class="celebration-btn">
                <i class="fas fa-sparkles mr-2 text-sm sm:text-base"></i>
                <span class="text-sm sm:text-base md:text-lg">
                  Устроить романтический фейерверк!
                </span>
                <i class="fas fa-heart ml-2 text-sm sm:text-base"></i>
              </button>
            </div>

            <!-- Footer -->
            <div class="message-footer">
              <i class="fas fa-ring text-xl sm:text-2xl text-amber-500"></i>
              <span class="text-gray-600 text-sm sm:text-base reading-font">
                — Твой муж, навсегда и всегда
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic hearts on click -->
    <transition-group name="heart-float">
      <div
        v-for="heart in showHearts"
        :key="'heart-' + heart.id"
        class="dynamic-heart"
        :style="{
          left: heart.x + 'px',
          top: heart.y + 'px',
        }"
      >
        {{ heart.emoji }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import confetti from "canvas-confetti";

const isOpen = ref(false);
const displayMessage = ref("");
const isTyping = ref(false);
const showHearts = ref([]);

let typingTimeout = null;
let heartIdCounter = 0;

const fullMessage = `Моя дорогая Настя, любовь всей моей жизни! 💝

С каждым днём я влюбляюсь в тебя всё больше и больше. Ты — моё вдохновение, моя опора, моя лучшая половина. Спасибо за то, что ты подарила мне троих прекрасных детей и создала наш уютный дом, полный любви и тепла.

Ты — удивительная мама, заботливая жена и невероятная женщина. Твоя сила, мудрость и доброта вдохновляют меня каждый день. Я горжусь тобой и всем, что ты делаешь для нашей семьи.

MindQLab — это только начало твоего пути. Я верю в тебя и буду поддерживать все твои мечты. Пусть этот год принесёт тебе радость, успех и бесконечное счастье!

С безграничной любовью и восхищением, твой муж 💕✨`;

const toggleCard = () => {
  if (isOpen.value) {
    closeCard();
  } else {
    openCard();
  }
};

const openCard = async () => {
  isOpen.value = true;
  await new Promise((resolve) => setTimeout(resolve, 300));
  typeMessage();
};

const closeCard = () => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
  isOpen.value = false;
  isTyping.value = false;
  displayMessage.value = "";
};

const typeMessage = () => {
  isTyping.value = true;
  displayMessage.value = "";

  const chars = Array.from(fullMessage);
  let index = 0;

  const type = () => {
    if (index < chars.length) {
      displayMessage.value += chars[index];
      index++;
      typingTimeout = setTimeout(type, 30);
    } else {
      isTyping.value = false;
    }
  };

  type();
};

const celebrateForWife = () => {
  // Romantic celebration colors
  const colors = ["#EC4899", "#F472B6", "#FBCFE8", "#FDE68A", "#FCA5A5"];

  // Main burst
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ["circle", "square"],
    scalar: 1.2,
    zIndex: 100,
  });

  // Heart shapes burst
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors,
          shapes: ["circle"],
          scalar: 1.5,
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors,
          shapes: ["circle"],
          scalar: 1.5,
        });
      }, i * 200);
    }
  }, 300);

  // Create floating hearts
  createFloatingHearts();
};

const createFloatingHearts = () => {
  const heartEmojis = ["💝", "💕", "💖", "💗", "💓", "💞"];

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = {
        id: heartIdCounter++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      };
      showHearts.value.push(heart);

      setTimeout(() => {
        const index = showHearts.value.findIndex((h) => h.id === heart.id);
        if (index > -1) {
          showHearts.value.splice(index, 1);
        }
      }, 3000);
    }, i * 100);
  }
};

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap");

.greeting-font {
  font-family: "Dancing Script", cursive;
  font-weight: 600;
}

.reading-font {
  font-family: "Poppins", sans-serif;
}

.family-photo-section {
  @apply relative py-6 sm:py-8 md:py-12 px-2 sm:px-4;
}

/* Header */
.section-title {
  @apply text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 greeting-font px-2;
}

.title-text {
  @apply inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent;
  animation: gradient-flow 4s ease infinite;
  background-size: 200% auto;
}

/* Card Wrapper */
.family-card-wrapper {
  @apply max-w-4xl mx-auto px-2 sm:px-4 opacity-0 animate-fade-in-up;
  animation-delay: 0.3s;
}

/* Card Base */
.family-card {
  @apply relative cursor-pointer mx-auto;
  height: 500px;
  perspective: 1500px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

@media (min-width: 640px) {
  .family-card {
    height: 550px;
  }
}

@media (min-width: 768px) {
  .family-card {
    height: 600px;
  }
}

@media (min-width: 1024px) {
  .family-card {
    height: 650px;
  }
}

.family-card:hover {
  @apply scale-[1.02];
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-closed:hover {
  animation: gentle-sway 1s ease-in-out;
}

/* Card Front */
.card-front {
  @apply absolute inset-0 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center;
  background: linear-gradient(135deg, #fff5f7, #ffe4e6, #fef3c7, #fce7f3);
  border: 3px solid rgba(255, 255, 255, 0.9);
  backface-visibility: hidden;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 30px 80px rgba(236, 72, 153, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.9), inset 0 0 100px rgba(255, 255, 255, 0.3);
}

.card-open .card-front {
  transform: rotateY(180deg);
  opacity: 0;
}

/* Corner Accents */
.corner-accent {
  @apply absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12;
  background: linear-gradient(135deg, #ec4899, #f472b6);
  opacity: 0.6;
  animation: pulse-accent 2s ease-in-out infinite;
}

.top-left {
  @apply top-4 left-4 rounded-br-2xl;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

.top-right {
  @apply top-4 right-4 rounded-bl-2xl;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
}

.bottom-left {
  @apply bottom-4 left-4 rounded-tr-2xl;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
}

.bottom-right {
  @apply bottom-4 right-4 rounded-tl-2xl;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

/* Photo Container */
.photo-container {
  @apply relative mb-6 sm:mb-8 md:mb-10 w-full;
}

.photo-glow {
  @apply absolute inset-0 rounded-2xl blur-2xl opacity-40;
  background: linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6);
  animation: glow-pulse 3s ease-in-out infinite;
}

.photo-frame {
  @apply relative mx-auto;
  max-width: 600px;
  width: 100%;
  animation: float-gentle 4s ease-in-out infinite;
}

.family-photo {
  @apply relative w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-white;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

@media (min-width: 640px) {
  .family-photo {
    border-width: 6px;
  }
}

.photo-border {
  @apply absolute inset-0 rounded-2xl sm:rounded-3xl border-4 border-dashed pointer-events-none;
  border-color: rgba(236, 72, 153, 0.3);
  animation: rotate-border 15s linear infinite;
}

/* Family Label */
.family-label {
  @apply flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white/90 rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-xl backdrop-blur-md;
}

.label-text {
  @apply text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 greeting-font;
}

/* Tap Prompt */
.tap-prompt {
  @apply flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base md:text-lg bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg backdrop-blur-md;
  animation: gentle-bounce 2s ease-in-out infinite;
}

/* Floating Hearts */
.hearts-container {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
}

.floating-heart {
  @apply absolute text-2xl sm:text-3xl opacity-0;
  animation: heart-float 5s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3));
}

.floating-heart:nth-child(1) {
  top: 10%;
  left: 5%;
}
.floating-heart:nth-child(2) {
  top: 20%;
  right: 10%;
  animation-delay: 1s;
}
.floating-heart:nth-child(3) {
  top: 70%;
  left: 15%;
  animation-delay: 2s;
}
.floating-heart:nth-child(4) {
  bottom: 15%;
  right: 20%;
  animation-delay: 3s;
}
.floating-heart:nth-child(5) {
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

/* Card Back */
.card-back {
  @apply absolute inset-0 bg-white/95 backdrop-blur-lg rounded-3xl border-2 border-white/90 p-6 sm:p-8 md:p-10;
  backface-visibility: hidden;
  transform: rotateY(-180deg);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 30px 80px rgba(236, 72, 153, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.9);
  background: linear-gradient(135deg, #fff5f7, #ffe4e6, #fef3c7);
}

.card-open .card-back {
  transform: rotateY(0deg);
  opacity: 1;
}

/* Message Container */
.message-container {
  @apply relative h-full flex flex-col;
}

.close-button {
  @apply absolute top-0 right-0 sm:top-2 sm:right-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-500 hover:text-gray-700 text-xl sm:text-2xl transition-all duration-300 bg-white/80 rounded-full shadow-lg hover:rotate-90 hover:scale-110;
  z-index: 10;
}

.message-header {
  @apply flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 mt-4 sm:mt-0;
}

.message-title {
  @apply text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 greeting-font;
}

.message-content {
  @apply flex-1 flex items-center justify-center px-2 sm:px-4 overflow-y-auto;
}

.message-text {
  @apply text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed reading-font;
  white-space: pre-line;
}

.typing-cursor {
  @apply inline-block ml-1 animate-blink;
}

/* Celebration Section */
.celebration-section {
  @apply mt-6 sm:mt-8 mb-4 sm:mb-6;
}

.celebration-btn {
  @apply w-full py-4 sm:py-5 px-6 sm:px-8 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center greeting-font;
}

.message-footer {
  @apply flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200;
}

/* Dynamic Hearts */
.dynamic-heart {
  @apply fixed pointer-events-none text-3xl sm:text-4xl z-50;
  transform: translate(-50%, -50%);
}

.heart-float-enter-active {
  transition: all 3s cubic-bezier(0.4, 0, 0.2, 1);
}

.heart-float-leave-active {
  transition: all 1s ease-out;
}

.heart-float-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(-45deg);
}

.heart-float-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(-100px) scale(1.5) rotate(0deg);
}

.heart-float-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(-200px) scale(0) rotate(45deg);
}

/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient-flow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gentle-sway {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.02) rotate(0.5deg);
  }
  75% {
    transform: scale(1.02) rotate(-0.5deg);
  }
}

@keyframes pulse-accent {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

@keyframes float-gentle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes rotate-border {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes heart-float {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scale(0.8) rotate(0deg);
  }
  15%,
  85% {
    opacity: 1;
  }
  50% {
    transform: translateY(-50px) scale(1.2) rotate(180deg);
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
    transform: scale(0.95);
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Utility Classes */
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

.animate-heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
