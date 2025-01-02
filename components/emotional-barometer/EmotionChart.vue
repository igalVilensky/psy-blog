<!-- components/EmotionChart.vue -->
<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mx-auto">
    <canvas
      ref="emotionGraph"
      :width="width"
      :height="height"
      class="w-full"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  entries: {
    type: Array,
    required: true,
  },
  emotions: {
    type: Array,
    required: true,
  },
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 400,
  },
});

const emotionGraph = ref(null);
let chart = null;

// Modern color palette with better contrast and accessibility
const colorMap = {
  "yellow-100": "rgba(253, 224, 71, 0.8)",
  "blue-100": "rgba(59, 130, 246, 0.8)",
  "purple-100": "rgba(167, 139, 250, 0.8)",
  "red-100": "rgba(248, 113, 113, 0.8)",
  "green-100": "rgba(110, 231, 183, 0.8)",
};

const getColorFromEmotion = (emotionName) => {
  const emotion = props.emotions.find((e) => e.name === emotionName);
  if (emotion?.color) {
    const colorClass = emotion.color.split("-").slice(1).join("-");
    return colorMap[colorClass] || "#64748b"; // Default slate color
  }
  return "#64748b";
};

const processChartData = () => {
  // Group entries by date
  const groupedData = props.entries.reduce((acc, entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][entry.emotion]) {
      acc[date][entry.emotion] = 0;
    }
    acc[date][entry.emotion]++;
    return acc;
  }, {});

  // Convert to Chart.js format
  const labels = Object.keys(groupedData).sort();
  const datasets = props.emotions.map((emotion) => ({
    label: emotion.name,
    data: labels.map((date) => groupedData[date][emotion.name] || 0),
    backgroundColor: getColorFromEmotion(emotion.name),
    borderColor: getColorFromEmotion(emotion.name).replace("0.8", "1"),
    borderWidth: 1,
    borderRadius: 4,
  }));

  return { labels, datasets };
};

const initChart = () => {
  const ctx = emotionGraph.value?.getContext("2d");
  if (!ctx) return;

  const { labels, datasets } = processChartData();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              family: "'Inter', sans-serif",
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#1f2937",
          bodyColor: "#4b5563",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ${context.parsed.y} entries`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: "'Inter', sans-serif",
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#f3f4f6",
          },
          ticks: {
            stepSize: 1,
            font: {
              family: "'Inter', sans-serif",
              size: 12,
            },
          },
        },
      },
    },
  });
};

const updateChart = () => {
  if (!chart) return;

  const { labels, datasets } = processChartData();
  chart.data.labels = labels;
  chart.data.datasets = datasets;
  chart.update();
};

// Watch for changes in entries and update the chart
watch(() => props.entries, updateChart, { deep: true });
watch(() => props.emotions, updateChart, { deep: true });

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>
