import type { AvatarUploadRequest, AvatarUploadResponse, UserRequest, UserResponse } from '@/interface'
import { apiFetchDefault, apiFetchRemind } from '@/utils/ofetch'

export const apiUser = async (request: UserRequest) => {
  return apiFetchDefault<UserResponse>('/user', {
    method: 'POST',
    body: request,
  })
}

export const apiAvatarUpload = async (request: AvatarUploadRequest) => {
  const formData = new FormData()
  formData.append('file', request.file)

  return apiFetchRemind<AvatarUploadResponse>('/avatar/upload', {
    method: 'POST',
    body: formData,
  })
}