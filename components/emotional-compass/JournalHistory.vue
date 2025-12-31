<template>
  <div class="relative min-h-screen">
    <!-- Header with Enhanced Icon and Typography -->
    <div class="flex items-center gap-5 my-8 px-4 sm:px-0">
      <div
        class="w-14 h-14 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm shadow-md">
        <i class="fas fa-book-journal-whills text-2xl text-[#0EA5E9]" aria-hidden="true"></i>
      </div>
      <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white/90 tracking-tight">
        История эмоций
      </h2>
    </div>

    <!-- Advanced Filters with Search and Clear Options -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 px-4 sm:px-0">
      <select v-model="emotionFilter"
        class="w-full px-4 py-2.5 rounded-lg border border-cyan-500/20 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all bg-white dark:bg-[#1A1F35]/40 text-slate-600 dark:text-slate-300"
        aria-label="Фильтр по эмоциям">
        <option value="">Все эмоции</option>
        <option v-for="emotion in emotions" :key="emotion.id" :value="emotion.name">
          {{ emotion.name }}
        </option>
      </select>
      <select v-model="sphereFilter"
        class="w-full px-4 py-2.5 rounded-lg border border-cyan-500/20 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all bg-white dark:bg-[#1A1F35]/40 text-slate-600 dark:text-slate-300"
        aria-label="Фильтр по сферам жизни">
        <option value="">Все сферы</option>
        <option v-for="sphere in lifeSpheres" :key="sphere.name" :value="sphere.name">
          {{ sphere.name }}
        </option>
      </select>
      <div class="flex items-center gap-2">
        <input v-model="searchQuery" placeholder="Поиск в записях..."
          class="w-full px-4 py-2.5 rounded-lg border border-cyan-500/20 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all bg-white dark:bg-[#1A1F35]/40 text-slate-600 dark:text-slate-300"
          aria-label="Поиск по записям" />
        <button @click="clearFilters"
          class="bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/30 text-[#0EA5E9] px-3 py-2 rounded-lg transition-all"
          aria-label="Очистить фильтры">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <!-- Loading State with Enhanced Design -->
    <div v-if="loading" class="flex flex-col items-center gap-6 py-16">
      <div class="animate-pulse">
        <i class="fas fa-spinner fa-spin fa-3x text-[#0EA5E9]" aria-hidden="true"></i>
      </div>
      <p class="text-slate-500 dark:text-slate-400 text-base font-medium">
        Загрузка ваших эмоциональных записей...
      </p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredEntries.length === 0" class="flex flex-col items-center gap-4 py-16 text-center">
      <i class="fas fa-journal-whills text-4xl text-[#0EA5E9]/50" aria-hidden="true"></i>
      <p class="text-slate-500 dark:text-slate-400 text-lg">
        Пока нет записей, соответствующих выбранным фильтрам
      </p>
    </div>

    <!-- Journal Entries List with Improved Scrolling -->
    <div v-else class="relative max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-300px)]" ref="scrollContainer">
      <div
        class="space-y-6 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#0EA5E9]/50 scrollbar-track-[#1A1F35]/20"
        style="max-height: inherit" @scroll="checkScroll">
        <div v-for="(entry, index) in filteredEntries" :key="index">
          <!-- Entry Card -->
          <div
            class="group relative p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden">
            <!-- Decorative Background Element -->
            <div
              class="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700">
            </div>

            <!-- Entry Header -->
            <div class="relative flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner"
                  :class="getZoneColor(entry.emotion || entry.labeling?.primary || '')">
                  <i :class="getEmotionIcon(entry.emotion || entry.labeling?.primary || '')" class="text-white"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {{ entry.emotion || entry.labeling?.primary }}
                    <span v-if="entry.subEmotion || entry.labeling?.secondary"
                      class="text-sm font-medium text-slate-400">
                      • {{ entry.subEmotion || entry.labeling?.secondary }}
                    </span>
                  </h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {{ formatDate(entry.timestamp) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
                  <span class="text-xs font-bold text-slate-500 dark:text-slate-400">ИНТЕНСИВНОСТЬ:</span>
                  <span class="ml-2 text-sm font-black text-purple-500">{{ entry.intensity || entry.affect?.intensity
                  }}/10</span>
                </div>
              </div>
            </div>

            <!-- AI Magic Summary (Primary Highlight) -->
            <div v-if="entry.shortSummary"
              class="relative mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/10 group-hover:border-purple-500/20 transition-colors">
              <div
                class="absolute -top-2 -left-2 w-6 h-6 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm border border-purple-500/20">
                <i class="fas fa-magic text-[10px] text-purple-500"></i>
              </div>
              <p class="text-slate-700 dark:text-slate-200 font-serif italic text-lg leading-relaxed">
                "{{ entry.shortSummary }}"
              </p>
            </div>

            <!-- Visual Markers (Needs & Body) -->
            <div class="flex flex-wrap gap-4 mb-6">
              <!-- Needs -->
              <div v-if="entry.needs && entry.needs.length > 0" class="space-y-2">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Потребности</span>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="need in entry.needs" :key="need"
                    class="px-2.5 py-1 bg-purple-500/5 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-lg border border-purple-500/10">
                    {{ need }}
                  </span>
                </div>
              </div>

              <!-- Body -->
              <div v-if="entry.somatic && entry.somatic.locations && entry.somatic.locations.length > 0"
                class="space-y-2">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Ощущения</span>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="loc in entry.somatic.locations" :key="loc"
                    class="px-2.5 py-1 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/10">
                    {{ loc }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Details Action -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
              <div class="flex items-center gap-4">
                <div v-if="entry.context && entry.context.triggers && entry.context.triggers.length > 0"
                  class="flex -space-x-2">
                  <div v-for="trigger in entry.context.triggers.slice(0, 3)" :key="trigger"
                    class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center"
                    title="trigger">
                    <i class="fas fa-bolt text-[8px] text-yellow-500"></i>
                  </div>
                </div>
              </div>

              <button @click="toggleDetails(index)"
                class="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-purple-500 transition-colors py-2 px-4 rounded-xl hover:bg-purple-500/5">
                <span>{{ isExpanded(index) ? "СВЕРНУТЬ" : "ДЕТАЛИ" }}</span>
                <i
                  :class="['fas', isExpanded(index) ? 'fa-chevron-up' : 'fa-chevron-down', 'text-[10px] transition-transform duration-300', isExpanded(index) ? 'rotate-180' : '']"></i>
              </button>
            </div>

            <!-- Expanded Content -->
            <Transition name="slide-fade">
              <div v-if="isExpanded(index)" class="mt-6 space-y-8 animate-fadeIn">

                <!-- Full Reflection -->
                <div v-if="entry.reflection" class="group/reflection relative">
                  <div
                    class="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 to-transparent rounded-full">
                  </div>
                  <h4
                    class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i class="fas fa-quote-left text-purple-500"></i>
                    Размышление MindQ
                  </h4>
                  <div class="prose dark:prose-invert max-w-none">
                    <p
                      class="text-slate-600 dark:text-slate-400 leading-relaxed font-serif text-lg italic whitespace-pre-wrap pl-2">
                      {{ entry.reflection }}
                    </p>
                  </div>
                </div>

                <!-- Personal Notes -->
                <div v-if="entry.entry || (entry.cognition && entry.cognition.narrative)">
                  <h4
                    class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i class="far fa-sticky-note text-cyan-500"></i>
                    Личные заметки
                  </h4>
                  <p
                    class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {{ entry.entry || entry.cognition?.narrative }}
                  </p>
                </div>

                <!-- Full Context/Triggers -->
                <div v-if="entry.context && entry.context.triggers && entry.context.triggers.length > 0">
                  <h4
                    class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i class="fas fa-bolt text-yellow-500"></i>
                    Полный контекст
                  </h4>
                  <div class="flex flex-wrap gap-2 pl-2">
                    <span v-for="tag in entry.context.triggers" :key="tag"
                      class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Legacy Data (Only if needed) -->
                <div v-if="!entry.reflection && (entry.perception || entry.coping || entry.action)"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-if="entry.perception" class="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Восприятие
                      (Архив)</span>
                    <p class="text-xs text-slate-500">{{ entry.perception }}</p>
                  </div>
                  <div v-if="entry.coping" class="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Стратегии
                      (Архив)</span>
                    <p class="text-xs text-slate-500">{{ entry.coping }}</p>
                  </div>
                  <div v-if="entry.action" class="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Действия
                      (Архив)</span>
                    <p class="text-xs text-slate-500">{{ entry.action }}</p>
                  </div>
                </div>

              </div>
            </Transition>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-6">
            <span v-for="tag in entry.tags" :key="tag" :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium text-white backdrop-blur-sm hover:scale-105 transition-transform',
              getTagColor(tag),
            ]">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- More Entries Indicator (Fixed at Bottom) -->
      <div v-if="showMoreIndicator" class="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <div
          class="flex items-center gap-2 bg-white/90 dark:bg-[#1A1F35]/80 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-300 z-10 shadow-lg">
          <span class="text-[#0EA5E9]">Больше записей ниже</span>
          <i class="fas fa-arrow-down text-xs text-[#0EA5E9] animate-bounce" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  emotions: { type: Array, required: true },
  lifeSpheres: { type: Array, required: true },
  entries: { type: Array, required: true },
});

