<template>
  <div
    class="absolute left-0 mt-6 w-64 opacity-0 invisible transition-all duration-300 ease-in-out z-50 group-hover:opacity-100 group-hover:visible"
  >
    <div
      class="py-2 rounded-lg shadow-xl border border-white/10 bg-gradient-to-b from-[#1A1F35] to-[#1E293B] backdrop-blur-sm"
      style="
        box-shadow: 0 4px 20px rgba(123, 97, 255, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.1);
      "
    >
      <div v-for="(item, index) in menuItems" :key="index">
        <NuxtLink
          :to="item.path"
          exact-active-class="active-link"
          class="flex items-center px-4 py-2.5 text-sm text-slate-300 relative overflow-hidden transition-all duration-300 hover:text-white hover:bg-white/5 group"
        >
          <i
            :class="item.icon"
            class="flex-shrink-0 relative top-1 w-5 h-5 mr-3 text-[#0EA5E9] group-hover:text-[#22D3EE] transition-transform group-hover:scale-110"
          />
          <span
            class="font-medium tracking-wide transition-all duration-300 group-hover:translate-x-1 flex items-center"
          >
            {{ item.label }}
          </span>
          <div
            class="absolute left-0 h-full w-1 bg-gradient-to-b from-[#0EA5E9] to-[#E879F9] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
          ></div>
        </NuxtLink>
      </div>
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

const menuItems = [
  {
    icon: "fas fa-gift",
    label: "Бесплатные материалы",
    path: "/courses/free-resources",
  },
  {
    icon: "fas fa-book-open",
    label: "Курсы",
    path: "/courses/courses",
  },
  {
    icon: "fas fa-file-alt",
    label: "Гайды",
    path: "/courses/guides",
  },
  {
    icon: "fas fa-headphones",
    label: "Подкасты",
    path: "/courses/podcasts",
  },
];

defineComponent({
  name: "DesktopSubmenu",
});
</script>

<style scoped>
.active-link {
  @apply text-white bg-[#0EA5E9]/10 font-semibold pl-3;
  border-left: 2px solid theme("colors.indigo.400");
}

.active-link .icon-wrapper {
  @apply text-white;
}
</style>
