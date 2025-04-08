<template>
  <div
    class="sphere bg-gradient-to-b from-[#1A1F35]/90 to-[#1E293B]/95 backdrop-blur-xl rounded-2xl border border-white/20 p-6 transition-all transform duration-300 relative overflow-hidden"
    :class="{ 'is-hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Enhanced Decorative Elements -->
    <div
      class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-500"
      :style="{ backgroundColor: gradientStart }"
      :class="{ 'opacity-60 scale-125': isHovered }"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl opacity-10 transition-all duration-500"
      :style="{ backgroundColor: gradientEnd }"
      :class="{ 'opacity-40 scale-125': isHovered }"
    ></div>

    <!-- Interactive Glow Path -->
    <svg
      class="absolute inset-0 w-full h-full z-0 pointer-events-none"
      :class="{ 'path-active': isHovered }"
    >
      <path
        d="M20,20 Q60,10 100,50 T180,90 Q240,120 280,100 T340,80"
        class="glow-path"
        stroke-width="3"
        fill="none"
        :stroke="gradientStart"
        stroke-dasharray="5,5"
        stroke-linecap="round"
        :class="{ 'path-animate': isHovered }"
      />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>

    <!-- Content Highlight Overlay -->
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0"
      :class="{ 'opacity-100': isHovered }"
      :style="{
        background: `radial-gradient(circle at 50% 50%, ${gradientStart}10, transparent 70%)`,
      }"
    ></div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-4 relative z-10">
      <h3
        class="text-xl gap-4 md:text-2xl font-bold text-white/95 flex items-center transition-transform duration-300"
        :class="{ 'translate-x-1': isHovered }"
      >
        <i
          :class="[
            iconClass,
            'text-3xl opacity-70 transition-all duration-300',
            { 'scale-110': isHovered },
          ]"
          :style="{ color: iconColor }"
        ></i>
        {{ title }}
      </h3>
    </div>

    <!-- Description -->
    <p
      class="text-sm md:text-base mb-6 max-w-md relative z-10 transition-all duration-300"
      :class="isHovered ? 'text-white/90' : 'text-white/70'"
    >
      {{ description }}
    </p>

    <!-- Content -->
    <div v-if="loading" class="flex justify-center items-center h-48">
      <div class="relative">
        <i
          :class="['fas fa-spinner fa-spin text-2xl']"
          :style="{ color: iconColor }"
        ></i>
      </div>
    </div>
    <div v-else-if="hasData" class="space-y-4 relative z-10">
      <slot name="data-content">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(value, key, index) in formattedData"
            :key="key"
            class="flex flex-col bg-white/5 rounded-lg p-3 border border-white/10 transition-all duration-300"
            :class="{
              'border-white/30 bg-white/10 transform translate-y-[-2px]':
                isHovered && hoveredItem === index,
            }"
            @mouseenter="hoveredItem = index"
            @mouseleave="hoveredItem = null"
          >
            <span
              class="text-white/50 text-xs mb-1 uppercase tracking-wider transition-colors duration-300"
              :class="{ 'text-white/70': isHovered && hoveredItem === index }"
              >{{ key }}</span
            >
            <span
              class="text-white/90 font-medium text-lg transition-all duration-300"
              :class="{ 'text-white': isHovered && hoveredItem === index }"
              :style="
                isHovered && hoveredItem === index ? { color: gradientEnd } : {}
              "
              >{{ value }}</span
            >
          </div>
        </div>
      </slot>

      <!-- Progress bar with dynamic label -->
      <div class="mt-6 space-y-2">
        <div class="flex justify-between items-center">
          <span
            class="text-sm transition-colors duration-300"
            :class="isHovered ? 'text-white/90' : 'text-white/70'"
            >{{ progressLabel }}</span
          >
          <span
            class="text-sm font-medium transition-all duration-500"
            :style="{ color: isHovered ? gradientEnd : gradientStart }"
            >{{ progress }}%</span
          >
        </div>
        <div
          class="sphere-progress h-2 bg-white/10 rounded-full overflow-hidden"
        >
          <div
            class="h-full transition-all duration-700"
            :style="{
              background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
              width: `${progress}%`,
              boxShadow: isHovered ? `0 0 10px ${gradientStart}` : 'none',
            }"
          ></div>
        </div>
      </div>

      <!-- Button -->
      <Button
        :to="buttonTo"
        :text="buttonText"
        :icon-class="buttonIcon"
        :gradient-start="gradientStart"
        :gradient-end="gradientEnd"
        text-color="white"
        custom-class="mt-6 w-full text-sm md:text-base font-medium transition-transform duration-300"
        :class="{ 'transform translate-y-[-2px]': isHovered }"
      />
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-48 space-y-4 relative z-10"
    >
      <slot name="no-data">
        <div
          class="p-4 rounded-full bg-white/5 transition-all duration-300"
          :class="{ 'bg-white/10': isHovered }"
        >
          <i
            :class="[
              iconClass,
              'text-3xl opacity-70 transition-all duration-300',
              { 'scale-110': isHovered },
            ]"
            :style="{ color: iconColor }"
          ></i>
        </div>
        <p
          class="text-center transition-colors duration-300"
          :class="isHovered ? 'text-white/90' : 'text-white/70'"
        >
          Нет данных психологического профиля
        </p>
        <NuxtLink
          :to="buttonTo"
          class="px-4 py-2 text-sm rounded-full transition-all hover:bg-white/10"
          :style="{ color: isHovered ? gradientEnd : gradientStart }"
        >
          <i :class="[buttonIcon, 'mr-2']"></i>
          {{ buttonText }}
        </NuxtLink>
      </slot>
    </div>

    <!-- Pulse effect dots that appear on hover -->
    <div v-if="isHovered" class="absolute inset-0 pointer-events-none">
      <div
        v-for="i in 3"
        :key="i"
        class="absolute w-2 h-2 rounded-full"
        :class="`pulse-dot pulse-dot-${i}`"
        :style="{
          backgroundColor: i % 2 === 0 ? gradientStart : gradientEnd,
          left: `${30 + i * 20}%`,
          top: `${20 + i * 15}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Button from "~/components/base/Button.vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  iconClass: { type: String, required: true },
  description: { type: String, required: true },
  gradientStart: { type: String, required: true },
  gradientEnd: { type: String, required: true },
  iconColor: { type: String, required: true },
  loading: { type: Boolean, default: false },
  data: { type: Object, default: () => ({}) },
  buttonText: { type: String, required: true },
  buttonTo: { type: String, required: true },
  buttonIcon: { type: String, required: true },
  progress: { type: Number, default: 0 },
  progressLabel: { type: String, default: "Profile Completion" },
});

const isHovered = ref(false);
const hoveredItem = ref(null);

const hasData = computed(() => {
  const data = props.data;
  return (
    Object.keys(data).length > 0 &&
    Object.values(data).some(
      (val) => val !== "Не указано" && val !== 0 && val?.length > 0
    )
  );
});

const formattedData = computed(() => {
  const data = props.data;
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "number" && key.toLowerCase().includes("score")) {
      result[key] = value.toFixed(1);
    } else if (Array.isArray(value)) {
      result[key] = value.join(", ");
    } else {
      result[key] = value || "Не указано";
    }
  }
  return result;
});
</script>

<style scoped>
.sphere {
  min-height: 340px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.sphere.is-hovered {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
}

/* SVG Path Animation */
.glow-path {
  opacity: 0;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  filter: url(#glow);
}

.path-active .glow-path {
  opacity: 0.6;
  transition: opacity 0.3s ease, stroke-dashoffset 1.5s ease;
  stroke-dashoffset: 0;
}

/* Pulse animation for dots */
.pulse-dot {
  opacity: 0;
  transform: scale(0);
  animation: pulse 2s infinite;
}

.pulse-dot-1 {
  animation-delay: 0s;
}

.pulse-dot-2 {
  animation-delay: 0.5s;
}

.pulse-dot-3 {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.sphere-progress div {
  transition: width 1s ease-in-out, box-shadow 0.3s ease;
}

@media (max-width: 640px) {
  .sphere {
    min-height: 300px;
  }
}
</style>
