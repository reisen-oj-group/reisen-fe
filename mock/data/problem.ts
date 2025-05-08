import type { Problem, ProblemCore, Statement } from '../interface'
import { floor, random, sample } from 'lodash-es'

export const mockStatements: Statement[] = [
  {
    examples: [
      {
        dataI: '我是输入',
        dataO: '我是输入',
      },
    ],

    background: '我是题目背景',
    legend: '我是题目描述',
    formatI: '我是输入格式',
    formatO: '我是输出格式',
    hint: '我是提示',
  },
]

export const mockProblemsCore: ProblemCore[] = (() => {
  const list: ProblemCore[] = []
  for (let i = 0; i < 100; ++i) {
    const count = random(1, 10000)
    const problem: ProblemCore = {
      id: `P${1000 + i}`,
      type: sample(['traditional', 'interactive'])!,
      status: sample(['public', 'private', 'contest'])!,
      limitTime: sample([1000, 2000, 3000])!,
      limitMemory: sample([512288, 1024576, 262144])!,
      tags: [],
      title: {
        'en-US': `Mock Problem #${i}`,
        'zh-CN': `虚假之月 #${i}`,
      },
      countCorrect: floor(count * random(0, 1, true)),
      countTotal: count,
      difficulty: random(8, 35) * 100,
    }
    list.push(problem)
  }
  return list
})()

export const mockProblems: Problem[] = (() => {
  const list: Problem[] = []
  for (let i = 0; i < 200; ++i) {
    const problem = sample(mockProblemsCore) || mockProblemsCore[0]

    list.push({
      ...problem,
      statements: {
        'en-US': mockStatements[0],
      },
    })
  }
  return list
})()
