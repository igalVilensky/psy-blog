<template>
  <div
    class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/40 font-sans">

    <!-- 1. HERO SECTION -->
    <header
      class="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
      <div class="absolute inset-0 z-0 opacity-70 dark:opacity-50">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <!-- Background Glow -->
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#38bdf8] to-[#818cf8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.187rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
        </div>
      </div>

      <div class="container mx-auto max-w-5xl px-6 relative z-10 text-center py-24 animate-fade-in">
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.15]">
          <span class="block mb-4 text-indigo-500 font-medium text-lg uppercase tracking-[0.3em]">Интеллектуальное
            пространство</span>
          <span class="block">MindQLab</span>
          <span
            class="block mt-4 text-2xl md:text-4xl lg:text-5xl font-extralight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white">
            Инструменты для ума <br class="hidden md:block" /> и эмоционального баланса
          </span>
        </h1>

        <p
          class="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          Мы объединяем современные психологические практики с интерактивными тренажерами и когнитивными играми.
          Это пространство для тех, кто ищет эффективные способы развития памяти, внимания и гибкости мышления.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink to="/lab"
            class="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 overflow-hidden">
            Открыть инструменты
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <i class="fas fa-chevron-down text-xl"></i>
      </div>
    </header>

    <!-- 2. MISSION & VISION -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="reveal-on-scroll">
            <h2 class="text-3xl md:text-4xl font-light mb-8">Больше, чем психология</h2>
            <div class="w-20 h-0.5 bg-indigo-500 mb-8"></div>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Мы верим, что развитие личности невозможно без тренировки функций мозга. MindQLab — это не просто курсы
              или тесты, это интерактивная площадка для качественной работы над собой.
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Здесь вы найдете упражнения на концентрацию, игры для развития памяти и инструменты для глубокого
              самоанализа, собранные в единую удобную экосистему.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6 reveal-on-scroll">
            <div v-for="(stat, i) in stats" :key="i"
              class="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800 text-center transition-all duration-500 hover:border-indigo-500/30">
              <div class="text-3xl md:text-4xl font-light mb-2 text-indigo-500">{{ stat.value }}</div>
              <div class="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CORE PRINCIPLES -->
    <section class="py-24 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="text-center mb-20 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-light mb-6">Что внутри MindQLab</h2>
          <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Мы разделили платформу на три ключевых направления, чтобы ваш рост был всесторонним.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div v-for="(feature, i) in features" :key="i"
            class="reveal-on-scroll flex flex-col items-center text-center group"
            :style="{ transitionDelay: `${i * 100}ms` }">
            <div
              class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-indigo-500 mb-8 shadow-sm group-hover:scale-110 group-hover:border-indigo-500 transition-all duration-500">
              <i :class="feature.icon" class="text-2xl"></i>
            </div>
            <h3 class="text-xl font-medium mb-4">{{ feature.title }}</h3>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. FOUNDERS / TEAM -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="mb-20 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-light mb-6">Создатели проекта</h2>
          <div class="w-20 h-0.5 bg-indigo-500 mb-8"></div>
          <p class="text-lg text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            MindQLab — это синергия психологии и технологий. Мы объединили экспертный опыт в области психического
            здоровья с современными игровыми механиками.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Anastasia -->
          <div
            class="reveal-on-scroll p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col sm:flex-row gap-8 items-center sm:items-start group transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
            <div class="shrink-0 relative">
              <img src="/assets/images/profile.jpg" alt="Анастасия Виленская"
                class="w-32 h-32 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xs">
                <i class="fas fa-brain"></i>
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-medium mb-1">Анастасия Виленская</h3>
              <div class="text-indigo-500 text-sm font-medium mb-4 uppercase tracking-widest">Psychology & Content Lead
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Создает методологическую базу проекта. Её экспертиза позволяет интегрировать сложные терапевтические и
                когнитивные модели в понятный и увлекательный формат.
              </p>
              <div class="flex gap-4">
                <a href="https://www.instagram.com/galactik.anastasia/" target="_blank"
                  class="text-slate-400 hover:text-indigo-500 transition-colors"><i class="fab fa-instagram"></i></a>
                <a href="#" class="text-slate-400 hover:text-indigo-500 transition-colors"><i
                    class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>

          <!-- Igal -->
          <div
            class="reveal-on-scroll p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col sm:flex-row gap-8 items-center sm:items-start group transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5"
            style="transition-delay: 100ms">
            <div class="shrink-0 relative">
              <img src="/assets/images/igal.avif" alt="Игаль Виленский"
                class="w-32 h-32 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs">
                <i class="fas fa-code"></i>
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-medium mb-1">Игаль Виленский</h3>
              <div class="text-blue-500 text-sm font-medium mb-4 uppercase tracking-widest">Tech Lead & Architect</div>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Создает техническую архитектуру и интерактивные инструменты платформы. Воплощает идеи в современные
                решения, делая развитие удобным и технологичным.
              </p>
              <div class="flex gap-4">
                <a href="#" class="text-slate-400 hover:text-blue-500 transition-colors"><i
                    class="fab fa-github"></i></a>
                <a href="#" class="text-slate-400 hover:text-blue-500 transition-colors"><i
                    class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. FINAL CTA -->
    <footer class="py-32 text-center reveal-on-scroll">
      <div class="container mx-auto max-w-4xl px-6">
        <h2 class="text-3xl md:text-5xl font-light mb-8 italic text-slate-900 dark:text-white leading-tight">
          «Качественные инструменты делают путь к себе короче»
        </h2>
        <p class="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Присоединяйтесь к сообществу тех, кто выбирает осознанный подход к тренировке ума и заботе о психике.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/lab/tests"
            class="inline-block px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-xl shadow-indigo-200 dark:shadow-none">
            Начать с диагностики
          </NuxtLink>
          <NuxtLink to="/lab/brain-training"
            class="inline-block px-12 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl font-medium transition-all duration-300">
            Тренировать мозг
          </NuxtLink>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useHead } from "@unhead/vue";
