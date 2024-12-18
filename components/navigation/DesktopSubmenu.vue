<template>
  <div
    class="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50"
  >
    <div class="py-2 bg-white rounded-lg shadow-lg">
      <NuxtLink
        to="/courses/free-resources"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Бесплатные материалы
      </NuxtLink>
      <NuxtLink
        to="/courses/courses"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Курсы
      </NuxtLink>
      <NuxtLink
        to="/courses/guides"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Гайды
      </NuxtLink>
      <NuxtLink
        to="/courses/podcasts"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Подкасты
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
defineComponent({
  name: "DesktopSubmenu",
});
</script>
