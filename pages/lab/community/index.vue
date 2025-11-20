<!-- pages/lab/community.vue -->
<template>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8 relative">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-container">
        <div class="loading-spinner-wrapper">
          <div class="spinner-ring spinner-ring-1"></div>
          <div class="spinner-ring spinner-ring-2"></div>
          <div class="spinner-ring spinner-ring-3"></div>
          <div class="spinner-core">
            <i class="fas fa-users text-3xl text-orange-400"></i>
          </div>
        </div>
        <div class="loading-text">
          <h3 class="text-xl font-bold text-white mb-2">Загрузка сообщества</h3>
          <p class="text-slate-400 text-sm">Ищем единомышленников...</p>
        </div>
        <div class="loading-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
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
          <!-- Create Post Button (Authenticated Users Only) -->
          <button
            v-if="authStore.user"
            @click="showCreatePostModal = true"
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
            {{ stats.members || 0 }}
          </div>
          <div class="text-slate-400 text-xs">Участников</div>
        </div>
        <div class="bg-slate-800/30 rounded-xl p-4 border border-purple-500/20">
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.posts || 0 }}
          </div>
          <div class="text-slate-400 text-xs">Постов</div>
        </div>
        <div class="bg-slate-800/30 rounded-xl p-4 border border-cyan-500/20">
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.discussions || 0 }}
          </div>
          <div class="text-slate-400 text-xs">Обсуждений</div>
        </div>
        <div
          class="bg-slate-800/30 rounded-xl p-4 border border-emerald-500/20"
        >
          <div class="text-2xl font-bold text-white mb-1 font-mono">
            {{ stats.insights || 0 }}
          </div>
          <div class="text-slate-400 text-xs">Инсайтов</div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Feed -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Auth CTA for non-authenticated users -->
        <AuthCTA v-if="!authStore.user" />

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

        <!-- Loading State -->
        <div v-if="loading" class="space-y-4">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-slate-800/30 rounded-xl border border-slate-700/50 p-5 animate-pulse"
          >
            <div class="flex items-start space-x-3 mb-4">
              <div class="w-12 h-12 rounded-full bg-slate-700"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-slate-700 rounded w-1/4"></div>
                <div class="h-3 bg-slate-700 rounded w-1/3"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-slate-700 rounded w-3/4"></div>
              <div class="h-3 bg-slate-700 rounded w-full"></div>
              <div class="h-3 bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!loading && filteredPosts.length === 0"
          class="bg-slate-800/30 rounded-xl border border-slate-700/50 p-12 text-center"
        >
          <i class="fas fa-comments text-5xl text-slate-600 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">Пока нет постов</h3>
          <p class="text-slate-400 mb-6">
            Станьте первым, кто поделится своим опытом!
          </p>
          <button
            v-if="authStore.user"
            @click="showCreatePostModal = true"
            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-orange-500/25"
          >
            Создать первый пост
          </button>
        </div>

        <!-- Posts Feed -->
        <div v-else class="space-y-4">
          <PostCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            :is-liked="isPostLikedByUser(post)"
            :is-saved="savedPosts.includes(post.id)"
            @like="handleLike"
            @comment="handleComment"
            @share="handleShare"
            @save="handleSave"
          />
        </div>

        <!-- Load More -->
        <button
          v-if="!loading && filteredPosts.length > 0"
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
          <div v-if="loadingTopics" class="space-y-3">
            <div v-for="i in 5" :key="i" class="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 animate-pulse">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-slate-600"></div>
                <div class="space-y-2">
                  <div class="h-3 bg-slate-600 rounded w-20"></div>
                  <div class="h-2 bg-slate-600 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="trendingTopics.length === 0" class="text-center py-8">
            <i class="fas fa-tags text-3xl text-slate-600 mb-2"></i>
            <p class="text-slate-500 text-sm">Нет популярных тем</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="(topic, index) in trendingTopics"
              :key="topic.tag"
              class="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer group"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center"
                  :class="getTopicIconBg(index)"
                >
                  <i class="fas fa-hashtag text-sm"></i>
                </div>
                <div>
                  <div
                    class="text-white text-sm font-medium group-hover:text-orange-400 transition-colors"
                  >
                    #{{ topic.tag }}
                  </div>
                  <div class="text-slate-400 text-xs">
                    {{ topic.count }} {{ topic.count === 1 ? 'пост' : 'постов' }}
                  </div>
                </div>
              </div>
              <i
                class="fas fa-arrow-up-right text-slate-500 text-xs group-hover:text-orange-400 transition-colors"
              ></i>
            </div>
          </div>
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

    <!-- Create Post Modal -->
    <CreatePostModal
      v-model="showCreatePostModal"
      @post-created="handlePostCreated"
    />

    <!-- Notification -->
    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-[100]"
    />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useCommunity } from "~/composables/useCommunity";
