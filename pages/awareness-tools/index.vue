<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-6xl relative z-10 py-12 px-4 xl:px-0">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6">
          Инструменты осознанности
        </h1>
        <p class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Откройте для себя мир самопознания и эмоционального роста с нашими
          инструментами. Каждый инструмент - это шаг к более осознанной жизни.
        </p>
      </section>

      <!-- Tools Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="tool in tools" :key="tool.name"
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] flex flex-col">
          <!-- Tool Image -->
          <div class="relative overflow-hidden aspect-[4/3]">
            <img :src="tool.image" :alt="tool.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy" />
          </div>

          <!-- Tool Content -->
          <div class="p-6 sm:p-8 flex flex-col flex-grow">
            <h2
              class="text-xl font-bold text-white/90 group-hover:text-[#0EA5E9] transition-colors duration-300 line-clamp-2">
              {{ tool.name }}
            </h2>
            <p class="text-slate-300 line-clamp-3 mt-2">
              {{ tool.description }}
            </p>
            <!-- Button Container -->
            <div class="mt-auto pt-6">
              <a :href="tool.path"
                class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group w-full">
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease">
                  <i class="fas fa-book-open"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease">
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
        class="mt-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]">
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
import EmotionalBarometerImage from "@/assets/images/awarenessTools/emotional-compass.jpeg";
import DeepConversationWithCardsImage from "@/assets/images/awarenessTools/deep-conversation-with-cards.jpeg";
import LifeArchetypeImage from "@/assets/images/awarenessTools/archetypes_test_cta.png";
import big5Image from "@/assets/images/awarenessTools/big5.jpg";

const tools = ref([
  {
    name: "12 Архетипов",
    path: "/lab/tests/life-purpose-archetype",
    description:
      "Погрузитесь в глубокое исследование архетипов вашей личности и раскройте истинную цель вашей жизни через трансформационный процесс самопознания.",
    image: LifeArchetypeImage,
  },
  {
    name: "Большая пятёрка",
    path: "/lab/tests/big-5-model",
    description:
      "Узнайте себя лучше через проверенную модель 'Большой Пятёрки' и откройте новые перспективы для личного и профессионального роста.",
    image: big5Image,
  },
  {
    name: "Эмоциональный компас",
    path: "/lab/growth/emotional-compass",
    description:
      "Измерьте и отслеживайте ваши эмоции в реальном времени. Научитесь лучше понимать свои чувства и управлять ими.",
    image: EmotionalBarometerImage,
  },
  {
    name: "Глубокий разговор с картами",
    path: "/lab/growth/deep-conversation",
    description:
      "Погрузитесь в глубокие разговоры с помощью специально разработанных карт. Откройте новые грани себя и своих отношений.",
    image: DeepConversationWithCardsImage,
  },
]);
</script>
