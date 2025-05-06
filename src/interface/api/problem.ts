import type { Problem, ProblemId, ProblemVerdict, Statement, StatementId, TagId, UserId } from '../entity'

export interface ProblemListRequest {
  page: number
  filter: ProblemFilterForm
}

export interface ProblemListResponse {
  total: number
  problems: ProblemVerdict[]
}

export interface ProblemFilterForm {
  minDifficulty?: number | undefined
  maxDifficulty?: number | undefined
  tags?: TagId[] | undefined
  keywords?: string | undefined
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

export interface ProblemSolvedRequest {
  problem: ProblemId
  user: UserId
}

export interface ProblemSolvedResponse {
  problems: Problem[]
}
