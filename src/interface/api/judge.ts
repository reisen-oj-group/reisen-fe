import type {
  CodeLangId,
  ContestId,
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
  user?: string
  problem?: ProblemId
  lang?: CodeLangId
  verdict?: VerdictId
}

export type RecordFilterQuery = RecordFilterParams & {
  page?: number
}

export interface RecordDetailRequest {
  id: SubmissionId
}

export interface RecordDetailResponse {
  record: SubmissionFull
}

export interface JudgeRequest {
  problem: ProblemId
  contest?: ContestId
  lang: CodeLangId
  code: string
}

export interface JudgeResponse {
  record: SubmissionId
}
