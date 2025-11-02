<template>
  <div class="kids-gallery-section">
    <!-- Header with floating balloons -->
    <div class="relative mb-8 md:mb-12 lg:mb-16">
      <h2 class="section-title">
        <span class="title-text">С любовью от наших детей</span>
        <span class="inline-block ml-2 md:ml-3 animate-bounce">🎈</span>
      </h2>
      <p
        class="text-center text-gray-600 text-sm sm:text-base md:text-lg mt-2 md:mt-3 max-w-2xl mx-auto px-4 reading-font"
      >
        Нажми на карточку, чтобы прочитать послание и увидеть волшебство! ✨
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
              <div class="birthday-hat">🎓</div>
            </div>

            <!-- Name and Icon -->
            <div class="name-section">
              <i :class="[kid.icon, 'kid-icon', kid.theme.accent]"></i>
              <h3 class="kid-name">{{ kid.name }}</h3>
            </div>

            <!-- Tap prompt -->
            <div class="tap-prompt">
              <span class="tap-text">Открыть послание</span>
              <i
                class="fas fa-gift text-xs sm:text-sm"
                :class="kid.theme.accent"
              ></i>
            </div>

            <!-- Floating balloons -->
            <div class="balloons-container">
              <span
                v-for="n in 3"
                :key="n"
                class="balloon"
                :style="{ animationDelay: `${n * 0.6}s` }"
              >
                🎈
              </span>
            </div>
          </div>

          <!-- Back Side (Open) -->
          <div class="card-back">
            <div class="message-container">
              <!-- Close button -->
              <button class="close-button" @click.stop="closeCard(kid)">
                <i class="fas fa-times"></i>
              </button>

              <!-- Header -->
              <div class="message-header">
                <i
                  class="fas fa-heart text-base sm:text-lg"
                  :class="kid.theme.accent"
                ></i>
                <span class="message-title">Для мамы</span>
                <i
                  class="fas fa-heart text-base sm:text-lg"
                  :class="kid.theme.accent"
                ></i>
              </div>

              <!-- Message with typing effect -->
              <div class="message-content">
                <p class="message-text">
                  {{ kid.displayMessage }}
                  <span v-if="kid.isTyping" class="typing-cursor">|</span>
                </p>
              </div>

              <!-- Celebration button -->
              <div class="celebration-section">
                <button
                  @click.stop="celebrateForMom(kid)"
                  class="celebration-btn"
                  :class="kid.theme.gradient"
                >
                  <i
                    class="fas fa-sparkles mr-1 sm:mr-2 text-sm sm:text-base"
                  ></i>
                  <span class="text-sm sm:text-base md:text-lg"
                    >Устроить праздник для мамы!</span
                  >
                  <i class="fas fa-cake ml-1 sm:ml-2 text-sm sm:text-base"></i>
                </button>
              </div>

              <!-- Decorative bottom -->
              <div class="message-footer">
                <i
                  :class="[kid.icon, 'text-xl sm:text-2xl', kid.theme.accent]"
                ></i>
                <span class="text-gray-600 text-sm sm:text-base reading-font"
                  >— {{ kid.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Family Celebration Section -->
    <div class="family-celebration mt-8 md:mt-12 lg:mt-16">
      <div class="celebration-card">
        <div class="celebration-content">
          <i class="fas fa-home celebration-icon"></i>
          <h3 class="celebration-title">Вся семья вместе</h3>
          <p class="celebration-text reading-font">
            Нажмите, чтобы устроить большой семейный праздник с конфетти!
          </p>
          <button @click="familyCelebration" class="family-celebration-btn">
            <i class="fas fa-fireworks mr-1 sm:mr-2"></i>
            <span>Семейный праздник!</span>
            <i class="fas fa-heart ml-1 sm:ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import confetti from "canvas-confetti";

const kids = ref([
  {
    id: "amelie",
    name: "Амели",
    photo: "/amelie.png",
    message:
      "Мамочка, поздравляю тебя с днём рождения!! Я тебя очень ценю и благодарю за всё что ты для меня делаешь. Желаю тебе всего самого лучшего и здоровья, и всегда оставайся такой же доброй, красивой , молодой и весёлой❣️❣️",
    icon: "fas fa-crown",
    theme: {
      gradient: "bg-gradient-to-br from-pink-400 to-rose-500",
      glow: "bg-pink-200",
      accent: "text-pink-500",
      border: "border-pink-400",
      button: "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
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
      "Мама, ты мой супергерой! 🦸‍♂️ Спасибо, что учишь меня всему самому интересному и всегда поддерживаешь. Твои объятия самые крепкие, а улыбка самая добрая! Люблю тебя! 💙🚀",
    icon: "fas fa-rocket",
    theme: {
      gradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
      glow: "bg-blue-200",
      accent: "text-blue-500",
      border: "border-blue-400",
      button: "from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
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
      "Моя любимая мамочка! 🌟 Твои объятия самые тёплые, а смех самый заразительный! Спасибо, что растишь меня с такой любовью и терпением. Хочу быть таким же добрым и умным, как ты! 💚🌱",
    icon: "fas fa-leaf",
    theme: {
      gradient: "bg-gradient-to-br from-green-400 to-emerald-500",
      glow: "bg-green-200",
      accent: "text-green-500",
      border: "border-green-400",
      button:
        "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
    },
    isOpen: false,
    isTyping: false,
    displayMessage: "",
  },
]);

let typingTimeout = null;
let celebrationInterval = null;

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
    typingTimeout = null;
  }
  kid.isOpen = false;
  kid.isTyping = false;
  kid.displayMessage = "";
};

const typeMessage = (kid) => {
  kid.isTyping = true;
  kid.displayMessage = "";

  // Convert message to array of characters (properly handling emojis and multi-byte chars)
  const chars = Array.from(kid.message);
  let index = 0;

  const type = () => {
    if (index < chars.length) {
      kid.displayMessage += chars[index];
      index++;
      typingTimeout = setTimeout(type, 40);
    } else {
      kid.isTyping = false;
    }
  };

  type();
};

const celebrateForMom = (kid) => {
  // Kid-specific celebration
  const colors = {
    amelie: ["#EC4899", "#F472B6", "#FBCFE8"],
    nathaniel: ["#3B82F6", "#60A5FA", "#93C5FD"],
    adriel: ["#10B981", "#34D399", "#6EE7B7"],
  };

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors[kid.id],
    shapes: ["circle", "square"],
    zIndex: 100,
  });

  // Additional burst from sides
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors[kid.id],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors[kid.id],
    });
  }, 250);
};

