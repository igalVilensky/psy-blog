<template>
  <div
    class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white font-sans transition-colors duration-500">
    <!-- NAVIGATION -->
    <nav
      class="fixed  top-0 inset-x-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b-2 border-stone-900 dark:border-white">
      <div class="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-stone-900 dark:bg-white flex items-center justify-center">
            <i class="fas fa-flask text-white dark:text-stone-900 text-sm"></i>
          </div>
          <span class="font-bold text-stone-900 dark:text-white">MindQLab</span>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-6 text-sm font-semibold">
          <NuxtLink to="#method"
            class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Метод</NuxtLink>
          <NuxtLink to="#system-layers"
            class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Система</NuxtLink>
          <NuxtLink to="#pricing"
            class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            Тарифы</NuxtLink>
          <div class="flex items-center gap-4 ml-4">
            <button @click="toggleTheme"
              class="w-8 h-8 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
              <i v-if="isDark" class="fas fa-sun text-xs"></i>
              <i v-else class="fas fa-moon text-xs"></i>
            </button>
            <button @click="handleAuth"
              class="px-4 py-2 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-sm font-semibold transition-all">
              Войти
            </button>
          </div>
        </div>
        <!-- Mobile Controls -->
        <div class="flex md:hidden items-center gap-3">
          <button @click="toggleTheme"
            class="w-8 h-8 flex items-center justify-center text-stone-600 dark:text-stone-400">
            <i v-if="isDark" class="fas fa-sun text-xs"></i>
            <i v-else class="fas fa-moon text-xs"></i>
          </button>
          <button @click="handleAuth"
            class="px-3 py-1.5 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-xs font-semibold transition-all">
            Войти
          </button>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <header
      class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden min-h-[85vh] flex items-center justify-center">
      <!-- Background Visualization -->
      <div class="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white mb-6">
          Система персонального развития<br class="hidden md:block" /> на основе диагностики и прогресса
        </h1>
        <p class="text-stone-600 dark:text-stone-400 mb-10 max-w-2xl mx-auto text-base md:text-lg">
          Платформа трансформирует самонаблюдение в понятные данные и конкретные шаги для роста мышления и устойчивости.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink to="/space/tests"
            class="px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
            Начать с первичной диагностики
          </NuxtLink>
          <NuxtLink to="#method"
            class="px-8 py-3 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-sm font-semibold transition-all">
            Узнать о методе
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- VALUE PROPOSITION -->
    <section class="py-16 bg-white dark:bg-stone-900">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-4">Что вы получите сразу?</h2>
          <p class="text-stone-600 dark:text-stone-400">Результат первого шага — ясность и план действий.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Item 1 -->
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
              <i class="fas fa-fingerprint text-stone-900 dark:text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Профиль состояния</h3>
            <p class="text-sm text-stone-600 dark:text-stone-400">
              Карта ваших когнитивных и эмоциональных паттернов, а не просто набор баллов.
            </p>
          </div>

          <!-- Item 2 -->
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
              <i class="fas fa-align-left text-stone-900 dark:text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Ключевые интерпретации</h3>
            <p class="text-sm text-stone-600 dark:text-stone-400">
              Понятное объяснение: почему вы чувствуете усталость, теряете фокус или тревожитесь.
            </p>
          </div>

          <!-- Item 3 -->
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
              <i class="fas fa-route text-stone-900 dark:text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Первые рекомендации</h3>
            <p class="text-sm text-stone-600 dark:text-stone-400">
              Приоритетные направления развития и конкретные практики для старта.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- METHOD (5-Step Cycle) -->
    <section id="method" class="py-16 bg-stone-50/50 dark:bg-stone-900/30">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-4">Метод MindQLab: Цикл развития
          </h2>
          <p class="text-stone-600 dark:text-stone-400">Пять этапов осознанного роста</p>
        </div>

        <div class="relative">
          <!-- Connector Line (Desktop) -->
          <div class="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-800 z-0">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <!-- Step 1 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 flex items-center justify-center mb-4 text-sm font-bold text-stone-900 dark:text-white">
                01
              </div>
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Диагностика</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400">Сбор данных о когнитивных и поведенческих паттернах.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 flex items-center justify-center mb-4 text-sm font-bold text-stone-900 dark:text-white">
                02
              </div>
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Понимание</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400">Интерпретация результатов в понятную модель
                личности.</p>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 flex items-center justify-center mb-4 text-sm font-bold text-stone-900 dark:text-white">
                03
              </div>
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Направления</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400">Выбор вектора развития на основе слабых и сильных
                сторон.</p>
            </div>

            <!-- Step 4 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 flex items-center justify-center mb-4 text-sm font-bold text-stone-900 dark:text-white">
                04
              </div>
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Практика</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400">Целенаправленные тренировки и упражнения для
                развития навыков.</p>
            </div>

            <!-- Step 5 -->
            <div class="flex flex-col items-center text-center group relative z-10">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 flex items-center justify-center mb-4 text-sm font-bold text-stone-900 dark:text-white">
                05
              </div>
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Осмысление</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400">Анализ прогресса и повторная оценка для коррекции
                пути.</p>
            </div>
          </div>
        </div>

        <!-- Micro Example -->
        <div
          class="mt-12 mx-auto max-w-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <h4 class="text-sm font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-3">Живой пример
            цикла</h4>
          <div class="flex flex-col md:flex-row gap-4 items-start md:items-center text-sm">
            <div class="flex-1">
              <span class="font-semibold text-stone-900 dark:text-white">Система выявила усталость внимания</span>
            </div>
            <div class="hidden md:block text-stone-300"><i class="fas fa-arrow-right"></i></div>
            <div class="flex-1">
              <span class="font-semibold text-stone-900 dark:text-white">Рекомендован трек «Когнитивная
                выносливость»</span>
            </div>
            <div class="hidden md:block text-stone-300"><i class="fas fa-arrow-right"></i></div>
            <div class="flex-1">
              <span class="font-semibold text-stone-900 dark:text-white">Через 2 недели ретест показал +15% к
                фокусу</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TOOLS LAYERS -->
    <section id="system-layers" class="py-16">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="text-center mb-12">
          <p class="text-stone-600 dark:text-stone-400 mb-2">Ниже — как этот метод реализован внутри продукта.</p>
          <h2 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Архитектура Системы</h2>
        </div>

        <div class="space-y-4">
          <!-- Layer 1 -->
          <div
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i class="fas fa-stethoscope text-stone-900 dark:text-white"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-1">Диагностический модуль</h4>
              <p class="text-sm text-stone-600 dark:text-stone-400">Выявляет реальные поведенческие паттерны, скрытые от
                обычного наблюдения.</p>
            </div>
            <div
              class="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 md:ml-6 mt-4 md:mt-0">
              Этап 1</div>
          </div>

          <!-- Layer 2 -->
          <div
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i class="fas fa-fingerprint text-stone-900 dark:text-white"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-1">Аналитическое ядро</h4>
              <p class="text-sm text-stone-600 dark:text-stone-400">Превращает сырые данные в понятную карту вашей
                личности и объясняет причины реакций.</p>
            </div>
            <div
              class="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 md:ml-6 mt-4 md:mt-0">
              Этап 2</div>
          </div>

          <!-- Layer 3 -->
          <div
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i class="fas fa-compass text-stone-900 dark:text-white"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-1">Система рекомендаций</h4>
              <p class="text-sm text-stone-600 dark:text-stone-400">Отсеивает лишнее и предлагает только те векторы
                развития, которые актуальны для вас сейчас.</p>
            </div>
            <div
              class="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 md:ml-6 mt-4 md:mt-0">
              Этап 3</div>
          </div>

          <!-- Layer 4 -->
          <div
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i class="fas fa-dumbbell text-stone-900 dark:text-white"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-1">Лаборатория навыков</h4>
              <p class="text-sm text-stone-600 dark:text-stone-400">Тренирует конкретные когнитивные мышцы (память,
                внимание, контроль) через регулярные практики.</p>
            </div>
            <div
              class="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 md:ml-6 mt-4 md:mt-0">
              Этап 4</div>
          </div>

          <!-- Layer 5 -->
          <div
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i class="fas fa-history text-stone-900 dark:text-white"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-1">Мониторинг прогресса</h4>
              <p class="text-sm text-stone-600 dark:text-stone-400">Фиксирует реальные изменения через ретесты,
                микро-маркеры поведения и динамику профиля.</p>
            </div>
            <div
              class="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 md:ml-6 mt-4 md:mt-0">
              Этап 5</div>
          </div>

          <!-- Layer 6 (Professional) -->
          <div
            class="flex flex-col md:flex-row items-center p-6 bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-white">
            <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i class="fas fa-user-tie text-stone-900 dark:text-white"></i>
            </div>
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-1">Панель для специалистов</h4>
              <p class="text-sm text-stone-600 dark:text-stone-400">Позволяет коучам и психологам управлять клиентами,
                видеть их прогресс и результаты в реальном времени.</p>
            </div>
            <div class="text-xs font-bold uppercase tracking-wide text-stone-900 dark:text-white md:ml-6 mt-4 md:mt-0">
              Professional</div>
          </div>
        </div>
      </div>
    </section>

    <!-- COACH & PROFESSIONAL TOOLS -->
    <section class="py-16 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-1 space-y-6">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
              <span class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Для
                специалистов</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">
              Инструменты для эффективного <span class="italic">сопровождения</span>
            </h2>
            <p class="text-stone-600 dark:text-stone-400">
              Мы разработали специальный функционал для коучей, тренеров и психологов. Теперь вы можете не только
              рекомендовать упражнения, но и отслеживать динамику ваших клиентов в единой панели.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <i class="fas fa-check text-xs text-stone-900 dark:text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-sm text-stone-900 dark:text-white">Управление клиентами</h4>
                  <p class="text-xs text-stone-600 dark:text-stone-400">Приглашайте клиентов через персональные ссылки и
                    ведите свою базу в удобном интерфейсе.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <i class="fas fa-check text-xs text-stone-900 dark:text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-sm text-stone-900 dark:text-white">Прозрачная аналитика</h4>
                  <p class="text-xs text-stone-600 dark:text-stone-400">Визуализация прогресса, результаты тестов и
                    уровень вовлеченности каждого клиента.</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-1">
                    Preview</div>
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white">Панель Коуча</h3>
                </div>
                <div class="w-10 h-10 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <i class="fas fa-users-cog text-stone-900 dark:text-white"></i>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="h-12 bg-stone-50 dark:bg-stone-800 flex items-center px-4 gap-4">
                  <div class="w-8 h-8 bg-stone-200 dark:bg-stone-700"></div>
                  <div class="h-2 w-24 bg-stone-200 dark:bg-stone-700"></div>
                  <div class="ml-auto w-12 h-2 bg-stone-200 dark:bg-stone-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APPROACH & CREDIBILITY -->
    <section class="py-16 bg-stone-50/50 dark:bg-stone-900/30">
      <div class="container mx-auto px-6 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-bold text-center text-stone-900 dark:text-white mb-8">Подход и принципы
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
            <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Научная база, не магия</h4>
            <p class="text-sm text-stone-600 dark:text-stone-400">
              Мы опираемся на когнитивные модели и поведенческую психологию. Наш метод — это структурированная работа с
              вниманием и привычками, а не поиск волшебной таблетки.
            </p>
          </div>
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
            <h4 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Инструмент, а не замена</h4>
            <p class="text-sm text-stone-600 dark:text-stone-400">
              Платформа не заменяет терапию. Мы фокусируемся на развитии навыков саморегуляции и мышления, которые
              помогают в повседневной жизни.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="py-16">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-4">Выберите формат участия</h2>
          <p class="text-stone-600 dark:text-stone-400">Прозрачные условия для доступа к системе развития.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Free -->
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col">
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Старт</h3>
            <div class="text-2xl font-bold text-stone-900 dark:text-white mb-4">Бесплатно</div>
            <ul class="text-sm text-stone-600 dark:text-stone-400 space-y-2 mb-6">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Первичная диагностика</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Базовые практики</span>
              </li>
            </ul>
            <NuxtLink to="/register"
              class="mt-auto px-6 py-3 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-sm font-semibold text-center transition-all">
              Пройти стартовый профиль
            </NuxtLink>
          </div>

          <!-- Popular -->
          <div
            class="bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-white p-6 flex flex-col relative">
            <div
              class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold px-3 py-1">
              Популярный для роста
            </div>
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Практик</h3>
            <div class="text-2xl font-bold text-stone-900 dark:text-white mb-4">490₽ <span class="text-sm font-normal">/
                мес</span></div>
            <ul class="text-sm text-stone-600 dark:text-stone-400 space-y-2 mb-6">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Полный доступ к Центру Развития</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Глубокая диагностика</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Аналитика прогресса</span>
              </li>
            </ul>
            <button
              class="mt-auto px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold text-center transition-all">
              Выбрать план
            </button>
          </div>

          <!-- Pro -->
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col">
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">Навсегда</h3>
            <div class="text-2xl font-bold text-stone-900 dark:text-white mb-4">9990₽</div>
            <ul class="text-sm text-stone-600 dark:text-stone-400 space-y-2 mb-6">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Доступ навсегда</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-xs"></i>
                <span>Приоритетная поддержка</span>
              </li>
            </ul>
            <button
              class="mt-auto px-6 py-3 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-sm font-semibold text-center transition-all">
              Купить доступ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- KNOWLEDGE & BLOG -->
    <section class="py-16 bg-white dark:bg-stone-900">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-2">База знаний</h2>
            <p class="text-stone-600 dark:text-stone-400">Материалы для понимания метода</p>
          </div>
          <NuxtLink to="/blog"
            class="text-sm font-semibold text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-stone-400">
            Все статьи
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <template v-if="latestPosts && latestPosts.length > 0">
            <article v-for="post in latestPosts.slice(0, 2)" :key="post._id"
              class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-2">{{ post.title }}</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">{{ post.excerpt ||
                'Читатьстатью...' }}</p>
              <NuxtLink :to="`/blog/${post.slug.current}`"
                class="text-sm font-semibold text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-stone-400">
                Читать сейчас →
              </NuxtLink>
            </article>
          </template>
          <div v-else class="col-span-2 text-center py-8 border border-stone-200 dark:border-stone-800 border-dashed">
            <i class="fas fa-newspaper text-2xl text-stone-300 dark:text-stone-700 mb-2"></i>
            <p class="text-sm text-stone-500 dark:text-stone-400">Скоро появятся новые статьи</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16">
      <div class="container mx-auto px-6 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold text-center text-stone-900 dark:text-white mb-8">Частые вопросы</h2>
        <div class="space-y-4">
          <details class="group" v-for="(item, i) in faq" :key="i">
            <summary
              class="w-full p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex justify-between items-center cursor-pointer text-left">
              <span class="font-semibold text-stone-900 dark:text-white">{{ item.q }}</span>
              <i class="fas fa-chevron-down text-stone-400 group-open:rotate-180 transition-transform"></i>
            </summary>
            <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 border-t-0">
              <p class="text-sm text-stone-600 dark:text-stone-400">{{ item.a }}</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div class="container mx-auto px-6 max-w-2xl text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-4">Начните свой путь развития</h2>
        <p class="text-stone-600 dark:text-stone-400 mb-8">
          Присоединяйтесь к сообществу людей, которые осознанно работают над своим мышлением и эмоциональным
          интеллектом.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/space/tests"
            class="px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
            Начать бесплатно
          </NuxtLink>
          <NuxtLink to="/register"
            class="px-8 py-3 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-sm font-semibold transition-all">
            Зарегистрироваться
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";
import CursorNeuralVisualizer from '~/components/space/CursorNeuralVisualizer.vue';
import Footer from "~/components/ui/Footer.vue";

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

const { data: fetchedPosts } = await useAsyncData("posts-landing", fetchPosts);
posts.value = Array.isArray(fetchedPosts.value) ? fetchedPosts.value : [];
const latestPosts = computed(() => posts.value.slice(0, 2));

useSeoMeta({
  title: 'MindQLab — Система персонального развития',
  description: 'Платформа для диагностики, понимания и развития мышления. Структурированный подход к личной эффективности.',
});
</script>