<template>
  <div class="sidebar">
    <!-- TODO: Design a logo -->
    <div class="logo">LOGO</div>
    <el-menu class="nav-bar" :router="true" default-active="1" mode="vertical">
      <el-menu-item class="nav-item" index="/">
        <font-awesome-icon class="nav-icon" :icon="faHouse" />
        <span class="nav-label">主页</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/problem">
        <font-awesome-icon class="nav-icon" :icon="faBook" />
        <span class="nav-label">题库</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/contest">
        <font-awesome-icon class="nav-icon" :icon="faChartSimple" />
        <span class="nav-label">比赛</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/submission">
        <font-awesome-icon class="nav-icon" :icon="faChartPie" />
        <span class="nav-label">记录</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/user">
        <font-awesome-icon class="nav-icon" :icon="faUser" />
        <span class="nav-label">用户</span>
      </el-menu-item>
      <el-menu-item v-if="auth.currentUser && auth.currentUser.role >= Role.Admin" class="nav-item" index="/admin">
        <font-awesome-icon class="nav-icon" :icon="faServer" />
        <span class="nav-label">管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faHouse,
  faBook,
  faUser,
  faChartSimple,
  faChartPie,
  faServer,
} from '@fortawesome/free-solid-svg-icons'

import { Role } from '@/interface';

import { useAuth } from '@/stores/auth'

const auth = useAuth();

</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 60px;
  background-color: #fff;
  border-right: 1px solid #eee;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.nav-bar {
  width: 100%;
  border-right: none;
}

.nav-item {
  margin: 0em auto;

  display: flex;
  flex-direction: column;
  line-height: 24px;
  justify-content: center;
  height: 65px;

  > .nav-icon {
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
  }
  > .nav-label {
    font-size: small;
  }
}
</style>
