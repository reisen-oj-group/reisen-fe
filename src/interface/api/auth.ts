import type { User } from '../entity'

export interface LoginRequest {
  username: string
  password: string
  remember?: boolean
}

export interface LoginResponse {
  token: string
  user: User
}

export interface LogoutRequest {}
export interface LogoutResponse {}

export interface RegisterRequest {
  username: string
  password: string
}

export interface RegisterResponse {
  token: string
  user: User
}
