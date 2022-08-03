<template>
  <el-select
    v-model="value"
    :placeholder="widget.placeholder"
    :loading="loading"
    clearable
    :multiple="item.widget.multi"
    @visible-change="openSelect($event, widget)"
    @change="changeValue(item)"
  >
    <el-option
      v-for="el in widget.options"
      :key="el[widget.value]"
      :label="el[widget.view]"
      :value="el[widget.value]"
    />
  </el-select>
</template>

<script setup>
import { getTable } from "../../../apis";
import { useFiltersStore } from "../../../stores/filters";

const {item} = defineProps({ item: Object });

let widget = $ref(item.widget);
let value = $ref();
let loading = $ref(false);
let filterStore = useFiltersStore();


const openSelect = async (status, widget) => {
  if (status && !widget.options?.length) {
    loading = true;
    const { data } = await getTable(widget.endpoint);
    widget.options = data;
    loading = false;
  }
};

const changeValue = async () => {
  if(value.length) {
    filterStore.setFiltersValue({ key: item.key, name: item.prop, type: widget.type, value, })
  } else {
    filterStore.removeFiltersValue({key: item.key, name: item.prop})
  }
};
</script>
