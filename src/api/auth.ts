import type {
  CreateRequest,
  CreateResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  MeRequest,
  MeResponse,
  RegisterRequest,
  RegisterResponse,
  ResetRequest,
  ResetResponse,
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

export const apiMe = async (payload: MeRequest) => {
  return apiFetchSilent<MeResponse>('/auth/me', {
    method: 'POST',
    body: payload,
  })
}

export const apiCreate = async (payload: CreateRequest) => {
  return apiFetchSilent<CreateResponse>('/auth/create', {
    method: 'POST',
    body: payload,
  })
}

export const apiReset = async (payload: ResetRequest) => {
  return apiFetchSilent<ResetResponse>('/auth/reset', {
    method: 'POST',
    body: payload,
  })
}
