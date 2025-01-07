<template>
  <ul
    class="bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] border-t border-white/10 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-96' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/courses/free-resources"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Бесплатные материалы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/courses"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Курсы
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/guides"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Гайды
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/courses/podcasts"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
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

<style scoped>
.active-link {
  color: white; /* Active link text color */
  background-color: rgba(99, 102, 241, 0.1); /* Active link background color */
  font-weight: bold; /* Optional: Make the active link bold */
}
</style>
