<!-- components/space/psychology/LabSectionCard.vue -->
<template>
  <div
    class="lab-section-card group relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10"
    :class="[
      section.disabled
        ? 'opacity-75 cursor-not-allowed grayscale'
        : 'hover:border-cyan-500/50 cursor-pointer',
    ]" @click="!section.disabled && $emit('click')">

    <!-- Background Gradient Overlay -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 bg-gradient-to-br"
      :class="section.gradient"></div>

    <!-- Featured Badge -->
    <div v-if="section.featured"
      class="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest">
      <i class="fas fa-star mr-1.5"></i>
      Популярно
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon Wrapper -->
      <div
        class="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-lg"
        :class="section.featured
          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500/20 group-hover:text-white dark:group-hover:text-cyan-400 shadow-zinc-500/5'
          ">
        <i :class="section.icon" class="text-2xl"></i>
      </div>

      <!-- Title -->
      <h3 class="text-2xl font-black mb-3 transition-colors duration-300 uppercase tracking-tight" :class="section.featured
        ? 'text-zinc-900 dark:text-white'
        : 'text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
        ">
        {{ section.title }}
      </h3>

      <!-- Description -->
      <p
        class="text-zinc-600 dark:text-zinc-400 text-sm mb-8 leading-relaxed font-medium transition-colors duration-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-200">
        {{ section.description }}
      </p>

      <!-- CTA / Action Link -->
      <div class="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-6">
        <span class="text-[10px] font-black uppercase tracking-widest transition-colors duration-300" :class="section.featured
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-white'
          ">
          {{ section.disabled ? 'Скоро' : 'Исследовать' }}
        </span>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300" :class="section.featured
          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          : 'bg-zinc-50 dark:bg-zinc-800 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 group-hover:text-white'
          ">
          <i class="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
        </div>
      </div>
    </div>

    <!-- Edge Highlight Shine -->
    <div v-if="!section.disabled"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none">
    </div>

    <!-- Coming Soon Overlay -->
    <div v-if="section.disabled"
      class="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] flex items-center justify-center z-20">
      <div
        class="px-5 py-2.5 rounded-xl bg-zinc-900 shadow-2xl border border-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
        <i class="fas fa-lock text-cyan-500"></i>
        Доступ ограничен
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.lab-section-card {
  transform: translateY(0);
}

.lab-section-card:hover {
  transform: translateY(-4px);
}
</style>
