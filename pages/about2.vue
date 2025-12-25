<template>
  <div
    class="min-h-screen bg-surface-50 dark:bg-brand-dark text-stone-800 dark:text-stone-200 transition-colors duration-500 relative selection:bg-brand-primary/30 selection:text-brand-dark overflow-hidden">

    <!-- Background Atmosphere -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-[20%] right-0 w-[800px] h-[800px] bg-brand-secondary/5 rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-[20%] left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"
        style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
      </div>
    </div>

    <!-- Main Content -->
    <!-- FIX: Reduced pt-24 to pt-12 for mobile -->
    <main class="relative z-10 pt-12 md:pt-24 pb-20">

      <!-- 1. Hero -->
      <section class="container mx-auto px-6 max-w-5xl text-center mb-16 md:mb-24">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-stone-800/60 backdrop-blur-md border border-stone-200 dark:border-stone-700 rounded-full mb-6 md:mb-8 animate-fade-up">
          <span class="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest font-montserrat">О
            MindQLab</span>
        </div>

        <h1
          class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark dark:text-white mb-6 font-montserrat tracking-tight leading-tight animate-fade-up animation-delay-100">
          Мы создаём инструменты для <br class="hidden md:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">осознанного
            роста.</span>
        </h1>

        <p
          class="text-base md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-open-sans animate-fade-up animation-delay-200">
          Психологические инструменты самопознания не должны быть сложными. Мы объединяем науку и дизайн, чтобы помочь
          вам лучше понимать себя.
        </p>
      </section>

      <!-- 2. The Story -->
      <section class="container mx-auto px-6 max-w-6xl mb-24">
        <div
          class="bg-white dark:bg-stone-900 rounded-[2rem] p-6 md:p-12 shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800">
          <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            <div class="lg:w-1/3">
              <h2 class="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-4 md:mb-6 font-montserrat">
                Как всё началось</h2>
              <div class="w-16 h-1 bg-brand-primary rounded-full"></div>
            </div>

            <div
              class="lg:w-2/3 space-y-6 text-stone-600 dark:text-stone-300 leading-relaxed font-open-sans text-sm md:text-base">
              <p>
                MindQLab родился из простой идеи: многие люди хотят развиваться, но не знают с чего начать, или
                сталкиваются с непонятными тестами и сухими теориями.
              </p>
              <p>
                В 2023 году психолог Анастасия и разработчик Игаль объединили свои знания. Мы хотели, чтобы процесс
                самопознания был не просто полезным, но и увлекательным — как хорошая игра, которая меняет жизнь.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. Mission & Vision (Bento Grid) -->
      <section class="container mx-auto px-6 max-w-6xl mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Mission -->
          <div
            class="bg-white dark:bg-stone-900 p-8 rounded-[2rem] border border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors">
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xl mb-6 relative z-10">
              <i class="fas fa-compass"></i>
            </div>
            <h3 class="text-xl font-bold text-brand-dark dark:text-white mb-3 font-montserrat relative z-10">Миссия</h3>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed relative z-10">
              Делать профессиональные инструменты психологии доступными каждому. Мы верим, что каждый человек
              заслуживает возможности развиваться в своём темпе.
            </p>
          </div>

          <!-- Vision -->
          <div
            class="bg-white dark:bg-stone-900 p-8 rounded-[2rem] border border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full blur-2xl group-hover:bg-brand-secondary/10 transition-colors">
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center text-xl mb-6 relative z-10">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h3 class="text-xl font-bold text-brand-dark dark:text-white mb-3 font-montserrat relative z-10">Видение
            </h3>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed relative z-10">
              Мир, где самопознание и личностный рост — это естественная часть жизни каждого человека, а не привилегия
              избранных.
            </p>
          </div>
        </div>
      </section>

      <!-- 4. Values (Replaces Stats) -->
      <section class="container mx-auto px-6 max-w-5xl mb-24">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white font-montserrat">Наши ценности</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div
              class="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-brand-primary text-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
              <i class="fas fa-flask"></i>
            </div>
            <h4 class="text-lg font-bold text-brand-dark dark:text-white mb-2 font-montserrat">Научность</h4>
            <p class="text-sm text-stone-600 dark:text-stone-400">Только проверенные методики и валидные тесты</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-brand-secondary text-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
              <i class="fas fa-heart"></i>
            </div>
            <h4 class="text-lg font-bold text-brand-dark dark:text-white mb-2 font-montserrat">Забота</h4>
            <p class="text-sm text-stone-600 dark:text-stone-400">Безопасное пространство для исследования себя</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-brand-accent text-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
              <i class="fas fa-rocket"></i>
            </div>
            <h4 class="text-lg font-bold text-brand-dark dark:text-white mb-2 font-montserrat">Инновации</h4>
            <p class="text-sm text-stone-600 dark:text-stone-400">Современные технологии на службе развития</p>
          </div>
        </div>
      </section>

      <!-- 5. Team (Local Images, Compact) -->
      <section class="container mx-auto px-6 max-w-5xl mb-24">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white font-montserrat mb-4">Команда</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <!-- Anastasia -->
          <div
            class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
            <!-- Local Image -->
            <div class="flex-shrink-0">
              <img src="/assets/images/profile.jpg" alt="Анастасия Виленская"
                class="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div class="text-center sm:text-left">
              <h3 class="text-lg font-bold text-brand-dark dark:text-white font-montserrat">Анастасия Виленская</h3>
              <div class="text-xs font-bold text-brand-secondary uppercase tracking-wide mb-3">Co-Founder, Психолог
              </div>
              <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
                Магистр психологии. Отвечает за научную часть платформы, разработку методик и контента.
              </p>
              <div class="flex justify-center sm:justify-start gap-3">
                <a href="#" class="text-stone-400 hover:text-brand-secondary transition-colors"><i
                    class="fab fa-linkedin text-lg"></i></a>
                <a href="#" class="text-stone-400 hover:text-brand-secondary transition-colors"><i
                    class="fab fa-instagram text-lg"></i></a>
              </div>
            </div>
          </div>

          <!-- Igal -->
          <div
            class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
            <!-- Local Image -->
            <div class="flex-shrink-0">
              <img src="/assets/images/igal.avif" alt="Игаль Виленский"
                class="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div class="text-center sm:text-left">
              <h3 class="text-lg font-bold text-brand-dark dark:text-white font-montserrat">Игаль Виленский</h3>
              <div class="text-xs font-bold text-brand-primary uppercase tracking-wide mb-3">Co-Founder, Tech Lead</div>
              <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
                Full-stack разработчик. Превращает психологические концепции в интуитивные интерфейсы.
              </p>
              <div class="flex justify-center sm:justify-start gap-3">
                <a href="#" class="text-stone-400 hover:text-brand-primary transition-colors"><i
                    class="fab fa-linkedin text-lg"></i></a>
                <a href="#" class="text-stone-400 hover:text-brand-primary transition-colors"><i
                    class="fab fa-github text-lg"></i></a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- 6. Footer CTA -->
      <section class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-6 font-montserrat">Хотите узнать
          больше?</h2>
        <p class="text-stone-600 dark:text-stone-300 mb-8 max-w-lg mx-auto">
          Свяжитесь с нами или попробуйте платформу прямо сейчас.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/space/tests"
            class="px-8 py-4 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
            Начать бесплатно
          </NuxtLink>
          <NuxtLink to="/contact"
            class="px-8 py-4 bg-transparent border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-white rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-all">
            Связаться с нами
          </NuxtLink>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";

definePageMeta({
  layout: "index2",
});

useHead({
  title: "О нас | MindQ Lab",
  meta: [
    { name: "description", content: "MindQ Lab — инновационная платформа для исследования сознания и личностного роста. Узнайте о нашей команде, миссии и ценностях." },
  ],
});
</script>

<style scoped>
.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-2000 {
  animation-delay: 2000ms;
}

.animation-delay-4000 {
  animation-delay: 4000ms;
}
</style>

