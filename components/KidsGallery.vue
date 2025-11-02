<template>
  <div class="kids-section">
    <!-- Header with floating hearts -->
    <div class="relative mb-12 md:mb-16">
      <h2 class="section-title">
        <span class="title-text">С любовью от наших детей</span>
        <span class="inline-block ml-2 animate-pulse">💕</span>
      </h2>
      <p
        class="text-center text-white/70 text-sm md:text-base mt-2 max-w-2xl mx-auto px-4"
      >
        Нажми на карточку, чтобы прочитать послание
      </p>
    </div>

    <!-- Kids Cards Grid -->
    <div class="kids-grid">
      <div
        v-for="(kid, index) in kids"
        :key="kid.id"
        class="kid-card-wrapper"
        :style="{ animationDelay: `${index * 0.15}s` }"
      >
        <!-- Card Container -->
        <div
          class="kid-card"
          :class="[kid.isOpen ? 'card-open' : 'card-closed', `theme-${kid.id}`]"
          @click="toggleCard(kid)"
        >
          <!-- Front Side (Closed) -->
          <div class="card-front">
            <!-- Photo with decorative frame -->
            <div class="photo-frame">
              <div class="photo-glow" :class="kid.theme.glow"></div>
              <img :src="kid.photo" :alt="kid.name" class="kid-photo" />
              <div class="photo-ring" :class="kid.theme.border"></div>
            </div>

            <!-- Name and Icon -->
            <div class="name-section">
              <i :class="[kid.icon, 'kid-icon', kid.theme.accent]"></i>
              <h3 class="kid-name">{{ kid.name }}</h3>
            </div>

            <!-- Tap prompt -->
            <div class="tap-prompt">
              <span class="tap-text">Открыть послание</span>
              <i class="fas fa-heart text-sm animate-pulse"></i>
            </div>

            <!-- Floating sparkles -->
            <div class="sparkles-container">
              <span
                v-for="n in 5"
                :key="n"
                class="sparkle"
                :style="{ animationDelay: `${n * 0.4}s` }"
              >
                ✨
              </span>
            </div>
          </div>

          <!-- Back Side (Open) -->
          <div class="card-back">
            <div class="message-container">
              <!-- Close button -->
              <button class="close-button" @click.stop="closeCard(kid)">
                ×
              </button>

              <!-- Header -->
              <div class="message-header">
                <i class="fas fa-heart" :class="kid.theme.accent"></i>
                <span class="message-title">Для мамы</span>
                <i class="fas fa-heart" :class="kid.theme.accent"></i>
              </div>

              <!-- Message with typing effect -->
              <div class="message-content">
                <p class="message-text">
                  {{ kid.displayMessage }}
                  <span v-if="kid.isTyping" class="typing-cursor">|</span>
                </p>
              </div>

              <!-- Decorative bottom -->
              <div class="message-footer">
                <i :class="[kid.icon, 'text-2xl', kid.theme.accent]"></i>
                <span class="text-white/60 text-sm">— {{ kid.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const kids = ref([
  {
    id: "amelie",
    name: "Амели",
    photo: "/amelie.png",
    message:
      "Мамочка, ты самая красивая принцесса! Спасибо за все сказки и объятия. Люблю тебя больше всех на свете! 👑💖",
    icon: "fas fa-crown",
    theme: {
      gradient: "from-pink-400 to-rose-500",
      glow: "shadow-pink-500/50",
      accent: "text-pink-400",
      border: "border-pink-400/50",
    },
    isOpen: false,
    isTyping: false,
    displayMessage: "",
  },
  {
    id: "nathaniel",
    name: "Натаниэль",
    photo: "/nathaniel1.jpeg",
    message:
      "Мама, ты мой супергерой! Спасибо, что учишь меня всему самому интересному. Обнимаю крепко-крепко! 🦸‍♂️💙",
    icon: "fas fa-rocket",
    theme: {
      gradient: "from-blue-400 to-cyan-500",
      glow: "shadow-blue-500/50",
      accent: "text-blue-400",
      border: "border-blue-400/50",
    },
    isOpen: false,
    isTyping: false,
    displayMessage: "",
  },
  {
    id: "adriel",
    name: "Адриэль",
    photo: "/adriel.jpeg",
    message:
      "Моя любимая мамочка! Твои объятия самые тёплые, а улыбка самая красивая. Расти, как я - с любовью! 🌱💚",
    icon: "fas fa-leaf",
    theme: {
      gradient: "from-green-400 to-emerald-500",
      glow: "shadow-green-500/50",
      accent: "text-green-400",
      border: "border-green-400/50",
    },
    isOpen: false,
    isTyping: false,
    displayMessage: "",
  },
]);

let typingTimeout = null;

const toggleCard = (kid) => {
  if (kid.isOpen) {
    closeCard(kid);
  } else {
    // Close other cards
    kids.value.forEach((k) => {
      if (k.id !== kid.id && k.isOpen) {
        closeCard(k);
      }
    });
    openCard(kid);
  }
};

const openCard = async (kid) => {
  kid.isOpen = true;
  await new Promise((resolve) => setTimeout(resolve, 300));
  typeMessage(kid);
};

const closeCard = (kid) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  kid.isOpen = false;
  kid.isTyping = false;
  kid.displayMessage = "";
};

const typeMessage = (kid) => {
  kid.isTyping = true;
  kid.displayMessage = "";
  let index = 0;

  const type = () => {
    if (index < kid.message.length) {
      kid.displayMessage += kid.message[index];
      index++;
      typingTimeout = setTimeout(type, 30);
    } else {
      kid.isTyping = false;
    }
  };

  type();
};
</script>

<style scoped>
.kids-section {
  @apply relative py-8 md:py-12;
}

/* Header Styles */
.section-title {
  @apply text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4;
}

.title-text {
  @apply inline-block bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent;
  animation: gradient-flow 4s ease infinite;
  background-size: 200% auto;
}

/* Grid Layout */
.kids-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4;
}

