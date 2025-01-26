import { ref } from "vue";
import { defineStore } from 'pinia'
import { push } from "notivue";

import { getAttendanceData, createOrUpdateAttendanceData } from '@/services/attendanceService'

export const useAttendanceStore = defineStore('attendance', () => {
  const unitAttendanceData = ref([])

  const getUnitAttendanceData = async (unit_code, date) => {
    try {
      const result = await getAttendanceData(unit_code, date)
      unitAttendanceData.value = result.data
    } catch (error) {
      push.error(error.data.message);
    }
  }

  const updateAttendanceData = async (updatedAttendanceEntry) => {
    try {
      await createOrUpdateAttendanceData(updatedAttendanceEntry)
      return true
    } catch (error) {
      push.error(error.data.message);
      return false
    }
  }

  return {
    unitAttendanceData,
    getUnitAttendanceData,
    updateAttendanceData
  }
})
