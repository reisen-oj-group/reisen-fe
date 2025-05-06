// @/stores/contest.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuth } from './auth'
import type { Contest, ContestId, Ranking } from '@/interface'
import { apiContest, apiRanking } from '@/api/contest'

export const useContest = defineStore('contest', () => {
  const isInitialized = ref(false)
  const loading = ref(false)
  
  // 当前比赛信息
  const currentContest = ref<Contest | null>(null)
  const currentRanking = ref<Ranking | null>(null)
  
  // 比赛模式状态
  const valid = computed(() => currentContest.value !== null)

  const authStore = useAuth();

  function refresh(){
    if(currentContest.value && authStore.currentUser){
      apiRanking({
        contest: currentContest.value.id,
        user: authStore.currentUser.id
      })
      .then((response) => {
        currentRanking.value = response.ranking
      })
    }
  }
  
  // 进入比赛模式
  function enter(contest: ContestId) {
    if (currentContest.value && currentContest.value.id !== contest) {
      exit()
    }
    if (currentContest.value && currentContest.value.id === contest) {
      return;
    }
    
    loading.value = true
    apiContest({ contest: contest })
    .then((response) => {
      currentContest.value = response.contest
      refresh()
      
      // 存储到本地存储，以便重新登录后恢复
      localStorage.setItem('current-contest', JSON.stringify({
        id: contest
      }))
    }).finally(() => {
      loading.value = false
    })
  }
  
  // 退出比赛模式
  function exit() {
    currentContest.value = null
    currentRanking.value = null
    localStorage.removeItem('current-contest')
  }
  
  // 检查本地存储并恢复比赛模式
  function restore() {
    const saved = localStorage.getItem('current-contest')
    if (saved) {
      const { id } = JSON.parse(saved)
    }
  }
  
  return {
    currentContest,
    currentRanking,
    valid,
    enter,
    exit,
    restore,
    refresh,
    isInitialized,
    loading
  }
})