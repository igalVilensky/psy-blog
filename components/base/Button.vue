<template>
  <component
    :is="isLink ? 'NuxtLink' : 'button'"
    :to="isLink ? to : undefined"
    :class="buttonClasses"
    :style="{ cursor: isLink || isClickable ? 'pointer' : 'default' }"
    @click="handleClick"
  >
    <!-- Hover state (icon only) -->
    <span
      :style="{
        backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
      }"
      :class="`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 ${translateClass} group-hover:translate-x-0 ease`"
    >
      <i :class="iconClass"></i>
    </span>

    <!-- Default state (icon + text) -->
    <span
      :style="{ color: textColor }"
      class="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease"
    >
      <i :class="iconClass + ' mr-2.5'"></i>{{ text }}
    </span>

    <!-- Invisible text for layout -->
    <span class="relative invisible">{{ text }}</span>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { navigateTo } from "#app";

// ✅ Props
const props = defineProps({
  to: { type: String, default: "" },
  text: { type: String, required: true },
  iconClass: { type: String, required: true },
  gradientStart: { type: String, default: "#0EA5E9" },
  gradientEnd: { type: String, default: "#E879F9" },
  textColor: { type: String, default: "#0EA5E9" },
  customClass: { type: String, default: "" },
  isLink: { type: Boolean, default: true },
  isClickable: { type: Boolean, default: true },
  translateClass: { type: String, default: "-translate-x-full" },
});

// ✅ Emits
const emit = defineEmits(["click"]);

// ✅ Computed class for styling
const buttonClasses = computed(
  () =>
    `flex-1 lg:flex-initial group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl border hover:shadow-lg ${props.customClass}`
);

// ✅ Handle click (works for both links & buttons)
const handleClick = () => {
  if (!props.isLink) {
    emit("click"); // Button mode
  } else if (props.to) {
    navigateTo(props.to); // Proper Nuxt navigation
  }
};
</script>
