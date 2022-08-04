<template>
  <el-button
    size="small"
    style="width: 90px"
    :type="getStatus() ? 'success': 'primary'"
    :disabled="getStatus()"
    @click="createPayment"
  >
    {{ getName() }}
  </el-button>
</template>
<script setup>
import { intervalToDuration } from "date-fns";
import { toRefs } from "vue";

const props = defineProps(
  {
    item: {
      type: Object,
      require: true,
      default: ()=> {}
    },
    elements: {
      type: String,
      default: ""
    },
    scope: {
      type: Object,
      require: true,
      default: ()=> {}
    }
  })
const { scope, elements: payDate} = toRefs(props)

const getStatus = ()=>{
  if(payDate.value) {
    const current = new Date(payDate.value)
    const dd = intervalToDuration({
      start: current,
      end: new Date(),
    },)

    if(dd.days > scope.value.payPeriod || dd.months >= 1){
      return false
    } else return  true
  }
  return  false
}
const getName = () =>{
  return getStatus() ? 'Оплачен': 'Оплатить'
}
const createPayment = () => {}


</script>