<!-- EnergyOfDay.vue -->
<template>
  <div
    class="bg-white/5 backdrop-blur rounded-xl p-4 shadow-xl border border-white/10"
  >
    <h3 class="text-lg font-semibold text-white mb-2">Энергия дня</h3>
    <div class="grid grid-cols-3 gap-2 mb-3">
      <button
        @click="selectEnergyColumn('right')"
        class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
        :class="
          energyOfDay === 'right'
            ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
            : 'bg-black/20 text-white/70 border border-white/10 hover:bg-white/10'
        "
      >
        <i class="fas fa-fire mr-1"></i> Огонь
      </button>
      <button
        @click="selectEnergyColumn('left')"
        class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
        :class="
          energyOfDay === 'left'
            ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
            : 'bg-black/20 text-white/70 border border-white/10 hover:bg-white/10'
        "
      >
        <i class="fas fa-water mr-1"></i> Вода
      </button>
      <button
        @click="selectEnergyColumn('center')"
        class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
        :class="
          energyOfDay === 'center'
            ? 'bg-green-500/30 text-green-200 border border-green-400/50'
            : 'bg-black/20 text-white/70 border border-white/10 hover:bg-white/10'
        "
      >
        <i class="fas fa-wind mr-1"></i> Воздух
      </button>
    </div>
    <p class="text-xs text-white/80">
      {{ energyRecommendation }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  energyOfDay: {
    type: String,
    default: null,
  },
  energyRecommendation: {
    type: String,
    required: true,
    default: "Выберите энергию дня для рекомендаций",
  },
  selectEnergyColumn: {
    type: Function,
    required: true,
  },
});
</script>
