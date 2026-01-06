<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500">
    <TopBar />

    <div class="max-w-4xl mx-auto px-6 py-20">
      <!-- Header Section -->
      <div class="text-center mb-20 animate-fade-up">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight text-stone-900 dark:text-white">
          Часто задаваемые вопросы
        </h1>
        <p
          class="text-stone-500 dark:text-stone-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
          Все о MindQLab — вашем пространстве осознанного развития. Узнайте, как мы помогаем исследовать себя и
          достигать
          новых высот.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-6">
        <div v-for="(faq, index) in faqs" :key="index"
          class="bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-mindqlab-calm-accent/30 dark:hover:border-mindqlab-calm-accent/30">
          <button @click="toggleFAQ(index)"
            class="w-full p-8 flex justify-between items-center text-left focus:outline-none group">
            <h2
              class="text-xl font-light text-stone-800 dark:text-stone-100 group-hover:text-mindqlab-calm-accent transition-colors pr-8">
              {{ faq.question }}
            </h2>
            <div class="flex-shrink-0">
              <i :class="[
                'fas',
                'fa-chevron-down',
                'text-stone-300',
                'dark:text-stone-700',
                'group-hover:text-mindqlab-calm-accent',
                'transition-transform',
                'duration-500',
                { 'rotate-180': faq.isOpen },
              ]"></i>
            </div>
          </button>

          <div class="grid transition-[grid-template-rows] duration-500 ease-in-out"
            :class="faq.isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
              <div class="px-8 pb-8 pt-0">
                <div
                  class="text-stone-600 dark:text-stone-400 text-lg leading-relaxed border-t border-stone-50 dark:border-stone-800/30 pt-6 font-light">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-24 bg-white/50 dark:bg-stone-900/20 border border-stone-100 dark:border-stone-800/50 rounded-[3rem] p-12 text-center backdrop-blur-sm">
        <h3 class="text-3xl font-light text-stone-900 dark:text-white mb-6">
          Остались вопросы о платформе?
        </h3>
        <p class="text-stone-500 dark:text-stone-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
          Наша команда готова помочь вам разобраться в функционале MindQLab и подобрать правильные
          инструменты.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <NuxtLink to="/contact"
            class="px-12 py-5 bg-mindqlab-calm-accent text-white rounded-full font-medium transition-all duration-300 hover:bg-opacity-90 shadow-lg shadow-mindqlab-calm-accent/20">
            <i class="fas fa-paper-plane mr-2"></i>
            Связаться с нами
          </NuxtLink>
        </div>

        <!-- Social Media Links -->
        <div class="pt-10 mt-10 border-t border-stone-50 dark:border-stone-800/30 flex justify-center gap-6">
          <!-- Telegram -->
          <a href="https://web.telegram.org/a/#984171843" target="_blank" rel="noopener noreferrer" class="social-btn">
            <i class="fab fa-telegram"></i>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/galactik.anastasia/" target="_blank" rel="noopener noreferrer"
            class="social-btn">
            <i class="fab fa-instagram"></i>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/491783099433" target="_blank" rel="noopener noreferrer" class="social-btn">
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

<style scoped>
.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-btn {
  @apply w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-white dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800/50 text-stone-400 dark:text-stone-500 hover:text-mindqlab-calm-accent hover:border-mindqlab-calm-accent transition-all duration-300;
}
</style>
