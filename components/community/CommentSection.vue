<template>
  <div class="space-y-6">
    <h3 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat flex items-center space-x-2">
      <i class="fas fa-comments text-orange-500 dark:text-orange-400"></i>
      <span>Комментарии</span>
      <span class="text-slate-400 dark:text-slate-500 text-sm font-normal ml-2">({{ comments.length }})</span>
    </h3>

    <!-- Add Comment Form -->
    <div v-if="authStore.user" class="bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4 shadow-sm dark:shadow-none">
      <div class="flex items-start space-x-3">
        <div
          v-if="authStore.user.photoURL"
          class="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
          :style="{ backgroundImage: `url(${authStore.user.photoURL})` }"
        ></div>
        <div
          v-else
          class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold flex-shrink-0"
        >
          {{ getInitials(authStore.user.displayName || authStore.user.email) }}
        </div>
        <div class="flex-1">
          <textarea
            v-model="newComment"
            rows="3"
            placeholder="Напишите комментарий..."
            class="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all resize-none text-sm"
          ></textarea>
          <div class="flex justify-end mt-2">
            <button
              @click="submitComment"
              :disabled="!newComment.trim() || isSubmitting"
              class="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all flex items-center space-x-2"
            >
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
              <span>Отправить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 p-6 text-center shadow-sm dark:shadow-none">
      <p class="text-slate-600 dark:text-slate-400 mb-4">Войдите, чтобы оставить комментарий</p>
      <NuxtLink to="/auth" class="inline-block px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg text-sm font-medium transition-colors">
        Войти
      </NuxtLink>
    </div>

    <!-- Comments List -->
    <div class="space-y-4">
      <div v-if="loading" class="text-center py-8">
        <i class="fas fa-spinner fa-spin text-2xl text-orange-400"></i>
      </div>
      
      <div v-else-if="comments.length === 0" class="text-center py-8 text-slate-500 dark:text-slate-500">
        <p>Пока нет комментариев. Будьте первым!</p>
      </div>

      <div
        v-else
        v-for="comment in comments"
        :key="comment.id"
        class="bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 p-4 shadow-sm dark:shadow-none"
      >
        <div class="flex items-start space-x-3">
          <div
            v-if="comment.authorAvatar"
            class="w-8 h-8 rounded-full bg-cover bg-center flex-shrink-0"
            :style="{ backgroundImage: `url(${comment.authorAvatar})` }"
          ></div>
          <div
            v-else
            class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          >
            {{ getInitials(comment.authorName) }}
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-slate-900 dark:text-white font-medium text-sm">{{ comment.authorName }}</span>
              <span class="text-slate-400 dark:text-slate-500 text-xs">{{ formatTime(comment.createdAt) }}</span>
            </div>
            <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useCommunity } from '~/composables/useCommunity';
import { useNotification } from '~/composables/useNotification';

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:count']);

const authStore = useAuthStore();
const { addComment, subscribeToComments } = useCommunity();
const { showNotification } = useNotification();

const comments = ref([]);
const newComment = ref('');
const isSubmitting = ref(false);
const loading = ref(true);
let unsubscribe = null;

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  // Handle Firestore Timestamp
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  
  const now = new Date();
  const diff = now - date;
  
  // Less than 1 minute
  if (diff < 60000) return 'Только что';
  
  // Less than 1 hour
  if (diff < 3600000) return `${Math.floor(diff / 60000)} мин. назад`;
  
  // Less than 24 hours
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч. назад`;
  
  // Format date
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;
  
  isSubmitting.value = true;
  try {
    await addComment(props.postId, newComment.value);
    newComment.value = '';
    showNotification('Комментарий добавлен', 'success');
  } catch (error) {
    console.error('Error adding comment:', error);
    showNotification('Не удалось добавить комментарий', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  unsubscribe = subscribeToComments(props.postId, (updatedComments) => {
    comments.value = updatedComments;
    loading.value = false;
    emit('update:count', updatedComments.length);
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>
