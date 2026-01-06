<template>
  <div
    class="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800/50 p-6 rounded-[2rem] transition-all duration-300 hover:border-mindqlab-calm-accent/30 group">
    <div class="flex items-center gap-4 mb-4">
      <div
        class="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center transition-colors">
        <i :class="[iconClass, 'text-mindqlab-calm-accent opacity-60']" class="text-base"></i>
      </div>
      <p class="text-stone-400 dark:text-stone-500 font-medium text-[10px] uppercase tracking-[0.2em]">{{ title }}</p>
    </div>
    <!-- Regular Value -->
    <p v-if="!isSocialMedia && value" class="text-stone-900 dark:text-white font-light text-base sm:text-lg">
      {{ value }}
    </p>
    <!-- Social Media Links -->
    <div v-else-if="isSocialMedia && Array.isArray(value) && value.length > 0" class="space-y-3">
      <div v-for="(platform, index) in value" :key="index" class="flex items-center gap-3">
        <i :class="[
          {
            'fab fa-telegram': platform.type === 'telegram',
            'fab fa-vk': platform.type === 'vk',
            'fab fa-instagram': platform.type === 'instagram',
            'fab fa-facebook': platform.type === 'facebook',
          },
          'text-mindqlab-calm-accent opacity-60 text-lg'
        ]"></i>
        <a :href="normalizeUrl(platform.type, platform.url)" target="_blank"
          class="text-stone-900 dark:text-white font-light text-sm sm:text-base hover:text-mindqlab-calm-accent transition-colors truncate max-w-full"
          :title="platform.url">
          {{ platform.url }}
        </a>
      </div>
    </div>
    <!-- Fallback -->
    <p v-else class="text-stone-300 dark:text-stone-600 text-sm italic font-light">Не указано</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Array], default: "" },
  iconClass: { type: String, required: true },
  isSocialMedia: { type: Boolean, default: false },
});

// Normalize URL for display and linking
const normalizeUrl = (type, url) => {
  if (!url) return "#";
  if (
    type === "telegram" &&
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    return `https://t.me/${url.replace("@", "")}`;
  }
  return url;
};
</script>
