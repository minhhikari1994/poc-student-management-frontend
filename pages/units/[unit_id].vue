<template>
  <div class="flex items-center justify-center">
    <UiList class="">
      <template v-for="student in unitDetails.students" :key="student.student_code">
        <UiDialog>
          <UiDialogTrigger as-child>
            <UiListItem class="py-5 items-start px-2">
              <UiListContent>
                <UiListTitle
                  :title="`${student.saint_name} ${student.last_name} ${student.middle_name} ${student.first_name}`" />
                <UiListSubtitle class="line-clamp-2 text-left" :subtitle="student.student_code" />
              </UiListContent>
              <UiButton size="icon-sm" variant="ghost" class="ml-auto shrink-0 self-center rounded-full">
                <Icon name="lucide:chevron-right" />
              </UiButton>
            </UiListItem>
            <UiSeparator class="ml-auto last:hidden" />
          </UiDialogTrigger>
          <UiDialogContent
            class="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] w-full [&>button:last-child]:top-3.5">
            <StudentsInfoDialogContent :student="student" :gradeCode="unitDetails.grade_code"/>
          </UiDialogContent>
        </UiDialog>
      </template>
    </UiList>
  </div>
</template>

<script lang="js" setup>

import { useUnitStore } from "@/stores/unitStore";
import { useAppPageStore } from "@/stores/appPageStore";
import { UiDialog } from "#components";

const route = useRoute();
const unitStore = useUnitStore();
const appPageStore = useAppPageStore();

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

</script>