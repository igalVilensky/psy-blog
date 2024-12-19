<template>
  <div
    class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-6 sm:py-12"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                  ? 'bg-[#FF6B6B] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
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
                  v-for="tag in lifeSpheres"
                  :key="tag"
                  @click="toggleTag(tag)"
                  :class="[
                    'px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm',
                    selectedTags.includes(tag)
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  {{ tag }}
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
              <option v-for="tag in lifeSpheres" :key="tag">
                {{ tag }}
              </option>
            </select>
          </div>

          <!-- Journal Entries List -->
          <div class="space-y-4 max-h-[50vh] overflow-y-auto">
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
                  class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-2"
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
// The script remains the same as in the original code
const emotions = [
  { id: 1, name: "Радость" },
  { id: 2, name: "Тревога" },
  { id: 3, name: "Злость" },
  { id: 4, name: "Грусть" },
  { id: 5, name: "Вдохновение" },
  { id: 6, name: "Спокойствие" },
];

const lifeSpheres = [
  "Работа",
  "Семья",
  "Здоровье",
  "Личностный рост",
  "Отношения",
  "Хобби",
];

const selectedEmotion = ref(null);
const intensityLevel = ref(5);
const journalEntry = ref("");
const selectedTags = ref([]);
const entries = ref([]);
const emotionFilter = ref("");
const sphereFilter = ref("");

// Lifecycle hook to load entries from localStorage
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

  // Save to localStorage
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
</script>
