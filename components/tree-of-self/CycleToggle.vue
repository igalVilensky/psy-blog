<!-- CycleToggle.vue -->
<template>
  <div
    class="my-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
  >
    <div
      class="flex flex-col xs:flex-row items-start xs:items-center gap-2 w-full sm:w-auto"
    >
      <label class="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="localPathOfWholeness"
          class="sr-only peer"
        />
        <div
          class="relative w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-yellow-600 peer-checked:to-yellow-400"
        ></div>
        <span class="ml-2 text-sm font-medium text-white/80 whitespace-nowrap">
          Путь Целостности
        </span>
      </label>

      <p
        v-if="localPathOfWholeness"
        class="text-sm text-yellow-300 whitespace-nowrap"
      >
        <i class="fas fa-sun mr-1"></i> Неделя {{ currentWeek }}:
        {{ getCurrentSefirahName() }}
      </p>
    </div>

    <nuxt-link
      to="/community/leaderboard"
      class="text-sm flex items-center text-white/80 hover:text-white w-full sm:w-auto justify-end"
    >
      <i class="fas fa-trophy mr-1 text-yellow-300"></i> Таблица лидеров
    </nuxt-link>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Define props
const props = defineProps({
  pathOfWholeness: {
    type: Boolean,
    required: true,
    default: false,
  },
  currentWeek: {
    type: Number,
    required: true,
    default: 1,
  },
  getCurrentSefirahName: {
    type: Function,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["update:pathOfWholeness"]);

// Local state to handle v-model binding
const localPathOfWholeness = ref(props.pathOfWholeness);

// Watch for changes to localPathOfWholeness and emit updates
watch(localPathOfWholeness, (newValue) => {
  emit("update:pathOfWholeness", newValue);
});

// Watch for changes to the prop to sync local state
watch(
  () => props.pathOfWholeness,
  (newValue) => {
    localPathOfWholeness.value = newValue;
  }
);
</script>
