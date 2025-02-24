<template>
  <main class="overflow-hidden">
    <!-- Hero Section with Abstract Background -->
    <section class="relative min-h-screen">
      <div class="container mx-auto px-4 relative">
        <!-- Hero Content -->
        <div class="pt-24 pb-16 text-center">
          <div
            class="inline-block mb-6 px-6 py-2 bg-white/30 backdrop-blur-sm rounded-full"
          >
            <span class="text-indigo-800 font-medium"
              >Откройте новые грани своей личности</span
            >
          </div>
          <h1
            class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Ваш психологический
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              >профиль</span
            >
          </h1>
          <p class="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            На основе современных методик психологии мы создадим ваш уникальный
            профиль, который поможет лучше понять себя и свой путь развития
          </p>

          <!-- Features Cards -->
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div class="group">
              <div
                class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div
                  class="mb-6 text-purple-600 bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"
                >
                  <i class="fas fa-brain text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Аналитическое мышление
                </h3>
                <div
                  class="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"
                ></div>
                <p class="text-gray-600">Раскройте потенциал вашего мышления</p>
              </div>
            </div>

            <div class="group">
              <div
                class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div
                  class="mb-6 text-blue-600 bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"
                >
                  <i class="fas fa-heart text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Эмоц. интеллект
                </h3>
                <div
                  class="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-4"
                ></div>
                <p class="text-gray-600">Улучшите понимание эмоций</p>
              </div>
            </div>

            <div class="group">
              <div
                class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div
                  class="mb-6 text-pink-600 bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"
                >
                  <i class="fas fa-lightbulb text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Креативность
                </h3>
                <div
                  class="w-12 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mb-4"
                ></div>
                <p class="text-gray-600">Развивайте творческий потенциал</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Features Section -->
        <div class="grid lg:grid-cols-3 gap-8 mb-24">
          <div
            class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-1"
          >
            <div class="bg-white rounded-[23px] p-8 h-full">
              <div class="text-purple-600 mb-6">
                <i class="fas fa-user-circle text-4xl"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Определение архетипа личности
              </h2>
              <p class="text-gray-600 mb-6">
                Узнайте свой психологический тип и его характеристики
              </p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-purple-600 font-medium"
                  >Подробнее</span
                >
                <i class="fas fa-arrow-right text-purple-600"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-1"
          >
            <div class="bg-white rounded-[23px] p-8 h-full">
              <div class="text-blue-600 mb-6">
                <i class="fas fa-chart-line text-4xl"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Анализ эмоционального интеллекта
              </h2>
              <p class="text-gray-600 mb-6">
                Измерьте свою способность распознавать эмоции и управлять ими
              </p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-blue-600 font-medium">Подробнее</span>
                <i class="fas fa-arrow-right text-blue-600"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl p-1"
          >
            <div class="bg-white rounded-[23px] p-8 h-full">
              <div class="text-pink-600 mb-6">
                <i class="fas fa-map text-4xl"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Карта потенциала развития
              </h2>
              <p class="text-gray-600 mb-6">
                Визуализация ваших сильных сторон и направлений для роста
              </p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-pink-600 font-medium">Подробнее</span>
                <i class="fas fa-arrow-right text-pink-600"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Tests Section -->
        <div class="mb-24">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Доступные тесты
            </h2>
            <div
              class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"
            ></div>
          </div>

          <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <!-- Archetypes Test -->
            <div class="group">
              <div
                class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <i class="fas fa-fingerprint text-5xl text-purple-600"></i>
                </div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                  Раскройте Свою Уникальную Историю
                </h2>
                <p class="text-gray-600 mb-6">
                  Познайте себя глубже через современный подход к самопознанию и
                  найдите свой путь к гармоничной жизни.
                </p>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center gap-3 text-gray-700">
                    <div
                      class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"
                    >
                      <i class="fas fa-check text-sm text-purple-600"></i>
                    </div>
                    Откройте свои скрытые таланты
                  </li>
                  <li class="flex items-center gap-3 text-gray-700">
                    <div
                      class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"
                    >
                      <i class="fas fa-check text-sm text-purple-600"></i>
                    </div>
                    Найдите баланс в жизни
                  </li>
                  <li class="flex items-center gap-3 text-gray-700">
                    <div
                      class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"
                    >
                      <i class="fas fa-check text-sm text-purple-600"></i>
                    </div>
                    Создайте свой путь развития
                  </li>
                </ul>
                <NuxtLink
                  to="/test/archetypes"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all group-hover:scale-105"
                >
                  Пройти тест
                  <i class="fas fa-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>

            <!-- Big Five Test -->
            <div class="group">
              <div
                class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <i class="fas fa-chart-pie text-5xl text-blue-600"></i>
                </div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                  Исследуйте Свои Личностные Черты
                </h2>
                <p class="text-gray-600 mb-6">
                  Узнайте себя лучше через проверенную модель "Большой Пятёрки"
                  и откройте новые перспективы для роста.
                </p>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center gap-3 text-gray-700">
                    <div
                      class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <i class="fas fa-check text-sm text-blue-600"></i>
                    </div>
                    Узнайте свои сильные стороны
                  </li>
                  <li class="flex items-center gap-3 text-gray-700">
                    <div
                      class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <i class="fas fa-check text-sm text-blue-600"></i>
                    </div>
                    Развивайте эмоциональный интеллект
                  </li>
                  <li class="flex items-center gap-3 text-gray-700">
                    <div
                      class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <i class="fas fa-check text-sm text-blue-600"></i>
                    </div>
                    Улучшайте навыки общения
                  </li>
                </ul>
                <NuxtLink
                  to="/test/big-five"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium transition-all group-hover:scale-105"
                >
                  Пройти тест
                  <i class="fas fa-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});
</script>

<style scoped>
.container {
  max-width: 1280px;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Gradient text support for all browsers */
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
