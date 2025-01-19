<template>
  <div class="flex items-center justify-center">
    <UiList class="">
      <template v-for="unit in unitList" :key="unit.unit_id">
        <UiListItem class="py-5 items-start px-0" :to="`/units/${unit.unit_id}`">
          <UiListContent>
            <UiListTitle :title="unit.name" />
            <UiListSubtitle
              class="line-clamp-2"
              :subtitle="unit.grade_name"
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
  </div>
</template>

<script lang="js" setup>

import { useUnitStore } from "@/stores/unitStore";
import { useAppPageStore } from "@/stores/appPageStore";

const unitStore = useUnitStore();
const appPageStore = useAppPageStore();

const { unitList } = storeToRefs(unitStore);

const breadCrumbItems = [
  {
    label: "Danh sách lớp",
    link: "/units",
  },
]

onBeforeMount(() => {
  appPageStore.setBreadcrumbItems(breadCrumbItems);
  unitStore.getUnitList();
});
</script>