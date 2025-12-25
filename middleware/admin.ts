import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // Wait for auth to be initialized if it's still loading
    // Note: we can't easily await inside middleware if it's not async, 
    // but Nuxt 3 allows async middleware.

    if (process.server) return; // Middleware runs on both sides, but claim check is safer on client for navigation

    // If auth store is still loading, defer the check.
    // This prevents premature redirects if the user state hasn't been fully loaded yet.
    if (authStore.loading) {
        return; // Allow navigation to proceed, the store will reactively update the UI later.
    }

    const user = authStore.user;

    // Check if user is logged in
    if (!user) {
        return navigateTo('/');
    }

    // Check for superAdmin claim
    // If the claim is missing, we might want to double check once if it was just added
    if (user.role !== 'superAdmin' && !user.superAdmin) {
        console.warn('Access denied: user is not a superAdmin');
        return navigateTo('/');
    }
});
