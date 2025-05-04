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

    <!-- <div class="user">
      <c-avatar :user="auth.currentUser" style="margin-right: 1em" />
      <router-link to="/user" v-if="auth.getLogin()" style="text-decoration: none;">
          <div class="username">{{ auth.currentUser.name }}</div>
      </router-link>
      <el-link @click="showLogin = true" :underline="false" v-else>
          <div class="username">{{ auth.currentUser.name }}</div>
      </el-link>
    </div> -->
  </el-header>
</template>

<script setup lang="ts">
import { ElBreadcrumb, ElHeader } from 'element-plus'
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
</style>
