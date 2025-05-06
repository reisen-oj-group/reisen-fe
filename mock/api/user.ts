import type { MockMethod } from 'vite-plugin-mock'

import { mockUsers } from '../data'
import { UserRequest, UserResponse } from '../interface'

export default [
  {
    url: '/api/user',
    method: 'post',
    response: (request: { body: UserRequest }) => {
      const response: UserResponse = {
        user: mockUsers[0]
      }
      return response
    },
  },
] as MockMethod[]
