import type { Lang, LangId, Tag, TagId, Verdict, VerdictId } from '@/interface'
import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useConfig = defineStore('config', () => {
  const configTags: Record<TagId, Tag> = {
    1: {
      id: 1,
      name: '动态规划',
      classify: 1,
    },
    2: {
      id: 2,
      name: '图论',
      classify: 1,
    },
    3: {
      id: 3,
      name: '数据结构',
      classify: 1,
    },
  }

  const configLangs: Record<string, Lang> = {
    'cpp'   : { id: 'cpp', description: 'C++17 (GCC 9)', ratio: 1 },
    'java'  : { id: 'java', description: 'Java 11', ratio: 2 },
    'python': { id: 'python', description: 'Python 3.8', ratio: 3 }
  }

  const configVerdicts: Record<string, Verdict> = {
    'AC' : { id: 'AC', description: 'Accepted', abbr: 'AC' },
    'WA' : { id: 'WA', description: 'Wrong Answer', abbr: 'WA' },
    'TLE': { id: 'TLE', description: 'Time Limit Exceeded', abbr: 'TLE' },
    'MLE': { id: 'MLE', description: 'Memory Limit Exceeded', abbr: 'MLE' },
    'CE' : { id: 'CE', description: 'Compile Error', abbr: 'CE' }
  }
  return {
    configTags,
    configLangs,
    configVerdicts,
  }
})
