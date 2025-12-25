<template>
  <div class="fixed inset-0 -z-1 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-screen bg-background">
      <!-- Neural Gradient Circle -->
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-gradient-blue-start/10 to-gradient-blue-end/10 rounded-full blur-3xl animate-slow-drift"
      ></div>
      <!-- Energy Gradient Circle -->
      <div
        class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-gradient-orange-start/10 to-gradient-orange-end/10 rounded-full blur-3xl animate-slow-pulse"
      ></div>
      <!-- Mind Gradient Circle -->
      <div
        class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-gradient-purple-start/10 to-gradient-purple-end/10 rounded-full blur-3xl animate-slow-float"
      ></div>
      <!-- Insight Gradient Circle -->
      <div
        class="absolute bottom-1/3 left-1/3 w-88 h-88 bg-gradient-to-r from-gradient-mint-start/10 to-gradient-mint-end/10 rounded-full blur-3xl animate-slow-drift"
      ></div>
    </div>
  </div>
</template>

