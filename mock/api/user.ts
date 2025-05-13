import { defineFakeRoute } from 'vite-plugin-fake-server/client'

import { mockUsers } from '../data'
import { UserRequest, UserResponse } from '../interface'

export default defineFakeRoute([
  {
    url: '/api/user',
    method: 'post',
    response: (_request: { body: Partial<UserRequest> }) => {
      const response: UserResponse = {
        user: mockUsers[0],
      }
      return response
    },
  },
])
