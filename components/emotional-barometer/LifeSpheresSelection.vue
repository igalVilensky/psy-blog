<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="text-center my-4 sm:mb-8">
      <p class="text-slate-300 text-lg">
        Отметьте, к каким сферам жизни относится эта эмоция:
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="sphere in lifeSpheres"
        :key="sphere.name"
        @click="$emit('toggle-tag', sphere.name)"
        class="group relative"
      >
        <!-- Hover Effect Background -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <!-- Main Button Content -->
        <div
          :class="[
            'relative p-4 rounded-xl transition-all duration-300',
            'backdrop-blur-sm border',
            'group-hover:transform group-hover:-translate-y-0.5',
            selectedTags.includes(sphere.name)
              ? 'bg-gradient-to-r from-[#0EA5E9]/40 to-[#E879F9]/40 border-[#0EA5E9]/50 shadow-lg shadow-[#0EA5E9]/20'
              : 'bg-[#1A1F35]/40 border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/30',
          ]"
        >
          <div class="flex items-center gap-2">
            <span
              :class="[
                'w-2 h-2 rounded-full transition-all duration-300',
                selectedTags.includes(sphere.name)
                  ? 'bg-white'
                  : 'bg-[#0EA5E9]/50',
              ]"
            ></span>
            <span class="text-sm font-medium text-slate-300">
              {{ sphere.name }}
            </span>
          </div>

          <!-- Selection Indicator -->
          <div
            v-if="selectedTags.includes(sphere.name)"
            class="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5"
          >
            <div
              class="absolute inset-0 bg-[#0EA5E9] rounded-full animate-ping opacity-75"
            ></div>
            <div class="absolute inset-0 bg-[#0EA5E9] rounded-full"></div>
            <div class="absolute inset-0.5 bg-white rounded-full"></div>
          </div>
        </div>
      </button>
    </div>

    <!-- Selected Tags Display -->
    <div class="mt-6 flex flex-wrap gap-2">
      <span
        v-for="tag in selectedTags"
        :key="tag"
        class="inline-flex items-center px-3 py-1 rounded-lg bg-[#1A1F35]/40 backdrop-blur-sm border border-[#0EA5E9]/20 text-xs text-slate-300"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lifeSpheres: {
    type: Array,
    required: true,
  },
  selectedTags: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["toggle-tag"]);
</script>
