import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordListRequest,
  RecordListResponse,
} from '@/interface'

import { apiFetchDefault } from '@/utils/ofetch'

export const apiRecordList = async (request: RecordListRequest) => {
  const response = await apiFetchDefault<RecordListResponse>('/record/list', {
    method: 'POST',
    body: request,
  })
  for (const record of response.records) {
    record.submission = new Date(record.submission)
    record.evaluation = new Date(record.evaluation)
  }
  return response
}

export const apiRecordDetail = async (request: RecordDetailRequest) => {
  const response = await apiFetchDefault<RecordDetailResponse>('/record', {
    method: 'POST',
    body: request,
  })
  const record = response.record
  record.submission = new Date(record.submission)
  record.evaluation = new Date(record.evaluation)
  return response
}
