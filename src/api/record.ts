import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordListRequest,
  RecordListResponse,
} from '@/interface'

import { apiFetchDefault } from '@/utils/ofetch'

export const apiRecordList = async (request: RecordListRequest) => {
  return apiFetchDefault<RecordListResponse>('/record/list', {
    method: 'POST',
    body: request,
  })
}

export const apiRecordDetail = async (request: RecordDetailRequest) => {
  return apiFetchDefault<RecordDetailResponse>('/record', {
    method: 'POST',
    body: request,
  })
}
