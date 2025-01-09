<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-16"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section with Animated Background -->
      <header
        class="relative text-center mb-24 p-12 rounded-3xl bg-gradient-to-b from-[#1A1F35] to-indigo-600 overflow-hidden"
      >
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="relative z-10">
          <h1 class="text-5xl font-bold text-white mb-6 tracking-tight">
            О проекте
          </h1>
          <p class="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Добро пожаловать в пространство осознанного развития и личностного
            роста. Здесь каждый шаг ведёт к более глубокому пониманию себя и
            гармонии с миром.
          </p>
        </div>
      </header>

      <!-- Personal Biography Section -->
      <section class="mb-24">
        <div
          class="bg-white rounded-3xl p-12 shadow-xl grid md:grid-cols-2 gap-16 items-center relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500"
          ></div>
          <div class="space-y-6">
            <div
              class="inline-block px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-medium mb-4"
            >
              Основатель проекта
            </div>
            <div class="space-y-6 text-gray-700">
              <p class="text-lg leading-relaxed">
                Здравствуйте! Меня зовут Анастасия, и я рада приветствовать вас
                в пространстве осознанного развития. Этот проект родился из
                глубокого стремления помочь людям раскрыть свой потенциал и
                найти путь к внутренней гармонии.
              </p>
              <p class="text-lg leading-relaxed">
                Мой подход основан на синтезе современной психологии,
                практических методик развития и многолетнего опыта работы с
                людьми. Я верю, что каждый человек обладает уникальными
                возможностями для роста и трансформации.
              </p>
              <p class="text-lg leading-relaxed">
                Приглашаю вас в путешествие к лучшей версии себя, где каждый шаг
                наполнен осознанностью и пониманием.
              </p>
            </div>
            <div class="flex gap-4 mt-8">
              <a
                href="#"
                class="inline-flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <i class="fab fa-linkedin text-xl mr-2"></i>
                LinkedIn
              </a>
              <a
                href="#"
                class="inline-flex items-center text-indigo-600 hover:text-indigo-700"
              >
                <i class="fab fa-instagram text-xl mr-2"></i>
                Instagram
              </a>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-200 to-blue-100 rounded-3xl transform rotate-6"
            ></div>
            <nuxt-img
              src="/assets/images/profile.jpg"
              alt="Анастасия"
              class="relative w-full h-[500px] object-cover rounded-3xl shadow-lg transform transition-transform duration-500 hover:-translate-y-2"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <!-- Offerings Section -->
      <section class="mb-24">
        <div class="text-center mb-16">
          <div
            class="inline-block px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-medium mb-4"
          >
            Наши возможности
          </div>
          <h3 class="text-4xl font-bold text-gray-800 mb-6">
            Что вы найдете здесь?
          </h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Откройте для себя инструменты и ресурсы, которые помогут вам в
            journey личностного роста
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(offering, index) in offerings"
            :key="index"
            class="group bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            ></div>
            <div class="flex items-start gap-6">
              <div
                class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
              >
                <i :class="offering.icon" class="text-2xl"></i>
              </div>
              <div>
                <h4 class="text-xl font-semibold text-gray-800 mb-3">
                  {{ offering.title }}
                </h4>
                <p class="text-gray-600 leading-relaxed">
                  {{ offering.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="relative">
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#1A1F35] to-indigo-600 transform -skew-y-2"
        ></div>
        <div
          class="relative bg-gradient-to-t from-[#1A1F35] to-indigo-600 rounded-3xl p-16 text-center overflow-hidden"
        >
          <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div class="relative z-10">
            <h4 class="text-4xl font-bold text-white mb-6">
              Начните свое путешествие к гармонии сегодня
            </h4>
            <p class="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к нашему сообществу и откройте для себя новые
              горизонты развития
            </p>
            <NuxtLink
              to="/courses/courses"
              class="inline-flex items-center bg-white text-indigo-600 text-lg font-semibold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition duration-300"
            >
              Перейти к курсам
              <i class="fas fa-arrow-right ml-2"></i>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const offerings = [
  {
    title: "Курсы по личностному развитию",
    description:
      "Структурированные программы, разработанные экспертами, для достижения максимальной эффективности в личностном росте и развитии профессиональных навыков.",
    icon: "fas fa-graduation-cap",
  },
  {
    title: "Гайды для улучшения отношений",
    description:
      "Комплексные руководства, основанные на современных исследованиях психологии, для создания и укрепления глубоких, осознанных отношений.",
    icon: "fas fa-heart",
  },
  {
    title: "Рабочие тетради для самоанализа",
    description:
      "Профессионально разработанные инструменты для глубокого самопознания, включающие практические упражнения и техники рефлексии.",
    icon: "fas fa-book",
  },
  {
    title: "Поддерживающие сообщества",
    description:
      "Активное сообщество единомышленников, где вы найдете поддержку, обмен опытом и возможности для нетворкинга с людьми схожих интересов.",
    icon: "fas fa-users",
  },
];
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
