<template>
  <el-select
    v-model="value"
    :placeholder="widget.placeholder"
    :loading="loading"
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
import { ref, computed } from "vue";
import { getTable } from "../../../apis";
import { useFiltersStore } from "../../../stores/filters";

const { item } = defineProps({ item: Object });

let widget = $ref(item.widget);
let value = $ref();
let loading = $ref(false);
let filterStore = useFiltersStore();
let key = item.key;

const openSelect = async (status, widget) => {
  if (status && !widget.options?.length) {
    loading = true;
    const { data } = await getTable(widget.endpoint);
    widget.options = data;
    loading = false;
  }
};

const changeValue = async (event) => {
  filterStore.filters[key].push({ name: item.prop, type: widget.type, value });
};
</script>
