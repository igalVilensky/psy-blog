<template>
  <div
    class="bg-gray-100 dark:bg-[#1A1F35]/40 p-4 sm:p-6 rounded-2xl border border-gray-300 dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-[#0EA5E9]/30 transition-colors group">
    <div class="flex items-center gap-3 sm:gap-4 mb-3">
      <div
        class="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 dark:bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-200 dark:group-hover:bg-[#0EA5E9]/30 transition-colors">
        <i :class="iconClass" class="text-cyan-600 dark:text-[#0EA5E9] text-sm sm:text-base"></i>
      </div>
      <p class="text-gray-600 dark:text-slate-400 font-medium text-sm sm:text-base">{{ title }}</p>
    </div>
    <!-- Regular Value -->
    <p v-if="!isSocialMedia && value" class="text-gray-900 dark:text-white/90 text-base sm:text-lg">
      {{ value }}
    </p>
    <!-- Social Media Links -->
    <div v-else-if="isSocialMedia && Array.isArray(value) && value.length > 0" class="space-y-2">
      <div v-for="(platform, index) in value" :key="index" class="flex items-center gap-2">
        <i :class="{
          'fab fa-telegram': platform.type === 'telegram',
          'fab fa-vk': platform.type === 'vk',
          'fab fa-instagram': platform.type === 'instagram',
          'fab fa-facebook': platform.type === 'facebook',
        }" class="text-cyan-600 dark:text-[#0EA5E9] text-lg"></i>
        <a :href="normalizeUrl(platform.type, platform.url)" target="_blank"
          class="text-gray-900 dark:text-white/90 text-base sm:text-lg hover:underline truncate max-w-[200px] sm:max-w-[300px]"
          :title="platform.url">
          {{ platform.url }}
        </a>
      </div>
    </div>
    <!-- Fallback -->
    <p v-else class="text-gray-500 dark:text-slate-400 text-sm">Не указано</p>
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
