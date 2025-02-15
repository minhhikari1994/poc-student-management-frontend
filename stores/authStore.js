import { ref } from "vue";
import { defineStore } from "pinia";
import { push } from "notivue";

import { login, logout, checkAuth } from '@/services/authService';

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const currentUser = ref({});

    const checkUserAuth = async () => {
        try {
            var result = await checkAuth()
            isAuthenticated.value = true;
            currentUser.value = result.data
            return true
        } catch (error) {
            // push.error(error.data.message);
            isAuthenticated.value = false;
            return false
        }
    }

    const loginUser = async ({ email, password }) => {
        try {
            var result = await login(email, password)
            isAuthenticated.value = true;
            currentUser.value = result.data
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
            currentUser.value = {};
            return true
        } catch (error) {
            push.error(error.data.message);
            isAuthenticated.value = true;
            return false
        }
    }

    return {
        isAuthenticated,
        currentUser,
        loginUser,
        logoutUser,
        checkUserAuth
    };
});
