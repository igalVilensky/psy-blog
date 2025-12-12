<template>
  <footer
    class="relative z-20 bg-white dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/60 transition-colors duration-500">
    <!-- Subtle top glow -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
    </div>

    <div class="relative container mx-auto px-4 sm:px-0 max-w-6xl py-12 md:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <!-- Sitemap Section -->
        <div class="animate-fade-in-up">
          <h4
            class="text-lg md:text-xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Карта сайта
          </h4>
          <div class="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4 md:mb-6"></div>
          <ul class="space-y-2.5 md:space-y-3">
            <li v-for="(link, index) in sitemapLinks" :key="index">
              <NuxtLink :to="link.to" exact-active-class="text-cyan-600 dark:text-cyan-400 font-semibold"
                class="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 flex items-center group text-sm md:text-base">
                <span
                  class="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div class="animate-fade-in-up" style="animation-delay: 0.1s">
          <h4
            class="text-lg md:text-xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Социальные сети
          </h4>
          <div class="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 md:mb-6"></div>
          <div class="flex flex-wrap gap-3 md:gap-4">
            <a v-for="(social, index) in socialLinks" :key="index" :href="social.link" target="_blank"
              rel="noopener noreferrer" class="group relative">
              <div
                class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
              </div>
              <div
                class="relative w-12 h-12 md:w-14 md:h-14 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl flex items-center justify-center group-hover:border-purple-500/60 group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-300 group-hover:scale-110">
                <i :class="social.icon"
                  class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300"></i>
              </div>
            </a>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="sm:col-span-2 animate-fade-in-up" style="animation-delay: 0.2s">
          <h4
            class="text-lg md:text-xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Подпишитесь на инсайты
          </h4>
          <div class="w-12 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full mb-4 md:mb-6">
          </div>
          <p class="text-slate-600 dark:text-slate-400 mb-6 text-sm md:text-base leading-relaxed">
            Получайте еженедельные советы по личностному росту, новые тесты и
            эксклюзивные материалы
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <input type="email" v-model="email" placeholder="Введите ваш email"
              class="flex-1 px-4 py-3 md:py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm md:text-base" />
            <button @click="subscribeEmail"
              class="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 overflow-hidden font-semibold rounded-xl transition-all duration-300 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 text-sm md:text-base">
              <span class="relative flex items-center gap-2">
                <i class="fas fa-envelope"></i>
                <span>Подписаться</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="mt-12 md:mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/60">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-slate-500 text-sm md:text-base text-center md:text-left">
            © {{ new Date().getFullYear() }} MindQ Lab. Все права защищены.
          </p>
          <div class="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
            <NuxtLink to="/legal/privacy"
              class="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300">
              Политика конфиденциальности
            </NuxtLink>
            <span class="text-slate-700">•</span>
            <NuxtLink to="/legal/terms"
              class="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300">
              Условия использования
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const sitemapLinks = [
  { label: "Лаборатория", to: "/lab" },
  { label: "Тесты", to: "/lab/tests" },
  { label: "Тренировка Мозга", to: "/lab/brain-training" },
  { label: "Психология", to: "/lab/psychology" },
  { label: "Медитация", to: "/lab/mindfulness" },
  { label: "Карта Мозга", to: "/lab/brain-map" },
  { label: "Нейро Анализ", to: "/lab/dashboard" },
  { label: "Эксперименты", to: "/lab/experiments" },
  { label: "Обсерватория роста", to: "/lab/analysis" },
  { label: "Сообщество", to: "/lab/community" },
  { label: "Блог", to: "/blog" },
  { label: "О проекте", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Контакты", to: "/contact" },
];

const socialLinks = [
  {
    icon: "fab fa-instagram",
    link: "https://www.instagram.com/galactik.anastasia/",
  },
  {
    icon: "fab fa-telegram",
    link: "https://web.telegram.org/a/#984171843",
  },
  {
    icon: "fab fa-youtube",
    link: "https://www.youtube.com/@gelichka84",
  },
  {
    icon: "fab fa-linkedin",
    link: "https://www.linkedin.com/company/mindqlab",
  },
  {
    icon: "fab fa-facebook",
    link: "https://www.facebook.com/people/MindQlab/61583775061278/",
  },
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
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out backwards;
}

/* Enhanced focus states for accessibility */
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid theme("colors.cyan.400");
  outline-offset: 4px;
  border-radius: 0.75rem;
}
</style>
