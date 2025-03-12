<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-6xl px-4 sm:px-0 py-8 sm:py-12">
      <!-- Hero Section -->
      <section class="mb-12 sm:mb-16">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
            Раскройте Свою Уникальную Историю
          </h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Познайте себя глубже через современный подход к самопознанию и
            найдите свой путь к гармоничной жизни.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              to="/awareness-tools/life-purpose-archetype/assessment"
              text="Пройти тест"
              iconClass="fas fa-play"
              gradientStart="#EC4899"
              gradientEnd="#A855F7"
              textColor="#FFFFFF"
              customClass="px-8 py-3 hover:opacity-90 border-[#EC4899]/20 shadow-lg hover:shadow-xl transition-all"
              :translateClass="'-translate-x-[101%]'"
            />
            <Button
              to="/awareness-tools/life-purpose-archetype/explanation"
              text="Подробнее"
              iconClass="fas fa-info-circle"
              gradientStart="#FFFFFF10"
              gradientEnd="#FFFFFF10"
              textColor="#FFFFFF"
              customClass="px-8 py-3 hover:bg-white/20 border-[#FFFFFF10]/20 shadow-md hover:shadow-lg transition-all"
            />
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="grid sm:grid-cols-2 gap-8 mb-12 sm:mb-16">
        <div
          class="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          <h2 class="text-xl font-semibold text-white mb-4">
            Персональный путь
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-blue-start text-lg">✦</span>
              <span class="text-slate-300">
                Откройте свои скрытые таланты и истинные желания
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-orange-start text-lg">✦</span>
              <span class="text-slate-300">
                Найдите баланс между карьерой и личной жизнью
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-purple-start text-lg">✦</span>
              <span class="text-slate-300">
                Создайте жизнь, которая отражает ваши ценности
              </span>
            </li>
          </ul>
        </div>

        <div
          class="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          <h2 class="text-xl font-semibold text-white mb-4">
            Профессиональный рост
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-blue-end text-lg">✦</span>
              <span class="text-slate-300">
                Определите свой идеальный карьерный путь
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-orange-end text-lg">✦</span>
              <span class="text-slate-300">
                Развивайте уверенность в принятии решений
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-purple-end text-lg">✦</span>
              <span class="text-slate-300">
                Создайте стратегию личностного роста
              </span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Process Section -->
      <section class="bg-white/5 rounded-xl p-8 border border-white/10">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          Как это работает
        </h2>
        <div class="grid sm:grid-cols-3 gap-6 sm:gap-8">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
              >
                <span class="text-white font-medium">1</span>
              </div>
              <h3 class="text-lg font-semibold text-white">Познание себя</h3>
            </div>
            <p class="text-slate-300 text-sm">
              Пройдите увлекательный тест, раскрывающий ваши уникальные черты.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
              >
                <span class="text-white font-medium">2</span>
              </div>
              <h3 class="text-lg font-semibold text-white">Глубокий анализ</h3>
            </div>
            <p class="text-slate-300 text-sm">
              Получите персональный отчет о вашем архетипе и потенциале.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
              >
                <span class="text-white font-medium">3</span>
              </div>
              <h3 class="text-lg font-semibold text-white">Путь вперед</h3>
            </div>
            <p class="text-slate-300 text-sm">
              Следуйте практическим рекомендациям для достижения целей.
            </p>
          </div>
        </div>
      </section>
      <!-- New AI Typing Box -->
      <div v-if="showBox" class="ai-typing-box">
        <button
          @click="closeBox"
          class="close-button"
          aria-label="Close typing box"
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="typing-container">
          <span v-if="isThinking" class="thinking-dots">...</span>
          <span v-else class="typed-text">{{ displayedText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from "~/components/base/Button.vue";
import { ref, onMounted } from "vue";

const showBox = ref(false);
const isThinking = ref(true);
const fullText = ref(
  "Ваш архетип — это ключ к пониманию вашей истинной природы. \n\n" +
    "📖 Этот тест поможет вам: \n" +
    "✅ Раскрыть сильные стороны и внутренние ресурсы \n" +
    "✅ Понять, какие сферы жизни и карьеры вам подходят \n" +
    "✅ Узнать, какие модели поведения помогают или мешают вам \n\n" +
    "Пройдите тест и получите персональный анализ вашего жизненного пути."
);

const displayedText = ref("");
const typingSpeed = 30;

onMounted(() => {
  setTimeout(() => {
    showBox.value = true;
    setTimeout(() => {
      isThinking.value = false;
      typeText();
    }, 1500);
  }, 3000);
});

const typeText = () => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < fullText.value.length) {
      displayedText.value = fullText.value.slice(0, index + 1);
      index++;
    } else {
      clearInterval(interval);
    }
  }, typingSpeed);
};

// Close box function
const closeBox = () => {
  showBox.value = false;
};
</script>

<style scoped>
.ai-typing-box {
  position: fixed;
  bottom: 10rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 60;
  @media (min-width: 640px) {
    top: 5rem;
    left: 2rem;
    transform: none;
    width: 400px;
    max-height: 28rem;
  }
}

.typing-container {
  font-size: 1.125rem;
  color: #ffffff;
  font-family: inherit;
}

.thinking-dots {
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dots 1.5s infinite;
}

.typed-text {
  white-space: pre-wrap;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-button:hover {
  opacity: 1;
}

@keyframes dots {
  0% {
    content: ".";
  }
  33% {
    content: "..";
  }
  66% {
    content: "...";
  }
  100% {
    content: ".";
  }
}

.thinking-dots::after {
  content: "...";
  animation: dots 1.5s infinite;
}
</style>
