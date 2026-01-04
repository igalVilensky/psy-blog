<template>
  <div
    class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/40 font-sans">

    <!-- 1. HERO SECTION -->
    <header
      class="relative min-h-[95vh] flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
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
          <span class="brand-name-animated flex justify-center cursor-default select-none mb-6 gap-3 md:gap-4 lg:gap-5">
            <span v-for="(letter, index) in 'MindQLab'" :key="index"
              class="relative inline-grid place-items-center group/letter">
              <!-- Phantom letter to hold space -->
              <span class="invisible pointer-events-none tracking-widest text-4xl md:text-6xl lg:text-7xl">{{ letter
              }}</span>
              <!-- Gentle Animated Letter -->
              <span
                class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out group-hover/letter:-translate-y-1.5 text-slate-800 dark:text-white group-hover/letter:text-cyan-600 dark:group-hover/letter:text-cyan-400">
                <span class="relative z-10">
                  {{ letter }}
                </span>
                <!-- Minimalist Indicator -->
                <span
                  class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover/letter:opacity-100 group-hover/letter:translate-y-2 transition-all duration-1000 ease-in-out blur-[1px]"></span>
              </span>
            </span>
          </span>
          <span
            class="block mt-4 text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white">
            Центр осознанного развития
          </span>
        </h1>

        <p
          class="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-16 font-light leading-relaxed drop-shadow-sm">
          Системный подход к развитию <span class="font-medium text-cyan-600 dark:text-cyan-400">памяти, внимания</span>
          и <span class="font-medium text-purple-600 dark:text-purple-400">эмоционального интеллекта</span>.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink to="/space/brain-training"
            class="group relative px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 overflow-hidden">
            <div
              class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]">
            </div>
            <span class="relative flex items-center gap-3">
              <i class="fas fa-brain animate-pulse"></i>
              Тренировать мозг
            </span>
          </NuxtLink>
          <NuxtLink to="/space"
            class="group px-10 py-5 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 hover:bg-white/20 dark:hover:bg-slate-900/60 rounded-2xl font-bold text-lg transition-all duration-300 text-slate-900 dark:text-white">
            Открыть MindQLab
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <i class="fas fa-chevron-down text-xl"></i>
      </div>
    </header>


    <!-- 2. CORE DOMAINS OF THE PLATFORM -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="mb-20 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-light mb-6">Основные направления развития</h2>
          <div class="w-20 h-0.5 bg-indigo-500 mb-8"></div>
          <p class="text-lg text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Развитие личности — это многогранный процесс. На платформе вы работаете с четырьмя взаимосвязанными
            областями,
            которые формируют ваш когнитивный и эмоциональный профиль.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <!-- Thinking -->
          <div class="reveal-on-scroll flex flex-col group">
            <div
              class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
              <i class="fas fa-brain text-xl"></i>
            </div>
            <h3 class="text-2xl font-medium mb-4">Мышление и когнитивные функции</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Развитие памяти, внимания, логики и гибкости мышления. Это инструменты, которые позволяют быстрее
              обрабатывать информацию
              и принимать качественные решения в повседневной жизни.
            </p>
            <div class="text-sm font-medium text-indigo-500 dark:text-indigo-400">
              Инструменты: Интерактивные упражнения, тренажеры внимания, игры на логику.
            </div>
          </div>

          <!-- Psychology -->
          <div class="reveal-on-scroll flex flex-col group" style="transition-delay: 100ms">
            <div
              class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
              <i class="fas fa-user-shield text-xl"></i>
            </div>
            <h3 class="text-2xl font-medium mb-4">Психология и поведенческие паттерны</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Изучение механизмов поведения, работа с установками и эмоциональным интеллектом. Понимание того, почему мы
              поступаем
              так или иначе, является ключом к осознанным изменениям.
            </p>
            <div class="text-sm font-medium text-indigo-500 dark:text-indigo-400">
              Инструменты: Тесты личности, теоретические модели, техники самоанализа.
            </div>
          </div>

          <!-- Meditation -->
          <div class="reveal-on-scroll flex flex-col group" style="transition-delay: 200ms">
            <div
              class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-500 mb-6 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500">
              <i class="fas fa-spa text-xl"></i>
            </div>
            <h3 class="text-2xl font-medium mb-4">Медитация и осознанность</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Практики управления вниманием и эмоциональным состоянием. Тренировка навыка присутствия «здесь и сейчас»
              позволяет снизить уровень стресса и улучшить контакт с реальностью.
            </p>
            <div class="text-sm font-medium text-indigo-500 dark:text-indigo-400">
              Инструменты: Аудио-практики, упражнения на дыхание, дневник осознанности.
            </div>
          </div>

          <!-- Growth -->
          <div class="reveal-on-scroll flex flex-col group" style="transition-delay: 300ms">
            <div
              class="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
              <i class="fas fa-seedling text-xl"></i>
            </div>
            <h3 class="text-2xl font-medium mb-4">Саморазвитие и личный рост</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Система планирования, отслеживания привычек и работы с жизненными целями. Структурирование знаний о себе
              превращает абстрактное развитие в конкретные шаги.
            </p>
            <div class="text-sm font-medium text-indigo-500 dark:text-indigo-400">
              Инструменты: Панель мониторинга прогресса, курсы, сообщество практиков.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. WHY THIS SYSTEM WORKS -->
    <section class="py-24 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="mb-16 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-light mb-4">Системный подход к росту</h2>
          <p class="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Вместо разрозненных приложений мы предлагаем единую экосистему для всесторонней работы над собой.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(advantage, i) in advantages" :key="i"
            class="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl reveal-on-scroll"
            :style="{ transitionDelay: `${i * 50}ms` }">
            <div
              class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 mb-6">
              <i :class="advantage.icon"></i>
            </div>
            <h4 class="text-lg font-medium mb-3">{{ advantage.title }}</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ advantage.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. LABORATORY & TOOLS OVERVIEW -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50 overflow-hidden">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="reveal-on-scroll">
            <h2 class="text-3xl md:text-4xl font-light mb-8">Инструментарий MindQLab</h2>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Платформа построена по модульному принципу. Вы сами выбираете глубину, направление и темп
              освоения инструментов.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="(tool, i) in labTools" :key="i" class="flex items-start gap-4">
                <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-indigo-500">
                  <i :class="tool.icon" class="text-sm"></i>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-slate-900 dark:text-white mb-0.5">{{ tool.name }}</h5>
                  <p class="text-[12px] text-slate-500 dark:text-slate-400 leading-tight">{{ tool.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative reveal-on-scroll">
            <div
              class="aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 flex items-center justify-center p-12 order-first lg:order-last">
              <!-- Visual representation of modularity -->
              <div class="relative w-full h-full flex items-center justify-center">
                <div
                  class="absolute w-3/4 h-3/4 border border-dashed border-slate-200 dark:border-slate-800 rounded-full animate-spin-slow">
                </div>
                <div class="absolute w-1/2 h-1/2 border border-slate-100 dark:border-slate-800 rounded-full"></div>
                <div class="grid grid-cols-2 gap-4 relative z-10 w-full">
                  <div v-for="i in 4" :key="i"
                    class="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm text-center">
                    <div class="w-8 h-8 rounded-lg bg-indigo-500/10 mx-auto mb-2"></div>
                    <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. PLATFORM STATISTICS -->
    <section class="py-24 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          <div v-for="(stat, i) in platformStats" :key="i" class="text-center reveal-on-scroll"
            :style="{ transitionDelay: `${i * 50}ms` }">
            <div class="text-3xl md:text-4xl font-light mb-2 tabular-nums">
              {{ stat.value }}<span class="text-indigo-500">+</span>
            </div>
            <div class="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium whitespace-nowrap">{{
              stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. PRICING SECTION -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-light mb-4">Варианты участия</h2>
          <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Мы предлагаем прозрачную систему доступа. Вы можете начать бесплатно
            или выбрать план, соответствующий вашим долгосрочным целям.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(plan, i) in pricingPlans" :key="i"
            class="flex flex-col p-8 rounded-2xl border transition-all duration-300 reveal-on-scroll"
            :class="plan.popular ? 'border-indigo-500 dark:border-indigo-500/50 bg-indigo-50/20 dark:bg-indigo-900/10 shadow-lg' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'"
            :style="{ transitionDelay: `${i * 50}ms` }">
            <div class="mb-4">
              <div v-if="plan.popular" class="text-[10px] uppercase font-bold tracking-widest text-indigo-500 mb-2">
                Рекомендуем</div>
              <h4 class="text-xl font-medium">{{ plan.name }}</h4>
            </div>
            <div class="mb-6 flex items-baseline gap-1">
              <span class="text-3xl font-light">{{ plan.price }}</span>
              <span v-if="plan.price !== 'Бесплатно'" class="text-slate-400 text-sm">₽</span>
            </div>
            <ul class="space-y-4 mb-10 flex-grow">
              <li v-for="(feature, fi) in plan.features" :key="fi"
                class="flex gap-3 text-sm text-slate-500 dark:text-slate-400 leading-tight">
                <i class="fas fa-check text-[10px] mt-1 text-indigo-500"></i>
                {{ feature }}
              </li>
            </ul>
            <NuxtLink :to="isLoggedIn ? '/space' : '/register'"
              class="w-full py-3 text-center rounded-lg text-sm font-medium transition-all duration-300"
              :class="plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'">
              {{ plan.cta }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. BLOG & KNOWLEDGE SECTION -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/20 dark:bg-slate-900/10">
      <div class="container mx-auto max-w-6xl px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 reveal-on-scroll">
          <div class="max-w-2xl">
            <h2 class="text-3xl md:text-4xl font-light mb-4">База знаний</h2>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed">
              Теоретические материалы и статьи экспертов MindQLab. Мы верим, что обучение — это неотъемлемая часть
              развития.
            </p>
          </div>
          <NuxtLink to="/blog"
            class="text-sm font-medium text-indigo-500 hover:text-indigo-400 transition-colors mt-6 md:mt-0 flex items-center gap-2">
            Все статьи <i class="fas fa-arrow-right text-[10px]"></i>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="(post, i) in latestPosts" :key="post._id || i"
            class="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 reveal-on-scroll"
            :style="{ transitionDelay: `${i * 100}ms` }">
            <div class="aspect-[16/9] bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <nuxt-img v-if="post.image" :src="urlFor(post.image).width(400).height(225).url()"
                :alt="post.title || 'Пост'"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width="400"
                height="225" loading="lazy" format="webp" quality="80"></nuxt-img>
              <div v-else class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span
                  class="px-2 py-1 bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-100 dark:border-slate-800">
                  {{ post.category || 'Статья' }}
                </span>
              </div>
            </div>
            <div class="p-6 flex flex-col flex-grow text-left">
              <h4
                class="text-lg font-medium mb-3 group-hover:text-indigo-500 transition-colors line-clamp-2 leading-snug text-slate-900 dark:text-white">
                {{ post.title }}</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow line-clamp-2 leading-relaxed">
                {{ post.title }}
              </p>
              <div class="text-[11px] text-slate-400 uppercase tracking-widest">
                {{ post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                  day: "numeric", month:
                    "short", year: "numeric"
                }) : "" }}
              </div>
            </div>
            <NuxtLink :to="post.slug?.current ? `/blog/${post.slug.current}` : '/blog'" class="absolute inset-0 z-10"
              :aria-label="post.title"></NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- 8. FAQ SECTION -->
    <section class="py-24 border-b border-slate-100 dark:border-slate-800/50">
      <div class="container mx-auto max-w-3xl px-6">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-light mb-4">Часто задаваемые вопросы</h2>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed">Краткие ответы на ключевые вопросы о платформе.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="(faq, i) in faqItems" :key="i"
            class="border-b border-slate-100 dark:border-slate-800/50 pb-6 reveal-on-scroll"
            :style="{ transitionDelay: `${i * 50}ms` }">
            <h5 class="text-lg font-medium mb-3 text-slate-900 dark:text-white leading-snug">{{ faq.q }}</h5>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. FINAL SECTION -->
    <footer class="py-32 text-center reveal-on-scroll">
      <div class="container mx-auto max-w-4xl px-6">
        <h2 class="text-3xl md:text-5xl font-light mb-8 italic text-slate-900 dark:text-white leading-tight">«Развитие —
          это осознанное движение навстречу собственному потенциалу»</h2>
        <p class="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Путь исследователя начинается с первого наблюдения. Платформа MindQLab предоставляет
          все необходимые инструменты для вашего путешествия к ясности ума и глубине осознания.
        </p>
        <NuxtLink to="/space"
          class="inline-block px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-xl shadow-indigo-200 dark:shadow-none">
          Начать работу с платформой
        </NuxtLink>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useSeoMeta } from '#app';
import { useHead } from "@unhead/vue";
import { useAuthStore } from "~/stores/auth";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import CursorNeuralVisualizer from '~/components/space/CursorNeuralVisualizer.vue';

// 1. Static Data Definitions
const advantages = [
  { title: 'Единая экосистема', text: 'Забудьте о разрозненных приложениях. Все аспекты развития личности в одном месте.', icon: 'fas fa-infinity' },
  { title: 'Регулярная практика', text: 'Короткие сессии по 10-15 минут позволяют внедрить развитие в плотный график.', icon: 'fas fa-calendar-check' },
  { title: 'Осознанный подход', text: 'Мы не обещаем мгновенных чудес. Мы предлагаем систему для долгосрочного роста.', icon: 'fas fa-eye' },
  { title: 'Гибкая модульность', text: 'Свободно переключайтесь между когнитивными играми и глубокой психологией.', icon: 'fas fa-puzzle-piece' },
  { title: 'Объективные метрики', text: 'Отслеживайте прогресс на основе реальных данных и результатов выполнения задач.', icon: 'fas fa-chart-line' },
  { title: 'Свобода доступа', text: 'Платформа доступна из любого браузера. Исследуйте себя там, где вам удобно.', icon: 'fas fa-globe' },
];

const labTools = [
  { name: 'Лаборатория', desc: 'Центр управления вашими исследовательскими станциями.', icon: 'fas fa-flask' },
  { name: 'Тесты и Оценка', desc: 'Измерение потенциала и выявление зон роста.', icon: 'fas fa-vials' },
  { name: 'Тренировка Мозга', desc: 'Упражнения для памяти, внимания и гибкости.', icon: 'fas fa-dumbbell' },
  { name: 'Психология', desc: 'Изучение паттернов и развитие эмоционального интеллекта.', icon: 'fas fa-book-open' },
  { name: 'Медитации', desc: 'Практики осознанности и управления состоянием.', icon: 'fas fa-spa' },
  { name: 'Центр Управления', desc: 'Личная аналитика и мониторинг достижений.', icon: 'fas fa-microchip' },
];

const platformStats = [
  { label: 'Тестов', value: '15' },
  { label: 'Игр', value: '25' },
  { label: 'Упражнений', value: '40' },
  { label: 'Практик', value: '20' },
  { label: 'Участников', value: '1000' },
  { label: 'Сессий', value: '5000' },
];

const pricingPlans = [
  { name: 'Бесплатный', price: '0', cta: 'Начать сейчас', features: ['Базовые тесты', '5 упражнений в день', 'Первичная аналитика', 'Доступ к блогу'] },
  { name: 'Месяц', price: '990', cta: 'Выбрать план', features: ['Безлимитный доступ', 'Все когнитивные игры', 'Полная аналитика', 'Психологические модули'] },
  { name: 'Год', price: '4990', popular: true, cta: 'Выбрать год', features: ['Все функции Месяца', 'Приоритетный доступ', 'Две недели в подарок', 'Отчет о прогрессе'] },
  { name: 'Навсегда', price: '9990', cta: 'Получить доступ', features: ['Пожизненный доступ', 'Все будущие обновления', 'Индивидуальные настройки', 'Прямая связь с Лабораторией'] },
];

const faqItems = [
  { q: 'Что дает платформа MindQLab?', a: 'Это система инструментов для изучения и улучшения работы вашего разума — от памяти и внимания до управления эмоциями и осознанности.' },
  { q: 'С чего лучше начать работу?', a: 'Мы рекомендуем начать с раздела «Тесты», чтобы сформировать базовое понимание вашего текущего профиля и зон роста.' },
  { q: 'Сколько времени нужно уделять занятиям?', a: 'Оптимально 10-15 минут в день. Главный секрет эффективности системы — в регулярности, а не длительности.' },
  { q: 'Это обучение, тренировка или практика?', a: 'Это комбинация всех трех подходов. Вы обучаетесь через статьи, тренируетесь в играх и внедряете навыки через практики.' },
  { q: 'Подходит ли платформа для любого уровня?', a: 'Да. Сложность большинства упражнений адаптируется под ваши результаты, обеспечивая зону ближайшего развития.' },
  { q: 'Можно ли пользоваться бесплатно?', a: 'Да, у нас есть бессрочный бесплатный тариф с доступом к базовому набор инструментов и статистике.' },
];

// 2. Auth & Apps
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);

// 3. SSR-safe Fetch (Pattern: blog/index.vue)
const posts = ref([]);
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

const { data: fetchedPosts } = await useAsyncData("posts-home-latest", fetchPosts);
posts.value = Array.isArray(fetchedPosts.value) ? fetchedPosts.value : [];

const latestPosts = computed(() => posts.value.slice(0, 3));

useSeoMeta({
  title: 'MindQLab — Платформа для развития мышления и осознанности',
  description: 'Единая экосистема для когнитивных исследований, психологического роста и медитативных практик. Научный подход к развитию личности.',
  ogTitle: 'MindQLab — Центр осознанного развития',
  ogType: 'website',
  robots: 'noindex, nofollow',
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.mindqlab.com#organization",
          "name": "MindQLab",
          "url": "https://www.mindqlab.com",
          "logo": "https://www.mindqlab.com/logo.png",
          "sameAs": [
            "https://www.instagram.com/galactik.anastasia/",
            "https://t.me/mindqlab",
            "https://www.youtube.com/@MindQLab",
            "https://www.linkedin.com/company/mindqlab",
            "https://www.facebook.com/people/MindQlab/61583775061278/"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "availableLanguage": ["en"]
            }
          ]
        },

        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.mindqlab.com#website",
          "name": "MindQLab",
          "url": "https://www.mindqlab.com",
          "inLanguage": "en",
          "publisher": {
            "@id": "https://www.mindqlab.com#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.mindqlab.com/search?q={query}",
            "query-input": "required name=query"
          }
        },

        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.mindqlab.com/#webpage",
          "url": "https://www.mindqlab.com",
          "name": "MindQLab — Home",
          "isPartOf": {
            "@id": "https://www.mindqlab.com#website"
          },
          "about": {
            "@id": "https://www.mindqlab.com#organization"
          }
        }
      ])
    }
  ]
})

// 4. Client-side Animations
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

.animate-spin-slow {
  animation: spin 60s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Typography refinements */
h1,
h2,
h3,
h4 {
  font-weight: 300;
  letter-spacing: -0.015em;
}

/* Hero Enhanced Styles */
.brand-name-animated {
  display: flex;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.dark .brand-name-animated {
  font-weight: 200;
}

/* Custom scrollbar for better feel */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f8fafc;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
