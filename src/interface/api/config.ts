import type {
  TagId,
  Tag,
  VerdictId,
  Verdict,
  Level,
  UserLangId,
  CodeLangId,
  UserLang,
  CodeLang,
} from '../entity'

export interface SyncConfigResponse {
  tags: Record<TagId, Tag>
  userLangs: Record<UserLangId, UserLang>
  codeLangs: Record<CodeLangId, CodeLang>
  verdicts: Record<VerdictId, Verdict>
  difficulties: Level[]
}
