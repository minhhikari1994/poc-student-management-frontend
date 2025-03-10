<template>
    <ClientOnly>
        <TransitionScale :scale="0.98" v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && installPromptOpen">
            <UiAlert icon="lucide:info" class="items-center" icon-class="text-blue-500">
                <UiAlertDescription class="flex items-center justify-between">
                    Ấn vào nút bên cạnh để cài đặt
                    <div class="flex items-center gap-3">
                        <UiButton class="text-xs" size="xs" @click="$pwa.install()">Cài đặt</UiButton>
                        <UiButton variant="ghost" size="icon-xs" @click="installPromptOpen = false">
                            <Icon name="lucide:x" class="size-3.5" />
                        </UiButton>
                    </div>
                </UiAlertDescription>
            </UiAlert>
        </TransitionScale>
    </ClientOnly>
    <slot />

    <!-- <ClientOnly>
        <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh" class="pwa-toast" role="alert">
            <div class="message">
                <span>
                    Install PWA
                </span>
            </div>
            <button @click="$pwa.install()">
                Install
            </button>
            <button @click="$pwa.cancelInstall()">
                Cancel
            </button>
        </div>
    </ClientOnly> -->
</template>

<script setup>
const installPromptOpen = ref(true)
</script>