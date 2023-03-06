<template>
  <v-app id="app">
    <div class="menu">
      <span @click="logout()">Déconnexion</span>
    </div>
    <h1 @click="router.push('/')">Guess My Words</h1>

    <router-view />
  </v-app>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';
import styles from './styles/settings.scss'

const router = useRouter()
const logout = () => {
  localStorage.removeItem('token')
}
  //
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .menu {
    position: fixed;
    right: 0;
    margin: 1rem;
    cursor: pointer;
  }
</style>
