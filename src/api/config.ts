import type { SyncConfigResponse } from '@/interface'
import type { ReisenAxiosConfig } from '@/tools/axios'
import axios from '@/tools/axios'

export const syncConfig = async () => {
  return (await axios.get<SyncConfigResponse>('/sync-config', {} as ReisenAxiosConfig)).data
}
