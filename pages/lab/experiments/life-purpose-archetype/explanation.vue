<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-4xl relative z-10 py-12 px-4 xl:px-0">
      <!-- Back Navigation -->
      <div>
        <NuxtLink
          to="/lab/experiments/life-purpose-archetype"
          class="inline-flex items-center text-pink-500 hover:text-purple-500 transition-colors mb-8 group"
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
          class="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3A1CFF] to-[#00E6FF]"
        >
          Понимание 12 Архетипов
        </h1>
        <p class="text-xl text-slate-300 font-medium mb-8">
          Откройте для себя глубокий смысл и характеристики архетипических
          образов Юнга
        </p>
      </div>

      <!-- Introduction Card -->
      <ScrollGlowSection>
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border-2 border-[#3A1CFF]/30 p-6 sm:p-8 mb-8"
        >
          <div class="flex items-start mb-6">
            <div class="p-2 bg-[#3A1CFF]/10 rounded-lg mr-4">
              <i class="fas fa-book text-[#00E6FF] text-xl"></i>
            </div>
            <p class="text-lg text-slate-300 font-medium">Теория архетипов</p>
          </div>

          <p class="text-slate-300 leading-relaxed text-lg mb-6">
            12 архетипов Карла Юнга представляют собой основные человеческие
            переживания и мотивации, которые находят отклик в различных
            культурах.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              class="bg-[#1A1F35]/40 p-4 rounded-lg backdrop-blur-sm border-2 border-[#3A1CFF]/30"
            >
              <h3 class="text-slate-300 font-medium mb-2">
                <i class="fas fa-crown text-[#F59E0B] mr-2"></i>
                Уникальность
              </h3>
              <p class="text-slate-400">
                Каждый архетип воплощает уникальные черты, сильные стороны и
                возможные области для развития.
              </p>
            </div>
            <div
              class="bg-[#1A1F35]/40 p-4 rounded-lg backdrop-blur-sm border-2 border-[#3A1CFF]/30"
            >
              <h3 class="text-slate-300 font-medium mb-2">
                <i class="fas fa-star text-[#B44CFF] mr-2"></i>
                Самопознание
              </h3>
              <p class="text-slate-400">
                Осознание своего доминирующего архетипа может дать ценные
                инсайты о ваших естественных склонностях и жизненном
                предназначении.
              </p>
            </div>
          </div>
        </div>
      </ScrollGlowSection>

      <!-- Archetypes List -->
      <div class="space-y-6">
        <ScrollGlowSection
          v-for="(archetype, index) in archetypes"
          :key="index"
        >
          <div
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border-2 border-[#3A1CFF]/30 p-6 sm:p-8"
          >
            <div class="flex items-center mb-6">
              <div class="p-3 bg-[#3A1CFF]/10 rounded-xl mr-4">
                <i :class="[archetype.icon, 'text-2xl text-[#00E6FF]']"></i>
              </div>
              <h2 class="ml-4 text-2xl font-bold text-white/90">
                {{ archetype.name }}
              </h2>
            </div>

            <div class="space-y-6">
              <p class="text-slate-300 leading-relaxed">
                {{ archetype.description }}
              </p>

              <div>
                <h3 class="font-bold text-white/90 mb-3">
                  <i class="fas fa-chart-bar text-[#FF3D00] mr-2"></i>
                  Ключевые характеристики:
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="trait in archetype.traits"
                    :key="trait"
                    class="flex items-center p-3 rounded-lg bg-[#3A1CFF]/10 border-2 border-[#3A1CFF]/30"
                  >
                    <div class="w-2 h-2 bg-[#00FF88] rounded-full mr-3"></div>
                    <span class="text-slate-300">{{ trait }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-bold text-white/90 mb-3">
                  <i class="fas fa-arrow-trend-up text-[#00E6FF] mr-2"></i>
                  Потенциал роста:
                </h3>
                <p class="text-slate-300 leading-relaxed">
                  {{ archetype.growth }}
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

const archetypes = ref([
  {
    name: "Простодушный",
    icon: "fas fa-smile",
    description:
      "Простодушный видит мир через призму оптимизма и доверия. Этот архетип стремится к счастью, искренности и гармонии.",
    traits: ["Доверчивость", "Оптимизм", "Искренность", "Жизнерадостность"],
    growth:
      "Развитие критического мышления при сохранении позитивного взгляда на мир.",
  },
  {
    name: "Сирота",
    icon: "fas fa-user-slash",
    description:
      "Сирота ищет чувство принадлежности и безопасности. Этот архетип ценит реализм и адаптивность, учится справляться с жизненными трудностями.",
    traits: [
      "Реалистичный взгляд на мир",
      "Выносливость",
      "Эмпатия",
      "Адаптивность",
    ],
    growth:
      "Развитие доверия к себе и окружающим при сохранении реалистичного восприятия.",
  },
  {
    name: "Воин",
    icon: "fas fa-shield-alt",
    description:
      "Воин обладает решимостью и смелостью. Этот архетип стремится защищать свои ценности и преодолевать вызовы.",
    traits: ["Мужество", "Дисциплина", "Стратегическое мышление", "Сила воли"],
    growth:
      "Баланс между стойкостью и способностью учитывать чужую точку зрения.",
  },
  {
    name: "Опекун",
    icon: "fas fa-hands-holding-heart",
    description:
      "Опекун руководствуется заботой о других. Этот архетип стремится создать уютную и безопасную среду для окружающих.",
    traits: ["Сострадание", "Щедрость", "Поддержка", "Самоотверженность"],
    growth: "Развитие границ между заботой о других и заботой о себе.",
  },
  {
    name: "Искатель",
    icon: "fas fa-compass",
    description:
      "Искатель жаждет новых открытий и возможностей. Этот архетип стремится к свободе, независимости и самопознанию.",
    traits: [
      "Любознательность",
      "Свобода духа",
      "Независимость",
      "Приключенческий дух",
    ],
    growth:
      "Научиться находить радость в настоящем моменте, а не только в поиске нового.",
  },
  {
    name: "Любовник",
    icon: "fas fa-heart",
    description:
      "Любовник стремится к глубокой эмоциональной связи и красоте. Этот архетип движим страстью и гармонией в отношениях.",
    traits: [
      "Романтичность",
      "Чувственность",
      "Гармония",
      "Эмоциональная глубина",
    ],
    growth:
      "Развитие независимости при сохранении способности к глубоким чувствам.",
  },
  {
    name: "Бунтарь",
    icon: "fas fa-bolt",
    description:
      "Бунтарь стремится к переменам и разрушению устаревших систем. Этот архетип борется за свободу и справедливость.",
    traits: ["Смелость", "Непокорность", "Решительность", "Жажда перемен"],
    growth:
      "Нахождение конструктивных способов выражения своих идей и изменений.",
  },
  {
    name: "Творец",
    icon: "fas fa-paint-brush",
    description:
      "Творец стремится воплотить свои идеи в реальность. Этот архетип вдохновлен самовыражением и оригинальностью.",
    traits: [
      "Креативность",
      "Идеализм",
      "Инновационное мышление",
      "Художественное самовыражение",
    ],
    growth: "Научиться сочетать вдохновение с практической реализацией.",
  },
  {
    name: "Маг",
    icon: "fas fa-magic",
    description:
      "Маг стремится к трансформации реальности через глубокое понимание законов жизни. Этот архетип обладает проницательностью и видением будущего.",
    traits: [
      "Интуиция",
      "Способность к трансформации",
      "Видение перспектив",
      "Харизма",
    ],
    growth: "Использование своих талантов для созидания, а не манипуляции.",
  },
  {
    name: "Правитель",
    icon: "fas fa-crown",
    description:
      "Правитель стремится к порядку, контролю и лидерству. Этот архетип обладает организаторскими способностями и стратегическим мышлением.",
    traits: [
      "Ответственность",
      "Лидерство",
      "Целеустремленность",
      "Структурное мышление",
    ],
    growth: "Баланс между контролем и доверием к окружающим.",
  },
  {
    name: "Мудрец",
    icon: "fas fa-book-open",
    description:
      "Мудрец стремится к познанию и истине. Этот архетип движим жаждой понимания мира через анализ и изучение.",
    traits: [
      "Аналитическое мышление",
      "Объективность",
      "Интеллектуальная глубина",
      "Стремление к истине",
    ],
    growth: "Соединение разума с интуицией и эмоциональной мудростью.",
  },
  {
    name: "Шут",
    icon: "fas fa-theater-masks",
    description:
      "Шут приносит радость и легкость в жизнь. Этот архетип видит смысл в игре, юморе и наслаждении моментом.",
    traits: ["Спонтанность", "Остроумие", "Креативность", "Жизнерадостность"],
    growth:
      "Научиться быть серьезным, когда это необходимо, без утраты легкости.",
  },
]);
</script>
