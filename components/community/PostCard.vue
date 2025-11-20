<template>
  <div
    class="bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 overflow-hidden group"
  >
    <!-- Post Header -->
    <div class="p-5 border-b border-slate-700/50">
      <div class="flex items-start space-x-3">
        <div
          class="w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold flex-shrink-0"
          :class="getAuthorColor(post.authorId)"
        >
          {{ getAuthorInitials(post.authorName) }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center space-x-2">
              <span class="text-white font-medium truncate">
                {{ post.authorName }}
              </span>
              <span
                v-if="post.authorId === authStore.user?.uid"
                class="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20"
              >
                Вы
              </span>
            </div>
            <span class="text-slate-400 text-xs whitespace-nowrap">
              {{ formatTime(post.createdAt) }}
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <i :class="getCategoryIcon(post.category)" class="text-xs"></i>
            <span class="text-slate-400 text-xs">{{ post.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="p-5">
      <NuxtLink :to="`/lab/community/${post.id}`" class="block group-hover:opacity-90 transition-opacity">
        <h3 class="text-xl font-bold text-white mb-3 leading-tight">
          {{ post.title }}
        </h3>
        <p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4">
          {{ post.content }}
        </p>
      </NuxtLink>

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
          @click="$emit('like', post)"
          :disabled="!authStore.user"
          class="flex items-center space-x-2 transition-colors group/like"
          :class="isLiked ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            :class="isLiked ? 'bg-cyan-500/10' : 'bg-slate-700/50 group-hover/like:bg-cyan-500/10'"
          >
            <i class="fas fa-heart text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ post.likes || 0 }}</span>
        </button>
        <NuxtLink
          :to="`/lab/community/${post.id}`"
          class="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors group/comment"
        >
          <div
            class="w-8 h-8 rounded-lg bg-slate-700/50 group-hover/comment:bg-purple-500/10 flex items-center justify-center transition-colors"
          >
            <i class="fas fa-comment text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ post.comments || 0 }}</span>
        </NuxtLink>
        <button
          @click="$emit('share', post)"
          class="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors group/share"
        >
          <div
            class="w-8 h-8 rounded-lg bg-slate-700/50 group-hover/share:bg-emerald-500/10 flex items-center justify-center transition-colors"
          >
            <i class="fas fa-share text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ post.shares || 0 }}</span>
        </button>
        <button
          @click="$emit('save', post)"
          :disabled="!authStore.user"
          class="ml-auto flex items-center space-x-2 transition-colors group/save"
          :class="isSaved ? 'text-amber-400' : 'text-slate-400 hover:text-amber-400'"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            :class="isSaved ? 'bg-amber-500/10' : 'bg-slate-700/50 group-hover/save:bg-amber-500/10'"
          >
            <i class="fas text-sm" :class="isSaved ? 'fa-bookmark' : 'fa-bookmark'"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  isSaved: {
    type: Boolean,
    default: false
  }
});

defineEmits(['like', 'comment', 'share', 'save']);

const authStore = useAuthStore();

const getCategoryIcon = (category) => {
  const icons = {
    "Эмоциональный интеллект": "fas fa-heart-pulse text-pink-400",
    Личность: "fas fa-brain text-purple-400",
    Обсуждение: "fas fa-comments text-cyan-400",
    Креативность: "fas fa-lightbulb text-amber-400",
    Медитация: "fas fa-spa text-cyan-400",
    Осознанность: "fas fa-eye text-purple-400",
    "Личностный рост": "fas fa-seedling text-emerald-400",
    Архетипы: "fas fa-masks-theater text-orange-400",
  };
  return icons[category] || "fas fa-circle";
};

const getAuthorInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return name.substring(0, 2).toUpperCase();
};

const getAuthorColor = (authorId) => {
  const colors = [
    "from-cyan-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
    "from-pink-400 to-rose-500",
    "from-indigo-400 to-purple-500",
  ];
  
  // Generate consistent color based on authorId
  const hash = authorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const formatTime = (timestamp) => {
  if (!timestamp) return "недавно";
  
  // Handle Firestore Timestamp
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "только что";
  if (diffMins < 60) return `${diffMins} мин назад`;
  if (diffHours < 24) return `${diffHours} ч назад`;
  if (diffDays < 7) return `${diffDays} д назад`;
  
  return date.toLocaleDateString('ru-RU');
};
</script>
