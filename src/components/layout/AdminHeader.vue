<template>
  <el-header class="header">
    <div class="content">
      Online Judge 管理
      <!-- TODO: breadcrumb -->
      <!-- <div>
        <el-breadcrumb separator="/" style="margin-top: 1em;">
          <el-breadcrumb-item v-for="i in prop.bread" :key="i.label" :to="{ name: i.name }" >
              {{ i.label }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <h2 v-if="prop.title" style="color: var(--theme-color-1);">{{ prop.title }}</h2>
      </div> -->
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
