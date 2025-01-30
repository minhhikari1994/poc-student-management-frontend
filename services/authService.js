export const login = (email, password) => {
    const config = useRuntimeConfig()
    console.log('this is the config', config)
    return $fetch(`${config.public.baseApiUrl}/api/login`, {
       method: 'POST',
       body: { login_id: email, password },
       credentials: 'include'
    });
}

export const logout = () => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/logout`, {
       method: 'POST',
       credentials: 'include'
    });
}

export const checkAuth = () => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/auth_check`, {
       method: 'GET',
       credentials: 'include'
    });
}