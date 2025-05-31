import type { UserId } from './enum'

export enum Role {
  User = 1,
  Jury = 2,
  Admin = 3,
  Super = 4,
}

// 表：用户信息
export interface User {
  id: UserId

  name: string
  role: Role
  register: Date
  avatar?: string
}
