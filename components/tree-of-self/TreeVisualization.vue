<template>
  <section
    class="mb-8 bg-white/5 backdrop-blur rounded-xl shadow-xl border border-white/10"
    ref="treeContainer"
  >
    <div class="relative flex flex-col items-center">
      <!-- Full Screen Button (Mobile Only) -->
      <div class="flex justify-end w-full px-4 py-2 md:hidden">
        <button
          @click="toggleFullscreen"
          class="inline-flex items-center px-4 py-2 bg-gray-800/50 text-white rounded-lg hover:bg-gray-700/50 transition-all duration-200"
        >
          <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
          <span class="ml-2">{{
            isFullscreen
              ? "Выйти из полноэкранного режима"
              : "Смотреть на весь экран"
          }}</span>
        </button>
      </div>

      <!-- SVG Tree for Medium+ Screens -->
      <div class="relative mb-4">
        <svg
          class="w-full max-w-3xl h-[32rem] lg:max-w-4xl lg:h-[40rem] xl:max-w-5xl xl:h-[48rem]"
          viewBox="0 0 400 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <!-- SVG Definitions -->
          <SvgDefs />

          <!-- Background Rectangle -->
          <rect x="0" y="0" width="400" height="600" fill="url(#svg-bg)" />

          <!-- Title inside SVG (desktop only) -->
          <g class="hidden md:block">
            <text fill="white" x="120" y="30" class="text-lg font-semibold">
              Ваше Древо Себя
            </text>
          </g>

          <!-- Descending Light Animation (for Path of Wholeness) -->
          <g v-if="pathOfWholeness">
            <line
              x1="200"
              y1="50"
              x2="200"
              y2="550"
              stroke="url(#golden-light)"
              stroke-width="4"
              stroke-opacity="0.8"
              filter="url(#gold-glow)"
              class="descending-light"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,1000;1000,0"
                dur="15s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0;-1000"
                dur="15s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          <!-- Dynamic Connections -->
          <g class="connections">
            <!-- Vertical light beam -->
            <line
              x1="200"
              y1="67"
              x2="200"
              y2="533"
              stroke="url(#vertical-beam)"
              stroke-width="1"
              stroke-opacity="0.2"
            />

            <!-- Connection Paths -->
            <ConnectionLine
              v-for="(conn, idx) in connections"
              :key="`conn-${idx}`"
              :conn="conn"
              :get-connection-column-class="getConnectionColumnClass"
              :get-active-stroke-class="getActiveStrokeClass"
              :get-connection-particle-class="getConnectionParticleClass"
            />
          </g>

          <!-- Sefirot Nodes -->
          <SefirahNode
            v-for="sefirah in sefirot"
            :key="sefirah.id"
            :sefirah="sefirah"
            :path-of-wholeness="pathOfWholeness"
            :is-current-week-sefirah="isCurrentWeekSefirah"
            :hovered-node="hoveredNode"
            :highlighted-category="highlightedCategory"
            :energy-of-day="energyOfDay"
            :get-node-glow-class="getNodeGlowClass"
            :get-glow-filter="getGlowFilter"
            :get-node-pulse-class="getNodePulseClass"
            :get-node-stroke-color="getNodeStrokeColor"
            :get-sefirah-icon="getSefirahIcon"
            :get-label-x="getLabelX"
            :get-level-color="getLevelColor"
            :show-node-tooltip="showNodeTooltip"
            :hide-node-tooltip="hideNodeTooltip"
            @open-modal="handleOpenModal(sefirah.id)"
            @update:hovered-node="$emit('update:hoveredNode', $event)"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import SvgDefs from "./SvgDefs.vue";
import SefirahNode from "./SefirahNode.vue";
import ConnectionLine from "./ConnectionLine.vue";
import { defineProps, defineEmits } from "vue";

