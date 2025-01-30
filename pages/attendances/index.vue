<template>
    <div class="flex items-center justify-center">
        <UiList class="">
            <template v-for="unit in unitList" :key="unit.unit_id">
                <UiListItem class="py-5 items-start px-0" :to="`/attendances/${unit.unit_id}`">
                    <UiListContent>
                        <UiListTitle :title="unit.name" />
                        <UiListSubtitle class="line-clamp-2" :subtitle="unit.grade_name" />
                    </UiListContent>
                    <UiDropdownMenu>
                        <UiDropdownMenuTrigger as-child>
                            <UiButton size="icon-sm" variant="ghost" class="ml-auto shrink-0 self-center rounded-full">
                                <Icon name="lucide:ellipsis-vertical" />
                            </UiButton>
                        </UiDropdownMenuTrigger>
                        <UiDropdownMenuContent class="w-56">
                            <UiDropdownMenuItem
                                title="Xuất file Excel"
                                icon="lucide:download"
                                @click="handleExportExcel(unit.unit_id)"
                            />
                        </UiDropdownMenuContent>
                    </UiDropdownMenu>
                </UiListItem>
                <UiSeparator class="ml-auto last:hidden" />
            </template>
        </UiList>
    </div>
</template>

<script lang="js" setup>
import { useUnitStore } from "@/stores/unitStore";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useAppPageStore } from "@/stores/appPageStore";
import { UiDropdownMenu } from "#components";

const unitStore = useUnitStore();
const attendanceStore = useAttendanceStore();
const appPageStore = useAppPageStore();

const { unitList } = storeToRefs(unitStore);

const breadCrumbItems = [
    {
        label: "Điểm danh",
        link: "/attendances"
    },
]

onBeforeMount(() => {
    appPageStore.setBreadcrumbItems(breadCrumbItems);
    unitStore.getUnitList();
});

const handleExportExcel = (unitId) => {
    attendanceStore.exportUnitAttendanceToExcel(unitId)
}
</script>