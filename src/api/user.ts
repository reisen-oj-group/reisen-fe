import type { UserRequest, UserResponse } from '@/interface'
import axios, { type ReisenAxiosConfig } from '@/tools/axios'

export const apiUser = async (request: UserRequest) => {
  return (await axios.post<UserResponse>('/user', request, {} as ReisenAxiosConfig)).data
}
