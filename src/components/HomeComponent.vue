<template>
  {{action}}
  <v-container class="fill-height" v-if="action === Action.HOME">
    <v-btn @click="action = Action.LOGIN">
      Connexion
    </v-btn>

    <v-btn @click="action = Action.REGISTER">
      Inscription
    </v-btn>
  </v-container>

  <v-container class="fill-height" v-else-if="action === Action.LOGIN">
      <v-text-field v-model="username" label="username"></v-text-field>
      <v-text-field v-model="password" label="password" type="password"></v-text-field>

      <v-btn @click="action = Action.HOME">
        Retour
      </v-btn>

      <v-btn @click="login">
        Connexion
      </v-btn>

  </v-container>
</template>

<script lang="ts" setup>
  //
import {useRouter} from "vue-router";
import {useStore} from "@/store/app";
import {ref} from "vue";
import {API_URL} from "@/configs/constants";
import axios from "axios";

const router = useRouter()
const store = useStore()

enum Action {
  HOME,
  LOGIN,
  REGISTER
}
let action = ref(Action.HOME)
let username = ref('')
let password = ref('')
const login = async () => {
  try {
    let result = await axios.post(API_URL + '/api/users/login', {
      username: username.value,
      password: password.value
    })
    if(result && result.data) {
      const {token, username} = result.data
      if(token) {
        localStorage.setItem('token', result.data.token)
        store.setUserAccount({
          username: result.data.username
        })
        router.push('home')
      }
    }
    console.log(result)
  } catch(err) {
    console.log('err login', err)
  }

}
const register = () => {

}


</script>
<style lang="scss" scoped>
.v-btn {
  margin: 2rem;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  height: 6rem;
}
.v-container {
  text-align: center;
}
</style>
