<template>
  <footer class="relative bg-[#0D1117] overflow-hidden">
    <!-- Decorative gradient background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#1A1B26] to-[#242436]"
    ></div>
    <div
      class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,rgba(13,17,23,0.9),rgba(13,17,23,0.2))]"
    ></div>

    <!-- Animated gradient orbs -->
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 7s"
    ></div>
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"
      style="animation-duration: 5s"
    ></div>

    <div class="relative container mx-auto px-4 max-w-6xl py-16">
      <div class="grid md:grid-cols-4 gap-12">
        <!-- Sitemap Section -->
        <div>
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Карта сайта
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
          ></div>
          <ul class="space-y-3">
            <li v-for="(link, index) in sitemapLinks" :key="index">
              <NuxtLink
                active-class="text-pink-500"
                :to="link.to"
                class="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
              >
                <span
                  class="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div>
          <h4
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          >
            Социальные сети
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
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
                class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
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
            class="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400"
          >
            Подпишитесь на наши инсайты
          </h4>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-6"
          ></div>
          <p class="text-gray-300 mb-6">
            Получайте еженедельные советы по личностному росту и развитию
          </p>
          <div class="flex">
            <input
              type="email"
              v-model="email"
              placeholder="Введите ваш email"
              class="w-full px-4 py-3 rounded-l-lg bg-[#242436] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
            <button
              @click="subscribeEmail"
              class="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-r-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-[#0D1117]"
            >
              Подписаться
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright and Legal -->
      <div class="mt-16 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 mb-4 md:mb-0">
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
              class="text-gray-400 hover:text-white transition-colors duration-300"
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
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "../api/firebase/contact";

const db = getFirestore();

const email = ref("");

// Sitemap links from the navigation
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

// Social media links
const socialLinks = [
  {
    icon: "fab fa-instagram text-pink-500",
    link: "https://www.instagram.com/galactik.anastasia/",
  },
  {
    icon: "fab fa-telegram text-blue-400",
    link: "https://t.me/your_channel",
  },
  {
    icon: "fab fa-youtube text-red-600",
    link: "https://www.youtube.com/@gelichka84",
  },
];

// Email subscription method
const subscribeEmail = async () => {
  if (email.value && validateEmail(email.value)) {
    const result = await subscribeUser(db, email.value);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
    email.value = ""; // Clear input after submission
  } else {
    alert("Пожалуйста, введите корректный email");
  }
};

// Simple email validation
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};
</script>
