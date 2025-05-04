import type { LangId, ProblemId, SubmissionId, UserId, VerdictId } from './enum'
import type { Problem } from './problem'
import type { User } from './user'

// ConfigLang 和 ConfigVerdict 都存放在 useConfig 下

export interface Lang {
  id: LangId
  description: string // 语言描述，例如 C++11 (GCC9)
  ratio: number // 时限比率，用于给更慢的时间开大空间
}

export interface Verdict {
  id: VerdictId
  description: string // 描述，例如 Wrong Answer
  abbr: string // 缩写，例如 WA
  color: string
}

// 测试点的简化结果，用于在记录列表展示
export interface Submission {
  id: SubmissionId

  user: UserId // 关联用户
  problem: ProblemId // 关联试题

  submission: Date // 提交时间
  evaluation: Date // 评测时间
  lang: LangId // 评测语言

  verdict: VerdictId // 评测结果
  time: number // 评测用时
  memory: number // 占用空间
  length: number // 代码长度
}

// 和 User 以及 Problem 表连接后的结果
export interface SubmissionFull extends Omit<Submission, 'problem' | 'user'> {
  problem: Problem
  user: User
}

// 测试点的详细结果，用于在记录详情页展示
export interface SubmissionDetail extends Submission {
  code: string;
  compile?: {
    success: boolean;
    message: string;
  };
  detail: Testcase[];
}

export interface Testcase {
  verdict: VerdictId;
  time?: number;
  memory?: number;
  score?: number;
  input?: string;
  output?: string;
  checker?: string;
}