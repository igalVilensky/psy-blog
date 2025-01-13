<template>
  <div class="relative min-h-screen bg-slate-900">
    <!-- Fixed background with proper opacity -->
    <div class="fixed inset-0">
      <div class="absolute top-0 left-0 w-full h-full bg-slate-900">
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
      <!-- Lesson Content Section -->
      <div
        v-if="lesson"
        class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-2xl"
      >
        <div class="flex flex-col md:flex-row gap-8 sm:p-6">
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
                Урок {{ lessonNumber }}
              </span>
              <div
                class="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent"
              ></div>
            </div>
            <h2 class="text-2xl font-bold text-white mb-4">
              {{ lesson.title }}
            </h2>
            <p class="text-gray-300 mb-6 leading-relaxed">
              {{ lesson.description }}
            </p>

            <!-- Metadata section -->
            <div class="flex flex-wrap gap-6 text-sm">
              <!-- Duration (if exists) -->
              <span
                v-if="lesson.duration"
                class="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-200"
              >
                <span
                  class="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-hourglass text-sm"></i>
                </span>
                <span>{{ lesson.duration }}</span>
              </span>

              <!-- Practical Tasks (if exists) -->
              <span
                v-if="lesson.hasPractical"
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

      <!-- Lessons Section -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold text-white mb-8">Все уроки курса</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(lesson, index) in lessons"
            :key="index"
            :to="lesson.link"
            class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
          >
            <div class="flex items-center gap-3 mb-4">
              <span
                class="px-4 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium"
              >
                Урок {{ index + 1 }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">
              {{ lesson.title }}
            </h3>
            <p class="text-gray-300 line-clamp-3 mb-4">
              {{ lesson.description }}
            </p>
            <!-- Metadata section -->
            <div class="flex flex-wrap gap-3 text-sm">
              <!-- Duration (if exists) -->
              <span
                v-if="lesson.duration"
                class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-700/50 text-gray-200"
              >
                <i class="fas fa-hourglass text-sm"></i>
                <span>{{ lesson.duration }}</span>
              </span>

              <!-- Practical Tasks (if exists) -->
              <span
                v-if="lesson.hasPractical"
                class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-700/50 text-gray-200"
              >
                <i class="fas fa-tasks text-sm"></i>
                <span>Практика</span>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Back to Course Link -->
      <div class="mt-8 text-center">
        <NuxtLink
          to="/courses/healing-childhood-traumas"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/20 text-cyan-300 hover:bg-blue-500/30 transition-colors duration-300"
        >
          <i class="fas fa-arrow-left"></i>
          Назад к курсу
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Get the dynamic `lesson` parameter from the route
const route = useRoute();
const lessonSlug = route.params.lesson;

// Lessons data
const lessons = [
  {
    title: "Что такое детская травма и как происходит исцеление",
    description:
      "Приспособление к родительским потребностям зачастую приводит к превращению ребенка в «псевдоличность», развитию мнимого Я. Человек ведет себя так, как от него хотят, и постепенно этот тип поведения начинает определять все его поступки и помыслы.",
    videoUrl: "https://youtu.be/C6Cs3X8uBJQ",
    duration: "33 минуты",
    link: "/courses/healing-childhood-traumas/lesson-1",
  },
  {
    title: "Перенос",
    description:
      "Перенос — феномен в психодинамической психологии, заключающийся в бессознательном перемещении ранее пережитых (особенно в детстве) чувств и отношений, проявлявшихся к одному лицу, совсем на другое лицо.",
    videoUrl: "https://youtu.be/67tTcO8dr2w",
    duration: "14 минут",
    link: "/courses/healing-childhood-traumas/lesson-2",
  },
  {
    title: "Запреты, которые вам транслировали родители",
    description: "Первый запрет — «Не живи», «не чувствуй».",
    videoUrl: "https://youtu.be/FeF4PsSZVL4",
    duration: "20 минут",
    link: "/courses/healing-childhood-traumas/lesson-3",
  },
  {
    title: "Второй запрет — «Не будь ребёнком»",
    description: "Исследование влияния второго запрета на развитие личности.",
    videoUrl: "https://youtu.be/6RHGk8XHOJc",
    duration: "38 минут",
    link: "/courses/healing-childhood-traumas/lesson-4",
  },
  {
    title: "Травма Отверженности или «Не бросай меня»",
    description:
      "Исследование травмы отверженности и ее влияния на формирование личности.",
    videoUrl: "https://youtu.be/76HU8Tc-1gE",
    duration: "33 минуты",
    link: "/courses/healing-childhood-traumas/lesson-5",
  },
  {
    title: "Травма недоверия и жестокого обращения «Я тебе не доверяю»",
    description:
      "Анализ травмы недоверия и ее последствий для межличностных отношений.",
    videoUrl: "https://youtu.be/dDD_O_Fmgpo",
    duration: "39 минут",
    link: "/courses/healing-childhood-traumas/lesson-6",
  },
  {
    title: "Травма Эмоциональной депривации, «Меня никогда не полюбят»",
    description:
      "Изучение травмы эмоциональной депривации и ее влияния на самооценку и отношения.",
    videoUrl: "https://youtu.be/_1T6zCGxfEs",
    duration: "33 минуты",
    link: "/courses/healing-childhood-traumas/lesson-7",
  },
  {
    title: "«Я не такой, как все». Травма Изгнания из общества",
    description:
      "Исследование травмы изгнания из общества и ее влияния на социальную адаптацию.",
    videoUrl: "https://youtu.be/CSJSYUTrAV0",
    duration: "28 минут",
    link: "/courses/healing-childhood-traumas/lesson-8",
  },
  {
    title: "«Я сам не справлюсь». Травма Зависимости",
    description:
      "Анализ травмы зависимости и ее влияния на формирование самостоятельности.",
    videoUrl: "https://youtu.be/SbQduqTp4wc",
    duration: "35 минут",
    link: "/courses/healing-childhood-traumas/lesson-9",
  },
  {
    title: "«Вот-вот случится беда». Травма Уязвимости",
    description:
      "Изучение травмы уязвимости и ее влияния на восприятие мира и себя.",
    videoUrl: "https://youtu.be/pl-iEP8Qh_c",
    duration: "31 минута",
    link: "/courses/healing-childhood-traumas/lesson-10",
  },
];

// Find the current lesson based on the slug
const lesson = computed(() =>
  lessons.find((lesson) => lesson.link.includes(lessonSlug))
);

// Extract lesson number from the slug
const lessonNumber = computed(() => {
  const match = lessonSlug.match(/lesson-(\d+)/);
  return match ? match[1] : null;
});

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
</script>
