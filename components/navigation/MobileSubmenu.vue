<template>
  <ul
    class="bg-[#2C3E50] border-t border-[#34495E] overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-48' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/courses/free-resources"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Бесплатные материалы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/courses"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Курсы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/guides"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Гайды
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/podcasts"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
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
