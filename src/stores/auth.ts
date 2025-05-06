import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { apiLogin, apiLogout, apiRegister } from '@/api/auth'
import type { LoginRequest, RegisterRequest, User } from '@/interface'

import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()

  const currentUser = ref<User | null>(null)
  const currentToken = ref<string | null>(localStorage.getItem('token') || null)

  const redirectUrl = ref<string | null>(null)
  const showLogin = ref(false)

  const isInitialized = ref(false)
  const isAuthenticated = computed(() => !!currentToken.value)

  const setRedirectUrl = (url: string) => {
    console.log('new url: ', url)
    redirectUrl.value = url
  }

  const login = async (credentials: LoginRequest) => {
    const response = await apiLogin(credentials)

    currentToken.value = response.token
    currentUser.value = response.user

    if (credentials.remember) {
      localStorage.setItem('token', response.token)
    } else {
      sessionStorage.setItem('token', response.token)
    }
    if (redirectUrl.value) {
      router.push(redirectUrl.value)
      redirectUrl.value = null
    }
  }

  const register = async (credentials: RegisterRequest) => {
    const response = await apiLogin(credentials)

    currentToken.value = response.token
    currentUser.value = response.user
    sessionStorage.setItem('token', response.token)
    if (redirectUrl.value) {
      router.push(redirectUrl.value)
      redirectUrl.value = null
    }
  }

  const logout = async () => {
    const response = await apiLogout({})
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
    register,
    initialize,
  }
})
