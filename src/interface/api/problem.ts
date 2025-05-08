import type { Problem, ProblemCore, ProblemId, Result, TagId, UserId } from '../entity'

export type ProblemListRequest = ProblemFilterQuery

export interface ProblemListResponse {
  total: number
  problems: ProblemCore[] // 返回简要信息
  results: Result[] // 返回相关的题目结果
}

export interface ProblemFilterParams {
  minDifficulty?: number
  maxDifficulty?: number
  tags?: TagId[]
  keywords?: string
}

export type ProblemFilterQuery = ProblemFilterParams & {
  page?: number
  user?: UserId
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
