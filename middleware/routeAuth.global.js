import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated && to.path !== '/auth/login') {
        return navigateTo('/auth/login');
    } else if (authStore.isAuthenticated && to.path === '/auth/login') {
        return navigateTo('/');
    }
})