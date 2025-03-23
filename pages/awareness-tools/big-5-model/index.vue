<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-6xl px-4 xl:px-0 py-8 sm:py-12">
      <!-- Hero Section -->
      <section class="mb-12 sm:mb-16">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
            Исследуйте Свои Личностные Черты
          </h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Узнайте себя лучше через проверенную модель "Большой Пятёрки" и
            откройте новые перспективы для личного и профессионального роста.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              to="/awareness-tools/big-5-model/assessment"
              text="Пройти тест"
              iconClass="fas fa-play"
              gradientStart="#3B82F6"
              gradientEnd="#6366F1"
              textColor="#FFFFFF"
              customClass="px-8 py-3 hover:opacity-90 border-[#3B82F6]/20 shadow-lg hover:shadow-xl transition-all"
              :translateClass="'-translate-x-[101%]'"
            />
            <Button
              to="/awareness-tools/big-5-model/explanation"
              text="Подробнее"
              iconClass="fas fa-info-circle"
              gradientStart="#FFFFFF10"
              gradientEnd="#FFFFFF10"
              textColor="#FFFFFF"
              customClass="px-8 py-3 hover:bg-white/20 border-[#FFFFFF10]/20 shadow-md hover:shadow-lg transition-all"
            />
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="grid sm:grid-cols-2 gap-8 mb-12 sm:mb-16">
        <div
          class="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          <h2 class="text-xl font-semibold text-white mb-4">
            Личностное развитие
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-blue-start text-lg">✦</span>
              <span class="text-slate-300">
                Узнайте свои сильные и слабые стороны
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-orange-start text-lg">✦</span>
              <span class="text-slate-300">
                Развивайте эмоциональный интеллект и стрессоустойчивость
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-purple-start text-lg">✦</span>
              <span class="text-slate-300">
                Улучшайте навыки общения и взаимодействия
              </span>
            </li>
          </ul>
        </div>

        <div
          class="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
        >
          <h2 class="text-xl font-semibold text-white mb-4">
            Профессиональное развитие
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-blue-end text-lg">✦</span>
              <span class="text-slate-300">
                Определите подходящую для вас рабочую среду
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-orange-end text-lg">✦</span>
              <span class="text-slate-300">
                Развивайте лидерские качества и командную работу
              </span>
            </li>
            <li class="flex items-start sm:items-center gap-3">
              <span class="text-gradient-purple-end text-lg">✦</span>
              <span class="text-slate-300">
                Создайте стратегию карьерного роста
              </span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Process Section -->
      <section class="bg-white/5 rounded-xl p-8 border border-white/10">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          Как проходит тест
        </h2>
        <div class="grid sm:grid-cols-3 gap-6 sm:gap-8">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
              >
                <span class="text-white font-medium">1</span>
              </div>
              <h3 class="text-lg font-semibold text-white">
                Ответьте на вопросы
              </h3>
            </div>
            <p class="text-slate-300 text-sm">
              Пройдите серию вопросов, оценивающих ключевые аспекты вашей
              личности.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
              >
                <span class="text-white font-medium">2</span>
              </div>
              <h3 class="text-lg font-semibold text-white">
                Получите результаты
              </h3>
            </div>
            <p class="text-slate-300 text-sm">
              Изучите детальный отчет с вашими показателями по каждому из пяти
              факторов.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
              >
                <span class="text-white font-medium">3</span>
              </div>
              <h3 class="text-lg font-semibold text-white">
                Развивайтесь дальше
              </h3>
            </div>
            <p class="text-slate-300 text-sm">
              Используйте рекомендации для личного и профессионального роста.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Button from "~/components/base/Button.vue";
</script>
