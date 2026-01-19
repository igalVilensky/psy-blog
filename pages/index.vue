<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-mindqlab-calm-text dark:text-mindqlab-calm-dark-text font-sans transition-colors duration-500 overflow-x-hidden">

    <!-- NAVIGATION (Simple) -->
    <nav
      class="fixed top-0 inset-x-0 z-50 bg-mindqlab-calm-bg/80 dark:bg-mindqlab-calm-dark-bg/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-800/50 transition-all duration-300">
      <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-light tracking-wide flex items-center gap-2">
          <span class="font-medium">MindQLab</span>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-400">
          <NuxtLink to="#method" class="hover:text-mindqlab-calm-accent transition-colors">Метод</NuxtLink>
          <NuxtLink to="#system-layers" class="hover:text-mindqlab-calm-accent transition-colors">Система</NuxtLink>
          <NuxtLink to="#pricing" class="hover:text-mindqlab-calm-accent transition-colors">Тарифы</NuxtLink>
          <div class="flex items-center gap-4 ml-4">
            <button @click="toggleTheme"
              class="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-mindqlab-calm-accent transition-colors">
              <i v-if="isDark" class="fas fa-sun"></i>
              <i v-else class="fas fa-moon"></i>
            </button>
            <button @click="handleAuth"
              class="px-5 py-2 rounded-full border border-stone-200 dark:border-stone-700 hover:border-mindqlab-calm-accent hover:text-mindqlab-calm-accent transition-all">
              Войти</button>
          </div>
        </div>
        <!-- Mobile Controls -->
        <div class="flex md:hidden items-center gap-4">
          <button @click="toggleTheme"
            class="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:text-mindqlab-calm-accent transition-colors">
            <i v-if="isDark" class="fas fa-sun"></i>
            <i v-else class="fas fa-moon"></i>
          </button>
          <button @click="handleAuth"
            class="px-4 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 text-xs font-medium hover:border-mindqlab-calm-accent hover:text-mindqlab-calm-accent transition-all">
            Войти</button>
        </div>
      </div>
    </nav>

    <!-- 1. HERO SECTION (Reframed Positioning) -->
    <header
      class="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[85vh]">
      <!-- Calm Motion Background -->
      <div class="absolute inset-0 z-0 overflow-hidden opacity-40 dark:opacity-20 pointer-events-none">
        <div
          class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-mindqlab-calm-accent/20 rounded-full blur-[100px] animate-float-delayed">
        </div>
        <div
          class="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-mindqlab-calm-accent-secondary/20 rounded-full blur-[120px] animate-slow-float">
        </div>
      </div>

      <!-- Node Movement Animation -->
      <div class="absolute inset-0 z-0 opacity-70 dark:opacity-30">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h1 class="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-[1.15] animate-fade-up">
          Система персонального развития<br class="hidden md:block" /> на основе диагностики и прогресса
        </h1>
        <p class="text-lg md:text-xl text-stone-500 dark:text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
          style="animation-delay: 100ms">
          Платформа трансформирует самонаблюдение в понятные данные и конкретные шаги для роста мышления и устойчивости.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
          style="animation-delay: 200ms">
          <NuxtLink to="/space/tests"
            class="px-8 py-4 bg-mindqlab-calm-accent hover:bg-opacity-90 text-white rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-mindqlab-calm-accent/30 hover:-translate-y-0.5">
            Начать с первичной диагностики
          </NuxtLink>
          <NuxtLink to="#method"
            class="px-8 py-4 bg-transparent border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full text-lg font-medium transition-all text-stone-600 dark:text-stone-300">
            Узнать о методе
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 2. VALUE PROPOSITION (Post-Diagnostics) -->
    <section class="py-24 bg-white dark:bg-stone-800/20 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-light mb-4">Что вы получите сразу?</h2>
          <p class="text-stone-500 dark:text-stone-400">Результат первого шага — ясность и план действий.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Item 1 -->
          <div class="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/50">
            <div class="text-4xl mb-4 text-mindqlab-calm-accent"><i class="fas fa-fingerprint"></i></div>
            <h3 class="text-xl font-medium mb-2">Профиль состояния</h3>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Карта ваших когнитивных и эмоциональных паттернов, а не просто набор баллов.
            </p>
          </div>

          <!-- Item 2 -->
          <div class="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/50">
            <div class="text-4xl mb-4 text-mindqlab-calm-accent-secondary"><i class="fas fa-align-left"></i></div>
            <h3 class="text-xl font-medium mb-2">Ключевые интерпретации</h3>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Понятное объяснение: почему вы чувствуете усталость, теряете фокус или тревожитесь.
            </p>
          </div>

          <!-- Item 3 -->
          <div class="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800/50">
            <div class="text-4xl mb-4 text-emerald-400"><i class="fas fa-route"></i></div>
            <h3 class="text-xl font-medium mb-2">Первые рекомендации</h3>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Приоритетные направления развития и конкретные практики для старта.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. METHOD (5-Step Cycle) -->
    <section id="method" class="py-24 bg-stone-50/50 dark:bg-stone-900/30 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-light mb-4">Метод MindQLab: Цикл развития</h2>
          <p class="text-stone-500 dark:text-stone-400">Пять этапов осознанного роста</p>
        </div>

        <div class="relative">
          <!-- Connector Line (Desktop) -->
          <div class="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-800 z-0">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
            <!-- Step 1 -->
            <div class="flex flex-col items-center text-center group relative z-10 step-item">
              <div
                class="step-circle w-20 h-20 rounded-full bg-white dark:bg-stone-900 border-4 border-stone-100 dark:border-stone-800 text-stone-400 flex items-center justify-center mb-6 text-2xl transition-all duration-500">
                <span class="font-bold text-lg">01</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Диагностика</h3>
              <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">Сбор данных о когнитивных и
                поведенческих паттернах.</p>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center text-center group relative z-10 step-item">
              <div
                class="step-circle w-20 h-20 rounded-full bg-white dark:bg-stone-900 border-4 border-stone-100 dark:border-stone-800 text-stone-400 flex items-center justify-center mb-6 text-2xl transition-all duration-500">
                <span class="font-bold text-lg">02</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Понимание</h3>
              <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">Интерпретация результатов в
                понятную модель личности.</p>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center text-center group relative z-10 step-item">
              <div
                class="step-circle w-20 h-20 rounded-full bg-white dark:bg-stone-900 border-4 border-stone-100 dark:border-stone-800 text-stone-400 flex items-center justify-center mb-6 text-2xl transition-all duration-500">
                <span class="font-bold text-lg">03</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Направления</h3>
              <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">Выбор вектора развития на основе
                слабых и сильных сторон.</p>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-col items-center text-center group relative z-10 step-item">
              <div
                class="step-circle w-20 h-20 rounded-full bg-white dark:bg-stone-900 border-4 border-stone-100 dark:border-stone-800 text-stone-400 flex items-center justify-center mb-6 text-2xl transition-all duration-500">
                <span class="font-bold text-lg">04</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Практика</h3>
              <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">Целенаправленные тренировки и
                упражнения для развития навыков.</p>
            </div>

            <!-- Step 5 -->
            <div class="flex flex-col items-center text-center group relative z-10 step-item">
              <div
                class="step-circle w-20 h-20 rounded-full bg-white dark:bg-stone-900 border-4 border-stone-100 dark:border-stone-800 text-stone-400 flex items-center justify-center mb-6 text-2xl transition-all duration-500">
                <span class="font-bold text-lg">05</span>
              </div>
              <h3 class="text-lg font-medium mb-2">Осмысление</h3>
              <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">Анализ прогресса и повторная оценка
                для коррекции пути.</p>
            </div>
          </div>
        </div>

        <!-- Micro Example -->
        <div
          class="mt-16 mx-auto max-w-3xl bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-100 dark:border-stone-700/50 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-mindqlab-calm-accent to-emerald-400"></div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-stone-400 mb-3 ml-2">Живой пример цикла</h4>
          <div class="flex flex-col md:flex-row gap-4 items-start md:items-center text-sm ml-2">
            <div class="flex-1">
              <span class="font-medium text-stone-800 dark:text-stone-200">Система выявила усталость внимания</span>
            </div>
            <div class="hidden md:block text-stone-300"><i class="fas fa-arrow-right"></i></div>
            <div class="flex-1">
              <span class="font-medium text-stone-800 dark:text-stone-200">Рекомендован трек «Когнитивная
                выносливость»</span>
            </div>
            <div class="hidden md:block text-stone-300"><i class="fas fa-arrow-right"></i></div>
            <div class="flex-1">
              <span class="font-medium text-stone-800 dark:text-stone-200">Через 2 недели ретест показал +15% к
                фокусу</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. TOOLS LAYERS (Regrouped) -->
    <section id="system-layers" class="py-24 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="text-center mb-12">
          <p class="text-stone-500 dark:text-stone-400 mb-2">Ниже — как этот метод реализован внутри продукта.</p>
          <h2 class="text-3xl font-light">Архитектура Системы</h2>
        </div>

        <div class="space-y-4">
          <!-- Layer 1 -->
          <div
            class="layer-item flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-mindqlab-calm-accent/40 transition-colors">
            <div
              class="layer-icon w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 md:mr-6 mb-4 md:mb-0 shrink-0 transition-colors duration-300">
              <i class="fas fa-stethoscope"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1">Диагностический модуль</h4>
              <p class="text-sm text-stone-500 dark:text-stone-400">Выявляет реальные поведенческие паттерны, скрытые от
                обычного наблюдения.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wider text-stone-400 md:ml-6 mt-4 md:mt-0">Этап 1</div>
          </div>

          <!-- Layer 2 -->
          <div
            class="layer-item flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-mindqlab-calm-accent/40 transition-colors">
            <div
              class="layer-icon w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 md:mr-6 mb-4 md:mb-0 shrink-0 transition-colors duration-300">
              <i class="fas fa-fingerprint"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1">Аналитическое ядро</h4>
              <p class="text-sm text-stone-500 dark:text-stone-400">Превращает сырые данные в понятную карту вашей
                личности и объясняет причины реакций.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wider text-stone-400 md:ml-6 mt-4 md:mt-0">Этап 2</div>
          </div>

          <!-- Layer 3 -->
          <div
            class="layer-item flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-mindqlab-calm-accent/40 transition-colors">
            <div
              class="layer-icon w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 md:mr-6 mb-4 md:mb-0 shrink-0 transition-colors duration-300">
              <i class="fas fa-compass"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1">Система рекомендаций</h4>
              <p class="text-sm text-stone-500 dark:text-stone-400">Отсеивает лишнее и предлагает только те векторы
                развития, которые актуальны для вас сейчас.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wider text-stone-400 md:ml-6 mt-4 md:mt-0">Этап 3</div>
          </div>

          <!-- Layer 4 -->
          <div
            class="layer-item flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-mindqlab-calm-accent/40 transition-colors">
            <div
              class="layer-icon w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 md:mr-6 mb-4 md:mb-0 shrink-0 transition-colors duration-300">
              <i class="fas fa-dumbbell"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1">Лаборатория навыков</h4>
              <p class="text-sm text-stone-500 dark:text-stone-400">Тренирует конкретные когнитивные мышцы (память,
                внимание, контроль) через регулярные практики.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wider text-stone-400 md:ml-6 mt-4 md:mt-0">Этап 4</div>
          </div>

          <!-- Layer 5 -->
          <div
            class="layer-item flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-mindqlab-calm-accent/40 transition-colors">
            <div
              class="layer-icon w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 md:mr-6 mb-4 md:mb-0 shrink-0 transition-colors duration-300">
              <i class="fas fa-history"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1">Мониторинг прогресса</h4>
              <p class="text-sm text-stone-500 dark:text-stone-400">Фиксирует реальные изменения через ретесты,
                микро-маркеры поведения и динамику профиля.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wider text-stone-400 md:ml-6 mt-4 md:mt-0">Этап 5</div>
          </div>

          <!-- Layer 6 (Professional) -->
          <div
            class="layer-item flex flex-col md:flex-row items-center p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 hover:border-indigo-500/40 transition-colors">
            <div
              class="layer-icon w-12 h-12 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 md:mr-6 mb-4 md:mb-0 shrink-0 transition-colors duration-300 shadow-sm">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="font-medium text-lg mb-1 text-slate-900 dark:text-white">Панель для специалистов</h4>
              <p class="text-sm text-indigo-900/60 dark:text-indigo-300/60">Позволяет коучам и психологам управлять
                клиентами, видеть их прогресс и результаты в реальном времени.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wider text-indigo-500 md:ml-6 mt-4 md:mt-0">Professional</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. COACH & PROFESSIONAL TOOLS -->
    <section class="py-24 bg-indigo-50/20 dark:bg-indigo-950/20 reveal-on-scroll border-y border-indigo-100/50 dark:border-indigo-900/30">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 space-y-6">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Для специалистов</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-light leading-tight">Инструменты для эффективного <span class="text-indigo-600 dark:text-indigo-400 italic">сопровождения</span></h2>
            <p class="text-stone-600 dark:text-stone-400 leading-relaxed">
              Мы разработали специальный функционал для коучей, тренеров и психологов. Теперь вы можете не только рекомендовать упражнения, но и отслеживать динамику ваших клиентов в единой панели.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <i class="fas fa-check text-[10px]"></i>
                </div>
                <div>
                  <h4 class="font-medium text-sm">Управление клиентами</h4>
                  <p class="text-xs text-stone-500">Приглашайте клиентов через персональные ссылки и ведите свою базу в удобном интерфейсе.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <i class="fas fa-check text-[10px]"></i>
                </div>
                <div>
                  <h4 class="font-medium text-sm">Прозрачная аналитика</h4>
                  <p class="text-xs text-stone-500">Визуализация прогресса, результаты тестов и уровень вовлеченности каждого клиента.</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex-1 relative">
            <div class="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>
            <div class="relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Preview</div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white">Панель Коуча</h3>
                </div>
                <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                  <i class="fas fa-users-cog"></i>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center px-4 gap-4">
                  <div class="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                  <div class="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div class="ml-auto w-12 h-2 bg-indigo-200 dark:bg-indigo-900/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. APPROACH & CREDIBILITY -->
    <section class="py-24 bg-stone-50/50 dark:bg-stone-900/30 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-3xl font-light mb-8">Подход и принципы</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="text-left">
            <h4 class="text-lg font-medium mb-2">Научная база, не магия</h4>
            <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">Мы опираемся на когнитивные модели и
              поведенческую психологию. Наш метод — это структурированная работа с вниманием и привычками, а не поиск
              волшебной таблетки.</p>
          </div>
          <div class="text-left">
            <h4 class="text-lg font-medium mb-2">Инструмент, а не замена</h4>
            <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">Платформа не заменяет терапию. Мы
              фокусируемся на развитии навыков саморегуляции и мышления, которые помогают в повседневной жизни.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- 6. PRICING -->
    <section id="pricing" class="py-24 border-y border-stone-100 dark:border-stone-800/50 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-5xl text-center">
        <h2 class="text-3xl font-light mb-4">Выберите формат участия</h2>
        <p class="text-stone-500 dark:text-stone-400 mb-12">Прозрачные условия для доступа к системе развития.</p>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Free -->
          <div
            class="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col items-center">
            <h3 class="font-medium text-lg mb-2">Старт</h3>
            <div class="text-3xl font-light mb-6">Бесплатно</div>
            <ul class="text-sm text-stone-500 space-y-3 mb-8 w-full text-left">
              <li class="flex gap-2"><i class="fas fa-check text-green-500 text-xs mt-1"></i> Первичная диагностика
              </li>
              <li class="flex gap-2"><i class="fas fa-check text-green-500 text-xs mt-1"></i> Базовые практики</li>
            </ul>
            <NuxtLink to="/register"
              class="mt-auto px-6 py-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors w-full">
              Пройти стартовый профиль</NuxtLink>
          </div>

          <!-- Popular -->
          <div
            class="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-mindqlab-calm-accent dark:border-mindqlab-calm-accent/50 shadow-xl shadow-mindqlab-calm-accent/5 flex flex-col items-center relative scale-105 z-10">
            <div
              class="absolute top-0 -translate-y-1/2 bg-mindqlab-calm-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Популярный для роста</div>
            <h3 class="font-medium text-lg mb-2">Практик</h3>
            <div class="text-3xl font-light mb-6">490₽ <span class="text-sm text-stone-400">/ мес</span></div>
            <ul class="text-sm text-stone-500 space-y-3 mb-8 w-full text-left">
              <li class="flex gap-2"><i class="fas fa-check text-mindqlab-calm-accent text-xs mt-1"></i> Полный доступ к
                Центру Развития</li>
              <li class="flex gap-2"><i class="fas fa-check text-mindqlab-calm-accent text-xs mt-1"></i> Глубокая
                диагностика</li>
              <li class="flex gap-2"><i class="fas fa-check text-mindqlab-calm-accent text-xs mt-1"></i> Аналитика
                прогресса</li>
            </ul>
            <button
              class="mt-auto px-6 py-2 rounded-lg bg-mindqlab-calm-accent text-white hover:bg-opacity-90 transition-colors w-full font-medium">Выбрать
              план</button>
          </div>

          <!-- Pro -->
          <div
            class="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col items-center">
            <h3 class="font-medium text-lg mb-2">Навсегда</h3>
            <div class="text-3xl font-light mb-6">9990₽</div>
            <ul class="text-sm text-stone-500 space-y-3 mb-8 w-full text-left">
              <li class="flex gap-2"><i class="fas fa-check text-green-500 text-xs mt-1"></i> Доступ навсегда</li>
              <li class="flex gap-2"><i class="fas fa-check text-green-500 text-xs mt-1"></i> Приоритетная поддержка
              </li>
            </ul>
            <button
              class="mt-auto px-6 py-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors w-full">Купить
              доступ</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. KNOWLEDGE & BLOG -->
    <section class="py-24 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-light mb-2">База знаний</h2>
            <p class="text-stone-500 dark:text-stone-400">Материалы для понимания метода</p>
          </div>
          <div class="flex gap-4">
            <NuxtLink to="/blog" class="text-mindqlab-calm-accent hover:underline text-sm font-medium">Все статьи
            </NuxtLink>
          </div>
        </div>

        <!-- Simplified Blog Grid -->
        <div class="grid md:grid-cols-2 gap-8">
          <template v-if="latestPosts && latestPosts.length > 0">
            <article v-for="post in latestPosts.slice(0, 2)" :key="post._id" class="group cursor-pointer">
              <div class="aspect-[16/9] bg-stone-100 dark:bg-stone-800 rounded-2xl overflow-hidden mb-4 relative">
                <nuxt-img v-if="post.image" :src="urlFor(post.image).width(400).height(225).url()"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 class="text-xl font-medium mb-2 group-hover:text-mindqlab-calm-accent transition-colors">{{ post.title
              }}</h3>
              <NuxtLink :to="`/blog/${post.slug.current}`" class="text-sm text-stone-500 hover:underline">Читать сейчас
              </NuxtLink>
            </article>
          </template>
          <div v-else class="col-span-2 text-center text-stone-400 py-12 bg-stone-50 dark:bg-stone-900 rounded-2xl">
            Пока нет статей
          </div>
        </div>
      </div>
    </section>

    <!-- 8. FAQ -->
    <section class="py-24 bg-stone-50 dark:bg-stone-900 reveal-on-scroll">
      <div class="container mx-auto px-6 max-w-3xl">
        <h2 class="text-3xl font-light mb-12 text-center">Частые вопросы</h2>
        <div class="space-y-4">
          <details
            class="group bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 overflow-hidden"
            v-for="(item, i) in faq" :key="i">
            <summary
              class="flex justify-between items-center p-6 cursor-pointer font-medium select-none list-none text-stone-800 dark:text-stone-200">
              <span>{{ item.q }}</span>
              <span class="transition-transform duration-300 group-open:rotate-180 text-stone-400"><i
                  class="fas fa-chevron-down"></i></span>
            </summary>
            <div
              class="px-6 pb-6 text-stone-500 dark:text-stone-400 text-sm leading-relaxed border-t border-stone-100 dark:border-stone-700/50 pt-4">
              {{ item.a }}
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- 9. FOOTER -->
    <Footer class="reveal-on-scroll" />

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// Auto-imports are used for useSeoMeta and useRouter
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme"; // Import theme store
import CursorNeuralVisualizer from '~/components/space/CursorNeuralVisualizer.vue';
import Footer from "~/components/ui/Footer.vue";

