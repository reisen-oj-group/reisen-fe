import type { MockMethod } from 'vite-plugin-mock'

import { configVerdicts, configLangs, configTags, configDifficulties, mockUsers } from '../data'
import type { LoginRequest, LoginResponse, SyncConfigResponse } from '../interface'

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
