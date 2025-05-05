<template>
  <layout-main>
    <div class="user-profile">
      <template v-if="uid === 0"> 尚未登录。{{ props.uid_str }} </template>
      <template v-else>
        <!-- 顶部用户信息 -->
        <div class="user-header">
          <el-avatar :size="120" :src="user.avatar" />
          <h1>{{ user.name }}</h1>
          <div class="user-meta">
            <span>注册于 {{ formatDate(user.register) }}</span>
            <span>解决 100 道题目</span>
          </div>
        </div>

        <!-- 标签页导航 -->
        <template v-if="isCurrentUser">
          <el-tabs v-model="activeTab" class="profile-tabs">
            <el-tab-pane label="练习" name="practice">
              <tab-practice :user="user" />
            </el-tab-pane>
            <el-tab-pane label="题库" name="problems">
              <tab-problem :user="user" />
            </el-tab-pane>
            <el-tab-pane label="设置" name="settings">
              <tab-settings :user="user" />
            </el-tab-pane>
          </el-tabs>
        </template>
        <template v-else>
          <el-tabs v-model="activeTab" class="profile-tabs">
            <el-tab-pane label="练习" name="practice">
              <tab-practice :user="user" />
            </el-tab-pane>
          </el-tabs>
        </template>
      </template>
    </div>
  </layout-main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/stores/auth'
import { useTest } from '@/stores/test'
import { formatDate } from '@/tools/format'

import { ElTabs, ElTabPane, ElAvatar } from 'element-plus'

import LayoutMain from '@/components/layout/LayoutMain.vue'
import TabPractice from '@/components/user/TabPractice.vue'
import TabProblem from '@/components/user/TabProblem.vue'
import TabSettings from '@/components/user/TabSettings.vue'

const props = defineProps<{
  uid_str?: string
}>()

// const currentUser = useAuth().currentUser
const currentUser = useTest().dataUsers[0]

const uid: number = props.uid_str ? parseInt(props.uid_str) : currentUser?.id || 0
const activeTab = ref('practice')

const isCurrentUser = computed(() => currentUser?.id === uid)

// 模拟用户数据
const user = useTest().dataUsers[0]
</script>

<style scoped>
.user-profile {
  max-width: 1200px;
  margin: 0 auto;
}

.user-header {
  text-align: center;
  margin-bottom: 30px;
}

.user-header h1 {
  margin: 15px 0 5px;
  font-size: 2em;
}

.user-meta {
  color: var(--el-text-color-secondary);
  display: flex;
  justify-content: center;
  gap: 20px;
}

.profile-tabs {
  margin-top: 20px;
}
</style>
