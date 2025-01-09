<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 p-6"
  >
    <!-- Glass-morphism container -->
    <div
      class="max-w-5xl mx-auto backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-8 text-white my-12"
    >
      <!-- Floating shapes background -->
      <div class="shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <!-- Header with animated gradient text -->
      <div class="text-center mb-16 relative">
        <h1
          class="text-3xl sm:text-5xl font-bold mb-6 gradient-text animate-gradient"
        >
          Самооценка: "ПУТЕШЕСТВИЕ В МИР СЕБЯ"
        </h1>
        <p class="text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
          Чувствуете, что иногда сомнения и страхи мешают вам двигаться вперед?
          <span class="block mt-2">
            Замечаете, что внутренний критик звучит слишком громко?
          </span>
        </p>
      </div>

      <!-- Content Sections -->
      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="backdrop-blur-md bg-white/20 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
        >
          <div class="flex items-center mb-6">
            <i
              :class="['fas', section.icon, 'text-3xl text-purple-300 mr-4']"
            ></i>
            <h2 class="text-2xl font-semibold gradient-text">
              {{ section.title }}
            </h2>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              class="flex items-start group"
            >
              <i
                class="fas fa-sparkles text-purple-300 mr-3 mt-1 group-hover:text-yellow-300 transition-colors"
              ></i>
              <span
                class="text-purple-100 group-hover:text-white transition-colors"
                >{{ item }}</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Download Section -->
      <div class="text-center mt-16">
        <button
          @click="downloadGuide"
          class="download-button group"
          :disabled="isDownloading"
        >
          <span v-if="!isDownloading" class="relative z-10">
            <i class="fas fa-download mr-2 group-hover:animate-bounce"></i>
            Скачать гайд "Самооценка" прямо сейчас!
          </span>
          <span v-else>Загрузка...</span>
        </button>

        <p class="text-purple-200 mt-6 text-lg animate-pulse">
          Начните путь к самопринятию и раскрытию своего истинного потенциала!
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
const sections = [
  {
    title: "Что вы найдете в гайде:",
    icon: "fa-gem",
    items: [
      "Упражнения для глубокого самоанализа, чтобы лучше понять свои чувства, ценности и желания.",
      "Методы выявления и трансформации убеждений, которые ограничивают вас в жизни.",
      "Практики для укрепления самоценности и формирования здорового отношения к себе.",
      "Рекомендации по самопринятию и улучшению внутреннего диалога.",
    ],
  },
  {
    title: "Что вы получите:",
    icon: "fa-gift",
    items: [
      "Осознание своей истинной ценности, независимо от чужих ожиданий.",
      "Инструменты для построения уверенности и гармонии с собой.",
      "Простые шаги, чтобы начать жить в соответствии со своими желаниями, а не чужими стандартами.",
    ],
  },
  {
    title: "Для кого этот гайд:",
    icon: "fa-users",
    items: [
      "Для тех, кто хочет повысить уверенность в себе и перестать зависеть от чужого мнения.",
      "Для тех, кто стремится разобраться с внутренними ограничениями и страхами.",
      "Для всех, кто готов принять себя такими, какие они есть, и двигаться к жизни своей мечты.",
    ],
  },
  {
    title: "Почему стоит скачать этот гайд?",
    icon: "fa-star",
    items: [
      "Он поможет вам начать глубокую трансформацию вашего внутреннего мира.",
      "Вы получите проверенные упражнения, которые реально работают.",
      "Это первый шаг на пути к осознанности, гармонии и уверенности.",
    ],
  },
];

const isDownloading = ref(false);

const downloadGuide = async () => {
  isDownloading.value = true;
  try {
    // Simulate a delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Trigger the download
    const link = document.createElement("a");
    link.href = "/downloads/selfAssessment.pdf"; // Path to your file
    link.download = "selfAsessment.pdf"; // Filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    isDownloading.value = false;
  }
};
</script>
<style scoped>
.shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 50%;
  animation: float 20s infinite linear;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -100px;
  animation-delay: -7s;
}

.shape-3 {
  width: 250px;
  height: 250px;
  bottom: -125px;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0% {
    transform: rotate(0deg) translate(0, 0);
  }
  100% {
    transform: rotate(360deg) translate(50px, 50px);
  }
}

.gradient-text {
  background: linear-gradient(-45deg, #fff, #e6e6ff, #fff, #ffe6f2);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.download-button {
  background: linear-gradient(-45deg, #7e22ce, #be185d);
  background-size: 200% 200%;
  padding: 1rem 3rem;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: gradient 15s ease infinite;
}

.download-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.download-button:hover::before {
  transform: translateX(100%);
}

.download-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}

/* Ensure FontAwesome icons are styled correctly */
.fas {
  display: inline-block;
  transition: all 0.3s ease;
}

/* Hover effects for list items */
li.group:hover .fas {
  transform: scale(1.2);
}
</style>
