import type { ProblemId, StatementId, TagId } from './enum'

export interface Tag {
  id: TagId

  name: string
}

export interface Problem {
  id: ProblemId

  type: 'traditional' | 'interactive' // 传统题、交互题

  limitTime: number
  limitMemory: number

  countCorrect: number
  countTotal: number

  difficulty: number
  tags: TagId[]

  i18n: Record<
    string,
    {
      title: string // 该语言对应的题目名称
      statement: StatementId // 该语言对应的题面
    }
  >
  permission: number
}

export interface Statement {
  id: StatementId
  language: string

  background?: string // 题目背景
  legend?: string // 题目描述
  formatI?: string // 输入格式
  formatO?: string // 输出格式
  examples: {
    // 样例
    dataI?: string
    dataO?: string
  }[]
  hint?: string // 提示，含样例解释
}
