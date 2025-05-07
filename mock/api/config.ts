import type { MockMethod } from 'vite-plugin-mock'

import {
  configVerdicts,
  configTags,
  configDifficulties,
  configUserLangs,
  configCodeLangs,
} from '../data'
import type { SyncConfigResponse } from '../interface'

export default [
  {
    url: '/api/sync-config',
    method: 'get',
    response: () => {
      const response: SyncConfigResponse = {
        difficulties: configDifficulties,
        userLangs: configUserLangs,
        codeLangs: configCodeLangs,
        tags: configTags,
        verdicts: configVerdicts,
      }
      return response
    },
  },
] as MockMethod[]
