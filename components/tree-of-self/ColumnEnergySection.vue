<template>
  <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Column Balance Gauge -->
    <ColumnBalanceGauge
      :column-progress="columnProgress"
      :column-recommendation="columnRecommendation"
    />

    <!-- Energy of the Day -->
    <EnergyOfDay
      :energy-of-day="energyOfDay"
      :energy-recommendation="energyRecommendation"
      :select-energy-column="selectEnergyColumn"
    />
  </div>
</template>

<script setup>
import ColumnBalanceGauge from "~/components/tree-of-self/ColumnBalanceGauge.vue";
import EnergyOfDay from "~/components/tree-of-self/EnergyOfDay.vue";
import { defineProps } from "vue";

// Define props for data and methods
defineProps({
  columnProgress: {
    type: Object,
    required: true,
  },
  columnRecommendation: {
    type: String,
    required: true,
  },
  energyOfDay: {
    type: String,
    default: null,
  },
  energyRecommendation: {
    type: String,
    required: true,
  },
  selectEnergyColumn: {
    type: Function,
    required: true,
  },
});
</script>
