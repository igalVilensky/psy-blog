<template>
  <div
    class="sphere bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/20 p-6 md:p-8 hover:shadow-lg transition-all transform hover:translate-y-[-4px] duration-300 relative overflow-hidden"
    :class="`hover:shadow-[${gradientStart}]/20`"
  >
    <!-- Decorative Element -->
    <div
      class="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl"
      :style="{ backgroundColor: `${gradientStart}/10` }"
    ></div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-white/90 flex items-center">
        <i :class="[iconClass, 'mr-3']" :style="{ color: iconColor }"></i>
        {{ title }}
      </h3>
      <span class="text-xs text-white/50">{{ subtitle }}</span>
    </div>

    <!-- Description -->
    <p class="text-sm text-white/60 mb-4">{{ description }}</p>

    <!-- Content -->
    <div v-if="loading" class="flex justify-center items-center h-36">
      <i :class="['fas fa-spinner fa-spin text-xl', { [iconColor]: true }]"></i>
    </div>
    <div v-else-if="hasData" class="space-y-3">
      <slot name="data-content">
        <!-- Default data display if no custom slot is provided -->
        <div
          v-for="(value, key) in formattedData"
          :key="key"
          class="flex justify-between items-center"
        >
          <span class="text-slate-300">{{ key }}:</span>
          <span class="text-white font-medium">{{ value }}</span>
        </div>
      </slot>

      <!-- Progress Bar -->
      <div
        class="sphere-progress mt-6 h-2 bg-white/10 rounded-full overflow-hidden"
      >
        <div
          class="h-full"
          :style="{
            background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
            width: `${progress}%`,
          }"
        ></div>
      </div>

      <!-- Button -->
      <Button
        :to="buttonTo"
        :text="buttonText"
        :icon-class="buttonIcon"
        :gradient-start="gradientStart"
        :gradient-end="gradientEnd"
        text-color="white"
        custom-class="mt-4 w-full"
      />
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-36 space-y-3"
    >
      <slot name="no-data">
        <!-- Default "No Data" state -->
        <i
          :class="[iconClass, 'text-2xl opacity-50']"
          :style="{ color: iconColor }"
        ></i>
        <p class="text-center text-slate-400">Нет данных</p>
        <NuxtLink
          :to="buttonTo"
          class="text-sm hover:underline"
          :style="{ color: gradientStart }"
        >
          {{ buttonText }}
        </NuxtLink>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
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

// Check if there’s meaningful data to display
const hasData = computed(() => {
  const data = props.data;
  return (
    Object.keys(data).length > 0 &&
    Object.values(data).some(
      (val) => val !== "Не указано" && val !== 0 && val?.length > 0
    )
  );
});

// Format data for default display (can be overridden with slot)
const formattedData = computed(() => {
  const data = props.data;
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    result[key] = value || "Не указано";
  }
  return result;
});
</script>

<style scoped>
.sphere {
  min-height: 300px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 10;
}

.sphere:after {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transform: rotate(45deg);
  pointer-events: none;
}

@media (min-width: 1024px) {
  .sphere:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
