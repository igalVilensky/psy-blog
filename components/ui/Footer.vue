<template>
  <footer
    class="relative z-20 bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-mindqlab-calm-text dark:text-mindqlab-calm-dark-text border-t border-stone-100 dark:border-stone-800/60 transition-colors duration-500 overflow-hidden">

    <div class="relative container mx-auto px-6 max-w-7xl py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

        <!-- Brand & Mission -->
        <div class="lg:col-span-2">
          <NuxtLink to="/"
            class="text-2xl font-light tracking-wide flex items-center gap-2 mb-6 text-stone-900 dark:text-white hover:text-mindqlab-calm-accent transition-colors duration-300">
            <span class="font-medium">MindQLab</span>
          </NuxtLink>
          <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-8 max-w-sm">
            Платформа для диагностики, понимания и развития мышления. Структурированный подход к личной эффективности на
            основе данных и практики.
          </p>
          <div class="flex flex-wrap gap-4">
            <a v-for="(social, index) in socialLinks" :key="index" :href="social.link" target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full flex items-center justify-center border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-mindqlab-calm-accent hover:border-mindqlab-calm-accent hover:scale-110 transition-all duration-300">
              <i :class="social.icon" class="text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Sitemap -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-widest mb-6 text-stone-400">Навигация</h4>
          <ul class="space-y-4">
            <li v-for="(link, index) in sitemapLinks.slice(0, 6)" :key="index">
              <NuxtLink :to="link.to"
                class="footer-nav-link group flex items-center gap-0 hover:gap-3 text-stone-500 dark:text-stone-400 hover:text-mindqlab-calm-accent transition-all duration-300 text-sm font-medium">
                <span
                  class="w-0 h-1 bg-mindqlab-calm-accent rounded-full transition-all duration-300 group-hover:w-2 overflow-hidden"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-widest mb-6 text-stone-400">Ресурсы</h4>
          <ul class="space-y-4">
            <li v-for="(link, index) in sitemapLinks.slice(6)" :key="index">
              <NuxtLink :to="link.to"
                class="footer-nav-link group flex items-center gap-0 hover:gap-3 text-stone-500 dark:text-stone-400 hover:text-mindqlab-calm-accent transition-all duration-300 text-sm font-medium">
                <span
                  class="w-0 h-1 bg-mindqlab-calm-accent rounded-full transition-all duration-300 group-hover:w-2 overflow-hidden"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="lg:col-span-1">
          <h4 class="text-sm font-bold uppercase tracking-widest mb-6 text-stone-400">Подписка</h4>
          <p class="text-stone-500 dark:text-stone-400 text-xs mb-6 leading-relaxed">
            Получайте еженедельные инсайты и новости системы.
          </p>
          <div class="flex flex-col gap-3">
            <input type="email" v-model="email" placeholder="Ваш email"
              class="w-full px-4 py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:border-mindqlab-calm-accent outline-none text-sm transition-all" />
            <button @click="subscribeEmail"
              class="w-full py-3 bg-mindqlab-calm-accent hover:bg-opacity-90 text-white rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-mindqlab-calm-accent/20 hover:-translate-y-0.5 active:translate-y-0">
              Подписаться
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-24 pt-8 border-t border-stone-100 dark:border-stone-800/60 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-400">
        <div class="opacity-70">&copy; {{ new Date().getFullYear() }} MindQLab. Все права защищены.</div>

        <nav class="flex gap-8">
          <NuxtLink to="/legal/privacy" class="hover:text-mindqlab-calm-accent">Конфиденциальность</NuxtLink>
          <NuxtLink to="/legal/terms" class="hover:text-mindqlab-calm-accent">Условия</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-mindqlab-calm-accent">Контакты</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const sitemapLinks = [
  { label: "Центр Развития", to: "/space" },
  { label: "Тесты", to: "/space/tests" },
  { label: "Тренировка Мозга", to: "/space/brain-training" },
  { label: "Психология", to: "/space/psychology" },
  { label: "Медитация", to: "/space/mindfulness" },
  { label: "Саморазвитие", to: "/space/growth" },
  { label: "Дашборд", to: "/space/dashboard" },
  { label: "Сообщество", to: "/space/community" },
  { label: "Блог", to: "/blog" },
  { label: "О проекте", to: "/about" },
  { label: "FAQ", to: "/faq" }
];

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
  outline: 2px solid #66B8D9;
  outline-offset: 4px;
}

/* Active link highlighting */
.footer-nav-link.router-link-active {
  color: #66B8D9 !important;
}

.footer-nav-link.router-link-active span {
  width: 0.5rem !important;
  /* 8px */
}
</style>
