<template>
  <div class="w-full">
    <h2 class="text-2xl font-bold text-white mb-6">Последние статьи</h2>
    <div class="space-y-6">
      <div
        v-for="post in posts"
        :key="post._id"
        class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300"
      >
        <h3
          class="text-lg text-sky-400 mb-2 hover:text-sky-300 transition-colors"
        >
          {{ post.title }}
        </h3>
        <p class="text-slate-300 text-sm mb-2">{{ post.intro }}</p>
        <div
          class="flex justify-between items-center text-sm text-slate-400 mb-4"
        >
          <span
            v-if="post.category"
            class="px-2 py-1 rounded-full bg-[#0EA5E9]/10"
            >{{ post.category }}</span
          >
          <span v-if="post.publishedAt">
            {{
              new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
              })
            }}
          </span>
          <span v-if="post.views">{{ post.views }} просмотров</span>
        </div>
        <NuxtLink
          :to="'/blog/' + post.slug.current"
          class="text-sky-400 text-sm font-medium flex items-center hover:text-sky-300 transition-colors"
        >
          Читать далее <i class="fas fa-arrow-right ml-2"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: Array,
});
</script>
