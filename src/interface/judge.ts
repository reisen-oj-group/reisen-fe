import type { LangId, RecordId, VerdictId } from './enum'

export interface Lang {
  id: LangId
  description: string
  ratio: number
}

export interface Verdict {
  id: VerdictId
  desecription: string
  name: string
}

export interface Record {
  id: RecordId
  timeSubmit: Date
  timeJudge: Date
  verdict: Verdict
}
