import { ref } from "vue";
import { defineStore } from "pinia";
import { push } from "notivue";

import { login, logout } from '@/services/authService';

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);

    const loginUser = async ({ email, password }) => {
        try {
            await login(email, password)
            isAuthenticated.value = true;
            return true
        } catch (error) {
            push.error(error.data.message);
            isAuthenticated.value = false;
            return false
        }
    }

    const logoutUser = async () => {
        try {
            await logout()
            isAuthenticated.value = false;
            return true
        } catch (error) {
            push.error(error.data.message);
            isAuthenticated.value = true;
            return false
        }
    }

    return {
        isAuthenticated,
        loginUser,
        logoutUser,
    };
});
