import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        const authCheckResult = await authStore.checkUserAuth();
        if (authCheckResult) {
            return navigateTo(to.path);
        } else {
            if (to.path !== '/auth/login') {
                return navigateTo('/auth/login');
            }
        }
    } else if (authStore.isAuthenticated && to.path === '/auth/login') {
        return navigateTo('/');
    }
})