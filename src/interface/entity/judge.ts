import type { ContestId, LangId, ProblemId, SubmissionId, UserId, VerdictId } from './enum'
import type { Problem } from './problem'
import type { User } from './user'

// ConfigLang 和 ConfigVerdict 都存放在 useConfig 下

export interface Lang {
  id: LangId
  description: string // 语言描述，例如 C++11 (GCC9)
  ratio: number // 时限比率，用于给更慢的时间开大空间
}

export type Judge = 'correct' | 'incorrect' | number;

export interface Verdict {
  id: VerdictId
  description: string // 描述，例如 Wrong Answer
  abbr: string // 缩写，例如 WA
  color: string
}

export interface Testcase {
  verdict: VerdictId
  time?: number
  memory?: number
  score?: number
  input?: string
  output?: string
  checker?: string
}

// 测试点的子集
export interface SubmissionCore {
  id: SubmissionId

  user: UserId
  problem: ProblemId // 关联试题
  contest?: ContestId // 关联比赛

  submission: Date // 提交时间
  evaluation: Date // 评测时间
  lang: LangId // 评测语言

  verdict: VerdictId // 评测结果
  score: number // 得分，主要用于部分分
  time: number // 评测用时
  memory: number // 占用空间
  length: number // 代码长度
}

export interface Result {
  
}

// 测试点，数据库里实际存储的表元素
export interface Submission extends SubmissionCore {
  code: string
  compile?: {
    success: boolean
    message: string
  }
  detail: Testcase[]
}

// 用于在评测列表展示的轻量查询结果
export interface SubmissionLite extends Omit<SubmissionCore, 'problem' | 'user'> {
  problem: Problem
  user: User
}

// 用于在评测详情展示的完整查询结果
export interface SubmissionFull extends Omit<Submission, 'problem' | 'user'> {
  problem: Problem
  user: User
}
