import type { UserRequest, UserResponse } from '@/interface'
import { apiFetchDefault } from '@/utils/ofetch'

export const apiUser = async (request: UserRequest) => {
  return apiFetchDefault<UserResponse>('/user', {
    method: 'POST',
    body: request,
  })
}
