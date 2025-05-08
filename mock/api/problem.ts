import type { MockMethod } from 'vite-plugin-mock'

import { mockProblems, mockProblemsCore, mockResults } from '../data'
import type {
  ProblemCore,
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  Result,
} from '../interface'
import { sample, slice } from 'lodash-es'

export default [
  {
    url: '/api/problem/list',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ProblemListRequest }) => {
      const start = ((request.body.page || 1) - 1) * 50
      const response: ProblemListResponse = {
        problems: slice(mockProblemsCore, start, start + 50),
        results: Array(50)
          .fill(0)
          .map(() => sample(mockResults)!),
        total: mockProblemsCore.length,
      }
      return response
    },
  },
  {
    url: '/api/problem',
    method: 'post',
    timeout: 1000,
    response: (_request: { body: ProblemRequest }) => {
      const response: ProblemResponse = {
        problem: sample(mockProblems)!,
        result: sample(mockResults)!,
      }
      return response
    },
  },
] as MockMethod[]
