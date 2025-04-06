<template>
  <div
    class="sphere bg-gradient-to-b from-[#1A1F35]/90 to-[#1E293B]/95 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 transition-all transform duration-300 relative overflow-hidden"
    :class="`hover:shadow-[0_0_25px_${gradientStart}/50]`"
  >
    <!-- Decorative Elements -->
    <div
      class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 transition-opacity duration-300"
      :style="{ backgroundColor: gradientStart }"
      :class="{ 'opacity-50': isHovered }"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity duration-300"
      :style="{ backgroundColor: gradientEnd }"
      :class="{ 'opacity-40': isHovered }"
    ></div>
    <!-- Glow Overlay on Hover -->
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 hover:opacity-100"
      :style="{
        background: `radial-gradient(circle at 50% 50%, ${gradientStart}20, transparent 70%)`,
      }"
    ></div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-4 relative z-10">
      <h3 class="text-xl md:text-2xl font-bold text-white/95 flex items-center">
        <i
          :class="[iconClass, 'mr-3 text-lg md:text-xl']"
          :style="{ color: iconColor }"
        ></i>
        {{ title }}
      </h3>
      <span
        class="text-xs md:text-sm font-medium text-white/60 bg-black/20 px-2 py-1 rounded-full"
        >{{ subtitle }}</span
      >
    </div>

    <!-- Description -->
    <p class="text-sm md:text-base text-white/70 mb-6 max-w-md relative z-10">
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
        <!-- Default data display -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(value, key) in formattedData"
            :key="key"
            class="flex flex-col bg-white/5 rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all"
          >
            <span class="text-white/50 text-xs mb-1 uppercase tracking-wider">{{
              key
            }}</span>
            <span class="text-white/90 font-medium text-lg">{{ value }}</span>
          </div>
        </div>
      </slot>

      <!-- Progress Section -->
      <div class="mt-6 space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-white/70">Profile Completion</span>
          <span class="text-sm font-medium" :style="{ color: gradientEnd }"
            >{{ progress }}%</span
          >
        </div>
        <div
          class="sphere-progress h-2 bg-white/10 rounded-full overflow-hidden"
        >
          <div
            class="h-full transition-all duration-500"
            :style="{
              background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
              width: `${progress}%`,
            }"
          ></div>
        </div>
      </div>

      <!-- Action елементы Button -->
      <Button
        :to="buttonTo"
        :text="buttonText"
        :icon-class="buttonIcon"
        :gradient-start="gradientStart"
        :gradient-end="gradientEnd"
        text-color="white"
        custom-class="mt-6 w-full text-sm md:text-base font-medium"
      />
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-48 space-y-4 relative z-10"
    >
      <slot name="no-data">
        <!-- Enhanced "No Data" state -->
        <div class="p-4 rounded-full bg-white/5">
          <i
            :class="[iconClass, 'text-3xl opacity-70']"
            :style="{ color: iconColor }"
          ></i>
        </div>
        <p class="text-center text-white/70">
          Нет данных психологического профиля
        </p>
        <NuxtLink
          :to="buttonTo"
          class="px-4 py-2 text-sm rounded-full transition-all hover:bg-white/10"
          :style="{ color: gradientStart }"
        >
          <i :class="[buttonIcon, 'mr-2']"></i>
          {{ buttonText }}
        </NuxtLink>
      </slot>
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
});

// Track hover state
const isHovered = ref(false);

// Check if there's meaningful data to display
const hasData = computed(() => {
  const data = props.data;
  return (
    Object.keys(data).length > 0 &&
    Object.values(data).some(
      (val) => val !== "Не указано" && val !== 0 && val?.length > 0
    )
  );
});

// Format data for display with improved handling
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
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.sphere:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.3);
}

.sphere:after {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 120%;
  height: 120%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  transform: rotate(45deg);
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.sphere:hover:after {
  opacity: 0.15;
}

.sphere-progress div {
  transition: width 1s ease-in-out;
}

@media (max-width: 640px) {
  .sphere {
    min-height: 300px;
  }
}
</style>
