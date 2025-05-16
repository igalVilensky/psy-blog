<template>
  <div class="text-center mb-6">
    <router-link
      :to="to"
      class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
    >
      Исследовать значения Сфирот
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: "/tree-of-self-info",
  },
});
</script>
