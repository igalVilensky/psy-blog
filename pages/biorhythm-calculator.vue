<template>
  <div
    class="flex flex-col items-center justify-start bg-gradient-to-br from-pink-50 to-white min-h-screen"
  >
    <h1 class="text-3xl font-bold text-gray-800 mb-8 mt-24">
      Калькулятор биоритмов
    </h1>

    <!-- Date Input -->
    <div class="mb-8">
      <label class="block text-gray-700 mb-2"
        >Введите вашу дату рождения:</label
      >
      <input
        type="date"
        v-model="birthDate"
        class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Results Display -->
    <div v-if="birthDate" class="w-full max-w-4xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          v-for="cycle in cycles"
          :key="cycle.name"
          class="bg-white rounded-lg shadow p-4"
        >
          <h3 class="text-lg font-semibold mb-2">{{ cycle.name }}</h3>
          <div
            class="text-3xl font-bold"
            :class="getValueColor(getCurrentValue(cycle.days))"
          >
            {{ (getCurrentValue(cycle.days) * 100).toFixed(1) }}%
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-white rounded-lg shadow p-4">
        <canvas ref="chartRef" class="w-full h-64"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const birthDate = ref("");
const chartRef = ref(null);
let chart = null;

const cycles = [
  { name: "Physical", days: 23, color: "rgb(255, 99, 132)" },
  { name: "Emotional", days: 28, color: "rgb(54, 162, 235)" },
  { name: "Intellectual", days: 33, color: "rgb(75, 192, 192)" },
];

const calculateDaysSinceBirth = (date) => {
  const birth = new Date(date);
  const today = new Date();
  return Math.floor((today - birth) / (1000 * 60 * 60 * 24));
};

const calculateBiorhythm = (days, cycleDays) => {
  return Math.sin((2 * Math.PI * days) / cycleDays);
};

const getCurrentValue = (cycleDays) => {
  if (!birthDate.value) return 0;
  const days = calculateDaysSinceBirth(birthDate.value);
  return calculateBiorhythm(days, cycleDays);
};

const getValueColor = (value) => {
  if (value > 0.5) return "text-green-600";
  if (value < -0.5) return "text-red-600";
  return "text-yellow-600";
};

const generateChartData = () => {
  const data = {
    labels: [],
    datasets: cycles.map((cycle) => ({
      label: cycle.name,
      data: [],
      borderColor: cycle.color,
      fill: false,
      tension: 0.4,
    })),
  };

  const days = calculateDaysSinceBirth(birthDate.value);

  // Generate data for 15 days before and after current date
  for (let i = -15; i <= 15; i++) {
    data.labels.push(i === 0 ? "Today" : i > 0 ? `+${i}d` : `${i}d`);

    cycles.forEach((cycle, index) => {
      const value = calculateBiorhythm(days + i, cycle.days);
      data.datasets[index].data.push(value);
    });
  }

  return data;
};

const updateChart = () => {
  if (!birthDate.value) return;

  const data = generateChartData();

  if (chart) {
    chart.destroy();
  }

  const ctx = chartRef.value.getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          min: -1,
          max: 1,
          ticks: {
            callback: (value) => `${(value * 100).toFixed(0)}%`,
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y;
              return `${context.dataset.label}: ${(value * 100).toFixed(1)}%`;
            },
          },
        },
      },
    },
  });
};

watch(birthDate, () => {
  if (chartRef.value) {
    updateChart();
  }
});

onMounted(() => {
  if (birthDate.value) {
    updateChart();
  }
});
</script>
