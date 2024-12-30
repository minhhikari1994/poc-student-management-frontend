const baseApiUrl = 'http://poc.minhhikari-local.com:5000'

export const login = (email, password) => {
    return $fetch(`${baseApiUrl}/api/login`, {
       method: 'POST',
       body: { login_id: email, password },
       credentials: 'include'
    });
}

export const logout = () => {
    return $fetch(`${baseApiUrl}/api/logout`, {
       method: 'POST',
       credentials: 'include'
    });
}

export const checkAuth = () => {
    return $fetch(`${baseApiUrl}/api/auth_check`, {
       method: 'GET',
       credentials: 'include'
    });
}