const emotionFilter = ref("");
const sphereFilter = ref("");
const searchQuery = ref("");
const expandedEntries = ref({});
const showMoreIndicator = ref(true);
const scrollContainer = ref(null);

const filteredEntries = computed(() => {
  return props.entries.filter(
    (entry) => {
      const matchesEmotion = !emotionFilter.value || (entry.emotion || entry.labeling?.primary) === emotionFilter.value;
      const entryTags = entry.tags || [];
      const triggerTags = entry.context?.triggers || [];
      const allTags = [...entryTags, ...triggerTags];
      const matchesSphere = !sphereFilter.value || allTags.includes(sphereFilter.value);

      if (!searchQuery.value) return matchesEmotion && matchesSphere;

      const query = searchQuery.value.toLowerCase();
      const matchesSearch =
        (entry.entry || entry.cognition?.narrative || "").toLowerCase().includes(query) ||
        (entry.shortSummary || "").toLowerCase().includes(query) ||
        (entry.reflection || "").toLowerCase().includes(query) ||
        (entry.emotion || entry.labeling?.primary || "").toLowerCase().includes(query) ||
        (entry.subEmotion || entry.labeling?.secondary || "").toLowerCase().includes(query);

      return matchesEmotion && matchesSphere && matchesSearch;
    }
  );
});

