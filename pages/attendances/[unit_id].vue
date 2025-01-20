<template>
    <div class="flex w-full items-center justify-center">
        <UiDatepicker v-model="attendanceDate">
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



    <div class="flex items-center justify-center mt-4" v-if="attendanceDate && selectedAttendanceType">
        <UiCarousel class="relative w-full max-w-sm" :opts="{ align: 'start' }">
            <UiCarouselContent>
                <UiCarouselItem v-for="student in unitDetails.students" :key="student.student_code" grab-cursor
                    class="md:basis-1/2 lg:basis-1/2">
                    <div class="p-1">
                        <UiCard>
                            <UiCardContent
                                class="flex flex-col aspect-square items-center justify-center text-center p-6">
                                <span class="text-xl font-semibold">{{ getStudentFullName(student) }}</span>
                                <span class="text-muted-foreground">{{ student.student_code }}</span>
                                <div class="flex w-full justify-center mt-20">
                                    <UiRadioGroup default-value="default">
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r1" value="default" />
                                            <UiLabel for="r1">Hiện diện</UiLabel>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r2" value="comfortable" />
                                            <UiLabel for="r2">Vắng có phép</UiLabel>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <UiRadioGroupItem id="r3" value="compact" />
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
    <!-- <div class="flex items-center justify-center">
      <UiList class="">
        <template v-for="student in unitDetails.students" :key="student.student_code">
          <UiListItem class="py-5 items-start px-0">
            <UiListContent>
              <UiListTitle :title="`${student.saint_name} ${student.last_name} ${student.middle_name} ${student.first_name}`" />
              <UiListSubtitle
                class="line-clamp-2"
                :subtitle="student.student_code"
              />
            </UiListContent>
            <UiButton
              size="icon-sm"
              variant="ghost"
              class="ml-auto shrink-0 self-center rounded-full"
            >
              <Icon name="lucide:chevron-right" />
            </UiButton>
          </UiListItem>
          <UiSeparator class="ml-auto last:hidden" />
        </template>
      </UiList>
    </div> -->
</template>

<script lang="js" setup>
import { format } from "date-fns";

import { useUnitStore } from "@/stores/unitStore";
import { useAppPageStore } from "@/stores/appPageStore";

const route = useRoute();
const unitStore = useUnitStore();
const appPageStore = useAppPageStore();
const attendanceDate = ref(null);
const selectedAttendanceType = ref(null);
const attendanceTypeOptions = [
    { value: "mass", label: "Thánh lễ" },
    { value: "catechism", label: "Giáo lý" }
]

unitStore.$reset();

const { breadcrumbItems } = storeToRefs(appPageStore);
const { unitDetails } = storeToRefs(unitStore);

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

</script>