<!-- SefirotProgressCard.vue -->
<template>
  <div
    class="bg-white/5 backdrop-blur rounded-xl shadow-md p-5 border border-white/10 transition-all hover:shadow-xl"
    :class="{ 'ring-2 ring-offset-2 ring-offset-background': isActive }"
    :style="{ '--ring-color': ringColor }"
    @click="setActiveCard(sefirah.id)"
  >
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-lg md:text-xl font-semibold text-white">
        {{ sefirah.psychName }}
        <span class="text-sm text-gray-300">({{ sefirah.name }})</span>
      </h3>
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
        :class="progressClass"
      >
        {{ sefirah.displayProgress }}%
      </div>
    </div>

    <div class="flex items-center mb-2">
      <span
        class="px-2 py-0.5 rounded-full text-xs font-medium"
        :class="levelBadgeClass"
      >
        Уровень {{ sefirah.level }}
      </span>
      <span class="text-xs text-gray-400 ml-2">
        {{ sefirah.points }} очков
      </span>
    </div>

    <p class="text-gray-300 text-sm mb-2">{{ sefirah.function }}</p>
    <p class="text-gray-400 text-sm mb-4">{{ sefirah.description }}</p>

    <div class="mb-4">
      <div class="flex justify-between text-xs text-gray-400 mb-1">
        <span>Ежедневный прогресс</span>
        <span
          >{{ sefirah.dailyActions }}/{{ sefirah.maxActions }} действий
          сегодня</span
        >
      </div>
      <div class="w-full bg-gray-800/50 rounded-full h-1.5 mb-1">
        <div
          class="h-1.5 rounded-full"
          :class="progressBarClass"
          :style="{ width: `${sefirah.displayProgress}%` }"
        ></div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="(feature, idx) in sefirah.features"
        :key="`feature-${sefirah.id}-${idx}`"
        class="inline-block text-xs py-1 px-2 rounded-full bg-white/10 text-gray-300"
      >
        {{ feature }}
      </span>
    </div>

    <nuxt-link
      v-if="sefirah.cta"
      :to="sefirah.cta.link"
      class="inline-flex items-center text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-all text-white"
      @click="logAction(sefirah.id)"
    >
      <i class="fas fa-arrow-right mr-2"></i>
      {{ sefirah.cta.text }}
    </nuxt-link>
    <p v-else class="text-xs text-gray-500">
      <i class="fas fa-clock mr-1"></i> Скоро появятся новые способы роста!
    </p>
  </div>
</template>

<script setup>
defineProps({
  sefirah: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  ringColor: {
    type: String,
    required: true,
  },
  progressClass: {
    type: String,
    required: true,
  },
  levelBadgeClass: {
    type: String,
    required: true,
  },
  progressBarClass: {
    type: String,
    required: true,
  },
  setActiveCard: {
    type: Function,
    required: true,
  },
  logAction: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
[class*="ring-"] {
  --tw-ring-color: rgb(var(--ring-color));
}
</style>
