<template>
  <div class="contest-list-container">
    <template v-if="!searchOld">
      <template v-if="runningContests && runningContests.length > 0">
        <el-divider>正在进行</el-divider>
        
        <div class="contest-section">
          <contest-card
            v-for="contest in runningContests"
            :key="contest.id"
            :contest="contest"
            type="upcoming"
            @register="handleRegister"
          />
        </div>
      </template>

      <template v-if="pendingContests && pendingContests.length > 0">
        <el-divider>即将开始</el-divider>

        <div class="contest-section" v-if="runningContests && runningContests.length > 0">
          <contest-card
            v-for="contest in runningContests"
            :key="contest.id"
            :contest="contest"
            type="upcoming"
            @register="handleRegister"
          />
        </div>
      </template>

      <template v-if="!runningContests && !pendingContests">
        最近没有比赛。
      </template>
    </template>

    <template v-if="finishedContests">
      <el-divider>已经结束</el-divider>

      <div class="contest-section">
        <contest-card
          v-for="contest in finishedContests"
          :key="contest.id"
          :contest="contest"
          type="finished"
        />
        <el-pagination
          :current-page="finishedPage"
          :page-size="10"
          :pager-count="11"
          :total="total"
          @update:current-page="handlePageChange"
        />
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ContestCard from './ContestCard.vue'

import { ElPagination, ElDivider } from 'element-plus'

import { apiContestFinished, apiContestRecent } from '@/api/contest'
import type { Contest, ContestFilterForm } from '@/interface'

// 比赛数据
const runningContests = ref<Contest[] | null>(null);
const pendingContests = ref<Contest[] | null>(null);

const finishedContests = ref<Contest[] | null>(null);
const finishedPage = ref(1)
const total = ref(0)

const searchOld = ref(false)

// 处理报名
function handleRegister(contestId: number) {
  // 调用报名API
  console.log('Register for contest:', contestId)
}

const props = defineProps<{
  initFilter: ContestFilterForm
}>()

const filter = ref(props.initFilter)
const loadingU = ref(false)
const loadingF = ref(false)

onMounted(() => {
  getRecent()
  getList(true)
})

const emits = defineEmits(['page-change'])

async function getRecent() {
  loadingU.value = true;
  apiContestRecent({})
    .then((response) => {
      runningContests.value = response.running;
      pendingContests.value = response.pending;
    })
    .finally(() => {
      loadingU.value = false
    })
}

async function getList(resetPage: boolean) {
  loadingF.value = true
  finishedContests.value = null
  if (resetPage) {
    finishedPage.value = 1
  }
  apiContestFinished({ page: finishedPage.value, filter: filter.value })
    .then((response) => {
      finishedContests.value = response.contests
      total.value = response.total
    })
    .finally(() => {
      loadingF.value = false
    })
}

function handlePageChange(page: number) {
  finishedPage.value = page
  emits('page-change', page)
  getList(false)
}

function setFilter(newFilter: ContestFilterForm) {
  filter.value = newFilter
  getList(true)
}

defineExpose({
  setFilter,
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