const getEmotionIcon = (emotionName) => {
  const icons = {
    'Радость': 'fas fa-smile-beam',
    'Грусть': 'fas fa-sad-tear',
    'Страх': 'fas fa-ghost',
    'Гнев': 'fas fa-fire',
    'Удивление': 'fas fa-bolt',
    'Спокойствие': 'fas fa-leaf',
    'Интерес': 'fas fa-search',
    'Доверие': 'fas fa-handshake',
    'Ожидание': 'fas fa-hourglass-half',
    'Неприязнь': 'fas fa-frown',
    'Отвращение': 'fas fa-nauseated',
    'Презрение': 'fas fa-angle-double-down'
  };
  return icons[emotionName] || 'fas fa-heart';
};

const getZoneColor = (emotionName) => {
  const zones = {
    'Радость': 'bg-yellow-400',
    'Грусть': 'bg-blue-400',
    'Страх': 'bg-purple-400',
    'Гнев': 'bg-red-400',
    'Удивление': 'bg-green-400',
    'Спокойствие': 'bg-emerald-400',
    'Интерес': 'bg-cyan-400'
  };
  return zones[emotionName] || 'bg-slate-400';
};

const loading = computed(() => {
  return (
    !props.emotions ||
    props.emotions.length === 0 ||
    !props.lifeSpheres ||
    props.lifeSpheres.length === 0 ||
    !props.entries ||
    props.entries.length === 0
  );
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTagColor = (tagName) => {
  const sphere = props.lifeSpheres.find((s) => s.name === tagName);
  return sphere
    ? sphere.color
    : "bg-gradient-to-r from-[#0EA5E9]/60 to-[#22D3EE]/60";
};

const clearFilters = () => {
  emotionFilter.value = "";
  sphereFilter.value = "";
  searchQuery.value = "";
};

const toggleDetails = (index) => {
  expandedEntries.value[index] = !expandedEntries.value[index];
};

const isExpanded = (index) => {
  return expandedEntries.value[index] || false;
};

const checkScroll = (event) => {
  const el = event.target;
  if (el) {
    showMoreIndicator.value =
      el.scrollHeight > el.clientHeight &&
      el.scrollTop + el.clientHeight < el.scrollHeight - 10;
  }
};

onMounted(() => {
  const el = scrollContainer.value?.querySelector(".overflow-y-auto");
  if (el) {
    checkScroll({ target: el });
  }
});
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(14, 165, 233, 0.5);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background-color: rgba(26, 31, 53, 0.2);
}

/* Slide-fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Bounce animation for arrow */
.animate-bounce {
  animation: bounce 1.5s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(4px);
  }
}
</style>
