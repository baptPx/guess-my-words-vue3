<template>
  <img :src="isSelected() ? targetred : target"
       :style="
     'left: '+ (point.x - point.width/2) + '%;' +
      'top: '+ (point.y - point.width/2) + '%;' +
      'width:' + point.width + '%;' +
      'opacity:' + (point.find ? 1 : 1) + ';'"
       @click="setSelectedPoint"/>

</template>

<script setup lang="ts">
import target from '../assets/target.svg'
import targetred from '../assets/targetred.svg'
import Point from "@/models/IPoint";
import {PropType} from "vue";

const props = defineProps({
  point: {
    type: Object as PropType<Point>
  },
  selectedPoint: Number
})

const isSelected = () => {
  return props.selectedPoint === 1
}
const setSelectedPoint = () => {

}
</script>

<style scoped>
  img {
    position: absolute;
    cursor: pointer;
  }
</style>
