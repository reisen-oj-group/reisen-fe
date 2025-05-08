import type { ContestId, ProblemId, ProblemLabel, UserId } from './enum'
import type { Result } from './judge'

export type ContestDifficulty = 1 | 2 | 3 | 4 | 5
export type ContestStatus = 'private' | 'public' | 'deleted'
export type ContestRule = 'OI' | 'ACM' | 'IOI'

// 表：比赛基本信息
export interface Contest {
  id: ContestId
  title: string
  banner?: string // 头图 URL
  summary: string // 简介
  description: string // 详情
  difficulty: ContestDifficulty // 难度星级
  status: ContestStatus
  startTime: Date
  endTime: Date
  rule: ContestRule
  problems: Record<ProblemLabel, ProblemId>
  createdAt: Date
  updatedAt: Date
}

// 表：比赛排名信息，比赛时动态维护
export interface Ranking {
  contest: ContestId
  user: UserId

  rank: number
  results: Result[]
}

// 表：比赛报名信息
export interface Registration {
  contest: ContestId
  user: UserId
  register: Date
}
