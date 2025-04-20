<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6 xl:px-0">
      <h1 class="text-4xl font-bold text-center mb-8 text-white drop-shadow-sm">
        Колесо баланса
      </h1>

      <div class="flex flex-col lg:flex-row gap-10 items-center justify-center">
        <!-- Wheel Visualization -->
        <div
          class="lg:order-2 order-1 relative w-72 h-72 md:w-96 md:h-96 transition-all"
        >
          <div
            class="absolute inset-0 rounded-full bg-white/30 backdrop-blur-sm shadow-xl"
          ></div>
          <canvas
            ref="wheelCanvas"
            class="absolute inset-0 w-full h-full drop-shadow-lg z-10"
          ></canvas>

          <Transition name="fade">
            <div
              v-if="showRecommendation"
              class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div
                class="bg-white bg-opacity-95 p-5 rounded-xl shadow-lg max-w-xs text-center backdrop-blur-sm border border-indigo-100"
              >
                <p class="font-semibold text-indigo-700 mb-1">
                  {{ recommendationTitle }}
                </p>
                <p class="text-gray-700">{{ recommendationText }}</p>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Controls and Categories -->
        <div class="lg:order-1 order-2 w-full max-w-md">
          <div
            class="bg-white rounded-xl shadow-lg p-6 border border-indigo-100"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-800">
                Оцените сферы жизни
              </h2>
              <span
                class="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full"
              >
                1 - 10
              </span>
            </div>

            <div
              v-for="(category, index) in categories"
              :key="index"
              class="mb-5 group"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: category.color }"
                  ></div>
                  <label
                    :for="`category-${index}`"
                    class="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors"
                  >
                    {{ category.name }}
                  </label>
                </div>
                <span
                  class="text-sm font-bold px-2 py-1 rounded-md transition-colors"
                  :class="
                    category.score > 7
                      ? 'bg-green-100 text-green-800'
                      : category.score > 4
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ category.score }}/10
                </span>
              </div>
              <div class="relative">
                <input
                  :id="`category-${index}`"
                  v-model.number="category.score"
                  type="range"
                  min="1"
                  max="10"
                  class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-600 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300"
                  @input="updateWheel"
                />
                <div
                  class="flex justify-between text-xs text-gray-400 px-1 mt-1"
                >
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3 mt-8">
              <button
                @click="saveResults"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Сохранить результаты
              </button>

              <button
                @click="resetToDefault"
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Сбросить до значений по умолчанию
              </button>
            </div>

            <div
              v-if="lastSaved"
              class="mt-4 text-sm text-gray-500 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Последнее сохранение: {{ lastSaved }}
            </div>
          </div>
        </div>
      </div>

      <!-- Recommendations Section -->
      <Transition name="slide-fade">
        <div
          v-if="lowScoreCategories.length > 0"
          class="mt-12 bg-white rounded-xl shadow-lg p-6 border border-indigo-100"
        >
          <div class="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h2 class="text-2xl font-semibold text-indigo-800">
              Рекомендации для улучшения
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(category, index) in lowScoreCategories"
              :key="`rec-${index}`"
              class="bg-gray-50 p-5 rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow"
              :style="{ borderLeftColor: category.color }"
            >
              <div class="flex items-center gap-2 mb-2">
                <div
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <h3 class="font-medium text-gray-800">{{ category.name }}</h3>
              </div>

              <p class="text-gray-600 mb-4">
                {{ getRecommendationForCategory(category.name) }}
              </p>

              <div class="flex justify-between items-center">
                <span
                  class="text-xs font-medium py-1 px-2 rounded"
                  :class="
                    category.score > 3
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ category.score }}/10
                </span>
                <button
                  @click="
                    setCategoryScore(
                      category.name,
                      Math.min(10, category.score + 1)
                    )
                  "
                  class="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-800 py-1 px-3 rounded-full flex items-center gap-1 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Улучшить
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- History Chart Section -->
      <div
        v-if="historyData.length > 1"
        class="mt-12 bg-white rounded-xl shadow-lg p-6 border border-indigo-100"
      >
        <h2 class="text-2xl font-semibold text-indigo-800 mb-6">
          История изменений
        </h2>
        <div class="h-64 w-full">
          <canvas ref="historyCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

// Categories with initial scores
const categories = ref([
  { name: "Здоровье", score: 5, color: "#4F46E5" },
  { name: "Отношения", score: 5, color: "#10B981" },
  { name: "Карьера", score: 5, color: "#F59E0B" },
  { name: "Финансы", score: 5, color: "#EF4444" },
  { name: "Личностный рост", score: 5, color: "#8B5CF6" },
  { name: "Духовность", score: 5, color: "#EC4899" },
  { name: "Творчество", score: 5, color: "#14B8A6" },
  { name: "Отдых", score: 5, color: "#F97316" },
]);