// Define props
const props = defineProps({
  sefirot: {
    type: Array,
    required: true,
  },
  pathOfWholeness: {
    type: Boolean,
    required: true,
  },
  currentWeek: {
    type: Number,
    required: true,
  },
  energyOfDay: {
    type: String,
    default: null,
  },
  highlightedCategory: {
    type: String,
    default: null,
  },
  hoveredNode: {
    type: String,
    default: null,
  },
  isCurrentWeekSefirah: {
    type: Function,
    required: true,
  },
  getConnectionColumnClass: {
    type: Function,
    required: true,
  },
  getActiveStrokeClass: {
    type: Function,
    required: true,
  },
  getConnectionParticleClass: {
    type: Function,
    required: true,
  },
  getNodeGlowClass: {
    type: Function,
    required: true,
  },
  getGlowFilter: {
    type: Function,
    required: true,
  },
  getNodePulseClass: {
    type: Function,
    required: true,
  },
  getNodeStrokeColor: {
    type: Function,
    required: true,
  },
  getSefirahIcon: {
    type: Function,
    required: true,
  },
  getLabelX: {
    type: Function,
    required: true,
  },
  getTooltipLevelClass: {
    type: Function,
    required: true,
  },
  getProgressBarClass: {
    type: Function,
    required: true,
  },
  showNodeTooltip: {
    type: Function,
    required: true,
  },
  hideNodeTooltip: {
    type: Function,
    required: true,
  },
});

// Define emits for two-way binding and modal
const emit = defineEmits(["update:hoveredNode", "open-modal"]);

// Fullscreen state and container ref
const isFullscreen = ref(false);
const treeContainer = ref(null);

// Toggle fullscreen mode
const toggleFullscreen = async () => {
  if (!treeContainer.value) return;

  if (!isFullscreen.value) {
    try {
      if (treeContainer.value.requestFullscreen) {
        await treeContainer.value.requestFullscreen();
      } else if (treeContainer.value.webkitRequestFullscreen) {
        await treeContainer.value.webkitRequestFullscreen();
      } else {
        treeContainer.value.classList.add("fullscreen-fallback");
      }
      isFullscreen.value = true;
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      console.log("[error] Не удалось включить полноэкранный режим.");
    }
  } else {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      } else {
        treeContainer.value.classList.remove("fullscreen-fallback");
      }
      isFullscreen.value = false;
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
      console.log("[error] Не удалось выйти из полноэкранного режима.");
    }
  }
};

// Exit fullscreen mode
const exitFullscreen = async () => {
  if (!isFullscreen.value || !treeContainer.value) return;

  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      }
    } else {
      treeContainer.value.classList.remove("fullscreen-fallback");
    }
    isFullscreen.value = false;
  } catch (error) {
    console.error("Error exiting fullscreen:", error);
  }
};

// Handle modal opening with fullscreen exit
const handleOpenModal = async (sefirahId) => {
  if (isFullscreen.value) {
    await exitFullscreen();
  }
  emit("open-modal", sefirahId);
};

// Sync fullscreen state
onMounted(() => {
  const handleFullscreenChange = () => {
    isFullscreen.value = !!(
      document.fullscreenElement || document.webkitFullscreenElement
    );
    if (!isFullscreen.value && treeContainer.value) {
      treeContainer.value.classList.remove("fullscreen-fallback");
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );
  };
});

