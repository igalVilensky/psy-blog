export default defineNuxtRouteMiddleware((to, from) => {
    // Check if the route has mode and oobCode query parameters
    // Firebase sends these for actions like resetPassword, verifyEmail, recoverEmail
    const { mode, oobCode, apiKey } = to.query;

    if (mode && oobCode) {
        if (mode === 'resetPassword') {
            return navigateTo({
                path: '/auth/reset-password',
                query: { oobCode, apiKey }
            });
        }
        // You can add other modes here if needed, e.g., verifyEmail
        // if (mode === 'verifyEmail') { ... }
    }
});
