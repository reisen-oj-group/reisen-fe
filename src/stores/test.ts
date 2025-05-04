import { ref } from 'vue'
import { defineStore } from 'pinia'

import type {
  Lang,
  Problem,
  Statement,
  Submission,
  SubmissionFull,
  User,
  Verdict,
} from '@/interface'

export const useTest = defineStore('testdata', () => {
  const dataUsers: User[] = [
    { id: 1, name: '琪露诺', role: 0, avatar: 'https://example.com/avatar1.jpg' },
    { id: 2, name: '魔理沙', role: 1 },
    { id: 3, name: '大妖精', role: 0, avatar: 'https://example.com/avatar3.jpg' },
  ]

  const dataLangs: Record<string, Lang> = {
    cpp: { id: 'cpp', description: 'C++17 (GCC 9)', ratio: 1 },
    java: { id: 'java', description: 'Java 11', ratio: 2 },
    python: { id: 'python', description: 'Python 3.8', ratio: 3 },
  }

  const dataVerdicts: Record<string, Verdict> = {
    AC: { id: 'AC', description: 'Accepted', abbr: 'AC' },
    WA: { id: 'WA', description: 'Wrong Answer', abbr: 'WA' },
    TLE: { id: 'TLE', description: 'Time Limit Exceeded', abbr: 'TLE' },
    MLE: { id: 'MLE', description: 'Memory Limit Exceeded', abbr: 'MLE' },
    CE: { id: 'CE', description: 'Compile Error', abbr: 'CE' },
  }

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
      difficulty: 800,
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
      difficulty: 1200,
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
      countCorrect: 30,
      countTotal: 100,
      difficulty: 1600,
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
      countCorrect: 50,
      countTotal: 100,
      difficulty: 2400,
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
      countCorrect: 90,
      countTotal: 100,
      difficulty: 3000,
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

  const dataSubmissions: Submission[] = [
    {
      id: 1,
      submission: new Date('2023-07-20T10:30:00'),
      evaluation: new Date('2023-07-20T10:30:05'),
      user: 1,
      problem: 1001,
      time: 42,
      memory: 1024,
      length: 120,
      verdict: 'AC',
      lang: 'cpp',
    },
    {
      id: 2,
      submission: new Date('2023-07-20T11:15:00'),
      evaluation: new Date('2023-07-20T11:15:10'),
      user: 2,
      problem: 1002,
      time: 1500,
      memory: 256000,
      length: 250,
      verdict: 'TLE',
      lang: 'java',
    },
    {
      id: 3,
      submission: new Date('2023-07-20T12:45:00'),
      evaluation: new Date('2023-07-20T12:45:03'),
      user: 3,
      problem: 1003,
      time: 85,
      memory: 5120,
      length: 180,
      verdict: 'WA',
      lang: 'python',
    },
  ]

  // 生成 SubmissionFull 测试数据
  const dataSubmissionsFull: SubmissionFull[] = dataSubmissions.map((sub) => {
    const user = dataUsers.find((u) => u.id === sub.user)!
    const problem = dataProblems.find((p) => p.id === sub.problem)!
    const langInfo = dataLangs[sub.lang]
    const verdictInfo = dataVerdicts[sub.verdict]

    return {
      ...sub,
      user,
      problem,
      langInfo,
      verdictInfo,
    }
  })

  function generateMany(source: object[]) {
    const result: object[] = []
    for (let i = 0; i < 500; ++i) {
      result.push(source[Math.floor(Math.random() * source.length)])
    }
    return result
  }

  console.log(dataSubmissionsFull)

  return {
    dataLangs,
    dataVerdicts,
    dataProblems,
    dataStatements,
    dataSubmissions,
    dataSubmissionsFull,
    dataUsers,
    generateMany,
  }
})
