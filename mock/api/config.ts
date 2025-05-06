import { MockMethod } from 'vite-plugin-mock'

import { configVerdicts, configLangs, configTags, configDifficulties } from '../data'
import { SyncConfigResponse } from '../interface'

export default [
  {
    url: '/api/sync-config',
    method: 'get',
    response: () => {
      const response: SyncConfigResponse = {
        difficulties: configDifficulties,
        langs: configLangs,
        tags: configTags,
        verdicts: configVerdicts,
      }
      return response
    },
  },
] as MockMethod[]
