import type {
  JudgeRequest,
  JudgeResponse,
  ProblemDeleteRequest,
  ProblemDeleteResponse,
  ProblemEditRequest,
  ProblemEditResponse,
  ProblemListRequest,
  ProblemListResponse,
  ProblemRequest,
  ProblemResponse,
  ProblemSolvedRequest,
  ProblemSolvedResponse,
} from '@/interface'

import { apiFetchDefault, apiFetchRemind } from '@/utils/ofetch'

export const apiProblemList = async (request: ProblemListRequest) => {
  return apiFetchDefault<ProblemListResponse>('/problem/list', {
    method: 'POST',
    body: request,
  })
}

export const apiProblemMine = async (request: ProblemListRequest) => {
  return apiFetchDefault<ProblemListResponse>('/problem/mine', {
    method: 'POST',
    body: request,
  })
}

export const apiProblemAll = async (request: ProblemListRequest) => {
  return apiFetchDefault<ProblemListResponse>('/problem/all', {
    method: 'POST',
    body: request,
  })
}

export const apiProblemSolved = async (request: ProblemSolvedRequest) => {
  return apiFetchDefault<ProblemSolvedResponse>('/problem/solved', {
    method: 'POST',
    body: request,
  })
}

export const apiProblem = async (request: ProblemRequest) => {
  return apiFetchDefault<ProblemResponse>('/problem', {
    method: 'POST',
    body: request,
  })
}

export const apiProblemEdit = async (request: ProblemEditRequest) => {
  return apiFetchRemind<ProblemEditResponse>('/problem/edit', {
    method: 'POST',
    body: request,
  })
}

export const apiProblemDelete = async (request: ProblemDeleteRequest) => {
  return apiFetchRemind<ProblemDeleteResponse>('/problem/delete', {
    method: 'POST',
    body: request,
  })
}

export const apiJudge = async (request: JudgeRequest) => {
  return apiFetchDefault<JudgeResponse>('/problem/submit', {
    method: 'POST',
    body: request,
  })
}
