<template>
  <div class="contest-list-container">
    <el-divider>即将开始</el-divider>
    <!-- 即将开始的比赛 -->
    <div class="contest-section" v-if="upcomingContests.length > 0">
      <contest-card
        v-for="contest in upcomingContests"
        :key="contest.id"
        :contest="contest"
        type="upcoming"
        @register="handleRegister"
      />
    </div>

    <el-divider>已经结束</el-divider>

    <!-- 已结束的比赛 -->
    <div class="contest-section">
      <contest-card
        v-for="contest in finishedContests"
        :key="contest.id"
        :contest="contest"
        type="finished"
      />

      <el-pagination
        v-model:current-page="finishedPage"
        :page-size="pageSize"
        :total="finishedTotal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ContestCard from './ContestCard.vue'

import { ElPagination, ElDivider } from 'element-plus'

import { useTest } from '@/stores/test'

// 比赛数据
const upcomingContests = useTest().dataContests
const finishedContests = useTest().dataContests
const finishedPage = ref(1)
const pageSize = ref(10)
const finishedTotal = ref(0)

// 处理报名
function handleRegister(contestId: number) {
  // 调用报名API
  console.log('Register for contest:', contestId)
}

// 重新加载数据
function reloadContests() {
  // fetchUpcomingContests()
  // finishedPage.value = 1
  // fetchFinishedContests()
}

onMounted(() => {
  reloadContests()
})
</script>

<style scoped>
.contest-list-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contest-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--el-border-color);
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
</style>
