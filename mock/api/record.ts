import { defineFakeRoute } from 'vite-plugin-fake-server/client'

import { mockSubmissionsFull, mockSubmissionsLite } from '../data'
import type {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordListRequest,
  RecordListResponse,
} from '../interface'

export default defineFakeRoute([
  {
    url: '/api/record/list',
    method: 'post',
    timeout: 1000,
    response: (_request: { body: Partial<RecordListRequest> }) => {
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
    response: (_request: { body: Partial<RecordDetailRequest> }) => {
      const response: RecordDetailResponse = {
        record: mockSubmissionsFull[0],
      }
      return response
    },
  },
])
