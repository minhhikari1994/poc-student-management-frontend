import { defineStore } from 'pinia'

import { getAllUnits, getUnitStudentList } from '@/services/unitService'

export const useUnitStore = defineStore('unit', () => {

  const unitList = ref([]);
  const unitDetails = ref({});

  const $reset = () => {
    unitDetails.value = {};
  }

  const getUnitList = async () => {
    try {
      const result = await getAllUnits()
      unitList.value = result.data.units
      return true
    } catch (error) {
      push.error(error.data.message);
      return false
    }
  }

  const getUnitStudents = async (unit_code) => {
    try {
      const result = await getUnitStudentList(unit_code)
      unitDetails.value = result.data
      return true
    } catch (error) {
      push.error(error.data.message);
      return false
    }
  }

  return { unitList, unitDetails, getUnitList, getUnitStudents, $reset }
})
