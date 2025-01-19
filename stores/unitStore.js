import { defineStore } from 'pinia'

import { getAllUnits } from '@/services/unitService'

export const useUnitStore = defineStore('unit', () => {

  const unitList = ref([]);

  const getUnitList = async () => {
    try {
      const result = await getAllUnits()
      unitList.value = result.data.units
      isAuthenticated.value = true;
      return true
    } catch (error) {
      push.error(error.data.message);
      return false
    }
  }

    return { unitList, getUnitList }
  })
