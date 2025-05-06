import type { MockMethod } from 'vite-plugin-mock'

import { mockProblemsVerdict, mockStatements } from '../data'
import type {
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  StatementRequest,
  StatementResponse,
} from '../interface'

export default [
  {
    url: '/api/problem/list',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ProblemListRequest }) => {
      const response: ProblemListResponse = {
        problems: mockProblemsVerdict,
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
      const response: ProblemResponse = {
        problem: mockProblemsVerdict[0],
      }
      return response
    },
  },
  {
    url: '/api/problem/statement',
    method: 'post',
    timeout: 1000,
    response: (request: { body: StatementRequest }) => {
      const response: StatementResponse = {
        statement: mockStatements[0],
      }
      return response
    },
  },
] as MockMethod[]
