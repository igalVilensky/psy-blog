<!-- components/ScrollGlowSection.vue -->
<template>
  <div
    ref="sectionRef"
    :class="[
      'transition-all duration-300 rounded-2xl',
      { 'shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]': isVisible || isHovered },
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const isVisible = ref(false);
const isHovered = ref(false);

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    isVisible.value = entry.isIntersecting;
  });
};

let observer;

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, observerOptions);
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

