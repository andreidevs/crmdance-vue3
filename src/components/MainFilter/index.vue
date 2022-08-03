<template>
  <h2 class="mt-4">
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
import { computed, watch } from "vue";
import { useFiltersStore } from "../../stores/filters";
import WidgetSwitch from "./widgets/WidgetSwitch"
const emit = defineEmits(["update"]);
const props = defineProps({ columns: Array });

let columnsData = $ref(props.columns);
let filterStore = useFiltersStore();

filterStore.$subscribe((mutation, state) => {
  emit("update");
})



</script>
