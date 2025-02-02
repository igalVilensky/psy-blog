<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-4xl relative z-10 py-12">
      <!-- Back Navigation -->
      <div>
        <NuxtLink
          to="/awareness-tools/life-purpose-archetype"
          class="inline-flex px-4 sm:px-0 items-center text-[#00E6FF] hover:text-[#3A1CFF] transition-colors mb-8 group pl-6 sm:pl-0"
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
    name: "Творец",
    icon: "fas fa-paint-brush",
    description:
      "Творец стремится воплотить свое видение в реальность, создавая что-то новое и значимое. Этот архетип движим желанием самовыражения через творчество.",
    traits: [
      "Инновационное мышление",
      "Художественное самовыражение",
      "Оригинальность",
      "Стремление к совершенству",
    ],
    growth:
      "Развитие баланса между творческим процессом и практической реализацией идей.",
  },
  {
    name: "Исследователь",
    icon: "fas fa-compass",
    description:
      "Исследователь ищет новые горизонты и открытия, движимый жаждой познания и приключений. Этот архетип находит удовлетворение в путешествиях и открытиях.",
    traits: [
      "Независимость",
      "Любознательность",
      "Адаптивность",
      "Страсть к открытиям",
    ],
    growth:
      "Нахождение баланса между стремлением к новому и способностью ценить настоящий момент.",
  },
  {
    name: "Мудрец",
    icon: "fas fa-book-open",
    description:
      "Мудрец стремится к истине и пониманию через знания и анализ. Этот архетип находит удовлетворение в интеллектуальном росте и передаче знаний.",
    traits: [
      "Аналитическое мышление",
      "Объективность",
      "Глубокое понимание",
      "Стремление к истине",
    ],
    growth: "Интеграция эмоционального интеллекта с рациональным мышлением.",
  },
  {
    name: "Воин",
    icon: "fas fa-shield-alt",
    description:
      "Воин отличается храбростью и решительностью в достижении целей. Этот архетип защищает то, что считает правильным и важным.",
    traits: [
      "Храбрость",
      "Дисциплина",
      "Стратегическое мышление",
      "Целеустремленность",
    ],
    growth: "Развитие эмпатии и гибкости при сохранении силы духа.",
  },
  {
    name: "Маг",
    icon: "fas fa-magic",
    description:
      "Маг стремится понять законы вселенной и использовать их для трансформации реальности. Этот архетип обладает способностью видеть скрытые возможности.",
    traits: [
      "Интуитивность",
      "Способность к трансформации",
      "Видение перспектив",
      "Харизма",
    ],
    growth:
      "Использование своих способностей для общего блага и развития других.",
  },
  {
    name: "Заботливый",
    icon: "fas fa-heart",
    description:
      "Заботливый движим состраданием и желанием помогать другим. Этот архетип находит удовлетворение в поддержке и заботе о других.",
    traits: ["Эмпатия", "Щедрость", "Поддержка", "Compassion"],
    growth:
      "Установление здоровых границ при сохранении способности заботиться о других.",
  },
  {
    name: "Наставник",
    icon: "fas fa-chalkboard-teacher",
    description:
      "Наставник вдохновляет других на развитие и рост. Этот архетип находит удовлетворение в передаче знаний и поддержке развития других.",
    traits: [
      "Мудрость",
      "Терпение",
      "Вдохновляющее влияние",
      "Педагогический талант",
    ],
    growth: "Развитие способности учиться у своих учеников.",
  },
  {
    name: "Правитель",
    icon: "fas fa-crown",
    description:
      "Правитель стремится к порядку и контролю над ситуацией. Этот архетип обладает способностью организовывать и управлять.",
    traits: [
      "Лидерство",
      "Ответственность",
      "Организованность",
      "Стратегическое мышление",
    ],
    growth: "Развитие демократического стиля лидерства и делегирования.",
  },
  {
    name: "Друг",
    icon: "fas fa-users",
    description:
      "Друг ценит отношения и связи между людьми. Этот архетип находит удовлетворение в создании и поддержании глубоких отношений.",
    traits: [
      "Верность",
      "Эмпатия",
      "Коммуникабельность",
      "Способность к сотрудничеству",
    ],
    growth: "Развитие независимости при сохранении глубоких связей.",
  },
  {
    name: "Шут",
    icon: "fas fa-theater-masks",
    description:
      "Шут привносит радость и легкость в жизнь. Этот архетип находит удовлетворение в создании позитивной атмосферы и развлечении других.",
    traits: ["Спонтанность", "Humor", "Творческий подход", "Жизнерадостность"],
    growth: "Развитие способности быть серьезным, когда это необходимо.",
  },
  {
    name: "Мятежник",
    icon: "fas fa-bolt",
    description:
      "Мятежник бросает вызов существующим нормам и правилам. Этот архетип стремится к изменениям и революционным преобразованиям.",
    traits: [
      "Независимость мышления",
      "Смелость",
      "Инновационность",
      "Способность к радикальным изменениям",
    ],
    growth: "Нахождение конструктивных способов внедрения изменений.",
  },
  {
    name: "Герой",
    icon: "fas fa-medal",
    description:
      "Герой стремится преодолевать трудности и достигать невозможного. Этот архетип вдохновляет других своим примером и достижениями.",
    traits: [
      "Отвага",
      "Решительность",
      "Целеустремленность",
      "Вдохновляющий пример",
    ],
    growth:
      "Развитие способности признавать свои уязвимости и принимать помощь других.",
  },
]);
</script>
