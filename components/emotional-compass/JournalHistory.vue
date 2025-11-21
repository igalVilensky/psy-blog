<template>
  <div class="relative min-h-screen">
    <!-- Header with Enhanced Icon and Typography -->
    <div class="flex items-center gap-5 my-8 px-4 sm:px-0">
      <div
        class="w-14 h-14 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm shadow-md"
      >
        <i
          class="fas fa-book-journal-whills text-2xl text-[#0EA5E9]"
          aria-hidden="true"
        ></i>
      </div>
      <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white/90 tracking-tight">
        История эмоций
      </h2>
    </div>

    <!-- Advanced Filters with Search and Clear Options -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 px-4 sm:px-0">
      <select
        v-model="emotionFilter"
        class="w-full px-4 py-2.5 rounded-lg border border-cyan-500/20 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all bg-white dark:bg-[#1A1F35]/40 text-slate-600 dark:text-slate-300"
        aria-label="Фильтр по эмоциям"
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
        class="w-full px-4 py-2.5 rounded-lg border border-cyan-500/20 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all bg-white dark:bg-[#1A1F35]/40 text-slate-600 dark:text-slate-300"
        aria-label="Фильтр по сферам жизни"
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
      <div class="flex items-center gap-2">
        <input
          v-model="searchQuery"
          placeholder="Поиск в записях..."
          class="w-full px-4 py-2.5 rounded-lg border border-cyan-500/20 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all bg-white dark:bg-[#1A1F35]/40 text-slate-600 dark:text-slate-300"
          aria-label="Поиск по записям"
        />
        <button
          @click="clearFilters"
          class="bg-[#0EA5E9]/20 hover:bg-[#0EA5E9]/30 text-[#0EA5E9] px-3 py-2 rounded-lg transition-all"
          aria-label="Очистить фильтры"
        >
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <!-- Loading State with Enhanced Design -->
    <div v-if="loading" class="flex flex-col items-center gap-6 py-16">
      <div class="animate-pulse">
        <i
          class="fas fa-spinner fa-spin fa-3x text-[#0EA5E9]"
          aria-hidden="true"
        ></i>
      </div>
      <p class="text-slate-500 dark:text-slate-400 text-base font-medium">
        Загрузка ваших эмоциональных записей...
      </p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="filteredEntries.length === 0"
      class="flex flex-col items-center gap-4 py-16 text-center"
    >
      <i
        class="fas fa-journal-whills text-4xl text-[#0EA5E9]/50"
        aria-hidden="true"
      ></i>
      <p class="text-slate-500 dark:text-slate-400 text-lg">
        Пока нет записей, соответствующих выбранным фильтрам
      </p>
    </div>

    <!-- Journal Entries List with Improved Scrolling -->
    <div
      v-else
      class="relative max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-300px)]"
      ref="scrollContainer"
    >
      <div
        class="space-y-6 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#0EA5E9]/50 scrollbar-track-[#1A1F35]/20"
        style="max-height: inherit"
        @scroll="checkScroll"
      >
        <div
          v-for="(entry, index) in filteredEntries"
          :key="index"
          class="p-6 bg-gradient-to-b from-white to-slate-50 dark:from-[#1A1F35]/40 dark:to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <!-- Entry Header -->
          <div class="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-lg font-bold text-slate-900 dark:text-white/90">
                {{ entry.emotion }}
                <span class="text-slate-500 dark:text-slate-300 text-sm font-semibold ml-2">
                  ({{ entry.subEmotion }})
                </span>
              </span>
              <span
                class="px-3 py-1 bg-slate-100 dark:bg-[#1A1F35]/40 text-[#0EA5E9] text-sm font-medium rounded-full border border-[#0EA5E9]/20"
              >
                Интенсивность: {{ entry.intensity }}/10
              </span>
            </div>
            <span class="text-sm text-slate-500 dark:text-slate-300 sm:text-right">
              {{ formatDate(entry.timestamp) }}
            </span>
          </div>

          <!-- Toggle Button -->
          <div class="flex justify-end mb-4">
            <button
              @click="toggleDetails(index)"
              class="text-sm font-medium text-[#0EA5E9] hover:text-[#22D3EE] transition-colors flex items-center gap-1"
              :aria-expanded="isExpanded(index)"
              :aria-controls="'entry-details-' + index"
            >
              <span>{{
                isExpanded(index) ? "Скрыть детали" : "Показать детали"
              }}</span>
              <i
                :class="[
                  'fas',
                  isExpanded(index) ? 'fa-chevron-up' : 'fa-chevron-down',
                  'text-xs',
                  'transition-transform duration-300',
                  isExpanded(index) ? 'rotate-180' : 'rotate-0',
                ]"
                aria-hidden="true"
              ></i>
            </button>
          </div>

          <!-- Entry Sections (Collapsible with Transition) -->
          <Transition name="slide-fade">
            <div
              v-if="isExpanded(index)"
              :id="'entry-details-' + index"
              class="space-y-6"
            >
              <!-- Описание -->
              <div>
                <h3
                  class="text-base font-semibold text-[#0EA5E9] mb-2 flex items-center gap-2 hover:text-[#22D3EE] transition-colors"
                >
                  <i class="fas fa-pen text-xs" aria-hidden="true"></i>
                  Описание
                </h3>
                <p
                  class="text-sm text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-[#0EA5E9]/30 leading-relaxed"
                >
                  {{ entry.entry }}
                </p>
              </div>

              <!-- Восприятие -->
              <div>
                <h3
                  class="text-base font-semibold text-[#0EA5E9] mb-2 flex items-center gap-2 hover:text-[#22D3EE] transition-colors"
                >
                  <i class="fas fa-eye text-xs" aria-hidden="true"></i>
                  Восприятие
                </h3>
                <p
                  class="text-sm text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-[#0EA5E9]/30 leading-relaxed"
                >
                  {{ entry.perception }}
                </p>
              </div>

              <!-- Стратегии совладания -->
              <div>
                <h3
                  class="text-base font-semibold text-[#0EA5E9] mb-2 flex items-center gap-2 hover:text-[#22D3EE] transition-colors"
                >
                  <i class="fas fa-shield-alt text-xs" aria-hidden="true"></i>
                  Стратегии совладания
                </h3>
                <p
                  class="text-sm text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-[#0EA5E9]/30 leading-relaxed"
                >
                  {{ entry.coping }}
                </p>
              </div>

              <!-- Действия -->
              <div>
                <h3
                  class="text-base font-semibold text-[#0EA5E9] mb-2 flex items-center gap-2 hover:text-[#22D3EE] transition-colors"
                >
                  <i class="fas fa-tasks text-xs" aria-hidden="true"></i>
                  Действия
                </h3>
                <p
                  class="text-sm text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-[#0EA5E9]/30 leading-relaxed"
                >
                  {{ entry.action }}
                </p>
              </div>
            </div>
          </Transition>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-6">
            <span
              v-for="tag in entry.tags"
              :key="tag"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium text-white backdrop-blur-sm hover:scale-105 transition-transform',
                getTagColor(tag),
              ]"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- More Entries Indicator (Fixed at Bottom) -->
      <div
        v-if="showMoreIndicator"
        class="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
      >
        <div
          class="flex items-center gap-2 bg-white/90 dark:bg-[#1A1F35]/80 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-300 z-10 shadow-lg"
        >
          <span class="text-[#0EA5E9]">Больше записей ниже</span>
          <i
            class="fas fa-arrow-down text-xs text-[#0EA5E9] animate-bounce"
            aria-hidden="true"
          ></i>
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
    (entry) =>
      (!emotionFilter.value || entry.emotion === emotionFilter.value) &&
      (!sphereFilter.value || entry.tags.includes(sphereFilter.value)) &&
      (!searchQuery.value ||
        entry.entry.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        entry.perception
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        entry.coping.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

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
