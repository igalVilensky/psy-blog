<template>
  <div
    class="absolute left-0 mt-[1.5rem] w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50"
  >
    <div
      class="py-2 bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] rounded-b-lg shadow-[0_4px_20px_rgba(123,97,255,0.2)] backdrop-blur-sm border border-white/10"
    >
      <NuxtLink
        to="/courses/free-resources"
        exact-active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
      >
        Бесплатные материалы
      </NuxtLink>
      <NuxtLink
        to="/courses/courses"
        exact-active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
      >
        Курсы
      </NuxtLink>
      <NuxtLink
        to="/courses/guides"
        exact-active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
      >
        Гайды
      </NuxtLink>
      <NuxtLink
        to="/courses/podcasts"
        exact-active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
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

<style scoped>
.active-link {
  color: white;
  background-color: rgba(99, 102, 241, 0.2); /* Slightly darker background */
  border-left: 4px solid #6366f1; /* Add a left border for emphasis */
  font-weight: bold;
}
</style>
