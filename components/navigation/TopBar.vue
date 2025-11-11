<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/60"
  >
    <!-- Subtle accent line -->
    <div
      class="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
    ></div>

    <!-- Container -->
    <div
      class="container max-w-6xl px-4 sm:px-0 mx-auto flex justify-between items-center py-3 relative z-10"
    >
      <!-- Logo -->
      <NuxtLink to="/home" class="group relative block" @click="closeDropdown">
        <div
          class="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20 border border-slate-700 group-hover:border-cyan-500/40"
        >
          <img
            src="/mindqlab-logo.png"
            alt="MindQLab Logo"
            class="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-2">
        <!-- Лаборатория Dropdown -->
        <div class="relative group">
          <button
            class="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            :class="{ 'bg-slate-800/50 text-white': isLabRouteActive }"
          >
            <i class="fas fa-flask text-cyan-400"></i>
            <span>Лаборатория</span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"
            ></i>
          </button>
          <div
            class="absolute top-full left-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <div
              class="bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 min-w-[220px] py-1.5"
            >
              <NuxtLink
                to="/lab/tests"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-vial text-cyan-400 w-4"></i>
                <span>Когнитивные тесты</span>
              </NuxtLink>
              <NuxtLink
                to="/lab/games"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-gamepad text-purple-400 w-4"></i>
                <span>Развивающие игры</span>
              </NuxtLink>
              <NuxtLink
                to="/lab/psychology"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-brain text-blue-400 w-4"></i>
                <span>Психология</span>
              </NuxtLink>
              <NuxtLink
                to="/lab/mindfulness"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-infinity text-green-400 w-4"></i>
                <span>Медитация</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Развитие Dropdown -->
        <div class="relative group">
          <button
            class="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            :class="{ 'bg-slate-800/50 text-white': isGrowthRouteActive }"
          >
            <i class="fas fa-book text-cyan-400"></i>
            <span>Развитие</span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"
            ></i>
          </button>
          <div
            class="absolute top-full left-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <div
              class="bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 min-w-[220px] py-1.5"
            >
              <NuxtLink
                to="/courses/courses"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-graduation-cap text-cyan-400 w-4"></i>
                <span>Курсы</span>
              </NuxtLink>
              <NuxtLink
                to="/courses/free-resources"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-gift text-cyan-400 w-4"></i>
                <span>Бесплатные материалы</span>
              </NuxtLink>
              <NuxtLink
                to="/courses/guides"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-book-open text-cyan-400 w-4"></i>
                <span>Гайды</span>
              </NuxtLink>
              <NuxtLink
                to="/courses/podcasts"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-podcast text-cyan-400 w-4"></i>
                <span>Подкасты</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Инструменты Dropdown (Logged-in only) -->
        <div v-if="auth.user" class="relative group">
          <button
            class="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            :class="{ 'bg-slate-800/50 text-white': isToolsRouteActive }"
          >
            <i class="fas fa-tools text-purple-400"></i>
            <span>Инструменты</span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"
            ></i>
          </button>
          <div
            class="absolute top-full left-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <div
              class="bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 min-w-[240px] py-1.5"
            >
              <NuxtLink
                to="/awareness-tools/emotional-compass"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-compass text-purple-400 w-4"></i>
                <span>Эмоциональный компас</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/wheel-of-life"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-yin-yang text-purple-400 w-4"></i>
                <span>Колесо баланса</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/life-purpose-archetype"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-star text-purple-400 w-4"></i>
                <span>12 Архетипов</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/big-5-model"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-chart-bar text-purple-400 w-4"></i>
                <span>Большая пятёрка</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/daily-growth-spark"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-bolt text-purple-400 w-4"></i>
                <span>Ежедневная искра роста</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Сообщество Dropdown -->
        <div class="relative group">
          <button
            class="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            :class="{ 'bg-slate-800/50 text-white': isCommunityRouteActive }"
          >
            <i class="fas fa-users text-blue-400"></i>
            <span>Сообщество</span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"
            ></i>
          </button>
          <div
            class="absolute top-full left-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <div
              class="bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 min-w-[200px] py-1.5"
            >
              <NuxtLink
                to="/blog"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-book-open text-blue-400 w-4"></i>
                <span>Блог</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/inspiration-wall"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-lightbulb text-blue-400 w-4"></i>
                <span>Инсайты других</span>
              </NuxtLink>
              <NuxtLink
                to="/faq"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-question-circle text-blue-400 w-4"></i>
                <span>FAQ</span>
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-envelope text-blue-400 w-4"></i>
                <span>Связь</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- О проекте Link -->
        <NuxtLink
          to="/about"
          class="px-3.5 py-2 rounded-lg text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
          exact-active-class="text-white bg-slate-800/50"
          @click="closeDropdown"
        >
          О проекте
        </NuxtLink>

        <!-- Profile / Auth Section -->
        <div v-if="auth.user" class="relative group ml-2">
          <button
            class="flex items-center space-x-2 px-3.5 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 border border-slate-700/50"
          >
            <div
              class="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs"
            >
              {{ getUserInitials }}
            </div>
            <span
              class="text-[15px] text-slate-300 font-medium group-hover:text-white max-w-[100px] truncate"
            >
              {{ auth.user.displayName || auth.user.email }}
            </span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-slate-300 transition-transform duration-200 group-hover:rotate-180"
            ></i>
          </button>

          <div
            class="absolute top-full right-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
          >
            <div
              class="bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-slate-700/50 min-w-[200px] py-1.5"
            >
              <NuxtLink
                to="/profile"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-user-circle text-cyan-400 w-4"></i>
                <span>Мой Профиль</span>
              </NuxtLink>
              <NuxtLink
                to="/personal-cabinet"
                class="flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-150"
                exact-active-class="bg-slate-700/50 text-white"
                @click="closeDropdown"
              >
                <i class="fas fa-tachometer-alt text-cyan-400 w-4"></i>
                <span>Личный кабинет</span>
              </NuxtLink>
              <div class="border-t border-slate-700/50 my-1"></div>
              <button
                @click="logoutUser"
                class="w-full flex items-center space-x-3 px-4 py-2.5 text-[15px] text-slate-300 hover:text-white hover:bg-red-500/10 transition-colors duration-150"
              >
                <i class="fas fa-sign-out-alt text-red-400 w-4"></i>
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Logged-out State -->
        <div v-else class="flex items-center space-x-2 ml-2">
          <NuxtLink
            to="/login"
            class="px-3.5 py-2 rounded-lg border border-slate-700 text-[15px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all duration-200"
            exact-active-class="bg-slate-800/50 text-white border-cyan-500/50"
          >
            Войти
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[15px] font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
            exact-active-class="from-cyan-600 to-blue-600"
          >
            Регистрация
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Hamburger Menu -->
      <button
        @click="toggleDropdown"
        class="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
        aria-label="Toggle Menu"
      >
        <div class="relative w-5 h-4">
          <!-- Remove bg-red-200 from here -->
          <span
            class="absolute w-5 h-0.5 bg-cyan-400 rounded transition-all duration-200 ease-in-out left-1/2 -translate-x-1/2"
            :class="[
              isDropdownOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-0',
            ]"
          ></span>
          <span
            class="absolute w-5 h-0.5 bg-cyan-400 rounded top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-200 ease-in-out"
            :class="[isDropdownOpen ? 'opacity-0' : 'opacity-100']"
          ></span>
          <span
            class="absolute w-5 h-0.5 bg-cyan-400 rounded transition-all duration-200 ease-in-out left-1/2 -translate-x-1/2"
            :class="[
              isDropdownOpen
                ? '-rotate-45 top-1/2 -translate-y-1/2'
                : 'bottom-0',
            ]"
          ></span>
        </div>
      </button>

      <!-- Mobile Menu -->
      <div
        data-menu="mobile"
        :class="[
          'lg:hidden absolute top-full left-0 right-0 bg-slate-950 backdrop-blur-sm border-t border-slate-800/60 transition-all duration-300 overflow-y-auto',
          isDropdownOpen
            ? 'translate-y-0 opacity-100 visible max-h-[calc(100vh-56px)]'
            : '-translate-y-2 opacity-0 invisible max-h-0',
        ]"
      >
        <div class="p-4 space-y-2">
          <!-- Лаборатория -->
          <div>
            <button
              @click="toggleMobileSubmenu('lab')"
              class="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50"
              :class="{ 'bg-slate-800/70': isLabRouteActive }"
            >
              <div class="flex items-center space-x-4">
                <i class="fas fa-flask text-cyan-400"></i>
                <span class="font-medium text-slate-200">Лаборатория</span>
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 text-sm transition-transform duration-200"
                :class="[
                  mobileSubmenuStates.lab || isLabRouteActive
                    ? 'rotate-180'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-1.5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              :class="[
                mobileSubmenuStates.lab || isLabRouteActive
                  ? 'max-h-[300px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-slate-800/30 p-2 space-y-1">
                <NuxtLink
                  to="/lab/tests"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-vial text-cyan-400 text-xs w-4"></i>
                  <span>Когнитивные тесты</span>
                </NuxtLink>
                <NuxtLink
                  to="/lab/games"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-gamepad text-purple-400 text-xs w-4"></i>
                  <span>Развивающие игры</span>
                </NuxtLink>
                <NuxtLink
                  to="/lab/psychology"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-brain text-blue-400 text-xs w-4"></i>
                  <span>Психология</span>
                </NuxtLink>
                <NuxtLink
                  to="/lab/mindfulness"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-infinity text-green-400 text-xs w-4"></i>
                  <span>Медитация</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Развитие -->
          <div>
            <button
              @click="toggleMobileSubmenu('growth')"
              class="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50"
              :class="{ 'bg-slate-800/70': isGrowthRouteActive }"
            >
              <div class="flex items-center space-x-4">
                <i class="fas fa-book text-cyan-400"></i>
                <span class="font-medium text-slate-200">Развитие</span>
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 text-sm transition-transform duration-200"
                :class="[
                  mobileSubmenuStates.growth || isGrowthRouteActive
                    ? 'rotate-180'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-1.5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              :class="[
                mobileSubmenuStates.growth || isGrowthRouteActive
                  ? 'max-h-[300px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-slate-800/30 p-2 space-y-1">
                <NuxtLink
                  to="/courses/courses"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i
                    class="fas fa-graduation-cap text-cyan-400 text-xs w-4"
                  ></i>
                  <span>Курсы</span>
                </NuxtLink>
                <NuxtLink
                  to="/courses/free-resources"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-gift text-cyan-400 text-xs w-4"></i>
                  <span>Бесплатные материалы</span>
                </NuxtLink>
                <NuxtLink
                  to="/courses/guides"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-book-open text-cyan-400 text-xs w-4"></i>
                  <span>Гайды</span>
                </NuxtLink>
                <NuxtLink
                  to="/courses/podcasts"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-podcast text-cyan-400 text-xs w-4"></i>
                  <span>Подкасты</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Инструменты (Logged-in only) -->
          <div v-if="auth.user">
            <button
              @click="toggleMobileSubmenu('tools')"
              class="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50"
              :class="{ 'bg-slate-800/70': isToolsRouteActive }"
            >
              <div class="flex items-center space-x-4">
                <i class="fas fa-tools text-purple-400"></i>
                <span class="font-medium text-slate-200">Инструменты</span>
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 text-sm transition-transform duration-200"
                :class="[
                  mobileSubmenuStates.tools || isToolsRouteActive
                    ? 'rotate-180'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-1.5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              :class="[
                mobileSubmenuStates.tools || isToolsRouteActive
                  ? 'max-h-[400px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-slate-800/30 p-2 space-y-1">
                <NuxtLink
                  to="/awareness-tools/emotional-compass"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-compass text-purple-400 text-xs w-4"></i>
                  <span>Эмоциональный компас</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/wheel-of-life"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-yin-yang text-purple-400 text-xs w-4"></i>
                  <span>Колесо баланса</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/life-purpose-archetype"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-star text-purple-400 text-xs w-4"></i>
                  <span>12 Архетипов</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/big-5-model"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-chart-bar text-purple-400 text-xs w-4"></i>
                  <span>Большая пятёрка</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/daily-growth-spark"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-bolt text-purple-400 text-xs w-4"></i>
                  <span>Ежедневная искра роста</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Сообщество -->
          <div>
            <button
              @click="toggleMobileSubmenu('community')"
              class="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50"
              :class="{ 'bg-slate-800/70': isCommunityRouteActive }"
            >
              <div class="flex items-center space-x-4">
                <i class="fas fa-users text-blue-400"></i>
                <span class="font-medium text-slate-200">Сообщество</span>
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 text-sm transition-transform duration-200"
                :class="[
                  mobileSubmenuStates.community || isCommunityRouteActive
                    ? 'rotate-180'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-1.5 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              :class="[
                mobileSubmenuStates.community || isCommunityRouteActive
                  ? 'max-h-[300px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-slate-800/30 p-2 space-y-1">
                <NuxtLink
                  to="/blog"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-book-open text-blue-400 text-xs w-4"></i>
                  <span>Блог</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/inspiration-wall"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-lightbulb text-blue-400 text-xs w-4"></i>
                  <span>Инсайты других</span>
                </NuxtLink>
                <NuxtLink
                  to="/faq"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i
                    class="fas fa-question-circle text-blue-400 text-xs w-4"
                  ></i>
                  <span>FAQ</span>
                </NuxtLink>
                <NuxtLink
                  to="/contact"
                  class="flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-150"
                  exact-active-class="bg-slate-700/50 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-envelope text-blue-400 text-xs w-4"></i>
                  <span>Связь</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- О проекте -->
          <NuxtLink
            to="/about"
            class="flex items-center space-x-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50"
            exact-active-class="bg-slate-800/70 text-white"
            @click="closeDropdown"
          >
            <i class="fas fa-info-circle text-slate-400"></i>
            <span class="font-medium text-slate-200">О проекте</span>
          </NuxtLink>

          <!-- Auth Section -->
          <div class="pt-3 border-t border-slate-800/60 mt-3">
            <template v-if="auth.user">
              <div
                class="mb-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <span class="text-xs text-cyan-400">Вы вошли как</span>
                <div class="text-sm text-white font-medium mt-1 truncate">
                  {{ auth.user.displayName || auth.user.email }}
                </div>
              </div>
              <div class="space-y-1.5">
                <NuxtLink
                  to="/profile"
                  class="flex items-center space-x-4 p-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-200 border border-cyan-500/20"
                  exact-active-class="bg-cyan-500/20 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-user text-cyan-400"></i>
                  <span class="font-medium text-cyan-300">Мой Профиль</span>
                </NuxtLink>
                <NuxtLink
                  to="/personal-cabinet"
                  class="flex items-center space-x-4 p-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-200 border border-cyan-500/20"
                  exact-active-class="bg-cyan-500/20 text-white"
                  @click="closeDropdown"
                >
                  <i class="fas fa-tachometer-alt text-cyan-400"></i>
                  <span class="font-medium text-cyan-300">Личный кабинет</span>
                </NuxtLink>
                <button
                  @click="logoutUser"
                  class="w-full flex items-center space-x-4 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20"
                >
                  <i class="fas fa-sign-out-alt text-red-400"></i>
                  <span class="font-medium text-red-300">Выйти</span>
                </button>
              </div>
            </template>
            <template v-else>
              <div class="space-y-2">
                <NuxtLink
                  to="/login"
                  class="flex items-center justify-center space-x-2 p-3 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all duration-200"
                  exact-active-class="bg-slate-800/50 text-white border-cyan-500/50"
                  @click="closeDropdown"
                >
                  <i class="fas fa-sign-in-alt text-cyan-400"></i>
                  <span>Войти</span>
                </NuxtLink>
                <NuxtLink
                  to="/register"
                  class="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium transition-all duration-200"
                  exact-active-class="from-cyan-600 to-blue-600"
                  @click="closeDropdown"
                >
                  <i class="fas fa-user-plus text-white"></i>
                  <span>Регистрация</span>
                </NuxtLink>
              </div>
            </template>
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

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const isDropdownOpen = ref(false);
const mobileSubmenuStates = ref({
  lab: false,
  growth: false,
  tools: false,
  community: false,
});

