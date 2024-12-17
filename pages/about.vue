<template>
  <div class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <header class="text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight"
        >
          О нас
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Добро пожаловать! Этот проект создан, чтобы вдохновлять и помогать
          людям расти, достигать гармонии и радости в жизни.
        </p>
      </header>

      <!-- Personal Biography Section -->
      <section
        class="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-10 shadow-lg mb-16"
      >
        <div>
          <h2 class="text-3xl font-semibold text-pink-600 mb-6">
            Anastasia Galactik
          </h2>
          <div class="space-y-4 text-gray-700">
            <p class="text-lg leading-relaxed">
              Я, Anastasia Galactik, создала этот проект, чтобы помочь людям
              расти и развиваться. Я верю, что психическое развитие — это ключ к
              гармонии в отношениях, осознанному родительству и
              доброжелательному взаимодействию с окружающими.
            </p>
            <p class="text-lg leading-relaxed">
              Люди, которые занимаются саморазвитием, становятся гибче, а их
              жизнь — более наполненной. Мои продукты — это пазл, который
              помогает соединить все сферы жизни: от личностного роста до
              улучшения отношений и воспитания детей.
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <img
            src="/assets/images/profilePic.png"
            alt="Anastasia Galactik"
            class="w-80 h-80 object-cover rounded-2xl shadow-md transform transition hover:scale-105"
          />
        </div>
      </section>

      <!-- Offerings Section -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-800 mb-4">
            Что вы найдете здесь?
          </h3>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="(offering, index) in offerings"
            :key="index"
            class="bg-white rounded-2xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-xl"
          >
            <div class="mb-4">
              <i :class="offering.icon" class="text-3xl text-pink-500 mb-4"></i>
              <h4 class="text-xl font-semibold text-gray-800 mb-3">
                {{ offering.title }}
              </h4>
            </div>
            <p class="text-gray-600">
              {{ offering.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-12 text-center"
      >
        <h4 class="text-3xl font-bold text-white mb-6">
          Начните свое путешествие к гармонии сегодня!
        </h4>
        <p class="text-white mb-8 max-w-2xl mx-auto text-lg">
          Изучите курсы и материалы, которые помогут вам шаг за шагом двигаться
          к внутреннему равновесию.
        </p>
        <NuxtLink
          to="/courses"
          class="inline-block bg-white text-pink-600 text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Перейти к курсам
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup>
const offerings = [
  {
    title: "Курсы по личностному развитию",
    description:
      "Структурированные программы для повышения самосознания и личной эффективности.",
    icon: "fas fa-graduation-cap",
  },
  {
    title: "Гайды для улучшения отношений",
    description:
      "Практические руководства для создания гармоничных и поддерживающих отношений.",
    icon: "fas fa-heart",
  },
  {
    title: "Рабочие тетради для самоанализа",
    description: "Инструменты для глубокого личностного роста и самопознания.",
    icon: "fas fa-book",
  },
  {
    title: "Поддерживающие сообщества",
    description: "Пространство для обмена опытом и взаимной поддержки.",
    icon: "fas fa-users",
  },
];
</script>
