import type { User, UserId } from '../entity'

export interface UserRequest {
  user: UserId
}

export interface UserResponse {
  user: User
}

export interface AvatarUploadRequest {
  file: File
}

export interface AvatarUploadResponse {
  avatar: string
}
