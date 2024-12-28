<template>
  <ul
    class="bg-pink-300 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-80' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/awareness-tools"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Инструменты осознанности
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/emotional-barometer"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Эмоциональный барометр
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/deep-conversation-with-cards"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Глубокий разговор с картами
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/emotion-diary"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
        @click="closeDropdown"
      >
        Дневник эмоций
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/life-purpose-archetype"
        exact-active-class="bg-pink-500"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
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
