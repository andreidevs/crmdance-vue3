<template>
  <el-input
    v-model="value"
    :placeholder="widget.placeholder"
    :loading="loading"
    clearable
    @input="changeValue(item)"
  />
</template>

<script setup>
import { useFiltersStore } from "../../../stores/filters";
import debounce from "lodash.debounce";
import { ref } from "vue";

const props = defineProps(
  { item: {
      type: Object,
      default: ()=> {}
    }
  });

let widget = ref(props.item.widget);
let value = ref();
let loading = ref(false);
let filterStore = useFiltersStore();


const changeValue = debounce(() => {
  if(value.value) {
    filterStore.setFiltersValue({ key: props.item.key, name: props.item.prop, type: widget.value.type, value,   })
  } else {
    filterStore.removeFiltersValue({key: props.item.key, name: props.item.prop})
  }
}, 500)
</script>

<style lang="scss" scoped>
.el-input{
  min-width: 201px !important;
}
</style>