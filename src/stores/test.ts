import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Problem, Statement, User } from '@/interface'

export const useTest = defineStore('testdata', () => {
  const dataStatements: Statement[] = [
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

  const dataProblems: Problem[] = [
    {
      id: 1001,
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
      difficulty: 0,
    },
    {
      id: 1002,
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
      difficulty: 0,
    },
    {
      id: 1003,
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
      countCorrect: 20,
      countTotal: 100,
      difficulty: 0,
    },
    {
      id: 1004,
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
      countCorrect: 20,
      countTotal: 100,
      difficulty: 0,
    },
    {
      id: 1005,
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
      countCorrect: 20,
      countTotal: 100,
      difficulty: 0,
    },
  ]

  const dataProblemsMany = (() => {
    const extra: Problem[] = []
    for (let id = 2000; id < 3000; ++id) {
      extra.push({
        id: id,
        type: 'traditional',
        limitTime: 1000,
        limitMemory: 1024,
        tags: [],
        permission: 0,
        i18n: {
          'en-US': {
            title: 'Random Problem',
            statement: 1,
          },
        },
        countCorrect: 50,
        countTotal: 100,
        difficulty: 0,
      })
    }
    return extra
  })()

  return { dataStatements, dataProblems, dataProblemsMany }
})