const wheelCanvas = ref(null);
const historyCanvas = ref(null);
const showRecommendation = ref(false);
const recommendationTitle = ref("");
const recommendationText = ref("");
const lastSaved = ref(null);
const historyData = ref([]);

// Computed property for low score categories
const lowScoreCategories = computed(() => {
  return categories.value
    .filter((c) => c.score <= 5)
    .sort((a, b) => a.score - b.score);
});

// Recommendations for each category - enhanced with more specific suggestions
const recommendations = {
  Здоровье: [
    "Составьте план правильного питания на неделю с упором на свежие продукты",
    "Добавьте 30-минутную прогулку в ежедневный распорядок",
    "Создайте ритуал для улучшения сна: отключите экраны за час до сна",
    "Запишитесь на профилактический осмотр к врачу в этом месяце",
    "Установите напоминание пить воду каждые 2 часа",
  ],
  Отношения: [
    "Запланируйте еженедельное 'свидание' с партнером без гаджетов",
    "Напишите письмо благодарности близкому человеку",
    "Инициируйте глубокий разговор о целях и мечтах с партнером",
    "Организуйте встречу с другом, с которым давно не виделись",
    "Начните практиковать активное слушание в разговорах с близкими",
  ],
  Карьера: [
    "Запишите 3 конкретные профессиональные цели на ближайшие 3 месяца",
    "Посвятите 1 час в день изучению нового навыка, полезного для карьеры",
    "Найдите ментора в вашей области и запланируйте регулярные встречи",
    "Создайте портфолио ваших профессиональных достижений",
    "Пройдите онлайн-курс для повышения квалификации",
  ],
  Финансы: [
    "Создайте детальный бюджет на следующий месяц с конкретными категориями",
    "Автоматизируйте ежемесячные сбережения через банковский счет",
    "Изучите основы инвестирования и выберите инструмент для начала",
    "Пересмотрите свои подписки и откажитесь от неиспользуемых сервисов",
    "Составьте финансовый план на год с учетом крупных расходов",
  ],
  "Личностный рост": [
    "Начните вести дневник рефлексии с ежедневными записями",
    "Выделите 20 минут в день на чтение книг по саморазвитию",
    "Поставьте себе вызов выйти из зоны комфорта в течение недели",
    "Пройдите онлайн-тест на определение личностных качеств и сильных сторон",
    "Составьте план персонального развития на ближайшие 6 месяцев",
  ],
  Духовность: [
    "Начните день с 10-минутной медитации, используя приложение-гид",
    "Выделите время на прогулку на природе без гаджетов",
    "Исследуйте практики осознанности и внедрите одну в ежедневный распорядок",
    "Записывайте моменты благодарности каждый вечер",
    "Прочитайте книгу о философии или духовных практиках",
  ],
  Творчество: [
    "Выделите 'творческий час' в своем еженедельном расписании",
    "Запишитесь на мастер-класс по новому творческому навыку",
    "Создайте коллекцию вдохновляющих идей и образов",
    "Начните творческий проект, который вы давно откладывали",
    "Установите еженедельную цель по созданию чего-то нового",
  ],
  Отдых: [
    "Блокируйте в календаре 'время для себя' как обязательные встречи",
    "Создайте список дел, которые вас по-настоящему расслабляют",
    "Запланируйте мини-путешествие на выходные",
    "Внедрите вечерний ритуал расслабления перед сном",
    "Практикуйте технику 'цифрового детокса' на один день в неделю",
  ],
};

// Get recommendation for a category - improved to be deterministic based on score
const getRecommendationForCategory = (categoryName) => {
  const categoryRecs = recommendations[categoryName] || [];
  if (categoryRecs.length === 0) return "Нет рекомендаций";

  const category = categories.value.find((c) => c.name === categoryName);
  if (!category) return categoryRecs[0];

  // Use score to determine which recommendation to show
  const index = Math.min(
    Math.floor((10 - category.score) / 2),
    categoryRecs.length - 1
  );

  return categoryRecs[index];
};

