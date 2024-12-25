<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <!-- Profile Avatar -->
            <div class="relative">
              <div
                class="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center"
              >
                <span class="text-3xl font-semibold text-pink-600">
                  {{ user?.displayName?.charAt(0).toUpperCase() || "U" }}
                </span>
              </div>
              <div
                class="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-4 border-white"
              ></div>
            </div>

            <!-- Greeting & Status -->
            <div>
              <h1 class="text-2xl font-bold text-gray-800 mb-2">
                {{ user?.displayName || "User" }}
              </h1>
              <p class="text-gray-600">Активный пользователь</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <button
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i class="fas fa-cog mr-2"></i>
              Настройки
            </button>
            <button
              @click="logoutUser"
              class="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>
              Выйти
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Favorite Posts -->
        <div class="md:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-bookmark text-pink-600 mr-2"></i>
                Избранные статьи
              </h2>
              <button
                class="text-sm text-gray-600 hover:text-pink-600 transition-colors"
              >
                Смотреть все
              </button>
            </div>

            <!-- Favorite Posts List -->
            <div class="space-y-6">
              <div
                v-for="i in 3"
                :key="i"
                class="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  :src="hostImage"
                  class="w-30 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 class="font-medium text-gray-800 mb-2">
                    Название избранной статьи
                  </h3>
                  <div class="flex items-center text-sm text-gray-600">
                    <span class="flex items-center">
                      <i class="far fa-clock mr-1"></i>
                      5 мин чтения
                    </span>
                    <span class="mx-2">•</span>
                    <span class="text-pink-600">Личностный рост</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats & Activity -->
        <div class="space-y-8">
          <!-- Quick Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-chart-line text-pink-600 mr-2"></i>
              Статистика
            </h2>
            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">Прочитано статей</div>
                <div class="text-xl font-semibold text-gray-800">24</div>
              </div>
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">В избранном</div>
                <div class="text-xl font-semibold text-gray-800">12</div>
              </div>
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div class="text-gray-600">Комментариев</div>
                <div class="text-xl font-semibold text-gray-800">8</div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-xl font-bold text-gray-800 mb-6">
              <i class="fas fa-history text-pink-600 mr-2"></i>
              Недавняя активность
            </h2>
            <div class="space-y-4">
              <div v-for="i in 4" :key="i" class="flex items-start gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-book-reader text-pink-600"></i>
                </div>
                <div>
                  <p class="text-gray-800">
                    Прочитали статью "Название статьи"
                  </p>
                  <p class="text-sm text-gray-500">2 часа назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { getUserProfile } from "~/utils/firebase";
import hostImage from "~/assets/images/podcasts/podcasts.jpeg";

const user = ref(null);
const router = useRouter();
const error = ref(null);

const auth = getAuth();

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    try {
      const userProfile = await getUserProfile(currentUser.uid);
      user.value = userProfile;
    } catch (err) {
      error.value = "Failed to load user profile";
      console.error(err);
    }
  } else {
    // Redirect to login if no user is authenticated
    router.push("/login");
  }
});

const logoutUser = async () => {
  await signOut(auth);
  router.push("/login");
};
</script>
