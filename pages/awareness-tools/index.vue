<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Инструменты осознанности
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Откройте для себя мир самопознания и эмоционального роста с нашими
          инструментами. Каждый инструмент - это шаг к более осознанной жизни.
        </p>
      </section>

      <!-- Tools Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ToolCard v-for="tool in tools" :key="tool.name" :tool="tool" />
      </div>

      <!-- CTA Section -->
      <div
        class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 mt-12 text-center"
      >
        <h2 class="text-3xl font-bold text-white mb-4">
          Начните свой путь к осознанности сегодня
        </h2>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          Исследуйте все наши инструменты и найдите те, которые наилучшим
          образом подходят для вашего пути самопознания.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ToolCard from "@/components/tools/ToolCard.vue";
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
