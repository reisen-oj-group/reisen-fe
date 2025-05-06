import type {
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  StatementRequest,
  StatementResponse,
} from '@/interface'
import type { ReisenAxiosConfig } from '@/tools/axios'
import axios from '@/tools/axios'

export const apiProblemList = async (request: ProblemListRequest) => {
  return (await axios.post<ProblemListResponse>('/problem/list', request, {} as ReisenAxiosConfig))
    .data
}

export const apiProblem = async (request: ProblemRequest) => {
  return (await axios.post<ProblemResponse>('/problem', request, {} as ReisenAxiosConfig)).data
}

export const apiStatement = async (request: StatementRequest) => {
  return (
    await axios.post<StatementResponse>('/problem/statement', request, {} as ReisenAxiosConfig)
  ).data
}