// Draw animated wheel
const drawWheel = (animated = false) => {
  const canvas = wheelCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const segmentCount = categories.value.length;
  const segmentAngle = (2 * Math.PI) / segmentCount;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw segments
  categories.value.forEach((category, index) => {
    const startAngle = index * segmentAngle - Math.PI / 2;
    const endAngle = (index + 1) * segmentAngle - Math.PI / 2;

    // Draw guide circles
    for (let i = 1; i <= 10; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 10) * i, 0, 2 * Math.PI);
      ctx.strokeStyle = i % 2 === 0 ? "#e5e7eb" : "#f3f4f6";
      ctx.lineWidth = i % 5 === 0 ? 1 : 0.5;
      ctx.stroke();
    }

    // Segment background
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = `${category.color}10`; // 10% opacity
    ctx.fill();

    // Draw segment divider lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(startAngle) * radius,
      centerY + Math.sin(startAngle) * radius
    );
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Animation logic for score rendering
    let scoreToRender = category.score;
    if (animated) {
      // Start from 1 and animate to actual score
      scoreToRender = 1;
      const animateScore = () => {
        if (scoreToRender < category.score) {
          scoreToRender += 0.1;

          // Redraw this segment
          drawSegmentScore(
            category,
            index,
            scoreToRender,
            centerX,
            centerY,
            radius,
            segmentAngle,
            ctx
          );

          requestAnimationFrame(animateScore);
        } else {
          // Finalize with exact score
          drawSegmentScore(
            category,
            index,
            category.score,
            centerX,
            centerY,
            radius,
            segmentAngle,
            ctx
          );
        }
      };

      setTimeout(() => {
        animateScore();
      }, index * 100); // Stagger animations
    } else {
      // Immediate rendering without animation
      drawSegmentScore(
        category,
        index,
        scoreToRender,
        centerX,
        centerY,
        radius,
        segmentAngle,
        ctx
      );
    }

    // Category name with better positioning
    const textAngle = startAngle + segmentAngle / 2;
    const textRadius = radius + 30;
    const textX = centerX + Math.cos(textAngle) * textRadius;
    const textY = centerY + Math.sin(textAngle) * textRadius;

    ctx.save();
    ctx.translate(textX, textY);

    // Rotate text based on position to make it more readable
    let rotation = textAngle;
    if (textAngle > Math.PI / 2 && textAngle < (3 * Math.PI) / 2) {
      rotation += Math.PI;
    }
    ctx.rotate(rotation);

    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#374151";
    ctx.fillText(category.name, 0, 0);
    ctx.restore();
  });

  // Check if we need to show recommendations
  showRecommendation.value = lowScoreCategories.value.length > 0;

  if (lowScoreCategories.value.length > 0) {
    const lowestCategory = lowScoreCategories.value[0];
    recommendationTitle.value = `Совет для "${lowestCategory.name}"`;
    recommendationText.value = getRecommendationForCategory(
      lowestCategory.name
    );
  }
};

// Helper function to draw segment score
const drawSegmentScore = (
  category,
  index,
  score,
  centerX,
  centerY,
  radius,
  segmentAngle,
  ctx
) => {
  const startAngle = index * segmentAngle - Math.PI / 2;
  const endAngle = (index + 1) * segmentAngle - Math.PI / 2;

  // Calculate radius based on score
  const scoreRadius = radius * (score / 10);

  // Draw filled segment based on score
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, scoreRadius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = category.color;
  ctx.fill();

  // Add subtle gradient overlay for depth
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    scoreRadius
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, scoreRadius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
};

