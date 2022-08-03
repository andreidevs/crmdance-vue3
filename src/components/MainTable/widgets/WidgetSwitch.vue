<template>
  <component
    :is="componentSwitch"
    :item="item"
    :elements="elements"
    :scope="scope"
  />
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";

const { item, elements } = defineProps({
  item: Object, elements: [Array, Object, String, Number], scope:  Object});

const componentSwitch = computed(() =>
  defineAsyncComponent(() => import(`./${item.widget.type}.vue`))
);
</script>
