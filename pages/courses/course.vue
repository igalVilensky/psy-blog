<template>
  <div class="relative min-h-screen">
    <!-- Background remains the same -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
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
      <!-- Hero section remains the same -->
      <section class="text-center mb-12 relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 to-[#22D3EE]/5 rounded-3xl transform -skew-y-1"
        ></div>
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6 relative"
        >
          Курс: Исцеление Детских Травм
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Погрузитесь в процесс исцеления и узнайте, как детские травмы влияют
          на вашу жизнь и как их преодолеть.
        </p>
      </section>

      <!-- Course Content Section -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8"
      >
        <div class="space-y-8">
          <!-- Modified Lesson Card -->
          <div
            v-for="(lesson, index) in lessons"
            :key="index"
            class="flex flex-col md:flex-row gap-6 p-4 relative group rounded-xl hover:bg-[#0EA5E9]/5"
          >
            <!-- Video Section - Fixed width container -->
            <div class="md:w-2/5 flex-shrink-0">
              <div
                class="w-full aspect-video bg-[#1A1F35] rounded-xl overflow-hidden"
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
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span
                  class="px-3 py-1 rounded-full bg-[#0EA5E9]/10 text-[#22D3EE] text-sm"
                >
                  Урок {{ index + 1 }}
                </span>
                <div
                  class="h-px flex-1 bg-gradient-to-r from-[#0EA5E9]/20 to-transparent"
                ></div>
              </div>
              <h2
                class="text-2xl font-bold text-white/90 mb-4 group-hover:text-[#22D3EE] transition-colors duration-300"
              >
                {{ lesson.title }}
              </h2>
              <p class="text-slate-300 mb-4">{{ lesson.description }}</p>
              <!-- Modified metadata section for better mobile responsiveness -->
              <div class="flex flex-wrap gap-4 text-sm text-slate-400">
                <span class="inline-flex items-center gap-2 whitespace-nowrap">
                  <span
                    class="w-4 h-4 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0"
                  >
                    📚
                  </span>
                  <span>25 минут</span>
                </span>
                <span class="inline-flex items-center gap-2 whitespace-nowrap">
                  <span
                    class="w-4 h-4 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0"
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

      <!-- Subscription section remains the same -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Получите доступ к эксклюзивным курсам, которые помогут вам в
          путешествии к самопознанию.
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-6 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center min-w-[160px] overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg sm:rounded-l-none sm:rounded-r-lg group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
            >
              <i class="fas fa-bell text-lg"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
            >
              <i class="fas fa-envelope text-lg mr-2"></i>
              Подписаться
            </span>
            <span class="relative invisible px-8 py-3">Подписаться</span>
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
