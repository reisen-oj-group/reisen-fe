import type { Problem, ProblemVerdict, Statement } from '../interface'

import { random, sample } from 'lodash-es'

export const mockStatements: Statement[] = [
  {
    id: 1,
    language: 'en-US',
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

export const mockProblems: Problem[] = [
  {
    id: 'P1001',
    type: 'traditional',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    permission: 0,
    i18n: {
      'en-US': {
        title: 'Super Mario',
        statement: 1,
      },
    },
    countCorrect: 10,
    countTotal: 100,
    difficulty: 800,
  },
  {
    id: 'P1002',
    type: 'traditional',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    permission: 0,
    i18n: {
      'en-US': {
        title: 'A + B Problem',
        statement: 1,
      },
    },
    countCorrect: 20,
    countTotal: 100,
    difficulty: 1200,
  },
  {
    id: 'P1003',
    type: 'traditional',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    permission: 0,
    i18n: {
      'en-US': {
        title: 'A - B Problem',
        statement: 1,
      },
    },
    countCorrect: 30,
    countTotal: 100,
    difficulty: 1600,
  },
  {
    id: 'P1004',
    type: 'traditional',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    permission: 0,
    i18n: {
      'en-US': {
        title: 'A * B Problem',
        statement: 1,
      },
    },
    countCorrect: 50,
    countTotal: 100,
    difficulty: 2400,
  },
  {
    id: 'P1005',
    type: 'traditional',
    limitTime: 1000,
    limitMemory: 1024,
    tags: [],
    permission: 0,
    i18n: {
      'en-US': {
        title: 'A / B Problem',
        statement: 1,
      },
    },
    countCorrect: 90,
    countTotal: 100,
    difficulty: 3000,
  },
]

export const mockProblemsVerdict: ProblemVerdict[] = (() => {
  const list: ProblemVerdict[] = []
  for (let i = 0; i < 200; ++i) {
    const problem = sample(mockProblems) || mockProblems[0]
    let verdict: 'correct' | 'incorrect' | number | null = null

    // verdict = i;
    switch (random(1, 4)) {
      case 0:
        verdict = 'correct'
        break
      case 1:
        verdict = 'incorrect'
        break
      case 2:
        verdict = Math.floor(Math.random() * 100)
        break
      case 3:
        verdict = null
        break
    }
    list.push({
      ...problem,
      verdict: verdict,
    })
  }
  return list
})()
