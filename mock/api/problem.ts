import type { MockMethod } from 'vite-plugin-mock'

import { mockProblemsVerdict, mockStatements } from '../data'
import type {
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  ProblemSolvedRequest,
  ProblemSolvedResponse,
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
    url: '/api/problem/solved',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ProblemSolvedRequest }) => {
      const response: ProblemSolvedResponse = {
        problems: mockProblemsVerdict,
      }
      return response
    },
  },
  {
    url: '/api/problem',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ProblemRequest }) => {
      if(request.body.problem === 'P1001'){
        const response: ProblemResponse = {
          problem: mockProblemsVerdict[0],
        }
        return response
      } else 
      if(request.body.problem === 'P1002'){
        const response: ProblemResponse = {
          problem: mockProblemsVerdict[1],
        }
        return response
      } else 
      if(request.body.problem === 'P1003'){
        const response: ProblemResponse = {
          problem: mockProblemsVerdict[2],
        }
        return response
      } else {
        const response: ProblemResponse = {
          problem: mockProblemsVerdict[3],
        }
        return response
      }
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
