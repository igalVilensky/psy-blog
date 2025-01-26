<template>
  <div class="relative z-50">
    <ul
      class="bg-gradient-to-b from-[#1A1F35] to-[#1E293B] overflow-y-auto overflow-hidden transition-all duration-500 ease-in-out rounded-b-lg shadow-2xl border border-white/10"
      :class="[isOpen ? 'max-h-[400px]' : 'max-h-0']"
    >
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        class="border-b border-white/10 last:border-b-0"
      >
        <NuxtLink
          :to="item.path"
          active-class="active-link"
          class="flex items-center px-4 py-3 text-sm text-slate-300 relative overflow-hidden transition-all duration-300 hover:text-white hover:bg-white/5 group"
          @click="closeDropdown"
        >
          <i
            :class="item.icon"
            class="flex-shrink-0 w-5 h-5 mr-3 flex items-center justify-center text-[#0EA5E9] group-hover:text-[#22D3EE] transition-transform group-hover:scale-110"
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
    icon: "fas fa-brain",
    label: "Инструменты осознанности",
    path: "/awareness-tools",
  },
  {
    icon: "fas fa-thermometer-half",
    label: "Эмоциональный барометр",
    path: "/awareness-tools/emotional-barometer",
  },
  // {
  //   icon: "fas fa-comments",
  //   label: "Глубокий разговор с картами",
  //   path: "/awareness-tools/deep-conversation-with-cards",
  // },
  {
    icon: "fas fa-compass",
    label: "Открытие Архетипа Жизни",
    path: "/awareness-tools/life-purpose-archetype",
  },
];

defineComponent({
  name: "AwarenessToolsMobileSubmenu",
});
</script>

<style scoped>
.active-link {
  @apply text-white bg-[#0EA5E9]/10 font-semibold;
}

.active-link .icon-wrapper {
  @apply text-white;
}
</style>
