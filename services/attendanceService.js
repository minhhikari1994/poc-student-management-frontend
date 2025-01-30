import { format } from 'date-fns'

export const getAttendanceData = (unit_code, date) => {
   const config = useRuntimeConfig()
   return $fetch(`${config.public.baseApiUrl}/api/attendances`, {
      method: 'GET',
      credentials: 'include',
      query: {
         date: format(date, 'yyyyMMdd'),
         unit: unit_code
      },
   });
}

export const createOrUpdateAttendanceData = (updateAttendanceBody) => {
   const config = useRuntimeConfig()
   return $fetch(`${config.public.baseApiUrl}/api/attendances`, {
      method: 'POST',
      credentials: 'include',
      body: updateAttendanceBody
   });
}