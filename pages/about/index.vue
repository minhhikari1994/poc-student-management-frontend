<template>
    <div class="flex items-center justify-center text-center">
        <UiTabs class="w-[90%] w-max-[10rem]" default-value="appinfo">
            <UiTabsList :pill="false" class="relative grid w-full grid-cols-2">
                <UiTabsTrigger :pill="false" value="appinfo">Về ứng dụng</UiTabsTrigger>
                <UiTabsTrigger :pill="false" value="changelog">Thông tin phiên bản</UiTabsTrigger>
                <UiTabsIndicator />
            </UiTabsList>
            <UiTabsContent value="appinfo" class="mt-3">
                <UiCard class="w-[100%] max-w-sm m-auto" title="Thông tin ứng dụng Quản lý giáo lý"
                    description="Thiếu nhi giáo xứ Tam Hà">
                    <template #content>
                        <UiCardContent>
                            <div class="space-y-3">
                                <p class="text-muted-foreground text-sm">
                                    Ứng dụng được tạo ra với mong muốn góp phần vào việc quản lý thông tin học sinh giáo
                                    lý
                                    trong giáo xứ một cách hiệu quả và hiện đại hơn.
                                </p>
                                <p class="text-muted-foreground text-sm">
                                    Đây là phiên bản <strong>chạy thử nghiệm giới hạn (PoC)</strong> với mục tiêu định
                                    hướng cho
                                    việc phát triển hệ thống chính thức trong tương lai gần. Một số tính năng sẽ có thể
                                    được
                                    thêm vào trong quá trình chạy thử.
                                </p>
                            </div>
                            <div class="mt-5">
                                <UiTable class="border text-muted-foreground">
                                    <UiTableBody>
                                        <UiTableRow>
                                            <UiTableCell class="font-bold text-left text-wrap">Phiên bản</UiTableCell>
                                            <UiTableCell class="text-wrap">PoC 2025.02</UiTableCell>
                                        </UiTableRow>
                                        <UiTableRow>
                                            <UiTableCell class="font-bold text-left text-wrap">Phát triển bởi
                                            </UiTableCell>
                                            <UiTableCell class="text-wrap">
                                                <NuxtLink to="https://github.com/minhhikari1994" target="_blank">
                                                    Minh Hikari <br /><span class="text-xs">(Quarter to Eleven)</span>
                                                </NuxtLink>
                                            </UiTableCell>
                                        </UiTableRow>
                                    </UiTableBody>
                                </UiTable>
                            </div>
                        </UiCardContent>
                    </template>
                </UiCard>
            </UiTabsContent>
            <UiTabsContent value="changelog" class="mt-3">
                <UiCard class="w-[100%] max-w-sm m-auto">
                    <template #content>
                        <UiCardContent class="text-left text-muted-foreground text-sm">
                            <div class="mb-3">
                                <h1 class="text-xl font-bold mb-2">POC 2025.02 (2025-04-01)</h1>
                                <p>
                                    Tính năng mới:
                                </p>
                                <ul class="list-disc ml-5 mt-2">
                                    <li>Triển khai việc điểm danh sử dụng QR code.</li>
                                    <!-- ... -->
                                </ul>
                            </div>
                            <UiDivider class="mb-3" />
                            <div class="mb-3">
                                <h1 class="text-xl font-bold mb-2">POC 2025.01 (2025-03-01)</h1>
                                <p>
                                    Bản phát hành thử nghiệm đầu tiên. Các tính năng chính bao gồm:
                                </p>
                                <ul class="list-disc ml-5 mt-2">
                                    <li>Xem thông tin danh sách học viên các lớp.</li>
                                    <li>Điểm danh học viên.</li>
                                    <li>Nhập và chỉnh sửa điểm kiểm tra.</li>
                                    <!-- ... -->
                                </ul>
                            </div>
                        </UiCardContent>
                    </template>
                </UiCard>
            </UiTabsContent>
            <div class="mt-[2rem] w-[90%]">
                <p class="text-muted-foreground text-xs">
                    Minh Hikari - Quarter to Eleven<br />
                    &copy; 2025

                </p>
            </div>
        </UiTabs>

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