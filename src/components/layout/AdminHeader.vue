<template>
  <el-header class="header">
    <div class="content">
      <strong>管理后台</strong> <span class="warn">请确保您的账号安全。</span>
    </div>

    <div class="user">
      <template v-if="auth.currentUser">
        <el-avatar class="avatar" :src="auth.currentUser.avatar" />
        <span class="username">
          {{ auth.currentUser.name }}
        </span>
      </template>
      <template v-else>
        <el-button type="primary" @click="auth.show('login')"> 登录 </el-button>
        <el-button type="primary" @click="auth.show('register')"> 注册 </el-button>
      </template>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ElHeader, ElAvatar, ElButton } from 'element-plus'

import { useAuth } from '@/stores/auth'

const _props = withDefaults(
  defineProps<{
    admin?: boolean
  }>(),
  {
    admin: false,
  },
)

const auth = useAuth()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 160px;
  right: 0;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.warn {
  color: var(--el-color-warning);
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 12px;
}

.username {
  font-size: 1.1rem;
}
</style>
