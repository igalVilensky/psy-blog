<template>
  <footer
    class="relative bg-gradient-to-b from-[#1A1F35] to-[#1E293B] overflow-hidden text-white"
  >
    <div class="absolute inset-0">
      <!-- Multiple organic shapes with different colors -->
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
      ></div>
    </div>

    <div class="relative container mx-auto px-4 max-w-6xl py-16">
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
                active-class="text-fuchsia-400"
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
              class="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-r-lg hover:from-[#22D3EE] hover:to-[#C084FC] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C084FC] focus:ring-offset-2 focus:ring-offset-[#1A1F35]"
            >
              Подписаться
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
          <div class="flex space-x-6">
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
    label: "Эмоциональный барометр",
    to: "/awareness-tools/emotional-barometer",
  },
  {
    label: "Глубокий разговор с картами",
    to: "/awareness-tools/deep-conversation-with-cards",
  },
  { label: "Дневник эмоций", to: "/awareness-tools/emotion-diary" },
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
    icon: "fab fa-instagram text-[#F97316]",
    link: "https://www.instagram.com/galactik.anastasia/",
  },
  { icon: "fab fa-telegram text-[#0EA5E9]", link: "https://t.me/your_channel" },
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

<style scoped>
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}
</style>
