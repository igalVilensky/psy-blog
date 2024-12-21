<template>
  <div
    class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-6 sm:py-12"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Emotional Barometer Section -->
        <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4A4238]">
            Эмоциональный Барометр
          </h2>

          <!-- Emotion Selection -->
          <div
            class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6"
          >
            <button
              v-for="emotion in emotions"
              :key="emotion.id"
              @click="selectEmotion(emotion)"
              :class="[
                'py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm',
                selectedEmotion?.id === emotion.id
                  ? `${emotion.activeColor} text-white`
                  : `${emotion.color} hover:opacity-80`,
              ]"
            >
              {{ emotion.name }}
            </button>
          </div>

          <!-- Intensity Slider -->
          <div v-if="selectedEmotion" class="mb-4 sm:mb-6">
            <label class="block mb-2 text-sm sm:text-base text-[#6B5B4C]">
              Интенсивность эмоции: {{ intensityLevel }}/10
            </label>
            <input
              type="range"
              v-model="intensityLevel"
              min="1"
              max="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <!-- Journal Entry Form -->
          <div v-if="selectedEmotion" class="mt-4 sm:mt-6">
            <textarea
              v-model="journalEntry"
              placeholder="Что вызвало эту эмоцию? Какие мысли?"
              class="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              rows="4"
            ></textarea>

            <!-- Life Sphere Tags -->
            <div class="mt-3 sm:mt-4">
              <label class="block mb-2 text-sm sm:text-base text-[#6B5B4C]">
                В какой сфере жизни это происходит?
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="sphere in lifeSpheres"
                  :key="sphere.name"
                  @click="toggleTag(sphere.name)"
                  :class="[
                    'px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm transition-all',
                    selectedTags.includes(sphere.name)
                      ? sphere.activeColor
                      : sphere.color,
                    selectedTags.includes(sphere.name)
                      ? 'text-white'
                      : 'text-gray-700',
                  ]"
                >
                  {{ sphere.name }}
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              @click="saveEntry"
              class="w-full mt-3 sm:mt-4 bg-[#FF6B6B] text-white py-2 sm:py-3 rounded-lg hover:bg-[#FF5252] transition text-sm sm:text-base"
            >
              Сохранить запись
            </button>

            <!-- Recommendations -->
            <div
              v-if="currentRecommendations.length"
              class="mt-4 p-4 bg-blue-50 rounded-lg"
            >
              <h3 class="font-semibold mb-2 text-blue-800">Рекомендации:</h3>
              <ul class="list-disc pl-4 space-y-1">
                <li
                  v-for="(rec, index) in currentRecommendations"
                  :key="index"
                  class="text-sm text-blue-700"
                >
                  {{ rec }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Analysis Section -->
        <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4A4238]">
            Анализ Эмоций
          </h2>

          <!-- Emotion Patterns -->
          <div class="space-y-4">
            <div
              v-for="(pattern, emotion) in emotionPatterns"
              :key="emotion"
              class="p-4 bg-gray-50 rounded-lg"
            >
              <h3 class="font-semibold text-[#4A4238]">{{ emotion }}</h3>
              <div class="mt-2 space-y-1 text-sm">
                <p>Частота: {{ pattern.count }} раз</p>
                <p>
                  Средняя интенсивность:
                  {{ pattern.avgIntensity.toFixed(1) }}/10
                </p>
                <div v-if="Object.keys(pattern.commonSpheres).length">
                  <p class="font-medium">Чаще всего в сферах:</p>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="(count, sphere) in pattern.commonSpheres"
                      :key="sphere"
                      class="text-xs px-2 py-1 bg-white rounded"
                    >
                      {{ sphere }} ({{ count }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Journal History Section -->
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
                  {{ formatDate(entry.date) }}
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const emotions = [
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-yellow-500",
  },
  {
    id: 2,
    name: "Тревога",
    color: "bg-purple-100",
    activeColor: "bg-purple-500",
  },
  { id: 3, name: "Злость", color: "bg-red-100", activeColor: "bg-red-500" },
  { id: 4, name: "Грусть", color: "bg-blue-100", activeColor: "bg-blue-500" },
  {
    id: 5,
    name: "Вдохновение",
    color: "bg-green-100",
    activeColor: "bg-green-500",
  },
  {
    id: 6,
    name: "Спокойствие",
    color: "bg-teal-100",
    activeColor: "bg-teal-500",
  },
];

const lifeSpheres = [
  { name: "Работа", color: "bg-blue-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Семья", color: "bg-green-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Здоровье", color: "bg-purple-100", activeColor: "bg-[#FF6B6B]" },
  {
    name: "Личностный рост",
    color: "bg-yellow-100",
    activeColor: "bg-[#FF6B6B]",
  },
  { name: "Отношения", color: "bg-pink-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Хобби", color: "bg-orange-100", activeColor: "bg-[#FF6B6B]" },
];

const selectedEmotion = ref(null);
const intensityLevel = ref(5);
const journalEntry = ref("");
const selectedTags = ref([]);
const entries = ref([]);
const emotionFilter = ref("");
const sphereFilter = ref("");

// Load entries from localStorage
onMounted(() => {
  const storedEntries = localStorage.getItem("emotionalEntries");
  if (storedEntries) {
    entries.value = JSON.parse(storedEntries);
  }
});

const selectEmotion = (emotion) => {
  selectedEmotion.value = emotion;
};

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const getTagColor = (tagName) => {
  const sphere = lifeSpheres.find((s) => s.name === tagName);
  return sphere ? sphere.color : "bg-gray-100";
};

const saveEntry = () => {
  if (!selectedEmotion.value) return;

  const newEntry = {
    emotion: selectedEmotion.value.name,
    intensity: intensityLevel.value,
    entry: journalEntry.value,
    tags: [...selectedTags.value],
    date: new Date().toISOString(),
  };

  entries.value.unshift(newEntry);
  localStorage.setItem("emotionalEntries", JSON.stringify(entries.value));

  // Reset form
  selectedEmotion.value = null;
  intensityLevel.value = 5;
  journalEntry.value = "";
  selectedTags.value = [];
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const filteredEntries = computed(() => {
  return entries.value.filter(
    (entry) =>
      (!emotionFilter.value || entry.emotion === emotionFilter.value) &&
      (!sphereFilter.value || entry.tags.includes(sphereFilter.value))
  );
});

// Emotion pattern analysis
const emotionPatterns = computed(() => {
  const patterns = entries.value.reduce((acc, entry) => {
    if (!acc[entry.emotion]) {
      acc[entry.emotion] = {
        count: 0,
        avgIntensity: 0,
        commonSpheres: {},
      };
    }
    acc[entry.emotion].count++;
    acc[entry.emotion].avgIntensity += entry.intensity;
    entry.tags.forEach((tag) => {
      acc[entry.emotion].commonSpheres[tag] =
        (acc[entry.emotion].commonSpheres[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Calculate averages
  Object.keys(patterns).forEach((emotion) => {
    patterns[emotion].avgIntensity /= patterns[emotion].count;
  });

  return patterns;
});

// Recommendations based on patterns
const currentRecommendations = computed(() => {
  if (!selectedEmotion.value) return [];

  const recommendations = {
    Тревога: [
      "Попробуйте дыхательные упражнения (4-7-8)",
      "Запишите свои мысли и попробуйте их оспорить",
      "Совершите короткую прогулку на свежем воздухе",
    ],
    Злость: [
      "Сделайте паузу перед реакцией",
      "Выполните физические упражнения",
      "Переключитесь на другую активность",
    ],
    Грусть: [
      "Поговорите с близким человеком",
      "Сделайте что-то приятное для себя",
      "Вспомните хорошие моменты",
    ],
  };

  return recommendations[selectedEmotion.value.name] || [];
});
</script>
