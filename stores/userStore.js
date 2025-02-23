import { defineStore } from 'pinia'

import { changeUserPassword } from '@/services/userService'

export const useUserAccountStore = defineStore('userAccount', () => {
    const changePassword = async (oldPassword, newPassword, confirmPassword) => {
        try {
            const requestBody = {
                current_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            }
            const result = await changeUserPassword(requestBody)
            if (result) {
                push.success(result.message);
            }
            return true
        } catch (error) {
            push.error(error.data.message);
            return false
        }
    }

    return {
        changePassword
    }
})