.kid-card-wrapper {
  @apply opacity-0 animate-fade-in-up;
}

/* Card Base */
.kid-card {
  @apply relative h-96 md:h-[26rem] cursor-pointer;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.kid-card:hover {
  @apply scale-105;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-closed:hover {
  animation: gentle-bounce 0.6s ease;
}

/* Card Front */
.card-front {
  @apply absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 flex flex-col items-center justify-center;
  backface-visibility: hidden;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card-open .card-front {
  transform: rotateY(180deg);
  opacity: 0;
}

/* Photo Frame */
.photo-frame {
  @apply relative mb-6;
}

.photo-glow {
  @apply absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse;
}

.kid-photo {
  @apply relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl;
  animation: float-gentle 3s ease-in-out infinite;
}

.photo-ring {
  @apply absolute inset-0 rounded-full border-4 animate-spin-slow;
  animation: rotate-ring 8s linear infinite;
}

/* Name Section */
.name-section {
  @apply flex flex-col items-center gap-2 mb-4;
}

.kid-icon {
  @apply text-3xl md:text-4xl;
  animation: icon-bounce 2s ease-in-out infinite;
}

.kid-name {
  @apply text-2xl md:text-3xl font-bold text-white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Tap Prompt */
.tap-prompt {
  @apply flex items-center gap-2 text-white/70 text-sm mt-4;
  animation: fade-pulse 2s ease-in-out infinite;
}

/* Sparkles */
.sparkles-container {
  @apply absolute inset-0 pointer-events-none;
}

.sparkle {
  @apply absolute text-xl opacity-0;
  animation: sparkle-float 3s ease-in-out infinite;
}

.sparkle:nth-child(1) {
  top: 10%;
  left: 10%;
}
.sparkle:nth-child(2) {
  top: 20%;
  right: 15%;
}
.sparkle:nth-child(3) {
  bottom: 20%;
  left: 15%;
}
.sparkle:nth-child(4) {
  bottom: 15%;
  right: 10%;
}
.sparkle:nth-child(5) {
  top: 50%;
  left: 5%;
}

/* Card Back */
.card-back {
  @apply absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6;
  backface-visibility: hidden;
  transform: rotateY(-180deg);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
  @apply absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white text-2xl font-light hover:rotate-90 transition-transform duration-300;
}

.message-header {
  @apply flex items-center justify-center gap-2 mb-6;
}

.message-title {
  @apply text-xl md:text-2xl font-semibold text-white;
}

.message-content {
  @apply flex-1 flex items-center justify-center px-2 md:px-4;
}

.message-text {
  @apply text-white/90 text-sm md:text-base leading-relaxed text-center;
}

.typing-cursor {
  @apply inline-block ml-1 animate-blink;
}

.message-footer {
  @apply flex items-center justify-center gap-2 mt-6;
}

/* Theme-specific gradients */
.theme-amelie .card-front {
  background: linear-gradient(
    135deg,
    rgba(236, 72, 153, 0.1),
    rgba(219, 39, 119, 0.05)
  );
}

.theme-nathaniel .card-front {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(6, 182, 212, 0.05)
  );
}

.theme-adriel .card-front {
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.1),
    rgba(16, 185, 129, 0.05)
  );
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

@keyframes float-gentle {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

@keyframes icon-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes sparkle-float {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }
}

@keyframes rotate-ring {
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
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  75% {
    transform: scale(0.98);
  }
}

@keyframes fade-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
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

@keyframes gradient-flow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .kid-card {
    @apply h-80;
  }

  .kids-grid {
    @apply gap-6;
  }
}

/* Utility animations */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-spin-slow {
  animation: rotate-ring 3s linear infinite;
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
