import { useAuth } from '@/stores/auth'
import { useConfig } from '@/stores/config'
import { inject } from 'vue'
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const authStore = useAuth()
    const configStore = useConfig()

    // 初始化配置文件
    if (!configStore.isInitialized) {
      await configStore.initialize()
    }

    // 初始化认证状态
    if (!authStore.isInitialized) {
      await authStore.initialize()
    }

    // 检查路由是否需要认证
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      authStore.setRedirectUrl(to.fullPath)
      authStore.showLogin = true
      return false
    }
    return true
  })
}
