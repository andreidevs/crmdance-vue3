<template>

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
</template>
<script setup>
import { arrayRandElement } from "@/utils";

const {item, elements} = defineProps({item: Object, elements: Array})
</script>