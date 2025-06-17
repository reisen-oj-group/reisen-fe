import type {
  SubmissionDetailRequest,
  SubmissionDetailResponse,
  SubmissionListRequest,
  SubmissionListResponse,
} from '@/interface'

import { apiFetchDefault } from '@/utils/ofetch'

export const apiSubmissionList = async (request: SubmissionListRequest) => {
  const response = await apiFetchDefault<SubmissionListResponse>('/submission/list', {
    method: 'POST',
    body: request,
  })
  for (const submission of response.submissions) {
    submission.submittedAt = new Date(submission.submittedAt)
    submission.processedAt = new Date(submission.processedAt)
  }
  return response
}

export const apiSubmissionAll = apiSubmissionList;

export const apiSubmissionDetail = async (request: SubmissionDetailRequest) => {
  const response = await apiFetchDefault<SubmissionDetailResponse>('/submission', {
    method: 'POST',
    body: request,
  })
  const submission = response.submission
  submission.submittedAt = new Date(submission.submittedAt)
  submission.processedAt = new Date(submission.processedAt)
  return response
}
