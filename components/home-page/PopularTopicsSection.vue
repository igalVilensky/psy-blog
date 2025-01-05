<template>
  <section class="py-20 bg-[#242436] relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1B26]/50"
    ></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
        >
          Популярные темы
        </h2>
        <div
          class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"
        ></div>
      </div>

      <div class="grid md:grid-cols-4 gap-6">
        <div
          v-for="item in popularTopics"
          :key="item.title"
          class="group relative overflow-hidden rounded-xl aspect-square"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"
          ></div>
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ item.title }}
            </h3>
            <p
              class="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import EmotionalBarometerImage from "@/assets/images/awarenessTools/emotional-barometer.jpeg";
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
