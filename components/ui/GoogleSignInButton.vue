<template>
    <button type="button" @click="handleGoogleLogin" :disabled="authStore.googleLoading || authStore.loading"
        class="w-full relative group overflow-hidden px-6 py-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-mindqlab-calm-accent dark:hover:border-mindqlab-calm-accent transition-all duration-300 shadow-sm hover:shadow-md">
        <div class="relative z-10 flex items-center justify-center gap-3">
            <img v-if="!authStore.googleLoading"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-5 h-5" />
            <i v-else class="fas fa-spinner fa-spin text-mindqlab-calm-accent"></i>

            <span
                class="text-sm font-medium text-stone-700 dark:text-stone-200 group-hover:text-mindqlab-calm-accent transition-colors">
                {{ authStore.googleLoading ? 'Вход через Google...' : label }}
            </span>
        </div>

        <!-- Hover Gradinet -->
        <div
            class="absolute inset-0 bg-gradient-to-r from-mindqlab-calm-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
    </button>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const props = defineProps({
    label: {
        type: String,
        default: "Войти через Google"
    },
    redirectUrl: {
        type: String,
        default: "/profile"
    }
});

const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(['error']);

const handleGoogleLogin = async () => {
    try {
        await authStore.loginWithGoogle();
        router.push(props.redirectUrl);
    } catch (error) {
        emit('error', error.message);
    }
};
</script>
