import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/interface'

export const useAuth = defineStore('auth', () => {
  const login = ref(sessionStorage.getItem('login') === 'true')
  const token = ref(sessionStorage.getItem('token') || '')

  function readUser() {
    const data = sessionStorage.getItem('user')
    if (data) {
      return JSON.parse(data)
    } else {
      return null
    }
  }

  const currentUser = ref<User | null>(readUser())

  function setLogin(l: boolean) {
    login.value = l
    sessionStorage.setItem('login', String(l))
  }
  function setToken(t: string) {
    token.value = t
    sessionStorage.setItem('token', String(t))
  }
  function getLogin() {
    return login.value
  }
  function getToken() {
    return token.value
  }

  function logout() {
    setLogin(false)
    setToken('')
    sessionStorage.removeItem('user')
    currentUser.value = null
  }

  function setUser(user: User) {
    console.log(user)

    sessionStorage.setItem('user', JSON.stringify(user))
    currentUser.value = user
  }

  return { setLogin, setToken, getLogin, getToken, setUser, currentUser, logout }
})
