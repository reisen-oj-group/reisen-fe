<template>
  <div class="sidebar">
    <div class="logo">LOGO</div>
    <el-menu
      :default-active="activeMenu" class="nav-bar" :router="true" mode="vertical"
    >
    
      <el-menu-item class="nav-item" index="/">
        <font-awesome-icon class="nav-icon" :icon="faHouse" />
        <span class="nav-label">后台主页</span>
      </el-menu-item>
      <el-sub-menu class="nav-item" index="1">
        <template #title>
        <font-awesome-icon class="nav-icon" :icon="faUser" />
          <span class="nav-label">用户管理</span>
        </template>
        <el-menu-item class="nav-label" index="/admin/users">用户列表</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/auth">登录信息</el-menu-item>
      </el-sub-menu>

      <el-sub-menu class="nav-item" index="2">
        <template #title>
          <font-awesome-icon class="nav-icon" :icon="faBook" />
          <span class="nav-label">题目管理</span>
        </template>
        <el-menu-item class="nav-label" index="/admin/problems">题目列表</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/tags">标签分类</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/levels">难度分级</el-menu-item>
      </el-sub-menu>

      <el-sub-menu class="nav-item" index="3">
        <template #title>
          <font-awesome-icon class="nav-icon" :icon="faChartSimple" />
          <span class="nav-label">比赛管理</span>
        </template>
        <el-menu-item class="nav-label" index="/admin/contests">比赛列表</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/rankings">比赛排名</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/registrations">报名信息</el-menu-item>
      </el-sub-menu>

      <el-sub-menu class="nav-item" index="4">
        <template #title>
          <font-awesome-icon class="nav-icon" :icon="faChartPie" />
          <span class="nav-label">评测管理</span>
        </template>
        <el-menu-item class="nav-label" index="/admin/submissions">提交记录</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/results">题目结果</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/verdicts">评测状态</el-menu-item>
        <el-menu-item class="nav-label" index="/admin/code-langs">编程语言</el-menu-item>
      </el-sub-menu>

      <el-sub-menu class="nav-item" index="5">
        <template #title>
          <font-awesome-icon class="nav-icon" :icon="faSliders" />
          <span class="nav-label">系统配置</span>
        </template>
        <el-menu-item class="nav-label" index="/admin/user-langs">用户语言</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  faHouse,
  faBook,
  faUser,
  faChartSimple,
  faChartPie,
  faSliders,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  ElMenu,
  ElMenuItem,
  ElSubMenu
} from 'element-plus';

const route = useRoute()

const activeMenu = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 160px;
  background-color: #fff;
  border-right: 1px solid #eee;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
}

.logo {
  height: 60px;
}

.nav-bar {
  width: 100%;
  border-right: none;
}

.nav-item {
  .nav-icon {
    width: 20px;
    height: 20px;
    margin: 0 0.5em;
  }
  .nav-label {
    font-size: small;
  }
}
</style>
