import type { MockMethod } from 'vite-plugin-mock'

import { mockProblems, mockProblemsCore, mockResults, mockStatements } from '../data'
import type {
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  ProblemSolvedRequest,
  ProblemSolvedResponse,
} from '../interface'

export default [
  {
    url: '/api/problem/list',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ProblemListRequest }) => {
      const response: ProblemListResponse = {
        problems: [
          {
            problem: mockProblems[0],
            result: mockResults[0],
          },
          {
            problem: mockProblems[1],
            result: mockResults[1],
          },
          {
            problem: mockProblems[2],
            result: mockResults[2],
          },
        ],
        total: 1000,
      }
      return response
    },
  },
  {
    url: '/api/problem',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ProblemRequest }) => {
      console.log(request)
      if (request.body.problem === 'P1001') {
        const response: ProblemResponse = {
          problem: mockProblems[0],
        }
        return response
      } else if (request.body.problem === 'P1002') {
        const response: ProblemResponse = {
          problem: mockProblems[1],
        }
        return response
      } else if (request.body.problem === 'P1003') {
        const response: ProblemResponse = {
          problem: mockProblems[2],
        }
        return response
      } else {
        const response: ProblemResponse = {
          problem: mockProblems[3],
        }
        return response
      }
    },
  },
] as MockMethod[]
