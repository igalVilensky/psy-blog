<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-4xl relative z-10 py-12 px-4 xl:px-0">
      <Breadcrumbs />
      <!-- Back Navigation -->
      <div>
        <NuxtLink
          to="/lab/experiments/big-5-model"
          class="inline-flex items-center text-blue-500 hover:text-green-500 transition-colors mb-8 group"
        >
          <i
            class="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform text-current"
          ></i>
          Вернуться
        </NuxtLink>
      </div>

      <!-- Header -->
      <div class="mb-12 text-center px-4">
        <h1
          class="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1C92FF] to-[#00FFC6]"
        >
          Понимание Модели Большой Пятерки
        </h1>
        <p class="text-xl text-slate-300 font-medium mb-8">
          Откройте для себя глубокое понимание личностных черт с помощью
          пятифакторной модели
        </p>
      </div>

      <!-- Introduction Card -->
      <ScrollGlowSection>
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border-2 border-[#1C92FF]/30 p-6 sm:p-8 mb-8"
        >
          <div class="flex items-start mb-6">
            <div class="p-2 bg-[#1C92FF]/10 rounded-lg mr-4">
              <i class="fas fa-brain text-[#00FFC6] text-xl"></i>
            </div>
            <p class="text-lg text-slate-300 font-medium">
              Теория Большой Пятерки
            </p>
          </div>

          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            Модель Большой Пятерки (Открытость, Добросовестность, Экстраверсия,
            Доброжелательность, Нейротизм) представляет собой основу для
            изучения личности.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              class="bg-[#1A1F35]/40 p-4 rounded-lg backdrop-blur-sm border-2 border-[#1C92FF]/30"
            >
              <h3 class="text-slate-300 font-medium mb-2">
                <i class="fas fa-lightbulb text-[#FFD700] mr-2"></i>
                Универсальность
              </h3>
              <p class="text-slate-400">
                Этот подход признан во всем мире как надежная методика оценки
                личности.
              </p>
            </div>
            <div
              class="bg-[#1A1F35]/40 p-4 rounded-lg backdrop-blur-sm border-2 border-[#1C92FF]/30"
            >
              <h3 class="text-slate-300 font-medium mb-2">
                <i class="fas fa-search text-[#FF6347] mr-2"></i>
                Глубокий анализ
              </h3>
              <p class="text-slate-400">
                Понимание этих факторов помогает определить сильные стороны и
                области для развития.
              </p>
            </div>
          </div>
        </div>
      </ScrollGlowSection>

      <!-- Big 5 Traits List -->
      <div class="space-y-6">
        <ScrollGlowSection v-for="(trait, index) in big5Traits" :key="index">
          <div
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border-2 border-[#1C92FF]/30 p-6 sm:p-8"
          >
            <div class="flex items-center mb-6">
              <div class="p-3 bg-[#1C92FF]/10 rounded-xl mr-4">
                <i :class="[trait.icon, 'text-2xl text-[#00FFC6]']"></i>
              </div>
              <h2 class="ml-4 text-2xl font-bold text-white/90">
                {{ trait.name }}
              </h2>
            </div>

            <div class="space-y-6">
              <p class="text-slate-300 leading-relaxed">
                {{ trait.description }}
              </p>

              <div>
                <h3 class="font-bold text-white/90 mb-3">
                  <i class="fas fa-chart-bar text-[#FF3D00] mr-2"></i>
                  Ключевые черты:
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="attribute in trait.attributes"
                    :key="attribute"
                    class="flex items-center p-3 rounded-lg bg-[#1C92FF]/10 border-2 border-[#1C92FF]/30"
                  >
                    <div class="w-2 h-2 bg-[#00FF88] rounded-full mr-3"></div>
                    <span class="text-slate-300">{{ attribute }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-bold text-white/90 mb-3">
                  <i class="fas fa-arrow-trend-up text-[#00FFC6] mr-2"></i>
                  Потенциал роста:
                </h3>
                <p class="text-slate-300 leading-relaxed">
                  {{ trait.growth }}
                </p>
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