// Computed properties for active route highlighting - Added lab routes
const isLabRouteActive = computed(() => {
  const labRoutes = [
    "/lab/tests",
    "/lab/games",
    "/lab/psychology",
    "/lab/mindfulness",
    "/lab/growth",
  ];
  return labRoutes.includes(route.path);
});

const isGrowthRouteActive = computed(() => {
  const growthRoutes = [
    "/courses/courses",
    "/courses/free-resources",
    "/courses/guides",
    "/courses/podcasts",
  ];
  return growthRoutes.includes(route.path);
});

const isToolsRouteActive = computed(() => {
  const toolsRoutes = [
    "/awareness-tools/emotional-compass",
    "/awareness-tools/wheel-of-life",
    "/awareness-tools/life-purpose-archetype",
    "/awareness-tools/big-5-model",
    "/awareness-tools/daily-growth-spark",
  ];
  return toolsRoutes.includes(route.path);
});

const isCommunityRouteActive = computed(() => {
  const communityRoutes = [
    "/blog",
    "/awareness-tools/inspiration-wall",
    "/faq",
    "/contact",
  ];
  return communityRoutes.includes(route.path);
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

onMounted(async () => {
  await auth.initAuth();
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
      growth: false,
      tools: false,
      community: false,
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
    growth: false,
    tools: false,
    community: false,
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
