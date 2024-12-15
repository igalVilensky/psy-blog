<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6"
  >
    <!-- Header Section -->
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-extrabold text-blue-700 mb-4">О нас</h1>
      <p class="text-lg text-gray-700 leading-relaxed">
        Добро пожаловать! Этот проект создан, чтобы вдохновлять и помогать людям
        расти, достигать гармонии и радости в жизни.
      </p>
    </div>

    <!-- Content Section -->
    <div class="mt-12 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-3xl font-semibold text-blue-600 mb-4">
        Anastasia Galactik
      </h2>
      <p class="text-gray-800 text-lg leading-relaxed">
        Я, Anastasia Galactik, создала этот проект, чтобы помочь людям расти и
        развиваться. Я верю, что психическое развитие — это ключ к гармонии в
        отношениях, осознанному родительству и доброжелательному взаимодействию
        с окружающими.
      </p>
      <p class="text-gray-800 text-lg leading-relaxed mt-6">
        Люди, которые занимаются саморазвитием, становятся гибче, а их жизнь —
        более наполненной. Мои продукты — это пазл, который помогает соединить
        все сферы жизни: от личностного роста до улучшения отношений и
        воспитания детей.
      </p>
    </div>

    <!-- Highlight Section -->
    <div
      class="mt-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-gradient-to-br from-purple-100 to-pink-50 rounded-lg shadow-lg p-6"
    >
      <div class="w-full md:w-1/2">
        <h3 class="text-2xl font-bold text-purple-700 mb-4">
          Что вы найдете здесь?
        </h3>
        <ul class="list-disc list-inside text-gray-800 text-lg">
          <li>Курсы по личностному развитию</li>
          <li>Гайды для улучшения отношений</li>
          <li>Рабочие тетради для самоанализа</li>
          <li>Поддерживающие сообщества</li>
        </ul>
      </div>
      <div class="w-full md:w-1/2 mt-6 md:mt-0">
        <img
          src="/assets/images/profile.png"
          alt="Self-development illustration"
          class="rounded-lg shadow-md"
        />
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div class="mt-12 max-w-4xl mx-auto text-center">
      <h4 class="text-xl font-bold text-blue-600">
        Начните свое путешествие к гармонии сегодня!
      </h4>
      <p class="text-gray-700 mt-2">
        Изучите курсы и материалы, которые помогут вам шаг за шагом двигаться к
        внутреннему равновесию.
      </p>
      <NuxtLink
        to="/courses"
        class="mt-6 inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Перейти к курсам
      </NuxtLink>
    </div>
  </div>
</template>
