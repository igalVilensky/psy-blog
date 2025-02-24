<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Header section with icon -->
    <div class="my-4 md:mb-8 text-center">
      <p
        class="text-slate-300 text-base md:text-lg flex items-center justify-center gap-2"
      >
        <i class="fas fa-sliders-h text-[#0EA5E9]"></i>
        Передвиньте ползунок, чтобы указать интенсивность
      </p>
    </div>

    <!-- Intensity Categories with icons -->
    <div class="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
      <!-- Weak -->
      <div
        class="flex flex-col items-center justify-center min-h-[72px] px-2 py-1 md:py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 group hover:bg-[#1A1F35]/60 transition-all duration-300"
      >
        <div
          class="text-green-400 font-medium text-sm md:text-base flex items-center gap-2"
        >
          <i class="fas fa-feather-alt"></i>
          <span class="hidden md:inline">Слабое</span>
          <span class="inline md:hidden">1-3</span>
        </div>
        <div class="text-[10px] sm:text-sm text-green-300/80">
          <span class="inline md:hidden">Слабое</span>
          <span class="hidden md:inline">1-3</span>
        </div>
      </div>

      <!-- Medium -->
      <div
        class="flex flex-col items-center justify-center min-h-[72px] px-2 py-1 md:py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 group hover:bg-[#1A1F35]/60 transition-all duration-300"
      >
        <div
          class="text-yellow-400 font-medium text-sm md:text-base flex items-center gap-2"
        >
          <i class="fas fa-wind"></i>
          <span class="hidden md:inline">Умеренное</span>
          <span class="inline md:hidden">4-7</span>
        </div>
        <div class="text-[10px] sm:text-sm text-yellow-300/80">
          <span class="inline md:hidden">Умеренное</span>
          <span class="hidden md:inline">4-7</span>
        </div>
      </div>

      <!-- Strong -->
      <div
        class="flex flex-col items-center justify-center min-h-[72px] px-2 py-1 md:py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 group hover:bg-[#1A1F35]/60 transition-all duration-300"
      >
        <div
          class="text-red-400 font-medium text-sm md:text-base flex items-center gap-2"
        >
          <i class="fas fa-fire"></i>
          <span class="hidden md:inline">Сильное</span>
          <span class="inline md:hidden">8-10</span>
        </div>
        <div class="text-[10px] sm:text-sm text-red-300/80">
          <span class="inline md:hidden">Сильное</span>
          <span class="hidden md:inline">8-10</span>
        </div>
      </div>
    </div>

    <!-- Step Progress Intensity Selector -->
    <div class="relative mt-8 mb-6">
      <!-- Steps Container -->
      <div class="flex items-center justify-between px-4 mb-2">
        <template v-for="n in 10" :key="n">
          <div class="flex items-center flex-1">
            <!-- Circle with tooltip -->
            <div class="relative group">
              <div
                :class="[
                  'w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300',
                  getStepStyle(n),
                ]"
              >
                <div
                  class="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
                >
                  <div
                    class="bg-slate-800 px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    Уровень {{ n }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Connecting Line -->
            <div
              v-if="n < 10"
              :class="[
                'flex-1 h-0.5 transition-all duration-300',
                getLineStyle(n),
              ]"
            ></div>
          </div>
        </template>
      </div>

      <!-- Actual Slider Input -->
      <input
        type="range"
        :value="intensityLevel"
        @input="(e) => emit('update:intensity-level', parseInt(e.target.value))"
        min="1"
        max="10"
        step="1"
        class="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>

    <!-- Enhanced Current Value Display -->
    <div class="text-center">
      <span
        class="inline-flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 bg-[#1A1F35]/40 text-xs md:text-sm font-medium transition-all duration-300 text-[#0EA5E9]"
      >
        <i :class="getCurrentIcon"></i>
        Текущая интенсивность:
        <span :class="getCurrentTextColor"> {{ intensityLevel }}/10 </span>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  intensityLevel: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:intensity-level"]);

const getCurrentTextColor = computed(() => {
  if (props.intensityLevel <= 3) return "text-green-400";
  if (props.intensityLevel <= 7) return "text-yellow-400";
  return "text-red-400";
});

const getCurrentIcon = computed(() => {
  if (props.intensityLevel <= 3) return "fas fa-feather-alt text-green-400";
  if (props.intensityLevel <= 7) return "fas fa-wind text-yellow-400";
  return "fas fa-fire text-red-400";
});

function getStepStyle(step) {
  const isActive = props.intensityLevel >= step;
  const baseStyle = "border-2 shadow-lg";

  if (!isActive) return `${baseStyle} border-slate-600 bg-slate-700/50`;

  if (step <= 3) return `${baseStyle} border-green-400 bg-green-500`;
  if (step <= 7) return `${baseStyle} border-yellow-400 bg-yellow-500`;
  return `${baseStyle} border-red-400 bg-red-500`;
}

function getLineStyle(step) {
  const isActive = props.intensityLevel > step;

  if (!isActive) return "bg-slate-600";

  if (step <= 3) return "bg-green-400";
  if (step <= 7) return "bg-yellow-400";
  return "bg-red-400";
}
</script>
