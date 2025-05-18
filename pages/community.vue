<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white"
  >
    <!-- Navigation Bar -->
    <nav
      class="py-4 px-4 sm:px-6 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700"
    >
      <div
        class="container mx-auto max-w-6xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0"
      >
        <h2 class="text-xl font-bold text-blue-400">Сообщество</h2>
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <!-- Search Input -->
          <div class="relative flex-1">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Поиск участников..."
              class="w-full py-2.5 px-4 pr-10 rounded-lg bg-slate-700/90 border border-slate-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <!-- Sort Dropdown -->
          <select
            v-model="sortBy"
            @change="sortUsers"
            class="py-2.5 px-4 rounded-lg bg-slate-700/90 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="date" class="bg-slate-700 text-white">
              По дате регистрации
            </option>
            <option value="name" class="bg-slate-700 text-white">
              По имени
            </option>
          </select>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="px-6 xl:px-0 pb-20 pt-8">
      <div class="container mx-auto max-w-6xl">
        <!-- Page Header -->
        <header class="mb-10">
          <h1
            class="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Сообщество
          </h1>
          <p class="text-center text-gray-400 mt-2">
            Познакомьтесь со всеми участниками нашего сообщества
          </p>
          <div class="flex justify-center mt-6">
            <div
              class="stats flex bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600"
            >
              <div class="stat px-6 py-3 text-center border-r border-slate-600">
                <div class="text-gray-400 text-sm">Всего участников</div>
                <div class="text-2xl font-bold text-blue-400">
                  {{ users.length }}
                </div>
              </div>
              <div class="stat px-6 py-3 text-center border-r border-slate-600">
                <div class="text-gray-400 text-sm">Онлайн</div>
                <div class="text-2xl font-bold text-green-400">
                  {{ getRandomOnlineCount() }}
                </div>
              </div>
              <div class="stat px-6 py-3 text-center">
                <div class="text-gray-400 text-sm">Новых за неделю</div>
                <div class="text-2xl font-bold text-purple-400">
                  {{ getNewUsersCount() }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"
          ></div>
          <p>Загрузка участников сообщества...</p>
        </div>

        <!-- Error State -->
        <div
          v-if="error"
          class="text-center bg-red-900/20 border border-red-700 rounded-lg p-4 my-6 animate-pulse"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-red-500 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-red-400">{{ error }}</p>
          <button
            @click="fetchUsers"
            class="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Попробовать снова
          </button>
        </div>

        <!-- Users Grid -->
        <section
          v-if="!loading && filteredUsers.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <div
            v-for="user in paginatedUsers"
            :key="user.uid"
            class="bg-slate-700/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-slate-600/50 hover:translate-y-[-2px] border border-slate-600/50 hover:border-blue-500/50"
            :class="{ 'border-l-4 border-l-green-500': isUserOnline(user) }"
          >
            <div class="flex items-center mb-4">
              <div
                v-if="user.photoURL"
                class="h-14 w-14 rounded-full bg-center bg-cover mr-4 ring-2 ring-offset-2 ring-offset-slate-700 ring-blue-500"
                :style="`background-image: url(${user.photoURL})`"
              ></div>
              <div
                v-else
                class="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4 ring-2 ring-offset-2 ring-offset-slate-700 ring-blue-500"
              >
                <span class="text-lg font-bold">{{
                  getUserInitials(user)
                }}</span>
              </div>
              <div>
                <div class="flex items-center">
                  <h2 class="text-xl font-semibold truncate">
                    {{ user.displayName || "Аноним" }}
                  </h2>
                  <span
                    v-if="isUserNew(user)"
                    class="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full"
                    >Новый</span
                  >
                  <span
                    v-if="isUserOnline(user)"
                    class="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"
                  ></span>
                </div>
                <p class="text-gray-300 text-sm truncate">{{ user.email }}</p>
                <div class="flex mt-1 gap-1">
                  <span
                    v-for="(tag, index) in getUserTags(user)"
                    :key="index"
                    class="px-2 py-0.5 bg-slate-600 text-xs rounded-full text-gray-300"
                    >{{ tag }}</span
                  >
                </div>
              </div>
            </div>
            <div class="mt-4 text-sm text-gray-300">
              <p>{{ user.bio || "Нет информации о пользователе" }}</p>
            </div>
            <div
              class="flex justify-between items-center mt-4 pt-3 border-t border-slate-600"
            >
              <p class="text-gray-400 text-sm">
                Присоединился: {{ formatDate(user.createdAt) }}
              </p>
              <div class="flex gap-2">
                <button
                  @click="sendMessage(user)"
                  class="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Сообщение
                </button>
                <button
                  @click="viewProfile(user)"
                  class="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Профиль
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Empty Search Results -->
        <div
          v-if="!loading && searchQuery && filteredUsers.length === 0 && !error"
          class="text-center py-12 bg-slate-700/30 rounded-lg"
        >
          <div class="inline-block p-3 rounded-full bg-slate-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p class="text-lg">
            По запросу "{{ searchQuery }}" ничего не найдено
          </p>
          <p class="text-gray-400 mt-2">
            Попробуйте изменить запрос или сбросить фильтры
          </p>
          <button
            @click="resetSearch"
            class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-sm transition-colors duration-200"
          >
            Сбросить поиск
          </button>
        </div>

        <!-- No Users State -->
        <div
          v-if="!loading && !searchQuery && users.length === 0 && !error"
          class="text-center py-12 bg-slate-700/30 rounded-lg"
        >
          <div class="inline-block p-3 rounded-full bg-slate-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <p class="text-lg">Участников сообщества не найдено</p>
          <p class="text-gray-400 mt-2">
            Пожалуйста, проверьте позднее или пригласите новых участников
          </p>
          <button
            @click="showInviteModal = true"
            class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-sm font-medium transition-colors duration-200 flex items-center mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Пригласить участников
          </button>
        </div>

        <!-- Pagination -->
        <div
          v-if="!loading && filteredUsers.length > 0 && totalPages > 1"
          class="mt-10 flex justify-center"
        >
          <div class="flex space-x-1">
            <button
              @click="goToPage(1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              «
            </button>
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            <template v-for="page in displayedPages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 rounded-md',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600',
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-3 py-1">{{ page }}</span>
            </template>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
            <button
              @click="goToPage(totalPages)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Invite Modal -->
    <div
      v-if="showInviteModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-20 px-4"
    >
      <div
        class="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700 shadow-xl"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Пригласить участников</h3>
          <button
            @click="showInviteModal = false"
            class="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Email адрес</label>
          <input
            v-model="inviteEmail"
            type="email"
            placeholder="Email пользователя"
            class="w-full py-2 px-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <label class="block text-sm text-gray-400 mb-1"
            >Сообщение (опционально)</label
          >
          <textarea
            v-model="inviteMessage"
            placeholder="Добавьте персональное сообщение к приглашению"
            class="w-full py-2 px-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 h-24"
          ></textarea>
          <div class="flex justify-end gap-3 mt-4">
            <button
              @click="showInviteModal = false"
              class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md"
            >
              Отмена
            </button>
            <button
              @click="sendInvite"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
            >
              Отправить приглашение
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToastRef"
      class="fixed bottom-4 right-4 bg-slate-700 border-l-4 border-green-500 text-white p-4 rounded-md shadow-lg flex items-center z-50 animate-fade-in-right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-green-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { getUsers } from "~/api/firebase/users";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

// Router
const router = useRouter();

// State
const users = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const perPage = ref(9);
const searchQuery = ref("");
const sortBy = ref("date");
const showInviteModal = ref(false);
const inviteEmail = ref("");
const inviteMessage = ref("");
const showToastRef = ref(false);
const toastMessage = ref("");

// Auth
const authStore = useAuthStore();

// Computed
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;

  const query = searchQuery.value.toLowerCase();
  return users.value.filter((user) => {
    return (
      (user.displayName && user.displayName.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query))
    );
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / perPage.value);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredUsers.value.slice(start, end);
});

