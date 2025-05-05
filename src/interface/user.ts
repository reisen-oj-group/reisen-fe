import type { UserId } from './enum'

interface Auth {
  uid: UserId
  username: string
  password: string
}

interface User {
  id: UserId

  name: string
  role: number
  register: Date
  avatar?: string
}

export type { User, Auth }
