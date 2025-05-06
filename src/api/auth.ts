import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/interface'

import axios, { type ReisenAxiosConfig } from '@/tools/axios'

export const apiLogin = async (payload: LoginRequest) => {
  const res = await axios.post<LoginResponse>('/auth/login', payload, {
    hideError: true,
  } as ReisenAxiosConfig)
  return res.data
}

export const apiLogout = async (payload: LogoutRequest) => {
  const res = await axios.post<LogoutResponse>('/auth/logout', payload, {
    hideError: true,
  } as ReisenAxiosConfig)
  return res.data
}

export const apiRegister = async (payload: RegisterRequest) => {
  const res = await axios.post<RegisterResponse>('/auth/register', payload, {
    hideError: true,
  } as ReisenAxiosConfig)
  return res.data
}