// Calculate displayed pagination numbers
const displayedPages = computed(() => {
  const totalPagesCount = totalPages.value;
  const current = currentPage.value;

  if (totalPagesCount <= 7) {
    return Array.from({ length: totalPagesCount }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, 5, "...", totalPagesCount];
  }

  if (current >= totalPagesCount - 2) {
    return [
      1,
      "...",
      totalPagesCount - 4,
      totalPagesCount - 3,
      totalPagesCount - 2,
      totalPagesCount - 1,
      totalPagesCount,
    ];
  }

  return [1, "...", current - 1, current, current + 1, "...", totalPagesCount];
});

// Reset page when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Date formatting function with Russian locale
const formatDate = (timestamp) => {
  if (!timestamp) return "Неизвестно";

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get user initials for avatar fallback
const getUserInitials = (user) => {
  if (!user.displayName) return "А";

  const names = user.displayName.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
};

// Mock data-related functions (replace with real implementation)
const isUserOnline = (user) => {
  // In a real app, you'd check online status from Firebase
  // For now, randomly show some users as online
  return user.uid.charCodeAt(0) % 3 === 0;
};

const isUserNew = (user) => {
  if (!user.createdAt) return false;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const createdAt = user.createdAt.toDate
    ? user.createdAt.toDate()
    : new Date(user.createdAt);
  return createdAt > oneWeekAgo;
};

const getUserTags = (user) => {
  // Mock function - in real app, get tags from user data
  // For demo, assign random tags
  const allTags = [
    "Разработчик",
    "Дизайнер",
    "Маркетолог",
    "Контент",
    "Поддержка",
    "Админ",
  ];
  const userFirstCharCode = user.uid.charCodeAt(0);

  // Return 1-2 tags based on the uid
  if (userFirstCharCode % 4 === 0) {
    return [allTags[0], allTags[1]];
  } else if (userFirstCharCode % 3 === 0) {
    return [allTags[2]];
  } else if (userFirstCharCode % 2 === 0) {
    return [allTags[3], allTags[5]];
  } else {
    return [allTags[4]];
  }
};

const getRandomOnlineCount = () => {
  // Mock function for stats - in real app, use actual data
  return Math.floor(users.value.length / 3);
};

const getNewUsersCount = () => {
  // Count users who joined in the last week
  return users.value.filter((user) => isUserNew(user)).length;
};

// Pagination functions
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Sorting function
const sortUsers = () => {
  if (sortBy.value === "name") {
    users.value.sort((a, b) => {
      const nameA = (a.displayName || "").toLowerCase();
      const nameB = (b.displayName || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });
  } else {
    // Sort by date
    users.value.sort((a, b) => {
      const dateA = a.createdAt
        ? a.createdAt.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt)
        : new Date(0);
      const dateB = b.createdAt
        ? b.createdAt.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt)
        : new Date(0);
      return dateB - dateA; // Most recent first
    });
  }
};

