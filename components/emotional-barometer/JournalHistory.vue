<template>
  <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
    <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4A4238]">
      История эмоций
    </h2>

    <!-- Filters -->
    <div class="mb-4 flex space-x-2">
      <select
        v-model="emotionFilter"
        class="border rounded p-1 sm:p-2 text-xs sm:text-base w-1/2"
      >
        <option value="">Все эмоции</option>
        <option
          v-for="emotion in emotions"
          :key="emotion.id"
          :value="emotion.name"
        >
          {{ emotion.name }}
        </option>
      </select>
      <select
        v-model="sphereFilter"
        class="border rounded p-1 sm:p-2 text-xs sm:text-base w-1/2"
      >
        <option value="">Все сферы</option>
        <option
          v-for="sphere in lifeSpheres"
          :key="sphere.name"
          :value="sphere.name"
        >
          {{ sphere.name }}
        </option>
      </select>
    </div>

    <!-- Journal Entries List -->
    <div class="space-y-4 max-h-[100vh] overflow-y-auto">
      <div
        v-for="(entry, index) in filteredEntries"
        :key="index"
        class="border-b pb-4 last:border-b-0"
      >
        <div class="flex justify-between items-center">
          <span class="font-bold text-sm sm:text-base text-[#4A4238]">
            {{ entry.emotion }} ({{ entry.intensity }}/10)
          </span>
          <span class="text-xs sm:text-sm text-gray-500">
            {{ formatDate(entry.timestamp) }}
          </span>
        </div>
        <p class="mt-2 text-xs sm:text-sm text-[#6B5B4C]">
          {{ entry.entry }}
        </p>
        <div class="mt-2">
          <span
            v-for="tag in entry.tags"
            :key="tag"
            :class="[
              'inline-block px-2 py-1 rounded-full text-xs mr-2',
              getTagColor(tag),
            ]"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  emotions: { type: Array, required: true },
  lifeSpheres: { type: Array, required: true },
  entries: { type: Array, required: true },
});

const emotionFilter = ref("");
const sphereFilter = ref("");

const filteredEntries = computed(() => {
  return props.entries.filter(
    (entry) =>
      (!emotionFilter.value || entry.emotion === emotionFilter.value) &&
      (!sphereFilter.value || entry.tags.includes(sphereFilter.value))
  );
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTagColor = (tagName) => {
  const sphere = props.lifeSpheres.find((s) => s.name === tagName);
  return sphere ? sphere.color : "bg-gray-100";
};
</script>
