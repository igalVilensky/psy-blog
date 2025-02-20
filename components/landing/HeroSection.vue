<template>
  <section class="relative min-h-[90vh] bg-slate-900 overflow-hidden">
    <!-- Simple Gradient Background -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 relative z-10 py-12 sm:py-20">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column - Main Content -->
        <div class="space-y-8">
          <!-- Main Value Proposition -->
          <div class="space-y-6">
            <span
              class="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium"
            >
              Научно обоснованные инструменты роста
            </span>
            <h1
              class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            >
              Раскройте свой потенциал с помощью научно обоснованных
              инструментов
            </h1>
            <p class="text-lg text-slate-300 max-w-xl">
              Узнайте свой психологический тип за 2 минуты и получите
              персональный план развития
            </p>
          </div>

          <!-- Primary CTAs -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/test"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-center transition-colors"
            >
              Пройти бесплатный тест
            </NuxtLink>
            <NuxtLink
              to="/signup"
              class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium text-center border border-slate-700 transition-colors"
            >
              Создать аккаунт
            </NuxtLink>
          </div>

          <!-- Quick Stats -->
          <div class="flex gap-8 pt-4">
            <div>
              <div class="text-3xl font-bold text-white">25+</div>
              <div class="text-sm text-slate-400">Тестов</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-white">10k+</div>
              <div class="text-sm text-slate-400">Пользователей</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-white">97%</div>
              <div class="text-sm text-slate-400">Довольных</div>
            </div>
          </div>
        </div>

        <!-- Right Column - Visual Element -->
        <div class="relative">
          <div
            class="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700"
          >
            <img
              src="https://academica.ru/upload/medialibrary/edc/yavo2.jpg"
              alt="Preview of personality test results"
              class="w-full h-auto rounded-lg"
            />
            <div
              class="absolute -top-4 -right-4 bg-slate-900/90 backdrop-blur rounded-lg p-3 border border-slate-700"
            >
              <p class="text-sm text-slate-300">
                Без регистрации. Полные результаты после создания аккаунта
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
