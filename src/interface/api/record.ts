import type {
  CodeLangId,
  ProblemId,
  SubmissionFull,
  SubmissionId,
  SubmissionLite,
  UserId,
  VerdictId,
} from '../entity'

export type RecordListRequest = RecordFilterQuery

export interface RecordListResponse {
  total: number
  records: SubmissionLite[]
}

export interface RecordFilterParams {
  user?: string | UserId
  problem?: ProblemId
  lang?: CodeLangId
  verdict?: VerdictId
}

export type RecordFilterQuery = RecordFilterParams & {
  page: number
}

export interface RecordDetailRequest {
  id: SubmissionId
}

export interface RecordDetailResponse {
  record: SubmissionFull
}
