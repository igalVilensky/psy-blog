<template>
  <defs>
    <!-- Background gradient -->
    <linearGradient id="svg-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(15, 23, 42, 0.8)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.9)" />
    </linearGradient>

    <!-- Glow filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Gold glow filter for Path of Wholeness -->
    <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0.8 0 1 0 0 0.7 0 0 1 0 0.1 0 0 0 1 0"
        result="glow"
      />
      <feComposite in="SourceGraphic" in2="glow" operator="over" />
    </filter>

    <!-- Column-specific pulse filters -->
    <filter id="pulse-left" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0 0 0 0 0 0 0.4 0 0 0.9 0.8 0 0 0 1 0 0 0 0.7 0"
        result="glow"
      />
      <feComposite in="SourceGraphic" in2="glow" operator="over" />
    </filter>

    <filter id="pulse-right" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0.8 0.7 0.5 0 0 0 0 0 0 0 0 0 0 0 0.7 0"
        result="glow"
      />
      <feComposite in="SourceGraphic" in2="glow" operator="over" />
    </filter>

    <filter id="pulse-center" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0.3 0.8 0 0 0 0.2 1 0 0 0 0.3 0.5 0 0 0 0 0 0 0.7 0"
        result="glow"
      />
      <feComposite in="SourceGraphic" in2="glow" operator="over" />
    </filter>

    <!-- Vertical beam gradient -->
    <linearGradient id="vertical-beam" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.1)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>

    <!-- Golden light beam (descending light) -->
    <linearGradient id="golden-light" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,215,0,0.9)" />
      <stop offset="50%" stop-color="rgba(255,215,0,0.4)" />
      <stop offset="100%" stop-color="rgba(255,215,0,0.1)" />
    </linearGradient>
  </defs>
</template>

<script setup>
// No script setup needed as this is a static component
</script>

<style scoped>
/* No styles needed as this component only defines SVG filters and gradients */
</style>
