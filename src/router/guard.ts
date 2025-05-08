import { useAuth } from '@/stores/auth'
import { useConfig } from '@/stores/config'
import { useContest } from '@/stores/contest'
import type { Router } from 'vue-router'

import { ElMessage, ElMessageBox } from 'element-plus'

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const authStore = useAuth()
    const contestStore = useContest()
    const configStore = useConfig()

    // 初始化配置文件
    if (!configStore.isInitialized) {
      await configStore.initialize()
    }

    // 初始化认证状态
    if (!authStore.isInitialized) {
      await authStore.initialize()
    }

    // 初始化比赛状态
    if (!contestStore.isInitialized) {
      const saved = contestStore.restore()
      contestStore.isInitialized = true

      if (!to.path.startsWith('/contest/')) {
        if (saved !== 0) {
          ElMessageBox.confirm('检测到你在离开前处于比赛模式，是否继续比赛？', '警告', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            router.push(`/contest/${saved}`)
            return false
          })
        }
        contestStore.exit()
      } else {
        contestStore.refresh()
      }
    } else {
      if (!to.path.startsWith('/contest/')) {
        contestStore.exit()
      } else {
        contestStore.refresh()
      }
    }
    // 检查路由是否需要认证
    if (to.meta.requiresAuth && !authStore.currentUser) {
      authStore.setRedirectUrl(to.fullPath)
      authStore.showLogin = true
      return false
    }
    return true
  })
}
