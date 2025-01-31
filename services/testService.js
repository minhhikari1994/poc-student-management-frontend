export const getAllTestForUnit = (unit_id) => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/tests/${unit_id}`, {
        method: 'GET',
        credentials: 'include'
    });
}

export const getUnitTestScores = (test_id, unit_id) => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/test-scores`, {
        method: 'GET',
        credentials: 'include',
        query: {
            test_id: test_id,
            unit_id: unit_id
        },
    });
}