<template>
  <footer
    class="bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 py-12 md:py-16 transition-colors duration-300 border-t border-stone-200 dark:border-stone-800">
    <div class="container mx-auto px-6 ">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

        <!-- Brand -->
        <div class="lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-3 mb-6 group">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <img src="/mindqlab-logo.png" alt="MindQLab"
                class="w-full h-full object-cover p-0.5 rounded-xl bg-white dark:bg-stone-900" />
            </div>
            <span
              class="text-2xl font-bold text-stone-900 dark:text-white group-hover:text-brand-primary transition-colors duration-300 font-montserrat">MindQLab</span>
          </NuxtLink>
          <p class="text-sm leading-relaxed mb-6 max-w-sm">
            Лаборатория осознанного роста. Помогаем исследовать себя и становиться лучше каждый день через науку и
            технологии.
          </p>
          <div class="flex flex-wrap gap-3">
            <a v-for="(social, index) in socialLinks" :key="index" :href="social.link" target="_blank" rel="noopener"
              class="w-10 h-10 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary dark:hover:bg-brand-primary dark:hover:border-brand-primary transition-all duration-300 text-stone-500 dark:text-stone-400 hover:text-white dark:hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-1">
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Лаборатория -->
        <div>
          <h4 class="text-stone-900 dark:text-white font-bold mb-6 font-montserrat">Лаборатория</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/lab/tests"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-flask text-xs text-brand-primary/50 group-hover:text-brand-primary transition-colors"></i>
                Тесты</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lab/brain-training"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-gamepad text-xs text-brand-secondary/50 group-hover:text-brand-secondary transition-colors"></i>
                Тренировка мозга</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lab/growth"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-seedling text-xs text-purple-500/50 group-hover:text-purple-500 transition-colors"></i>
                Саморазвитие</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lab/psychology"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-book-open text-xs text-blue-500/50 group-hover:text-blue-500 transition-colors"></i>
                Психология</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lab/mindfulness"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-spa text-xs text-emerald-500/50 group-hover:text-emerald-500 transition-colors"></i>
                Медитация</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lab/dashboard"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-chart-pie text-xs text-brand-accent/50 group-hover:text-brand-accent transition-colors"></i>
                Дашборд</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lab/community"
                class="hover:text-brand-primary transition-colors duration-300 flex items-center gap-2 group"><i
                  class="fas fa-users text-xs text-orange-500/50 group-hover:text-orange-500 transition-colors"></i>
                Сообщество</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Ресурсы -->
        <div>
          <h4 class="text-stone-900 dark:text-white font-bold mb-6 font-montserrat">Ресурсы</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/blog" class="hover:text-brand-primary transition-colors duration-300">Блог</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/courses" class="hover:text-brand-primary transition-colors duration-300">Курсы</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-brand-primary transition-colors duration-300">О проекте</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="hover:text-brand-primary transition-colors duration-300">FAQ</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-brand-primary transition-colors duration-300">Поддержка
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Подписка -->
        <div>
          <h4 class="text-stone-900 dark:text-white font-bold mb-6 font-montserrat">Будь в курсе</h4>
          <p class="text-xs mb-4 opacity-80 leading-relaxed">
            Получайте полезные инсайты и новости проекта раз в неделю.
          </p>
          <div class="flex flex-col gap-3">
            <input type="email" placeholder="Ваш Email"
              class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 transition-all duration-300 shadow-sm">
            <button
              class="bg-brand-primary hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-0.5">
              Подписаться
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
        <p>&copy; {{ new Date().getFullYear() }} MindQLab. Все права защищены.</p>
        <div class="flex flex-wrap justify-center gap-6">
          <NuxtLink to="/legal/privacy" class="hover:text-brand-primary transition-colors duration-300">Политика
            конфиденциальности</NuxtLink>
          <NuxtLink to="/legal/terms" class="hover:text-brand-primary transition-colors duration-300">Условия
            использования</NuxtLink>
          <NuxtLink to="/legal/privacy" class="hover:text-brand-primary transition-colors duration-300">Cookie
          </NuxtLink>
          <NuxtLink to="/contact" class="hover:text-brand-primary transition-colors duration-300">Контакты</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
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
</script>