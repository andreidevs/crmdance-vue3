<template>
  <component
    :is="componentSwitch"
    :item="item"
  />
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";

const props= defineProps({
  item: {
    type: Object,
    default: ()=> {}
  }
});

const componentSwitch = computed(() =>
  defineAsyncComponent(() => import(`./${props.item.widget.type}.vue`))
);
</script>
