export const getAllUnits = () => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/units`, {
       method: 'GET',
       credentials: 'include'
    });
}

export const getUnitStudentList = (unit_code) => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/units/${unit_code}/students`, {
       method: 'GET',
       credentials: 'include'
    });
}