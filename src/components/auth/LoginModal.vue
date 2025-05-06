<template>
  <el-dialog v-model="authStore.showLogin" :show-close="false" width="450px">
    <template #header>
      <el-alert v-if="loginError" :title="loginError" type="error" :closable="false" show-icon />
    </template>
    <el-tabs v-model="activeTab" stretch>
      <el-tab-pane label="登录" name="login">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名" clearable />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              type="password"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="loginForm.remember"> 7天内自动登录 </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loginLoading"
              style="width: 100%"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
          @submit.prevent="handleRegister"
        >
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" placeholder="用户名" clearable />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              placeholder="密码"
              type="password"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              placeholder="确认密码"
              type="password"
              show-password
              clearable
            />
          </el-form-item>

          <el-alert
            v-if="registerError"
            :title="registerError"
            type="error"
            :closable="false"
            show-icon
          />

          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="registerLoading"
              style="width: 100%"
            >
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="activeTab === 'login'" type="primary" link @click="activeTab = 'register'">
          没有账号？立即注册
        </el-button>
        <el-button v-else type="primary" link @click="activeTab = 'login'">
          已有账号？立即登录
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuth } from '@/stores/auth'
import type { FormInstance, FormRules } from 'element-plus'

import { ElForm, ElFormItem, ElInput, ElDialog, ElTabs, ElTabPane } from 'element-plus'

const authStore = useAuth()

// 模态框状态
const activeTab = ref<'login' | 'register'>('login')

// 登录相关
const loginFormRef = ref<FormInstance>()
const loginLoading = ref(false)
const loginError = ref('')
const loginForm = reactive({
  username: '',
  password: '',
  remember: false,
})

// 注册相关
const registerFormRef = ref<FormInstance>()
const registerLoading = ref(false)
const registerError = ref('')
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

// 验证规则
const validatePasswordConfirm = (rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
  ],
}

const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePasswordConfirm, trigger: 'blur' },
  ],
}

// 切换标签页时重置错误
watch(activeTab, () => {
  loginError.value = ''
  registerError.value = ''
})

// 登录处理
const handleLogin = async () => {
  try {
    loginError.value = ''
    await loginFormRef.value?.validate()
    loginLoading.value = true
    await authStore.login(loginForm)
    authStore.showLogin = false
  } catch (error: any) {
    if (error?.response?.data?.message) {
      loginError.value = error.response.data.message
    } else if (error.message) {
      loginError.value = error.message
    } else {
      loginError.value = '登录失败，请稍后重试'
    }
  } finally {
    loginLoading.value = false
  }
}

// 注册处理
const handleRegister = async () => {
  try {
    registerError.value = ''
    await registerFormRef.value?.validate()

    registerLoading.value = true
    await authStore.register({
      username: registerForm.username,
      password: registerForm.password,
    })

    // 注册成功后自动切换到登录标签页
    activeTab.value = 'login'
    // 自动填充用户名
    loginForm.username = registerForm.username
    // 清空注册表单
    registerForm.password = ''
    registerForm.confirmPassword = ''
  } catch (error: any) {
    if (error?.response?.data?.message) {
      registerError.value = error.response.data.message
    } else if (error.message) {
      registerError.value = error.message
    } else {
      registerError.value = '注册失败，请稍后重试'
    }
  } finally {
    registerLoading.value = false
  }
}

// 暴露方法供外部调用
defineExpose({
  show: (tab: 'login' | 'register' = 'login') => {
    activeTab.value = tab
    authStore.showLogin = true
  },
  hide: () => {
    authStore.showLogin = false
  },
})
</script>

<style scoped>
.dialog-footer {
  text-align: center;
}
</style>
