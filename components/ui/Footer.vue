<template>
  <footer
    class="bg-gradient-to-br from-pink-800 to-purple-900 text-white py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Sitemap Section -->
        <div>
          <h4 class="text-xl font-bold mb-6 text-white">Карта сайта</h4>
          <ul class="space-y-3">
            <li v-for="(link, index) in sitemapLinks" :key="index">
              <NuxtLink
                :to="link.to"
                class="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div>
          <h4 class="text-xl font-bold mb-6 text-white">Социальные сети</h4>
          <div class="flex space-x-4">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.link"
              target="_blank"
              class="text-3xl hover:text-pink-400 transition-colors duration-300"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Email Subscription Section -->
        <div class="md:col-span-2">
          <h4 class="text-xl font-bold mb-6 text-white">
            Подпишитесь на наши инсайты
          </h4>
          <p class="text-gray-300 mb-4">
            Получайте еженедельные советы по личностному росту и развитию
          </p>
          <div class="flex">
            <input
              type="email"
              v-model="email"
              placeholder="Введите ваш email"
              class="w-full px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              @click="subscribeEmail"
              class="bg-pink-500 text-white px-6 py-3 rounded-r-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Подписаться
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright and Legal -->
      <div class="mt-12 pt-8 border-t border-pink-700 text-center">
        <p class="text-gray-400">
          © {{ new Date().getFullYear() }} Путь к Личностному Росту. Все права
          защищены.
        </p>
        <div class="mt-4 space-x-4">
          <NuxtLink
            to="/privacy"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Политика конфиденциальности
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-gray-300 hover:text-white transition-colors"
          >
            Условия использования
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

// Reactive email input
const email = ref("");

// Sitemap links from the navigation
const sitemapLinks = [
  { label: "Бесплатные материалы", to: "/courses/free-resources" },
  { label: "Курсы", to: "/courses/courses" },
  { label: "Гайды", to: "/courses/guides" },
  { label: " Подкасты ", to: "/courses/podcasts" },
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

// Email subscription method (placeholder)
const subscribeEmail = () => {
  if (email.value && validateEmail(email.value)) {
    // Here you would typically call an API to handle email subscription
    alert(`Спасибо за подписку: ${email.value}`);
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
