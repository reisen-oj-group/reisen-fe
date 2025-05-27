import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { apiLogin, apiLogout, apiRegister } from '@/api/auth'
import type { LoginRequest, RegisterRequest, User } from '@/interface'

import { useRouter } from 'vue-router'
import { useContest } from './contest'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const contestStore = useContest()

  const currentUser = ref<User | null>(null)
  const currentToken = ref<string | null>(localStorage.getItem('token') || null)

  const redirectUrl = ref<string | null>(null)

  const isInitialized = ref(false)
  const isAuthenticated = computed(() => !!currentToken.value)

  const setRedirectUrl = (url: string | null) => {
    redirectUrl.value = url
  }

  const show = ref((tab: 'login' | 'register' = 'login') => {})
  const hide = ref(() => {})

  const login = async (credentials: LoginRequest) => {
    const response = await apiLogin(credentials)

    currentToken.value = response.token
    currentUser.value = response.user
    contestStore.refresh()

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
    await apiRegister(credentials)
  }

  const logout = async () => {
    const _response = await apiLogout({})
    currentToken.value = null
    currentUser.value = null
    contestStore.refresh()

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
    setRedirectUrl,
    show,
    hide,
    login,
    logout,
    register,
    initialize,
  }
})
