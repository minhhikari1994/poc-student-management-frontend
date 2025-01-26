import { format } from 'date-fns'

const baseApiUrl = 'http://poc.minhhikari-local.com:5000'

export const getAttendanceData = (unit_code, date) => {
    return $fetch(`${baseApiUrl}/api/attendances`, {
       method: 'GET',
       credentials: 'include',
       query: {
          date: format(date, 'yyyyMMdd'),
          unit: unit_code
       },
    });
}

export const createOrUpdateAttendanceData = (updateAttendanceBody) => {
    return $fetch(`${baseApiUrl}/api/attendances`, {
       method: 'POST',
       credentials: 'include',
       body: updateAttendanceBody
    });
}