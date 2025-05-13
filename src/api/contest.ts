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
} from '@/interface'

import { apiFetchDefault } from '@/utils/ofetch'

const processContestDates = (contest: any) => {
  contest.createdAt = new Date(contest.createdAt)
  contest.updatedAt = new Date(contest.updatedAt)
  contest.startTime = new Date(contest.startTime)
  contest.endTime = new Date(contest.endTime)
  return contest
}

export const apiContestFinished = async (request: ContestFinishedRequest) => {
  const data = await apiFetchDefault<ContestFinishedResponse>('/contest/finished', {
    method: 'POST',
    body: request,
  })
  data.contests = data.contests.map(processContestDates)
  return data
}

export const apiContestRecent = async (request: ContestRecentRequest) => {
  const data = await apiFetchDefault<ContestRecentResponse>('/contest/recent', {
    method: 'POST',
    body: request,
  })
  data.running = data.running.map(processContestDates)
  data.pending = data.pending.map(processContestDates)
  return data
}

export const apiContest = async (request: ContestRequest) => {
  const data = await apiFetchDefault<ContestResponse>('/contest', {
    method: 'POST',
    body: request,
  })
  data.contest = processContestDates(data.contest)
  return data
}

export const apiRanking = async (request: RankingRequest) => {
  return apiFetchDefault<RankingResponse>('/contest/ranking', {
    method: 'POST',
    body: request,
  })
}

export const apiRanklist = async (request: RanklistRequest) => {
  return apiFetchDefault<RanklistResponse>('/contest/ranklist', {
    method: 'POST',
    body: request,
  })
}

export const apiContestProblems = async (request: ContestProblemsRequest) => {
  return apiFetchDefault<ContestProblemsResponse>('/contest/problemset', {
    method: 'POST',
    body: request,
  })
}