import { useNotification } from "~/composables/useNotification";
import { doc, getDoc } from "firebase/firestore";
import { useNuxtApp } from "#app";
import CreatePostModal from "~/components/community/CreatePostModal.vue";
import PostCard from "~/components/community/PostCard.vue";
import AuthCTA from "~/components/community/AuthCTA.vue";
import Notification from "~/components/base/Notification.vue";

definePageMeta({
  layout: "laboratory",
});

const authStore = useAuthStore();
const {
  posts,
  stats,
  loading,
  subscribeToPost,
  subscribeToStats,
  toggleLike,
  isPostLikedByUser,
  getStats,
  sharePost,
  addComment,
  toggleSavePost,
  getPopularTopics
} = useCommunity();
const { notificationMessage, notificationType, showNotification, hideNotification } = useNotification();

const activeTab = ref("all");
const onlineUsers = ref(42);
const showCreatePostModal = ref(false);
const savedPosts = ref([]);
const loadingTopics = ref(false);
const isLoading = ref(true);

let unsubscribePosts = null;
let unsubscribeStats = null;

const feedTabs = [
  { id: "all", label: "Все", icon: "fas fa-globe" },
  { id: "popular", label: "Популярное", icon: "fas fa-fire" },
  { id: "following", label: "Подписки", icon: "fas fa-user-check" },
  { id: "saved", label: "Сохранённое", icon: "fas fa-bookmark" },
];

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
]);

const trendingTopics = ref([]);

const filteredPosts = computed(() => {
  let result = posts.value;
  
  // Filter by active tab
  if (activeTab.value === 'saved') {
    if (!authStore.user) return [];
    result = result.filter(post => savedPosts.value.includes(post.id));
  } else if (activeTab.value === 'following') {
    // Placeholder for following logic
    if (!authStore.user) return [];
    // For now, show nothing or implement following logic later
    return []; 
  } else if (activeTab.value === 'popular') {
    // Sort by likes + comments
    return [...result].sort((a, b) => {
      const scoreA = (a.likes || 0) + (a.comments || 0);
      const scoreB = (b.likes || 0) + (b.comments || 0);
      return scoreB - scoreA;
    });
  }
  
  return result;
});

const getTopicIconBg = (index) => {
  const backgrounds = [
    "bg-pink-500/10",
    "bg-purple-500/10",
    "bg-emerald-500/10",
    "bg-cyan-500/10",
    "bg-amber-500/10",
    "bg-orange-500/10",
  ];
  return backgrounds[index % backgrounds.length];
};

// Helper functions moved to PostCard or not needed here anymore
// Keeping formatTime if used elsewhere or passing it down not needed if component handles it
// But PostCard has its own formatTime. 
// We can remove these helpers from here if they are not used in other parts of this file.
// Checking usage... getAuthorColor, getAuthorInitials, getCategoryIcon are used in PostCard.
// They are NOT used in the template anymore because we replaced the card markup with <PostCard>.
// So we can remove them from here to clean up.

