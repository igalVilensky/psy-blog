<!-- components/LabSectionCard.vue -->
<template>
  <div
    class="lab-section-card group relative p-6 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm dark:shadow-none"
    @click="$emit('click')"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-100 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${section.gradient}`"
    ></div>

    <!-- Featured Badge -->
    <div
      v-if="section.featured"
      class="absolute top-4 right-4 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-medium"
    >
      <i class="fas fa-star mr-1"></i>
      Популярно
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon -->
      <div
        class="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
        :class="
          section.featured
            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
            : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-500/20 group-hover:text-white dark:group-hover:text-cyan-400'
        "
      >
        <i :class="section.icon" class="text-2xl"></i>
      </div>

      <!-- Title -->
      <h3
        class="text-xl font-bold mb-3 transition-colors duration-300"
        :class="
          section.featured
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-slate-900 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white'
        "
      >
        {{ section.title }}
      </h3>

      <!-- Description -->
      <p
        class="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200"
      >
        {{ section.description }}
      </p>

      <!-- CTA -->
      <div class="flex items-center justify-between">
        <span
          class="text-xs font-medium transition-colors duration-300"
          :class="
            section.featured
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-white'
          "
        >
          Исследовать →
        </span>
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          :class="
            section.featured
              ? 'bg-amber-500/20'
              : 'bg-slate-100 dark:bg-slate-700/50 group-hover:bg-cyan-500/20 dark:group-hover:bg-white/20'
          "
        >
          <i
            class="fas fa-arrow-right text-xs transition-colors duration-300"
            :class="
              section.featured
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-400 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-white'
            "
          ></i>
        </div>
      </div>
    </div>

    <!-- Shine Effect -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"
    ></div>
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
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.lab-section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -10px rgba(6, 182, 212, 0.15),
    0 4px 6px -2px rgba(6, 182, 212, 0.05);
}
</style>
