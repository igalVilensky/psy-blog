<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-background shadow-[0_2px_20px_rgba(123,97,255,0.15)]"
  >
    <!-- Neon glow divider -->
    <div
      class="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-[#0EA5E9]/50 via-[#F59E0B]/50 to-[#E879F9]/50"
    ></div>

    <!-- Container -->
    <div
      class="container max-w-6xl px-4 xl:px-0 mx-auto flex justify-between items-center py-4 relative z-10"
    >
      <!-- Logo -->
      <NuxtLink to="/home" class="group relative" @click="closeDropdown">
        <div class="w-12 h-12 rounded-xl overflow-hidden bg-white">
          <img
            src="/logo2.png"
            alt="FamilySpace Logo"
            class="w-full h-full object-cover"
          />
        </div>
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center space-x-6">
        <!-- Развитие Dropdown -->
        <div class="relative group">
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            :class="{ 'bg-white/10': isGrowthRouteActive }"
          >
            <i class="fas fa-book text-[#0EA5E9] text-lg"></i>
            <span class="text-slate-300 font-medium group-hover:text-white"
              >Развитие</span
            >
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white group-hover:-rotate-180 transition-all duration-300"
            ></i>
          </button>
          <span
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
          ></span>
          <div
            class="absolute top-12 left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <div
              class="bg-gradient-to-b from-[#1A1F35] to-[#1E293B] rounded-xl shadow-[0_4px_20px_rgba(123,97,255,0.2)] border border-white/10 min-w-[240px]"
            >
              <NuxtLink
                to="/courses/courses"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-graduation-cap text-[#0EA5E9]"></i>
                <span>Курсы</span>
              </NuxtLink>
              <NuxtLink
                to="/courses/free-resources"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-gift text-[#0EA5E9]"></i>
                <span>Бесплатные материалы</span>
              </NuxtLink>
              <NuxtLink
                to="/courses/guides"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-book-open text-[#0EA5E9]"></i>
                <span>Гайды</span>
              </NuxtLink>
              <NuxtLink
                to="/courses/podcasts"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-podcast text-[#0EA5E9]"></i>
                <span>Подкасты</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Инструменты Dropdown (Logged-in only) -->
        <div v-if="auth.user" class="relative group">
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            :class="{ 'bg-white/10': isToolsRouteActive }"
          >
            <i class="fas fa-tools text-[#F59E0B] text-lg"></i>
            <span class="text-slate-300 font-medium group-hover:text-white"
              >Инструменты</span
            >
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white group-hover:-rotate-180 transition-all duration-300"
            ></i>
          </button>
          <span
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
          ></span>
          <div
            class="absolute top-12 left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <div
              class="bg-gradient-to-b from-[#1A1F35] to-[#1E293B] rounded-xl shadow-[0_4px_20px_rgba(123,97,255,0.2)] border border-white/10 min-w-[240px]"
            >
              <NuxtLink
                to="/awareness-tools/emotional-compass"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-compass text-[#F59E0B]"></i>
                <span>Эмоциональный компас</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/wheel-of-life"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-yin-yang text-[#F59E0B]"></i>
                <span>Колесо баланса </span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/life-purpose-archetype"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-star text-[#F59E0B]"></i>
                <span>12 Архетипов</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/big-5-model"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-chart-bar text-[#F59E0B]"></i>
                <span>Большая пятёрка</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/daily-growth-spark"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-bolt text-[#F59E0B]"></i>
                <span>Ежедневная искра роста</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Сообщество Dropdown -->
        <div class="relative group">
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            :class="{ 'bg-white/10': isCommunityRouteActive }"
          >
            <i class="fas fa-users text-[#E879F9] text-lg"></i>
            <span class="text-slate-300 font-medium group-hover:text-white"
              >Сообщество</span
            >
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white group-hover:-rotate-180 transition-all duration-300"
            ></i>
          </button>
          <span
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:w-full transition-all duration-300"
          ></span>
          <div
            class="absolute top-12 left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <div
              class="bg-gradient-to-b from-[#1A1F35] to-[#1E293B] rounded-xl shadow-[0_4px_20px_rgba(123,97,255,0.2)] border border-white/10 min-w-[240px]"
            >
              <NuxtLink
                to="/blog"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-book-open text-[#E879F9]"></i>
                <span>Блог</span>
              </NuxtLink>
              <NuxtLink
                to="/awareness-tools/inspiration-wall"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-lightbulb text-[#E879F9]"></i>
                <span>Инсайты других</span>
              </NuxtLink>
              <NuxtLink
                to="/faq"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-question-circle text-[#E879F9]"></i>
                <span>FAQ</span>
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-envelope text-[#E879F9]"></i>
                <span>Связь</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Static О проекте Link -->
        <NuxtLink
          to="/about"
          class="text-slate-300 font-medium hover:text-white transition-all duration-300"
          exact-active-class="text-white"
          @click="closeDropdown"
          >О проекте</NuxtLink
        >

        <!-- Ежедневная искра CTA (Logged-in only) -->
        <!-- <NuxtLink
          v-if="auth.user"
          to="/awareness-tools/daily-growth-spark"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] hover:from-[#22D3EE] hover:to-[#C084FC] transition-all duration-300"
          exact-active-class="bg-gradient-to-r from-[#22D3EE] to-[#C084FC]"
        >
          <i class="fas fa-bolt text-white"></i>
          <span class="text-white font-medium">Искра дня</span>
        </NuxtLink> -->

        <!-- Profile / Auth Section -->
        <div v-if="auth.user" class="relative group">
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
          >
            <i class="fas fa-user text-[#0EA5E9] text-lg"></i>
            <span class="text-slate-300 font-medium group-hover:text-white">{{
              auth.user.displayName || auth.user.email
            }}</span>
            <i
              class="fas fa-chevron-down text-xs text-slate-400 group-hover:text-white group-hover:-rotate-180 transition-all duration-300"
            ></i>
          </button>
          <div
            class="absolute top-12 right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <div
              class="bg-gradient-to-b from-[#1A1F35] to-[#1E293B] rounded-xl shadow-[0_4px_20px_rgba(123,97,255,0.2)] border border-white/10 min-w-[200px]"
            >
              <NuxtLink
                to="/profile"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-user-circle text-[#0EA5E9]"></i>
                <span>Мой Профиль</span>
              </NuxtLink>
              <NuxtLink
                :to="`/profile/${formattedUsername}_1`"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-tree text-[#0EA5E9]"></i>
                <span>Древо Себя</span>
              </NuxtLink>
              <NuxtLink
                to="/personal-cabinet"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-tachometer-alt text-[#0EA5E9]"></i>
                <span>Личный кабинет</span>
              </NuxtLink>
              <NuxtLink
                to="/personal-cabinet/progress"
                class="flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                exact-active-class="bg-white/10"
                @click="closeDropdown"
              >
                <i class="fas fa-chart-line text-[#0EA5E9]"></i>
                <span>Прогресс</span>
              </NuxtLink>
              <button
                @click="logoutUser"
                class="w-full flex items-center space-x-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <i class="fas fa-sign-out-alt text-red-400"></i>
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Logged-out State -->
        <div v-else class="flex items-center space-x-4">
          <NuxtLink
            to="/login"
            class="text-slate-300 font-medium hover:text-white transition-all duration-300"
            exact-active-class="text-white"
            >Войти</NuxtLink
          >
          <NuxtLink
            to="/register"
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white font-medium hover:from-[#22D3EE] hover:to-[#C084FC] transition-all duration-300"
            exact-active-class="bg-gradient-to-r from-[#22D3EE] to-[#C084FC]"
            >Регистрация</NuxtLink
          >
        </div>
      </div>

      <!-- Mobile Hamburger Menu -->
      <button
        @click="toggleDropdown"
        class="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors duration-300"
        aria-label="Toggle Menu"
      >
        <div class="relative w-5 h-5">
          <span
            class="absolute w-5 h-0.5 bg-slate-300 rounded transform transition duration-300 ease-in-out left-1/2 -translate-x-1/2"
            :class="[
              isDropdownOpen ? 'rotate-45 translate-y-0 top-1/2' : 'top-[20%]',
            ]"
          ></span>
          <span
            class="absolute w-5 h-0.5 bg-slate-300 rounded transform transition duration-300 ease-in-out left-1/2 -translate-x-1/2 top-1/2"
            :class="[isDropdownOpen ? 'opacity-0' : 'opacity-100']"
          ></span>
          <span
            class="absolute w-5 h-0.5 bg-slate-300 rounded transform transition duration-300 ease-in-out left-1/2 -translate-x-1/2"
            :class="[
              isDropdownOpen ? '-rotate-45 translate-y-0 top-1/2' : 'top-[80%]',
            ]"
          ></span>
        </div>
      </button>

      <!-- Mobile Menu -->
      <div
        data-menu="mobile"
        :class="[
          'lg:hidden absolute top-full left-0 right-0 bg-background border-t border-white/10 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-y-auto',
          isDropdownOpen
            ? 'translate-y-0 opacity-100 visible max-h-[80vh]'
            : '-translate-y-4 opacity-0 invisible max-h-0',
        ]"
      >
        <div class="p-4 space-y-4">
          <!-- Развитие -->
          <div>
            <button
              @click="toggleMobileSubmenu('growth')"
              class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              :class="{ 'bg-white/15': isGrowthRouteActive }"
            >
              <div class="flex items-center space-x-3">
                <i class="fas fa-book text-[#0EA5E9] text-lg"></i>
                <span class="font-medium text-slate-300 group-hover:text-white"
                  >Развитие</span
                >
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                :class="[
                  mobileSubmenuStates.growth || isGrowthRouteActive
                    ? 'rotate-180 text-white'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
              :class="[
                mobileSubmenuStates.growth || isGrowthRouteActive
                  ? 'max-h-[400px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-[#1A1F35]/50 p-4 space-y-2">
                <NuxtLink
                  to="/courses/courses"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-graduation-cap text-[#0EA5E9]"></i>
                  <span>Курсы</span>
                </NuxtLink>
                <NuxtLink
                  to="/courses/free-resources"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-gift text-[#0EA5E9]"></i>
                  <span>Бесплатные материалы</span>
                </NuxtLink>
                <NuxtLink
                  to="/courses/guides"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-book-open text-[#0EA5E9]"></i>
                  <span>Гайды</span>
                </NuxtLink>
                <NuxtLink
                  to="/courses/podcasts"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-podcast text-[#0EA5E9]"></i>
                  <span>Подкасты</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Инструменты (Logged-in only) -->
          <div v-if="auth.user">
            <button
              @click="toggleMobileSubmenu('tools')"
              class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              :class="{ 'bg-white/15': isToolsRouteActive }"
            >
              <div class="flex items-center space-x-3">
                <i class="fas fa-tools text-[#F59E0B] text-lg"></i>
                <span class="font-medium text-slate-300 group-hover:text-white"
                  >Инструменты</span
                >
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                :class="[
                  mobileSubmenuStates.tools || isToolsRouteActive
                    ? 'rotate-180 text-white'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
              :class="[
                mobileSubmenuStates.tools || isToolsRouteActive
                  ? 'max-h-[400px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-[#1A1F35]/50 p-4 space-y-2">
                <NuxtLink
                  to="/awareness-tools/emotional-compass"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-compass text-[#F59E0B]"></i>
                  <span>Эмоциональный компас</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/wheel-of-life"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-yin-yang text-[#F59E0B]"></i>
                  <span>Колесо баланса</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/life-purpose-archetype"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-star text-[#F59E0B]"></i>
                  <span>12 Архетипов</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/big-5-model"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-chart-bar text-[#F59E0B]"></i>
                  <span>Большая пятёрка</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/daily-growth-spark"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-bolt text-[#F59E0B]"></i>
                  <span>Ежедневная искра роста</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Сообщество -->
          <div>
            <button
              @click="toggleMobileSubmenu('community')"
              class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              :class="{ 'bg-white/15': isCommunityRouteActive }"
            >
              <div class="flex items-center space-x-3">
                <i class="fas fa-users text-[#E879F9] text-lg"></i>
                <span class="font-medium text-slate-300 group-hover:text-white"
                  >Сообщество</span
                >
              </div>
              <i
                class="fas fa-chevron-down text-slate-400 transition-transform duration-300"
                :class="[
                  mobileSubmenuStates.community || isCommunityRouteActive
                    ? 'rotate-180 text-white'
                    : '',
                ]"
              ></i>
            </button>
            <div
              class="mt-2 rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
              :class="[
                mobileSubmenuStates.community || isCommunityRouteActive
                  ? 'max-h-[400px]'
                  : 'max-h-0',
              ]"
            >
              <div class="bg-[#1A1F35]/50 p-4 space-y-2">
                <NuxtLink
                  to="/blog"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-book-open text-[#E879F9]"></i>
                  <span>Блог</span>
                </NuxtLink>
                <NuxtLink
                  to="/awareness-tools/inspiration-wall"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-lightbulb text-[#E879F9]"></i>
                  <span>Инсайты других</span>
                </NuxtLink>
                <NuxtLink
                  to="/faq"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-question-circle text-[#E879F9]"></i>
                  <span>FAQ</span>
                </NuxtLink>
                <NuxtLink
                  to="/contact"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-envelope text-[#E879F9]"></i>
                  <span>Связь</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- О проекте -->
          <NuxtLink
            to="/about"
            class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
            exact-active-class="bg-white/15"
            @click="closeDropdown"
          >
            <i class="fas fa-info-circle text-[#0EA5E9] text-lg"></i>
            <span class="font-medium text-slate-300 group-hover:text-white"
              >О проекте</span
            >
          </NuxtLink>

          <!-- Auth Section -->
          <div class="pt-4 border-t border-white/10">
            <template v-if="auth.user">
              <div class="mb-4 p-4 rounded-xl bg-white/5">
                <span class="text-sm text-slate-400">Вы вошли как</span>
                <div class="text-white font-medium mt-1">
                  {{ auth.user.displayName || auth.user.email }}
                </div>
              </div>
              <div class="space-y-2">
                <NuxtLink
                  to="/profile"
                  class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-user text-[#0EA5E9] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Мой Профиль</span
                  >
                </NuxtLink>
                <NuxtLink
                  :to="`/profile/${formattedUsername}_1`"
                  class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-tree text-[#0EA5E9] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Древо Себя</span
                  >
                </NuxtLink>
                <NuxtLink
                  to="/personal-cabinet"
                  class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-tachometer-alt text-[#0EA5E9] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Личный кабинет</span
                  >
                </NuxtLink>
                <NuxtLink
                  to="/personal-cabinet/progress"
                  class="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-chart-line text-[#0EA5E9] text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Прогресс</span
                  >
                </NuxtLink>
                <button
                  @click="logoutUser"
                  class="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <i class="fas fa-sign-out-alt text-red-400 text-lg"></i>
                  <span
                    class="font-medium text-slate-300 group-hover:text-white"
                    >Выйти</span
                  >
                </button>
              </div>
            </template>
            <template v-else>
              <div class="space-y-2">
                <NuxtLink
                  to="/login"
                  class="flex items-center justify-center space-x-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  exact-active-class="bg-white/15"
                  @click="closeDropdown"
                >
                  <i class="fas fa-sign-in-alt text-[#0EA5E9]"></i>
                  <span class="font-medium text-slate-300">Войти</span>
                </NuxtLink>
                <NuxtLink
                  to="/register"
                  class="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] hover:from-[#22D3EE] hover:to-[#C084FC] transition-all duration-300"
                  exact-active-class="bg-gradient-to-r from-[#22D3EE] to-[#C084FC]"
                  @click="closeDropdown"
                >
                  <i class="fas fa-user-plus text-white"></i>
                  <span class="font-medium text-white">Регистрация</span>
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
  growth: false,
  tools: false,
  community: false,
});

// Computed properties for active route highlighting
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

onMounted(async () => {
  await auth.initAuth();
  document.addEventListener("click", handleOutsideClick);
  if (auth.user && auth.user.displayName) {
    const formattedUsername = auth.user.displayName.replace(/\s/g, "-"); // or .replace(/\s/g, '') for no spaces
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (!isDropdownOpen.value) {
    mobileSubmenuStates.value = {
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
  mobileSubmenuStates.value = { growth: false, tools: false, community: false };
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
.bg-background {
  background-color: #1a1f35;
}
</style>
