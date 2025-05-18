<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white"
  >
    <!-- Main Content Area -->
    <main class="px-6 xl:px-0 pb-20 pt-12">
      <div class="container mx-auto max-w-6xl">
        <!-- Page Header -->
        <PageHeader />

        <!-- Link to Tree of Self Info Page -->
        <SefirotInfoLink />

        <!-- Column Balance & Energy of the Day -->
        <ColumnEnergySection
          :column-progress="columnProgress"
          :column-recommendation="columnRecommendation"
          :energy-of-day="energyOfDay"
          :energy-recommendation="energyRecommendation"
          :select-energy-column="selectEnergyColumn"
        />

        <!-- Cycle Toggle -->
        <CycleToggle
          v-model:path-of-wholeness="pathOfWholeness"
          :current-week="currentWeek"
          :get-current-sefirah-name="getCurrentSefirahName"
        />

        <!-- Tree Visualization -->
        <TreeVisualization
          :sefirot="sefirot"
          :path-of-wholeness="pathOfWholeness"
          :current-week="currentWeek"
          :energy-of-day="energyOfDay"
          :highlighted-category="highlightedCategory"
          v-model:hovered-node="hoveredNode"
          v-model:active-tooltip="activeTooltip"
          :is-current-week-sefirah="isCurrentWeekSefirah"
          :get-connection-column-class="getConnectionColumnClass"
          :get-active-stroke-class="getActiveStrokeClass"
          :get-connection-particle-class="getConnectionParticleClass"
          :get-node-glow-class="getNodeGlowClass"
          :get-glow-filter="getGlowFilter"
          :get-node-pulse-class="getNodePulseClass"
          :get-node-stroke-color="getNodeStrokeColor"
          :get-sefirah-icon="getSefirahIcon"
          :get-label-x="getLabelX"
          :get-tooltip-level-class="getTooltipLevelClass"
          :get-progress-bar-class="getProgressBarClass"
          :scroll-to-sefirah="scrollToSefirah"
          :show-node-tooltip="showNodeTooltip"
          :hide-node-tooltip="hideNodeTooltip"
        />

        <!-- Sefirot Progress Cards -->
        <section
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16"
        >
          <SefirotProgressCard
            v-for="sefirah in sefirot"
            :key="sefirah.id"
            :id="`sefirah-${sefirah.id}`"
            :sefirah="sefirah"
            :is-active="activeCard === sefirah.id"
            :ring-color="getRingColor(sefirah.id)"
            :progress-class="getCardProgressClass(sefirah.id, sefirah.column)"
            :level-badge-class="getLevelBadgeClass(sefirah.column)"
            :progress-bar-class="
              getProgressBarClass(sefirah.id, sefirah.column)
            "
            :set-active-card="setActiveCard"
            :log-action="logAction"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ColumnEnergySection from "~/components/tree-of-self/EnergyOfDay.vue";
import CycleToggle from "~/components/tree-of-self/CycleToggle.vue";
import SefirotProgressCard from "~/components/tree-of-self/SefirotProgressCard.vue";
import PageHeader from "~/components/tree-of-self/PageHeader.vue";
import TreeVisualization from "~/components/tree-of-self/TreeVisualization.vue";
import SefirotInfoLink from "~/components/tree-of-self/SefirotInfoLink.vue";
import { sefirot } from "~/data/sefirotTree.js";
import { useAuthStore } from "~/stores/auth";
import {
  initializeDailyActions,
  logAction,
  fetchSefirotProgress,
} from "~/api/firebase/sefirotProgress";

// Auth setup
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const activeCard = ref(null);
const activeTooltip = ref(null);
const hoveredNode = ref(null);
const highlightedCategory = ref(null);
const pathOfWholeness = ref(false);
const energyOfDay = ref(null);
const currentWeek = ref(1);
const pathOrder = ref([
  "keter",
  "chokhmah",
  "binah",
  "chesed",
  "gevurah",
  "tiferet",
  "netzach",
  "hod",
  "yesod",
  "malkhut",
]);

// Column definitions
const columns = {
  left: { name: "Вода", color: "blue", sefirot: ["binah", "gevurah", "hod"] },
  right: {
    name: "Огонь",
    color: "yellow",
    sefirot: ["chokhmah", "chesed", "netzach"],
  },
  center: {
    name: "Воздух",
    color: "green",
    sefirot: ["keter", "tiferet", "yesod", "malkhut"],
  },
};

