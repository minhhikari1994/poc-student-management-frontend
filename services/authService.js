const baseApiUrl = 'http://192.168.1.12:5000'

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