// Disable layout inheritance to have full control
definePageMeta({
  layout: "empty",
});

const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();

// Auth Logic
const handleAuth = () => {
  if (authStore.user) {
    router.push('/space/dashboard');
  } else {
    router.push('/login');
  }
};

// Theme Logic
const isDark = computed(() => themeStore.theme === 'dark');
const toggleTheme = () => {
  themeStore.toggleTheme();
};

onMounted(() => {
  // Force scroll to top
  window.scrollTo(0, 0);

  themeStore.initTheme();
});

// FAQ Data
const faq = [
  { q: "Как именно MindQLab со мной работает?", a: "Мы используем 5-этапный цикл: диагностика состояния, формирование понимания, выбор трека развития, практика навыков и анализ прогресса." },
  { q: "Что происходит после тестов?", a: "Система формирует ваш профиль и рекомендует конкретные упражнения для зон, требующих внимания." },
  { q: "Как формируется прогресс?", a: "Мы отслеживаем динамику изменений через повторные микро-замеры и результаты выполнения практик." },
  { q: "Это заменяет психолога?", a: "Нет, MindQLab — это инструмент для развития когнитивных и эмоциональных навыков, который может отлично дополнять работу со специалистом, но не заменяет её." },
  { q: "Можно ли попробовать бесплатно?", a: "Да, вы можете пройти первичную диагностику и получить базовый профиль бесплатно." }
];

