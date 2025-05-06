import { syncConfig } from '@/api/config'
import type { Difficulty, Lang, LangId, Tag, TagId, Verdict, VerdictId } from '@/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfig = defineStore('config', () => {
  const isInitialized = ref(false)

  const config = ref<{
    tags: Record<TagId, Tag>
    langs: Record<LangId, Lang>
    verdicts: Record<VerdictId, Verdict>
    difficulties: Difficulty[]
  }>({
    tags: {},
    langs: {},
    verdicts: {},
    difficulties: [],
  })

  const initialize = async () => {
    const response = await syncConfig()
    config.value = response
    isInitialized.value = true
  }

  return {
    config,
    isInitialized,
    initialize,
  }
})
