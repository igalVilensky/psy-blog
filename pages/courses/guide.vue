<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]"
  >
    <!-- Animated background overlay -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 animate-gradient-x"
      ></div>
    </div>

    <div class="container mx-auto px-4 max-w-4xl py-24 relative z-10">
      <!-- Hero Section with Parallax Effect -->
      <section
        class="relative mb-12 rounded-3xl overflow-hidden h-[400px] group"
        :style="{
          backgroundImage: `url(${guideImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 via-[#1E1B4B]/80 to-[#0F172A]/80 backdrop-blur-sm transition-all"
        ></div>
        <div
          class="relative z-10 h-full flex flex-col justify-center items-center p-8 transform transition-transform"
        >
          <h1
            class="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400"
          >
            Что же такое любовь к себе?
          </h1>
          <p
            class="text-xl text-gray-300 leading-relaxed max-w-2xl text-center"
          >
            Погрузитесь в размышления о том, что значит любить себя, и как это
            влияет на качество жизни.
          </p>
        </div>
      </section>

      <!-- Main Content Card -->
      <article
        class="bg-[#1E1B4B]/40 backdrop-blur-sm rounded-3xl shadow-[0_2px_20px_rgba(123,97,255,0.15)] overflow-hidden"
      >
        <!-- Introduction -->
        <div class="p-8 border-b border-purple-500/20">
          <h2
            class="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400"
          >
            Что же такое любовь к себе?
          </h2>
          <p class="text-gray-300 leading-relaxed text-lg">
            Недавно мне задали этот вопрос. И знаете, это действительно очень
            субъективное понятие. Каждый из нас может рассказать что-то своё о
            том, как любить себя. За последние 15 лет мы прочитали массу книг,
            статей и рекомендаций на эту тему. Но у каждого остаётся своё
            понимание.
          </p>
        </div>

        <!-- Quotes Section -->
        <div
          class="p-8 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-purple-500/5"
        >
          <h3
            class="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center gap-2"
          >
            <span
              class="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400"
            >
              "
            </span>
            Известные цитаты
          </h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              class="bg-[#0F172A]/40 p-6 rounded-xl shadow-[0_2px_10px_rgba(123,97,255,0.1)] hover:shadow-[0_2px_20px_rgba(123,97,255,0.2)] transition-all group"
            >
              <p class="text-gray-300 italic mb-2">
                «Любовь к себе имеет очень мало общего с тем, как вы относитесь
                к своему внешнему „я". Это о принятии себя целиком»
              </p>
              <p
                class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 font-medium"
              >
                — Тайра Бэнкс
              </p>
            </div>
            <div
              class="bg-[#0F172A]/40 p-6 rounded-xl shadow-[0_2px_10px_rgba(123,97,255,0.1)] hover:shadow-[0_2px_20px_rgba(123,97,255,0.2)] transition-all group"
            >
              <p class="text-gray-300 italic mb-2">
                «Любовь к себе — это источник всей другой любви»
              </p>
              <p
                class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 font-medium"
              >
                — Пьер Корнель
              </p>
            </div>
          </div>
        </div>

        <!-- AI Insights -->
        <div class="p-8">
          <h3
            class="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
          >
            Что говорит ИИ о любви к себе
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="(insight, index) in insights"
              :key="index"
              class="p-4 bg-[#0F172A]/40 rounded-xl hover:shadow-[0_2px_20px_rgba(123,97,255,0.15)] transition-all text-gray-300"
            >
              {{ insight }}
            </div>
          </div>
        </div>

        <!-- Personal View -->
        <div
          class="p-8 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-purple-500/5"
        >
          <h3
            class="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
          >
            Мой взгляд на любовь к себе
          </h3>
          <p class="text-gray-300 leading-relaxed mb-6">
            Для меня любовь к себе — это про самоценность и внутренние опоры.
            Это про образ жизни, где ты понимаешь:
          </p>
          <div class="space-y-3">
            <div
              v-for="(point, index) in personalPoints"
              :key="index"
              class="flex items-center gap-3 text-gray-300"
            >
              <span
                class="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
              ></span>
              {{ point }}
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 animate-gradient-x"
          ></div>
          <div class="p-8 text-center relative z-10">
            <div class="max-w-2xl mx-auto">
              <h2
                class="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400"
              >
                Рабочая тетрадь для развития
              </h2>
              <p class="text-gray-300 mb-8">
                Если вам интересно больше узнать о себе и развивать любовь к
                себе, у меня есть книга-рабочая тетрадь с упражнениями для
                понимания себя.
              </p>
              <button
                @click="downloadWorkbook"
                :disabled="isDownloading"
                class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-gray-200 px-8 py-4 rounded-xl font-semibold transition-all duration-500 hover:from-purple-500/20 hover:to-cyan-500/20"
              >
                <span v-if="!isDownloading">Скачать бесплатно</span>
                <span v-else>Загрузка...</span>
                <span class="w-5 h-5">↓</span>
                <span
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-500"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import guideImage from "~/assets/images/awarenessTools/life-archetype.jpg";

const insights = ref([
  "Принятие своих сильных и слабых сторон",
  "Уважение своих границ и умение говорить «нет»",
  "Забота о теле и душе (сон, питание, радость от любимого дела)",
  "Разрешение быть собой и отказ от необходимости оправдывать чужие ожидания",
]);

const personalPoints = ref([
  "Кто ты, что тебе важно, чего ты хочешь",
  "Что ты любишь, а что категорически не приемлешь",
]);

const isDownloading = ref(false);

const downloadWorkbook = async () => {
  isDownloading.value = true;
  try {
    // Simulate a delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Trigger the download
    const link = document.createElement("a");
    link.href = "/downloads/workbook.pdf"; // Path to your file
    link.download = "Рабочая тетрадь для развития.pdf"; // Filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    isDownloading.value = false;
  }
};
</script>

<style scoped>
.animate-gradient-x {
  animation: gradient-x 15s linear infinite;
}

@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