// Calculate column progress averages based on daily progress
const columnProgress = computed(() => {
  const result = { left: 0, right: 0, center: 0 };
  sefirot.value.forEach((sefirah) => {
    result[sefirah.column] += sefirah.displayProgress;
  });
  result.left = Math.round(result.left / columns.left.sefirot.length);
  result.right = Math.round(result.right / columns.right.sefirot.length);
  result.center = Math.round(result.center / columns.center.sefirot.length);
  return result;
});

// Column recommendation
const columnRecommendation = computed(() => {
  const lowestColumn = Object.entries(columnProgress.value).reduce(
    (acc, [key, value]) => (value < acc.value ? { key, value } : acc),
    { key: "left", value: 100 }
  ).key;
  const sefirahNames = { left: "Бина", right: "Хохма", center: "Кетер" };
  return `Укрепите ${columns[lowestColumn].name}: ${sefirahNames[lowestColumn]}`;
});

// Energy of the day recommendation
const energyRecommendation = computed(() => {
  if (!energyOfDay.value) return "Выберите энергию дня для рекомендаций";
  const columnSefirot = sefirot.value.filter(
    (s) => s.column === energyOfDay.value
  );
  const lowestSefirah = columnSefirot.reduce(
    (lowest, current) =>
      current.displayProgress < lowest.displayProgress ? current : lowest,
    columnSefirot[0]
  );
  return `Сфокусируйтесь на ${lowestSefirah.function} (${lowestSefirah.name})`;
});

// Select energy column
const selectEnergyColumn = (column) => {
  energyOfDay.value = energyOfDay.value === column ? null : column;
  if (energyOfDay.value) {
    const columnSefirot = sefirot.value.filter(
      (s) => s.column === energyOfDay.value
    );
    const lowestSefirah = columnSefirot.reduce(
      (lowest, current) =>
        current.displayProgress < lowest.displayProgress ? current : lowest,
      columnSefirot[0]
    );
    scrollToSefirah(lowestSefirah.id);
  }
};

// Check if sefirah is current week's focus
const isCurrentWeekSefirah = (id) => {
  return pathOfWholeness.value && pathOrder.value[currentWeek.value - 1] === id;
};

// Get current sefirah name for Path of Wholeness
const getCurrentSefirahName = () => {
  const currentSefirahId = pathOrder.value[currentWeek.value - 1];
  const sefirah = sefirot.value.find((s) => s.id === currentSefirahId);
  return sefirah ? sefirah.name : "";
};

// Calculate level based on points
const calculateLevel = (points) => {
  if (points < 200) return 1;
  if (points < 400) return 2;
  if (points < 1000) return 3;
  if (points < 2000) return 4;
  return 5;
};

// Calculate daily progress
const calculateDailyProgress = (actions, maxActions) => {
  return Math.round((actions / maxActions) * 100);
};

// Apply decay to points
const applyDecay = (points, lastActive) => {
  if (!lastActive) return points;
  const daysInactive = Math.floor(
    (new Date() - lastActive.toDate()) / (1000 * 60 * 60 * 24)
  );
  if (daysInactive <= 7) return points;
  const decayDays = daysInactive - 7;
  let decayedPoints = points;
  for (let i = 0; i < decayDays; i++) {
    decayedPoints = Math.max(decayedPoints * 0.95, 10);
  }
  return Math.round(decayedPoints);
};

// Tooltip and highlight functions
const showNodeTooltip = (sefirah) => {
  let tooltipY;
  let tooltipX = sefirah.x;
  if (sefirah.y < 200) {
    tooltipY = sefirah.y + 50;
  } else if (sefirah.y > 500) {
    tooltipY = sefirah.y - 50;
  } else {
    tooltipY = sefirah.y - 60;
  }
  if (sefirah.x < 150) {
    tooltipX = sefirah.x + 30;
  } else if (sefirah.x > 250) {
    tooltipX = sefirah.x - 30;
  }
  activeTooltip.value = {
    ...sefirah,
    x: tooltipX,
    y: tooltipY,
  };
};

const hideNodeTooltip = () => {
  setTimeout(() => {
    activeTooltip.value = null;
  }, 100);
};

