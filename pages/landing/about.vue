<template>
  <section class="relative min-h-[90vh] bg-slate-900 overflow-hidden">
    <!-- Background Gradient -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900/20"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="container mx-auto px-6 xl:px-0 relative z-10 py-16 sm:py-24">
      <!-- Heading Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-bold text-white leading-tight">
          <font-awesome-icon
            icon="fa-solid fa-user-circle"
            class="mr-2 text-indigo-400"
          />
          О нас
        </h1>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
          Пространство осознанного развития для вашего личностного роста.
        </p>
      </div>

      <!-- Content Block -->
      <div class="grid lg:grid-cols-1 gap-12 items-center">
        <div
          class="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/80 shadow-xl shadow-slate-900/50 transform hover:scale-102 transition-all duration-500"
        >
          <h2 class="text-2xl font-semibold text-white mb-4">
            <font-awesome-icon
              icon="fa-solid fa-handshake"
              class="mr-2 text-green-400"
            />
            Основатель проекта
          </h2>
          <p class="text-slate-300 mb-6">
            Здравствуйте! Меня зовут Анастасия, и я рада приветствовать вас в
            пространстве осознанного развития. Мой подход основан на синтезе
            современной психологии, практических методик развития и многолетнего
            опыта работы с людьми. Приглашаю вас в путешествие к лучшей версии
            себя, где каждый шаг наполнен осознанностью и пониманием.
          </p>
          <NuxtLink
            to="/contact"
            class="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl font-medium text-center transition-all duration-300 shadow-lg shadow-indigo-900/30"
          >
            Связаться со мной
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Определяем, что страница должна быть сгенерирована статически (SSG)
definePageMeta({
  layout: "landing",
  prerender: true, // Указывает Nuxt, что страницу нужно сделать статичной
});

// SEO-метаданные
useHead({
  title: "О нас - Пространство осознанного развития",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "Узнайте больше о проекте Анастасии, основанном на синтезе психологии и практических методик для осознанного развития.",
    },
  ],
});
</script>
