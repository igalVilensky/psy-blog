// middleware/coach.js
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (process.server) return;

    console.log('Coach Middleware check:', {
        user: !!authStore.user,
        isCoach: authStore.user?.isCoach,
        loading: authStore.loading
    });

    if (!authStore.user || (!authStore.user.isCoach && !authStore.user.superAdmin)) {
        console.warn('Access denied to coach route, redirecting...');
        return navigateTo('/');
    }
});