// Draw history chart
const drawHistoryChart = () => {
  if (historyData.value.length <= 1 || !historyCanvas.value) return;

  const canvas = historyCanvas.value;
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  // Draw axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw y-axis labels
  for (let i = 0; i <= 10; i += 2) {
    const y = canvas.height - padding - (i / 10) * chartHeight;

    ctx.beginPath();
    ctx.moveTo(padding - 5, y);
    ctx.lineTo(padding, y);
    ctx.strokeStyle = "#9ca3af";
    ctx.stroke();

    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(i.toString(), padding - 10, y);
  }

  // Calculate horizontal spacing
  const entryCount = historyData.value.length;
  const xStep = chartWidth / (entryCount - 1);

  // Draw data for each category
  categories.value.forEach((category) => {
    ctx.beginPath();

    historyData.value.forEach((entry, index) => {
      const categoryData = entry.categories.find(
        (c) => c.name === category.name
      );
      if (!categoryData) return;

      const x = padding + index * xStep;
      const y =
        canvas.height - padding - (categoryData.score / 10) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = category.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add dots for data points
    historyData.value.forEach((entry, index) => {
      const categoryData = entry.categories.find(
        (c) => c.name === category.name
      );
      if (!categoryData) return;

      const x = padding + index * xStep;
      const y =
        canvas.height - padding - (categoryData.score / 10) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = category.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  });

  // Draw x-axis labels (dates)
  historyData.value.forEach((entry, index) => {
    const x = padding + index * xStep;

    ctx.beginPath();
    ctx.moveTo(x, canvas.height - padding);
    ctx.lineTo(x, canvas.height - padding + 5);
    ctx.strokeStyle = "#9ca3af";
    ctx.stroke();

    // Format date for display
    const date = new Date(entry.timestamp);
    const dateLabel = `${date.getDate()}.${date.getMonth() + 1}`;

    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(dateLabel, x, canvas.height - padding + 10);
  });

  // Draw legend
  const legendY = padding / 2;
  let legendX = padding;

  categories.value.forEach((category) => {
    // Color box
    ctx.fillStyle = category.color;
    ctx.fillRect(legendX, legendY - 5, 10, 10);

    // Category name
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#4b5563";
    ctx.fillText(category.name, legendX + 15, legendY);

    legendX += ctx.measureText(category.name).width + 30;
  });
};

// Update wheel visualization with animation
const updateWheel = () => {
  drawWheel();
};

// Set score for specific category
const setCategoryScore = (name, score) => {
  const category = categories.value.find((c) => c.name === name);
  if (category) {
    category.score = Math.max(1, Math.min(10, score));
    updateWheel();
  }
};

// Reset to default values
const resetToDefault = () => {
  categories.value.forEach((category) => {
    category.score = 5;
  });
  updateWheel();
};

// Save results to localStorage with history tracking
const saveResults = () => {
  const now = new Date();
  lastSaved.value = now.toLocaleString();

  // Create history entry
  const historyEntry = {
    timestamp: now.getTime(),
    categories: JSON.parse(JSON.stringify(categories.value)),
    dateFormatted: lastSaved.value,
  };

  // Load existing history
  let history = [];
  try {
    const savedHistory = localStorage.getItem("wheelOfLifeHistory");
    if (savedHistory) {
      history = JSON.parse(savedHistory);
    }
  } catch (e) {
    console.error("Error loading history:", e);
  }

  // Add new entry and save history
  history.push(historyEntry);

  // Limit history to last 10 entries
  if (history.length > 10) {
    history = history.slice(-10);
  }

  // Update history data
  historyData.value = history;

  // Save to localStorage
  localStorage.setItem(
    "wheelOfLifeData",
    JSON.stringify({
      categories: categories.value,
      lastSaved: lastSaved.value,
    })
  );

  localStorage.setItem("wheelOfLifeHistory", JSON.stringify(history));

  // Update history chart
  drawHistoryChart();

  // Show success message
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: "Результаты успешно сохранены!",
  });
};

// Load saved data
const loadSavedData = () => {
  try {
    // Load wheel data
    const savedData = localStorage.getItem("wheelOfLifeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Update each category individually to preserve colors
      parsedData.categories.forEach((savedCategory) => {
        const category = categories.value.find(
          (c) => c.name === savedCategory.name
        );
        if (category) {
          category.score = savedCategory.score;
        }
      });

      lastSaved.value = parsedData.lastSaved;
    }

    // Load history data
    const savedHistory = localStorage.getItem("wheelOfLifeHistory");
    if (savedHistory) {
      historyData.value = JSON.parse(savedHistory);
    }
  } catch (e) {
    console.error("Error loading saved data:", e);
  }
};

// Watch for changes to update recommendations
watch(
  () => lowScoreCategories.value,
  (newVal) => {
    showRecommendation.value = newVal.length > 0;
    if (newVal.length > 0) {
      const lowestCategory = newVal[0];
      recommendationTitle.value = `Совет для "${lowestCategory.name}"`;
      recommendationText.value = getRecommendationForCategory(
        lowestCategory.name
      );
    }
  },
  { deep: true }
);

// Initialize
onMounted(() => {
  // Check if SweetAlert2 is available
  if (typeof window !== "undefined" && !window.Swal) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(script);
  }

  // Set canvas size
  const canvas = wheelCanvas.value;
  if (canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // Set history canvas size
  const histCanvas = historyCanvas.value;
  if (histCanvas) {
    histCanvas.width = histCanvas.offsetWidth;
    histCanvas.height = histCanvas.offsetHeight;
  }

  // Load saved data
  loadSavedData();

  // Draw initial wheel with animation
  drawWheel(true);

  // Draw history chart
  setTimeout(() => {
    drawHistoryChart();
  }, 500);

  // Add window resize handler
  window.addEventListener("resize", () => {
    // Redraw wheel
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawWheel();
    }

    // Redraw history chart
    if (histCanvas) {
      histCanvas.width = histCanvas.offsetWidth;
      histCanvas.height = histCanvas.offsetHeight;
      drawHistoryChart();
    }
  });
});
</script>

<style scoped>
/* Custom range slider */
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #4f46e5;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #4f46e5;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
  transition: all 0.2s ease;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
