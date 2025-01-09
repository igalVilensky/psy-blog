<template>
  <div class="submenu-container group-hover:opacity-100 group-hover:visible">
    <div class="submenu-content">
      <div v-for="(item, index) in menuItems" :key="index">
        <NuxtLink
          :to="item.path"
          exact-active-class="active-link"
          class="menu-item group"
        >
          <i :class="item.icon" class="icon-wrapper" />
          <span class="menu-text">{{ item.label }}</span>
          <div class="hover-indicator"></div>
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
    icon: "fas fa-thermometer-half",
    label: "Эмоциональный барометр",
    path: "/awareness-tools/emotional-barometer",
  },
  {
    icon: "fas fa-comments",
    label: "Глубокий разговор с картами",
    path: "/awareness-tools/deep-conversation-with-cards",
  },
  {
    icon: "fas fa-compass",
    label: "Открытие Архетипа Жизни",
    path: "/awareness-tools/life-purpose-archetype",
  },
];

defineComponent({
  name: "AwarenessToolsDesktopSubmenu",
});
</script>

<style scoped>
.submenu-container {
  @apply absolute left-0 mt-6 w-64 opacity-0 invisible 
         transition-all duration-300 ease-in-out z-50;
}

.submenu-content {
  @apply py-2 rounded-lg shadow-xl border border-indigo-500/20
         bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950
         backdrop-blur-sm;
  box-shadow: 0 4px 20px rgba(123, 97, 255, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.menu-item {
  @apply flex items-center px-4 py-2.5 text-sm text-slate-300
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
  @apply text-white bg-indigo-500/20 font-semibold pl-3;
  border-left: 2px solid theme("colors.indigo.400");
}

.active-link .icon-wrapper {
  @apply text-white;
}

/* Optional: Add a subtle animation for the submenu appearance */
.submenu-container {
  transform: translateY(-4px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
}

.group-hover\:opacity-100.group-hover\:visible {
  transform: translateY(0);
}
</style>
