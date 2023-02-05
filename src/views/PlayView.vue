<template>
  <div  v-if="map !== null">
    <div id="screen">
        <img :src="API_URL + '/images/' + map.fileName + '.png'" alt="map">
        <point-component 
            v-for="(point, index) of map.points"
            :point="point"
            :key="'point-' + index"
            :is-red="false"
            :should-show="point.find || selectedItem === index"
            @eventa="selectItem(index)"
            />
            
    </div>
    <div id="list-finds">
      <h2>{{ map?.title }} - ({{ findItems.length }} / {{ map.points.length }})</h2>
      <p>{{ map?.description }}</p>

      <div v-if="selectedItem >= 0">
        <v-text-field 
          v-model="typedText" 
          label="Réponse" 
          @keydown.enter="validateAnswer"
        ></v-text-field>
        <v-btn @click="validateAnswer">Valider</v-btn>
      </div>
      <ul>
        <li 
        v-for="point of findItems"
        >
        {{ point }}
        </li>
      </ul>
    </div>
</div>
</template>

<script lang="ts" setup>
import { API_URL } from '@/configs/constants';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type IMap from '../models/IMap'
import PointComponent from '@/components/PointComponent.vue';


const route = useRoute()
let map = ref<IMap|null>(null)
let selectedItem = ref(-1)
let typedText = ref('')
let mapId = ref(-1)
let findItems = ref<string[]>([])
onMounted(async () => {
  mapId.value = +route.params.mapId
  let play = await axios.get(`${API_URL}/api/maps/${mapId.value}/play`, {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
  map.value = play.data
  if(map.value) {
    findItems.value = map.value?.points
    .filter(p => p.find)
    .map(p => p.label)
  }
})

const selectItem = (index: number) => {
  selectedItem.value = index
}
const validateAnswer = async () => {
  const point = map.value?.points[selectedItem.value]
  const { data } = await axios.post(`${API_URL}/api/maps/${mapId.value}/play/${point?.id}`, 
  {answer: typedText.value}, {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
  if(point && data.correct) {
    point.find = true
    if(findItems.value.findIndex(item => item === data.label) === -1) findItems.value.push(data.label)
  }
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
  #list-finds {
    width: 20%;
    display: inline-block;
  }
</style>
