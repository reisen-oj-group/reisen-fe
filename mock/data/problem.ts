import type { Problem, ProblemCore, Statement } from '../interface'
import { sample } from 'lodash-es'

export const mockStatements: Statement[] = [
  {
    id: 1,
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

export const mockProblemsCore: ProblemCore[] = [
  {
    id: 'P1001',
    type: 'traditional',
    status: 'public',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    title: {
      'en-US': 'Super Mario',
    },
    countCorrect: 10,
    countTotal: 100,
    difficulty: 800,
  },
  {
    id: 'P1002',
    type: 'traditional',
    status: 'public',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    title: {
      'en-US': 'A + B Problem',
    },
    countCorrect: 20,
    countTotal: 100,
    difficulty: 1200,
  },
  {
    id: 'P1003',
    type: 'traditional',
    status: 'public',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    title: {
      'en-US': 'A - B Problem',
    },
    countCorrect: 30,
    countTotal: 100,
    difficulty: 1600,
  },
  {
    id: 'P1004',
    type: 'traditional',
    status: 'public',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    title: {
      'en-US': 'A * B Problem',
    },
    countCorrect: 50,
    countTotal: 100,
    difficulty: 2400,
  },
  {
    id: 'P1005',
    type: 'traditional',
    status: 'public',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    title: {
      'en-US': 'A / B Problem',
    },
    countCorrect: 90,
    countTotal: 100,
    difficulty: 3000,
  },
]

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
