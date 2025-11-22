<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-500">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header Section -->
      <div class="text-center mb-12 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Колесо Жизненного Баланса
          </span>
        </h1>
        <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Оцените уровень удовлетворенности в ключевых сферах жизни и получите персональные рекомендации для роста.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Wheel & Controls -->
        <div class="lg:col-span-7 space-y-8">
          <!-- Wheel Visualization Card -->
          <div class="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
             <!-- Decorative background elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

            <div class="relative flex justify-center items-center min-h-[300px] md:min-h-[400px]">
               <canvas ref="wheelCanvas" class="max-w-full h-auto drop-shadow-2xl"></canvas>
               
               <!-- Center Label -->
               <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full p-3 border border-slate-300 dark:border-slate-700/50 shadow-lg">
                   <span class="text-xs font-mono text-cyan-600 dark:text-cyan-400">БАЛАНС</span>
                 </div>
               </div>
            </div>
          </div>

          <!-- Categories Input Card -->
          <div class="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-xl">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <i class="fas fa-sliders-h text-cyan-600 dark:text-cyan-400"></i>
              <span>Настройка сфер</span>
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(category, index) in categories" :key="index" class="group">
                <div class="flex justify-between items-center mb-2">
                  <label :for="`cat-${index}`" class="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: category.color }"></span>
                    {{ category.name }}
                  </label>
                  <span class="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-cyan-600 dark:text-cyan-400 border border-slate-300 dark:border-slate-700">
                    {{ category.score }}/10
                  </span>
                </div>
                <input
                  :id="`cat-${index}`"
                  v-model.number="category.score"
                  type="range"
                  min="1"
                  max="10"
                  class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
                  @input="updateWheel"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Analysis & Actions -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Quick Actions -->
          <div class="grid grid-cols-2 gap-4">
            <button 
              @click="saveResults"
              class="p-4 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 border border-cyan-500/30 rounded-xl transition-all group flex flex-col items-center justify-center gap-2"
            >
              <i class="fas fa-save text-2xl text-cyan-400 group-hover:scale-110 transition-transform"></i>
              <span class="text-sm font-medium text-cyan-700 dark:text-cyan-100">Сохранить</span>
            </button>
            <button 
              @click="showGoalModal = true"
              class="p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 rounded-xl transition-all group flex flex-col items-center justify-center gap-2"
            >
              <i class="fas fa-bullseye text-2xl text-purple-400 group-hover:scale-110 transition-transform"></i>
              <span class="text-sm font-medium text-purple-700 dark:text-purple-100">Цели</span>
            </button>
          </div>

          <!-- Insights Card -->
          <div class="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-xl">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fas fa-lightbulb text-yellow-500 dark:text-yellow-400"></i>
              <span>Инсайты</span>
            </h3>
            
            <div v-if="lowScoreCategories.length > 0" class="space-y-4">
              <div v-for="(cat, idx) in lowScoreCategories.slice(0, 2)" :key="idx" 
                   class="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-4 border-l-4 border-red-500/70">
                <h4 class="font-medium text-slate-800 dark:text-slate-200 mb-1">{{ cat.name }} ({{ cat.score }}/10)</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400">{{ getRecommendationForCategory(cat.name) }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-slate-500">
              <i class="fas fa-check-circle text-4xl text-emerald-500/50 mb-3"></i>
              <p>Ваш баланс в отличной форме!</p>
            </div>
          </div>

           <!-- Energy Map Mini -->
           <div class="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 shadow-xl">
             <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <i class="fas fa-bolt text-emerald-500 dark:text-emerald-400"></i>
                  <span>Энергия</span>
                </h3>
                <button @click="showEnergyModal = true" class="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline">Настроить</button>
             </div>
             <div class="flex gap-2 overflow-x-auto pb-2">
                <div v-for="cat in energizingCategories" :key="cat.name" class="shrink-0 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300">
                  + {{ cat.name }}
                </div>
                <div v-for="cat in drainingCategories" :key="cat.name" class="shrink-0 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300">
                  - {{ cat.name }}
                </div>
                <span v-if="!energizingCategories.length && !drainingCategories.length" class="text-sm text-slate-600 dark:text-slate-500 italic">Нет данных</span>
             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Modals (Re-styled) -->
    <!-- Goal Modal -->
    <Transition name="modal">
      <div v-if="showGoalModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
          <button @click="showGoalModal = false" class="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <i class="fas fa-times"></i>
          </button>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Новая цель</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-400 mb-1">Сфера</label>
              <select v-model="newGoal.category" class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:border-cyan-500 outline-none">
                <option v-for="cat in categories" :value="cat.name">{{ cat.name }}</option>
              </select>
            </div>
            <div>
               <label class="block text-sm text-slate-600 dark:text-slate-400 mb-1">Цель (1-10)</label>
               <input v-model.number="newGoal.targetScore" type="range" min="1" max="10" class="w-full accent-cyan-500">
               <div class="text-right text-cyan-600 dark:text-cyan-400 font-mono">{{ newGoal.targetScore }}</div>
            </div>
            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-400 mb-1">Описание</label>
              <textarea v-model="newGoal.description" rows="3" class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:border-cyan-500 outline-none"></textarea>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button @click="showGoalModal = false" class="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Отмена</button>
            <button @click="addGoal" class="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">Добавить</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Energy Modal -->
    <Transition name="modal">
      <div v-if="showEnergyModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div class="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto">
          <button @click="showEnergyModal = false" class="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <i class="fas fa-times"></i>
          </button>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Источники энергии</h3>
          
          <div class="space-y-3">
            <div v-for="(cat, idx) in categories" :key="idx" class="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-300 dark:border-slate-700/50">
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-slate-800 dark:text-slate-200">{{ cat.name }}</span>
              </div>
              <div class="flex gap-2">
                <button @click="cat.energy = 'energizing'" 
                  :class="['flex-1 py-1 rounded text-xs font-medium transition-colors', cat.energy === 'energizing' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600']">
                  + Энергия
                </button>
                <button @click="cat.energy = 'neutral'"
                   :class="['flex-1 py-1 rounded text-xs font-medium transition-colors', cat.energy === 'neutral' ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600']">
                  Нейтрально
                </button>
                <button @click="cat.energy = 'draining'"
                   :class="['flex-1 py-1 rounded text-xs font-medium transition-colors', cat.energy === 'draining' ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/50' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600']">
                  - Потери
                </button>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
             <button @click="saveEnergyRatings" class="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">Сохранить</button>
          </div>
        </div>
      </div>
    </Transition>



    <!-- Notification -->
    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-[100]"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useHead } from "#imports";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Notification from "~/components/base/Notification.vue";
