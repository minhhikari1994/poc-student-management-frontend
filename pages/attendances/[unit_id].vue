<template>
    <div class="flex w-full items-center justify-center">
        <UiDatepicker v-model="attendanceDate" @update:model-value="onAttendanceDateChange">
            <template #default="{ togglePopover }">
                <UiButton variant="outline"
                    :class="[!attendanceDate && 'text-muted-foreground', 'w-full justify-start text-left']"
                    @click="togglePopover">
                    <Icon name="lucide:calendar" class="h-4 w-4" />
                    {{ attendanceDate ? format(attendanceDate, "dd/MM/yyyy") : "Chọn ngày điểm danh" }}
                </UiButton>
            </template>
        </UiDatepicker>
    </div>
    <div class="flex w-full items-center justify-center mt-4">
        <UiSelect v-model="selectedAttendanceType">
            <UiSelectTrigger placeholder="Select an option" />
            <UiSelectContent>
                <UiSelectItem v-for="option in attendanceTypeOptions" :key="option.value" :value="option.value"
                    :text="option.label" />
            </UiSelectContent>
        </UiSelect>
    </div>

    <div class="flex items-center justify-center mt-[4rem]" v-if="attendanceDate && selectedAttendanceType">
        <UiCarousel class="max-w-xsw-full relative w-full max-w-xs" :opts="{ align: 'center' }" orientation="vertical">
            <UiCarouselContent class="-mt-1 h-[350px]">
                <UiCarouselItem v-for="attendance in unitAttendanceData" :key="attendance.student.student_code"
                    grab-cursor class="md:basis-1/2">
                    <div class="p-1">
                        <UiCard>
                            <UiCardContent class="flex flex-col aspect-square items-center justify-center text-center">
                                <span class="text-xl font-semibold">{{ getStudentFullName(attendance.student) }}</span>
                                <span class="text-muted-foreground">{{ attendance.student.student_code }}</span>
                                <div class="w-full fixed flex justify-center mt-[-2rem]" v-if="isAttendanceUpdating">
                                    <Icon name="lucide:loader-circle" class="animate-spin" size="28" />
                                </div>
                                <div class="flex w-8/12 justify-center mt-20">
                                    <UiRadioGroup :disabled="isAttendanceUpdating" v-model.lazy="attendance.mass_status"
                                        v-if="selectedAttendanceType === 'mass'"
                                        @update:model-value="updateMassAttendance(attendance)">
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r1" value="present" />
                                            <UiLabel for="r1">Hiện diện</UiLabel>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r2" value="notified_absent" />
                                            <UiLabel for="r2">Vắng có phép</UiLabel>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r3" value="absent" />
                                            <UiLabel for="r3">Vắng không phép</UiLabel>
                                        </div>
                                    </UiRadioGroup>
                                    <UiRadioGroup :disabled="isAttendanceUpdating"
                                        v-model.lazy="attendance.lesson_status"
                                        v-if="selectedAttendanceType === 'lesson'"
                                        @update:model-value="updateLessonAttendance(attendance)">
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r1" value="present" />
                                            <UiLabel for="r1">Hiện diện</UiLabel>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r2" value="notified_absent" />
                                            <UiLabel for="r2">Vắng có phép</UiLabel>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r3" value="absent" />
                                            <UiLabel for="r3">Vắng không phép</UiLabel>
                                        </div>
                                    </UiRadioGroup>
                                </div>
                            </UiCardContent>
                        </UiCard>
                    </div>
                </UiCarouselItem>
            </UiCarouselContent>
            <UiCarouselPrevious />
            <UiCarouselNext />
        </UiCarousel>
    </div>

    <div class="flex items-center justify-center mt-[4rem]" v-if="attendanceDate && selectedAttendanceType">
        <UiDialog @update:open="onQRDialogOpenChange">
            <UiDialogTrigger as-child>
                <UiButton class="w-full">
                    <Icon class="size-4" name="lucide:qr-code" />Điểm danh sử dụng QR code
                </UiButton>
            </UiDialogTrigger>

            <UiDialogContent
                class="flex flex-col gap-0 p-0 sm:max-h-[min(720px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
                <AttendancesQrDialogContent :attendanceDate="attendanceDate" :attendanceType="selectedAttendanceType"
                    :unitAttendanceData="unitAttendanceData" :unitDetails="unitDetails" />
            </UiDialogContent>
        </UiDialog>
    </div>

</template>

<script lang="js" setup>
import { format, isSunday } from "date-fns";
import { push } from "notivue";

import { useUnitStore } from "@/stores/unitStore";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useAppPageStore } from "@/stores/appPageStore";

const route = useRoute();
const unitStore = useUnitStore();
const attendanceStore = useAttendanceStore();
const appPageStore = useAppPageStore();
const attendanceDate = ref(null);
const isAttendanceUpdating = ref(false);
const selectedAttendanceType = ref(null);
const attendanceTypeOptions = [
    { value: "mass", label: "Thánh lễ" },
    { value: "lesson", label: "Giáo lý" }
]

unitStore.$reset();

const { breadcrumbItems } = storeToRefs(appPageStore);
const { unitDetails } = storeToRefs(unitStore);
const { unitAttendanceData } = storeToRefs(attendanceStore);

const setBreadcrumbItems = () => {
    breadcrumbItems.value.push({
        label: unitDetails.value.name,
    })
}

onBeforeMount(async () => {
    const unit_code = route.params.unit_id;
    await unitStore.getUnitStudents(unit_code);
    setBreadcrumbItems();
});

const getStudentFullName = (student) => {
    return `${student.saint_name} ${student.last_name} ${student.middle_name} ${student.first_name}`;
}

const onAttendanceDateChange = (date) => {
    if (!isSunday(date)) {
        push.error("Ngày bạn đang chọn không phải là Chúa Nhật")
        attendanceDate.value = null
        return
    }
    attendanceStore.getUnitAttendanceData(
        route.params.unit_id,
        date
    )
}

const updateMassAttendance = async (attendance_data) => {
    isAttendanceUpdating.value = true
    const updateAttendanceRequestBody = {
        student_code: attendance_data.student.student_code,
        attendance_date: format(attendanceDate.value, 'yyyyMMdd'),
        mass_status: attendance_data.mass_status,
        lesson_status: attendance_data.lesson_status
    }
    await attendanceStore.updateAttendanceData(updateAttendanceRequestBody)
    isAttendanceUpdating.value = false
}

const updateLessonAttendance = async (attendance_data) => {
    isAttendanceUpdating.value = true
    const updateAttendanceRequestBody = {
        student_code: attendance_data.student.student_code,
        attendance_date: format(attendanceDate.value, 'yyyyMMdd'),
        mass_status: attendance_data.mass_status,
        lesson_status: attendance_data.lesson_status
    }
    await attendanceStore.updateAttendanceData(updateAttendanceRequestBody)
    isAttendanceUpdating.value = false
}

const onQRDialogOpenChange = (value) => {
    if (!value) {
        attendanceStore.getUnitAttendanceData(
            route.params.unit_id,
            attendanceDate.value
        )
    }
}

</script>