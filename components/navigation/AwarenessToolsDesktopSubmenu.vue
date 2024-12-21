<template>
  <div
    class="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50"
  >
    <div class="py-2 bg-white rounded-lg shadow-lg">
      <NuxtLink
        to="/awareness-tools/emotional-barometer"
        exact-active-class="bg-pink-500 text-white"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Эмоциональный барометр
      </NuxtLink>
      <NuxtLink
        to="/awareness-tools/deep-conversation-with-cards"
        exact-active-class="bg-pink-500 text-white"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Глубокий разговор с картами
      </NuxtLink>
      <NuxtLink
        to="/awareness-tools/emotion-diary"
        exact-active-class="bg-pink-500 text-white"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-500 hover:text-white"
      >
        Дневник эмоций
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
  name: "AwerenessToolsDesktopSubmenu",
});
</script>