import CursorNeuralVisualizer from '~/components/lab/CursorNeuralVisualizer.vue';

useHead({
  title: "О MindQLab — Пространство осознанного развития",
  meta: [
    { name: "description", content: "MindQLab — это инновационная экосистема, объединяющая когнитивные тренажеры, игры и психологические инструменты для вашего развития." },
    { name: "keywords", content: "MindQLab, о нас, тренировка мозга, когнитивные игры, психология, самопознание, интерактивные тренажеры, Игаль Виленский, Анастасия Виленская" },
    { property: "og:title", content: "MindQLab — Платформа для осознанного развития" },
    { property: "og:description", content: "Развивайте свой интеллект и эмоциональный баланс с помощью современных инструментов и игровых механик." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.mindqlab.com/about" },
    { property: "og:image", content: "https://www.mindqlab.com/mindqlab-logo.png" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "canonical", href: "https://www.mindqlab.com/about" },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "Organization",
          "name": "MindQLab",
          "url": "https://www.mindqlab.com",
          "logo": "https://www.mindqlab.com/mindqlab-logo.png",
          "description": "Экосистема для когнитивного развития и психологического роста.",
          "founder": [
            {
              "@type": "Person",
              "name": "Анастасия Виленская"
            },
            {
              "@type": "Person",
              "name": "Игаль Виленский"
            }
          ]
        }
      })
    }
  ]
});

const features = [
  {
    icon: "fas fa-gamepad",
    title: "Когнитивные игры",
    description: "Развивайте память, концентрацию и скорость мышления с помощью специально разработанных игровых тренажеров."
  },
  {
    icon: "fas fa-fingerprint",
    title: "Инструменты самопознания",
    description: "Набор психологических тестов и моделей для глубокого понимания своих привычек, паттернов и зон роста."
  },
  {
    icon: "fas fa-infinity",
    title: "Целостный подход",
    description: "Мы объединяем тренировку функций мозга с работой над эмоциональным интеллектом в единую систему."
  },
];

const stats = [
  { value: "40+", label: "Инструментов" },
  { value: "15+", label: "Тестов" },
  { value: "25+", label: "Тренажеров" },
  { value: "5000+", label: "Сессий" },
];

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
</script>

<style scoped>
.font-sans {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.animate-fade-in {
  animation: fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.active {
  opacity: 1;
  transform: translateY(0);
}

h1,
h2,
h3,
h4 {
  font-weight: 300;
  letter-spacing: -0.015em;
}

.grayscale {
  filter: grayscale(100%);
}

.group:hover .grayscale {
  filter: grayscale(0%);
}
</style>
