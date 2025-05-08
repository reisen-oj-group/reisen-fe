import type {
  Contest,
  ContestDifficulty,
  ContestId,
  ContestRule,
  ProblemCore,
  Ranking,
  UserId,
} from '../entity'

export interface ContestFinishedRequest {
  page: number
  filter: ContestFilterForm
}

export interface ContestFinishedResponse {
  total: number
  contests: Contest[]
}

export type ContestRecentRequest = object

export interface ContestRecentResponse {
  running: Contest[]
  pending: Contest[]
}

export interface ContestFilterForm {
  rule?: ContestRule
  difficulty?: ContestDifficulty
}

export interface ContestRequest {
  contest: ContestId
}

export interface ContestResponse {
  contest: Contest
}

export interface RankingRequest {
  contest: ContestId
  user: UserId
}

export interface RankingResponse {
  ranking: Ranking
}

export interface RanklistRequest {
  contest: ContestId
}

export interface RanklistResponse {
  rankings: Ranking[]
}

export interface ContestProblemsRequest {
  contest: ContestId
}

export interface ContestProblemsResponse {
  problems: ProblemCore[]
}
