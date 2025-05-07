import type { Problem, ProblemCore, ProblemId, Result, TagId, UserId } from '../entity'

export interface ProblemListRequest {
  page: number
  filter: ProblemFilterForm
}

export interface ProblemListResponse {
  total: number
  problems: {
    problem: ProblemCore
    result: Result
  }[]
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
  problem: Problem
  result?: Result
}

export interface ProblemSolvedRequest {
  problem: ProblemId
  user: UserId
}

export interface ProblemSolvedResponse {
  problems: Problem[]
}