import { useNotification } from "~/composables/useNotification";

definePageMeta({
  layout: "laboratory",
});

useHead({
  title: "Колесо Жизненного Баланса | MindQ Lab",
  meta: [
    { name: "description", content: "Интерактивный инструмент для оценки и анализа баланса в различных сферах жизни." }
  ]
});

const auth = useAuthStore();
const db = getFirestore();
const { notificationMessage, notificationType, showNotification, hideNotification } = useNotification();

// --- State ---
const categories = ref([
  { name: "Здоровье", score: 5, color: "#10b981", importance: 5, energy: "neutral" }, // Emerald
  { name: "Финансы", score: 5, color: "#3b82f6", importance: 5, energy: "neutral" }, // Blue
  { name: "Карьера", score: 5, color: "#8b5cf6", importance: 5, energy: "neutral" }, // Violet
  { name: "Личностный рост", score: 5, color: "#d946ef", importance: 5, energy: "neutral" }, // Fuchsia
  { name: "Духовность", score: 5, color: "#6366f1", importance: 5, energy: "neutral" }, // Indigo
  { name: "Отдых", score: 5, color: "#f43f5e", importance: 5, energy: "neutral" }, // Rose
  { name: "Отношения", score: 5, color: "#f97316", importance: 5, energy: "neutral" }, // Orange
  { name: "Семья", score: 5, color: "#eab308", importance: 5, energy: "neutral" }, // Yellow
]);

const wheelCanvas = ref(null);
const showGoalModal = ref(false);
const showEnergyModal = ref(false);
const userGoals = ref([]);
const history = ref([]);
const newGoal = ref({ category: "Здоровье", targetScore: 8, description: "" });

// --- Computed ---
const lowScoreCategories = computed(() => {
  return categories.value.filter((c) => c.score < 5).sort((a, b) => a.score - b.score);
});

const energizingCategories = computed(() => categories.value.filter(c => c.energy === 'energizing'));
const drainingCategories = computed(() => categories.value.filter(c => c.energy === 'draining'));

