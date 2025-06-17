import type {
  Contest,
  ContestAllRequest,
  ContestAllResponse,
  ContestListRequest,
  ContestListResponse,
  ContestProblemsRequest,
  ContestProblemsResponse,
  ContestRequest,
  ContestResponse,
  RankingRequest,
  RankingResponse,
  RanklistRequest,
  RanklistResponse,
  SignoutRequest,
  SignoutResponse,
  SignupRequest,
  SignupResponse,
} from '@/interface'

import { apiFetchDefault, apiFetchSilent } from '@/utils/ofetch'

const processContestDates = (contest: Contest) => {
  contest.createdAt = new Date(contest.createdAt as unknown as number)
  contest.updatedAt = new Date(contest.updatedAt as unknown as number)
  contest.startTime = new Date(contest.startTime)
  contest.endTime = new Date(contest.endTime)
  return contest
}

export const apiContestList = async (request: ContestListRequest) => {
  const data = await apiFetchDefault<ContestListResponse>('/contest/list', {
    method: 'POST',
    body: request,
  })
  data.contests = data.contests.map(processContestDates)
  return data
}

export const apiContestAll = async (request: ContestAllRequest) => {
  const data = await apiFetchDefault<ContestAllResponse>('/contest/all', {
    method: 'POST',
    body: request,
  })
  data.contests = data.contests.map(processContestDates)
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

export const apiSignup = async (request: SignupRequest) => {
  const data = await apiFetchDefault<SignupResponse>('/contest/signup', {
    method: 'POST',
    body: request,
  })
  return data
}

export const apiSignout = async (request: SignoutRequest) => {
  const data = await apiFetchDefault<SignoutResponse>('/contest/signup', {
    method: 'POST',
    body: request,
  })
  return data
}

export const apiRanking = async (request: RankingRequest) => {
  return apiFetchSilent<RankingResponse>('/contest/ranking', {
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
