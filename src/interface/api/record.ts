import type {
  CodeLangId,
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
  user?: string | UserId | undefined
  problem?: ProblemId | undefined
  lang?: CodeLangId | undefined
  verdict?: VerdictId | undefined
}

export interface RecordDetailRequest {
  id: SubmissionId
}

export interface RecordDetailResponse {
  record: SubmissionFull
}
