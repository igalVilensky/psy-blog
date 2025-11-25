<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300">
          Часто задаваемые вопросы
        </h1>
        <p class="text-slate-600 dark:text-cyan-300/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Все о MindQ Lab — вашей лаборатории осознанного роста. Узнайте, как мы помогаем исследовать себя и достигать
          новых высот.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index"
          class="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-500/10 hover:border-cyan-500/30 dark:hover:border-cyan-500/30">
          <button @click="toggleFAQ(index)"
            class="w-full p-6 flex justify-between items-center text-left focus:outline-none group">
            <h2
              class="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors pr-8">
              {{ faq.question }}
            </h2>
            <div class="flex-shrink-0">
              <i :class="[
                'fas',
                'fa-chevron-down',
                'text-slate-400',
                'dark:text-slate-500',
                'group-hover:text-cyan-500',
                'dark:group-hover:text-cyan-400',
                'transition-transform',
                'duration-300',
                { 'rotate-180': faq.isOpen },
              ]"></i>
            </div>
          </button>

          <div class="grid transition-[grid-template-rows] duration-300 ease-out"
            :class="faq.isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden">
              <div class="px-6 pb-6 pt-0">
                <div
                  class="text-slate-600 dark:text-slate-300 text-base leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-16 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-500/10 dark:via-purple-500/10 dark:to-pink-500/10 border border-cyan-500/20 dark:border-cyan-500/20 rounded-2xl p-8 text-center backdrop-blur-sm">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Остались вопросы о Лаборатории?
        </h3>
        <p class="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto">
          Наша команда исследователей готова помочь вам разобраться в функционале Lab и подобрать правильные
          инструменты.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/contact"
            class="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
            <i class="fas fa-paper-plane mr-2"></i>
            Связаться с поддержкой
          </NuxtLink>
        </div>

        <!-- Social Media Links -->
        <div class="pt-8 mt-8 border-t border-slate-200 dark:border-slate-700/50 flex justify-center gap-4">
          <!-- Telegram -->
          <a href="https://web.telegram.org/a/#984171843" target="_blank" rel="noopener noreferrer"
            class="social-btn social-btn-cyan">
            <i class="fab fa-telegram"></i>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/galactik.anastasia/" target="_blank" rel="noopener noreferrer"
            class="social-btn social-btn-purple">
            <i class="fab fa-instagram"></i>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/491783099433" target="_blank" rel="noopener noreferrer"
            class="social-btn social-btn-emerald">
            <i class="fab fa-whatsapp"></i>
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
  title: "FAQ - MindQ Lab",
  meta: [
    {
      name: "description",
      content:
        "Ответы на вопросы о MindQ Lab — вашей персональной лаборатории осознанного роста. Узнайте о наших методах, инструментах и подходе к самопознанию.",
    },
    {
      name: "keywords",
      content:
        "MindQ Lab, лаборатория роста, самопознание, психология, осознанность, инструменты развития, FAQ",
    },
  ],
});

// FAQ Data
const faqs = ref([
  {
    question: "Что такое MindQ Lab?",
    answer:
      "MindQ Lab — это ваша персональная цифровая лаборатория для исследования себя. Мы объединяем научные психологические методики с современными технологиями, чтобы помочь вам глубже понять свою личность, эмоции и потенциал.",
    isOpen: false,
  },
  {
    question: "Какие инструменты доступны в Лаборатории?",
    answer:
      "В Lab вы найдете широкий спектр инструментов: от глубоких психологических тестов (Big 5, Архетипы) до интерактивных трекеров (Эмоциональный компас, Дневник благодарности). Все инструменты интегрированы в единую экосистему для целостного анализа.",
    isOpen: false,
  },
  {
    question: "Нужно ли мне иметь знания в психологии?",
    answer:
      "Нет, MindQ Lab создан для всех. Мы переводим сложные научные концепции на понятный язык и даем конкретные, применимые рекомендации на основе ваших результатов.",
    isOpen: false,
  },
  {
    question: "Как формируется мой психологический профиль?",
    answer:
      "Ваш профиль в Lab — это живая система. Он наполняется данными по мере прохождения тестов и использования инструментов. Чем больше вы взаимодействуете с Лабораторией, тем точнее и полезнее становятся персональные рекомендации.",
    isOpen: false,
  },
  {
    question: "Это замена терапии?",
    answer:
      "MindQ Lab — это мощный инструмент самопознания и самопомощи, но он не заменяет клиническую терапию. Мы даем ключи к пониманию себя, которые могут отлично дополнить работу с психологом или стать основой для самостоятельного роста.",
    isOpen: false,
  },
  {
    question: "Как начать работу в Lab?",
    answer:
      "Просто зарегистрируйтесь и перейдите в раздел 'Lab'. Мы рекомендуем начать с базовых тестов, чтобы заложить фундамент вашего профиля, а затем переходить к ежедневным практикам.",
    isOpen: false,
  },
  {
    question: "Могу ли я отслеживать свой прогресс?",
    answer:
      "Да, это одна из ключевых функций Лаборатории. Визуализация данных поможет вам увидеть динамику изменений вашего эмоционального состояния и личностного роста во времени.",
    isOpen: false,
  },
  {
    question: "Безопасны ли мои данные?",
    answer:
      "Абсолютно. В MindQ Lab конфиденциальность — приоритет. Ваши результаты исследований и личные записи зашифрованы и доступны только вам.",
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
.btn-primary {
  @apply bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600;
}

.social-btn {
  @apply w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg;
}

.social-btn-cyan {
  @apply bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-500/20 hover:border-cyan-500;
}

.social-btn-purple {
  @apply bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/20 hover:border-purple-500;
}

.social-btn-emerald {
  @apply bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-emerald-500;
}
</style>
