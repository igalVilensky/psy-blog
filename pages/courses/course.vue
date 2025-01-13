<template>
  <div class="relative min-h-screen bg-slate-900">
    <!-- Added base background color -->
    <!-- Fixed background with proper opacity -->
    <div class="fixed inset-0">
      <div class="absolute top-0 left-0 w-full h-full bg-slate-900">
        <!-- Darker background -->
        <!-- Adjusted gradient orbs -->
        <div
          class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section with adjusted colors -->
      <section class="text-center mb-16 relative">
        <div
          class="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl transform -skew-y-1"
        ></div>
        <span
          class="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium mb-6"
        >
          Премиум Курс
        </span>
        <h1
          class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight mb-6 relative"
        >
          Исцеление Детских Травм
        </h1>
        <p
          class="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          Профессиональный курс по трансформации негативного опыта в ресурс для
          личностного роста
        </p>
      </section>

      <!-- Course Content Section with proper contrast -->
      <div
        class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-2xl"
      >
        <div class="space-y-8">
          <!-- Lesson Card with adjusted colors -->
          <div
            v-for="(lesson, index) in lessons"
            :key="index"
            class="flex flex-col md:flex-row gap-8 sm:p-6 relative group rounded-xl transition-all duration-300 hover:bg-slate-700/50"
          >
            <!-- Video Section -->
            <div class="md:w-2/5 flex-shrink-0">
              <div
                class="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-blue-500/20 shadow-lg"
              >
                <iframe
                  :src="`https://www.youtube.com/embed/${getYouTubeId(
                    lesson.videoUrl
                  )}?controls=1&rel=0`"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- Content Section -->
            <div class="flex-1 flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="px-4 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium"
                >
                  Урок {{ index + 1 }}
                </span>
                <div
                  class="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent"
                ></div>
              </div>
              <h2
                class="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300"
              >
                {{ lesson.title }}
              </h2>
              <p class="text-gray-300 mb-6 leading-relaxed">
                {{ lesson.description }}
              </p>

              <!-- Metadata section -->
              <div class="flex flex-wrap gap-6 text-sm">
                <span
                  class="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-200"
                >
                  <span
                    class="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0"
                  >
                    📚
                  </span>
                  <span>25 минут</span>
                </span>
                <span
                  class="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-200"
                >
                  <span
                    class="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0"
                  >
                    ✍️
                  </span>
                  <span>Практическое задание</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription Section with fixed contrast -->
      <div
        class="mt-16 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-12 text-center relative overflow-hidden"
      >
        <h2 class="text-3xl font-bold text-white mb-4 relative">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Получите доступ к эксклюзивным материалам курса и будьте в курсе новых
          обновлений
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-6 py-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-slate-900/50 border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 rounded-lg sm:rounded-l-none sm:rounded-r-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 text-white"
          >
            <span class="flex items-center gap-2">
              <i class="fas fa-envelope text-lg"></i>
              Подписаться
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";

const db = getFirestore();
const email = ref("");

const lessons = [
  {
    title: "Что такое детская травма и как происходит исцеление",
    description:
      "Приспособление к родительским потребностям зачастую приводит к превращению ребенка в «псевдоличность», развитию мнимого Я.",
    videoUrl: "https://youtu.be/C6Cs3X8uBJQ",
  },
  {
    title: "Перенос",
    description:
      "Перенос — феномен в психодинамической психологии, заключающийся в бессознательном перемещении ранее пережитых чувств.",
    videoUrl: "https://youtu.be/67tTcO8dr2w",
  },
  {
    title: "Запреты, которые вам транслировали родители",
    description: "Первый запрет — «Не живи», «не чувствуй».",
    videoUrl: "https://youtu.be/FeF4PsSZVL4",
  },
  {
    title: "Второй запрет — «Не будь ребёнком»",
    description: "Исследование влияния второго запрета на развитие личности.",
    videoUrl: "https://youtu.be/6RHGk8XHOJc",
  },
];

const getEmbedUrl = (url) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

// Keeping your existing subscription logic
const subscribeEmail = async () => {
  if (!validateEmail(email.value)) {
    alert("Пожалуйста, введите корректный email");
    return;
  }

  const result = await subscribeUser(db, email.value);
  if (result.success) {
    alert(result.message);
    email.value = "";
  } else {
    alert(result.message);
  }
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
</script>
