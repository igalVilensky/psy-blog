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
          Политика конфиденциальности
        </h1>

        <p
          class="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed font-light italic">
          Мы ценим вашу конфиденциальность и стремимся защищать ваши персональные данные
        </p>
      </div>

      <!-- Privacy Policy Content -->
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

        <!-- Policy Sections -->
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
            Если у вас возникли вопросы относительно нашей политики конфиденциальности, пожалуйста, свяжитесь с нами:
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
    content: `Добро пожаловать на платформу MindQ Lab. Мы ценим вашу конфиденциальность и стремимся защищать ваши персональные данные. В этой Политике конфиденциальности описано, как мы собираем, используем, храним и защищаем вашу личную информацию при использовании нашей платформы, включая психологические тесты, интерактивные инструменты, курсы и сообщество.
  
  Используя нашу платформу, вы соглашаетесь на сбор и использование информации в соответствии с данной политикой.`,
  },
  {
    title: "Сбор информации",
    content: `Мы собираем персональную информацию, когда вы взаимодействуете с нашей платформой, такую как:
  
  Личная информация: имя, адрес электронной почты и другие контактные данные при регистрации через Firebase Authentication.
  
  Данные об использовании: IP-адреса, тип браузера, посещённые страницы и другие данные о вашем взаимодействии с платформой, которые собираются автоматически через куки и другие технологии отслеживания.
  
  Результаты тестов и инструментов: данные, полученные в результате прохождения психологических тестов, использования инструментов самопознания (эмоциональный компас, колесо жизни и др.), которые хранятся в Firebase Firestore для предоставления персонализированного опыта.
  
  Контент сообщества: публикации, комментарии и другой контент, который вы создаете в разделе сообщества.`,
  },
  {
    title: "Как мы используем вашу информацию",
    content: `Мы используем собранную информацию для следующих целей:
  
  • Для предоставления, работы и поддержки платформы и всех её сервисов
  • Для сохранения результатов ваших тестов и прогресса в личном кабинете
  • Для предоставления персонализированных рекомендаций на основе ваших результатов
  • Для улучшения пользовательского опыта и функционала платформы
  • Для отправки уведомлений и ответов на ваши запросы
  • Для анализа использования платформы и повышения качества её работы
  • Для модерации контента в сообществе и обеспечения безопасной среды`,
  },
  {
    title: "Защита данных",
    content: `Мы принимаем разумные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения:
  
  • Используем Firebase Authentication для безопасной аутентификации пользователей
  • Применяем правила безопасности Firebase для контроля доступа к данным
  • Используем шифрование при передаче данных (HTTPS)
  • Регулярно обновляем меры безопасности
  
  Однако, следует помнить, что ни один метод передачи данных по интернету не является абсолютно безопасным, и мы не можем гарантировать полную безопасность вашей информации.`,
  },
  {
    title: "Хранение данных",
    content: `Мы храним вашу информацию в облачных сервисах Firebase (Google Cloud Platform) в течение необходимого времени для выполнения целей, для которых она была собрана:
  
  • Данные учетной записи хранятся до тех пор, пока вы не удалите свою учетную запись
  • Результаты тестов и инструментов хранятся для предоставления истории и отслеживания прогресса
  • Контент сообщества может храниться даже после удаления учетной записи для сохранения целостности обсуждений`,
  },
  {
    title: "Передача данных третьим лицам",
    content: `Мы не продаем и не передаем ваши персональные данные третьим лицам в коммерческих целях. Мы можем передавать данные только в следующих случаях:
  
  • Сервисным провайдерам (Firebase/Google Cloud) для обеспечения работы платформы
  • При использовании платёжных систем для обработки платежей за платные курсы или подписки
  • По требованию закона или для защиты наших прав и безопасности пользователей`,
  },
  {
    title: "Использование cookies",
    content: `Наша платформа использует файлы cookies для улучшения пользовательского опыта и анализа использования:
  
  • Cookies аутентификации для поддержания вашей сессии
  • Cookies предпочтений для сохранения ваших настроек (например, тема оформления)
  • Аналитические cookies для понимания того, как пользователи взаимодействуют с платформой
  
  Вы можете настроить браузер для отказа от cookies, но это может повлиять на функциональность платформы.`,
  },
  {
    title: "Права пользователей",
    content: `Вы имеете следующие права в отношении ваших персональных данных:
  
  • Запрашивать доступ к своим персональным данным и результатам тестов
  • Исправлять или обновлять свои данные через личный кабинет
  • Запрашивать удаление своих данных и учетной записи
  • Экспортировать свои данные в машиночитаемом формате
  • Отказаться от получения маркетинговых материалов или уведомлений
  • Отозвать согласие на обработку данных
  
  Для реализации этих прав, пожалуйста, свяжитесь с нами по указанному адресу электронной почты.`,
  },
  {
    title: "Конфиденциальность результатов тестов",
    content: `Мы особенно серьезно относимся к конфиденциальности результатов ваших психологических тестов и данных самопознания:
  
  • Результаты тестов доступны только вам в вашем личном кабинете
  • Мы используем агрегированные и анонимизированные данные для улучшения тестов и платформы
  • Ваши результаты никогда не будут переданы третьим лицам без вашего явного согласия
  • Вы можете в любой момент удалить результаты своих тестов`,
  },
  {
    title: "Изменения в политике конфиденциальности",
    content: `Мы оставляем за собой право обновлять эту Политику конфиденциальности в любое время. Мы уведомим вас об изменениях, опубликовав обновленную политику на нашей платформе. Рекомендуем регулярно проверять эту страницу на предмет обновлений.
  
  Существенные изменения будут дополнительно доведены до вашего сведения через уведомления на платформе или по электронной почте.`,
  },
  {
    title: "Контактная информация",
    content: `Если у вас возникли вопросы или предложения относительно этой Политики конфиденциальности, вы можете связаться с нами по следующему адресу:
  
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
