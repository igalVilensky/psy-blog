<!-- PendingActionsCard.vue -->
<template>
  <div
    class="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-700 max-w-6xl mx-auto"
  >
    <h2
      class="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      Ожидающие действия на сегодня
    </h2>

    <div v-if="pendingSefirot.length > 0">
      <p class="text-gray-300 mb-4 text-sm sm:text-base">
        Вы не завершили следующие действия на сегодня:
      </p>

      <ul class="space-y-2 sm:space-y-3">
        <li
          v-for="sefirah in pendingSefirot"
          :key="sefirah.id"
          class="bg-gray-800/60 hover:bg-gray-800/80 transition-colors rounded-lg overflow-hidden border border-gray-700/50"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center p-3 sm:p-4">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-inner"
                :class="getIconBgColorClass(sefirah.column)"
              >
                <i
                  :class="['fas', getSefirahIcon(sefirah.id), 'text-white']"
                ></i>
              </div>
              <div>
                <span class="text-gray-200 font-medium text-sm sm:text-base">{{
                  sefirah.name
                }}</span>
                <div class="text-gray-400 text-xs sm:text-sm mt-0.5">
                  {{ sefirah.function }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center border-t sm:border-t-0 sm:border-l border-gray-700/50 bg-gray-900/30"
            >
              <div class="px-3 py-2 sm:px-4 sm:py-4 flex items-center">
                <div class="relative w-full mr-3">
                  <div
                    class="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-700/50 w-16 sm:w-24"
                  >
                    <div
                      :style="{
                        width: `${
                          (sefirah.dailyActions / sefirah.maxActions) * 100
                        }%`,
                      }"
                      :class="getProgressColorClass(sefirah.column)"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    ></div>
                  </div>
                </div>
                <span
                  class="text-xs sm:text-sm whitespace-nowrap text-gray-400"
                >
                  {{ sefirah.dailyActions }} / {{ sefirah.maxActions }}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="py-2">
      <div
        class="flex items-center justify-center py-6 px-4 bg-gray-800/40 rounded-lg border border-green-500/20"
      >
        <svg
          class="w-8 h-8 text-green-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p class="text-gray-200 font-medium text-sm sm:text-base">
          Отличная работа! Вы завершили все действия на сегодня.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  sefirot: {
    type: Array,
    required: true,
  },
  getSefirahIcon: {
    type: Function,
    required: true,
  },
});

// Compute Sefirot with incomplete daily actions
const pendingSefirot = computed(() => {
  return props.sefirot.filter(
    (sefirah) => sefirah.dailyActions < sefirah.maxActions
  );
});

// Get icon background color class based on column
const getIconBgColorClass = (column) => {
  switch (column) {
    case "left":
      return "bg-blue-500/80";
    case "right":
      return "bg-amber-500/80";
    case "center":
      return "bg-emerald-500/80";
    default:
      return "bg-gray-500/80";
  }
};

// Get progress bar color class based on column
const getProgressColorClass = (column) => {
  switch (column) {
    case "left":
      return "bg-blue-500";
    case "right":
      return "bg-amber-500";
    case "center":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};
</script>
