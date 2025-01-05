<template>
  <ul
    class="bg-[#2C3E50] border-t border-[#34495E] overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-80' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/awareness-tools"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Инструменты осознанности
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/emotional-barometer"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Эмоциональный барометр
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/deep-conversation-with-cards"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Глубокий разговор с картами
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/emotion-diary"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
        @click="closeDropdown"
      >
        Дневник эмоций
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/life-purpose-archetype"
        exact-active-class="bg-[#3498DB]"
        class="block px-12 py-2 text-[#ECF0F1] text-sm transition-colors duration-300 ease-in-out hover:bg-[#2980B9] hover:text-white"
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
  name: "AwerenessToolsMobileSubmenu",
});
</script>
