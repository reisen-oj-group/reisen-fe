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
import type { ReisenAxiosConfig } from '@/tools/axios'
import axios from '@/tools/axios'

export const apiContestFinished = async (request: ContestFinishedRequest) => {
  const data = (
    await axios.post<ContestFinishedResponse>('/contest/finished', request, {} as ReisenAxiosConfig)
  ).data
  for (const contest of data.contests) {
    contest.createdAt = new Date(contest.createdAt)
    contest.updatedAt = new Date(contest.updatedAt)
    contest.startTime = new Date(contest.startTime)
    contest.endTime = new Date(contest.endTime)
  }
  return data
}
export const apiContestRecent = async (request: ContestRecentRequest) => {
  const data = (
    await axios.post<ContestRecentResponse>('/contest/recent', request, {} as ReisenAxiosConfig)
  ).data
  for (const contest of data.running) {
    contest.createdAt = new Date(contest.createdAt)
    contest.updatedAt = new Date(contest.updatedAt)
    contest.startTime = new Date(contest.startTime)
    contest.endTime = new Date(contest.endTime)
  }
  for (const contest of data.pending) {
    contest.createdAt = new Date(contest.createdAt)
    contest.updatedAt = new Date(contest.updatedAt)
    contest.startTime = new Date(contest.startTime)
    contest.endTime = new Date(contest.endTime)
  }
  return data
}

export const apiContest = async (request: ContestRequest) => {
  const data = (await axios.post<ContestResponse>('/contest', request, {} as ReisenAxiosConfig))
    .data
  const contest = data.contest

  contest.createdAt = new Date(contest.createdAt)
  contest.updatedAt = new Date(contest.updatedAt)
  contest.startTime = new Date(contest.startTime)
  contest.endTime = new Date(contest.endTime)

  return data
}

export const apiRanking = async (request: RankingRequest) => {
  return (await axios.post<RankingResponse>('/contest/ranking', request, {} as ReisenAxiosConfig))
    .data
}

export const apiRanklist = async (request: RanklistRequest) => {
  return (await axios.post<RanklistResponse>('/contest/ranklist', request, {} as ReisenAxiosConfig))
    .data
}

export const apiContestProblems = async (request: ContestProblemsRequest) => {
  return (
    await axios.post<ContestProblemsResponse>(
      '/contest/problemset',
      request,
      {} as ReisenAxiosConfig,
    )
  ).data
}
