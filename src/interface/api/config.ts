import type { TagId, Tag, LangId, Lang, VerdictId, Verdict, Difficulty } from '../entity'

export interface SyncConfigResponse {
  tags: Record<TagId, Tag>
  langs: Record<LangId, Lang>
  verdicts: Record<VerdictId, Verdict>
  difficulties: Difficulty[]
}
