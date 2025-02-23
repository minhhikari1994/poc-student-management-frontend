<template>
    <div class="flex items-center justify-center text-center">
        <UiCard class="w-[500px] max-w-sm" title="Thông tin ứng dụng Quản lý giáo lý" description="Thiếu nhi giáo xứ Tam Hà">
            <template #content>
                <UiCardContent>
                    <div class="space-y-3">
                    <p class="text-muted-foreground text-sm">
                        Ứng dụng được tạo ra với mong muốn góp phần vào việc quản lý thông tin học sinh trong giáo xứ một cách hiệu quả và hiện đại hơn.
                    </p>
                    <p class="text-muted-foreground text-sm">
                        Đây là phiên bản <strong>chạy thử nghiệm (PoC)</strong> với mục tiêu định hướng cho việc phát triển hệ thống chính thức trong tương lai gần. Một số tính năng sẽ có thể được thêm vào trong quá trình chạy thử.
                    </p>
                  </div>
                  <div class="mt-5">
                    <UiTable class="border text-muted-foreground">
                    <UiTableBody>
                        <UiTableRow>
                            <UiTableCell class="font-bold text-left text-wrap">Phiên bản</UiTableCell>
                            <UiTableCell class="text-wrap">PoC 2025.01</UiTableCell>
                        </UiTableRow>
                        <UiTableRow>
                            <UiTableCell class="font-bold text-left text-wrap">Phát triển bởi</UiTableCell>
                            <UiTableCell class="text-wrap">
                                <NuxtLink to="https://github.com/minhhikari1994" target="_blank">
                                    Minh Hikari <br /><span class="text-xs">(Quarter to Eleven)</span>
                                </NuxtLink>
                            </UiTableCell>
                        </UiTableRow>
                    </UiTableBody>
                  </UiTable>
                  </div>
                  <div class="mt-[2rem]">
                    <p class="text-muted-foreground text-xs">
                        Minh Hikari - Quarter to Eleven<br />
                        &copy; 2025

                    </p>
                  </div>
                </UiCardContent>
            </template>
        </UiCard>
    </div>
</template>

<script setup lang="js">
import { UiTableBody } from "#components";
import { useAppPageStore } from "@/stores/appPageStore";
const appPageStore = useAppPageStore();

const breadCrumbItems = [
    {
        label: "Thông tin",
    }
]

onBeforeMount(() => {
    appPageStore.setBreadcrumbItems(breadCrumbItems);
});
</script>