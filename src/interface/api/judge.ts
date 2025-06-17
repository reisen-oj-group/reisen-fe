import type {
  CodeLangId,
  ContestId,
  Judgement,
  ProblemId,
  Ranking,
  SubmissionFull,
  SubmissionId,
  SubmissionLite,
  UserId,
  VerdictId,
} from '../entity'

export type SubmissionListRequest = SubmissionFilterQuery

export interface SubmissionListResponse {
  total: number
  submissions: SubmissionLite[]
}

export interface SubmissionFilterParams {
  user?: string
  problem?: ProblemId
  lang?: CodeLangId
  verdict?: VerdictId
}

export type SubmissionFilterQuery = SubmissionFilterParams & {
  page?: number
}

export interface SubmissionDetailRequest {
  id: SubmissionId
}

export interface SubmissionDetailResponse {
  submission: SubmissionFull
}

export interface JudgeRequest {
  problem: ProblemId
  contest?: ContestId
  lang: CodeLangId
  code: string
}

export interface JudgeResponse {
  submission: SubmissionId
}

export interface PracticeRequest {
  user: UserId
}

export interface PracticeResponse {
  judgements: Judgement[]
  rankings: Ranking[]
}
