<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
    <div class="container mx-auto max-w-4xl relative z-10 py-12 px-4 xl:px-0">
      <Breadcrumbs />
      


      <!-- Header -->
      <div class="mb-12 text-center px-4 animate-fade-in-up">
        <h1 class="text-4xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Понимание Модели Большой Пятерки
          </span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 font-medium mb-8 max-w-2xl mx-auto">
          Откройте для себя глубокое понимание личностных черт с помощью пятифакторной модели
        </p>
      </div>

      <!-- Introduction Card -->
      <ScrollGlowSection>
        <div
          class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-8 shadow-xl"
        >
          <div class="flex items-start mb-6">
            <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-4">
              <i class="fas fa-brain text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Теория Большой Пятерки</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                Модель Большой Пятерки (Открытость, Добросовестность, Экстраверсия,
                Доброжелательность, Нейротизм) представляет собой основу для
                изучения личности.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors"
            >
              <h3 class="text-slate-900 dark:text-white font-bold mb-2 flex items-center">
                <i class="fas fa-lightbulb text-amber-500 mr-2"></i>
                Универсальность
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Этот подход признан во всем мире как надежная методика оценки личности.
              </p>
            </div>
            <div
              class="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors"
            >
              <h3 class="text-slate-900 dark:text-white font-bold mb-2 flex items-center">
                <i class="fas fa-search text-indigo-500 mr-2"></i>
                Глубокий анализ
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Понимание этих факторов помогает определить сильные стороны и области для развития.
              </p>
            </div>
          </div>
        </div>
      </ScrollGlowSection>

      <!-- Big 5 Traits List -->
      <div class="space-y-6">
        <ScrollGlowSection v-for="(trait, index) in big5Traits" :key="index">
          <div
            class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group"
          >
            <div class="flex items-center mb-6">
              <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <i :class="[trait.icon, 'text-2xl text-blue-600 dark:text-blue-400']"></i>
              </div>
              <h2 class="ml-2 text-2xl font-bold text-slate-900 dark:text-white">
                {{ trait.name }}
              </h2>
            </div>

            <div class="space-y-6">
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {{ trait.description }}
              </p>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                    <i class="fas fa-chart-bar text-indigo-500 mr-2"></i>
                    Ключевые черты
                  </h3>
                  <div class="space-y-2">
                    <div
                      v-for="attribute in trait.attributes"
                      :key="attribute"
                      class="flex items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                    >
                      <div class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>
                      <span class="text-slate-700 dark:text-slate-300 text-sm">{{ attribute }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                    <i class="fas fa-arrow-trend-up text-blue-500 mr-2"></i>
                    Потенциал роста
                  </h3>
                  <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20">
                    <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {{ trait.growth }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollGlowSection>
      </div>
    </div>
  </div>
</template>

<script setup>
import ScrollGlowSection from "~/components/ui/ScrollGlowSection.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const big5Traits = ref([
  {
    name: "Открытость опыту",
    icon: "fas fa-lightbulb",
    description:
      "Открытость характеризует творческое мышление, любознательность и стремление к новым впечатлениям.",
    attributes: [
      "Креативность",
      "Воображение",
      "Любознательность",
      "Гибкость мышления",
    ],
    growth: "Развитие практических навыков и концентрации на текущих задачах.",
  },
  {
    name: "Добросовестность",
    icon: "fas fa-tasks",
    description:
      "Добросовестные люди организованы, ответственны и дисциплинированы, они стремятся к достижению целей.",
    attributes: [
      "Организованность",
      "Самодисциплина",
      "Надежность",
      "Целеустремленность",
    ],
    growth:
      "Умение находить баланс между работой и отдыхом, развитие гибкости.",
  },
  {
    name: "Экстраверсия",
    icon: "fas fa-users",
    description:
      "Экстраверсия отражает уровень социальной активности, энергичности и стремления к взаимодействию с другими.",
    attributes: [
      "Общительность",
      "Энергичность",
      "Ассертивность",
      "Позитивность",
    ],
    growth: "Развитие навыков слушания и умение наслаждаться уединением.",
  },
  {
    name: "Доброжелательность",
    icon: "fas fa-handshake",
    description:
      "Доброжелательность проявляется в доверии, альтруизме и готовности помогать другим.",
    attributes: ["Доброта", "Сочувствие", "Щедрость", "Доверие"],
    growth:
      "Развитие умения устанавливать личные границы и отстаивать свои интересы.",
  },
  {
    name: "Нейротизм",
    icon: "fas fa-heartbeat",
    description:
      "Нейротизм описывает склонность к эмоциональной нестабильности, тревожности и переменам настроения.",
    attributes: [
      "Эмоциональная чувствительность",
      "Тревожность",
      "Подверженность стрессу",
      "Частая смена настроения",
    ],
    growth:
      "Управление стрессом, развитие эмоциональной устойчивости и навыков саморегуляции.",
  },
]);
</script>

