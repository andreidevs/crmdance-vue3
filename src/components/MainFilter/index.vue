<template>
  <h2 v-if="title.length">
    Фильтры
  </h2>
  <div class="flex items-center">
    <div
      v-for="(item, index) in columnsData"
      :key="index"
      class="mx-2 my-2"
    >
      <WidgetSwitch
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "../../stores/filters";
import WidgetSwitch from "./widgets/WidgetSwitch";
import { ref } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  columns: {
    type: Array,
    default: ()=> []
  },
  title: {
    type: String,
    default: ""
  }
});

let columnsData = ref(props.columns);
let filterStore = useFiltersStore();

filterStore.$subscribe(() => {
  emit("update");
})


</script>
