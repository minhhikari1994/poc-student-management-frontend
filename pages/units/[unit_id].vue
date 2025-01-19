<template>
    <h1>this is template id</h1>
</template>

<script lang="js" setup>

import { useUnitStore } from "@/stores/unitStore";
import { useAppPageStore } from "@/stores/appPageStore";

const unitStore = useUnitStore();
const appPageStore = useAppPageStore();

const breadCrumbItems = [
  {
    label: "Danh sách lớp",
    link: "/units",
  },
]

onBeforeMount(() => {
  appPageStore.setBreadcrumbItems(breadCrumbItems);
});

</script>