// Connection and node styling functions
const getConnectionColumnClass = (fromId, toId) => {
  const fromSefirah = sefirot.value.find((s) => s.id === fromId);
  const toSefirah = sefirot.value.find((s) => s.id === toId);
  if (fromSefirah.column === toSefirah.column) {
    return `path-${fromSefirah.column}`;
  }
  return "path-neutral";
};

const getActiveStrokeClass = (fromId, toId) => {
  const fromSefirah = sefirot.value.find((s) => s.id === fromId);
  const toSefirah = sefirot.value.find((s) => s.id === toId);
  if (fromSefirah.column === toSefirah.column) {
    switch (fromSefirah.column) {
      case "left":
        return "stroke-blue-500";
      case "right":
        return "stroke-yellow-500";
      case "center":
        return "stroke-green-500";
    }
  }
  return "stroke-white";
};

// Get node pulse class
const getNodePulseClass = (category, column) => {
  return `pulse-${column}`;
};

const getSefirahIcon = (id) => {
  const icons = {
    keter: "fa-crown", // Корона
    chokhmah: "fa-eye", // Око/искра
    binah: "fa-wine-glass", // Кубок
    chesed: "fa-hand-holding-heart", // Раскрытая ладонь
    gevurah: "fa-shield-alt", // Меч (using shield-alt for strength)
    tiferet: "fa-heart", // Сердце
    netzach: "fa-fire", // Факел
    hod: "fa-spa", // Лотос
    yesod: "fa-moon", // Луна
    malkhut: "fa-globe", // Земля
  };
  return icons[id] || "fa-circle";
};

// Get connection particle class
const getConnectionParticleClass = (columnType) => {
  switch (columnType) {
    case "left":
      return "fill-blue-300";
    case "right":
      return "fill-yellow-300";
    case "center":
      return "fill-green-300";
    default:
      return "fill-white";
  }
};

// Set active card
const setActiveCard = (id) => {
  activeCard.value = id;
};

