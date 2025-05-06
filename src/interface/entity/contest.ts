import type { ContestId, ProblemId, RankingId, SubmissionId, UserId, VerdictId } from './enum'
import type { Judge } from './judge'

export type ContestDifficulty = 1 | 2 | 3 | 4 | 5
export type ContestStatus = 'private' | 'public' | 'deleted'
export type ContestRule = 'OI' | 'ACM' | 'IOI'

// 比赛基本信息
export interface Contest {
  id: ContestId
  title: string
  banner: string // 头图 URL
  summary: string // 简介
  description: string // 详情
  difficulty: ContestDifficulty // 难度星级
  status: ContestStatus
  startTime: Date
  endTime: Date
  rule: ContestRule
  problems: Record<string, ProblemId>
  createdAt: Date
  updatedAt: Date
}

// 比赛排名信息
export interface Ranking {
  id: RankingId
  contest: ContestId
  user: UserId
  grades: Record<ProblemId, Grade> // 比赛中的提交
  totalScore: number // 总得分
  totalTime: number // 总用时
  solved: number // 解决题目数
}

export interface Grade {
  judge: Judge
  score: number
  time: number
}

// 比赛报名信息
export interface Registration {
  contest: ContestId
  user: UserId
  register: Date
}
