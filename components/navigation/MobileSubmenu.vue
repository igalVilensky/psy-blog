<template>
  <div class="submenu-container">
    <ul
      class="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-t border-indigo-500/20 overflow-y-auto transition-all duration-500 ease-in-out rounded-b-lg shadow-2xl"
      :class="[isOpen ? 'max-h-[400px]' : 'max-h-0']"
    >
      <li v-for="(item, index) in menuItems" :key="index">
        <NuxtLink
          :to="item.path"
          active-class="active-link"
          class="submenu-item group"
          @click="closeDropdown"
        >
          <i :class="item.icon" class="icon-wrapper" />
          <span class="menu-text">{{ item.label }}</span>
          <div class="hover-indicator"></div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Props definition
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  closeDropdown: {
    type: Function,
    required: true,
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
</script>

<style scoped>
.submenu-container {
  @apply relative z-50;
}

.submenu-item {
  @apply flex items-center px-4 py-3 text-sm text-slate-300
         relative overflow-hidden transition-all duration-300
         hover:text-white hover:bg-white/5;
}

.icon-wrapper {
  @apply flex-shrink-0 w-5 h-5 mr-3 
         flex items-center justify-center
         text-indigo-400 group-hover:text-indigo-300
         transition-transform group-hover:scale-110;
  line-height: 1;
}

.menu-text {
  @apply font-medium tracking-wide transition-all duration-300
         group-hover:translate-x-1 flex items-center;
  line-height: 1;
}

.hover-indicator {
  @apply absolute left-0 h-full w-1 bg-indigo-500 transform -translate-x-full
         transition-transform duration-300 group-hover:translate-x-0;
}

.active-link {
  @apply text-white bg-indigo-500/10 font-semibold;
}

.active-link .hover-indicator {
  @apply translate-x-0 bg-indigo-400;
}

.active-link .icon-wrapper {
  @apply text-white;
}

/* Fix for unwanted lines */
ul {
  @apply border-none; /* Remove border from the ul element */
}

li {
  @apply border-b border-indigo-500/20 last:border-b-0; /* Add border to each li except the last one */
}
</style>