const familyCelebration = () => {
  // Epic family celebration with multiple bursts
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ["#EC4899", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

  celebrationInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(celebrationInterval);
      celebrationInterval = null;
      return;
    }

    const particleCount = 30 * (timeLeft / duration);

    // Left side
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      shapes: ["circle", "square"],
    });

    // Right side
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      shapes: ["circle", "square"],
    });

    // Center
    confetti({
      particleCount: Math.floor(particleCount / 2),
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
    });
  }, 100);
};

// Cleanup on component unmount
onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  if (celebrationInterval) {
    clearInterval(celebrationInterval);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap");

/* Font classes */
.greeting-font {
  font-family: "Dancing Script", cursive;
  font-weight: 600;
}

.reading-font {
  font-family: "Poppins", sans-serif;
}

.kids-gallery-section {
  @apply relative py-6 sm:py-8 md:py-12 px-2 sm:px-4;
}

/* Header Styles */
.section-title {
  @apply text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 greeting-font px-2;
}

.title-text {
  @apply inline-block bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent;
  animation: gradient-flow 4s ease infinite;
  background-size: 200% auto;
}

/* Grid Layout */
.kids-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto px-2 sm:px-4;
}

.kid-card-wrapper {
  @apply opacity-0 animate-fade-in-up;
}

/* Card Base */
.kid-card {
  @apply relative cursor-pointer mx-auto w-full max-w-md;
  height: 400px;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

@media (min-width: 640px) {
  .kid-card {
    height: 440px;
  }
}

@media (min-width: 768px) {
  .kid-card {
    height: 480px;
  }
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
  @apply absolute inset-0 bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-white/80 p-4 sm:p-6 flex flex-col items-center justify-center;
  backface-visibility: hidden;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8);
}

.card-open .card-front {
  transform: rotateY(180deg);
  opacity: 0;
}

