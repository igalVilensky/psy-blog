<template>
  <nav
    class="sticky top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800/60 transition-colors duration-500 w-full">
    <!-- Subtle accent line -->
    <div
      class="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent">
    </div>

    <!-- Container -->
    <div class="container max-w-6xl px-4 mx-auto flex justify-between items-center py-3 relative z-10">
      <!-- Logo -->
      <NuxtLink to="/home" class="group relative block" @click="closeDropdown">
        <div
          class="w-8 h-8 sm:h-10 sm:w-10 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-purple-400/30">
          <img src="/mindqlab-logo.png" alt="MindQLab Logo"
            class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-2">
        <!-- Лаборатория Dropdown -->
        <div class="relative group">
          <NuxtLink to="/lab"
            class="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-800/50 transition-all duration-200"
            :class="{ 'bg-slate-200 dark:bg-slate-800/50 text-slate-900 dark:text-white': isLabRouteActive }"
            @click="closeDropdown">
            <i class="fas fa-flask text-cyan-400"></i>
            <span>Лаборатория</span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"></i>
          </NuxtLink>
          <div
            class="absolute top-full left-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div
              class="bg-white dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-200 dark:border-slate-700/50 min-w-[220px] py-1.5">
              <NuxtLink to="/lab/tests"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-brain text-blue-500 w-4"></i>
                <span>Тесты</span>
              </NuxtLink>
              <NuxtLink to="/lab/brain-training"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-chess text-green-500 w-4"></i>
                <span>Тренировка Мозга</span>
              </NuxtLink>
              <NuxtLink to="/lab/psychology"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-book-open text-purple-500 w-4"></i>
                <span>Психология</span>
              </NuxtLink>
              <NuxtLink to="/lab/mindfulness"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-spa text-teal-500 w-4"></i>
                <span>Медитация</span>
              </NuxtLink>
              <NuxtLink to="/lab/sound-therapy"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-music text-indigo-500 w-4"></i>
                <span>Звукотерапия</span>
              </NuxtLink>
              <NuxtLink to="/lab/brain-map"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-map text-orange-500 w-4"></i>
                <span>Карта Мозга</span>
              </NuxtLink>
              <NuxtLink to="/lab/dashboard"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-microchip text-cyan-500 w-4"></i>
                <span>Нейро Анализ</span>
              </NuxtLink>
              <NuxtLink to="/lab/growth"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-atom text-purple-500 w-4"></i>
                <span>Саморазвитие</span>
              </NuxtLink>
              <NuxtLink to="/lab/analysis"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-chart-line text-emerald-500 w-4"></i>
                <span>Обсерватория роста</span>
              </NuxtLink>
              <NuxtLink to="/lab/community"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                @click="closeDropdown">
                <i class="fas fa-users text-orange-500 w-4"></i>
                <span>Сообщество</span>
              </NuxtLink>
            </div>
          </div>
        </div>


        <!-- Blog Link -->
        <NuxtLink to="/blog"
          class="px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-800/50 transition-all duration-200"
          exact-active-class="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/50" @click="closeDropdown">
          Блог
        </NuxtLink>

        <!-- О проекте Link -->
        <NuxtLink to="/about"
          class="px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-800/50 transition-all duration-200"
          exact-active-class="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/50" @click="closeDropdown">
          О проекте
        </NuxtLink>

        <!-- Theme Toggle (Desktop) -->
        <button @click="themeStore.toggleTheme()"
          class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-black/5 dark:hover:bg-slate-800/50 transition-all duration-200"
          :title="themeStore.theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'">
          <i class="fas transition-transform duration-300"
            :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
        </button>

        <!-- Profile / Auth Section -->
        <ClientOnly>
          <template #fallback>
            <!-- Loading Skeleton State -->
            <div class="flex items-center space-x-2 ml-2">
              <div class="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700/50 animate-pulse">
                <div class="w-12 h-4 bg-slate-200 dark:bg-slate-700/50 rounded"></div>
              </div>
              <div class="px-3.5 py-2 rounded-lg bg-slate-200 dark:bg-slate-700/50 animate-pulse">
                <div class="w-20 h-4 bg-slate-300 dark:bg-slate-600/50 rounded"></div>
              </div>
            </div>
          </template>

          <!-- Loading Skeleton State (client-side) -->
          <div v-if="auth.loading" class="flex items-center space-x-2 ml-2">
            <div class="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700/50 animate-pulse">
              <div class="w-12 h-4 bg-slate-200 dark:bg-slate-700/50 rounded"></div>
            </div>
            <div class="px-3.5 py-2 rounded-lg bg-slate-200 dark:bg-slate-700/50 animate-pulse">
              <div class="w-20 h-4 bg-slate-300 dark:bg-slate-600/50 rounded"></div>
            </div>
          </div>

          <!-- Logged-in State -->
          <div v-else-if="auth.user" class="relative group ml-2">
            <button
              class="flex items-center space-x-2 px-3.5 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-slate-800/50 transition-all duration-200 border border-slate-200 dark:border-slate-700/50">
              <div
                class="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                {{ getUserInitials }}
              </div>
              <span
                class="text-[15px] text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white max-w-[100px] truncate">
                {{ auth.user.displayName || auth.user.email }}
              </span>
              <i
                class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"></i>
            </button>

            <div
              class="absolute top-full right-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div
                class="bg-white dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-200 dark:border-slate-700/50 min-w-[200px] py-1.5">
                <NuxtLink to="/profile"
                  class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-user-circle text-cyan-400 w-4"></i>
                  <span>Мой Профиль</span>
                </NuxtLink>
                <NuxtLink to="/personal-cabinet"
                  class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  exact-active-class="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-tachometer-alt text-cyan-400 w-4"></i>
                  <span>Личный кабинет</span>
                </NuxtLink>
                <div class="border-t border-slate-200 dark:border-slate-700/50 my-1"></div>
                <button @click="logoutUser"
                  class="w-full flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-white hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150">
                  <i class="fas fa-sign-out-alt text-red-500 dark:text-red-400 w-4"></i>
                  <span class="font-medium text-red-600 dark:text-red-300">Выйти</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Logged-out State -->
          <div v-else class="flex items-center space-x-2 ml-2">
            <NuxtLink to="/login"
              class="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all duration-200"
              exact-active-class="bg-slate-200 dark:bg-slate-800/50 text-slate-900 dark:text-white border-cyan-500/50">
              Войти
            </NuxtLink>
            <NuxtLink to="/register"
              class="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[15px] font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
              exact-active-class="from-cyan-600 to-blue-600">
              Регистрация
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>

      <!-- Mobile Hamburger Menu -->
      <button @click="toggleDropdown"
        class="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/5 dark:hover:bg-slate-800/50 transition-colors duration-200"
        aria-label="Toggle Menu">
        <div class="relative w-5 h-4">
          <!-- Remove bg-red-200 from here -->
          <span
            class="absolute w-5 h-0.5 bg-slate-900 dark:bg-white rounded transition-all duration-200 ease-in-out left-1/2 -translate-x-1/2"
            :class="[
              isDropdownOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-0',
            ]"></span>
          <span
            class="absolute w-5 h-0.5 bg-slate-900 dark:bg-white rounded top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-200 ease-in-out"
            :class="[isDropdownOpen ? 'opacity-0' : 'opacity-100']"></span>
          <span
            class="absolute w-5 h-0.5 bg-slate-900 dark:bg-white rounded transition-all duration-200 ease-in-out left-1/2 -translate-x-1/2"
            :class="[
              isDropdownOpen
                ? '-rotate-45 top-1/2 -translate-y-1/2'
                : 'bottom-0',
            ]"></span>
        </div>
      </button>

      <!-- Mobile Menu -->
      <div data-menu="mobile" :class="[
        'lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800/60 transition-all duration-300 overflow-y-auto',
        isDropdownOpen
          ? 'translate-y-0 opacity-100 visible max-h-[calc(100vh-56px)]'
          : '-translate-y-2 opacity-0 invisible max-h-0',
      ]">
        <div class="p-4 space-y-2">
          <!-- Theme Toggle (Mobile) -->
          <button @click="themeStore.toggleTheme()"
            class="w-full flex items-center space-x-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-black/5 dark:hover:bg-slate-800/70 transition-all duration-200 border border-slate-200 dark:border-slate-700/50 mb-2">
            <i class="fas text-yellow-500 dark:text-yellow-400"
              :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
            <span class="font-medium text-slate-700 dark:text-slate-200">
              {{ themeStore.theme === 'dark' ? 'Темная тема' : 'Светлая тема' }}
            </span>
          </button>

          <!-- Лаборатория -->
          <div>
            <div
              class="w-full flex items-center justify-between p-1 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
              :class="{ 'bg-slate-200 dark:bg-slate-800/70': isLabRouteActive }">
              <NuxtLink to="/lab"
                class="flex-1 flex items-center space-x-4 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-slate-700/50 transition-all duration-200"
                @click="closeDropdown">
                <i class="fas fa-flask text-cyan-500 dark:text-cyan-400"></i>
                <span class="font-medium text-slate-700 dark:text-slate-200">Лаборатория</span>
              </NuxtLink>
              <button @click="toggleMobileSubmenu('lab')"
                class="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-slate-700/50 transition-colors duration-200">
                <i class="fas fa-chevron-down text-slate-500 dark:text-slate-400 text-sm transition-transform duration-200"
                  :class="[
                    mobileSubmenuStates.lab || isLabRouteActive
                      ? 'rotate-180'
                      : '',
                  ]"></i>
              </button>
            </div>
            <div class="mt-1.5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out" :class="[
              mobileSubmenuStates.lab || isLabRouteActive
                ? 'max-h-[300px]'
                : 'max-h-0',
            ]">
              <div class="bg-slate-50 dark:bg-slate-800/30 p-2 space-y-1">
                <NuxtLink to="/lab/tests"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-vial text-cyan-400 text-xs w-4"></i>
                  <span>Тесты</span>
                </NuxtLink>
                <NuxtLink to="/lab/brain-training"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-gamepad text-purple-400 text-xs w-4"></i>
                  <span>Тренировка Мозга</span>
                </NuxtLink>
                <NuxtLink to="/lab/psychology"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-brain text-blue-400 text-xs w-4"></i>
                  <span>Психология</span>
                </NuxtLink>
                <NuxtLink to="/lab/mindfulness"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-infinity text-green-400 text-xs w-4"></i>
                  <span>Медитация</span>
                </NuxtLink>
                <NuxtLink to="/lab/sound-therapy"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-music text-indigo-400 text-xs w-4"></i>
                  <span>Звукотерапия</span>
                </NuxtLink>
                <NuxtLink to="/lab/growth"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-seedling text-green-400 text-xs w-4"></i>
                  <span>Саморазвитие</span>
                </NuxtLink>
                <NuxtLink to="/lab/brain-map"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-map text-orange-400 text-xs w-4"></i>
                  <span>Карта Мозга</span>
                </NuxtLink>
                <NuxtLink to="/lab/dashboard"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-microchip text-cyan-400 text-xs w-4"></i>
                  <span>Нейро Анализ</span>
                </NuxtLink>
                <NuxtLink to="/lab/analysis"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-chart-line text-pink-400 text-xs w-4"></i>
                  <span>Обсерватория роста</span>
                </NuxtLink>
                <NuxtLink to="/lab/community"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                  @click="closeDropdown">
                  <i class="fas fa-users text-yellow-400 text-xs w-4"></i>
                  <span>Сообщество</span>
                </NuxtLink>
              </div>
            </div>
          </div>



          <!-- Blog -->
          <NuxtLink to="/blog"
            class="flex items-center space-x-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-black/5 dark:hover:bg-slate-800/70 transition-all duration-200 border border-slate-200 dark:border-slate-700/50"
            exact-active-class="bg-slate-200 dark:bg-slate-800/70 text-slate-900 dark:text-white"
            @click="closeDropdown">
            <i class="fas fa-book-open text-blue-500 dark:text-blue-400"></i>
            <span class="font-medium text-slate-700 dark:text-slate-200">Блог</span>
          </NuxtLink>

          <!-- О проекте -->
          <NuxtLink to="/about"
            class="flex items-center space-x-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-black/5 dark:hover:bg-slate-800/70 transition-all duration-200 border border-slate-200 dark:border-slate-700/50"
            exact-active-class="bg-slate-200 dark:bg-slate-800/70 text-slate-900 dark:text-white"
            @click="closeDropdown">
            <i class="fas fa-info-circle text-slate-500 dark:text-slate-400"></i>
            <span class="font-medium text-slate-700 dark:text-slate-200">О проекте</span>
          </NuxtLink>

          <!-- Auth Section -->
          <div class="pt-3 border-t border-slate-200 dark:border-slate-800/60 mt-3">
            <ClientOnly>
              <template #fallback>
                <!-- Loading Skeleton State (SSR) -->
                <div class="space-y-2">
                  <div class="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 animate-pulse">
                    <div class="h-4 bg-slate-700/50 rounded w-3/4"></div>
                  </div>
                  <div class="p-3 rounded-lg bg-slate-700/50 animate-pulse">
                    <div class="h-4 bg-slate-600/50 rounded w-1/2"></div>
                  </div>
                </div>
              </template>

              <!-- Loading Skeleton State (client-side) -->
              <template v-if="auth.loading">
                <div class="space-y-2">
                  <div class="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 animate-pulse">
                    <div class="h-4 bg-slate-700/50 rounded w-3/4"></div>
                  </div>
                  <div class="p-3 rounded-lg bg-slate-700/50 animate-pulse">
                    <div class="h-4 bg-slate-600/50 rounded w-1/2"></div>
                  </div>
                </div>
              </template>

              <!-- Logged-in State -->
              <template v-else-if="auth.user">
                <div
                  class="mb-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                  <span class="text-xs text-cyan-600 dark:text-cyan-400">Вы вошли как</span>
                  <div class="text-sm text-slate-900 dark:text-white font-medium mt-1 truncate">
                    {{ auth.user.displayName || auth.user.email }}
                  </div>
                </div>
                <div class="space-y-1.5">
                  <NuxtLink to="/profile"
                    class="flex items-center space-x-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-black/5 dark:hover:bg-slate-700/50 transition-all duration-200 border border-slate-200 dark:border-slate-700/50"
                    exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                    @click="closeDropdown">
                    <i class="fas fa-user text-slate-500 dark:text-slate-400"></i>
                    <span class="font-medium text-slate-700 dark:text-slate-200">Мой Профиль</span>
                  </NuxtLink>
                  <NuxtLink to="/personal-cabinet"
                    class="flex items-center space-x-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-black/5 dark:hover:bg-slate-700/50 transition-all duration-200 border border-slate-200 dark:border-slate-700/50"
                    exact-active-class="bg-slate-200 dark:bg-slate-700/50 text-slate-900 dark:text-white"
                    @click="closeDropdown">
                    <i class="fas fa-tachometer-alt text-slate-500 dark:text-slate-400"></i>
                    <span class="font-medium text-slate-700 dark:text-slate-200">Личный кабинет</span>
                  </NuxtLink>
                  <button @click="logoutUser"
                    class="w-full flex items-center space-x-4 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20">
                    <i class="fas fa-sign-out-alt text-red-400"></i>
                    <span class="font-medium text-red-300">Выйти</span>
                  </button>
                </div>
              </template>

              <!-- Logged-out State -->
              <template v-else>
                <div class="space-y-2">
                  <NuxtLink to="/login"
                    class="flex items-center justify-center space-x-2 p-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-black/5 dark:hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all duration-200"
                    exact-active-class="bg-slate-200 dark:bg-slate-800/50 text-slate-900 dark:text-white border-cyan-500/50"
                    @click="closeDropdown">
                    <i class="fas fa-sign-in-alt text-cyan-500 dark:text-cyan-400"></i>
                    <span>Войти</span>
                  </NuxtLink>
                  <NuxtLink to="/register"
                    class="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium transition-all duration-200"
                    exact-active-class="from-cyan-600 to-blue-600" @click="closeDropdown">
                    <i class="fas fa-user-plus text-white"></i>
                    <span>Регистрация</span>
                  </NuxtLink>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";

