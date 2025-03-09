<template>
    <UiDialogHeader class="contents space-y-0 text-left">
        <UiDialogTitle class="border-b border-border px-6 py-4 text-base"
            :title="`${student.saint_name} ${student.last_name} ${student.middle_name} ${student.first_name}`" />
        <div class="overflow-y-auto h-[70vh] max-h-[70vh]" >
            <UiDialogDescription>
                <template v-if="isLoading">
                    <div class="px-6 py-4">
                        <div class="relative grid w-full grid-cols-3 space-x-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                        <div class="relative grid w-full grid-cols-2 space-x-3 mt-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                        <div class="relative grid w-full grid-cols-2 space-x-3 mt-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                        <div class="relative grid w-full grid-cols-2 space-x-3 mt-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                        <div class="relative grid w-full grid-cols-2 space-x-3 mt-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                        <div class="relative grid w-full grid-cols-2 space-x-3 mt-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                        <div class="relative grid w-full grid-cols-2 space-x-3 mt-3">
                            <UiSkeleton class="h-4" />
                            <UiSkeleton class="h-4" />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="px-6 py-4">
                        <UiTabs default-value="studentInfo">
                            <UiTabsList :pill="false" class="relative grid w-full grid-cols-3">
                                <UiTabsTrigger :pill="false" value="studentInfo">Thông tin</UiTabsTrigger>
                                <UiTabsTrigger :pill="false" value="testScores">Điểm</UiTabsTrigger>
                                <UiTabsTrigger :pill="false" value="attendanceData">Điểm danh</UiTabsTrigger>
                                <UiTabsIndicator />
                            </UiTabsList>
                            <UiTabsContent value="studentInfo">
                                <UiDescriptionList>
                                    <UiDescriptionListTerm>Mã học viên</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>{{ studentDetails.student_info?.student_code }}
                                    </UiDescriptionListDetails>
                                    <UiDescriptionListTerm>Tên thánh</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>{{ studentDetails.student_info?.saint_name }}
                                    </UiDescriptionListDetails>
                                    <UiDescriptionListTerm>Họ và tên</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>{{ `${studentDetails.student_info?.last_name}
                                        ${studentDetails.student_info?.middle_name}
                                        ${studentDetails.student_info?.first_name}` }}</UiDescriptionListDetails>
                                    <UiDescriptionListTerm>Giới tính</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>{{ studentDetails.student_info?.gender === 'MALE' ? 'Nam'
                                        : 'Nữ' }}
                                    </UiDescriptionListDetails>
                                    <UiDescriptionListTerm>Ngày sinh</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>{{ studentDetails.student_info?.date_of_birth ? format(new
                                        Date(studentDetails.student_info?.date_of_birth), 'dd/MM/yyyy') : '' }}
                                    </UiDescriptionListDetails>
                                </UiDescriptionList>
                            </UiTabsContent>
                            <UiTabsContent value="testScores">
                                <UiTable>
                                    <UiTableHeader>
                                        <UiTableRow>
                                            <UiTableHead class="w-[50%] font-bold">Tên bài kiểm tra</UiTableHead>
                                            <UiTableHead class="font-bold">Điểm số</UiTableHead>
                                        </UiTableRow>
                                    </UiTableHeader>
                                    <UiTableBody class="last:border-b">
                                        <template v-for="test in studentDetails.test_scores || []" :key="test.test_id">
                                            <UiTableRow>
                                                <UiTableCell class="text-wrap">{{ test.test_name }}</UiTableCell>
                                                <UiTableCell class="font-medium">{{ test.score }}</UiTableCell>
                                            </UiTableRow>
                                        </template>
                                    </UiTableBody>
                                </UiTable>
                            </UiTabsContent>
                            <UiTabsContent value="attendanceData">
                                <div class="overflow-y-scroll max-h-[50vh]">
                                    <UiDescriptionList>
                                    <UiDescriptionListTerm class="font-bold">Tổng hiện diện</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>
                                        Thánh lễ: {{ studentDetails.attendances?.total_present_mass }} / {{
                                            (studentDetails.attendances?.attendance_data
                                        || []).length }} buổi <br />
                                        Giáo lý: {{ studentDetails.attendances?.total_present_lesson }} / {{
                                            (studentDetails.attendances?.attendance_data
                                        || []).length }} buổi
                                    </UiDescriptionListDetails>
                                    <UiDescriptionListTerm class="font-bold">Tổng vắng</UiDescriptionListTerm>
                                    <UiDescriptionListDetails>Thánh lễ: {{ studentDetails.attendances?.total_absent_mass
                                        }} / {{
                                            (studentDetails.attendances?.attendance_data
                                        || []).length }} buổi <br />
                                        Giáo lý: {{ studentDetails.attendances?.total_absent_lesson }} / {{
                                            (studentDetails.attendances?.attendance_data
                                        || []).length }} buổi
                                    </UiDescriptionListDetails>
                                </UiDescriptionList>
                                <UiTable>
                                    <UiTableHeader>
                                        <UiTableRow>
                                            <UiTableHead class="w-1/3 font-bold">Ngày</UiTableHead>
                                            <UiTableHead class="w-1/3 font-bold">Thánh lễ</UiTableHead>
                                            <UiTableHead class="w-1/3 font-bold">Giáo lý</UiTableHead>
                                        </UiTableRow>
                                    </UiTableHeader>
                                    <UiTableBody class="last:border-b">
                                        <template
                                            v-for="attendaceEntry in studentDetails.attendances?.attendance_data || []"
                                            :key="attendaceEntry.attendance_date">
                                            <UiTableRow>
                                                <UiTableCell class="text-wrap">{{ format(new
                                                    Date(attendaceEntry.attendance_date), 'dd/MM/yyyy') }}</UiTableCell>
                                                <UiTableCell>
                                                    <template v-if="!attendaceEntry.mass_status">
                                                        <UiBadge variant="secondary">Chưa điểm danh</UiBadge>
                                                    </template>
                                                    <template v-else-if="attendaceEntry.mass_status === 'present'">
                                                        <UiBadge class="bg-green-700">Hiện diện</UiBadge>
                                                    </template>
                                                    <template v-else>
                                                        <UiBadge variant="destructive">Vắng</UiBadge>
                                                    </template>
                                                </UiTableCell>
                                                <UiTableCell>
                                                    <template v-if="!attendaceEntry.lesson_status">
                                                        <UiBadge variant="secondary">Chưa điểm danh</UiBadge>
                                                    </template>
                                                    <template v-else-if="attendaceEntry.lesson_status === 'present'">
                                                        <UiBadge class="bg-green-700">Hiện diện</UiBadge>
                                                    </template>
                                                    <template v-else>
                                                        <UiBadge variant="destructive">Vắng</UiBadge>
                                                    </template>
                                                </UiTableCell>
                                            </UiTableRow>
                                        </template>
                                    </UiTableBody>
                                </UiTable>
                                </div>
                                
                            </UiTabsContent>
                        </UiTabs>
                    </div>
                </template>
            </UiDialogDescription>
            <!-- <UiDialogFooter class="px-6 pb-6 sm:justify-start">
                <UiDialogClose as-child>
                    <UiButton type="button" text="Okay" />
                </UiDialogClose>
            </UiDialogFooter> -->
        </div>
    </UiDialogHeader>
</template>

<script lang="js" setup>
import { format } from 'date-fns'
import { useStudentStore } from '@/stores/studentStore'

const props = defineProps(['student', 'gradeCode'])
const { student, gradeCode } = props
const isLoading = ref(true)

const studentStore = useStudentStore()

const { studentDetails } = storeToRefs(studentStore)

onBeforeMount(async () => {
    isLoading.value = true
    await studentStore.getStudentSummaryInfo(student.student_code, gradeCode)
    isLoading.value = false
})
</script>