<template>
  <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
    <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4A4238]">
      Анализ Эмоций
    </h2>

    <!-- Emotion Patterns -->
    <div class="space-y-4">
      <div
        v-for="(pattern, emotion) in patterns"
        :key="emotion"
        class="p-4 bg-gray-50 rounded-lg"
      >
        <h3 class="font-semibold text-[#4A4238]">{{ emotion }}</h3>
        <div class="mt-2 space-y-1 text-sm">
          <p>Частота: {{ pattern.count }} раз</p>
          <p>
            Средняя интенсивность:
            {{ pattern.avgIntensity.toFixed(1) }}/10
          </p>
          <div v-if="Object.keys(pattern.commonSpheres).length">
            <p class="font-medium">Чаще всего в сферах:</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="(count, sphere) in pattern.commonSpheres"
                :key="sphere"
                class="text-xs px-2 py-1 bg-white rounded"
              >
                {{ sphere }} ({{ count }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  patterns: {
    type: Object,
    required: true,
    validator(value) {
      return Object.values(value).every(
        (pattern) =>
          "count" in pattern &&
          "avgIntensity" in pattern &&
          "commonSpheres" in pattern
      );
    },
  },
});
</script>
