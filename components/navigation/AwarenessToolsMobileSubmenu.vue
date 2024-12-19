<template>
  <ul
    class="bg-pink-300 overflow-hidden transition-all duration-500 ease-in-out"
    :class="[isOpen ? 'max-h-48' : 'max-h-0']"
  >
    <li>
      <NuxtLink
        to="/awareness-tools/emotional-barometer"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
      >
        Эмоциональный барометр
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/awareness-tools/deep-conversation-with-cards"
        class="block px-12 py-2 text-white text-sm transition-colors duration-300 ease-in-out hover:bg-pink-600"
      >
        Глубокий разговор с картами
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
});

defineComponent({
  name: "AwerenessToolsMobileSubmenu",
});
</script>
