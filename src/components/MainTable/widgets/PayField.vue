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

const {item, scope, elements: payDate} = defineProps({item: Object, elements: String, scope: Object})

const getStatus = ()=>{
  if(payDate) {
    const current = new Date(payDate)
    const dd = intervalToDuration({
      start: current,
      end: new Date(),
    },)

    if(dd.days > scope.payPeriod || dd.months >= 1){
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