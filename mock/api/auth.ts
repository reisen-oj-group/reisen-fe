import type { MockMethod } from 'vite-plugin-mock'

import { mockUsers } from '../data'
import type { LoginRequest, LoginResponse } from '../interface'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: (request: { body: LoginRequest }) => {
      const response: LoginResponse = {
        token: 'CIRNO-BAKA',
        user: mockUsers[0],
      }
      return response
    },
  },
] as MockMethod[]
