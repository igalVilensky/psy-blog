<template>
  <div class="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Откройте Ваше Истинное Предназначение
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Погрузитесь в глубокое исследование архетипов вашей личности и
          раскройте истинную цель вашей жизни через трансформационный процесс
          самопознания.
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="startAssessment"
            class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Начать исследование
          </button>
          <button
            @click="showInfo"
            class="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors duration-300 border border-indigo-200"
          >
            Узнать больше
          </button>
        </div>
      </section>

      <!-- Features Section -->
      <section class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">
            Для личного развития
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2">✦</span>
              <span>Раскройте глубинные темы и роли вашей жизни</span>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2">✦</span>
              <span>Поймите свои природные таланты и предназначение</span>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2">✦</span>
              <span>Получите руководство для важных жизненных решений</span>
            </li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">
            Для экспертов
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2">✦</span>
              <span>Помогайте клиентам найти их истинное призвание</span>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2">✦</span>
              <span>Используйте глубинные инсайты в коучинге</span>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-500 mr-2">✦</span>
              <span>Создавайте индивидуальные планы развития</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Process Section -->
      <section class="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 class="text-2xl font-bold text-center mb-8">
          Процесс исследования
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-indigo-600 font-bold">1</span>
            </div>
            <h3 class="font-semibold mb-2">Глубокая оценка</h3>
            <p class="text-gray-600">
              Ответьте на тщательно разработанные вопросы о вашей личности
            </p>
          </div>
          <div class="text-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-indigo-600 font-bold">2</span>
            </div>
            <h3 class="font-semibold mb-2">Анализ архетипов</h3>
            <p class="text-gray-600">
              Получите подробный анализ ваших ключевых архетипов
            </p>
          </div>
          <div class="text-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-indigo-600 font-bold">3</span>
            </div>
            <h3 class="font-semibold mb-2">Практические шаги</h3>
            <p class="text-gray-600">
              Узнайте, как применить эти знания в жизни
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const startAssessment = () => {
  router.push("/awareness-tools/life-purpose-archetype/assessment");
};

const showInfo = () => {
  router.push("/tools/life-purpose-archetype/explanation");
};
</script>