// Connection data with column types
const connections = computed(() => {
  return [
    {
      path: "M200 67 L133 160",
      active:
        props.sefirot.find((s) => s.id === "keter")?.revealed &&
        props.sefirot.find((s) => s.id === "keter")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "chokhmah")?.revealed &&
        props.sefirot.find((s) => s.id === "chokhmah")?.displayProgress > 0,
      from: "keter",
      to: "chokhmah",
      columnType: "right",
    },
    {
      path: "M200 67 L267 160",
      active:
        props.sefirot.find((s) => s.id === "keter")?.revealed &&
        props.sefirot.find((s) => s.id === "keter")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "binah")?.revealed &&
        props.sefirot.find((s) => s.id === "binah")?.displayProgress > 0,
      from: "keter",
      to: "binah",
      columnType: "left",
    },
    {
      path: "M133 160 L107 267",
      active:
        props.sefirot.find((s) => s.id === "chokhmah")?.revealed &&
        props.sefirot.find((s) => s.id === "chokhmah")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "chesed")?.revealed &&
        props.sefirot.find((s) => s.id === "chesed")?.displayProgress > 0,
      from: "chokhmah",
      to: "chesed",
      columnType: "right",
    },
    {
      path: "M267 160 L293 267",
      active:
        props.sefirot.find((s) => s.id === "binah")?.revealed &&
        props.sefirot.find((s) => s.id === "binah")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "gevurah")?.revealed &&
        props.sefirot.find((s) => s.id === "gevurah")?.displayProgress > 0,
      from: "binah",
      to: "gevurah",
      columnType: "left",
    },
    {
      path: "M107 267 L200 347",
      active:
        props.sefirot.find((s) => s.id === "chesed")?.revealed &&
        props.sefirot.find((s) => s.id === "chesed")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "tiferet")?.revealed &&
        props.sefirot.find((s) => s.id === "tiferet")?.displayProgress > 0,
      from: "chesed",
      to: "tiferet",
      columnType: "center",
    },
    {
      path: "M293 267 L200 347",
      active:
        props.sefirot.find((s) => s.id === "gevurah")?.revealed &&
        props.sefirot.find((s) => s.id === "gevurah")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "tiferet")?.revealed &&
        props.sefirot.find((s) => s.id === "tiferet")?.displayProgress > 0,
      from: "gevurah",
      to: "tiferet",
      columnType: "center",
    },
    {
      path: "M107 267 L133 373",
      active:
        props.sefirot.find((s) => s.id === "chesed")?.revealed &&
        props.sefirot.find((s) => s.id === "chesed")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "netzach")?.revealed &&
        props.sefirot.find((s) => s.id === "netzach")?.displayProgress > 0,
      from: "chesed",
      to: "netzach",
      columnType: "right",
    },
    {
      path: "M293 267 L267 373",
      active:
        props.sefirot.find((s) => s.id === "gevurah")?.revealed &&
        props.sefirot.find((s) => s.id === "gevurah")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "hod")?.revealed &&
        props.sefirot.find((s) => s.id === "hod")?.displayProgress > 0,
      from: "gevurah",
      to: "hod",
      columnType: "left",
    },
    {
      path: "M133 373 L200 453",
      active:
        props.sefirot.find((s) => s.id === "netzach")?.revealed &&
        props.sefirot.find((s) => s.id === "netzach")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "yesod")?.revealed &&
        props.sefirot.find((s) => s.id === "yesod")?.displayProgress > 0,
      from: "netzach",
      to: "yesod",
      columnType: "center",
    },
    {
      path: "M267 373 L200 453",
      active:
        props.sefirot.find((s) => s.id === "hod")?.revealed &&
        props.sefirot.find((s) => s.id === "hod")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "yesod")?.revealed &&
        props.sefirot.find((s) => s.id === "yesod")?.displayProgress > 0,
      from: "hod",
      to: "yesod",
      columnType: "center",
    },
    {
      path: "M200 453 L200 533",
      active:
        props.sefirot.find((s) => s.id === "yesod")?.revealed &&
        props.sefirot.find((s) => s.id === "yesod")?.displayProgress > 0 &&
        props.sefirot.find((s) => s.id === "malkhut")?.revealed &&
        props.sefirot.find((s) => s.id === "malkhut")?.displayProgress > 0,
      from: "yesod",
      to: "malkhut",
      columnType: "center",
    },
  ];
});

const getLevelColor = (column) => {
  switch (column) {
    case "left":
      return "#93c5fd";
    case "right":
      return "#fcd34d";
    case "center":
      return "#86efac";
    default:
      return "#ffffff";
  }
};
</script>

<style scoped>
svg {
  pointer-events: bounding-box;
}
section {
  position: relative;
  z-index: 1;
}
.connections {
  z-index: 1;
}

/* Fullscreen fallback for browsers without Fullscreen API */
.fullscreen-fallback {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  overflow: hidden;
}

.fullscreen-fallback svg {
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
}

/* iOS Safari compatibility */
@supports (-webkit-touch-callout: none) {
  .fullscreen-fallback {
    height: -webkit-fill-available;
  }
  .fullscreen-fallback svg {
    height: -webkit-fill-available;
  }
}
</style>
