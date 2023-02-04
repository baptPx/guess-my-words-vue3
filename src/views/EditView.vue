<template>

<div v-if="route.params.mapId">
  <edit-component 
    :points="points" 
    :mapUrl="API_URL + '/images/' + mapData.fileName + '.png'"
    @add-point="addPoint"
    >
  </edit-component>
</div>
<div v-else>
  <v-file-input label="File input" v-model="input" @change="validFile"></v-file-input>
  <v-text-field label="Titre" v-model="title" />
  <v-btn :disabled="title === '' || wrongType === null || wrongType || tooHeavy === null || tooHeavy " @click="upload">upload</v-btn>
  <v-alert v-if="wrongType" outlined type="error">
    Seul les fichiers de type "PNG" et "JPG" sont acceptés
  </v-alert>
  <v-alert v-if="tooHeavy" outlined type="error">
    Taille maximum: 10Mo
  </v-alert>
</div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import videogames from '../assets/video_game.json'
import IPoint from "@/models/IPoint";
import PointComponent from '../components/PointComponent'
import {API_URL, MIMETYPE_MAP_ALLOWED} from "@/configs/constants";
import axios from "axios";
import { watch } from 'fs';
import { useRoute, useRouter } from 'vue-router';
import EditComponent from '@/components/EditComponent.vue';

let points = ref<IPoint[]>([])
let mapData = ref({
   "description": "",
    "id": 4, 
    "title": "dzadza",
    "fileName": "0009f2e3-d539-4fb0-b712-f24edc7fde91", 
    "userId": 123, 
    "updatedAt": "2023-02-03T18:43:09.085Z", 
    "createdAt": "2023-02-03T18:43:09.085Z" 
  })
let selectedPays = ref(-1)
let input = ref()
let title = ref()
let wrongType = ref<boolean |null>(null)
let tooHeavy = ref<boolean |null>(null)
const route = useRoute()
const router = useRouter()

// const handleClick = (event: any) => {
//   if(selectedPays.value !== -1) {
//     points.value[selectedPays.value].y =  (event.layerY / map.value.height) * 100 - points.value[selectedPays.value].width/2
//     points.value[selectedPays.value].x = (event.layerX / map.value.width) * 100 //- pays.value[selectedPays.value].width/2
//   }
// }
onMounted(() => {
  console.log('points', points.value)
})
const validFile = () => {
  const file = input.value['0']
  wrongType.value = !MIMETYPE_MAP_ALLOWED.includes(file.type)
  tooHeavy.value = file.size > 10485760 // max 10Mo
}
const upload = () => {
  const formData = new FormData();
  formData.append('map', input.value['0']);
  formData.append('title', title.value)
  console.log('formData', formData)
  const headers = { 'Content-Type': 'multipart/form-data' };
  axios.post(API_URL + '/api/maps', formData, {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  }).then(res => {
    mapData.value = res.data
    router.push('/edit/' + mapData.value.id)
  })
}
const addPoint = (point: IPoint) => {
  axios.post(`${API_URL}/api/maps/${mapData.value.id}/edit`, point,  {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
  }})
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
  #edit-menu {
    display: inline-block;
    width: 20%;
  }
</style>