// Scroll to Sefirah Card
const scrollToSefirah = (id) => {
  activeCard.value = id;
  setTimeout(() => {
    const element = document.getElementById(`sefirah-${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Add temporary highlight
      element.classList.add("ring-2");
      setTimeout(() => element.classList.remove("ring-2"), 2000);
    }
  }, 100);
};

// Get ring color for active card
const getRingColor = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "75, 85, 99";
  switch (sefirah.column) {
    case "left":
      return "59, 130, 246";
    case "right":
      return "234, 179, 8";
    case "center":
      return "34, 197, 94";
    default:
      return "75, 85, 99";
  }
};

// Label positioning
const getLabelX = (sefirah) => {
  if (sefirah.x < 160) return sefirah.x - 35;
  if (sefirah.x > 240) return sefirah.x + 35;
  return sefirah.x;
};

// Styling functions
const getNodeGlowClass = (id, column) => {
  switch (column) {
    case "left":
      return "fill-blue-400";
    case "right":
      return "fill-yellow-400";
    case "center":
      return "fill-green-400";
    default:
      return "fill-white";
  }
};

const getGlowFilter = (column) => {
  switch (column) {
    case "left":
      return "url(#pulse-left)";
    case "right":
      return "url(#pulse-right)";
    case "center":
      return "url(#pulse-center)";
    default:
      return "url(#glow)";
  }
};

const getNodeStrokeColor = (id, column) => {
  switch (column) {
    case "left":
      return "#3b82f6";
    case "right":
      return "#eab308";
    case "center":
      return "#22c55e";
    default:
      return "#4B5563";
  }
};

const getProgressBarClass = (id, column) => {
  switch (column) {
    case "left":
      return "bg-gradient-to-r from-blue-500 to-blue-300";
    case "right":
      return "bg-gradient-to-r from-yellow-500 to-yellow-300";
    case "center":
      return "bg-gradient-to-r from-green-500 to-green-300";
    default:
      return "bg-gray-600";
  }
};

const getCardProgressClass = (id, column) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah || sefirah.points === 0) return "bg-gray-800/50 text-gray-400";
  switch (column) {
    case "left":
      return "bg-blue-500/20 text-blue-300";
    case "right":
      return "bg-yellow-500/20 text-yellow-300";
    case "center":
      return "bg-green-500/20 text-green-300";
    default:
      return "bg-gray-800/50 text-gray-400";
  }
};

const getLevelBadgeClass = (column) => {
  switch (column) {
    case "left":
      return "bg-blue-500/20 text-blue-300";
    case "right":
      return "bg-yellow-500/20 text-yellow-300";
    case "center":
      return "bg-green-500/20 text-green-300";
    default:
      return "bg-gray-800/50 text-gray-400";
  }
};

const getTooltipLevelClass = (column) => {
  switch (column) {
    case "left":
      return "bg-blue-500/30 text-blue-100";
    case "right":
      return "bg-yellow-500/30 text-yellow-100";
    case "center":
      return "bg-green-500/30 text-green-100";
    default:
      return "bg-gray-800/50 text-gray-400";
  }
};

// Initialize Data
onMounted(async () => {
  if (isLoggedIn.value) {
    const userId = authStore.user.uid;
    await fetchSefirotProgress(
      userId,
      sefirot.value,
      applyDecay,
      calculateLevel,
      calculateDailyProgress
    );
  } else {
    // Demo data for non-logged-in users
    const demoDailyActions = [0, 1, 2, 0, 3, 1, 0, 2, 0, 1];
    const demoPoints = [400, 700, 300, 100, 500, 350, 200, 50, 600, 150];
    sefirot.value.forEach((s, index) => {
      s.points = demoPoints[index];
      s.level = calculateLevel(s.points);
      s.dailyActions = demoDailyActions[index];
      s.displayProgress = calculateDailyProgress(s.dailyActions, s.maxActions);
    });
  }

  // Set current week
  currentWeek.value =
    (Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 1)) /
        (1000 * 60 * 60 * 24 * 7)
    ) %
      10) +
    1;

  // Reset daily actions at midnight
  const checkMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow - now;
    setTimeout(async () => {
      if (isLoggedIn.value) {
        const userId = authStore.user.uid;
        const today = new Date().toISOString().split("T")[0];
        await initializeDailyActions(userId, today, sefirot.value);
        await fetchSefirotProgress(
          userId,
          sefirot.value,
          applyDecay,
          calculateLevel,
          calculateDailyProgress
        );
      } else {
        sefirot.value.forEach((s) => {
          s.dailyActions = 0;
          s.displayProgress = 0;
        });
      }
      setInterval(checkMidnight, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
  };
  checkMidnight();
});

// Watch for auth changes
watch(
  () => authStore.user,
  async (newUser) => {
    if (newUser) {
      await fetchSefirotProgress(
        newUser.uid,
        sefirot.value,
        applyDecay,
        calculateLevel,
        calculateDailyProgress
      );
    }
  }
);
</script>

<style scoped>
.path-line {
  stroke: rgba(255, 255, 255, 0.15);
  stroke-dasharray: 2, 2;
}
.path-left {
  stroke: rgba(59, 130, 246, 0.3);
}
.path-right {
  stroke: rgba(234, 179, 8, 0.3);
}
.path-center {
  stroke: rgba(34, 197, 94, 0.3);
}
.path-neutral {
  stroke: rgba(255, 255, 255, 0.15);
}
.active-path {
  stroke-dasharray: 5, 5;
  stroke-width: 2;
  stroke-opacity: 0.6;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

svg text {
  fill: currentColor;
  font-size: 10px;
}
@media (min-width: 768px) {
  svg text {
    font-size: 12px;
  }
}

[class*="ring-"] {
  --tw-ring-color: rgb(var(--ring-color));
  animation: pulseHighlight 2s ease;
}
@keyframes pulseHighlight {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--ring-color), 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(var(--ring-color), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--ring-color), 0);
  }
}

.node-circle {
  transition: r 0.3s ease, filter 0.3s ease;
  z-index: 5;
}
.node-circle:hover {
  filter: brightness(1.2);
}
.highlight-node {
  filter: brightness(1.5);
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 2;
  animation: glowPulse 1.5s ease-in-out infinite;
}
.pulse-left {
  filter: url(#pulse-left);
}
.pulse-right {
  filter: url(#pulse-right);
}
.pulse-center {
  filter: url(#pulse-center);
}
.descending-light {
  animation: lightFlow 15s linear infinite;
}
@keyframes lightFlow {
  0% {
    stroke-dasharray: 0, 1000;
  }
  100% {
    stroke-dasharray: 1000, 0;
  }
}
.tooltip-container {
  animation: fadeIn 0.2s ease-in;
  z-index: 10;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes glowPulse {
  0% {
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.1);
  }
}
svg {
  pointer-events: bounding-box;
}
section {
  position: relative;
  z-index: 1;
}
</style>
