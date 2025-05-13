import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/interface'

import { apiFetchSilent } from '@/utils/ofetch'

export const apiLogin = async (payload: LoginRequest) => {
  return apiFetchSilent<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export const apiLogout = async (payload: LogoutRequest) => {
  return apiFetchSilent<LogoutResponse>('/auth/logout', {
    method: 'POST',
    body: payload,
  })
}

export const apiRegister = async (payload: RegisterRequest) => {
  return apiFetchSilent<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  })
}
