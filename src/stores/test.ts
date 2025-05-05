import { ref } from 'vue'
import { defineStore } from 'pinia'

import type {
  Lang,
  Problem,
  Statement,
  Submission,
  SubmissionDetail,
  SubmissionFull,
  SubmissionId,
  Testcase,
  User,
  Verdict,
} from '@/interface'

export const useTest = defineStore('testdata', () => {
  const dataUsers: User[] = [
    {
      id: 1,
      name: '琪露诺',
      role: 0,
      avatar: 'https://example.com/avatar1.jpg',
      register: new Date('2023-07-20T10:30:00'),
    },
    { id: 2, name: '魔理沙', role: 1, register: new Date('2023-07-20T10:30:00') },
    {
      id: 3,
      name: '大妖精',
      role: 0,
      avatar: 'https://example.com/avatar3.jpg',
      register: new Date('2023-07-20T10:30:00'),
    },
  ]

  const dataLangs: Record<string, Lang> = {
    cpp: { id: 'cpp', description: 'C++17 (GCC 9)', ratio: 1 },
    java: { id: 'java', description: 'Java 11', ratio: 2 },
    python: { id: 'python', description: 'Python 3.8', ratio: 3 },
  }

  const dataVerdicts: Record<string, Verdict> = {
    AC: { id: 'AC', description: 'Accepted', abbr: 'AC', color: '#67C23A' },
    WA: { id: 'WA', description: 'Wrong Answer', abbr: 'WA', color: '#F56C6C' },
    RE: { id: 'RE', description: 'Runtime Error', abbr: 'RE', color: '#6A3BC0' },
    TLE: { id: 'TLE', description: 'Time Limit Exceeded', abbr: 'TLE', color: '#E6A23C' },
    MLE: { id: 'MLE', description: 'Memory Limit Exceeded', abbr: 'MLE', color: '#E6A23C' },
    CE: { id: 'CE', description: 'Compile Error', abbr: 'CE', color: '#909399' },
    UKE: { id: 'UKE', description: 'Unknown Error', abbr: 'UKE', color: '#909399' },
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

  const dataSubmissions: Submission[] = [
    {
      id: 1,
      submission: new Date('2023-07-20T10:30:00'),
      evaluation: new Date('2023-07-20T10:30:05'),
      user: 1,
      problem: 'P1001',
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
      problem: 'P1002',
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
      problem: 'P1003',
      time: 85,
      memory: 5120,
      length: 180,
      verdict: 'WA',
      lang: 'python',
    },
  ]

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

  // 生成测试点数据
  const generateTestcases = (count: number, verdict: string): Testcase[] => {
    return Array.from({ length: count }, (_, i) => ({
      verdict,
      time: Math.floor(Math.random() * 100) + 10,
      memory: Math.floor(Math.random() * 1024) + 128,
      score: verdict === 'AC' ? 100 : 0,
      input: `Sample input for test case ${i + 1}\n${'a'.repeat(200)}`,
      output: `Sample output for test case ${i + 1}\n${'b'.repeat(200)}`,
      checker:
        verdict === 'AC'
          ? 'Check passed: Output matches expected result'
          : 'Check failed: Output differs on line 3',
    }))
  }

  // 生成 SubmissionDetail 测试数据
  const dataSubmissionsDetail: SubmissionDetail[] = [
    // AC 通过的提交
    {
      ...dataSubmissions[0],
      code: `#include <iostream>
using namespace std;

int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}`,
      compile: {
        success: true,
        message: 'g++ -std=c++17 -O2 -Wall -Wextra -Werror\nCompilation finished successfully',
      },
      detail: [...generateTestcases(5, 'AC'), ...generateTestcases(2, 'WA')],
    },
    {
      ...dataSubmissions[1],
      code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World)
  }
}`,
      compile: {
        success: false,
        message: `Main.java:3: error: unclosed string literal
    System.out.println("Hello World)
                        ^
Main.java:3: error: ';' expected
    System.out.println("Hello World)
                                      ^
2 errors`,
      },
      detail: [],
    },
    {
      ...dataSubmissions[2],
      code: `n = int(input())
for i in range(n):
    a, b = map(int, input().split())
    print(a * b)  # 错误：应该是 a + b`,
      compile: {
        success: true,
        message: 'Python 3.8 interpreter\nCompilation finished successfully',
      },
      detail: [...generateTestcases(3, 'AC'), ...generateTestcases(4, 'WA')],
    },
    {
      ...dataSubmissions[0],
      code: `#include <iostream>
using namespace std;

int main() {
  int a, b;
  cin >> a >> b;
  cout << a / b << endl;  // 除零错误
  return 0;
}`,
      compile: {
        success: true,
        message: 'g++ -std=c++17 -O2 -Wall -Wextra -Werror\nCompilation finished successfully',
      },
      detail: [
        {
          verdict: 'RE',
          time: 10,
          memory: 1024,
          score: 0,
          input: '5 0',
          output: '',
          checker: 'Runtime error: division by zero',
        },
        ...generateTestcases(6, 'RE'),
      ],
    },
  ]

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
    dataSubmissionsDetail,
    dataUsers,
    generateMany,
  }
})
