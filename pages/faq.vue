<template>
  <div
    class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white font-sans transition-colors duration-500">
    <TopBar />

    <div class="max-w-4xl mx-auto px-6 py-12 lg:py-20">
      <!-- Header Section -->
      <div class="text-center mb-12 lg:mb-20">
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
          <span class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Справка</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white mb-6">
          Часто задаваемые вопросы
        </h1>
        <p class="text-stone-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mx-auto">
          Все о MindQLab — вашем пространстве осознанного развития. Узнайте, как мы помогаем исследовать себя и
          достигать новых высот.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index"
          class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
          <button @click="toggleFAQ(index)"
            class="w-full p-6 flex justify-between items-center text-left focus:outline-none hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
            <h2 class="text-lg font-bold text-stone-900 dark:text-white pr-8">
              {{ faq.question }}
            </h2>
            <div class="flex-shrink-0">
              <i :class="[
                'fas',
                'fa-chevron-down',
                'text-stone-400',
                'transition-transform',
                'duration-300',
                { 'rotate-180': faq.isOpen },
              ]"></i>
            </div>
          </button>

          <div class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="faq.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
            <div class="px-6 pb-6 pt-0 border-t border-stone-100 dark:border-stone-800">
              <div class="text-stone-700 dark:text-stone-300 leading-relaxed pt-6">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-12 lg:mt-20 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 text-center">
        <h3 class="text-xl font-bold text-stone-900 dark:text-white mb-4">
          Остались вопросы о платформе?
        </h3>
        <p class="text-stone-600 dark:text-stone-400 mb-6 max-w-xl mx-auto">
          Наша команда готова помочь вам разобраться в функционале MindQLab и подобрать правильные инструменты.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/contact"
            class="px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
            <i class="fas fa-paper-plane mr-2"></i>
            Связаться с нами
          </NuxtLink>
        </div>

        <!-- Social Media Links -->
        <div class="pt-8 mt-8 border-t border-stone-100 dark:border-stone-800 flex justify-center gap-4">
          <!-- Telegram -->
          <a href="https://web.telegram.org/a/#984171843" target="_blank" rel="noopener noreferrer"
            class="w-10 h-10 border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-900 dark:hover:border-white transition-colors">
            <i class="fab fa-telegram"></i>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/galactik.anastasia/" target="_blank" rel="noopener noreferrer"
            class="w-10 h-10 border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-900 dark:hover:border-white transition-colors">
            <i class="fab fa-instagram"></i>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/491783099433" target="_blank" rel="noopener noreferrer"
            class="w-10 h-10 border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-900 dark:hover:border-white transition-colors">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@unhead/vue";
import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';

// SEO metadata with useHead
useHead({
  title: "FAQ - MindQ Lab",
  meta: [
    {
      name: "description",
      content:
        "Ответы на вопросы о MindQLab — вашем персональном пространстве осознанного развития. Узнайте о наших методах, инструментах и подходе к самопознанию.",
    },
    {
      name: "keywords",
      content:
        "MindQLab, пространство развития, самопознание, психология, осознанность, инструменты развития, FAQ",
    },
  ],
});

// FAQ Data
const faqs = ref([
  {
    question: "Что дает платформа MindQLab?",
    answer:
      "Это система инструментов для изучения и улучшения работы вашего разума — от памяти и внимания до управления эмоциями и осознанности.",
    isOpen: false,
  },
  {
    question: "С чего лучше начать работу?",
    answer:
      "Мы рекомендуем начать с раздела «Тесты», чтобы сформировать базовое понимание вашего текущего профиля и зон роста.",
    isOpen: false,
  },
  {
    question: "Сколько времени нужно уделять занятиям?",
    answer:
      "Оптимально 10-15 минут в день. Главный секрет эффективности системы — в регулярности, а не длительности.",
    isOpen: false,
  },
  {
    question: "Это обучение, тренировка или практика?",
    answer:
      "Это комбинация всех трех подходов. Вы обучаетесь через статьи, тренируетесь в играх и внедряете навыки через практики.",
    isOpen: false,
  },
  {
    question: "Подходит ли платформа для любого уровня?",
    answer:
      "Да. Сложность большинства упражнений адаптируется под ваши результаты, обеспечивая зону ближайшего развития.",
    isOpen: false,
  },
  {
    question: "Можно ли пользоваться бесплатно?",
    answer:
      "Да, у нас есть бессрочный бесплатный тариф с доступом к базовому набор инструментов и статистике.",
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