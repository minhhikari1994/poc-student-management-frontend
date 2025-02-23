<template>
  <NuxtPwaManifest />
  <NuxtPwaAssets />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Notivue v-slot="item">
    <Notification :item="item" :theme="materialTheme" />
  </Notivue>
</template>

<script lang="js" setup>
import { NuxtPwaManifest, NuxtPwaAssets } from '#components';
import { materialTheme } from 'notivue'
</script>
