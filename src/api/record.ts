import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordListRequest,
  RecordListResponse,
} from '@/interface'
import type { ReisenAxiosConfig } from '@/tools/axios'
import axios from '@/tools/axios'

export const apiRecordList = async (request: RecordListRequest) => {
  return (await axios.post<RecordListResponse>('/record-list', request, {} as ReisenAxiosConfig))
    .data
}

export const apiRecordDetail = async (request: RecordDetailRequest) => {
  return (
    await axios.post<RecordDetailResponse>('/record-detail', request, {} as ReisenAxiosConfig)
  ).data
}
