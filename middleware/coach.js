// middleware/coach.js
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (process.server) return;

    if (!authStore.user || (!authStore.user.isCoach && !authStore.user.superAdmin)) {
        console.warn('Access denied to coach route, redirecting...');
        return navigateTo('/');
    }
});
