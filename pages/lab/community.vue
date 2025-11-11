<!-- pages/lab/community.vue -->
<template>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <div>
          <h1
            class="text-3xl md:text-4xl font-bold text-white font-montserrat mb-2"
          >
            Сообщество Исследователей
          </h1>
          <p class="text-slate-400">
            Общайтесь, делитесь опытом и развивайтесь вместе
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <div
            class="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
          >
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            ></div>
            <span class="text-emerald-400 text-sm font-medium"
              >{{ onlineUsers }} онлайн</span
            >
          </div>
          <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25 flex items-center space-x-2"
          >
            <i class="fas fa-plus"></i>
            <span>Создать пост</span>
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-slate-800/30 rounded-xl p-4 border border-orange-500/20">
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.members }}
          </div>
          <div class="text-slate-400 text-xs">Участников</div>
        </div>
        <div class="bg-slate-800/30 rounded-xl p-4 border border-purple-500/20">
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.posts }}
          </div>
          <div class="text-slate-400 text-xs">Постов</div>
        </div>
        <div class="bg-slate-800/30 rounded-xl p-4 border border-cyan-500/20">
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.discussions }}
          </div>
          <div class="text-slate-400 text-xs">Обсуждений</div>
        </div>
        <div
          class="bg-slate-800/30 rounded-xl p-4 border border-emerald-500/20"
        >
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.insights }}
          </div>
          <div class="text-slate-400 text-xs">Инсайтов</div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Feed -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Filter Tabs -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-2">
          <button
            v-for="tab in feedTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
            :class="
              activeTab === tab.id
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600/50'
            "
          >
            <i :class="tab.icon" class="text-xs mr-2"></i>
            {{ tab.label }}
          </button>
        </div>

        <!-- Posts Feed -->
        <div class="space-y-4">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 overflow-hidden group"
          >
            <!-- Post Header -->
            <div class="p-5 border-b border-slate-700/50">
              <div class="flex items-start space-x-3">
                <div
                  class="w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold flex-shrink-0"
                  :class="post.authorColor"
                >
                  {{ post.authorInitials }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-1">
                    <h3 class="font-medium text-white">{{ post.author }}</h3>
                    <span
                      v-if="post.badge"
                      class="px-2 py-0.5 rounded text-xs font-medium"
                      :class="post.badgeClass"
                    >
                      {{ post.badge }}
                    </span>
                  </div>
                  <div
                    class="flex items-center space-x-2 text-xs text-slate-400"
                  >
                    <span>{{ post.time }}</span>
                    <span>•</span>
                    <span class="flex items-center space-x-1">
                      <i
                        :class="getCategoryIcon(post.category)"
                        class="text-xs"
                      ></i>
                      <span>{{ post.category }}</span>
                    </span>
                  </div>
                </div>
                <button
                  class="text-slate-400 hover:text-white transition-colors"
                >
                  <i class="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>

            <!-- Post Content -->
            <div class="p-5">
              <h4
                class="text-lg font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors"
              >
                {{ post.title }}
              </h4>
              <p class="text-slate-300 text-sm leading-relaxed mb-4">
                {{ post.content }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-3 py-1 bg-slate-700/50 rounded-full text-slate-400 text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- Post Actions -->
              <div
                class="flex items-center space-x-6 pt-4 border-t border-slate-700/50"
              >
                <button
                  class="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors group/like"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-slate-700/50 group-hover/like:bg-cyan-500/10 flex items-center justify-center transition-colors"
                  >
                    <i class="fas fa-heart text-sm"></i>
                  </div>
                  <span class="text-sm font-medium">{{ post.likes }}</span>
                </button>
                <button
                  class="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors group/comment"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-slate-700/50 group-hover/comment:bg-purple-500/10 flex items-center justify-center transition-colors"
                  >
                    <i class="fas fa-comment text-sm"></i>
                  </div>
                  <span class="text-sm font-medium">{{ post.comments }}</span>
                </button>
                <button
                  class="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors group/share"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-slate-700/50 group-hover/share:bg-emerald-500/10 flex items-center justify-center transition-colors"
                  >
                    <i class="fas fa-share text-sm"></i>
                  </div>
                  <span class="text-sm font-medium">{{ post.shares }}</span>
                </button>
                <button
                  class="ml-auto flex items-center space-x-2 text-slate-400 hover:text-amber-400 transition-colors group/save"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-slate-700/50 group-hover/save:bg-amber-500/10 flex items-center justify-center transition-colors"
                  >
                    <i class="fas fa-bookmark text-sm"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <button
          class="w-full py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 text-slate-400 hover:text-white text-sm font-medium transition-all"
        >
          Загрузить ещё
        </button>
      </div>

      <!-- Right Column - Sidebar -->
      <div class="space-y-6">
        <!-- Active Researchers -->
        <div class="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
          <h3
            class="text-lg font-bold text-white mb-4 font-montserrat flex items-center justify-between"
          >
            <span>Онлайн</span>
            <span class="text-xs font-mono text-emerald-400">{{
              activeResearchers.length
            }}</span>
          </h3>
          <div class="space-y-3">
            <div
              v-for="researcher in activeResearchers"
              :key="researcher.id"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer group"
            >
              <div class="relative">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm"
                  :class="researcher.avatarColor"
                >
                  {{ researcher.initials }}
                </div>
                <div
                  class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-800 rounded-full"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <div
                  class="text-white text-sm font-medium truncate group-hover:text-orange-400 transition-colors"
                >
                  {{ researcher.name }}
                </div>
                <div class="text-slate-400 text-xs truncate">
                  {{ researcher.status }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trending Topics -->
        <div class="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
          <h3 class="text-lg font-bold text-white mb-4 font-montserrat">
            Популярные темы
          </h3>
          <div class="space-y-3">
            <div
              v-for="topic in trendingTopics"
              :key="topic.tag"
              class="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer group"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center"
                  :class="topic.iconBg"
                >
                  <i :class="topic.icon" class="text-sm"></i>
                </div>
                <div>
                  <div
                    class="text-white text-sm font-medium group-hover:text-orange-400 transition-colors"
                  >
                    #{{ topic.tag }}
                  </div>
                  <div class="text-slate-400 text-xs">
                    {{ topic.posts }} постов
                  </div>
                </div>
              </div>
              <i
                class="fas fa-arrow-up-right text-slate-500 text-xs group-hover:text-orange-400 transition-colors"
              ></i>
            </div>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
          <h3 class="text-lg font-bold text-white mb-4 font-montserrat">
            Ближайшие события
          </h3>
          <div class="space-y-4">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="relative"
            >
              <div class="flex space-x-3">
                <div class="flex flex-col items-center">
                  <div
                    class="w-12 h-12 rounded-xl flex flex-col items-center justify-center"
                    :class="event.dateBg"
                  >
                    <div class="text-xs font-bold" :class="event.dateColor">
                      {{ event.day }}
                    </div>
                    <div class="text-xs" :class="event.dateColor">
                      {{ event.month }}
                    </div>
                  </div>
                  <div
                    v-if="
                      event.id !== upcomingEvents[upcomingEvents.length - 1].id
                    "
                    class="w-px h-full bg-slate-700/50 mt-2"
                  ></div>
                </div>
                <div class="flex-1 pb-4">
                  <h4 class="text-white font-medium text-sm mb-1">
                    {{ event.title }}
                  </h4>
                  <p class="text-slate-400 text-xs mb-2">
                    {{ event.description }}
                  </p>
                  <div
                    class="flex items-center space-x-2 text-xs text-slate-500"
                  >
                    <i class="fas fa-clock"></i>
                    <span>{{ event.time }}</span>
                    <span>•</span>
                    <i class="fas fa-users"></i>
                    <span>{{ event.participants }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="w-full mt-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
          >
            Все события
          </button>
        </div>

        <!-- Community Guidelines -->
        <div
          class="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl p-5 border border-orange-500/20"
        >
          <div class="flex items-start space-x-3 mb-3">
            <div
              class="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-heart-pulse text-orange-400"></i>
            </div>
            <div>
              <h3 class="text-white font-bold mb-1">Правила сообщества</h3>
              <p class="text-slate-300 text-xs leading-relaxed">
                Будьте добры, уважительны и открыты к новым идеям
              </p>
            </div>
          </div>
          <button
            class="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
          >
            Читать полностью →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "laboratory",
});

const activeTab = ref("all");
const onlineUsers = ref(42);

const stats = {
  members: 1247,
  posts: 3842,
  discussions: 567,
  insights: 12893,
};

const feedTabs = [
  { id: "all", label: "Все", icon: "fas fa-globe" },
  { id: "popular", label: "Популярное", icon: "fas fa-fire" },
  { id: "following", label: "Подписки", icon: "fas fa-user-check" },
  { id: "saved", label: "Сохранённое", icon: "fas fa-bookmark" },
];

const posts = ref([
  {
    id: 1,
    author: "Елена Соколова",
    authorInitials: "ЕС",
    authorColor: "from-cyan-400 to-blue-500",
    badge: "Эксперт",
    badgeClass: "bg-cyan-500/20 text-cyan-400",
    time: "2 часа назад",
    category: "Эмоциональный интеллект",
    title: "Как я научилась распознавать свои эмоции",
    content:
      "После прохождения теста эмоционального интеллекта я обнаружила, что часто путаю тревогу с волнением. Это открытие изменило мой подход к стрессовым ситуациям...",
    tags: ["эмоции", "осознанность", "опыт"],
    likes: 127,
    comments: 34,
    shares: 12,
  },
  {
    id: 2,
    author: "Дмитрий Волков",
    authorInitials: "ДВ",
    authorColor: "from-purple-400 to-pink-500",
    badge: null,
    badgeClass: "",
    time: "5 часов назад",
    category: "Личность",
    title: "Большая пятёрка: мои результаты и инсайты",
    content:
      "Удивительно, но тест показал высокую открытость опыту при низкой экстраверсии. Раньше я думал, что эти черты связаны, но оказалось, что я интроверт-исследователь...",
    tags: ["личность", "самопознание", "результаты"],
    likes: 89,
    comments: 21,
    shares: 8,
  },
  {
    id: 3,
    author: "Анна Петрова",
    authorInitials: "АП",
    authorColor: "from-emerald-400 to-teal-500",
    badge: "Модератор",
    badgeClass: "bg-emerald-500/20 text-emerald-400",
    time: "1 день назад",
    category: "Обсуждение",
    title: "Вопрос к сообществу: архетипы в повседневной жизни",
    content:
      "Прошла тест на юнгианские архетипы и задумалась - насколько они влияют на наш выбор профессии? У меня вышел архетип Мудреца, и действительно, я работаю преподавателем...",
    tags: ["архетипы", "юнг", "вопрос"],
    likes: 156,
    comments: 67,
    shares: 23,
  },
  {
    id: 4,
    author: "Максим Новиков",
    authorInitials: "МН",
    authorColor: "from-amber-400 to-orange-500",
    badge: null,
    badgeClass: "",
    time: "2 дня назад",
    category: "Креативность",
    title: "Творческое мышление: упражнения, которые работают",
    content:
      "Хочу поделиться техниками, которые помогли мне повысить креативность после теста. Особенно эффективной оказалась практика случайных ассоциаций...",
    tags: ["креативность", "практика", "методы"],
    likes: 203,
    comments: 45,
    shares: 34,
  },
]);

const activeResearchers = ref([
  {
    id: 1,
    name: "Мария Иванова",
    initials: "МИ",
    avatarColor: "from-pink-400 to-rose-500",
    status: "Проходит тест...",
  },
  {
    id: 2,
    name: "Игорь Смирнов",
    initials: "ИС",
    avatarColor: "from-cyan-400 to-blue-500",
    status: "Изучает результаты",
  },
  {
    id: 3,
    name: "Ольга Морозова",
    initials: "ОМ",
    avatarColor: "from-purple-400 to-indigo-500",
    status: "В сообществе",
  },
  {
    id: 4,
    name: "Андрей Кузнецов",
    initials: "АК",
    avatarColor: "from-emerald-400 to-teal-500",
    status: "Пишет пост...",
  },
  {
    id: 5,
    name: "Виктория Белова",
    initials: "ВБ",
    avatarColor: "from-amber-400 to-orange-500",
    status: "В аналитике",
  },
]);

const trendingTopics = [
  {
    tag: "эмоциональный_интеллект",
    posts: 234,
    icon: "fas fa-heart-pulse text-pink-400",
    iconBg: "bg-pink-500/10",
  },
  {
    tag: "самопознание",
    posts: 189,
    icon: "fas fa-compass text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    tag: "личностный_рост",
    posts: 156,
    icon: "fas fa-seedling text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    tag: "медитация",
    posts: 143,
    icon: "fas fa-spa text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
];

const upcomingEvents = [
  {
    id: 1,
    day: "15",
    month: "НОЯ",
    dateBg: "bg-cyan-500/10",
    dateColor: "text-cyan-400",
    title: "Вебинар: Эмоциональный интеллект",
    description: "Как развивать EQ в цифровую эпоху",
    time: "19:00 МСК",
    participants: 87,
  },
  {
    id: 2,
    day: "20",
    month: "НОЯ",
    dateBg: "bg-purple-500/10",
    dateColor: "text-purple-400",
    title: "Групповая сессия: Архетипы",
    description: "Разбор результатов с психологом",
    time: "18:00 МСК",
    participants: 24,
  },
  {
    id: 3,
    day: "25",
    month: "НОЯ",
    dateBg: "bg-emerald-500/10",
    dateColor: "text-emerald-400",
    title: "Марафон осознанности",
    description: "7 дней практики вместе",
    time: "09:00 МСК",
    participants: 156,
  },
];

const filteredPosts = computed(() => {
  return posts.value;
});

const getCategoryIcon = (category) => {
  const icons = {
    "Эмоциональный интеллект": "fas fa-heart-pulse text-pink-400",
    Личность: "fas fa-brain text-purple-400",
    Обсуждение: "fas fa-comments text-cyan-400",
    Креативность: "fas fa-lightbulb text-amber-400",
  };
  return icons[category] || "fas fa-circle";
};
</script>
