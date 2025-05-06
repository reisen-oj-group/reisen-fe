import type { ProblemId, ProblemVerdict, Statement, StatementId, TagId } from '../entity'

export interface ProblemListRequest {
  page: number
  filter: ProblemFilterForm
}

export interface ProblemListResponse {
  total: number
  problems: ProblemVerdict[]
}

export interface ProblemFilterForm {
  minDifficulty: number
  maxDifficulty: number
  tags: TagId[]
  keywords: string
}

export interface ProblemRequest {
  problem: ProblemId
}

export interface ProblemResponse {
  problem: ProblemVerdict
}

export interface StatementRequest {
  statement: StatementId
}

export interface StatementResponse {
  statement: Statement
}
