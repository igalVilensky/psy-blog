<template>
  <footer
    class="relative z-20 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white border-t border-stone-200 dark:border-stone-800 transition-colors duration-500 overflow-hidden">

    <div class="relative container mx-auto px-6 max-w-7xl py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

        <!-- Brand & Mission -->
        <div class="lg:col-span-2">
          <NuxtLink to="/"
            class="text-2xl font-bold uppercase tracking-tight flex items-center gap-2 mb-6 text-stone-900 dark:text-white hover:text-stone-600 transition-colors duration-300">
            <span>MindQLab</span>
          </NuxtLink>
          <p
            class="text-stone-500 dark:text-stone-400 text-xs font-medium leading-relaxed mb-8 max-w-sm uppercase tracking-wide">
            Платформа для диагностики, понимания и развития мышления. Структурированный подход к личной эффективности.
          </p>
          <div class="flex flex-wrap gap-3">
            <a v-for="(social, index) in socialLinks" :key="index" :href="social.link" target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-400 transition-all duration-300">
              <i :class="social.icon" class="text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Sitemap -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest mb-6 text-stone-900 dark:text-white">Навигация</h4>
          <ul class="space-y-3">
            <li v-for="(link, index) in sitemapLinks.slice(0, 6)" :key="index">
              <NuxtLink :to="link.to"
                class="footer-nav-link group flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wider">
                <span class="w-0 h-0.5 bg-stone-900 dark:bg-white transition-all duration-300 group-hover:w-2"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest mb-6 text-stone-900 dark:text-white">Ресурсы</h4>
          <ul class="space-y-3">
            <li v-for="(link, index) in sitemapLinks.slice(6)" :key="index">
              <NuxtLink :to="link.to"
                class="footer-nav-link group flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wider">
                <span class="w-0 h-0.5 bg-stone-900 dark:bg-white transition-all duration-300 group-hover:w-2"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="lg:col-span-1">
          <h4 class="text-xs font-bold uppercase tracking-widest mb-6 text-stone-900 dark:text-white">Подписка</h4>
          <p
            class="text-stone-500 dark:text-stone-400 text-[10px] font-bold uppercase tracking-wide mb-6 leading-relaxed">
            Получайте еженедельные инсайты и новости системы.
          </p>
          <div class="flex flex-col gap-3">
            <input type="email" v-model="email" placeholder="YOUR@EMAIL.COM"
              class="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:border-stone-900 dark:focus:border-white outline-none text-xs font-bold uppercase tracking-custom transition-all placeholder-stone-300" />
            <button @click="subscribeEmail"
              class="w-full py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 dark:hover:bg-stone-200 transition-all">
              Подписаться
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-24 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-400">
        <div class="opacity-70">&copy; {{ new Date().getFullYear() }} MindQLab. Все права защищены.</div>

        <nav class="flex gap-8">
          <NuxtLink to="/legal/privacy" class="hover:text-stone-900 dark:hover:text-white transition-colors">
            Конфиденциальность</NuxtLink>
          <NuxtLink to="/legal/terms" class="hover:text-stone-900 dark:hover:text-white transition-colors">Условия
          </NuxtLink>
          <NuxtLink to="/contact" class="hover:text-stone-900 dark:hover:text-white transition-colors">Контакты
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const email = ref("");

const sitemapLinks = computed(() => {
  const links = [
    { label: "Центр Развития", to: "/space" },
    { label: "Тесты", to: "/space/tests" },
    { label: "Тренировка Мозга", to: "/space/brain-training" },
    { label: "Психология", to: "/space/psychology" },
    { label: "Медитация", to: "/space/mindfulness" },
    { label: "Саморазвитие", to: "/space/growth" },
    { label: "Голос → Структура", to: "/space/experiments/voice-structure" },
    { label: "Дашборд", to: "/space/dashboard" },
    { label: "Сообщество", to: "/space/community" },
    { label: "Блог", to: "/blog" },
    { label: "О проекте", to: "/about" },
    { label: "FAQ", to: "/faq" }
  ];

  if (auth.user?.isCoach) {
    links.splice(8, 0, { label: "Дашборд Коуча", to: "/coach" });
  }

  return links;
});

const socialLinks = [
  { icon: "fab fa-instagram", link: "https://www.instagram.com/galactik.anastasia/" },
  { icon: "fab fa-telegram", link: "https://web.telegram.org/a/#984171843" },
  { icon: "fab fa-youtube", link: "https://www.youtube.com/@MindQLab" },
  { icon: "fab fa-linkedin", link: "https://www.linkedin.com/company/mindqlab" },
  { icon: "fab fa-facebook", link: "https://www.facebook.com/people/MindQlab/61583775061278/" }
];

const subscribeEmail = () => {
  if (email.value && validateEmail(email.value)) {
    alert("Спасибо за подписку!");
    email.value = "";
  } else {
    alert("Пожалуйста, введите корректный email");
  }
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>

<style scoped>
/* Focus states for accessibility */
input:focus-visible,
button:focus-visible,
a:focus-visible {
  outline: 2px solid #1c1917;
  /* stone-900 */
  outline-offset: 4px;
}

.dark input:focus-visible,
.dark button:focus-visible,
.dark a:focus-visible {
  outline: 2px solid #ffffff;
}

/* Active link highlighting */
.footer-nav-link.router-link-active {
  color: #1c1917 !important;
  /* stone-900 */
}

.dark .footer-nav-link.router-link-active {
  color: #ffffff !important;
}

.footer-nav-link.router-link-active span {
  width: 0.5rem !important;
  /* 8px */
}
</style>
