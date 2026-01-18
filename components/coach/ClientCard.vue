<template>
  <div
    class="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 hover:border-indigo-500/30 transition-all cursor-pointer group hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
    @click="$emit('click')">
    <div
      class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-indigo-500/10 transition-colors">
    </div>

    <div class="flex items-center gap-4 mb-6 relative z-10">
      <div
        class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform">
        <img v-if="client.avatarUrl" :src="client.avatarUrl" class="w-full h-full object-cover">
        <i v-else class="fas fa-user text-slate-300 text-xl"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-black text-slate-900 dark:text-white truncate tracking-tight">{{ clientName }}</h3>
        <p class="text-[10px] text-slate-400 truncate uppercase font-black tracking-widest">{{ client.email }}</p>
      </div>
      <div class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest" :class="statusClasses">
        {{ statusLabels[client.status] || client.status }}
      </div>
    </div>

    <div class="space-y-3 relative z-10">
      <div class="flex justify-between items-end">
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Прогресс обучения</span>
        <span class="text-sm font-black text-indigo-600 dark:text-indigo-400">{{ client.progress || 0 }}%</span>
      </div>
      <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out"
          :style="`width: ${client.progress || 0}%`"></div>
      </div>
    </div>

    <div
      class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center relative z-10">
      <div class="flex items-center gap-2">
        <i class="far fa-clock text-slate-300 text-[10px]"></i>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Активность:</span>
      </div>
      <span class="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{{ lastActive
        }}</span>
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
