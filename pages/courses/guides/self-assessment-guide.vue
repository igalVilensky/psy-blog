<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
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

    <div class="container mx-auto px-4 max-w-5xl relative z-10 pb-12 pt-12">
      <!-- Glass-morphism container -->
      <div
        class="backdrop-blur-lg bg-[#1A1F35]/40 rounded-3xl border border-[#0EA5E9]/20 shadow-2xl p-8 text-white my-12 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Header with animated gradient text -->
        <div class="text-center mb-16 relative">
          <h1
            class="text-3xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight"
          >
            Самооценка: "ПУТЕШЕСТВИЕ В МИР СЕБЯ"
          </h1>
          <p class="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Чувствуете, что иногда сомнения и страхи мешают вам двигаться
            вперед?
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
            class="backdrop-blur-md bg-[#1A1F35]/40 rounded-2xl border border-[#0EA5E9]/20 p-8 transform transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
          >
            <div class="flex items-center mb-6">
              <i
                :class="['fas', section.icon, 'text-3xl text-[#0EA5E9] mr-4']"
              ></i>
              <h2
                class="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]"
              >
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
                  class="fas fa-sparkles text-[#0EA5E9] mr-3 mt-1 group-hover:text-[#E879F9] transition-colors"
                ></i>
                <span
                  class="text-slate-300 group-hover:text-white transition-colors"
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
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
            :disabled="isDownloading"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
            >
              <i class="fas fa-download"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
            >
              <i class="fas fa-arrow-down mr-2"></i>
              Скачать гайд "Самооценка" прямо сейчас!
            </span>
            <span class="relative invisible"
              >Скачать гайд "Самооценка" прямо сейчас!</span
            >
          </button>

          <p class="text-slate-300 mt-6 text-lg animate-pulse">
            Начните путь к самопринятию и раскрытию своего истинного потенциала!
          </p>
        </div>
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
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1f35;
}

::-webkit-scrollbar-thumb {
  background: #0ea5e9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
</style>
