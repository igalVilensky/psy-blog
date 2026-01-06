<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500">
    <TopBar />

    <div class="max-w-5xl mx-auto px-6 py-20">
      <!-- Header Section -->
      <div class="mb-20 text-center animate-fade-up">
        <span
          class="inline-block px-4 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-xs font-medium mb-6 uppercase tracking-widest border border-stone-200 dark:border-stone-700">
          Юридическая информация
        </span>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 dark:text-white mb-8 tracking-tight">
          Пользовательское соглашение
        </h1>

        <p
          class="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed font-light italic">
          Условия использования платформы MindQ Lab
        </p>
      </div>

      <!-- Terms Content -->
      <div
        class="bg-white dark:bg-stone-900/40 backdrop-blur-xl rounded-[3rem] border border-stone-100 dark:border-stone-800/50 p-8 md:p-12 mb-20">
        <!-- Last Updated Date -->
        <div class="text-xs text-stone-400 dark:text-stone-600 mb-12 uppercase tracking-widest">
          Последнее обновление: {{ formattedDate }}
        </div>

        <!-- Table of Contents -->
        <nav
          class="mb-16 p-8 bg-stone-50/50 dark:bg-stone-800/20 rounded-[2rem] border border-stone-100/50 dark:border-stone-800/30">
          <h2 class="text-lg font-medium text-stone-900 dark:text-white mb-6">Содержание</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <li v-for="(section, index) in sections" :key="index" class="flex items-center">
              <span class="w-1.5 h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 mr-3"></span>
              <a :href="`#section-${index + 1}`"
                class="text-stone-600 dark:text-stone-400 hover:text-mindqlab-calm-accent transition-colors duration-300 font-light">
                {{ section.title }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Terms Sections -->
        <div class="space-y-20">
          <section v-for="(section, index) in sections" :key="index" :id="`section-${index + 1}`"
            class="scroll-mt-32 pt-10 border-t border-stone-50 dark:border-stone-800/30 first:border-t-0 first:pt-0">
            <h2 class="text-2xl md:text-3xl font-light text-stone-900 dark:text-white mb-8">
              <span class="text-mindqlab-calm-accent mr-4 opacity-50">{{ (index + 1).toString().padStart(2, '0')
              }}</span>
              {{ section.title }}
            </h2>
            <div
              class="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line font-light prose-stone dark:prose-invert max-w-none">
              {{ section.content }}
            </div>
          </section>
        </div>

        <!-- Contact Section -->
        <div
          class="mt-20 p-10 bg-stone-50/50 dark:bg-stone-800/20 rounded-[2.5rem] border border-stone-100 dark:border-stone-800/50 text-center">
          <h2 class="text-2xl font-light text-stone-900 dark:text-white mb-6">
            Свяжитесь с нами
          </h2>
          <p class="text-stone-500 dark:text-stone-400 mb-8 max-w-2xl mx-auto font-light">
            Если у вас возникли вопросы относительно пользовательского соглашения, пожалуйста, свяжитесь с нами:
          </p>
          <a href="mailto:contact@mindqlab.com"
            class="inline-flex flex-col sm:flex-row items-center gap-3 px-6 sm:px-8 py-4 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white rounded-[2rem] sm:rounded-full font-medium transition-all duration-300 hover:border-mindqlab-calm-accent shadow-sm max-w-full overflow-hidden">
            <i class="fas fa-envelope text-mindqlab-calm-accent"></i>
            <span class="truncate sm:overflow-visible max-w-full text-sm sm:text-base">contact@mindqlab.com</span>
          </a>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';

const formattedDate = new Date().toLocaleDateString("ru-RU", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const sections = [
  {
    title: "Введение",
    content: `Добро пожаловать на платформу MindQ Lab. Данное Пользовательское соглашение регулирует использование вами нашей платформы и всех её сервисов, включая психологические тесты, интерактивные инструменты, курсы, гайды и сообщество. Пожалуйста, внимательно ознакомьтесь с условиями, указанными в этом соглашении. Используя нашу платформу, вы соглашаетесь с этими условиями.
  
  Если вы не согласны с любым из положений настоящего соглашения, пожалуйста, не используйте нашу платформу.`,
  },
  {
    title: "Использование платформы",
    content: `2.1. Вы обязаны использовать платформу в соответствии с применимыми законами и нормативными актами, а также в рамках настоящего соглашения.
  
  2.2. Вы соглашаетесь не использовать платформу для:
  • Нарушения прав и свобод других пользователей
  • Распространения незаконных материалов или контента
  • Вредоносных действий, таких как вирусы, вредоносные программы, или любые действия, которые могут повредить инфраструктуру платформы
  • Манипулирования результатами тестов или инструментов самопознания
  • Выдачи себя за других пользователей или специалистов`,
  },
  {
    title: "Сервисы и функционал",
    content: `3.1. MindQLab предоставляет следующие сервисы:
  • Психологические тесты и оценки личности
  • Интерактивные инструменты для самопознания (эмоциональный компас, колесо жизни, карта мозга и др.)
  • Инструменты осознанности и медитации
  • Образовательные курсы и руководства по саморазвитию
  • Сообщество для обмена опытом и инсайтами
  • Блог с экспертными материалами
  
  3.2. Результаты тестов и рекомендации платформы носят информационный характер и не заменяют профессиональную психологическую помощь.
  
  3.3. Мы оставляем за собой право изменять, приостанавливать или прекращать любые сервисы без предварительного уведомления.`,
  },
  {
    title: "Авторские права и интеллектуальная собственность",
    content: `4.1. Все материалы, размещённые на платформе, включая текст, изображения, логотипы, графику, тесты, методики и другие элементы, являются интеллектуальной собственностью MindQLab или её лицензиаров и защищены законодательством об авторском праве.
  
  4.2. Вы не имеете права копировать, распространять или изменять материалы платформы без нашего письменного разрешения.
  
  4.3. Контент, создаваемый пользователями в сообществе, остается их собственностью, но публикуя его, вы предоставляете MindQLab неисключительную лицензию на его использование.`,
  },
  {
    title: "Учетные записи и безопасность",
    content: `5.1. Для использования некоторых функций платформы вам может потребоваться создать учетную запись. Вы обязаны предоставить точную и актуальную информацию при регистрации.
  
  5.2. Вы несете ответственность за безопасность вашего пароля и учетной записи. Вы соглашаетесь немедленно сообщать нам о любых несанкционированных действиях, связанных с вашей учетной записью.
  
  5.3. Мы используем Firebase Authentication для обеспечения безопасности ваших данных.`,
  },
  {
    title: "Ограничение ответственности",
    content: `6.1. Мы прилагаем все усилия для обеспечения точности и актуальности информации на платформе, однако не гарантируем, что все материалы будут безошибочными или актуальными в любой момент времени.
  
  6.2. Результаты психологических тестов и инструментов предоставляются "как есть" и не являются медицинским диагнозом или профессиональной консультацией.
  
  6.3. Мы не несем ответственности за прямые, косвенные, случайные или косвенные убытки, которые могут возникнуть в результате использования платформы.
  
  6.4. В случае возникновения серьезных психологических проблем, мы настоятельно рекомендуем обратиться к квалифицированному специалисту.`,
  },
  {
    title: "Ссылки на сторонние ресурсы",
    content: `7.1. Наша платформа может содержать ссылки на сторонние сайты, которые не контролируются нами. Мы не несем ответственности за содержание или политику конфиденциальности таких сайтов.
  
  7.2. Переходя по таким ссылкам, вы делаете это на свой страх и риск.`,
  },
  {
    title: "Изменения в условиях",
    content: `8.1. Мы оставляем за собой право в любое время изменять или обновлять это Пользовательское соглашение. Все изменения вступают в силу с момента их публикации на платформе.
  
  8.2. Рекомендуем вам регулярно проверять это соглашение на предмет изменений.`,
  },
  {
    title: "Прекращение использования",
    content: `9.1. Мы оставляем за собой право приостановить или прекратить доступ к платформе в любое время, если вы нарушаете условия данного соглашения или если это требуется по законодательно обоснованным причинам.
  
  9.2. Вы можете в любой момент удалить свою учетную запись и прекратить использование платформы.`,
  },
  {
    title: "Применимое право и разрешение споров",
    content: `10.1. Данное соглашение регулируется международными нормами и принципами электронной коммерции.
  
  10.2. Все споры, возникающие в связи с использованием платформы, будут решаться путем переговоров. В случае невозможности достижения согласия, споры подлежат разрешению в соответствии с законодательством страны пребывания пользователя.`,
  },
  {
    title: "Контактная информация",
    content: `Если у вас есть вопросы о данном Пользовательском соглашении, пожалуйста, свяжитесь с нами по адресу:
  
  Электронная почта: contact@mindqlab.com`,
  },
];
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
</style>