// Reset search
const resetSearch = () => {
  searchQuery.value = "";
  currentPage.value = 1;
};

// Search handler with debounce
let debounceTimeout;
const handleSearch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    // Search logic is handled by computed property
    currentPage.value = 1; // Reset to first page on search
  }, 300);
};

// User actions
const viewProfile = (user) => {
  // Navigate to user profile
  router.push(`/profile/${user.uid}`);
  showToast("Открытие профиля...");
};

const sendMessage = (user) => {
  // Navigate to chat with this user
  router.push(`/messages?uid=${user.uid}`);
  showToast(`Открытие чата с ${user.displayName || "пользователем"}`);
};

const sendInvite = () => {
  // In a real app, send an invitation via your backend service
  if (!inviteEmail.value) {
    error.value = "Пожалуйста, введите email";
    return;
  }

  // Mock successful invite
  showInviteModal.value = false;
  showToast(`Приглашение отправлено на ${inviteEmail.value}`);

  // Reset form
  inviteEmail.value = "";
  inviteMessage.value = "";
};

// Toast notification
const showToast = (message) => {
  toastMessage.value = message;
  showToastRef.value = true;

  setTimeout(() => {
    showToastRef.value = false;
  }, 3000);
};

// Fetch users function
const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  if (!authStore.user) {
    error.value = "Пожалуйста, войдите в систему, чтобы просмотреть сообщество";
    loading.value = false;
    return;
  }

  try {
    users.value = await getUsers();
    currentPage.value = 1; // Reset to first page when fetching new data
    sortUsers(); // Apply default sort
  } catch (err) {
    error.value = "Не удалось загрузить участников сообщества: " + err.message;
  } finally {
    loading.value = false;
  }
};

// Fetch users on mount
onMounted(fetchUsers);
</script>

<style scoped>
/* Ensure select dropdown options are styled */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23CBD5E1' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

/* Ensure select options have proper styling in all browsers */
option {
  background-color: #334155;
  color: white;
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  select {
    min-width: 100%;
  }
}

/* Custom animations */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.hover-pulse:hover {
  animation: pulse 2s infinite;
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-right {
  animation: fade-in-right 0.3s ease-out forwards;
}
</style>
