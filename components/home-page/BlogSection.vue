<template>
  <section class="py-20 bg-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-white mb-12">Блог</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="post in blogPosts"
          :key="post.title"
          class="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors duration-300"
        >
          <div class="p-6">
            <div class="text-blue-400 text-sm mb-2">{{ post.category }}</div>
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-400 mb-4">{{ post.excerpt }}</p>
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-500">{{ post.date }}</span>
              <NuxtLink
                :to="post.link"
                class="text-blue-400 hover:text-blue-300"
              >
                Читать далее →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const blogPosts = ref([
  {
    title: "Как развить эмоциональный интеллект",
    excerpt: "Практические упражнения для улучшения понимания эмоций",
    category: "Саморазвитие",
    date: "5 января 2025",
    link: "/blog/emotional-intelligence",
  },
  {
    title: "Медитация для начинающих",
    excerpt: "Простые техники медитации для ежедневной практики",
    category: "Практики",
    date: "3 января 2025",
    link: "/blog/meditation",
  },
  {
    title: "Преодоление тревожности",
    excerpt: "Эффективные методы работы с тревожными состояниями",
    category: "Психология",
    date: "1 января 2025",
    link: "/blog/anxiety",
  },
]);
</script>
