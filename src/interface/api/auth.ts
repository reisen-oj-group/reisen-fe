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

// 已携带 Cookie，不需要额外参数
export type LogoutRequest = object

// 登出后不进行任何操作
export type LogoutResponse = object

export interface RegisterRequest {
  username: string
  password: string
}

// 注册后自动切换至登录界面，不需要返回任何东西
export type RegisterResponse = object
