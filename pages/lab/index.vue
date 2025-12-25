<template>
  <div
    class="min-h-screen px-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-500 relative">

    <!-- Background Visualizer -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-100">
      <NeuralRewireVisualizer />
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/20 to-slate-50/80 dark:from-slate-950/80 dark:via-slate-950/20 dark:to-slate-950/80">
      </div>
    </div>

    <!-- Background Glow -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#38bdf8] to-[#818cf8] opacity-20 dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.187rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto max-w-5xl px-6 py-20 lg:py-32 relative z-10 text-center">
      <div class="animate-fade-in-up">
        <!-- Brand Title with Smooth Elevation -->
        <div class="brand-name-animated flex justify-center cursor-default select-none mb-8 gap-3 md:gap-4 lg:gap-5">
          <span v-for="(letter, index) in 'MindQLab'" :key="index"
            class="relative inline-grid place-items-center group/letter">
            <span class="invisible pointer-events-none tracking-widest text-4xl md:text-6xl lg:text-7xl">{{ letter
              }}</span>
            <span
              class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out group-hover/letter:-translate-y-2 text-slate-800 dark:text-white group-hover/letter:text-cyan-600 dark:group-hover/letter:text-cyan-400">
              <span class="relative z-10">
                {{ letter }}
              </span>
              <span
                class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover/letter:opacity-100 group-hover/letter:translate-y-2 transition-all duration-1000 ease-in-out blur-[1px]"></span>
            </span>
          </span>
        </div>

        <h1
          class="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.15]">
          <span
            class="block bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white">
            Тренировки мозга и саморазвитие
          </span>
        </h1>

        <p
          class="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          MindQLab — это пространство для глубокого понимания себя и системного развития.
          Короткие <span class="text-cyan-600 dark:text-cyan-400 font-medium font-mono">10–15-минутные</span> сессии:
          когнитивные упражнения, медитации, тесты
          и персональная аналитика прогресса для развития <span
            class="text-purple-600 dark:text-purple-400 font-medium">памяти, внимания</span> и <span
            class="text-indigo-600 dark:text-indigo-400 font-medium">эмоционального интеллекта</span>.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <NuxtLink to="/lab/tests"
            class="group relative px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 overflow-hidden">
            <div
              class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]">
            </div>
            <span class="relative flex items-center gap-3">
              <i class="fas fa-vial"></i>
              Пройти тест бесплатно
            </span>
          </NuxtLink>

          <NuxtLink to="/lab/builder"
            class="group px-10 py-5 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 hover:bg-white/20 dark:hover:bg-slate-900/60 rounded-2xl font-bold text-lg transition-all duration-300 text-slate-900 dark:text-white">
            <span class="flex items-center gap-3">
              <i class="fas fa-puzzle-piece"></i>
              Конструктор Лаборатории
            </span>
          </NuxtLink>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-col items-center gap-4 py-8 border-t border-slate-200/50 dark:border-white/5">
          <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-light tracking-wide">
            <span>Или сразу:</span>
            <NuxtLink to="/lab" class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors">Войти в
              лабораторию</NuxtLink>
            <span class="opacity-20">•</span>
            <NuxtLink to="/courses"
              class="text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors">Курсы и гайды
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useHead } from "@unhead/vue";
import NeuralRewireVisualizer from "~/components/lab/habit-override/NeuralRewireVisualizer.vue";

definePageMeta({
  layout: "laboratory",
});

const labActive = ref(false);
const auth = useAuthStore();

// SEO metadata
useHead({
  title: "Тренировки мозга и саморазвитие — MindQLab",
  meta: [
    {
      name: "description",
      content:
        "MindQLab — тренировки мозга, когнитивные упражнения, медитации и тесты с персональной аналитикой прогресса. 10–15 минут в день для развития памяти, внимания и осознанности.",
    },
    {
      name: "keywords",
      content:
        "тренировки мозга, когнитивные упражнения, развитие памяти, внимание, саморазвитие онлайн, медитация, осознанность, эмоциональный интеллект, тесты личности, MindQLab",
    },
    { property: "og:title", content: "Тренировки мозга и саморазвитие — MindQLab" },
    {
      property: "og:description",
      content:
        "Когнитивные тренажёры, медитации и персональная аналитика прогресса. 10–15 минут в день — начните бесплатно в MindQLab.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.mindqlab.com/lab" },
    { property: "og:image", content: "https://www.mindqlab.com/mindqlab-logo.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Тренировки мозга и саморазвитие — MindQLab" },
    {
      name: "twitter:description",
      content:
        "Когнитивные упражнения, медитации и аналитика прогресса — платформа MindQLab.",
    },
    { name: "twitter:image", content: "https://www.mindqlab.com/mindqlab-logo.png" },
  ],
  link: [{ rel: "canonical", href: "https://www.mindqlab.com/lab" }],
});
</script>

<style scoped>
/* Hero Enhanced Styles */
.brand-name-animated {
  display: flex;
}

.dark .brand-name-animated {
  font-weight: 200;
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid theme("colors.cyan.400");
  outline-offset: 4px;
  border-radius: 0.5rem;
}

@keyframes gradient {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }

  50% {
    transform: translate(var(--float-x, 10px), var(--float-y, -15px)) scale(1.3);
    opacity: 0.8;
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 4s ease infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent);
  border-radius: 50%;
  animation: float 4s infinite ease-in-out;
  --float-x: 15px;
  --float-y: -20px;
}


@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
