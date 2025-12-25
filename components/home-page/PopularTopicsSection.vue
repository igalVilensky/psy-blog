<template>
  <section class="py-20 bg-[#2C3E50] relative overflow-hidden max-w-6xl w-full mx-auto">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#34495E]/50"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Популярные темы
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div class="grid md:grid-cols-4 gap-6">
        <div v-for="item in popularTopics" :key="item.title"
          class="group relative overflow-hidden rounded-xl aspect-square">
          <!-- Dark gradient overlay for better text visibility -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>

          <!-- Image with hover zoom effect -->
          <img :src="item.image" :alt="item.title"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />

          <!-- Text content - now always visible -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ item.title }}
            </h3>
            <p class="text-gray-300 text-sm">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import EmotionalBarometerImage from "@/assets/images/awarenessTools/emotional-compass.jpeg";
import DeepConversationWithCardsImage from "@/assets/images/awarenessTools/deep-conversation-with-cards.jpeg";
import EmotionaDiaryImage from "@/assets/images/awarenessTools/emotion-diary.jpeg";
import LifeArchetypeImage from "@/assets/images/awarenessTools/life-archetype.jpg";

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
</script>

<style scoped>
/* Optional shadow for better contrast */
section {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
