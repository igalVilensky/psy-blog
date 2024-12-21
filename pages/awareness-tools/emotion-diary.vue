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
        <button
          @click="resetTree"
          class="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Сбросить дерево
        </button>
      </section>

      <!-- Surprise Modal -->
      <div
        v-if="showSurpriseModal"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          class="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 relative z-10"
        >
          <h3 class="text-2xl font-bold text-gray-800 mb-4">🎉 Сюрприз!</h3>
          <p class="text-lg text-gray-700">{{ currentSurpriseMessage }}</p>
          <button
            @click="showSurpriseModal = false"
            class="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Замечательно!
          </button>
        </div>
      </div>

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
                  v-for="emotion in unlockedEmotions"
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
          <div class="relative w-full" style="padding-bottom: 100%">
            <div class="absolute inset-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                <!-- Tree trunk with texture -->
                <path
                  d="M190 350 
           C 185 280, 175 250, 180 200
           C 185 150, 195 120, 190 100
           L 210 100
           C 205 120, 215 150, 220 200
           C 225 250, 215 280, 210 350 Z"
                  fill="#8B4513"
                />

                <!-- Bark texture -->
                <path
                  d="M195 300 C 190 280, 205 260, 200 240"
                  fill="none"
                  stroke="#6B3E26"
                  stroke-width="2"
                />
                <path
                  d="M205 280 C 200 260, 215 240, 210 220"
                  fill="none"
                  stroke="#6B3E26"
                  stroke-width="2"
                />

                <!-- Branch structure -->
                <path
                  d="M200 150 L 150 120"
                  fill="none"
                  stroke="#8B4513"
                  stroke-width="8"
                />
                <path
                  d="M200 150 L 250 120"
                  fill="none"
                  stroke="#8B4513"
                  stroke-width="8"
                />
                <path
                  d="M200 200 L 140 180"
                  fill="none"
                  stroke="#8B4513"
                  stroke-width="8"
                />
                <path
                  d="M200 200 L 260 180"
                  fill="none"
                  stroke="#8B4513"
                  stroke-width="8"
                />

                <!-- Dynamic leaves will be added here by Vue -->
                <g id="leaves-container">
                  <path
                    v-for="(leaf, index) in treeLeaves"
                    :key="leaf.id"
                    Add
                    unique
                    ID
                    for
                    each
                    leaf
                    :d="leaf.pathData"
                    :fill="leaf.color"
                    :class="{
                      'leaf-animation': leaf.isNew,
                      'golden-leaf': leaf.special === 'golden',
                    }"
                    :style="`transform-origin: ${leaf.x}px ${leaf.y}px; transform:
                  rotate(${leaf.rotation}deg);`"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements Section -->
      <div class="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Достижения</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex items-center">
              <span class="text-2xl mr-2">🏆</span>
              <div>
                <p class="font-medium text-gray-800">{{ achievement.title }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(achievement.date) }}
                </p>
              </div>
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
import { ref, computed, onMounted, watch } from "vue";
import confetti from "canvas-confetti";

// Base emotions
const emotions = [
  { name: "Радость", emoji: "😊", color: "#FFD700" },
  { name: "Спокойствие", emoji: "😌", color: "#98FB98" },
  { name: "Грусть", emoji: "😢", color: "#87CEEB" },
  { name: "Злость", emoji: "😠", color: "#FF6B6B" },
  { name: "Вдохновение", emoji: "✨", color: "#DDA0DD" },
  { name: "Благодарность", emoji: "🙏", color: "#FFB6C1" },
];

// Advanced emotions (unlocked later)
const advancedEmotions = [
  { name: "Восторг", emoji: "🌟", color: "#FFA500" },
  { name: "Умиротворение", emoji: "🌸", color: "#E6E6FA" },
  { name: "Надежда", emoji: "🌈", color: "#98FF98" },
];

// Tree styles
const treeStyles = [
  { name: "classic", path: "M200,350 Q200,200 250,150 T200,50" },
  { name: "weeping", path: "M200,350 Q160,200 120,150 T200,50" },
  { name: "spiral", path: "M200,350 Q250,250 200,150 T250,50" },
];

// State management
const selectedEmotion = ref(null);
const diaryEntry = ref("");
const entriesCount = ref(0);
const treeLevel = ref("Цветущее");
const showTreeAnimation = ref(false);
const treeLeaves = ref([]);
const recentEntries = ref([]);
const currentTreeStyle = ref(treeStyles[0]);
const unlockedEmotions = ref([...emotions]);
const achievements = ref([]);
const showSurpriseModal = ref(false);
const currentSurpriseMessage = ref("");
const flowers = ref([]);
const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FF6B6B", "#FFD700", "#DDA0DD", "#87CEEB"],
  });
};
// Computed properties
const isFormValid = computed(() => {
  return selectedEmotion.value && diaryEntry.value.trim().length > 0;
});

const remainingForSurprise = computed(() => {
  return 5 - (entriesCount.value % 5);
});

// Milestones configuration
const milestones = {
  5: {
    type: "animation",
    message: "Поздравляем! Ваше дерево начинает цвести! 🌸",
    reward: "flowerAnimation",
  },
  10: {
    type: "emotion",
    message: "Открыта новая эмоция: Восторг! ✨",
    reward: "newEmotion",
  },
  15: {
    type: "tree",
    message: "Разблокирован новый стиль дерева!",
    reward: "newTreeStyle",
  },
  20: {
    type: "special",
    message: "Особое достижение: Золотые листья разблокированы! 🌟",
    reward: "goldenLeaves",
  },
};

const resetTree = () => {
  treeLeaves.value = [];
  entriesCount.value = 0;
  unlockedEmotions.value = [...emotions];
  achievements.value = [];
  recentEntries.value = [];
  localStorage.clear(); // Clear saved state
  alert("Дерево успешно сброшено!");
};

// Local storage functions
const saveToLocalStorage = () => {
  try {
    localStorage.setItem("entriesCount", entriesCount.value.toString());
    localStorage.setItem("treeLeaves", JSON.stringify(treeLeaves.value));
    localStorage.setItem("recentEntries", JSON.stringify(recentEntries.value));
    localStorage.setItem("achievements", JSON.stringify(achievements.value));
    localStorage.setItem(
      "unlockedEmotions",
      JSON.stringify(unlockedEmotions.value)
    );
    localStorage.setItem(
      "currentTreeStyle",
      JSON.stringify(currentTreeStyle.value)
    );
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const storedEntriesCount = localStorage.getItem("entriesCount");
    const storedTreeLeaves = localStorage.getItem("treeLeaves");
    const storedRecentEntries = localStorage.getItem("recentEntries");
    const storedAchievements = localStorage.getItem("achievements");
    const storedUnlockedEmotions = localStorage.getItem("unlockedEmotions");
    const storedTreeStyle = localStorage.getItem("currentTreeStyle");

    if (storedEntriesCount) entriesCount.value = parseInt(storedEntriesCount);
    if (storedTreeLeaves) {
      treeLeaves.value = JSON.parse(storedTreeLeaves).map((leaf) => ({
        ...leaf,
        isNew: false, // Ensure loaded leaves don't animate
      }));
    }
    if (storedRecentEntries) {
      recentEntries.value = JSON.parse(storedRecentEntries, (key, value) => {
        if (key === "date") return new Date(value);
        return value;
      });
    }
    if (storedAchievements) achievements.value = JSON.parse(storedAchievements);
    if (storedUnlockedEmotions)
      unlockedEmotions.value = JSON.parse(storedUnlockedEmotions);
    if (storedTreeStyle) currentTreeStyle.value = JSON.parse(storedTreeStyle);
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
};

// Helper functions
const addFlowerEffect = () => {
  const newFlowers = Array.from({ length: 5 }, () => ({
    x: 150 + Math.random() * 100,
    y: 100 + Math.random() * 200,
  }));
  flowers.value.push(...newFlowers);
};

const enableGoldenLeaves = () => {
  // Golden leaves are handled in createLeaf function
};

// Handle milestone rewards
const checkMilestones = () => {
  const milestone = milestones[entriesCount.value];
  if (milestone) {
    currentSurpriseMessage.value = milestone.message;
    showSurpriseModal.value = true;
    triggerConfetti();

    switch (milestone.reward) {
      case "flowerAnimation":
        addFlowerEffect();
        break;
      case "newEmotion":
        unlockedEmotions.value.push(advancedEmotions[0]);
        break;
      case "newTreeStyle":
        currentTreeStyle.value = treeStyles[2];
        break;
      case "goldenLeaves":
        enableGoldenLeaves();
        break;
    }

    // Add achievement
    achievements.value.push({
      id: Date.now(),
      title: milestone.message,
      date: new Date(),
    });

    // Save achievements
    saveToLocalStorage();
  }
};

// Enhanced leaf generation with special effects
const createLeaf = (emotion) => {
  const x = 150 + Math.random() * 100;
  const y = 100 + Math.random() * 200;
  const isGoldenLeaf = entriesCount.value >= 20 && Math.random() > 0.8;

  const leafPath = `M${x} ${y}
    C ${x - 10} ${y - 10}, ${x - 20} ${y - 5}, ${x - 25} ${y - 15}
    C ${x - 30} ${y - 25}, ${x - 25} ${y - 35}, ${x - 15} ${y - 40}
    C ${x - 5} ${y - 45}, ${x + 5} ${y - 40}, ${x + 10} ${y - 30}
    C ${x + 15} ${y - 20}, ${x + 10} ${y - 10}, ${x} ${y} Z`;

  return {
    id: Date.now() + Math.random(), // Unique ID for each leaf
    pathData: leafPath,
    x,
    y,
    color: isGoldenLeaf ? "#FFD700" : emotion.color,
    emotion: emotion.name,
    special: isGoldenLeaf ? "golden" : null,
    rotation: Math.random() * 360,
    isNew: true, // Flag for animation
  };
};

const handleSubmitEntry = () => {
  if (!isFormValid.value) return;

  // Add new entry
  entriesCount.value++;

  // Add new leaf
  const newLeaf = createLeaf(selectedEmotion.value);
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

  // Check for milestones
  checkMilestones();

  // Reset form
  selectedEmotion.value = null;
  diaryEntry.value = "";
  showTreeAnimation.value = true;

  // Reset animations
  setTimeout(() => {
    const leafIndex = treeLeaves.value.findIndex(
      (leaf) => leaf.id === newLeaf.id
    );
    if (leafIndex !== -1) {
      treeLeaves.value[leafIndex] = {
        ...treeLeaves.value[leafIndex],
        isNew: false,
      };
    }
  }, 1000);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
};

// Watch for changes and save to localStorage
watch(
  () => treeLeaves.value,
  (newValue) => {
    saveToLocalStorage();
  },
  [
    entriesCount,
    treeLeaves,
    recentEntries,
    achievements,
    unlockedEmotions,
    currentTreeStyle,
  ],
  () => {
    saveToLocalStorage();
  },
  { deep: true }
);

// Initialize data on component mount
onMounted(() => {
  loadFromLocalStorage();
});
</script>

<style scoped>
.leaf-animation {
  animation: growLeaf 0.5s ease-out;
  transform-origin: center;
}

.tree-animation {
  animation: growTree 1s ease-out;
}

.flower-animation {
  animation: bloomFlower 0.8s ease-out;
}

.golden-leaf {
  filter: drop-shadow(0 0 3px gold);
}

@keyframes growLeaf {
  from {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(var(--rotation));
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

@keyframes bloomFlower {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

path {
  animation: growTree 1.5s ease-out forwards;
}
circle {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes growTree {
  from {
    stroke-dasharray: 0 600;
    stroke-dashoffset: 0;
  }
  to {
    stroke-dasharray: 600 0;
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
