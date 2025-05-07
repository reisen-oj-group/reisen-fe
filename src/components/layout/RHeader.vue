<template>
  <el-header height="100px" class="header">
    <div class="content">
      Online Judge
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
        <el-button type="primary" @click="auth.showLogin = true"> 登录 </el-button>
      </template>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ElHeader, ElAvatar, ElButton } from 'element-plus'

import { useAuth } from '@/stores/auth'

const auth = useAuth()
</script>

<style lang="scss" scoped>
.header {
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
