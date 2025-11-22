<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="container mx-auto max-w-4xl relative z-10 py-12 px-4 xl:px-0">
      <Breadcrumbs />
      
      <!-- Header -->
      <div class="mb-12 text-center px-4 animate-fade-in-up">
        <h1 class="text-4xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
            Понимание 12 Архетипов
          </span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 font-medium mb-8 max-w-2xl mx-auto">
          Откройте для себя глубокий смысл и характеристики архетипических образов Юнга
        </p>
      </div>

      <!-- Introduction Card -->
      <ScrollGlowSection>
        <div
          class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-blue-500/30 p-6 sm:p-8 mb-8 shadow-xl"
        >
          <div class="flex items-start mb-6">
            <div class="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl mr-4">
              <i class="fas fa-book text-blue-600 dark:text-cyan-400 text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Теория архетипов</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                12 архетипов Карла Юнга представляют собой основные человеческие
                переживания и мотивации, которые находят отклик в различных
                культурах.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-blue-500/20 hover:border-blue-400/50 transition-colors"
            >
              <h3 class="text-slate-900 dark:text-white font-bold mb-2 flex items-center">
                <i class="fas fa-fingerprint text-amber-500 mr-2"></i>
                Уникальность
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Каждый архетип воплощает уникальные черты, сильные стороны и
                возможные области для развития.
              </p>
            </div>
            <div
              class="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-blue-500/20 hover:border-blue-400/50 transition-colors"
            >
              <h3 class="text-slate-900 dark:text-white font-bold mb-2 flex items-center">
                <i class="fas fa-lightbulb text-purple-500 mr-2"></i>
                Самопознание
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
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
            class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group"
          >
            <div class="flex items-center mb-6">
              <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <i :class="[archetype.icon, 'text-2xl text-blue-600 dark:text-cyan-400']"></i>
              </div>
              <h2 class="ml-2 text-2xl font-bold text-slate-900 dark:text-white">
                {{ archetype.name }}
              </h2>
            </div>

            <div class="space-y-6">
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {{ archetype.description }}
              </p>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                    <i class="fas fa-check-circle text-emerald-500 mr-2"></i>
                    Ключевые характеристики
                  </h3>
                  <div class="space-y-2">
                    <div
                      v-for="trait in archetype.traits"
                      :key="trait"
                      class="flex items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                    >
                      <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                      <span class="text-slate-700 dark:text-slate-300 text-sm">{{ trait }}</span>
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
                      {{ archetype.growth }}
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
