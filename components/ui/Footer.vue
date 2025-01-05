<template>
  <footer class="relative bg-[#2C3E50] overflow-hidden text-white">
    <!-- Enhanced Gradient Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#2C3E50] to-[#34495E] opacity-90"
    ></div>
    <div
      class="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-50"
      style="
        mask-image: linear-gradient(
          0deg,
          rgba(44, 62, 80, 0.9),
          rgba(44, 62, 80, 0.4)
        );
      "
    ></div>

    <!-- Animated Gradient Orbs -->
    <div
      class="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gradient-to-r from-[#3498DB]/30 to-[#27AE60]/20 rounded-full blur-3xl animate-[pulse_7s_infinite]"
    ></div>
    <div
      class="absolute top-0 left-0 w-[24rem] h-[24rem] bg-gradient-to-r from-[#9B59B6]/30 to-[#3498DB]/20 rounded-full blur-3xl animate-[pulse_5s_infinite]"
    ></div>

    <div class="relative container mx-auto px-4 max-w-6xl py-16">
      <div class="grid md:grid-cols-4 gap-12">
        <!-- Sitemap Section -->
        <div>
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#3498DB] to-[#9B59B6]"
          >
            Карта сайта
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-[#3498DB] to-[#27AE60] rounded-full mb-6"
          ></div>
          <ul class="space-y-3">
            <li v-for="(link, index) in sitemapLinks" :key="index">
              <NuxtLink
                active-class="text-[#27AE60]"
                :to="link.to"
                class="text-[#ECF0F1] hover:text-[#3498DB] transition-colors duration-300 flex items-center group"
              >
                <span
                  class="w-1 h-1 bg-[#27AE60] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div>
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#27AE60] to-[#F1C40F]"
          >
            Социальные сети
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-[#27AE60] to-[#F1C40F] rounded-full mb-6"
          ></div>
          <div class="flex space-x-6">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.link"
              target="_blank"
              class="group relative"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#3498DB]/30 to-[#27AE60]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <i
                :class="social.icon"
                class="text-3xl relative z-10 transition-transform duration-300 group-hover:scale-110"
              ></i>
            </a>
          </div>
        </div>

        <!-- Email Subscription Section -->
        <div class="md:col-span-2">
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F1C40F] to-[#9B59B6]"
          >
            Подпишитесь на наши инсайты
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-[#F1C40F] to-[#3498DB] rounded-full mb-6"
          ></div>
          <p class="text-[#ECF0F1] mb-6">
            Получайте еженедельные советы по личностному росту и развитию
          </p>
          <div class="flex">
            <input
              type="email"
              v-model="email"
              placeholder="Введите ваш email"
              class="w-full px-4 py-3 rounded-l-lg bg-[#34495E] border border-[#7F8C8D] text-white placeholder-[#BDC3C7] focus:outline-none focus:border-[#3498DB] focus:ring-1 focus:ring-[#3498DB] transition-all"
            />
            <button
              @click="subscribeEmail"
              class="px-6 py-3 bg-gradient-to-r from-[#27AE60] to-[#3498DB] text-white rounded-r-lg hover:from-[#2ECC71] hover:to-[#2980B9] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:ring-offset-2 focus:ring-offset-[#2C3E50]"
            >
              Подписаться
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright and Legal -->
      <div class="mt-16 pt-8 border-t border-[#7F8C8D]">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-[#BDC3C7] mb-4 md:mb-0">
            © {{ new Date().getFullYear() }} Путь к Личностному Росту. Все права
            защищены.
          </p>
          <div class="flex space-x-6">
            <NuxtLink
              v-for="(link, index) in [
                'Политика конфиденциальности',
                'Условия использования',
              ]"
              :key="index"
              :to="index === 0 ? '/legal/privacy' : '/legal/terms'"
              class="text-[#BDC3C7] hover:text-[#3498DB] transition-colors duration-300"
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
  { label: " Подкасты ", to: "/courses/podcasts" },
  {
    label: "Инструменты осознанности",
    to: "/awareness-tools",
  },
  {
    label: "Эмоциональный барометр",
    to: "/awareness-tools/emotional-barometer",
  },
  {
    label: "Глубокий разговор с картами",
    to: "/awareness-tools/deep-conversation-with-cards",
  },
  {
    label: "Дневник эмоций",
    to: "/awareness-tools/emotion-diary",
  },
  {
    label: "Открытие Архетипа Жизни",
    to: "/awareness-tools/life-purpose-archetype",
  },
  { label: "О проекте", to: "/about" },
  { label: "Блог", to: "/blog" },
  { label: "Связь", to: "/contact" },
];

const socialLinks = [
  {
    icon: "fab fa-instagram text-[#F1C40F]",
    link: "https://www.instagram.com/galactik.anastasia/",
  },
  {
    icon: "fab fa-telegram text-[#3498DB]",
    link: "https://t.me/your_channel",
  },
  {
    icon: "fab fa-youtube text-[#E74C3C]",
    link: "https://www.youtube.com/@gelichka84",
  },
];

const subscribeEmail = () => {
  if (email.value && validateEmail(email.value)) {
    alert("Спасибо за подписку!");
    email.value = ""; // Clear input after submission
  } else {
    alert("Пожалуйста, введите корректный email");
  }
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>
