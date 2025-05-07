import type { MockMethod } from 'vite-plugin-mock'

import type {
  ContestFinishedRequest,
  ContestFinishedResponse,
  ContestProblemsRequest,
  ContestProblemsResponse,
  ContestRecentRequest,
  ContestRecentResponse,
  ContestRequest,
  ContestResponse,
  RankingRequest,
  RankingResponse,
  RanklistRequest,
  RanklistResponse,
} from '../interface'
import { generateRanklist, mockContests, mockProblems, mockRankings } from '../data'

export default [
  {
    url: '/api/contest/finished',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ContestFinishedRequest }) => {
      const response: ContestFinishedResponse = {
        contests: [mockContests[2]],
        total: 1000,
      }
      return response
    },
  },
  {
    url: '/api/contest/recent',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ContestRecentRequest }) => {
      const response: ContestRecentResponse = {
        running: [mockContests[0]],
        pending: [mockContests[1]],
      }
      return response
    },
  },
  {
    url: '/api/contest/ranking',
    method: 'post',
    timeout: 1000,
    response: (request: { body: RankingRequest }) => {
      const response: RankingResponse = {
        ranking: mockRankings[0],
      }
      return response
    },
  },
  {
    url: '/api/contest/ranklist',
    method: 'post',
    timeout: 1000,
    response: (request: { body: RanklistRequest }) => {
      const response: RanklistResponse = {
        rankings: generateRanklist(),
      }
      return response
    },
  },
  {
    url: '/api/contest/problemset',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ContestProblemsRequest }) => {
      const response: ContestProblemsResponse = {
        problems: [mockProblems[0], mockProblems[1], mockProblems[2]],
      }
      return response
    },
  },
  {
    url: '/api/contest',
    method: 'post',
    timeout: 1000,
    response: (request: { body: ContestRequest }) => {
      const response: ContestResponse = {
        contest: mockContests[0],
      }
      return response
    },
  },
] as MockMethod[]
