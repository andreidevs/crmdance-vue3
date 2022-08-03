<template>
  <component
    :is="componentSwitch"
    :item="item"
    :elements="elements"
  />
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";

const { item, elements } = defineProps({ item: Object, elements: Array });

const componentSwitch = computed(() =>
  defineAsyncComponent(() => import(`./${item.widget.type}.vue`))
);
</script>
