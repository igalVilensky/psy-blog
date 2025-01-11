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
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Инструменты осознанности
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Откройте для себя мир самопознания и эмоционального роста с нашими
          инструментами. Каждый инструмент - это шаг к более осознанной жизни.
        </p>
      </section>

      <!-- Tools Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="tool in tools"
          :key="tool.name"
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] flex flex-col"
        >
          <!-- Tool Image -->
          <div class="relative overflow-hidden aspect-[4/3]">
            <img
              :src="tool.image"
              :alt="tool.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <!-- Tool Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h2
              class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 line-clamp-2"
            >
              {{ tool.name }}
            </h2>
            <p class="text-slate-300 line-clamp-3 mt-2">
              {{ tool.description }}
            </p>
            <!-- Button Container -->
            <div class="mt-auto pt-6">
              <a
                :href="tool.path"
                class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group w-full"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-book-open"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
                >
                  <i class="fas fa-arrow-right mr-2"></i>
                  Подробнее
                </span>
                <span class="relative invisible">Подробнее</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Начните свой путь к осознанности сегодня
        </h2>
        <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
          Исследуйте все наши инструменты и найдите те, которые наилучшим
          образом подходят для вашего пути самопознания.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EmotionalBarometerImage from "@/assets/images/awarenessTools/emotional-barometer.jpeg";
import DeepConversationWithCardsImage from "@/assets/images/awarenessTools/deep-conversation-with-cards.jpeg";
import LifeArchetypeImage from "@/assets/images/awarenessTools/life-archetype.jpg";

const tools = ref([
  {
    name: "Открытие Архетипа Жизни",
    path: "/awareness-tools/life-purpose-archetype",
    description:
      "Погрузитесь в глубокое исследование архетипов вашей личности и раскройте истинную цель вашей жизни через трансформационный процесс самопознания.",
    image: LifeArchetypeImage,
  },
  {
    name: "Эмоциональный барометр",
    path: "/awareness-tools/emotional-barometer",
    description:
      "Измерьте и отслеживайте ваши эмоции в реальном времени. Научитесь лучше понимать свои чувства и управлять ими.",
    image: EmotionalBarometerImage,
  },
  {
    name: "Глубокий разговор с картами",
    path: "/awareness-tools/deep-conversation-with-cards",
    description:
      "Погрузитесь в глубокие разговоры с помощью специально разработанных карт. Откройте новые грани себя и своих отношений.",
    image: DeepConversationWithCardsImage,
  },
]);
</script>

<style scoped>
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}
</style>
