const baseApiUrl = 'http://poc.minhhikari-local.com:5000'

export const getAllUnits = () => {
    return $fetch(`${baseApiUrl}/api/units`, {
       method: 'GET',
       credentials: 'include'
    });
}