// --- Methods ---
const drawWheel = () => {
  const canvas = wheelCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  // Detect dark mode
  const isDark = document.documentElement.classList.contains('dark');
  
  // High DPI support
  const dpr = window.devicePixelRatio || 1;
  const size = Math.min(window.innerWidth - 40, 500); // Responsive size
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  ctx.scale(dpr, dpr);

  const centerX = size / 2;
  const centerY = size / 2;
  // Reduced radius to prevent label clipping (was size/2 - 20)
  const radius = (size / 2) - 60; 
  const numCategories = categories.value.length;
  const angleStep = (2 * Math.PI) / numCategories;

  ctx.clearRect(0, 0, size, size);

  // Draw Grid Rings - darker in light mode, lighter in dark mode
  ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(148, 163, 184, 0.25)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 10; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius / 10) * i, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Draw Spokes
  for (let i = 0; i < numCategories; i++) {
    const angle = i * angleStep - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius
    );
    ctx.stroke();
  }

  // Draw Data Polygon
  ctx.beginPath();
  ctx.fillStyle = "rgba(6, 182, 212, 0.2)"; // Cyan-500 low opacity
  ctx.strokeStyle = isDark ? "#22d3ee" : "#0891b2"; // Cyan-400 in dark, Cyan-600 in light
  ctx.lineWidth = 3;

  categories.value.forEach((cat, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const distance = (radius / 10) * cat.score;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw Points
  categories.value.forEach((cat, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const distance = (radius / 10) * cat.score;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = cat.color;
    ctx.fill();
    ctx.strokeStyle = isDark ? "#0f172a" : "#ffffff"; // Dark border in dark mode, white in light mode
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  
  // Draw Labels (Outside) - darker in light mode
  ctx.font = "12px 'Inter', sans-serif";
  ctx.fillStyle = isDark ? "#94a3b8" : "#475569"; // Slate-400 in dark, Slate-600 in light
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  categories.value.forEach((cat, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const labelRadius = radius + 30; // Increased padding for labels
    const x = centerX + Math.cos(angle) * labelRadius;
    const y = centerY + Math.sin(angle) * labelRadius;
    
    ctx.fillText(cat.name, x, y);
  });
};

const updateWheel = () => {
  requestAnimationFrame(drawWheel);
};

const saveResults = async () => {
  if (!auth.user) {
    showNotification("Пожалуйста, войдите в систему, чтобы сохранить результаты в облаке.", "info");
    localStorage.setItem('wheel_data', JSON.stringify(categories.value));
    return;
  }

  try {
    const wheelRef = doc(db, "wheel_of_life", auth.user.uid);
    
    // Create history entry
    const historyEntry = {
      timestamp: Date.now(),
      dateFormatted: new Date().toLocaleString(),
      categories: categories.value
    };

    // Update history locally
    history.value.push(historyEntry);

    await setDoc(wheelRef, {
      categories: categories.value,
      goals: userGoals.value,
      history: history.value,
      lastSaved: new Date().toISOString()
    });

    showNotification("Результаты успешно сохранены!", "success");
  } catch (e) {
    console.error("Error saving data:", e);
    showNotification("Ошибка при сохранении данных.", "error");
  }
};

const addGoal = () => {
  userGoals.value.push({ 
    ...newGoal.value,
    id: Date.now()
  });
  showGoalModal.value = false;
  newGoal.value = { category: "Здоровье", targetScore: 8, description: "" };
};

const saveEnergyRatings = () => {
  showEnergyModal.value = false;
  // Auto-save if user is logged in? Or wait for explicit save?
  // For now, let's wait for explicit save to avoid too many writes, 
  // but we could also call saveResults() here.
};

const getRecommendationForCategory = (name) => {
  const recs = {
    "Здоровье": "Попробуйте наладить режим сна и добавить 15 минут прогулки в день.",
    "Финансы": "Проанализируйте расходы за последнюю неделю.",
    "Карьера": "Обсудите с руководителем ваши перспективы или изучите новый навык.",
    "Личностный рост": "Прочитайте одну книгу в этом месяце.",
    "Духовность": "Попробуйте медитацию 5 минут в день.",
    "Отдых": "Выделите один вечер полностью без гаджетов.",
    "Отношения": "Позвоните старому другу или устройте свидание.",
    "Семья": "Проведите семейный ужин без телевизора."
  };
  return recs[name] || "Уделите внимание этой сфере.";
};

const loadData = async () => {
  if (auth.user) {
    try {
      const wheelRef = doc(db, "wheel_of_life", auth.user.uid);
      const docSnap = await getDoc(wheelRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.categories) {
           // Merge saved scores into current categories structure
          categories.value.forEach(cat => {
            const savedCat = data.categories.find(p => p.name === cat.name);
            if (savedCat) {
              cat.score = savedCat.score;
              cat.energy = savedCat.energy || 'neutral';
              cat.importance = savedCat.importance || 3;
              // Keep local color definitions if they differ, or use saved? 
              // Let's stick to local colors for consistency with the new design, 
              // unless we want to allow user customization.
            }
          });
        }
        if (data.goals) userGoals.value = data.goals;
        if (data.history) history.value = data.history;
      }
    } catch (e) {
      console.error("Error loading data:", e);
    }
  } else {
    // Fallback to local storage
    const saved = localStorage.getItem('wheel_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        categories.value.forEach(cat => {
          const savedCat = parsed.find(p => p.name === cat.name);
          if (savedCat) {
            cat.score = savedCat.score;
            cat.energy = savedCat.energy || 'neutral';
          }
        });
      } catch (e) { console.error(e); }
    }
  }
  drawWheel();
};

onMounted(() => {
  loadData();
  window.addEventListener('resize', drawWheel);
});

// Watch for auth state changes to reload data
watch(() => auth.user, () => {
  loadData();
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom Range Input Styling */
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent; 
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #06b6d4; /* Cyan-500 */
  cursor: pointer;
  margin-top: -4px; 
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #1e293b; /* Slate-800 */
  border-radius: 4px;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
