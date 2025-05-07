import type { UserId } from './enum'

export type Role = 'admin' | 'jury' | 'user'

// 表：登录信息
interface Auth {
  uid: UserId
  password: string
}

// 表：用户信息
interface User {
  id: UserId

  name: string
  role: number
  register: Date
  avatar?: string
}

export type { User, Auth }
