<template>
  <PaginationNext v-bind="forwarded">
    <slot>
      <UiButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationNext>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationNext } from "radix-vue";
  import type { PaginationNextProps } from "radix-vue";

  const props = defineProps<
    PaginationNextProps & {
      /** Icon to show */
      icon?: string;
    }
  >();

  const forwarded = reactiveOmit(props, "icon");
</script>