/* Photo Frame */
.photo-frame {
  @apply relative mb-4 sm:mb-6 md:mb-8;
}

.photo-glow {
  @apply absolute inset-0 rounded-full blur-xl opacity-40;
  transform: scale(1.1);
}

.kid-photo {
  @apply relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full object-cover shadow-2xl border-4 border-white;
  animation: float-gentle 3s ease-in-out infinite;
}

.photo-ring {
  @apply absolute inset-0 rounded-full border-4 border-dashed animate-spin-slow;
  animation: rotate-ring 12s linear infinite;
}

.birthday-hat {
  @apply absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl animate-bounce;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

/* Name Section */
.name-section {
  @apply flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6;
}

.kid-icon {
  @apply text-3xl sm:text-4xl md:text-5xl;
  animation: icon-bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.kid-name {
  @apply text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 greeting-font;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Tap Prompt */
.tap-prompt {
  @apply flex items-center gap-2 sm:gap-3 text-gray-600 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 bg-white/80 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg;
  backdrop-filter: blur(10px);
}

.tap-text {
  @apply text-xs sm:text-sm md:text-base;
}

/* Balloons */
.balloons-container {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
}

.balloon {
  @apply absolute text-xl sm:text-2xl opacity-0;
  animation: balloon-float 4s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.balloon:nth-child(1) {
  top: 5%;
  left: 10%;
  animation-delay: 0s;
}
.balloon:nth-child(2) {
  top: 15%;
  right: 15%;
  animation-delay: 1.3s;
}
.balloon:nth-child(3) {
  bottom: 20%;
  left: 20%;
  animation-delay: 2.6s;
}

/* Card Back */
.card-back {
  @apply absolute inset-0 bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-white/80 p-4 sm:p-6;
  backface-visibility: hidden;
  transform: rotateY(-180deg);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8);
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
  @apply absolute top-1 right-1 sm:top-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 text-lg sm:text-xl transition-all duration-300 bg-white/80 rounded-full shadow-lg hover:rotate-90 hover:scale-110;
  z-index: 10;
}

.message-header {
  @apply flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-0;
}

.message-title {
  @apply text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 greeting-font;
}

.message-content {
  @apply flex-1 flex items-center justify-center px-2 sm:px-4 overflow-y-auto;
}

.message-text {
  @apply text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed text-center reading-font;
  min-height: 100px;
}

.typing-cursor {
  @apply inline-block ml-1 animate-blink;
}

/* Celebration Section */
.celebration-section {
  @apply mt-4 sm:mt-6 mb-3 sm:mb-4;
}

.celebration-btn {
  @apply w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r text-white font-bold rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center greeting-font;
  backdrop-filter: blur(10px);
}

.message-footer {
  @apply flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200;
}

/* Family Celebration */
.family-celebration {
  @apply max-w-2xl mx-auto px-2 sm:px-4;
}

.celebration-card {
  @apply bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border-2 border-orange-200 shadow-2xl transform hover:scale-105 transition-all duration-300;
}

.celebration-content {
  @apply space-y-3 sm:space-y-4;
}

.celebration-icon {
  @apply text-4xl sm:text-5xl text-orange-500 mb-2 sm:mb-4 animate-bounce;
}

.celebration-title {
  @apply text-2xl sm:text-3xl font-bold text-gray-800 greeting-font;
}

.celebration-text {
  @apply text-base sm:text-lg text-gray-600 reading-font;
}

.family-celebration-btn {
  @apply mt-3 sm:mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 text-base sm:text-lg greeting-font inline-flex items-center justify-center;
}

/* Theme-specific styles */
.theme-amelie .card-front {
  background: linear-gradient(135deg, #fdf2f8, #fce7f3);
  border-color: #fbcfe8;
}

.theme-nathaniel .card-front {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-color: #bfdbfe;
}

.theme-adriel .card-front {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-color: #bbf7d0;
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
    transform: translateY(-12px) rotate(3deg);
  }
}

@keyframes icon-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes balloon-float {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scale(0.8);
  }
  20%,
  80% {
    opacity: 1;
    transform: translateY(-40px) scale(1.1);
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
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
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

.animate-bounce {
  animation: gentle-bounce 2s ease-in-out infinite;
}
</style>
