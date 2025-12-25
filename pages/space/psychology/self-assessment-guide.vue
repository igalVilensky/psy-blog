<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <div class="mt-8 max-w-5xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16 relative">
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -z-10">
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Самооценка: <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">"ПУТЕШЕСТВИЕ В МИР
              СЕБЯ"</span>
          </h1>

          <p class="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Чувствуете, что иногда сомнения и страхи мешают вам двигаться вперед?
            <span class="block mt-2 text-cyan-600 dark:text-cyan-400 font-medium">
              Замечаете, что внутренний критик звучит слишком громко?
            </span>
          </p>
        </div>

        <!-- Content Sections -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div v-for="(section, index) in sections" :key="index"
            class="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mr-4 text-cyan-600 dark:text-cyan-400 text-xl">
                <i :class="['fas', section.icon]"></i>
              </div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                {{ section.title }}
              </h2>
            </div>
            <ul class="space-y-4">
              <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="flex items-start group">
                <i class="fas fa-check text-cyan-500 mt-1 mr-3 text-sm"></i>
                <span
                  class="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {{ item }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Download Section -->
        <div class="text-center bg-slate-900 rounded-3xl p-12 relative overflow-hidden">
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2">
          </div>
          <div
            class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2">
          </div>

          <div class="relative z-10">
            <button @click="downloadGuide"
              class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-white transition-all duration-300 ease-out rounded-xl group bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
              :disabled="isDownloading">
              <span v-if="!isDownloading" class="flex items-center gap-3 text-lg">
                <i class="fas fa-download"></i>
                Скачать сейчас!
              </span>
              <span v-else class="flex items-center gap-3 text-lg">
                <i class="fas fa-spinner fa-spin"></i>
                Загрузка...
              </span>
            </button>

            <p class="text-slate-300 mt-8 text-lg font-medium">
              Начните путь к самопринятию и раскрытию своего истинного потенциала!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "laboratory",
});
import { ref } from "vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

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

