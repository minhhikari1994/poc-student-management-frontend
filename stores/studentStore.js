import { defineStore } from 'pinia'

import { getStudentSummary } from '@/services/studentService'

export const useStudentStore = defineStore('student', () => {

    const studentDetails = ref({});

    const getStudentSummaryInfo = async (student_id, grade_code) => {
        try {
            const result = await getStudentSummary(student_id, grade_code)
            studentDetails.value = result.data
            return true
        } catch (error) {
            return false
        }
    }

    return {
        studentDetails,
        getStudentSummaryInfo,
    }
})