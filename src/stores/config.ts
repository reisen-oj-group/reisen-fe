import type { Lang, LangId, Tag, TagId, Verdict, VerdictId } from '@/interface'
import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useConfig = defineStore('config', () => {
  const configTags: Record<TagId, Tag> = {
    1: {
      id: 1,
      name: '动态规划',
    },
    2: {
      id: 2,
      name: '图论',
    },
    3: {
      id: 3,
      name: '数据结构',
    },
  }
  const configLang: Record<LangId, Lang> = {
    c: {
      id: 'c',
      description: 'gcc',
      ratio: 1,
    },
    cpp: {
      id: 'cpp',
      description: 'g++',
      ratio: 1,
    },
    cpp11: {
      id: 'cpp11',
      description: 'g++11',
      ratio: 1,
    },
    cpp14: {
      id: 'cpp14',
      description: 'g++14',
      ratio: 1,
    },
  }
  const configVerdict: Record<VerdictId, Verdict> = {}

  return {
    configTags,
    configLang,
    configVerdict,
  }
})
