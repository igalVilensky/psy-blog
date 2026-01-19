<template>
  <div
    class="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer overflow-hidden"
    @click="$emit('click')">

    <!-- Colored status bar on top -->
    <div class="h-1" :class="getStatusBarColor()"></div>

    <div class="p-5">
      <!-- Compact header -->
      <div class="flex items-center gap-3 mb-4">
        <div
          class="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden shrink-0">
          <img v-if="client.avatarUrl" :src="client.avatarUrl" class="w-full h-full object-cover">
          <i v-else class="fas fa-user text-stone-400 dark:text-stone-600"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-stone-900 dark:text-white truncate">{{ clientName }}</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 truncate">{{ client.email }}</p>
        </div>
      </div>

      <!-- Data grid -->
      <div class="grid grid-cols-2 gap-3 py-3 border-t border-stone-100 dark:border-stone-800">
        <div>
          <div class="text-xs text-stone-500 dark:text-stone-400 mb-1">Прогресс</div>
          <div class="text-lg font-bold text-stone-900 dark:text-white tabular-nums">{{ client.progress || 0 }}%</div>
        </div>
        <div>
          <div class="text-xs text-stone-500 dark:text-stone-400 mb-1">Статус</div>
          <div class="text-xs font-semibold" :class="getStatusTextColor()">{{ statusLabels[client.status] ||
            client.status }}</div>
        </div>
      </div>

      <!-- Minimal progress bar -->
      <div class="mt-3">
        <div class="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div class="h-full bg-stone-900 dark:bg-white transition-all duration-700"
            :style="`width: ${client.progress || 0}%`"></div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-xs text-stone-500 dark:text-stone-400">
        <span>Последняя активность</span>
        <span class="font-medium text-stone-700 dark:text-stone-300">{{ lastActive }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  client: {
    type: Object,
    required: true
  }
});

const clientName = computed(() => props.client.displayName || 'Без имени');

const statusLabels = {
  active: 'Активен',
  inactive: 'Неактивен',
  'at-risk': 'В зоне риска',
};

const getStatusBarColor = () => {
  switch (props.client.status) {
    case 'active': return 'bg-emerald-500';
    case 'inactive': return 'bg-stone-300 dark:bg-stone-700';
    case 'at-risk': return 'bg-amber-500';
    default: return 'bg-stone-300 dark:bg-stone-700';
  }
};

const getStatusTextColor = () => {
  switch (props.client.status) {
    case 'active': return 'text-emerald-600 dark:text-emerald-400';
    case 'inactive': return 'text-stone-500 dark:text-stone-400';
    case 'at-risk': return 'text-amber-600 dark:text-amber-400';
    default: return 'text-stone-500 dark:text-stone-400';
  }
};

const lastActive = computed(() => {
  if (!props.client.lastActive) return 'Никогда';
  const date = props.client.lastActive.toDate ? props.client.lastActive.toDate() : new Date(props.client.lastActive);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
});
</script>
