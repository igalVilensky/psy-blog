<template>
  <div
    class="bg-gradient-to-br from-slate-50 via-blue-50 to-white min-h-screen"
  >
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"
      ></div>
    </div>

    <div v-else>
      <!-- Navbar Highlight -->
      <div
        class="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"
      ></div>

      <!-- Hero Section (Unchanged) -->
      <section
        class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <!-- Decorative Elements -->
        <div
          class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
        ></div>
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse"
          style="animation-duration: 5s"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"
          style="animation-duration: 7s"
        ></div>

        <div class="container mx-auto px-4 py-16 md:py-24">
          <div class="max-w-4xl mx-auto text-center">
            <div class="animate-fadeIn">
              <h1
                class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 leading-tight animate-slideDown"
              >
                Ваш Путь к Личностному Росту
              </h1>
              <p
                class="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed animate-slideUp opacity-0"
                style="animation-delay: 0.3s"
              >
                Исследуйте себя, развивайтесь и достигайте своих целей с помощью
                наших
                <span class="font-semibold text-blue-600"
                  >профессиональных инструментов</span
                >, курсов и материалов.
              </p>
              <div
                class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
                style="animation-delay: 0.6s"
              >
                <NuxtLink
                  to="/courses"
                  class="group relative inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-xl overflow-hidden transition-all hover:bg-blue-700"
                >
                  <span class="relative z-10">Начать обучение</span>
                  <div
                    class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-blue-700 transition-transform duration-300"
                  ></div>
                </NuxtLink>
                <NuxtLink
                  to="/profile"
                  class="group inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-medium rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Открыть профиль
                  <i
                    class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                  ></i>
                </NuxtLink>
              </div>
            </div>

            <!-- Floating elements -->
            <div
              class="absolute top-1/4 left-10 animate-float"
              style="animation-delay: 0.2s"
            >
              <div class="w-12 h-12 bg-blue-100 rounded-lg rotate-12"></div>
            </div>
            <div
              class="absolute bottom-1/4 right-10 animate-float"
              style="animation-delay: 0.7s"
            >
              <div class="w-8 h-8 bg-indigo-100 rounded-full"></div>
            </div>
            <div
              class="absolute top-1/3 right-1/4 animate-float"
              style="animation-delay: 0.4s"
            >
              <div class="w-10 h-10 bg-blue-50 rounded-lg -rotate-12"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid - Redesigned with Interactive Cards -->
      <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Что вы найдете здесь?
            </span>
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="(topic, index) in popularTopics"
              :key="index"
              class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <i :class="topic.icon" class="text-2xl text-blue-600"></i>
                </div>
                <h3 class="text-xl font-semibold text-slate-800 mb-4">
                  {{ topic.title }}
                </h3>
                <p class="text-slate-600">{{ topic.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tools Section - Redesigned with Interactive Cards -->
      <section class="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Психологические инструменты
            </h2>
            <p class="text-lg text-slate-600">
              Профессиональные методики для самопознания и развития
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div
              v-for="tool in psychTools"
              :key="tool.title"
              class="group bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
            >
              <div class="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  :src="tool.image"
                  :alt="tool.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 class="text-lg font-semibold text-slate-800 mb-2">
                {{ tool.title }}
              </h3>
              <p class="text-sm text-slate-600 mb-3 line-clamp-2">
                {{ tool.description }}
              </p>
              <NuxtLink
                :to="tool.link"
                class="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors group"
              >
                Подробнее
                <i
                  class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                ></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Free Materials Section - Redesigned with Interactive Cards -->
      <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Бесплатные материалы
            </span>
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="(material, index) in freeMaterials"
              :key="index"
              class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
            >
              <div class="mb-6">
                <i :class="material.icon" class="text-3xl text-blue-600"></i>
              </div>
              <h3 class="text-xl font-semibold text-slate-800 mb-3">
                {{ material.title }}
              </h3>
              <p class="text-slate-600 mb-4">{{ material.description }}</p>
              <NuxtLink
                :to="material.link"
                class="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
              >
                {{ material.linkText }}
                <i
                  class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                ></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials - Redesigned with Interactive Cards -->
      <section
        class="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700"
      >
        <div class="container mx-auto px-4">
          <h2
            class="text-3xl md:text-4xl font-bold text-center text-white mb-16"
          >
            Отзывы наших участников
          </h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="bg-white rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div class="mb-6">
                <i class="fas fa-quote-left text-3xl text-blue-200"></i>
              </div>
              <p class="text-slate-600 mb-6 italic">{{ testimonial.text }}</p>
              <div class="flex items-center">
                <div class="mr-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-medium"
                  >
                    {{ testimonial.name[0] }}
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-slate-800">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-slate-500 text-sm">{{ testimonial.course }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section - Redesigned with Interactive Button -->
      <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Готовы начать свой путь?
            </h2>
            <p class="text-lg text-slate-600 mb-8">
              Присоединяйтесь к тысячам людей, которые уже изменили свою жизнь с
              помощью наших инструментов
            </p>
            <NuxtLink
              to="/register"
              class="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              Создать бесплатный аккаунт
              <i
                class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
              ></i>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

const popularTopics = [
  {
    title: "Любовь и отношения",
    icon: "fas fa-heart",
    description: "Глубокое понимание себя и построение гармоничных отношений",
  },
  {
    title: "Саморазвитие",
    icon: "fas fa-user-graduate",
    description: "Техники личностного роста и преодоления внутренних барьеров",
  },
  {
    title: "Карьерный рост",
    icon: "fas fa-chart-line",
    description: "Стратегии профессионального развития и успеха",
  },
];

const psychTools = ref([
  {
    title: "Тест на эмоциональный интеллект",
    description:
      "Определите уровень вашего эмоционального интеллекта и получите рекомендации по его развитию.",
    image: "/images/emotional-intelligence.jpg",
    link: "/tools/emotional-intelligence",
  },
  {
    title: "Дневник благодарности",
    description:
      "Ежедневно записывайте то, за что вы благодарны, чтобы развивать позитивное мышление.",
    image: "/images/gratitude-journal.jpg",
    link: "/tools/gratitude-journal",
  },
  {
    title: "Медитации для расслабления",
    description:
      "Аудиомедитации для снятия стресса и улучшения эмоционального состояния.",
    image: "/images/meditation.jpg",
    link: "/tools/meditation",
  },
]);

const freeMaterials = ref([
  {
    title: 'Мини-курс: "Управление стрессом"',
    icon: "fas fa-book",
    description: "Изучите техники расслабления и сохранения ясности ума.",
    link: "/free-mini-course",
    linkText: "Начать курс",
  },
  {
    title: 'Гайд: "Как справляться с тревогой"',
    icon: "fas fa-file-alt",
    description:
      "Практические советы для снижения тревожности в повседневной жизни.",
    link: "/guides/anxiety",
    linkText: "Скачать гайд",
  },
  {
    title: 'Чек-лист: "Ежедневные привычки для счастья"',
    icon: "fas fa-check-circle",
    description:
      "Список простых привычек, которые помогут вам чувствовать себя лучше каждый день.",
    link: "/checklists/happiness",
    linkText: "Скачать чек-лист",
  },
]);

const testimonials = [
  {
    name: "Анна К.",
    course: 'Курс "Эмоциональный интеллект"',
    text: "Невероятно полезный курс, который помог мне лучше понять себя и свои эмоции.",
  },
  {
    name: "Михаил П.",
    course: 'Тренинг "Личная эффективность"',
    text: "Получил массу практических инструментов для достижения целей и повышения продуктивности.",
  },
  {
    name: "Елена С.",
    course: "Курс по отношениям",
    text: "Курс открыл мне глаза на многие аспекты построения здоровых отношений.",
  },
];

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>

<style>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-slideDown {
  animation: slideDown 0.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}
</style>
