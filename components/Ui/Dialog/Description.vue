<template>
  <DialogDescription :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ description }}</slot>
  </DialogDescription>
</template>

<script lang="ts" setup>
  import { DialogDescription } from "radix-vue";
  import type { DialogDescriptionProps } from "radix-vue";

  const props = defineProps<
    DialogDescriptionProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** The description text */
      description?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "description");
  const styles = tv({
    base: "text-base text-muted-foreground md:text-sm",
  });
</script>
