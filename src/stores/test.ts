import { ref } from 'vue'
import { defineStore } from 'pinia'

import type {
  Contest,
  Lang,
  Problem,
  Ranking,
  Registration,
  Statement,
  SubmissionCore,
  Submission,
  SubmissionLite,
  SubmissionId,
  Testcase,
  User,
  Verdict,
} from '@/interface'

export const useTest = defineStore('testdata', () => {
  // 比赛报名数据
  const dataRegistrations: Registration[] = [
    {
      contest: 1,
      user: 1,
      register: new Date('2023-02-09'),
    },
    {
      contest: 2,
      user: 2,
      register: new Date('2023-02-09'),
    },
  ]

  function generateMany(source: object[]) {
    const result: object[] = []
    for (let i = 0; i < 500; ++i) {
      result.push(source[Math.floor(Math.random() * source.length)])
    }
    return result
  }

  return {
    dataRegistrations,
    generateMany,
  }
})
