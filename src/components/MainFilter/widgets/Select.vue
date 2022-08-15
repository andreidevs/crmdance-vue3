<template>
  <el-select
    v-model="value"
    :placeholder="widget.placeholder"
    :loading="loading"
    clearable
    collapse-tags
    collapse-tags-tooltip
    :multiple="item.widget.multi"
    @visible-change="openSelect($event, widget)"
    @change="changeValue(item)"
  >
    <el-option
      v-for="el in options"
      :key="el[widget.value]"
      :label="el[widget.view]"
      :value="el[widget.value]"
    />
  </el-select>
</template>

<script setup>
import { getTable } from "../../../apis";
import { useFiltersStore } from "../../../stores/filters";
import { ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: ()=> {}
  }
});

const widget = ref(props.item.widget);
const value = ref();
const loading = ref(false);
const filterStore = useFiltersStore();
const options = ref([])

const openSelect = async (status, widget) => {
  if (status && !options.value?.length) {
    loading.value = true;
    options.value = await getTable(widget.endpoint);
    loading.value = false;
  }
};

const changeValue = async () => {
  if(value.value.length) {
    filterStore.setFiltersValue({ key: props.item.key, name: props.item.prop, type: widget.value.type, value })
  } else {
    filterStore.removeFiltersValue({key: props.item.key, name: props.item.prop})
  }
};
</script>
