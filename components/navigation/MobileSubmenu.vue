<template>
  <ul
    class="bg-pink-300 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-48' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/courses/free-resources"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
      >
        Бесплатные материалы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/courses"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
      >
        Курсы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/guides"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
      >
        Гайды
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/podcasts"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
      >
        Подкасты
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineComponent({
  name: "MobileSubmenu",
});
</script>
