<template>
    <div class="flex items-center justify-center">
        <UiSelect v-model="selectedTest" @update:model-value="onTestChange">
            <UiSelectTrigger placeholder="Chọn bài kiểm tra để nhập điểm" />
            <UiSelectContent>
                <UiSelectItem v-for="option in unitTests" :key="option.id" :value="option.id" :text="option.name" />
            </UiSelectContent>
        </UiSelect>
    </div>
    <div class="sticky top-[4rem] z-10 mt-4" v-if="selectedTest">
        <UiButton size="lg" class="w-full">
            <Icon class="size-4" name="lucide:save"/>
            Lưu
        </UiButton>
    </div>
    <div class="grid overflow-x-auto rounded-md border pb-4 mt-4" v-if="selectedTest">
        <UiTable>
            <UiTableHeader>
                <UiTableRow>
                    <UiTableHead>Họ và tên</UiTableHead>
                    <UiTableHead>Điểm số</UiTableHead>
                </UiTableRow>
            </UiTableHeader>
            <UiTableBody class="last:border-b">
                <template v-for="scoreEntry in unitTestScores" :key="scoreEntry.student.id">
                    <UiTableRow>
                        <UiTableCell>{{ getStudentFullName(scoreEntry.student) }}</UiTableCell>
                        <UiTableCell>
                            <UiNumberField :model-value="scoreEntry.score || ''" :min="0" :max="10" step="0.1" :format-options="{
                                minimumFractionDigits: 1,
                            }" />
                        </UiTableCell>
                    </UiTableRow>
                </template>
            </UiTableBody>
        </UiTable>
    </div>
</template>

<script lang="js" setup>

import { useUnitStore } from "@/stores/unitStore";
import { useAppPageStore } from "@/stores/appPageStore";
import { useTestStore } from "@/stores/testStore";

const route = useRoute();
const unitStore = useUnitStore();
const appPageStore = useAppPageStore();
const testStore = useTestStore();

const selectedTest = ref(null);

unitStore.$reset();
const { breadcrumbItems } = storeToRefs(appPageStore);
const { unitDetails } = storeToRefs(unitStore);
const { unitTests, unitTestScores } = storeToRefs(testStore);

const setBreadcrumbItems = () => {
    breadcrumbItems.value.push({
        label: unitDetails.value.name,
    })
}

const getStudentFullName = (student) => {
    return `${student.saint_name} ${student.last_name} ${student.middle_name} ${student.first_name}`;
}

onBeforeMount(async () => {
    const unit_code = route.params.unit_id;
    await unitStore.getUnitStudents(unit_code);
    await testStore.getUnitTests(unit_code);
    setBreadcrumbItems();
});

const onTestChange = async () => {
    await testStore.getUnitTestScoreList(selectedTest.value, route.params.unit_id);
}

</script>