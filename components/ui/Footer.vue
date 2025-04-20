<template>
  <footer class="relative bg-background overflow-hidden text-white">
    <!-- Neon glow divider at the top of the footer -->
    <div
      class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#0EA5E9]/50 via-[#F59E0B]/50 to-[#E879F9]/50"
    ></div>

    <div class="relative container mx-auto px-4 xl:px-0 max-w-6xl py-16">
      <div class="grid md:grid-cols-4 gap-12">
        <!-- Sitemap Section -->
        <div>
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]"
          >
            Карта сайта
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] rounded-full mb-6"
          ></div>
          <ul class="space-y-3">
            <li v-for="(link, index) in sitemapLinks" :key="index">
              <NuxtLink
                :to="link.to"
                exact-active-class="text-[#0EA5E9] font-semibold"
                class="text-slate-300 hover:text-[#22D3EE] transition-colors duration-300 flex items-center group"
              >
                <span
                  class="w-1.5 h-1.5 bg-[#C084FC] rounded-full mr-2 scale-0 group-hover:scale-100 transition-transform duration-300"
                ></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div>
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F59E0B] to-[#F97316]"
          >
            Социальные сети
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full mb-6"
          ></div>
          <div class="flex space-x-6">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.link"
              target="_blank"
              class="group relative p-3"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <i
                :class="social.icon"
                class="text-2xl relative z-10 text-slate-300 group-hover:text-white transition-all duration-300 group-hover:scale-110"
              ></i>
            </a>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="md:col-span-2">
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E879F9] to-[#C084FC]"
          >
            Подпишитесь на наши инсайты
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-[#E879F9] to-[#C084FC] rounded-full mb-6"
          ></div>
          <p class="text-slate-300 mb-6">
            Получайте еженедельные советы по личностному росту и развитию
          </p>
          <div class="flex">
            <input
              type="email"
              v-model="email"
              placeholder="Введите ваш email"
              class="w-full px-4 py-3 rounded-l-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] transition-all"
            />
            <button
              @click="subscribeEmail"
              class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-r-lg group"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
              >
                <i class="fas fa-envelope"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
              >
                Подписаться
              </span>
              <span class="relative invisible">Подписаться</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="mt-16 pt-8 border-t border-slate-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-slate-400 mb-4 md:mb-0">
            © {{ new Date().getFullYear() }} Путь к Личностному Росту. Все права
            защищены.
          </p>
          <div class="flex space-x-2">
            <NuxtLink
              v-for="(link, index) in [
                'Политика конфиденциальности',
                'Условия использования',
              ]"
              :key="index"
              :to="index === 0 ? '/legal/privacy' : '/legal/terms'"
              class="text-slate-400 hover:text-[#22D3EE] transition-colors duration-300"
            >
              {{ link }}
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
  { label: "Бесплатные материалы", to: "/courses/free-resources" },
  { label: "Курсы", to: "/courses/courses" },
  { label: "Гайды", to: "/courses/guides" },
  { label: "Подкасты", to: "/courses/podcasts" },
  { label: "Инструменты осознанности", to: "/awareness-tools" },
  {
    label: "Эмоциональный компас",
    to: "/awareness-tools/emotional-compass",
  },
  {
    label: "Колесо баланса",
    to: "/awareness-tools/wheel-of-life",
  },
  {
    label: "12 Архетипов",
    to: "/awareness-tools/life-purpose-archetype",
  },
  {
    label: "Большая пятёрка",
    to: "/awareness-tools/big-5-model",
  },
  { label: "О проекте", to: "/about" },
  { label: "Блог", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Связь", to: "/contact" },
];

const socialLinks = [
  {
    icon: "fab fa-instagram text-[#F97316]",
    link: "https://www.instagram.com/galactik.anastasia/",
  },
  {
    icon: "fab fa-telegram text-[#0EA5E9]",
    link: "https://web.telegram.org/a/#984171843",
  },
  {
    icon: "fab fa-youtube text-[#E879F9]",
    link: "https://www.youtube.com/@gelichka84",
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