const handleLike = async (post) => {
  if (!authStore.user) {
    showNotification("Войдите, чтобы ставить лайки", "warning");
    return;
  }

  try {
    await toggleLike(post.id);
  } catch (error) {
    console.error("Error liking post:", error);
    showNotification("Не удалось поставить лайк", "error");
  }
};

const handleComment = async (post) => {
  if (!authStore.user) {
    showNotification("Войдите, чтобы комментировать", "warning");
    return;
  }

  // For now, just increment the comment count
  // In the future, you can add a comment modal
  try {
    await addComment(post.id, "");
    showNotification("Комментарий добавлен", "success");
  } catch (error) {
    showNotification("Не удалось добавить комментарий", "error");
  }
};

const handleShare = async (post) => {
  try {
    await sharePost(post.id);
    
    // Copy link to clipboard - pointing to the new single post page
    const link = `${window.location.origin}/lab/community/${post.id}`;
    await navigator.clipboard.writeText(link);
    
    showNotification("Ссылка скопирована! Теперь вы можете отправить её другу.", "success");
  } catch (error) {
    showNotification("Не удалось поделиться постом", "error");
  }
};

const handleSave = async (post) => {
  if (!authStore.user) {
    showNotification("Войдите, чтобы сохранять посты", "warning");
    return;
  }

  try {
    const isSaved = await toggleSavePost(post.id);
    
    if (isSaved) {
      savedPosts.value.push(post.id);
      showNotification("Пост сохранён", "success");
    } else {
      savedPosts.value = savedPosts.value.filter(id => id !== post.id);
      showNotification("Пост удалён из сохранённых", "success");
    }
  } catch (error) {
    showNotification("Не удалось сохранить пост", "error");
  }
};

const handlePostCreated = (post) => {
  showNotification("Пост успешно опубликован!", "success");
  showCreatePostModal.value = false;
  // Posts will update automatically via real-time listener
};

const fetchPopularTopics = async () => {
  loadingTopics.value = true;
  try {
    const topics = await getPopularTopics();
    trendingTopics.value = topics;
  } catch (error) {
    console.error("Error fetching popular topics:", error);
  } finally {
    loadingTopics.value = false;
  }
};

onMounted(async () => {
  // Subscribe to real-time updates
  unsubscribePosts = subscribeToPost({ limit: 20 });
  unsubscribeStats = subscribeToStats();
  
  // Also fetch stats initially
  await getStats();
  
  // Fetch popular topics
  await fetchPopularTopics();
  
  // Initialize saved posts from user profile
  if (authStore.user) {
    try {
      const { $firestore } = useNuxtApp();
      const userDocRef = doc($firestore, "users", authStore.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists() && userDoc.data().savedPosts) {
        savedPosts.value = userDoc.data().savedPosts;
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }


  }


  // Simulate loading delay for smooth transition and to ensure auth state is resolved
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

onUnmounted(() => {
  // Cleanup subscriptions
  if (unsubscribePosts) unsubscribePosts();
  if (unsubscribeStats) unsubscribeStats();
});
</script>

<style scoped>
/* Loading State Styles */
.loading-overlay {
  @apply absolute inset-0 bg-slate-900 z-10 flex items-center justify-center;
}

.loading-container {
  @apply flex flex-col items-center gap-8;
}

.loading-spinner-wrapper {
  @apply relative w-32 h-32;
}

.spinner-ring {
  @apply absolute inset-0 rounded-full border-4 border-transparent;
  animation: spin 3s linear infinite;
}

.spinner-ring-1 {
  @apply border-t-orange-500;
  animation-duration: 2s;
}

.spinner-ring-2 {
  @apply border-r-amber-500;
  animation-duration: 3s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-emerald-500;
  animation-duration: 4s;
}

.spinner-core {
  @apply absolute inset-0 flex items-center justify-center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

.loading-text {
  @apply text-center;
}

.loading-progress {
  @apply w-64 h-1 bg-slate-800 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 rounded-full;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 75%;
    margin-left: 0%;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}
</style>
