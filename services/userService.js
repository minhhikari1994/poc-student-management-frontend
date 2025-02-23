export const changeUserPassword = (changePasswordBody) => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/user-account/change-password`, {
       method: 'POST',
       credentials: 'include',
       body: changePasswordBody
    });
}
