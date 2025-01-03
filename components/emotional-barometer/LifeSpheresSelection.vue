<template>
  <div
    class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg px-3 sm:px-6 pb-6 sm:pt-6"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="h-8 w-1 bg-indigo-500 rounded-full"></div>
      <p class="text-sm sm:text-base text-gray-700 font-medium">
        Выберите сферы жизни, к которым относится эта эмоция:
      </p>
    </div>

    <div class="flex flex-wrap gap-2 sm:gap-3">
      <button
        v-for="sphere in lifeSpheres"
        :key="sphere.name"
        @click="$emit('toggle-tag', sphere.name)"
        :class="[
          'group relative px-4 py-2 rounded-xl text-sm transition-all duration-300',
          'hover:shadow-md hover:transform hover:-translate-y-0.5',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'focus:ring-opacity-50',
          selectedTags.includes(sphere.name)
            ? `${sphere.activeColor} text-white shadow-lg focus:ring-${sphere.ringColor}`
            : `${sphere.color} text-gray-700 shadow-sm hover:opacity-90 focus:ring-${sphere.ringColor}`,
        ]"
      >
        <div class="flex items-center gap-2">
          <span
            :class="[
              'w-2 h-2 rounded-full transition-all duration-300',
              selectedTags.includes(sphere.name)
                ? 'bg-white'
                : `${sphere.dotColor}`,
            ]"
          ></span>
          {{ sphere.name }}
        </div>
        <div
          v-if="selectedTags.includes(sphere.name)"
          class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm"
        >
          <div
            :class="['absolute inset-0.5 rounded-full', `${sphere.dotColor}`]"
          ></div>
        </div>
      </button>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in selectedTags"
        :key="tag"
        class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

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
