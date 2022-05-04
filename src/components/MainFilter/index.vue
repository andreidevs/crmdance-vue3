<template>
  <h2 class="mt-4">Фильтры</h2>
  <div class="mt-2 mb-2" v-for="(item, index) in columnsData" :key="index">
    <!-- ## Select -->
    <WidgetSwitch :item="item" :key="index" />
    <!-- End Select -->
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useFiltersStore } from "../../stores/filters";
const emit = defineEmits(["update"]);
const { columns } = defineProps({ columns: Array });
let propValues = $ref({});
let columnsData = $ref(columns);
let filterStore = useFiltersStore();

watch(filterStore.filters, (value) => {
  // console.log("watch", filterStore.filters);
  emit("update");
});
</script>
