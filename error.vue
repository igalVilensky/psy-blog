<!-- error.vue (for 500, network errors, etc.) -->
<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4">{{ error?.statusCode || 'Error' }}</h1>
      <p class="text-xl mb-8">{{ error?.statusMessage || 'Something went wrong' }}</p>
      <NuxtLink to="/" class="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600">
        Go Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { error } = defineProps(['error'])
</script>