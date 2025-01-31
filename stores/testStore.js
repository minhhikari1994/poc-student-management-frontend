import { ref } from "vue";
import { defineStore } from 'pinia'
import { push } from "notivue";

import { getAllTestForUnit, getUnitTestScores } from '@/services/testService'

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

    return {
        unitTests,
        getUnitTests,
        unitTestScores,
        getUnitTestScoreList
    }
})