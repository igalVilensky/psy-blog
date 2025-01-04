<template>
  <!-- Loading State -->
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
    ></div>
    <span class="ml-4 text-xl text-blue-500">Загрузка...</span>
  </div>

  <main class="min-h-screen bg-gray-900">
    <!-- Hero Section - Modified for dark theme -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <!-- Decorative Elements -->
      <div
        class="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20"
      ></div>
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style="animation-duration: 5s"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"
        style="animation-duration: 7s"
      ></div>

      <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="animate-fadeIn">
            <h1
              class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 leading-tight animate-slideDown"
            >
              Ваш Путь к Личностному Росту
            </h1>
            <p
              class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-slideUp opacity-0"
              style="animation-delay: 0.3s"
            >
              Исследуйте себя, развивайтесь и достигайте своих целей с помощью
              наших
              <span class="font-semibold text-blue-400"
                >профессиональных инструментов</span
              >
            </p>
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
              style="animation-delay: 0.6s"
            >
              <NuxtLink
                to="/courses/courses"
                class="group relative inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-medium rounded-xl overflow-hidden transition-all hover:bg-blue-600"
              >
                <span class="relative z-10">Начать обучение</span>
                <div
                  class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-blue-600 transition-transform duration-300"
                ></div>
              </NuxtLink>
              <NuxtLink
                to="/profile"
                class="group inline-flex items-center justify-center px-8 py-3 bg-gray-800 text-blue-400 font-medium rounded-xl border-2 border-blue-500 hover:bg-gray-700 transition-colors"
              >
                Открыть профиль
                <i
                  class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                ></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Psychological Tools Section - NEW -->
    <section class="py-20 bg-[#1A1B26]">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Психологические инструменты
          </h2>
          <div
            class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"
          ></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="tool in psychTools"
            :key="tool.title"
            class="group relative bg-gradient-to-b from-[#242436] to-[#1A1B26] rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div class="relative z-10">
              <div
                class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4"
              >
                <i :class="tool.icon" class="text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">
                {{ tool.title }}
              </h3>
              <p class="text-gray-300">{{ tool.description }}</p>
              <NuxtLink
                :to="tool.link"
                class="inline-flex items-center text-blue-400 mt-4 group-hover:text-blue-300 transition-colors"
              >
                Подробнее
                <i
                  class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                ></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Features Section -->
    <section class="py-20 bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-white mb-12">
          Наши инструменты
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors duration-300"
          >
            <i :class="feature.icon" class="text-blue-400 text-3xl mb-4"></i>
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Popular Topics Section - NEW -->
    <section class="py-20 bg-[#242436] relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1B26]/50"
      ></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          >
            Популярные темы
          </h2>
          <div
            class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"
          ></div>
        </div>

        <div class="grid md:grid-cols-4 gap-6">
          <div
            v-for="item in popularTopics"
            :key="item.title"
            class="group relative overflow-hidden rounded-xl aspect-square"
          >
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"
            ></div>
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-semibold text-white mb-2">
                {{ item.title }}
              </h3>
              <p
                class="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Courses Section -->
    <section class="py-20 bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-white mb-12">
          Курсы и руководства
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="course in courses"
            :key="course.title"
            class="group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-700"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">
                {{ course.title }}
              </h3>
              <p class="text-gray-400 mb-4">{{ course.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-blue-400">{{ course.duration }}</span>
                <NuxtLink
                  :to="course.link"
                  class="text-blue-400 hover:text-blue-300"
                >
                  Подробнее →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Free Materials Section - NEW -->
    <section class="py-20 bg-[#1A1B26]">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400"
          >
            Бесплатные материалы
          </h2>
          <div
            class="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mt-4 rounded-full"
          ></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="material in freeMaterials"
            :key="material.title"
            class="group bg-gradient-to-br from-[#242436] to-[#1A1B26] rounded-xl overflow-hidden"
          >
            <div class="p-6">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center"
                >
                  <i :class="material.icon" class="text-white"></i>
                </div>
                <span class="ml-3 text-white font-medium">{{
                  material.type
                }}</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">
                {{ material.title }}
              </h3>
              <p class="text-gray-300 mb-4">{{ material.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-400"
                  >{{ material.downloads }} загрузок</span
                >
                <button
                  class="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all"
                >
                  Скачать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="py-20 bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-white mb-12">Блог</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="post in blogPosts"
            :key="post.title"
            class="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors duration-300"
          >
            <div class="p-6">
              <div class="text-blue-400 text-sm mb-2">{{ post.category }}</div>
              <h3 class="text-xl font-semibold text-white mb-2">
                {{ post.title }}
              </h3>
              <p class="text-gray-400 mb-4">{{ post.excerpt }}</p>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500">{{ post.date }}</span>
                <NuxtLink
                  :to="post.link"
                  class="text-blue-400 hover:text-blue-300"
                >
                  Читать далее →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-white mb-12">Отзывы</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="p-6 bg-gray-800 rounded-xl"
          >
            <p class="text-gray-300 mb-4 italic">"{{ testimonial.text }}"</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
              <div>
                <div class="font-semibold text-white">
                  {{ testimonial.name }}
                </div>
                <div class="text-sm text-blue-400">
                  {{ testimonial.course }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          Готовы начать свой путь?
        </h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Присоединяйтесь к нашему сообществу и начните свое путешествие к
          личностному росту уже сегодня.
        </p>
        <NuxtLink
          to="/register"
          class="inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors"
        >
          Присоединиться
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import EmotionalBarometerImage from "@/assets/images/awarenessTools/emotional-barometer.jpeg";
import DeepConversationWithCardsImage from "@/assets/images/awarenessTools/deep-conversation-with-cards.jpeg";
import EmotionaDiaryImage from "@/assets/images/awarenessTools/emotion-diary.jpeg";
import LifeArchetypeImage from "@/assets/images/awarenessTools/life-archetype.jpg";
// Loading state
const isLoading = ref(true);

// Your existing data
const popularTopics = ref([
  {
    title: "Самопознание",
    description: "Путь к пониманию себя и своих истинных желаний",
    image: EmotionalBarometerImage,
  },
  {
    title: "Отношения",
    description: "Построение здоровых и гармоничных отношений",
    image: DeepConversationWithCardsImage,
  },
  {
    title: "Карьера",
    description: "Профессиональное развитие и поиск призвания",
    image: EmotionaDiaryImage,
  },
  {
    title: "Личностный рост",
    description: "Развитие навыков и достижение целей",
    image: LifeArchetypeImage,
  },
]);
const features = ref([
  {
    title: "Психологические тесты",
    icon: "fas fa-brain",
    description: "Профессиональные методики для глубокого самопознания",
  },
  {
    title: "Сообщество",
    icon: "fas fa-users",
    description: "Поддержка единомышленников на вашем пути развития",
  },
  {
    title: "Личный профиль",
    icon: "fas fa-user-circle",
    description: "Отслеживание прогресса и персональные рекомендации",
  },
]);

const courses = ref([
  {
    title: "Эмоциональный интеллект",
    description: "Развитие навыков понимания и управления эмоциями",
    image: EmotionalBarometerImage,
    duration: "8 недель",
    link: "/courses/emotional-intelligence",
  },
  {
    title: "Стресс-менеджмент",
    description: "Техники управления стрессом и тревожностью",
    image: "/images/stress-management.jpg",
    duration: "6 недель",
    link: "/courses/stress-management",
  },
  {
    title: "Личная эффективность",
    description: "Методики повышения продуктивности и достижения целей",
    image: "/images/personal-effectiveness.jpg",
    duration: "10 недель",
    link: "/courses/personal-effectiveness",
  },
]);

const blogPosts = ref([
  {
    title: "Как развить эмоциональный интеллект",
    excerpt: "Практические упражнения для улучшения понимания эмоций",
    category: "Саморазвитие",
    date: "5 января 2025",
    link: "/blog/emotional-intelligence",
  },
  {
    title: "Медитация для начинающих",
    excerpt: "Простые техники медитации для ежедневной практики",
    category: "Практики",
    date: "3 января 2025",
    link: "/blog/meditation",
  },
  {
    title: "Преодоление тревожности",
    excerpt: "Эффективные методы работы с тревожными состояниями",
    category: "Психология",
    date: "1 января 2025",
    link: "/blog/anxiety",
  },
]);

const testimonials = ref([
  {
    name: "Анна К.",
    course: 'Курс "Эмоциональный интеллект"',
    text: "Этот курс полностью изменил мое понимание эмоций и помог улучшить отношения с близкими.",
  },
  {
    name: "Михаил П.",
    course: 'Тренинг "Личная эффективность"',
    text: "Благодаря курсу я научился правильно ставить цели и достигать их. Мотивация и продуктивность значительно выросли.",
  },
  {
    name: "Елена С.",
    course: "Курс по отношениям",
    text: "Глубокие инсайты и практические техники помогли мне лучше понять себя и построить здоровые отношения.",
  },
]);
const psychTools = ref([
  {
    title: "Тест на эмоциональный интеллект",
    icon: "fas fa-brain",
    description:
      "Узнайте уровень вашего EQ и получите рекомендации по развитию",
    link: "/tools/eq-test",
  },
  {
    title: "Дневник настроения",
    icon: "fas fa-book-open",
    description: "Отслеживайте свои эмоции и находите паттерны поведения",
    link: "/tools/mood-tracker",
  },
  {
    title: "Медитации",
    icon: "fas fa-peace",
    description: "Коллекция guided-медитаций для различных целей",
    link: "/tools/meditations",
  },
]);

const freeMaterials = ref([
  {
    title: "Руководство по медитации",
    type: "PDF Guide",
    icon: "fas fa-file-pdf",
    description: "30-страничное руководство для начинающих",
    downloads: "2.5K",
  },
  {
    title: "Дневник самопознания",
    type: "Workbook",
    icon: "fas fa-book",
    description: "Интерактивный воркбук с упражнениями",
    downloads: "1.8K",
  },
  {
    title: "Аудио медитации",
    type: "Audio Pack",
    icon: "fas fa-headphones",
    description: "10 медитаций для начинающих",
    downloads: "3.2K",
  },
]);
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
  60% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-slideDown {
  animation: slideDown 1.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 1.8s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 1.8s ease-out forwards;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientFlow 8s ease infinite;
}
</style>
