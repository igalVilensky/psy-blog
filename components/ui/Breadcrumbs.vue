<template>
  <nav aria-label="Breadcrumb" class="flex items-center text-sm font-medium mb-8">
    <ol class="flex items-center space-x-2">
      <li>
        <NuxtLink to="/space"
          class="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors flex items-center">
          <i class="fas fa-flask mr-1"></i>
          <span class="hidden sm:inline">Lab</span>
        </NuxtLink>
      </li>

      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
        <i class="fas fa-chevron-right text-slate-300 dark:text-slate-600 mx-2 text-xs"></i>
        <NuxtLink v-if="crumb.to && index < crumbs.length - 1" :to="crumb.to"
          class="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors">
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-slate-900 dark:text-white font-semibold">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();

const crumbs = computed(() => {
  if (props.items.length > 0) {
    return props.items;
  }

  // Auto-generate based on route if no items provided
  // This is a simple implementation and might need customization based on route structure
  const pathSegments = route.path.split('/').filter(Boolean);

  // Remove 'space' or 'lab' from the start to avoid duplication with the root link
  const relevantSegments = pathSegments.filter(segment => segment !== 'space' && segment !== 'lab');

  return relevantSegments.map((segment, index) => {
    const path = '/space/' + relevantSegments.slice(0, index + 1).join('/');

    // Basic label formatting (capitalize, remove hyphens)
    // You might want a mapping object for specific route names
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    // Custom mappings
    const mappings = {
      'psychology': 'Psychology',
      'tests': 'Tests',
      'games': 'Games',
      'mindfulness': 'Meditation',

      'dashboard': 'Control Center',
      'growth': 'Self-Development',
      // 'analysis': 'Observatory', // Removed as page is deleted
      'community': 'Community',
      'trail-making': 'Trail Making Test',
      'ego-states': 'Ego States',
      'cognitive-illusions': 'Cognitive Illusions',
      'emotion-lab': 'Emotion Lab',
      'social': 'Social Psychology',
      'personality': 'Personality',
      'stroop': 'Stroop Test',
      'reaction': 'Reaction',

      'deep-conversation': 'Deep Conversation',
      'habit-override': 'Habit Rewiring',
      'habit-mood-journal': 'State Journal',
      'blog': 'Blog',
      'emotional-compass': 'Emotional Compass',
      'journal-history': 'Journal History',
      'analysis': 'Analysis',
    };

    if (mappings[segment]) {
      label = mappings[segment];
    }

    return {
      label,
      to: path
    };
  });
});
</script>
