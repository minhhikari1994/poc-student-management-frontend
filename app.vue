<script setup lang="js">
  import { materialTheme } from 'notivue'
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Notivue v-slot="item">
    <Notification :item="item" :theme="materialTheme"/>
  </Notivue>
</template>
