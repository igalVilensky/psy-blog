<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Enhanced Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift opacity-60"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse opacity-40"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float opacity-50"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Политика конфиденциальности
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Мы ценим вашу конфиденциальность и стремимся защищать ваши
          персональные данные.
        </p>
      </section>

      <!-- Privacy Policy Content -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-12"
      >
        <!-- Last Updated Date -->
        <div class="text-sm text-slate-300/80 mb-8">
          Последнее обновление: {{ formattedDate }}
        </div>

        <!-- Table of Contents -->
        <nav class="mb-12 p-6 bg-[#0EA5E9]/10 rounded-xl">
          <h2 class="text-lg font-semibold text-white/90 mb-4">Содержание</h2>
          <ul class="space-y-2">
            <li v-for="(section, index) in sections" :key="index">
              <a
                :href="`#section-${index + 1}`"
                class="text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
              >
                {{ section.title }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Policy Sections -->
        <div class="space-y-16">
          <section
            v-for="(section, index) in sections"
            :key="index"
            :id="`section-${index + 1}`"
            class="scroll-mt-24 pt-8 first:pt-0"
          >
            <h2
              class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-6"
            >
              {{ index + 1 }}. {{ section.title }}
            </h2>
            <div class="text-slate-300/80 leading-relaxed whitespace-pre-line">
              {{ section.content }}
            </div>
          </section>
        </div>

        <!-- Contact Section -->
        <div class="mt-16 p-6 bg-[#0EA5E9]/10 rounded-xl">
          <h2 class="text-xl font-semibold text-white/90 mb-4">
            Свяжитесь с нами
          </h2>
          <p class="text-slate-300/80">
            Если у вас возникли вопросы относительно нашей политики
            конфиденциальности, пожалуйста, свяжитесь с нами:
          </p>
          <a
            href="mailto:anastasiagelmut@gmail.com"
            class="inline-block mt-4 text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
          >
            anastasiagelmut@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formattedDate = new Date().toLocaleDateString("ru-RU", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const sections = [
  {
    title: "Введение",
    content: `Добро пожаловать на сайт Psy Blog. Мы ценим вашу конфиденциальность и стремимся защищать ваши персональные данные. В этой Политике конфиденциальности описано, как мы собираем, используем, храним и защищаем вашу личную информацию при использовании нашего сайта.
  
  Используя наш сайт, вы соглашаетесь на сбор и использование информации в соответствии с данной политикой.`,
  },
  {
    title: "Сбор информации",
    content: `Мы собираем персональную информацию, когда вы взаимодействуете с нашим сайтом, такую как:
  
  Личная информация: имя, адрес электронной почты и другие контактные данные.
  Данные об использовании: IP-адреса, тип браузера, посещённые страницы и другие данные о вашем взаимодействии с сайтом, которые собираются автоматически через куки и другие технологии отслеживания.`,
  },
  {
    title: "Как мы используем вашу информацию",
    content: `Мы используем собранную информацию для следующих целей:
  
  • Для предоставления, работы и поддержки сайта
  • Для улучшения пользовательского опыта и функционала сайта
  • Для отправки уведомлений и ответов на ваши запросы
  • Для анализа использования сайта и повышения качества его работы`,
  },
  {
    title: "Защита данных",
    content: `Мы принимаем разумные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако, следует помнить, что ни один метод передачи данных по интернету не является абсолютно безопасным, и мы не можем гарантировать полную безопасность вашей информации.`,
  },
  {
    title: "Хранение данных",
    content: `Мы храним вашу информацию только в течение необходимого времени для выполнения целей, для которых она была собрана, или в течение более длительного срока, если это предусмотрено законом.`,
  },
  {
    title: "Передача данных третьим лицам",
    content: `Мы не передаем ваши персональные данные третьим лицам, если это не требуется для выполнения наших обязательств перед вами (например, передача данных платёжным системам для обработки платежей).`,
  },
  {
    title: "Использование cookies",
    content: `Наш сайт использует файлы cookies для улучшения пользовательского опыта и анализа использования сайта. Cookies помогают нам собирать информацию о том, как вы взаимодействуете с сайтом, чтобы мы могли улучшить его функциональность. Вы можете настроить браузер для отказа от cookies, но это может повлиять на функциональность сайта.`,
  },
  {
    title: "Права пользователей",
    content: `Вы имеете право:
  
  • Запрашивать доступ к своим персональным данным
  • Исправлять или обновлять свои данные
  • Запрашивать удаление своих данных
  • Отказаться от получения маркетинговых материалов или других уведомлений, если они отправляются на основании вашего согласия`,
  },
  {
    title: "Изменения в политике конфиденциальности",
    content: `Мы оставляем за собой право обновлять эту Политику конфиденциальности в любое время. Мы уведомим вас об изменениях, опубликовав обновленную политику на нашем сайте. Рекомендуем регулярно проверять эту страницу на предмет обновлений.`,
  },
  {
    title: "Контактная информация",
    content: `Если у вас возникли вопросы или предложения относительно этой Политики конфиденциальности, вы можете связаться с нами по следующему адресу:
  
  Электронная почта: anastasiagelmut@gmail.com`,
  },
];
</script>
