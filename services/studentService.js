export const getStudentSummary = (student_id, grade_code) => {
    const config = useRuntimeConfig()
    return $fetch(`${config.public.baseApiUrl}/api/students/${student_id}`, {
       method: 'GET',
       credentials: 'include',
       query: {
        grade_code
       }
    });
}