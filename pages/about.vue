<template>
  <div class="bg-white antialiased">
    <div class="container mx-auto px-4 py-16 max-w-6xl">
      <!-- Профессиональный заголовок -->
      <header class="text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
        >
          О нас
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Добро пожаловать! Этот проект создан, чтобы вдохновлять и помогать
          людям расти, достигать гармонии и радости в жизни.
        </p>
      </header>

      <!-- Профессиональная биография -->
      <section
        class="grid md:grid-cols-2 gap-12 items-center bg-gray-50 rounded-xl p-10 shadow-sm mb-16"
      >
        <div>
          <h2 class="text-3xl font-semibold text-blue-800 mb-6">
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
            src="/assets/images/profile.png"
            alt="Anastasia Galactik"
            class="w-80 h-80 object-cover rounded-xl shadow-md"
          />
        </div>
      </section>

      <!-- Профессиональные предложения -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">
            Что вы найдете здесь?
          </h3>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 class="text-xl font-semibold text-blue-700 mb-4">
              Курсы по личностному развитию
            </h4>
            <p class="text-gray-600">
              Структурированные программы для повышения самосознания и личной
              эффективности.
            </p>
          </div>

          <div
            class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 class="text-xl font-semibold text-blue-700 mb-4">
              Гайды для улучшения отношений
            </h4>
            <p class="text-gray-600">
              Практические руководства для создания гармоничных и поддерживающих
              отношений.
            </p>
          </div>

          <div
            class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 class="text-xl font-semibold text-blue-700 mb-4">
              Рабочие тетради для самоанализа
            </h4>
            <p class="text-gray-600">
              Инструменты для глубокого личностного роста и самопознания.
            </p>
          </div>

          <div
            class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 class="text-xl font-semibold text-blue-700 mb-4">
              Поддерживающие сообщества
            </h4>
            <p class="text-gray-600">
              Пространство для обмена опытом и взаимной поддержки.
            </p>
          </div>
        </div>
      </section>

      <!-- Призыв к действию -->
      <section class="text-center bg-blue-50 rounded-xl p-12">
        <h4 class="text-3xl font-bold text-gray-900 mb-6">
          Начните свое путешествие к гармонии сегодня!
        </h4>
        <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Изучите курсы и материалы, которые помогут вам шаг за шагом двигаться
          к внутреннему равновесию.
        </p>
        <NuxtLink
          to="/courses"
          class="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Перейти к курсам
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
