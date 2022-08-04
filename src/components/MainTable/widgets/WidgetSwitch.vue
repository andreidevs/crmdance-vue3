<template>
  <component
    :is="componentSwitch"
    :item="item"
    :elements="elements"
    :scope="scope"
  />
</template>

<script setup>
import { computed, defineAsyncComponent, toRefs } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: ()=> {}
  },
  elements: {
    type: [Array, Object, String, Number],
    default: ()=> null
  },
  scope:  {
    type: Object,
    default: ()=> {}
  }

});

const { item, elements } = toRefs(props)
const componentSwitch = computed(() =>
  defineAsyncComponent(() => import(`./${item.widget.type}.vue`))
);
</script>
