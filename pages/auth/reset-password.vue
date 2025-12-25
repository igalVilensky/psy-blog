<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden">
        <!-- Background Visualizer (Same as Login/Register) -->
        <div class="fixed inset-0 z-0 pointer-events-none opacity-40 md:opacity-100">
            <div
                class="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/20 to-slate-50/80 dark:from-slate-950/80 dark:via-slate-950/20 dark:to-slate-950/80">
            </div>
        </div>

        <div class="w-full max-w-md relative z-10">
            <!-- Logo/Header -->
            <div class="text-center mb-8">
                <div
                    class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4 shadow-lg shadow-cyan-500/30">
                    <i class="fas fa-key text-white text-3xl"></i>
                </div>
                <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Сброс пароля</h1>
                <p class="text-slate-600 dark:text-slate-400">Придумайте новый надежный пароль</p>
            </div>

            <!-- Card -->
            <div
                class="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-800/60 shadow-xl dark:shadow-2xl">

                <!-- Loading State (Verifying Code) -->
                <div v-if="isVerifyingCode" class="flex flex-col items-center justify-center py-8">
                    <div class="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4">
                    </div>
                    <p class="text-slate-600 dark:text-slate-400">Проверка ссылки...</p>
                </div>

                <!-- Success State -->
                <div v-else-if="isSuccess" class="text-center py-6">
                    <div class="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-green-500 text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Пароль изменен!</h3>
                    <p class="text-slate-600 dark:text-slate-400 mb-6">Теперь вы можете войти с новым паролем.</p>
                    <NuxtLink to="/login"
                        class="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                        Войти в аккаунт
                    </NuxtLink>
                </div>

                <!-- Error State (Invalid Code) -->
                <div v-else-if="codeError" class="text-center py-6">
                    <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Ошибка ссылки</h3>
                    <p class="text-slate-600 dark:text-slate-400 mb-6">{{ codeError }}</p>
                    <NuxtLink to="/login" class="text-cyan-600 dark:text-cyan-400 font-medium hover:underline">
                        Вернуться на страницу входа
                    </NuxtLink>
                </div>

                <!-- Reset Form -->
                <form v-else @submit.prevent="handleResetPassword" class="space-y-6">

                    <!-- New Password -->
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Новый пароль</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-slate-400"></i>
                            </div>
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" required minlength="6"
                                class="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                placeholder="Минимум 6 символов" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Подтвердите
                            пароль</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-slate-400"></i>
                            </div>
                            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required
                                minlength="6"
                                class="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                placeholder="Повторите пароль" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error"
                        class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                        <i class="fas fa-exclamation-circle text-red-500 mt-0.5"></i>
                        <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                        <i v-if="isLoading" class="fas fa-circle-notch fa-spin"></i>
                        <span>{{ isLoading ? 'Сохранение...' : 'Сохранить новый пароль' }}</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

const route = useRoute();
const router = useRouter();
const auth = getAuth();

const oobCode = route.query.oobCode;

// State
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const isVerifyingCode = ref(true);
const isSuccess = ref(false);
const error = ref('');
const codeError = ref('');

// Verify code on mount
onMounted(async () => {
    if (!oobCode) {
        codeError.value = 'Отсутствует код сброса пароля. Пожалуйста, перейдите по ссылке из письма.';
        isVerifyingCode.value = false;
        return;
    }

    try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        // Code is valid
        isVerifyingCode.value = false;
    } catch (err) {
        console.error('Error verifying code:', err);
        isVerifyingCode.value = false;
        codeError.value = 'Ссылка для сброса пароля недействительна или устарела. Попробуйте запросить сброс снова.';
    }
});

const handleResetPassword = async () => {
    error.value = '';

    if (password.value !== confirmPassword.value) {
        error.value = 'Пароли не совпадают';
        return;
    }

    if (password.value.length < 6) {
        error.value = 'Пароль должен содержать минимум 6 символов';
        return;
    }

    isLoading.value = true;

    try {
        await confirmPasswordReset(auth, oobCode, password.value);
        isSuccess.value = true;
    } catch (err) {
        console.error('Error resetting password:', err);
        if (err.code === 'auth/weak-password') {
            error.value = 'Пароль слишком простой. Используйте более сложный пароль.';
        } else if (err.code === 'auth/expired-action-code') {
            error.value = 'Ссылка устарела. Запросите сброс пароля заново.';
        } else if (err.code === 'auth/invalid-action-code') {
            error.value = 'Неверная ссылка. Запросите сброс пароля заново.';
        } else {
            error.value = 'Произошла ошибка при сбросе пароля. Попробуйте позже.';
        }
    } finally {
        isLoading.value = false;
    }
};

// Set page meta
useHead({
    title: 'Сброс пароля | MindQ Lab',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
});
</script>

