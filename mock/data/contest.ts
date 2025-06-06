import { random, sample } from 'lodash-es'
import type { Contest, Ranking, Registration, Result } from '../interface'
import { mockResults } from './judge'
import { mockUsers } from './user'

// 比赛测试数据
export const mockContests: Contest[] = [
  {
    id: 1,
    title: '2023年春季编程大赛我是一个名字很长很长很长很长很长很长很长很长很长很长很长很长很的比赛',
    banner: 'https://example.com/contest1-banner.jpg',
    summary: '年度大型编程竞赛，涵盖算法与数据结构',
    description: `# 2023年春季编程大赛\n\n## 比赛规则\n\n- 采用ICPC赛制\n- 5道题目，难度递增\n- 排名按解题数，同解题数按罚时\n\n## 奖励\n\n- 第一名：奖金5000元\n- 第二名：奖金3000元\n- 第三名：奖金1000元`,
    difficulty: 4,
    status: 'public',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 已开始 2 小时
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 持续 5 小时
    rule: 'OI',
    problems: {
      A: 'P1001',
      B: 'P1002',
      C: 'P1003',
      D1: 'P1004',
      D2: 'P1005',
      E: 'P1006',
      F: 'P1007',
      G: 'P1008',
      H: 'P1009',
      I: 'P1010',
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: 2,
    title: '算法入门挑战赛',
    banner: 'https://example.com/contest2-banner.jpg',
    summary: '适合初学者的算法竞赛',
    description: `# 算法入门挑战赛\n\n适合刚接触算法竞赛的选手参加`,
    difficulty: 2,
    status: 'public',
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前开始
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 已结束
    rule: 'ACM',
    problems: {
      A: 'P1001',
      B: 'P1004',
    },
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
  },
  {
    id: 3,
    title: 'ACM校队选拔赛',
    banner: 'https://example.com/contest3-banner.jpg',
    summary: '校ACM队选拔专用比赛',
    description: '仅限校内学生参加',
    difficulty: 5,
    status: 'private',
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 天后开始
    endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 持续 1 天
    rule: 'IOI',
    problems: {
      A: 'P1001',
      B1: 'P1002',
      B2: 'P1004',
    },
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-01'),
  },
]

// 比赛报名数据
export const mockRegistrations: Registration[] = [
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

// 比赛排名数据
export const mockRankings: Ranking[] = [
  {
    rank: 1,
    contest: 2,
    user: 1,
    results: mockResults,
  },
  {
    rank: 1,
    contest: 2,
    user: 2,
    results: mockResults,
  },
]

export function generateResult() {
  const result: Result = {
    problem: `P${random(1001, 1010)}`,
    contest: 1,
    user: random(1, mockUsers.length),
    judge: sample(['correct', 'incorrect', random(1, 100)]) || 0,
    attempt: random(1, 10),
    penalty: random(1, 300),
    time: 0,
  }
  return result
}

export function generateRanklist() {
  const ranklist: Ranking[] = []
  for (let i = 0; i < 200; ++i) {
    const item: Ranking = {
      contest: 1,
      user: random(1, mockUsers.length),
      rank: i + 1,
      results: [],
    }
    for (let j = random(1, 5); j >= 0; --j) {
      item.results.push(generateResult())
    }
    ranklist.push(item)
  }
  return ranklist
}
