<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E1B4B] py-12"
  >
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#0F172A]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-float"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float-delay"
        ></div>
        <!-- Animated Grid -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]/80"
        >
          <div class="absolute inset-0 bg-grid-white/[0.02] animate-grid"></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-4xl relative z-10">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 tracking-tight mb-6"
        >
          Пользовательское соглашение
        </h1>
        <p
          class="text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed"
        >
          Условия использования сервиса Psy Blog
        </p>
      </section>

      <!-- Terms Content -->
      <div
        class="bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8 mb-12"
      >
        <!-- Last Updated Date -->
        <div class="text-sm text-indigo-200/80 mb-8">
          Последнее обновление: {{ formattedDate }}
        </div>

        <!-- Table of Contents -->
        <nav class="mb-12 p-6 bg-indigo-500/10 rounded-xl">
          <h2 class="text-lg font-semibold text-white/90 mb-4">Содержание</h2>
          <ul class="space-y-2">
            <li v-for="(section, index) in sections" :key="index">
              <a
                :href="`#section-${index + 1}`"
                class="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                {{ section.title }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Terms Sections -->
        <div class="space-y-16">
          <section
            v-for="(section, index) in sections"
            :key="index"
            :id="`section-${index + 1}`"
            class="scroll-mt-24 pt-8 first:pt-0"
          >
            <h2 class="text-2xl font-bold text-white/90 mb-6">
              {{ index + 1 }}. {{ section.title }}
            </h2>
            <div class="text-indigo-200/80 leading-relaxed whitespace-pre-line">
              {{ section.content }}
            </div>
          </section>
        </div>

        <!-- Contact Section -->
        <div class="mt-16 p-6 bg-indigo-500/10 rounded-xl">
          <h2 class="text-xl font-semibold text-white/90 mb-4">
            Свяжитесь с нами
          </h2>
          <p class="text-indigo-200/80">
            Если у вас возникли вопросы относительно пользовательского
            соглашения, пожалуйста, свяжитесь с нами:
          </p>
          <a
            href="mailto:anastasiagelmut@gmail.com"
            class="inline-block mt-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
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
    content: `Добро пожаловать на сайт Psy Blog. Данное Пользовательское соглашение регулирует использование вами нашего сайта и всех его сервисов. Пожалуйста, внимательно ознакомьтесь с условиями, указанными в этом соглашении. Используя наш сайт, вы соглашаетесь с этими условиями.
  
  Если вы не согласны с любым из положений настоящего соглашения, пожалуйста, не используйте наш сайт.`,
  },
  {
    title: "Использование сайта",
    content: `2.1. Вы обязаны использовать сайт в соответствии с применимыми законами и нормативными актами, а также в рамках настоящего соглашения.
  
  2.2. Вы соглашаетесь не использовать сайт для:
  • Нарушения прав и свобод других пользователей
  • Распространения незаконных материалов или контента
  • Вредоносных действий, таких как вирусы, вредоносные программы, или любые действия, которые могут повредить инфраструктуру сайта`,
  },
  {
    title: "Авторские права и интеллектуальная собственность",
    content: `3.1. Все материалы, размещённые на сайте, включая текст, изображения, логотипы, графику, и другие элементы, являются интеллектуальной собственностью Psy Blog или её лицензиаров и защищены законодательством об авторском праве.
  
  3.2. Вы не имеете права копировать, распространять или изменять материалы сайта без нашего письменного разрешения.`,
  },
  {
    title: "Учетные записи и безопасность",
    content: `4.1. Для использования некоторых услуг на сайте вам может потребоваться создать учетную запись. Вы обязаны предоставить точную и актуальную информацию при регистрации.
  
  4.2. Вы несете ответственность за безопасность вашего пароля и учетной записи. Вы соглашаетесь немедленно сообщать нам о любых несанкционированных действиях, связанных с вашей учетной записью.`,
  },
  {
    title: "Ограничение ответственности",
    content: `5.1. Мы прилагаем все усилия для обеспечения точности и актуальности информации на сайте, однако не гарантируем, что все материалы будут безошибочными или актуальными в любой момент времени.
  
  5.2. Мы не несем ответственности за прямые, косвенные, случайные или косвенные убытки, которые могут возникнуть в результате использования сайта.`,
  },
  {
    title: "Ссылки на сторонние ресурсы",
    content: `6.1. Наш сайт может содержать ссылки на сторонние сайты, которые не контролируются нами. Мы не несем ответственности за содержание или политику конфиденциальности таких сайтов.
  
  6.2. Переходя по таким ссылкам, вы делаете это на свой страх и риск.`,
  },
  {
    title: "Изменения в условиях",
    content: `7.1. Мы оставляем за собой право в любое время изменять или обновлять это Пользовательское соглашение. Все изменения вступают в силу с момента их публикации на сайте.
  
  7.2. Рекомендуем вам регулярно проверять это соглашение на предмет изменений.`,
  },
  {
    title: "Прекращение использования",
    content: `8.1. Мы оставляем за собой право приостановить или прекратить доступ к сайту в любое время, если вы нарушаете условия данного соглашения или если это требуется по законодательно обоснованным причинам.`,
  },
  {
    title: "Применимое право и разрешение споров",
    content: `9.1. Данное соглашение регулируется законодательством Российской Федерации.
  
  9.2. Все споры, возникающие в связи с использованием сайта, будут решаться в суде по месту нахождения компании, если иное не предусмотрено законом.`,
  },
  {
    title: "Контактная информация",
    content: `Если у вас есть вопросы о данном Пользовательском соглашении, пожалуйста, свяжитесь с нами по адресу:
  
  Электронная почта: anastasiagelmut@gmail.com`,
  },
];
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1b4b;
}

::-webkit-scrollbar-thumb {
  background: #4f46e5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6366f1;
}
</style>
