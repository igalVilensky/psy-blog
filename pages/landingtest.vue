<template>
  <div class="mt-24 text-white">
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="post in posts.data" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: posts, error } = await useFetch(
  "http://localhost:8055/items/posts"
);

console.log(posts.value);

if (error.value) {
  console.error("Error fetching posts:", error.value);
}
</script>
