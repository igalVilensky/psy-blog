<template>
  <div class="mb-8 max-w-2xl w-full mx-auto">
    <!-- Header with step information -->
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center text-sm font-medium">
          {{ currentStep }}
        </div>
        <span class="text-sm font-medium text-gray-700">из 5</span>
      </div>
      <span class="text-sm font-medium text-gray-700 px-4 py-1 bg-gray-100 rounded-full">
        {{ stepTitle }}
      </span>
    </div>

    <!-- Progress bar container -->
    <div class="relative w-full">
      <!-- Background track -->
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <!-- Progress fill -->
        <div class="bg-[#FF6B6B] h-2.5 rounded-full transition-all duration-500 ease-in-out"
          :style="{ width: `${((currentStep - 1) / 4) * 100}%` }">
          <!-- Animated pulse effect at the end of progress -->
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" :style="{
            left:
              currentStep === 1
                ? `calc(${((currentStep - 1) / 4) * 100}% + 0.25rem)` // Adjust right for the first step
                : currentStep === 5
                  ? `calc(${((currentStep - 1) / 4) * 100}% - 0.25rem)` // Adjust left for the last step
                  : `${((currentStep - 1) / 4) * 100}%`,
          }">
            <div class="w-4 h-4 bg-[#FF6B6B] rounded-full">
              <div class="absolute inset-0 rounded-full bg-[#FF6B6B] animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step markers -->
      <div class="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
        <div v-for="step in 5" :key="step" :class="[
          'w-2 h-2 rounded-full transition-all duration-300',
          step <= currentStep ? 'bg-white' : 'bg-gray-300',
        ]"></div>
      </div>
    </div>

    <!-- Optional: Step description -->
    <div class="flex justify-between mt-2 px-1">
      <div v-for="step in 5" :key="step" :class="[
        'text-xs transition-all duration-300',
        step <= currentStep ? 'text-gray-700' : 'text-gray-400',
      ]">
        {{ step }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 5,
  },
  stepTitle: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-ping {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
