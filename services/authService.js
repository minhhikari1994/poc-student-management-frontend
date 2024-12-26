const baseApiUrl = 'http://localhost:5000'

export const login = (email, password) => {
    return $fetch(`${baseApiUrl}/api/login`, {
       method: 'POST',
       body: { login_id: email, password } 
    });
}

export const logout = () => {
    return $fetch(`${baseApiUrl}/api/logout`, {
       method: 'POST'
    });
}