<template>
  <ul
    class="bg-pink-300 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-48' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/courses/free-resources"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Бесплатные материалы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/courses"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Курсы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/guides"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Гайды
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/podcasts"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
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
  closeDropdown: {
    type: Function,
    required: true,
  },
});

defineComponent({
  name: "MobileSubmenu",
});
</script>
