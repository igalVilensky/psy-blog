<template>
  <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/30 hover:border-cyan-500/30 transition-all cursor-pointer group"
       @click="$emit('click')">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-cyan-500/50 transition-all">
        <img v-if="client.avatarUrl" :src="client.avatarUrl" class="w-full h-full object-cover">
        <i v-else class="fas fa-user text-slate-400"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-slate-900 dark:text-white truncate">{{ client.displayName || 'Без имени' }}</h3>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono uppercase">{{ client.email }}</p>
      </div>
      <div class="status-badge px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tight"
           :class="statusClasses">
        {{ statusLabels[client.status] || client.status }}
      </div>
    </div>
    
    <div class="space-y-2">
      <div class="flex justify-between text-[9px] font-mono uppercase text-slate-500">
        <span>Прогресс курса</span>
        <span>{{ client.progress || 0 }}%</span>
      </div>
      <div class="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div class="h-full bg-cyan-500 transition-all duration-500" :style="`width: ${client.progress || 0}%`"></div>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[9px] font-mono text-slate-500">
      <span class="uppercase">Активность:</span>
      <span class="text-slate-700 dark:text-slate-300">{{ lastActive }}</span>
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

const statusLabels = {
  active: 'Активен',
  inactive: 'Неактивен',
  'at-risk': 'В зоне риска',
};

const statusClasses = computed(() => {
  switch (props.client.status) {
    case 'active': return 'bg-emerald-500/10 text-emerald-500';
    case 'inactive': return 'bg-slate-500/10 text-slate-500';
    case 'at-risk': return 'bg-amber-500/10 text-amber-500';
    default: return 'bg-slate-500/10 text-slate-500';
  }
});

const lastActive = computed(() => {
  if (!props.client.lastActive) return 'НИКОГДА';
  const date = props.client.lastActive.toDate ? props.client.lastActive.toDate() : new Date(props.client.lastActive);
  return date.toLocaleDateString('ru-RU');
});
</script>
