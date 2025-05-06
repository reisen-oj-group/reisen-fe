import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { apiLogin, apiLogout, apiRegister } from '@/api/auth'
import type { LoginRequest, User } from '@/interface'

import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const currentToken = ref<string | null>(localStorage.getItem('token') || null)

  const redirectUrl = ref<string | null>(null)
  const showLogin = ref(false)

  const isInitialized = ref(false)
  const isAuthenticated = computed(() => !!currentToken.value)

  const setRedirectUrl = (url: string) => {
    redirectUrl.value = url
  }

  const login = async (credentials: LoginRequest) => {
    apiLogin(credentials).then((response) => {
      currentToken.value = response.token
      currentUser.value = response.user

      if (credentials.remember) {
        localStorage.setItem('token', response.token)
      } else {
        sessionStorage.setItem('token', response.token)
      }
      if (redirectUrl.value) useRouter().push(redirectUrl.value)
    })
  }

  const logout = async () => {
    await apiLogout({})
    currentToken.value = null
    currentUser.value = null
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
  }

  const initialize = async () => {
    if (!currentToken.value) {
    }
  }

  return {
    currentUser,
    currentToken,
    isInitialized,
    isAuthenticated,
    showLogin,
    setRedirectUrl,
    login,
    logout,
    initialize,
  }
})
