<template>

  <div id="screen">
    <v-file-input label="File input" v-model="input"></v-file-input>
    <v-btn @click="upload">upload</v-btn>
    <img src="../assets/mapjv.jpg" alt="map" @click="handleClick" ref="map">
    <point-component v-for="(point, i) in points" :key="i" :index="i" @click.stop="selectedPays = i" :point="point" :selected-point="selectedPays"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import videogames from '../assets/video_game.json'
import IPoint from "@/models/IPoint";
import PointComponent from '../components/PointComponent'
import {API_URL} from "@/configs/constants";
import axios from "axios";

let points = ref<IPoint[]>([])
let map = ref()
let selectedPays = ref(-1)
let input =ref()

const handleClick = (event: any) => {
  if(selectedPays.value !== -1) {
    points.value[selectedPays.value].y =  (event.layerY / map.value.height) * 100 - points.value[selectedPays.value].width/2
    points.value[selectedPays.value].x = (event.layerX / map.value.width) * 100 //- pays.value[selectedPays.value].width/2
  }
}
onMounted(() => {
  points.value = videogames
  console.log('points', points.value)
})
  const upload = () => {
    const formData = new FormData();
    formData.append('file', input.value['0']);
  console.log('file',input.value['0'])
    const headers = { 'Content-Type': 'multipart/form-data' };
    axios.post(API_URL + '/api/maps', formData).then(res => {
      console.log('axios res', res)
    })
  }
</script>
<style>
  h1 {
    color: #D2AA45;
    text-align: center;
    margin: 2rem;
    font-size: 3rem;
  }
  #screen {
    width: 80%;
    float: left;
    position: relative;
  }
  img {
    width: 100%;
  }
</style>
