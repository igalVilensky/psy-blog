<template>
  <div
    class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between h-full border-l-4 group transition-all hover:shadow-md"
    :class="borderClass">
    <div class="flex items-center justify-between mb-2">
      <span class="text-stone-400 dark:text-stone-500 font-bold text-[10px] uppercase tracking-[0.2em]">{{ title
      }}</span>
      <i :class="[iconClass, 'text-stone-300 dark:text-stone-700']" class="text-sm"></i>
    </div>
    <!-- Regular Value -->
    <p v-if="!isSocialMedia && value" class="text-stone-900 dark:text-white font-bold text-xl sm:text-2xl mt-auto">
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
          'text-stone-300 dark:text-stone-600 text-lg group-hover:text-stone-500 dark:group-hover:text-stone-400 transition-colors'
        ]"></i>
        <a :href="normalizeUrl(platform.type, platform.url)" target="_blank"
          class="text-stone-900 dark:text-white font-bold text-sm hover:text-stone-600 dark:hover:text-stone-300 transition-colors truncate max-w-full"
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
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Array], default: "" },
  iconClass: { type: String, required: true },
  isSocialMedia: { type: Boolean, default: false },
  accentColor: { type: String, default: 'stone' } // blue, purple, amber, emerald, stone
});

const borderClass = computed(() => {
  switch (props.accentColor) {
    case 'blue': return 'border-l-blue-500 dark:border-l-blue-500';
    case 'purple': return 'border-l-purple-500 dark:border-l-purple-500';
    case 'amber': return 'border-l-amber-500 dark:border-l-amber-500';
    case 'emerald': return 'border-l-emerald-500 dark:border-l-emerald-500';
    case 'stone':
    default:
      return 'border-l-stone-300 dark:border-l-stone-700';
  }
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
