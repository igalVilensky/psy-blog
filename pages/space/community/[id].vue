<template>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
    <div class="max-w-3xl mx-auto">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" class="mb-6" />

      <!-- Loading State -->
      <div v-if="loading" class="bg-slate-800/30 rounded-xl border border-slate-700/50 p-5 animate-pulse">
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

      <!-- Error State -->
      <div v-else-if="error || !post" class="bg-slate-800/30 rounded-xl border border-slate-700/50 p-12 text-center">
        <i class="fas fa-exclamation-circle text-5xl text-slate-600 mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">Пост не найден</h3>
        <p class="text-slate-400 mb-6">
          Возможно, он был удален или ссылка неверна.
        </p>
        <NuxtLink to="/space/community"
          class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all">
          Вернуться в ленту
        </NuxtLink>
      </div>

      <!-- Post Card -->
      <PostCard v-else :post="post" :is-liked="isPostLikedByUser(post)" :is-saved="savedPosts.includes(post.id)"
        @like="handleLike" @comment="handleComment" @share="handleShare" @save="handleSave" />

      <!-- Comments Section -->
      <div v-if="post" class="mt-8 comment-section">
        <CommentSection :post-id="post.id" @update:count="(count) => { if (post) post.comments = count }" />
      </div>
    </div>

    <!-- Notification -->
    <Notification v-if="notificationMessage" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-[100]" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useCommunity } from "~/composables/useCommunity";
import { useNotification } from "~/composables/useNotification";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useNuxtApp } from "#app";
import PostCard from "~/components/community/PostCard.vue";
import CommentSection from "~/components/community/CommentSection.vue";
import Notification from "~/components/base/Notification.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const route = useRoute();
const authStore = useAuthStore();
const {
  getPostById,
  toggleLike,
  isPostLikedByUser,
  sharePost,
  addComment,
  toggleSavePost
} = useCommunity();
const { notificationMessage, notificationType, showNotification, hideNotification } = useNotification();

const post = ref(null);
const loading = ref(true);
const error = ref(null);
const savedPosts = ref([]);
let unsubscribe = null;

// Breadcrumb items with post title
const breadcrumbItems = computed(() => {
  const items = [
    { label: 'Сообщество', to: '/space/community' }
  ];

  if (post.value?.title) {
    // Truncate title if too long
    const title = post.value.title.length > 50
      ? post.value.title.substring(0, 50) + '...'
      : post.value.title;
    items.push({ label: title, to: null });
  }

  return items;
});

// Subscribe to post updates
const subscribeToSinglePost = (postId) => {
  const { $firestore } = useNuxtApp();
  const docRef = doc($firestore, "community_posts", postId);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      post.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      error.value = "Пост не найден";
    }
    loading.value = false;
  }, (err) => {
    console.error("Error subscribing to post:", err);
    error.value = "Ошибка загрузки поста";
    loading.value = false;
  });
};

const handleLike = async (postItem) => {
  if (!authStore.user) {
    showNotification("Войдите, чтобы ставить лайки", "warning");
    return;
  }

  try {
    await toggleLike(postItem.id);
    // Refresh post data to update like count locally if needed, 
    // but toggleLike usually updates local state if we were using the main list.
    // For single post, we might need to update the local post object manually or re-fetch.
    // Since toggleLike returns void and updates Firestore, we should update local state.
    // A simple way is to re-fetch or manually toggle.
    // Let's manually toggle for immediate feedback + re-fetch.

    // Actually, useCommunity's toggleLike doesn't return the new count.
    // But we can just re-fetch the post.
    const updatedPost = await getPostById(postItem.id);
    if (updatedPost) post.value = updatedPost;

  } catch (err) {
    console.error("Error liking post:", err);
    showNotification("Не удалось поставить лайк", "error");
  }
};

const handleComment = () => {
  // Scroll to comment section
  const commentSection = document.querySelector('.comment-section');
  if (commentSection) {
    commentSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleShare = async (postItem) => {
  try {
    await sharePost(postItem.id);

    const link = window.location.href;
    await navigator.clipboard.writeText(link);

    showNotification("Ссылка скопирована! Теперь вы можете отправить её другу.", "success");

    // Refresh post
    const updatedPost = await getPostById(postItem.id);
    if (updatedPost) post.value = updatedPost;
  } catch (err) {
    showNotification("Не удалось поделиться постом", "error");
  }
};

const handleSave = async (postItem) => {
  if (!authStore.user) {
    showNotification("Войдите, чтобы сохранять посты", "warning");
    return;
  }

  try {
    const isSaved = await toggleSavePost(postItem.id);

    if (isSaved) {
      savedPosts.value.push(postItem.id);
      showNotification("Пост сохранён", "success");
    } else {
      savedPosts.value = savedPosts.value.filter(id => id !== postItem.id);
      showNotification("Пост удалён из сохранённых", "success");
    }
  } catch (err) {
    showNotification("Не удалось сохранить пост", "error");
  }
};

onMounted(async () => {
  const postId = route.params.id;
  if (!postId) {
    error.value = "ID поста не указан";
    loading.value = false;
    return;
  }

  // Subscribe to real-time updates
  unsubscribe = subscribeToSinglePost(postId);

  // Initialize saved posts from user profile
  if (authStore.user) {
    try {
      const { $firestore } = useNuxtApp();
      const userDocRef = doc($firestore, "users", authStore.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().savedPosts) {
        savedPosts.value = userDoc.data().savedPosts;
      }
    } catch (err) {
      console.error("Error fetching saved posts:", err);
    }
  }
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>
