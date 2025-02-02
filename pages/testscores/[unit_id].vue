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
        <UiButton size="lg" class="w-full" @click="handleSaveScore" :loading="isSavingScore">
            <Icon class="size-4" name="lucide:save" />
            Lưu
        </UiButton>
    </div>
    <div class="grid overflow-x-auto rounded-md border pb-4 mt-4" v-if="selectedTest">
        <UiTable>
            <UiTableHeader>
                <UiTableRow>
                    <UiTableHead class="w-[50vw]">Họ và tên</UiTableHead>
                    <UiTableHead>Điểm số</UiTableHead>
                </UiTableRow>
            </UiTableHeader>
            <UiTableBody class="last:border-b">
                <template v-for="scoreEntry in unitTestScores" :key="scoreEntry.student.id">
                    <UiTableRow>
                        <UiTableCell class="text-wrap">{{ getStudentFullName(scoreEntry.student) }}</UiTableCell>
                        <UiTableCell>
                            <UiSelect v-model="scoreEntry.score">
                                <UiSelectTrigger placeholder="Chọn điểm số" />
                                <UiSelectContent class="h-[50vh]">
                                    <UiSelectItem v-for="option in scoreOptions" :key="option.toString()"
                                        :value="option.toString()" :text="option" />
                                </UiSelectContent>
                            </UiSelect>
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
import { UiSelect } from "#components";

const route = useRoute();
const unitStore = useUnitStore();
const appPageStore = useAppPageStore();
const testStore = useTestStore();
const isSavingScore = ref(false);

const scoreOptions = [
    10, 9.8, 9.5, 9.3, 9, 8.8, 8.5, 8.3, 8, 7.8, 7.5, 7.3, 7, 6.8, 6.5, 6.3, 6,
    5.8, 5.5, 5.3, 5, 4.8, 4.5, 4.3, 4, 3.8, 3.5, 3.3, 3, 2.8, 2.5, 2.3, 2,
    1.8, 1.5, 1.3, 1, 0.8, 0.5, 0.3, 0
];

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

const handleSaveScore = async () => {
    isSavingScore.value = true;
    const student_scores_to_update = unitTestScores.value.map((scoreEntry) => {
        return {
            student_code: scoreEntry.student.student_code,
            score: scoreEntry.score
        }
    })
    await testStore.updateTestScores(selectedTest.value, student_scores_to_update);
    isSavingScore.value = false;
}

</script>