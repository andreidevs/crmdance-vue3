<template>
  <component :is="componentSwitch" :item="item" />
</template>

<script setup>
import { computed, ref, defineAsyncComponent } from "vue";

const { item } = defineProps({ item: Object });

const componentSwitch = computed(() =>
  defineAsyncComponent(() => import(`./${item.widget.type}.vue`))
);
</script>
