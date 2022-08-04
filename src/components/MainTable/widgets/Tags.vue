<template>
  <div>
    <el-tag
      v-for="(el, index) in elements"
      :key="index"
      style="margin-left: 5px"
      :effect="item.widget.effect || 'plain'"
      :type="
        item.widget.colors
          ? arrayRandElement(item.widget.colors)
          : item.widget.color
            ? item.widget.color
            : ''
      "
      disable-transitions
    >
      {{ el }}
    </el-tag>
  </div>
</template>
<script setup>
import { arrayRandElement } from "@/utils";
import { toRefs } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: ()=> {}
  },
  elements: {
    type: Array,
    default: ()=> []
  }
})

const {item, elements } = toRefs(props)
</script>