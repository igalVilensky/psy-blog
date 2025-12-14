<template>
  <nav
    class="sticky top-0 z-50 w-full h-20 transition-all duration-300 border-b border-stone-200/50 dark:border-stone-800/50 bg-white/80 dark:bg-brand-dark/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
    
    <!-- Top accent line -->
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent opacity-80"></div>

    <div class="container px-4 md:px-6 mx-auto h-full relative z-50">
      <div class="flex justify-between items-center h-full">
        
        <!-- Logo -->
        <NuxtLink to="/index2" class="group relative flex items-center gap-3" @click="closeDropdown">
          <div class="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-brand-primary/20 group-hover:shadow-brand-primary/40 transition-all duration-300">
             <div class="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <img src="/mindqlab-logo.png" alt="MindQLab" class="relative z-10 w-full h-full object-cover p-0.5 bg-white dark:bg-brand-dark rounded-xl" />
          </div>
          <span class="font-montserrat font-bold text-xl text-brand-dark dark:text-white tracking-tight hidden sm:block">
            Mind<span class="text-brand-primary">Q</span>Lab
          </span>
        </NuxtLink>

        <!-- Desktop Menu (Masterpiece Style) -->
        <div class="hidden lg:flex items-center gap-1 h-full">
          <!-- Dropdown: Лаборатория -->
          <div class="relative group h-full flex items-center px-2">
            <button
              class="flex items-center gap-2 text-[15px] font-bold font-montserrat transition-colors duration-200"
              :class="isLabRouteActive ? 'text-brand-primary' : 'text-stone-600 dark:text-stone-300 hover:text-brand-secondary'">
              <span>Лаборатория</span>
              <i class="fas fa-chevron-down text-[10px] transition-transform duration-300 group-hover:rotate-180 opacity-60"></i>
            </button>

            <!-- Desktop Mega Menu -->
            <div class="absolute top-[calc(100%-5px)] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 w-max">
              <div class="bg-white dark:bg-brand-dark rounded-3xl shadow-2xl shadow-stone-200/50 dark:shadow-black/80 border border-stone-100 dark:border-stone-800/50 p-3 grid grid-cols-2 gap-2 overflow-hidden min-w-[600px]">
                
                <!-- 1. Тесты -->
                <NuxtLink to="/lab/tests" class="col-span-2 flex items-center gap-4 p-4 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group/item" @click="closeDropdown">
                   <div class="w-12 h-12 flex-shrink-0 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xl group-hover/item:scale-110 transition-transform duration-300">
                      <i class="fas fa-flask"></i>
                   </div>
                   <div class="flex-1">
                      <div class="font-bold text-brand-dark dark:text-white font-montserrat text-sm">Тесты</div>
                      <div class="text-xs text-stone-500 font-open-sans mt-0.5">Оценка функций и диагностика</div>
                   </div>
                   <i class="fas fa-arrow-right text-stone-300 group-hover/item:text-brand-primary transition-colors"></i>
                </NuxtLink>

                <!-- 2. Тренировка Мозга -->
                <NuxtLink to="/lab/brain-training" class="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" @click="closeDropdown">
                   <div class="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-brand-secondary flex items-center justify-center"><i class="fas fa-gamepad"></i></div>
                   <div>
                      <div class="text-sm font-bold text-stone-700 dark:text-stone-200 font-montserrat">Тренировка Мозга</div>
                      <div class="text-[11px] text-stone-400">Игры и упражнения</div>
                   </div>
                </NuxtLink>

                <!-- 3. Саморазвитие -->
                <NuxtLink to="/lab/growth" class="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" @click="closeDropdown">
                   <div class="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center"><i class="fas fa-seedling"></i></div>
                   <div>
                      <div class="text-sm font-bold text-stone-700 dark:text-stone-200 font-montserrat">Саморазвитие</div>
                      <div class="text-[11px] text-stone-400">Инструменты и практики</div>
                   </div>
                </NuxtLink>

                <!-- 4. Психология -->
                <NuxtLink to="/lab/psychology" class="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" @click="closeDropdown">
                   <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center"><i class="fas fa-book-open"></i></div>
                   <div>
                      <div class="text-sm font-bold text-stone-700 dark:text-stone-200 font-montserrat">Психология</div>
                      <div class="text-[11px] text-stone-400">Теории и техники</div>
                   </div>
                </NuxtLink>

                <!-- 5. Медитация -->
                <NuxtLink to="/lab/mindfulness" class="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" @click="closeDropdown">
                   <div class="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center"><i class="fas fa-spa"></i></div>
                   <div>
                      <div class="text-sm font-bold text-stone-700 dark:text-stone-200 font-montserrat">Медитация</div>
                      <div class="text-[11px] text-stone-400">Аудио и видео</div>
                   </div>
                </NuxtLink>

                <!-- 6. Центр Управления -->
                <NuxtLink to="/lab/dashboard" class="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" @click="closeDropdown">
                   <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-brand-accent flex items-center justify-center"><i class="fas fa-chart-pie"></i></div>
                   <div>
                      <div class="text-sm font-bold text-stone-700 dark:text-stone-200 font-montserrat">Центр Управления</div>
                      <div class="text-[11px] text-stone-400">Мониторинг и анализ</div>
                   </div>
                </NuxtLink>

                <!-- 7. Сообщество -->
                <NuxtLink to="/lab/community" class="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors" @click="closeDropdown">
                   <div class="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center"><i class="fas fa-users"></i></div>
                   <div>
                      <div class="text-sm font-bold text-stone-700 dark:text-stone-200 font-montserrat">Сообщество</div>
                      <div class="text-[11px] text-stone-400">Исследователи онлайн</div>
                   </div>
                </NuxtLink>

              </div>
            </div>
          </div>

          <!-- Blog Link -->
          <NuxtLink to="/blog" 
            class="px-4 py-2 text-[15px] font-bold font-montserrat rounded-full transition-all duration-200"
            :class="route.path.includes('/blog') ? 'bg-stone-100 dark:bg-stone-800 text-brand-dark dark:text-white' : 'text-stone-600 dark:text-stone-300 hover:text-brand-secondary hover:bg-stone-50 dark:hover:bg-stone-800/50'">
            Блог
          </NuxtLink>

          <!-- About Link -->
          <NuxtLink to="/about2" 
            class="px-4 py-2 text-[15px] font-bold font-montserrat rounded-full transition-all duration-200"
            :class="route.path.includes('/about2') ? 'bg-stone-100 dark:bg-stone-800 text-brand-dark dark:text-white' : 'text-stone-600 dark:text-stone-300 hover:text-brand-secondary hover:bg-stone-50 dark:hover:bg-stone-800/50'">
            О проекте
          </NuxtLink>
        </div>

        <!-- Right Side: Auth & Theme -->
        <div class="flex items-center gap-2 md:gap-3">
          <!-- Theme Toggle -->
          <button @click="themeStore.toggleTheme()" class="hidden lg:flex w-10 h-10 rounded-full items-center justify-center text-stone-500 hover:text-brand-primary hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200">
             <i class="fas" :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
          </button>

          <!-- Desktop Auth -->
          <div class="hidden lg:block pl-3 border-l border-stone-200 dark:border-stone-700">
             <ClientOnly>
                <div v-if="auth.user" class="relative group">
                   <button class="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 hover:border-brand-primary/50 hover:shadow-md transition-all duration-300 bg-white dark:bg-stone-800">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-secondary to-brand-accent flex items-center justify-center text-white text-xs font-bold shadow-sm">
                         {{ getUserInitials }}
                      </div>
                      <span class="text-sm font-bold text-stone-700 dark:text-stone-200 max-w-[100px] truncate">{{ auth.user.displayName || 'User' }}</span>
                      <i class="fas fa-chevron-down text-[10px] text-stone-400"></i>
                   </button>
                   <!-- User Menu -->
                   <div class="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64">
                      <div class="bg-white dark:bg-brand-dark rounded-2xl shadow-xl border border-stone-100 dark:border-stone-800 p-2 overflow-hidden">
                         <div class="px-4 py-3 border-b border-stone-100 dark:border-stone-800 mb-1">
                           <div class="text-xs text-stone-400 uppercase font-bold tracking-wider">Аккаунт</div>
                           <div class="text-sm font-bold text-brand-dark dark:text-white truncate">{{ auth.user.email }}</div>
                         </div>
                         <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-brand-secondary transition-colors font-bold text-sm">
                            <i class="fas fa-user-circle w-5"></i> Профиль
                         </NuxtLink>
                         <NuxtLink to="/personal-cabinet" class="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-brand-secondary transition-colors font-bold text-sm">
                            <i class="fas fa-tachometer-alt w-5"></i> Кабинет
                         </NuxtLink>
                         <div class="h-px bg-stone-100 dark:bg-stone-800 my-1"></div>
                         <button @click="logoutUser" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600 transition-colors text-left font-bold text-sm">
                            <i class="fas fa-sign-out-alt w-5"></i> Выйти
                         </button>
                      </div>
                   </div>
                </div>
                <div v-else class="flex items-center gap-3">
                   <NuxtLink to="/login" class="text-sm font-bold text-stone-600 hover:text-brand-dark dark:text-stone-300 dark:hover:text-white transition-colors">Войти</NuxtLink>
                   <NuxtLink to="/register" class="px-5 py-2.5 bg-brand-dark hover:bg-brand-primary text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-dark/20 hover:shadow-brand-primary/30 transform hover:-translate-y-0.5">Регистрация</NuxtLink>
                </div>
             </ClientOnly>
          </div>

          <!-- Mobile Hamburger -->
          <button @click="toggleDropdown" 
            class="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-brand-dark dark:text-white relative"
            aria-label="Toggle Menu">
            <div class="relative w-6 h-5 flex flex-col justify-center items-center">
              <span class="absolute h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out" :class="isDropdownOpen ? 'rotate-45' : '-translate-y-2'"></span>
              <span class="absolute h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out" :class="isDropdownOpen ? 'opacity-0' : 'opacity-100'"></span>
              <span class="absolute h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-in-out" :class="isDropdownOpen ? '-rotate-45' : 'translate-y-2'"></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU START -->
    <!-- Logic: absolute top-full (drops BELOW header), solid background (no visibility issues) -->
    <div 
      class="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-brand-dark border-t border-stone-200 dark:border-stone-800 shadow-2xl transition-all duration-300 overflow-y-auto"
      :class="isDropdownOpen ? 'opacity-100 visible max-h-[calc(100vh-80px)]' : 'opacity-0 invisible max-h-0'"
      style="z-index: 40;"
    >
      <div class="p-4 space-y-2 pb-10">
          
          <!-- Theme Toggle Mobile -->
          <button @click="themeStore.toggleTheme()" class="w-full flex items-center space-x-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 mb-4">
             <i class="fas text-brand-primary" :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
             <span class="font-bold text-stone-700 dark:text-stone-200">{{ themeStore.theme === 'dark' ? 'Темная тема' : 'Светлая тема' }}</span>
          </button>

          <!-- Lab Accordion -->
          <div class="rounded-xl border border-stone-100 dark:border-stone-800 overflow-hidden" :class="isLabRouteActive ? 'bg-stone-50 dark:bg-stone-900' : 'bg-white dark:bg-brand-dark'">
             <div class="flex items-center justify-between p-1">
                <NuxtLink to="/lab" class="flex-1 flex items-center gap-3 p-3 font-bold text-brand-dark dark:text-white" @click="closeDropdown">
                   <i class="fas fa-flask text-brand-primary"></i> Лаборатория
                </NuxtLink>
                <button @click="toggleMobileSubmenu('lab')" class="p-3">
                   <i class="fas fa-chevron-down transition-transform duration-300 text-xs text-stone-400" :class="mobileSubmenuStates.lab || isLabRouteActive ? 'rotate-180' : ''"></i>
                </button>
             </div>

             <!-- Accordion Content -->
             <div class="transition-all duration-300 overflow-hidden bg-stone-50/50 dark:bg-stone-900/50" :class="mobileSubmenuStates.lab || isLabRouteActive ? 'max-h-[800px]' : 'max-h-0'">
                <div class="p-2 space-y-1">
                   
                   <NuxtLink to="/lab/tests" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-flask text-brand-primary text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Тесты</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Оценка функций</span>
                   </NuxtLink>
                   
                   <NuxtLink to="/lab/brain-training" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-gamepad text-brand-secondary text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Тренировка Мозга</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Игры и упражнения</span>
                   </NuxtLink>
                   
                   <NuxtLink to="/lab/growth" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-seedling text-purple-500 text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Саморазвитие</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Инструменты и практики</span>
                   </NuxtLink>
                   
                   <NuxtLink to="/lab/psychology" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-book-open text-blue-500 text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Психология</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Теории и техники</span>
                   </NuxtLink>

                   <NuxtLink to="/lab/mindfulness" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-spa text-emerald-500 text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Медитация</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Аудио и видео</span>
                   </NuxtLink>
                   
                   <NuxtLink to="/lab/dashboard" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-chart-pie text-brand-accent text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Центр Управления</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Мониторинг и анализ</span>
                   </NuxtLink>

                   <NuxtLink to="/lab/community" class="flex flex-col px-4 py-3 rounded-lg hover:bg-white dark:hover:bg-brand-dark transition-colors" @click="closeDropdown">
                      <div class="flex items-center gap-2">
                         <i class="fas fa-users text-orange-500 text-xs w-4"></i>
                         <span class="text-sm font-bold text-stone-700 dark:text-stone-200">Сообщество</span>
                      </div>
                      <span class="text-[11px] text-stone-400 pl-6">Исследователи онлайн</span>
                   </NuxtLink>

                </div>
             </div>
          </div>

          <NuxtLink to="/blog" class="flex items-center gap-3 p-4 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 border border-transparent hover:border-stone-100 transition-colors font-bold text-brand-dark dark:text-white" @click="closeDropdown">
             <i class="fas fa-book-open text-brand-secondary"></i> Блог
          </NuxtLink>

          <NuxtLink to="/about2" class="flex items-center gap-3 p-4 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 border border-transparent hover:border-stone-100 transition-colors font-bold text-brand-dark dark:text-white" @click="closeDropdown">
             <i class="fas fa-info-circle text-stone-400"></i> О проекте
          </NuxtLink>

          <!-- Mobile Auth -->
          <div class="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800">
             <ClientOnly>
                <div v-if="auth.user">
                   <div class="flex items-center gap-3 mb-4 p-3 bg-stone-50 dark:bg-stone-900 rounded-xl">
                      <div class="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold">{{ getUserInitials }}</div>
                      <div class="font-bold text-sm text-brand-dark dark:text-white">{{ auth.user.displayName }}</div>
                   </div>
                   <div class="space-y-2">
                      <NuxtLink to="/profile" class="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900 text-sm font-bold text-stone-600 dark:text-stone-300">
                         <i class="fas fa-user text-stone-400"></i> Мой Профиль
                      </NuxtLink>
                      <button @click="logoutUser" class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-sm font-bold text-red-500">
                         <i class="fas fa-sign-out-alt"></i> Выйти
                      </button>
                   </div>
                </div>
                <div v-else class="space-y-3">
                   <NuxtLink to="/login" class="flex items-center justify-center p-3 rounded-xl border border-stone-200 dark:border-stone-700 font-bold text-stone-700 dark:text-white" @click="closeDropdown">Войти</NuxtLink>
                   <NuxtLink to="/register" class="flex items-center justify-center p-3 rounded-xl bg-brand-dark text-white font-bold" @click="closeDropdown">Регистрация</NuxtLink>
                </div>
             </ClientOnly>
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
});

const isLabRouteActive = computed(() => route.path.startsWith("/lab"));

const getUserInitials = computed(() => {
  if (!auth.user?.displayName) return "U";
  return auth.user.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
    mobileSubmenuStates.value.lab = false;
  }
};

const toggleMobileSubmenu = (submenu) => {
  mobileSubmenuStates.value[submenu] = !mobileSubmenuStates.value[submenu];
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
  mobileSubmenuStates.value.lab = false;
};

const handleOutsideClick = (event) => {
  const nav = document.querySelector('nav');
  if (nav && !nav.contains(event.target) && isDropdownOpen.value) {
    closeDropdown();
  }
};

const logoutUser = async () => {
  await auth.logout();
  router.push("/login");
  closeDropdown();
};
</script>