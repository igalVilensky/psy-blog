<template>
  <div
    class="absolute left-0 mt-[1.2rem] w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50"
  >
    <div
      class="py-2 bg-gradient-to-t from-[#1A1F35] to-[#1E293B] rounded-b-lg shadow-lg"
    >
      <NuxtLink
        to="/awareness-tools/emotional-barometer"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Эмоциональный барометр
      </NuxtLink>
      <NuxtLink
        to="/awareness-tools/deep-conversation-with-cards"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Глубокий разговор с картами
      </NuxtLink>
      <NuxtLink
        to="/awareness-tools/emotion-diary"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Дневник эмоций
      </NuxtLink>
      <NuxtLink
        to="/awareness-tools/life-purpose-archetype"
        exact-active-class="bg-[#3498DB] text-white"
        class="block px-4 py-2 text-sm text-[#ECF0F1] hover:bg-[#3498DB] hover:text-white rounded-md transition-all duration-300 ease-in-out"
      >
        Открытие Архетипа Жизни
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
  name: "AwarenessToolsDesktopSubmenu",
});
</script>
