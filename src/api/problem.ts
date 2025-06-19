import type {
  Judgement,
  JudgeRequest,
  JudgeResponse,
  ProblemAllRequest,
  ProblemAllResponse,
  ProblemCoreWithJudgements,
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

import { apiFetchDefault, apiFetchRemind, apiFetchSilent } from '@/utils/ofetch'

const processJudgementDates = (judgement: Judgement) => {
  judgement.stamp = new Date(judgement.stamp as unknown as number)
  return judgement
}

const processProblemDates = (problem: ProblemCoreWithJudgements) => {
  problem.judgements = problem.judgements.map(processJudgementDates)
  return problem
}

export const apiProblemList = async (request: ProblemListRequest) => {
  const data = await apiFetchDefault<ProblemListResponse>('/problem/list', {
    method: 'POST',
    body: request,
  })
  data.problems = data.problems.map(processProblemDates)
  return data
}

export const apiProblemMine = async (request: ProblemAllRequest) => {
  return apiFetchDefault<ProblemAllResponse>('/problem/mine', {
    method: 'POST',
    body: request,
  })
}

export const apiProblemAll = async (request: ProblemAllRequest) => {
  return apiFetchDefault<ProblemAllResponse>('/problem/all', {
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

export const apiProblemCheck = async (request: ProblemRequest) => {
  return apiFetchSilent<ProblemResponse>('/problem', {
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
  if(request.contest !== undefined){
    return apiFetchDefault<JudgeResponse>('/contest/submit', {
      method: 'POST',
      body: request,
    })
  } else {
    return apiFetchDefault<JudgeResponse>('/problem/submit', {
      method: 'POST',
      body: request,
    })
  }
}
