import { ref } from "vue";
import { defineStore } from 'pinia'
import { push } from "notivue";

import { getAllTestForUnit, getUnitTestScores, createOrUpdateStudentTestScores } from '@/services/testService'

export const useTestStore = defineStore('test', () => {
    const unitTests = ref([])
    const unitTestScores = ref([])

    const getUnitTests = async (unit_id) => {
        try {
            const result = await getAllTestForUnit(unit_id)
            unitTests.value = result.data
        } catch (error) {
            push.error(error.data.message);
        }
    }

    const getUnitTestScoreList = async (test_id, unit_id) => {
        try {
            const result = await getUnitTestScores(test_id, unit_id)
            unitTestScores.value = result.data
        } catch (error) {
            push.error(error.data.message);
        }
    }

    const updateTestScores = async (test_id, student_scores) => {
        try {
            const requestBody = {
                test_id: test_id,
                student_scores: student_scores
            }
            const result = await createOrUpdateStudentTestScores(requestBody)
            if (result) {
                push.success(result.message);
            }
        } catch (error) {
            push.error(error.data.message);
        }
    }

    return {
        unitTests,
        getUnitTests,
        unitTestScores,
        getUnitTestScoreList,
        updateTestScores
    }
})