// Blog Data 
const posts = ref([]);
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

const { data: fetchedPosts } = await useAsyncData("posts-landing-2", fetchPosts);
posts.value = Array.isArray(fetchedPosts.value) ? fetchedPosts.value : [];
const latestPosts = computed(() => posts.value.slice(0, 2));

useSeoMeta({
  title: 'MindQLab — Система персонального развития',
  description: 'Платформа для диагностики, понимания и развития мышления. Структурированный подход к личной эффективности.',
});

// Animations on Scroll
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Step Highlighting on Scroll (Mobile)
  const stepObserverOptions = {
    threshold: 0.5,
    rootMargin: "-40% 0px -40% 0px" // Creates a narrow active strip in the center of the viewport
  };

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Step Circles Highlight
        const circle = entry.target.querySelector('.step-circle');
        if (circle) {
          circle.classList.add('border-mindqlab-calm-accent', 'text-mindqlab-calm-accent');
          circle.classList.remove('border-stone-100', 'dark:border-stone-800', 'text-stone-400');
        }
        // Layer Icons Highlight
        const icon = entry.target.querySelector('.layer-icon');
        if (icon) {
          icon.classList.remove('bg-stone-100', 'dark:bg-stone-800', 'text-stone-600', 'dark:text-stone-300');
          icon.classList.add('bg-mindqlab-calm-accent', 'text-white');
        }
      } else {
        // Remove highlight
        const circle = entry.target.querySelector('.step-circle');
        if (circle) {
          circle.classList.remove('border-mindqlab-calm-accent', 'text-mindqlab-calm-accent');
          circle.classList.add('border-stone-100', 'dark:border-stone-800', 'text-stone-400');
        }
        const icon = entry.target.querySelector('.layer-icon');
        if (icon) {
          icon.classList.remove('bg-mindqlab-calm-accent', 'text-white');
          icon.classList.add('bg-stone-100', 'dark:bg-stone-800', 'text-stone-600', 'dark:text-stone-300');
        }
      }
    });
  }, stepObserverOptions);

  document.querySelectorAll('.step-item, .layer-item').forEach(el => {
    stepObserver.observe(el);
  });
});
</script>

<style scoped>
/* Keyframes for soft animations */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes slowFloat {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.2;
  }

  50% {
    transform: translate(20px, -20px) rotate(5deg);
    opacity: 0.3;
  }
}

.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeUp {
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
