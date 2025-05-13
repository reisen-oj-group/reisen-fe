import { defineFakeRoute } from 'vite-plugin-fake-server/client'

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

export default defineFakeRoute([
  {
    url: '/api/contest/finished',
    method: 'post',
    timeout: 1000,
    response: (_request: { body: Partial<ContestFinishedRequest> }) => {
      const response: ContestFinishedResponse = {
        contests: [mockContests[1]],
        total: 1000,
      }
      return response
    },
  },
  {
    url: '/api/contest/recent',
    method: 'post',
    timeout: 1000,
    response: (_request: { body: Partial<ContestRecentRequest> }) => {
      const response: ContestRecentResponse = {
        running: [mockContests[0]],
        pending: [mockContests[2]],
      }
      return response
    },
  },
  {
    url: '/api/contest/ranking',
    method: 'post',
    timeout: 1000,
    response: (_request: { body: Partial<RankingRequest> }) => {
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
    response: (_request: { body: Partial<RanklistRequest> }) => {
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
    response: (_request: { body: Partial<ContestProblemsRequest> }) => {
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
    response: (_request: { body: Partial<ContestRequest> }) => {
      const response: ContestResponse = {
        contest: mockContests[0],
      }
      return response
    },
  },
])