const auth = useAuthStore();
const themeStore = useThemeStore();
const route = useRoute();
const router = useRouter();

const isDropdownOpen = ref(false);
const mobileSubmenuStates = ref({
  lab: false,
  tools: false,
});

// Computed properties for active route highlighting - Added lab routes
const isLabRouteActive = computed(() => {
  const labRoutes = [
    "/lab/tests",
    "/lab/brain-training",
    "/lab/psychology",
    "/lab/mindfulness",
    "/lab/growth",
  ];
  return labRoutes.includes(route.path);
});

const isToolsRouteActive = computed(() => {
  const toolsRoutes = [
    "/lab/growth/emotional-compass",
    "/lab/growth/wheel-of-life",
    "/lab/tests/life-purpose-archetype",
    "/lab/tests/big-5-model",
    "/lab/growth/daily-growth-spark",
  ];
  return toolsRoutes.includes(route.path);
});



// Get user initials for avatar
const getUserInitials = computed(() => {
  if (!auth.user?.displayName) return "U";
  return auth.user.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// Format username for profile link
const formattedUsername = computed(() => {
  if (!auth.user?.displayName) return "user";
  return auth.user.displayName.replace(/\s/g, "-");
});

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (!isDropdownOpen.value) {
    mobileSubmenuStates.value = {
      lab: false,
      tools: false,
    };
  }
};

const toggleMobileSubmenu = (submenu) => {
  mobileSubmenuStates.value[submenu] = !mobileSubmenuStates.value[submenu];
  Object.keys(mobileSubmenuStates.value).forEach((key) => {
    if (key !== submenu) mobileSubmenuStates.value[key] = false;
  });
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  mobileSubmenuStates.value = {
    lab: false,
    tools: false,
  };
};

const handleOutsideClick = (event) => {
  const mobileMenu = document.querySelector('[data-menu="mobile"]');
  const mobileMenuButton = document.querySelector('[aria-label="Toggle Menu"]');
  if (
    mobileMenu &&
    !mobileMenu.contains(event.target) &&
    mobileMenuButton &&
    !mobileMenuButton.contains(event.target)
  ) {
    closeDropdown();
  }
};

const logoutUser = async () => {
  await auth.logout();
  router.push("/login");
  closeDropdown();
};
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>
