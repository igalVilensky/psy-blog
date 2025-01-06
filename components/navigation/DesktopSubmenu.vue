<template>
  <div
    class="absolute left-0 mt-[1.2rem] w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50"
  >
    <div
      class="py-2 bg-gradient-to-t from-[#1A1F35] to-[#1E293B] rounded-b-lg shadow-lg"
    >
      <NuxtLink
        to="/courses/free-resources"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Бесплатные материалы
      </NuxtLink>
      <NuxtLink
        to="/courses/courses"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Курсы
      </NuxtLink>
      <NuxtLink
        to="/courses/guides"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Гайды
      </NuxtLink>
      <NuxtLink
        to="/courses/podcasts"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
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
