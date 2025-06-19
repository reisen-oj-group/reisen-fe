<template>
  <el-header class="header">
    <div class="content">
      <el-breadcrumb :separator-icon="ArrowRight" class="bread" separator="/">
        <template v-for="i in props.bread" :key="i.label">
          <el-breadcrumb-item v-if="i.to" :to="i.to" >
              {{ i.label }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else >
              {{ i.label }}
          </el-breadcrumb-item>
        </template>
        </el-breadcrumb>
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
import { ArrowRight } from '@element-plus/icons-vue'
import { ElHeader, ElAvatar, ElButton, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

import { useAuth } from '@/stores/auth'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router';

const props = withDefaults(
  defineProps<{
    admin?: boolean,
    bread?: { label: string, to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric}[]
  }>(),
  {
    admin: false,
  },
)

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

.content {
  > .bread {
    font-size: 1.1em;
  }
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
