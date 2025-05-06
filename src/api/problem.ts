import type {
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  ProblemSolvedRequest,
  ProblemSolvedResponse,
  StatementRequest,
  StatementResponse,
} from '@/interface'
import type { ReisenAxiosConfig } from '@/tools/axios'
import axios from '@/tools/axios'

export const apiProblemList = async (request: ProblemListRequest) => {
  return (await axios.post<ProblemListResponse>('/problem/list', request, {} as ReisenAxiosConfig))
    .data
}

export const apiProblemSolved = async (request: ProblemSolvedRequest) => {
  return (
    await axios.post<ProblemSolvedResponse>('/problem/solved', request, {} as ReisenAxiosConfig)
  ).data
}

export const apiProblem = async (request: ProblemRequest) => {
  return (await axios.post<ProblemResponse>('/problem', request, {} as ReisenAxiosConfig)).data
}

export const apiStatement = async (request: StatementRequest) => {
  const data = (
    await axios.post<StatementResponse>('/problem/statement', request, {} as ReisenAxiosConfig)
  ).data
  console.log('i get smoke')
  console.log(data)
  return data
}
