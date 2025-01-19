import { defineStore } from 'pinia'

export const useAppPageStore = defineStore('appPage', () => {

  const breadcrumbItems = ref([]);

  const setBreadcrumbItems = (breadcrumbList) => {
    breadcrumbItems.value = breadcrumbList
  }

    return { breadcrumbItems, setBreadcrumbItems }
  })
