<template>
  <component
    :is="componentSwitch"
    :item="props.item"
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
