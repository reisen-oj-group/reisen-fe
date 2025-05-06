<template>
  <el-dialog v-model="auth.showLogin" title="登录 / 注册" :width="400">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="登录" name="login">
        <el-form @submit.prevent="handleLogin">
          <el-form-item label="账号">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.remember">七天内自动登录</el-checkbox>
          </el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <el-form @submit.prevent="handleLogin">
          <el-form-item label="账号">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.remember">7天内自动登录</el-checkbox>
          </el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  ElDialog,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElButton,
  ElInput,
} from 'element-plus'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
const activeTab = ref('login')
const loginForm = ref({
  username: '',
  password: '',
  remember: false,
})

const registerForm = ref({
  username: '',
  password: '',
})

const handleLogin = async () => {
  await auth.login(loginForm.value)
  auth.showLogin = false
}

const show = () => {
  auth.showLogin = true
}
</script>
