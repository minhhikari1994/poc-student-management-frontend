<template>
  <UiDialogHeader class="contents space-y-0 text-center">
    <UiDialogTitle class="border-b border-border px-6 py-4 text-base" title="Điểm danh sử dụng QR code" />
  </UiDialogHeader>
  <UiDialogDescription>
    <div class="px-6 py-4 text-center">
      <div class="space-y-1">
        <p>
          <strong>Loại điểm danh: </strong>
          <span>{{ attendanceType === 'mass' ? "Thánh Lễ" : "Giáo Lý" }}</span>
        </p>
        <p>
          <strong>Ngày điểm danh: </strong>
          <span>{{ format(attendanceDate, 'dd/MM/yyyy') }}</span>
        </p>
        <p>
          <strong>Lớp: </strong>
          <span>{{ unitDetails.name }}</span>
        </p>
      </div>
      <div class="mt-4">
        <div class="h-[40vh] w-full rounded-lg border border-border">
          <QrcodeStream @detect="onDetect" :track="paintDetectionOutline" :formats="selectedBarcodeFormats"
            :paused="qrScannerStatus.state === SCANNER_STATE_WAITING" class="p-4" />
        </div>
      </div>
      <div class="mt-1 text-center">
        <UiAlert :title="qrScannerStatus.title" :description="qrScannerStatus.description"
          :variant="getQRScannerStatusVariant()" :icon="getQRScannerStatusIcon()"
          :icon-class="qrScannerStatus.state === SCANNER_STATE_WAITING ? 'animate-spin' : ''" />
      </div>
    </div>

  </UiDialogDescription>
</template>

<script lang="js" setup>
import { format } from 'date-fns'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useAttendanceStore } from "@/stores/attendanceStore";

const SCANNER_STATE_ERROR = 'error'
const SCANNER_STATE_INFO = 'info'
const SCANNER_STATE_SUCCESS = 'success'
const SCANNER_STATE_WAITING = 'waiting'

const props = defineProps(['attendanceDate', 'attendanceType', 'unitAttendanceData', 'unitDetails'])
const { attendanceDate, attendanceType, unitAttendanceData, unitDetails } = props

const attendanceStore = useAttendanceStore();

const qrScannerStatus = ref({
  state: SCANNER_STATE_INFO,
  title: '',
  description: ''
})

const barcodeFormats = {
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: true,
  pdf417: false,
  qr_code: true,
  rm_qr_code: true,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false
}

const getQRScannerStatusVariant = () => {
  switch (qrScannerStatus.value.state) {
    case SCANNER_STATE_ERROR:
      return 'destructive'
    case SCANNER_STATE_INFO:
      return 'info'
    case SCANNER_STATE_SUCCESS:
      return 'success'
    case SCANNER_STATE_WAITING:
      return 'secondary'
    default:
      return 'info'
  }
}

const getQRScannerStatusIcon = () => {
  switch (qrScannerStatus.value.state) {
    case SCANNER_STATE_ERROR:
      return 'lucide:alert-circle'
    case SCANNER_STATE_INFO:
      return 'lucide:info'
    case SCANNER_STATE_SUCCESS:
      return 'lucide:circle-check'
    case SCANNER_STATE_WAITING:
      return 'lucide:loader-circle'
    default:
      return 'lucide:info'
  }
}

const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
})

const setQRScannerStatusMessage = (title, description) => {
  qrScannerStatus.value.title = title
  qrScannerStatus.value.description = description
}

const setQRScannerStatusError = (title, description, resetInterval = 3) => {
  qrScannerStatus.value.state = SCANNER_STATE_ERROR
  setQRScannerStatusMessage(title, description)
  setTimeout(() => {
    setQRScannerStatusInfo("Đưa QR code của học viên vào trong khung")
  }, resetInterval * 1000)
}

const setQRScannerStatusInfo = (title, description) => {
  qrScannerStatus.value.state = SCANNER_STATE_INFO
  setQRScannerStatusMessage(title, description)
}

const setQRScannerStatusWaiting = (title = "Đang xử lý", description) => {
  qrScannerStatus.value.state = SCANNER_STATE_WAITING
  setQRScannerStatusMessage(title, description)
}

const setQRScannerStatusSuccess = (title, description) => {
  qrScannerStatus.value.state = SCANNER_STATE_SUCCESS
  setQRScannerStatusMessage(title, description)
}

const getStudentFullName = (student) => {
  return `${student.saint_name} ${student.last_name} ${student.middle_name} ${student.first_name}`;
}

onMounted(() => {
  setQRScannerStatusInfo("Đưa QR code của học viên vào trong khung")
})


const onDetect = async (data) => {
  setQRScannerStatusWaiting()
  const qrContent = data[0].rawValue
  const student_code_from_qr = qrContent.split("|")[1]
  const foundAttendanceEntry = unitAttendanceData.find(attendanceData => attendanceData.student.student_code === student_code_from_qr)
  if (!foundAttendanceEntry) {
    setTimeout(() => {
      setQRScannerStatusError('Không tìm thấy học viên')
    }, 300)
  }
  const result = await updateAttendance(foundAttendanceEntry)
  if (result) {
    setQRScannerStatusSuccess("Điểm danh thành công", `${getStudentFullName(foundAttendanceEntry.student)} / ${foundAttendanceEntry.student.student_code}`)
  } else {
    setTimeout(() => {
      setQRScannerStatusError('Có lỗi xảy ra khi điểm danh', 'Vui lòng thử lại')
    }, 300)
  }


}

const paintDetectionOutline = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

const updateAttendance = async (foundAttendanceEntry) => {
  const updateAttendanceRequestBody = {
    student_code: foundAttendanceEntry.student.student_code,
    attendance_date: format(attendanceDate, 'yyyyMMdd'),
    mass_status: foundAttendanceEntry.mass_status,
    lesson_status: foundAttendanceEntry.lesson_status
  }
  if (attendanceType === 'mass') {
    updateAttendanceRequestBody.mass_status = "present"
  } else {
    updateAttendanceRequestBody.lesson_status = "present"
  }
  return await attendanceStore.updateAttendanceData(updateAttendanceRequestBody)
}
</script>