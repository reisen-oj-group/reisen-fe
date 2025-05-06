import { MockMethod } from 'vite-plugin-mock'

import { mockSubmissionsFull, mockSubmissionsLite } from '../data'
import {
  RecordDetailRequest,
  RecordDetailResponse,
  RecordListRequest,
  RecordListResponse,
} from '../interface'

export default [
  {
    url: '/api/record-list',
    method: 'post',
    timeout: 1000,
    response: (request: RecordListRequest) => {
      const response: RecordListResponse = {
        records: mockSubmissionsLite,
        total: 1000,
      }
      return response
    },
  },
  {
    url: '/api/record-detail',
    method: 'post',
    timeout: 1000,
    response: (request: RecordDetailRequest) => {
      const response: RecordDetailResponse = {
        record: mockSubmissionsFull[0],
      }
      return response
    },
  },
] as MockMethod[]
