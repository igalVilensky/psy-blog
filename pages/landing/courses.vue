<template>
  <section class="min-h-screen bg-slate-900 text-white py-16 px-6">
    <div class="container mx-auto max-w-5xl">
      <h1 class="text-4xl font-bold text-center mb-12">
        Курсы для Личностного Роста
      </h1>

      <div
        class="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700"
      >
        <h2 class="text-2xl font-semibold mb-4">Исцеление детских травм</h2>
        <p class="text-slate-300 mb-6">
          Исследуйте и исцелите свои детские травмы через 21 урок, включая
          теоретические и практические задания. Узнайте, как травмы влияют на
          вашу жизнь, и научитесь их преодолевать.
        </p>

        <!-- Progress Section -->
        <div class="mb-6">
          <div class="flex justify-between text-sm text-slate-400">
            <span>Прогресс курса</span>
            <span>19%</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2.5 mt-2">
            <div
              class="bg-blue-500 h-2.5 rounded-full"
              style="width: 19%"
            ></div>
          </div>
        </div>

        <!-- Course Info -->
        <div class="grid grid-cols-2 gap-4 text-sm text-slate-300">
          <div>
            <span class="block font-medium">4 из 21 уроков</span>
            <span class="text-slate-400">Пройдено</span>
          </div>
          <div>
            <span class="block font-medium">8ч 49мин</span>
            <span class="text-slate-400">Осталось времени</span>
          </div>
          <div>
            <span class="block font-medium">21</span>
            <span class="text-slate-400">Видео-урок</span>
          </div>
          <div>
            <span class="block font-medium">11ч</span>
            <span class="text-slate-400">Видео-контента</span>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="mt-6">
          <NuxtLink
            to="/courses/healing-childhood-traumas"
            class="block text-center bg-blue-600 hover:bg-blue-500 transition-all py-3 rounded-lg font-medium shadow-lg"
          >
            Перейти к курсу
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "landing", // Use the landing page layout
});
</script>
