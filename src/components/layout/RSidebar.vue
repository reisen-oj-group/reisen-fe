<template>
  <div class="sidebar">
    <div class="logo">LOGO</div>
    <el-menu class="nav-bar" :router="true" default-active="1" mode="vertical">
      <el-menu-item class="nav-item" index="/">
        <font-awesome-icon class="nav-icon" size="lg" :icon="faHouse" />
        <span class="nav-label">主页</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/problem">
        <font-awesome-icon class="nav-icon" size="lg" :icon="faBook" />
        <span class="nav-label">题库</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/contest">
        <font-awesome-icon class="nav-icon" size="lg" :icon="faChartSimple" />
        <span class="nav-label">比赛</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/record">
        <font-awesome-icon class="nav-icon" size="lg" :icon="faChartPie" />
        <span class="nav-label">记录</span>
      </el-menu-item>
      <el-menu-item class="nav-item" index="/user">
        <font-awesome-icon class="nav-icon" size="lg" :icon="faUser" />
        <span class="nav-label">用户</span>
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
} from '@fortawesome/free-solid-svg-icons'
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
  margin: 0em auto;

  display: flex;
  flex-direction: column;
  line-height: 24px;
  justify-content: center;
  height: 65px;

  > .nav-icon {
    margin: 0;
    padding: 0;
  }
  > .nav-label {
    font-size: small;
  }
}
</style>
