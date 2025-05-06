import type {
  LangId,
  ProblemId,
  SubmissionFull,
  SubmissionId,
  SubmissionLite,
  UserId,
  VerdictId,
} from '../entity'

export interface RecordListRequest {
  page: number
  filter: RecordFilterForm
}

export interface RecordListResponse {
  total: number
  records: SubmissionLite[]
}

export interface RecordFilterForm {
  user: null | string | UserId
  problem: null | ProblemId
  lang: LangId
  verdict: VerdictId
}

export interface RecordDetailRequest {
  id: SubmissionId
}

export interface RecordDetailResponse {
  record: SubmissionFull
}
