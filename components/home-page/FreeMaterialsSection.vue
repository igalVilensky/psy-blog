<template>
  <section class="py-20 bg-[#1A1B26]">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2
          class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400"
        >
          Бесплатные материалы
        </h2>
        <div
          class="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mt-4 rounded-full"
        ></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="material in freeMaterials"
          :key="material.title"
          class="group bg-gradient-to-br from-[#242436] to-[#1A1B26] rounded-xl overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center"
              >
                <i :class="material.icon" class="text-white"></i>
              </div>
              <span class="ml-3 text-white font-medium">{{
                material.type
              }}</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">
              {{ material.title }}
            </h3>
            <p class="text-gray-300 mb-4">{{ material.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400"
                >{{ material.downloads }} загрузок</span
              >
              <button
                class="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all"
              >
                Скачать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const freeMaterials = ref([
  {
    title: "Руководство по медитации",
    type: "PDF Guide",
    icon: "fas fa-file-pdf",
    description: "30-страничное руководство для начинающих",
    downloads: "2.5K",
  },
  {
    title: "Дневник самопознания",
    type: "Workbook",
    icon: "fas fa-book",
    description: "Интерактивный воркбук с упражнениями",
    downloads: "1.8K",
  },
  {
    title: "Аудио медитации",
    type: "Audio Pack",
    icon: "fas fa-headphones",
    description: "10 медитаций для начинающих",
    downloads: "3.2K",
  },
]);
</script>
