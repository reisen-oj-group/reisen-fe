import type { MockMethod } from 'vite-plugin-mock'

import { mockSubmissionsFull, mockSubmissionsLite } from '../data'
import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordListRequest,
  RecordListResponse,
} from '../interface'

export default [
  {
    url: '/api/record/list',
    method: 'post',
    timeout: 1000,
    response: (request: { body: RecordListRequest }) => {
      const response: RecordListResponse = {
        records: mockSubmissionsLite,
        total: 1000,
      }
      return response
    },
  },
  {
    url: '/api/record',
    method: 'post',
    timeout: 1000,
    response: (request: { body: RecordDetailRequest }) => {
      const response: RecordDetailResponse = {
        record: mockSubmissionsFull[0],
      }
      return response
    },
  },
] as MockMethod[]
