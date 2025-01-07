<template>
  <ul
    class="bg-gradient-to-b from-[#1E1B4B] to-[#0F172A] border-t border-white/10 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-96' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/awareness-tools"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Инструменты осознанности
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/emotional-barometer"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Эмоциональный барометр
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/deep-conversation-with-cards"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Глубокий разговор с картами
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/emotion-diary"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Дневник эмоций
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/life-purpose-archetype"
        active-class="active-link"
        class="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
        @click="closeDropdown"
      >
        Открытие Архетипа Жизни
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
  name: "AwarenessToolsMobileSubmenu",
});
</script>

<style scoped>
.active-link {
  color: white; /* Active link text color */
  background-color: rgba(99, 102, 241, 0.1); /* Active link background color */
  font-weight: bold; /* Optional: Make the active link bold */
}
</style>
