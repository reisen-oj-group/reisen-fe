import type { ContestId, ProblemId, SubmissionId, UserId } from './enum'

// 比赛赛制类型
export type ContestRule = 'OI' | 'ACM' | 'IOI'

// 比赛状态
export type ContestStatus = 'private' | 'public' | 'deleted'

// 比赛基本信息
export interface Contest {
  id: ContestId
  title: string
  banner: string // 头图 URL
  summary: string // 简介
  description: string // 详情
  difficulty: 1 | 2 | 3 | 4 | 5 // 难度星级
  status: ContestStatus
  startTime: Date
  endTime: Date
  rule: ContestRule
  problems: ProblemId[] // 比赛题目列表
  createdAt: Date
  updatedAt: Date
}

// 比赛排名信息
export interface Ranking {
  contest: ContestId
  user: UserId
  submissions: SubmissionId[] // 比赛中的提交
  totalScore: number // 总得分
  totalTime: number // 总用时
  solvedCount: number // 解决题目数
}

// 比赛报名信息
export interface Registration {
  contest: ContestId
  user: UserId
  register: Date
}
