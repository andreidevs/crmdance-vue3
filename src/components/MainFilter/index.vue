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
      <!-- ## Select -->
      <WidgetSwitch
        :key="index"
        :item="item"
      />
      <!-- End Select -->
    </div>
  </div>

</template>

<script setup>
import { computed, watch } from "vue";
import { useFiltersStore } from "../../stores/filters";

const emit = defineEmits(["update"]);
const props = defineProps({ columns: Array });

let columnsData = $ref(props.columns);
let filterStore = useFiltersStore();

filterStore.$subscribe((mutation, state) => {
  emit("update");
})

// watch(filters, (value) => {
//   console.log("update", )
//   emit("update");
// },
//   {
//     immediate: true
//   }
// );




</script>
