<template>
  <div class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Цифровой дневник эмоций
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Превратите ваши эмоции в цветущее дерево. Каждая запись помогает ему
          расти и раскрывает новые сюрпризы.
        </p>
      </section>

      <!-- Main Content Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Left Column - Diary Entry -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Новая запись</h2>
          <form @submit.prevent="handleSubmitEntry">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2"
                >Как вы себя чувствуете?</label
              >
              <div class="flex flex-wrap gap-3 mb-4">
                <button
                  v-for="emotion in emotions"
                  :key="emotion.name"
                  type="button"
                  @click="() => (selectedEmotion = emotion)"
                  :class="[
                    'px-4 py-2 rounded-full transition-all duration-300',
                    selectedEmotion?.name === emotion.name
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-pink-100',
                  ]"
                >
                  {{ emotion.emoji }} {{ emotion.name }}
                </button>
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 mb-2">Опишите свои мысли</label>
              <textarea
                v-model="diaryEntry"
                rows="4"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                placeholder="Что вызвало эти эмоции?"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'w-full px-6 py-3 rounded-lg transition',
                isFormValid
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              {{
                isFormValid
                  ? "Сохранить запись"
                  : "Выберите эмоцию и добавьте текст"
              }}
            </button>
          </form>

          <!-- Progress Stats -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-2">Ваш прогресс</h3>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-gray-600">Записей: {{ entriesCount }}</p>
                <p class="text-gray-600">
                  До следующего сюрприза: {{ remainingForSurprise }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm text-pink-600">
                  Уровень роста: {{ treeLevel }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Tree Visualization -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <!-- Added wrapper div with fixed aspect ratio -->
          <div class="relative w-full" style="padding-bottom: 100%">
            <div class="absolute inset-0">
              <svg
                class="w-full h-full"
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid meet"
                :class="{ 'tree-animation': showTreeAnimation }"
              >
                <!-- Tree Base - Adjusted path for square viewport -->
                <path
                  :d="'M200,350 Q200,200 250,150 T200,50'"
                  fill="none"
                  stroke="#8B4513"
                  stroke-width="4"
                />

                <!-- Emotion Leaves -->
                <g v-for="(leaf, index) in treeLeaves" :key="index">
                  <circle
                    :cx="leaf.x"
                    :cy="leaf.y"
                    :r="leaf.size"
                    :fill="leaf.color"
                    class="leaf-animation"
                  >
                    <title>{{ leaf.emotion }}</title>
                  </circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Entries -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Недавние записи</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="entry in recentEntries"
            :key="entry.id"
            class="bg-white rounded-xl shadow-lg p-4"
          >
            <div class="flex items-center mb-3">
              <span class="text-2xl mr-2">{{ entry.emotion.emoji }}</span>
              <span class="text-gray-700">{{ entry.emotion.name }}</span>
            </div>
            <p class="text-gray-600">{{ entry.text }}</p>
            <div class="mt-3 text-sm text-gray-500">
              {{ formatDate(entry.date) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emotions = [
  { name: "Радость", emoji: "😊", color: "#FFD700" },
  { name: "Спокойствие", emoji: "😌", color: "#98FB98" },
  { name: "Грусть", emoji: "😢", color: "#87CEEB" },
  { name: "Злость", emoji: "😠", color: "#FF6B6B" },
  { name: "Вдохновение", emoji: "✨", color: "#DDA0DD" },
  { name: "Благодарность", emoji: "🙏", color: "#FFB6C1" },
];

const selectedEmotion = ref(null);
const diaryEntry = ref("");
const entriesCount = ref(15);
const treeLevel = ref("Цветущее");
const showTreeAnimation = ref(false);
const treeLeaves = ref([]);

const isFormValid = computed(() => {
  return selectedEmotion.value && diaryEntry.value.trim().length > 0;
});

const remainingForSurprise = computed(() => {
  return 5 - (entriesCount.value % 5);
});

// Sample tree data
const treePath = "M200,500 Q200,300 250,200 T200,100";

const recentEntries = ref([
  {
    id: 1,
    emotion: emotions[0],
    text: "Сегодня был замечательный день! Столько всего успела сделать.",
    date: new Date(),
  },
  {
    id: 2,
    emotion: emotions[4],
    text: "Нашла отличную идею для нового проекта.",
    date: new Date(Date.now() - 86400000),
  },
  {
    id: 3,
    emotion: emotions[1],
    text: "Медитация помогла справиться со стрессом.",
    date: new Date(Date.now() - 172800000),
  },
]);

const handleSubmitEntry = () => {
  if (!isFormValid.value) return;

  // Add new entry
  entriesCount.value++;

  // Add new leaf to tree
  const newLeaf = {
    x: 150 + Math.random() * 100,
    y: 100 + Math.random() * 200,
    size: 8 + Math.random() * 5,
    color: selectedEmotion.value.color,
    emotion: selectedEmotion.value.name,
  };
  treeLeaves.value.push(newLeaf);

  // Add to recent entries
  recentEntries.value.unshift({
    id: Date.now(),
    emotion: selectedEmotion.value,
    text: diaryEntry.value,
    date: new Date(),
  });

  if (recentEntries.value.length > 3) {
    recentEntries.value.pop();
  }

  // Reset form
  selectedEmotion.value = null;
  diaryEntry.value = "";
  showTreeAnimation.value = true;

  // Reset animation
  setTimeout(() => {
    showTreeAnimation.value = false;
  }, 1000);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
};
</script>

<style scoped>
.leaf-animation {
  animation: growLeaf 0.5s ease-out;
}

.tree-animation {
  animation: growTree 1s ease-out;
}

@keyframes growLeaf {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes growTree {
  from {
    opacity: 0.5;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
