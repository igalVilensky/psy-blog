<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500">

    <!-- Navigation -->
    <TopBar />

    <!-- 1. HERO SECTION -->
    <header
      class="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-stone-100 dark:border-stone-800/50">
      <div class="absolute inset-0 z-0 opacity-70 dark:opacity-30">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto max-w-5xl px-6 relative z-10 text-center py-24 animate-fade-up">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 leading-[1.15]">
          <span class="block mb-4 text-mindqlab-calm-accent font-medium text-lg uppercase tracking-[0.3em]">
            О системе MindQLab
          </span>
          <span class="block text-stone-900 dark:text-white">Инструменты для осознанного взросления ума</span>
        </h1>

        <p
          class="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          Мы создали платформу, которая переводит абстрактные психологические понятия в понятные данные и конкретные
          шаги. Мы объединяем структурированную оценку с интерактивной практикой.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink to="/space/tests"
            class="px-10 py-5 bg-mindqlab-calm-accent hover:bg-opacity-90 text-white rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-mindqlab-calm-accent/20 hover:-translate-y-0.5">
            Начать с диагностики
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 text-stone-400">
        <i class="fas fa-chevron-down text-xl"></i>
      </div>
    </header>

    <!-- 2. THE PHILOSOPHY -->
    <section class="py-24 border-b border-stone-100 dark:border-stone-800/50 reveal-on-scroll">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-light mb-8 text-stone-900 dark:text-white">Больше, чем просто
              информация</h2>
            <div class="w-16 h-0.5 bg-mindqlab-calm-accent mb-8"></div>
            <p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Мы верим, что чтение статей и прохождение тестов — это только начало. Настоящий рост происходит в цикле
              обратной связи: когда вы видите себя через данные и применяете это знание в регулярной практике.
            </p>
            <p class="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              MindQLab — это экосистема, где модули замера, аналитическое ядро и лаборатория навыков работают
              вместе, делая путь саморазвития измеримым и понятным.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(stat, i) in stats" :key="i"
              class="p-8 bg-white dark:bg-stone-900/40 rounded-3xl border border-stone-100 dark:border-stone-800 text-center transition-all duration-500 hover:border-mindqlab-calm-accent/30 shadow-sm">
              <div class="text-3xl md:text-4xl font-light mb-2 text-mindqlab-calm-accent">{{ stat.value }}</div>
              <div class="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. THE 5-STEP CYCLE -->
    <section
      class="py-24 bg-stone-50/50 dark:bg-stone-900/20 border-b border-stone-100 dark:border-stone-800/50 reveal-on-scroll">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl font-light mb-6 text-stone-900 dark:text-white">Метод MindQLab</h2>
          <p class="text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Мы опираемся на пятиэтапный цикл развития, который превращает хаотичные попытки в структурированную систему.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div v-for="(step, i) in methodSteps" :key="i" class="flex flex-col items-center text-center group"
            :style="{ transitionDelay: `${i * 100}ms` }">
            <div
              class="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center justify-center text-stone-400 mb-6 shadow-sm group-hover:border-mindqlab-calm-accent group-hover:text-mindqlab-calm-accent transition-all duration-500 font-bold text-lg">
              {{ step.index }}
            </div>
            <h3 class="text-lg font-medium mb-3 text-stone-900 dark:text-stone-100">{{ step.title }}</h3>
            <p class="text-stone-500 dark:text-stone-400 leading-relaxed text-xs">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. SYSTEM ARCHITECTURE -->
    <section class="py-24 border-b border-stone-100 dark:border-stone-800/50 reveal-on-scroll">
      <div class="container mx-auto max-w-5xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-light mb-4 text-stone-900 dark:text-white">Архитектура Системы</h2>
          <p class="text-stone-500 dark:text-stone-400">Как эти этапы реализованы в продукте</p>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div v-for="(layer, i) in layers" :key="i"
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900/60 rounded-2xl border border-stone-100 dark:border-stone-800 transition-all hover:border-mindqlab-calm-accent/40 group">
            <div
              class="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 md:mr-6 mb-4 md:mb-0 shrink-0 group-hover:bg-mindqlab-calm-accent group-hover:text-white transition-all duration-500">
              <i :class="['fas', layer.icon]"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1 text-stone-900 dark:text-stone-100">{{ layer.title }}</h4>
              <p class="text-sm text-stone-500 dark:text-stone-400">{{ layer.description }}</p>
            </div>
            <div class="text-[10px] font-bold uppercase tracking-widest text-stone-400 md:ml-6 mt-4 md:mt-0">Этап {{
              layer.stage }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. FOUNDERS -->
    <section class="py-24 bg-stone-50/30 dark:bg-stone-900/10 reveal-on-scroll">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="mb-16">
          <h2 class="text-3xl md:text-4xl font-light mb-6 text-stone-900 dark:text-white">Создатели проекта</h2>
          <div class="w-16 h-0.5 bg-mindqlab-calm-accent mb-8"></div>
          <p class="text-lg text-stone-500 dark:text-stone-400 max-w-3xl leading-relaxed">
            MindQLab родился на стыке практической психологии и современных технологий. Мы объединили наш опыт в
            области когнитивного развития с современными игровыми механиками.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Anastasia -->
          <div
            class="p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl flex flex-col sm:flex-row gap-8 items-center sm:items-start group transition-all duration-500 hover:shadow-xl hover:shadow-mindqlab-calm-accent/5">
            <div class="shrink-0 relative">
              <img src="/assets/images/profile.jpg" alt="Анастасия Виленская"
                class="w-32 h-32 rounded-2xl object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-0" />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-mindqlab-calm-accent rounded-lg flex items-center justify-center text-white text-xs">
                <i class="fas fa-brain"></i>
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-medium mb-1 text-stone-900 dark:text-white">Анастасия Виленская</h3>
              <div class="text-mindqlab-calm-accent text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Psychology &
                Content Lead</div>
              <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
                Формирует методологическую базу и смысловую архитектуру. Её экспертиза позволяет интегрировать глубинные
                психологические модели в интерактивный и поддерживающий формат.
              </p>
              <div class="flex gap-4">
                <a href="https://www.instagram.com/galactik.anastasia/" target="_blank"
                  class="text-stone-400 hover:text-mindqlab-calm-accent transition-colors"><i
                    class="fab fa-instagram"></i></a>
                <a href="#" class="text-stone-400 hover:text-mindqlab-calm-accent transition-colors"><i
                    class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>

          <!-- Igal -->
          <div
            class="p-8 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl flex flex-col sm:flex-row gap-8 items-center sm:items-start group transition-all duration-500 hover:shadow-xl hover:shadow-mindqlab-calm-accent/5">
            <div class="shrink-0 relative">
              <img src="/assets/images/igal.avif" alt="Игаль Виленский"
                class="w-32 h-32 rounded-2xl object-cover transition-all duration-700 blur-[0.5px] group-hover:blur-0" />
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-mindqlab-calm-accent-secondary rounded-lg flex items-center justify-center text-white text-xs">
                <i class="fas fa-code"></i>
              </div>
            </div>
            <div>
              <h3 class="text-2xl font-medium mb-1 text-stone-900 dark:text-white">Игаль Виленский</h3>
              <div class="text-mindqlab-calm-accent-secondary text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">
                Tech Lead & Architect</div>
              <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
                Реализует техническое видение платформы. Создает алгоритмы диагностики и игровые системы, превращая
                сложные идеи в интуитивные инструменты для пользователя.
              </p>
              <div class="flex gap-4">
                <a href="#" class="text-stone-400 hover:text-mindqlab-calm-accent-secondary transition-colors"><i
                    class="fab fa-github"></i></a>
                <a href="#" class="text-stone-400 hover:text-mindqlab-calm-accent-secondary transition-colors"><i
                    class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FINAL CTA -->
    <section class="py-32 text-center reveal-on-scroll">
      <div class="container mx-auto max-w-4xl px-6">
        <h2 class="text-3xl md:text-5xl font-light mb-8 italic text-stone-900 dark:text-white leading-tight">
          «Качественные инструменты делают путь к себе короче»
        </h2>
        <p class="text-lg text-stone-500 dark:text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Начните знакомство с собой через данные, которые мы помогаем собрать и осмыслить.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/space/tests"
            class="px-12 py-5 bg-mindqlab-calm-accent hover:bg-opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-mindqlab-calm-accent/20">
            Пройти тест
          </NuxtLink>
          <NuxtLink to="/space/brain-training"
            class="px-12 py-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-full font-medium transition-all duration-300 hover:bg-stone-50 dark:hover:bg-stone-800">
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
import { onMounted, ref } from "vue";
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
</style>
