// Utilities
import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import IAccount from "@/models/IAccount";

export const useStore = defineStore('app', () => {
  const logged =  ref(false)
  const userAccount = ref<IAccount>({
    username: ''
  })

  const setLogged = (isLog: boolean) => { logged.value = isLog }
  const setUserAccount = (newUserAccount: IAccount) => { userAccount.value = newUserAccount}

  const isLogged = computed(() => logged.value)
  const getUserAccount = computed(() => userAccount.value)

  return {
    setLogged,
    setUserAccount,
    isLogged,
    getUserAccount
  }
})
