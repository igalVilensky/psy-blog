<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <!-- Main Content Area -->
        <div class="lg:col-span-2">
          <div v-if="lesson" class="space-y-6">
            <!-- Video Player -->
            <div
              class="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video border border-slate-200 dark:border-slate-800">
              <iframe :src="`https://www.youtube.com/embed/${getYouTubeId(lesson.videoUrl)}?controls=1&rel=0`"
                class="w-full h-full" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>

            <!-- Lesson Info -->
            <div class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50">
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="px-3 py-1 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                  Урок {{ lessonNumber }}
                </span>
                <span v-if="lesson.duration" class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <i class="fas fa-clock"></i> {{ lesson.duration }}
                </span>
              </div>

              <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {{ lesson.title }}
              </h1>

              <div class="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <p>{{ lesson.description }}</p>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex items-center justify-between mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <NuxtLink v-if="prevLesson" :to="prevLesson.link"
                  class="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  <i class="fas fa-arrow-left"></i>
                  <span>Предыдущий</span>
                </NuxtLink>
                <div v-else></div>

                <NuxtLink v-if="nextLesson" :to="nextLesson.link"
                  class="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  <span>Следующий</span>
                  <i class="fas fa-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar: Playlist -->
        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden sticky top-24">
            <div class="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h3 class="font-bold text-slate-900 dark:text-white">Содержание курса</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ lessons.length }} уроков</p>
            </div>

            <div class="max-h-[600px] overflow-y-auto custom-scrollbar">
              <NuxtLink v-for="(l, idx) in lessons" :key="idx" :to="l.link"
                class="block p-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                :class="{ 'bg-rose-50 dark:bg-rose-900/10 border-l-4 border-l-rose-500': l.link.includes(lessonSlug) }">
                <div class="flex gap-3">
                  <div class="mt-1 min-w-[24px] h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    :class="l.link.includes(lessonSlug) ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'">
                    {{ idx + 1 }}
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-slate-900 dark:text-white line-clamp-2"
                      :class="{ 'text-rose-600 dark:text-rose-400': l.link.includes(lessonSlug) }">
                      {{ l.title }}
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ l.duration }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "laboratory",
});
import { ref, computed } from "vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

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
    link: "/lab/psychology/healing-childhood-traumas/lesson-1",
  },
  {
    title: "Перенос",
    description:
      "Перенос — феномен в психодинамической психологии, заключающийся в бессознательном перемещении ранее пережитых (особенно в детстве) чувств и отношений, проявлявшихся к одному лицу, совсем на другое лицо.",
    videoUrl: "https://youtu.be/67tTcO8dr2w",
    duration: "14 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-2",
  },
  {
    title: "Запреты, которые вам транслировали родители",
    description: "Первый запрет — «Не живи», «не чувствуй».",
    videoUrl: "https://youtu.be/FeF4PsSZVL4",
    duration: "20 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-3",
  },
  {
    title: "Второй запрет — «Не будь ребёнком»",
    description: "Исследование влияния второго запрета на развитие личности.",
    videoUrl: "https://youtu.be/6RHGk8XHOJc",
    duration: "38 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-4",
  },
  {
    title: "Травма Отверженности или «Не бросай меня»",
    description:
      "Исследование травмы отверженности и ее влияния на формирование личности.",
    videoUrl: "https://youtu.be/76HU8Tc-1gE",
    duration: "33 минуты",
    link: "/lab/psychology/healing-childhood-traumas/lesson-5",
  },
  {
    title: "Травма недоверия и жестокого обращения «Я тебе не доверяю»",
    description:
      "Анализ травмы недоверия и ее последствий для межличностных отношений.",
    videoUrl: "https://youtu.be/dDD_O_Fmgpo",
    duration: "39 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-6",
  },
  {
    title: "Травма Эмоциональной депривации, «Меня никогда не полюбят»",
    description:
      "Изучение травмы эмоциональной депривации и ее влияния на самооценку и отношения.",
    videoUrl: "https://youtu.be/_1T6zCGxfEs",
    duration: "33 минуты",
    link: "/lab/psychology/healing-childhood-traumas/lesson-7",
  },
  {
    title: "«Я не такой, как все». Травма Изгнания из общества",
    description:
      "Исследование травмы изгнания из общества и ее влияния на социальную адаптацию.",
    videoUrl: "https://youtu.be/CSJSYUTrAV0",
    duration: "28 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-8",
  },
  {
    title: "«Я сам не справлюсь». Травма Зависимости",
    description:
      "Анализ травмы зависимости и ее влияния на формирование самостоятельности.",
    videoUrl: "https://youtu.be/SbQduqTp4wc",
    duration: "35 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-9",
  },
  {
    title: "«Вот-вот случится беда». Травма Уязвимости",
    description:
      "Изучение травмы уязвимости и ее влияния на восприятие мира и себя.",
    videoUrl: "https://youtu.be/pl-iEP8Qh_c",
    duration: "31 минута",
    link: "/lab/psychology/healing-childhood-traumas/lesson-10",
  },
  {
    title: "«Я никуда не гожусь». Травма Неполноценности",
    description:
      "Исследование травмы неполноценности и ее влияния на самооценку и поведение.",
    videoUrl: "https://youtu.be/dDhmDl6i_xo",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-11",
  },
  {
    title: "«Я чувствую себя неудачником». Травма Несостоятельности",
    description:
      "Изучение травмы несостоятельности и ее влияния на мотивацию и достижения.",
    videoUrl: "https://youtu.be/7YdoSq4a8l0",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-12",
  },
  {
    title: "«Я всё делаю по-твоему!» Травма Покорности",
    description:
      "Анализ травмы покорности и ее влияния на принятие решений и личные границы.",
    videoUrl: "https://youtu.be/54Vl1Tf1wlE",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-13",
  },
  {
    title: "«Всегда можно сделать еще лучше». Травма Завышенных Стандартов",
    description:
      "Исследование травмы завышенных стандартов и ее влияния на перфекционизм и самооценку.",
    videoUrl: "https://youtu.be/Ur-SC8vcvKE",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-14",
  },
  {
    title: "«Я получаю все, что хочу». Травма Избранности",
    description:
      "Изучение травмы избранности и ее влияния на отношения и восприятие реальности.",
    videoUrl: "https://youtu.be/qyZUSPNZ23M",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-15",
  },
  {
    title: "Практический урок 16",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/YYjhbapjIug",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-16",
  },
  {
    title: "Практический урок 17",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/55cFqXwBArU",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-17",
  },
  {
    title: "Практический урок 18",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/WC2pCSWdFz8",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-18",
  },
  {
    title: "Практический урок 19",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/dvPcKeJFy2Y",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-19",
  },
  {
    title: "Практический урок 20",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/NkRFEwTsd9E",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-20",
  },
  {
    title: "Практический урок 21",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/E_YTCQ0zQ5U",
    duration: "30 минут",
    link: "/lab/psychology/healing-childhood-traumas/lesson-21",
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

// Navigation
const currentIndex = computed(() => lessons.findIndex(l => l.link.includes(lessonSlug)));
const prevLesson = computed(() => currentIndex.value > 0 ? lessons[currentIndex.value - 1] : null);
const nextLesson = computed(() => currentIndex.value < lessons.length - 1 ? lessons[currentIndex.value + 1] : null);

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
</script>
