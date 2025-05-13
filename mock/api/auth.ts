import { defineFakeRoute } from 'vite-plugin-fake-server/client'

import { mockUsers } from '../data'
import type { LoginRequest, LoginResponse } from '../interface'

export default defineFakeRoute([
  {
    url: '/api/auth/login',
    method: 'post',
    response: (request: { body: Partial<LoginRequest> }) => {
      const response: LoginResponse = {
        token: 'CIRNO-BAKA',
        user: mockUsers[0],
      }
      return response
    },
  },
])
