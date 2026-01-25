<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-white font-sans transition-colors duration-500">

    <!-- Navigation -->
    <TopBar />

    <!-- 1. HERO SECTION -->
    <header
      class="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto max-w-5xl px-6 relative z-10 text-center py-24 animate-fade-up">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 dark:border-cyan-500/30 mb-8">
          <div class="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
          <span class="text-sm font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">О системе
            MindQLab</span>
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.15]">
          Инструменты для осознанного<br class="hidden md:block" /> взросления ума
        </h1>

        <p
          class="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
          Мы создали платформу, которая переводит абстрактные психологические понятия в понятные данные и конкретные
          шаги. Мы объединяем структурированную оценку с интерактивной практикой.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink to="/space/tests"
            class="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
            <span class="flex items-center justify-center space-x-2">
              <span>Начать с диагностики</span>
              <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-cyan-500">
        <i class="fas fa-chevron-down text-xl"></i>
      </div>
    </header>

    <!-- 2. THE PHILOSOPHY -->
    <section class="py-24 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black reveal-on-scroll">
      <div class="container mx-auto max-w-7xl px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-8">Больше, чем просто
              информация</h2>
            <div class="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
            <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium">
              Настоящий рост происходит в цикле обратной связи: когда вы видите себя через данные и применяете это
              знание в регулярной практике.
            </p>
            <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              MindQLab — это экосистема, где модули замера, аналитическое ядро и лаборатория навыков работают
              вместе, делая путь саморазвития измеримым и понятным.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(stat, i) in stats" :key="i"
              class="group p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5">
              <div
                class="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                {{ stat.value }}</div>
              <div class="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 font-bold">{{
                stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. THE 5-STEP CYCLE -->
    <section class="py-24 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 reveal-on-scroll">
      <div class="container mx-auto max-w-7xl px-8">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Метод MindQLab</h2>
          <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Мы опираемся на пятиэтапный цикл развития, который превращает хаотичные попытки в структурированную систему.
          </p>
        </div>

        <div class="relative">
          <!-- Connector Line (Desktop) -->
          <div
            class="hidden md:block absolute top-[2rem] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-cyan-500/30 z-0">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div v-for="(step, i) in methodSteps" :key="i"
              class="flex flex-col items-center text-center group relative z-10"
              :style="{ transitionDelay: `${i * 100}ms` }">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-cyan-500/50 dark:border-cyan-500/30 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-cyan-500 transition-all duration-500 font-bold text-lg text-cyan-600 dark:text-cyan-400">
                {{ step.index }}
              </div>
              <h3 class="text-lg font-bold mb-3">{{ step.title }}</h3>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. SYSTEM ARCHITECTURE -->
    <section class="py-24 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black reveal-on-scroll">
      <div class="container mx-auto max-w-5xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Архитектура Системы</h2>
          <p class="text-lg text-zinc-600 dark:text-zinc-400">Как эти этапы реализованы в продукте</p>
        </div>

        <div class="space-y-4">
          <div v-for="(layer, i) in layers" :key="i"
            class="group p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center">
              <div
                class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mr-4 shrink-0 transition-colors group-hover:bg-cyan-500 group-hover:border-cyan-500">
                <i
                  :class="['fas', layer.icon, 'text-zinc-600 dark:text-zinc-300 group-hover:text-white transition-colors']"></i>
              </div>
              <div class="flex-grow">
                <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-1">{{ layer.title }}</h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ layer.description }}</p>
              </div>
              <div
                class="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 md:ml-6 mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                Этап {{ layer.stage }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. FOUNDERS -->
    <section class="py-24 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 reveal-on-scroll">
      <div class="container mx-auto max-w-7xl px-8">
        <div class="mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Создатели проекта</h2>
          <div class="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
          <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-medium">
            MindQLab родился на стыке практической психологии и современных технологий. Мы объединили наш опыт в
            области когнитивного развития с современными игровыми механиками.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Anastasia -->
          <div
            class="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row gap-8 items-center sm:items-start group transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
            <div class="shrink-0 relative">
              <img src="/assets/images/profile.jpg" alt="Анастасия Виленская"
                class="w-32 h-32 rounded-xl object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-0 border border-zinc-200 dark:border-zinc-800 shadow-lg" />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">
                <i class="fas fa-brain"></i>
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-1">Анастасия Виленская</h3>
              <div class="text-cyan-600 dark:text-cyan-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">
                Psychology & Content Lead</div>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                Формирует методологическую базу и смысловую архитектуру. Её экспертиза позволяет интегрировать глубинные
                психологические модели в интерактивный и поддерживающий формат.
              </p>
              <div class="flex gap-4">
                <a href="https://www.instagram.com/galactik.anastasia/" target="_blank"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-cyan-600 transition-colors"><i
                    class="fab fa-instagram"></i></a>
                <a href="#"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-cyan-600 transition-colors"><i
                    class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>

          <!-- Igal -->
          <div
            class="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row gap-8 items-center sm:items-start group transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/5">
            <div class="shrink-0 relative">
              <img src="/assets/images/igal.avif" alt="Игаль Виленский"
                class="w-32 h-32 rounded-xl object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-0 border border-zinc-200 dark:border-zinc-800 shadow-lg" />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">
                <i class="fas fa-code"></i>
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-1">Игаль Виленский</h3>
              <div class="text-cyan-600 dark:text-cyan-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">
                Tech Lead & Architect</div>
              <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                Реализует техническое видение платформы. Создает алгоритмы диагностики и игровые системы, превращая
                сложные идеи в интуитивные инструменты для пользователя.
              </p>
              <div class="flex gap-4">
                <a href="#"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-cyan-600 transition-colors"><i
                    class="fab fa-github"></i></a>
                <a href="#"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-cyan-600 transition-colors"><i
                    class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5.5 PROFESSIONAL TOOLS SECTION -->
    <section class="py-24 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 reveal-on-scroll">
      <div class="container mx-auto max-w-7xl px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="order-2 lg:order-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="(tool, i) in professionalTools" :key="i"
                class="group p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cyan-500 transition-all duration-300">
                <div
                  class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <i :class="['fas', tool.icon, 'text-xl']"></i>
                </div>
                <h4 class="font-bold text-zinc-900 dark:text-white mb-2">{{ tool.title }}</h4>
                <p class="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed">{{ tool.description }}</p>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Professional
                Suite</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-8">Для тех, кто сопровождает рост
            </h2>
            <div class="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
            <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium">
              Мы верим, что современные технологии должны помогать профессионалам быть точнее. Панель Коуча в MindQLab —
              это не просто CRM, а мощный аналитический инструмент.
            </p>
            <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Объективные данные о когнитивном состоянии клиента позволяют строить более глубокие гипотезы и видеть
              реальный эффект от вашей совместной работы.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FINAL CTA -->
    <section class="py-32 text-center bg-zinc-50 dark:bg-zinc-950 reveal-on-scroll">
      <div class="container mx-auto max-w-4xl px-6 font-bold leading-tight">
        <h2 class="text-3xl md:text-5xl mb-8 italic text-zinc-900 dark:text-white">
          «Качественные инструменты делают путь к себе короче»
        </h2>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Начните знакомство с собой через данные, которые мы помогаем собрать и осмыслить.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <NuxtLink to="/space/tests"
            class="group px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]">
            <span class="flex items-center justify-center space-x-2">
              <span>Пройти тест</span>
              <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
          </NuxtLink>
          <NuxtLink to="/space/brain-training"
            class="px-10 py-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Развивающие игры
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useHead } from "@unhead/vue";
import CursorNeuralVisualizer from '~/components/space/CursorNeuralVisualizer.vue';
import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';


useHead({
  title: "О MindQLab — Система персонального развития",
  meta: [
    { name: "description", content: "MindQLab — это инновационная экосистема для оценки и развития мышления. Переводим психологию в данные и практику." },
  ]
});

const stats = [
  { value: "40+", label: "Инструментов" },
  { value: "15+", label: "Тестов" },
  { value: "25+", label: "Тренажеров" },
  { value: "5000+", label: "Сессий" },
];

const methodSteps = [
  { index: "01", title: "Замер", description: "Сбор объективных данных о когнитивных и поведенческих паттернах через упражнения и игры." },
  { index: "02", title: "Понимание", description: "Интерпретация полученных результатов в понятную и рабочую модель вашего развития." },
  { index: "03", title: "Направления", description: "Определение векторов роста и выбор наиболее актуальных сейчас инструментов." },
  { index: "04", title: "Практика", description: "Регулярное выполнение упражнений и тренажеров для укрепления целевых навыков." },
  { index: "05", title: "Осмысление", description: "Анализ прогресса, фиксация изменений и постановка новых целей." },
];

const layers = [
  { stage: "1", icon: "fa-chart-bar", title: "Модуль оценки", description: "Выявляет реальные сценарии поведения, скрытые от субъективного наблюдения." },
  { stage: "2", icon: "fa-fingerprint", title: "Аналитическое ядро", description: "Объясняет причины ваших реакций и превращает данные в осмысленный портрет." },
  { stage: "3", icon: "fa-compass", title: "Система рекомендаций", description: "Формирует персональный план действий, отсекая лишний информационный шум." },
  { stage: "4", icon: "fa-dumbbell", title: "Лаборатория навыков", description: "Интерактивные тренажеры для развития памяти, фокуса и когнитивного контроля." },
  { stage: "5", icon: "fa-history", title: "Мониторинг прогресса", description: "Отслеживает динамику развития через повторные замеры и историю тренировок." },
  { stage: "Beta", icon: "fa-microphone-alt", title: "Голосовое структурирование", description: "Экспериментальный AI-инструмент для превращения хаотичных мыслей в четкие когнитивные структуры." },
  { stage: "Prof", icon: "fa-user-tie", title: "Панель Коуча", description: "Профессиональный слой для ведения клиентов, мониторинга их состояния и управления прогрессом." },
];

const professionalTools = [
  { icon: "fa-user-plus", title: "Управление базой", description: "Приглашение клиентов и удобная организация всех подопечных в одном месте." },
  { icon: "fa-chart-line", title: "Аналитика прогресса", description: "Доступ к истории тестов и динамике показателей каждого клиента." },
  { icon: "fa-notes-medical", title: "Система заметок", description: "Ведение профессиональных наблюдений и истории взаимодействия." },
  { icon: "fa-calendar-check", title: "Мониторинг активности", description: "Отслеживание регулярности практик и вовлеченности клиента в процесс." },
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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
</script>

<style scoped>
.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
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
  transform: translateY(30px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.active {
  opacity: 1;
  transform: translateY(0);
}

::selection {
  background-color: rgba(6, 182, 212, 0.3);
  color: inherit;
}

.dark ::selection {
  background-color: rgba(6, 182, 212, 0.5);
}
</style>
