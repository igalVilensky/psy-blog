<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#111827] text-white"
  >
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div
        class="absolute w-72 h-72 bg-[#0EA5E9]/20 rounded-full blur-3xl top-12 left-12 animate-pulse"
      ></div>
      <div
        class="absolute w-96 h-96 bg-[#E879F9]/20 rounded-full blur-3xl bottom-12 right-12 animate-pulse delay-500"
      ></div>
    </div>

    <div class="container mx-auto max-w-4xl px-4 py-16 relative z-10">
      <header class="text-center mb-16">
        <h1
          class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] mb-4"
        >
          Часто задаваемые вопросы
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Ваш путь к самопознанию начинается здесь. Найдите ответы на важные
          вопросы о нашем проекте личностного роста.
        </p>
      </header>

      <div class="space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-[#1E293B]/60 border border-[#0EA5E9]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0EA5E9]/40 hover:shadow-xl"
        >
          <button
            @click="toggleFAQ(index)"
            class="w-full p-6 flex justify-between items-center text-left focus:outline-none group"
          >
            <h2
              class="text-lg md:text-xl font-semibold text-white/90 transition-colors group-hover:text-[#0EA5E9]"
            >
              {{ faq.question }}
            </h2>
            <div class="ml-4">
              <i
                :class="[
                  'fas',
                  'fa-chevron-down',
                  'text-[#0EA5E9]',
                  'text-xl',
                  'transition-transform',
                  'duration-300',
                  { 'rotate-180': faq.isOpen },
                ]"
              ></i>
            </div>
          </button>

          <transition name="accordion">
            <div
              v-if="faq.isOpen"
              class="px-6 pb-6 text-slate-300 text-base leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-16 bg-[#1E293B]/60 border border-[#0EA5E9]/10 rounded-2xl p-8 text-center"
      >
        <h3
          class="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
        >
          Остались вопросы?
        </h3>
        <p class="text-slate-400 mb-6 max-w-xl mx-auto">
          Наша команда готова помочь вам на пути личностного развития. Свяжитесь
          с нами для индивидуальной поддержки.
        </p>
        <NuxtLink
          to="/contact"
          class="group relative inline-flex items-center justify-center px-10 py-3.5 overflow-hidden rounded-lg bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/40 transition-all duration-300"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></span>
          <span
            class="relative text-[#0EA5E9] group-hover:text-white flex items-center px-3 py-2"
          >
            <i class="fas fa-paper-plane mr-3"></i>
            Связаться с поддержкой
          </span>
        </NuxtLink>

        <!-- Social Media Links -->
        <div class="pt-8 flex justify-center space-x-4">
          <!-- Telegram -->
          <a
            href="https://web.telegram.org/a/#984171843"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center p-3 bg-[#0EA5E9]/10 rounded-lg overflow-hidden transition-all duration-300"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] group-hover:translate-x-0 ease"
            >
              <i class="fab fa-telegram"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fab fa-telegram"></i>
            </span>
            <span class="relative invisible">Telegram</span>
          </a>

          <!-- Instagram -->
          <a
            href="https://www.instagram.com/galactik.anastasia/"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center p-3 bg-[#F59E0B]/10 rounded-lg overflow-hidden transition-all duration-300"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] group-hover:translate-x-0 ease"
            >
              <i class="fab fa-instagram"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#F59E0B] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fab fa-instagram"></i>
            </span>
            <span class="relative invisible">Instagram</span>
          </a>

          <!-- WhatsApp -->
          <a
            href="https://wa.me/491636920612"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center p-3 bg-[#E879F9]/10 rounded-lg overflow-hidden transition-all duration-300"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#E879F9] to-[#C084FC] group-hover:translate-x-0 ease"
            >
              <i class="fab fa-whatsapp"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#E879F9] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fab fa-whatsapp"></i>
            </span>
            <span class="relative invisible">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@unhead/vue";

// SEO metadata with useHead
useHead({
  title: "Часто задаваемые вопросы - Осознанное развитие с Анастасией",
  meta: [
    {
      name: "description",
      content:
        "Ответы на частые вопросы о курсах личностного роста, инструментах осознанности, тестах и сообществе. Начните свой путь к самопознанию с нами!",
    },
    {
      name: "keywords",
      content:
        "FAQ, личностный рост, самопознание, эмоциональный компас, курсы развития, психологический профиль, Анастасия",
    },
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  htmlAttrs: { lang: "ru" },
});

// FAQ Data
const faqs = ref([
  {
    question: "Что такое этот проект?",
    answer:
      "Это пространство осознанного развития, созданное Анастасией, где вы найдете курсы, гайды, тесты и инструменты, такие как Эмоциональный компас, чтобы лучше понять себя и улучшить свою жизнь.",
    isOpen: false,
  },
  {
    question: "Для кого предназначены курсы?",
    answer:
      "Курсы подходят всем, кто стремится к личностному росту, развитию навыков и гармоничным отношениям. Они разработаны экспертами и адаптированы для разных уровней подготовки.",
    isOpen: false,
  },
  {
    question: "Что такое Эмоциональный компас?",
    answer:
      "Эмоциональный компас — это инструмент, который помогает отслеживать и понимать свои эмоции, чтобы принимать осознанные решения в жизни.",
    isOpen: false,
  },
  {
    question: "Как начать использовать тесты?",
    answer:
      "Создайте профиль на сайте, выберите интересующий тест (например, Большая пятёрка или Открытие Архетипа Жизни) и следуйте инструкциям. Результаты сохранятся в вашем психологическом профиле.",
    isOpen: false,
  },
  {
    question: "Бесплатны ли материалы?",
    answer:
      "Да, у нас есть бесплатные материалы, такие как подкасты и некоторые гайды. Основные курсы и инструменты доступны по подписке или за отдельную плату.",
    isOpen: false,
  },
  {
    question: "Как создать психологический профиль?",
    answer:
      "Пройдите тесты и используйте инструменты, такие как Эмоциональный компас. Ваши данные автоматически сохраняются в профиле, который вы можете редактировать в настройках.",
    isOpen: false,
  },
  {
    question: "Могу ли я делиться результатами тестов?",
    answer:
      "Да, вы можете экспортировать свои данные через раздел управления аккаунтом в настройках и делиться ими по своему усмотрению.",
    isOpen: false,
  },
  {
    question: "Что делать, если у меня возникли проблемы с доступом?",
    answer:
      "Свяжитесь с нашей поддержкой через форму обратной связи в разделе 'Связь' или на странице настроек. Мы ответим в течение 24 часов.",
    isOpen: false,
  },
  {
    question: "Как присоединиться к сообществу?",
    answer:
      "Зарегистрируйтесь на сайте и начните участвовать в обсуждениях, доступных через раздел 'Поддерживающие сообщества'. Это отличный способ найти единомышленников!",
    isOpen: false,
  },
  {
    question: "Могу ли я предложить тему для гайда или курса?",
    answer:
      "Конечно! Напишите нам через форму обратной связи с вашим предложением, и мы рассмотрим его для будущих материалов.",
    isOpen: false,
  },
]);

// Toggle FAQ Answer Visibility
const toggleFAQ = (index) => {
  faqs.value = faqs.value.map((faq, i) => ({
    ...faq,
    isOpen: i === index ? !faq.isOpen : false,
  }));
};
</script>

<style scoped>
/* Accordion Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
