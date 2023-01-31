<template>
  <v-app id="app">
    <h1>Guess My Words</h1>

    <router-view />
  </v-app>
</template>


<script lang="ts" setup>
  import styles from './styles/settings.scss'

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
</style>
