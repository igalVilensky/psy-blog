<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-white font-sans transition-colors duration-500">
    <TopBar />

    <div class="max-w-4xl mx-auto px-6 py-12 lg:py-24">
      <!-- Header Section -->
      <div class="text-center mb-16 lg:mb-24">
        <div class="flex items-center justify-center gap-2 mb-6">
          <div class="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></div>
          <span class="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Справка</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-8">
          Часто задаваемые вопросы
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Все о MindQLab — вашем пространстве осознанного развития. Узнайте, как мы помогаем исследовать себя и
          достигать новых высот.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index"
          class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-cyan-500/50 dark:hover:border-cyan-500/30 transition-all duration-300 shadow-sm">
          <button @click="toggleFAQ(index)"
            class="w-full p-6 flex justify-between items-center text-left focus:outline-none hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <h2 class="text-lg font-bold text-zinc-900 dark:text-white pr-8">
              {{ faq.question }}
            </h2>
            <div class="flex-shrink-0">
              <i :class="[
                'fas',
                'fa-chevron-down',
                'transition-transform',
                'duration-300',
                faq.isOpen ? 'rotate-180 text-cyan-500' : 'text-zinc-400',
              ]"></i>
            </div>
          </button>

          <div class="transition-all duration-500 ease-in-out overflow-hidden"
            :class="faq.isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'">
            <div class="px-6 pb-6 pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
              <div class="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-16 lg:mt-24 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 dark:border-cyan-500/10 p-10 text-center shadow-sm">
        <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Остались вопросы о платформе?
        </h3>
        <p class="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto font-medium">
          Наша команда готова помочь вам разобраться в функционале MindQLab и подобрать правильные инструменты.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/contact"
            class="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5">
            <span class="flex items-center justify-center space-x-2">
              <i class="fas fa-paper-plane text-sm"></i>
              <span>Связаться с нами</span>
            </span>
          </NuxtLink>
        </div>

        <!-- Social Media Links -->
        <div class="pt-10 mt-10 border-t border-zinc-200 dark:border-zinc-800/50 flex justify-center gap-6">
          <a v-for="(social, i) in socialLinks" :key="i" :href="social.link" target="_blank" rel="noopener noreferrer"
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 transition-all duration-300 shadow-sm">
            <i :class="[social.icon, 'text-xl']"></i>
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

useHead({
  title: "FAQ — MindQLab",
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

const socialLinks = [
  { icon: "fab fa-telegram", link: "https://web.telegram.org/a/#984171843" },
  { icon: "fab fa-instagram", link: "https://www.instagram.com/galactik.anastasia/" },
  { icon: "fab fa-whatsapp", link: "https://wa.me/491783099433" }
];

const toggleFAQ = (index) => {
  faqs.value = faqs.value.map((faq, i) => ({
    ...faq,
    isOpen: i === index ? !faq.isOpen : false,
  }));
};
</script>

<style scoped>
::selection {
  background-color: rgba(6, 182, 212, 0.3);
  color: inherit;
}

.dark ::selection {
  background-color: rgba(6, 182, 212, 0.5);
}
</style>
