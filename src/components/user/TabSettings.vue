<template>
  <div class="settings-tab">
    <el-card>
      <el-row :gutter="48">
        <el-col :span="12" class="safety">
          <h3>账号设置</h3>
          <el-form label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.username" />
            </el-form-item>

            <el-form-item label="电子邮箱">
              <el-input v-model="form.email" />
              <el-button size="small" type="text">验证邮箱</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveSettings">保存更改</el-button>
            </el-form-item>
          </el-form>

          <h3>密码安全</h3>
          <el-form label-width="80px">
            <el-form-item label="当前密码">
              <el-input v-model="password.current" type="password" />
            </el-form-item>

            <el-form-item label="新密码">
              <el-input v-model="password.new" type="password" />
            </el-form-item>

            <el-form-item label="确认密码">
              <el-input v-model="password.confirm" type="password" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="changePassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12" class="avatar-upload">
          <el-avatar :size="150" :src="avatarUrl" />
          <el-upload
            action="/api/upload/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <el-button type="primary">上传新头像</el-button>
          </el-upload>
          <p class="tip">支持 JPG/PNG 格式，大小不超过 2MB</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ElMessage,
  ElAvatar,
  ElUpload,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElCard,
} from 'element-plus'
import type { User } from '@/interface'

const props = defineProps<{
  user: User
}>()

const form = ref({
  username: props.user.name,
  email: 'user@example.com',
})

const password = ref({
  current: '',
  new: '',
  confirm: '',
})

const avatarUrl = ref(props.user.avatar)

function saveSettings() {
  ElMessage.success('设置已保存')
}

function changePassword() {
  ElMessage.success('密码已修改')
}

function handleAvatarSuccess(res: any) {
  avatarUrl.value = res.url
  ElMessage.success('头像上传成功')
}
</script>

<style lang="scss" scoped>
.settings-tab {
  max-width: 800px;
  margin: 0 auto;
  padding: 8px;

  h3 {
    margin-bottom: 0.5em;
  }
}

.avatar-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-avatar {
    margin-bottom: 20px;
  }

  .tip {
    margin-top: 10px;
    color: var(--el-text-color-secondary);
    font-size: 0.9em;
  }
}
</style>
