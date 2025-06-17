<template>
  <div class="contest-list-container">
    <template v-if="searched">
      <el-alert>当前正在检索比赛，若希望查看所有比赛请清空搜索选项</el-alert>
    </template>

    <template v-if="classified.running.length > 0">
      <el-divider class="running">正在进行</el-divider>

      <div class="contest-section">
        <contest-card
          v-for="contest in classified.running"
          :key="contest.id"
          :contest="contest"
          type="running"
          @register="handleRegister"
        />
      </div>
    </template>

    <template v-if="classified.pending.length > 0">
      <el-divider class="pending">即将开始</el-divider>

      <div class="contest-section">
        <contest-card
          v-for="contest in classified.pending"
          :key="contest.id"
          :contest="contest"
          type="pending"
          @register="handleRegister"
        />
      </div>
    </template>

    <template v-if="classified.finished.length > 0">
      <el-divider class="finished">已经结束</el-divider>

      <div class="contest-section">
        <contest-card
          v-for="contest in classified.finished"
          :key="contest.id"
          :contest="contest"
          type="finished"
        />
        <el-pagination
          :current-page="page"
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
import { ref, onMounted, computed, watch } from 'vue'
import ContestCard from './ContestCard.vue'

import { ElPagination, ElDivider, ElAlert } from 'element-plus'

import { apiContestList } from '@/api/contest'
import type { Contest, ContestFilterForm, ContestWithSignup } from '@/interface'

// 比赛数据
const contests = ref<ContestWithSignup[] | null>(null)
const classified =  ref<{
  running: ContestWithSignup[],
  pending: ContestWithSignup[],
  finished: ContestWithSignup[],
}>({
  running: [],
  pending: [],
  finished: []
});

watch(contests, () => {
  const now = Date.now()
  classified.value.running = []
  classified.value.pending = []
  classified.value.finished = []
  if(contests.value === null){
    return
  }
  for(const contest of contests.value){
    const s = contest.startTime.getTime()
    const e = contest.endTime.getTime()
    if(s <= now && now <= e){
      classified.value.running.push(contest)
    } else 
    if(now < s){
      classified.value.pending.push(contest)
    } else {
      classified.value.finished.push(contest)
    }
  }
})

const page = ref(1)
const total = ref(0)

const searched = ref(false)

// 处理报名
function handleRegister(contestId: number) {
  // 调用报名API
  console.log('Register for contest:', contestId)
}

const props = defineProps<{
  initFilter: ContestFilterForm
}>()

const filter = ref(props.initFilter)
const loading = ref(false)

onMounted(() => {
  getList(true)
})

const emits = defineEmits(['page-change'])

async function getList(resetPage: boolean) {
  loading.value = true
  contests.value = null
  if (resetPage) {
    page.value = 1
  }
  apiContestList({ page: page.value, filter: filter.value })
    .then((response) => {
      contests.value = response.contests
      total.value = response.total
    })
    .finally(() => {
      loading.value = false
    })
}

function handlePageChange(newPage: number) {
  page.value = newPage
  emits('page-change', newPage)
  getList(false)
}

function setFilter(newFilter: ContestFilterForm, cleaned: boolean) {
  filter.value = newFilter
  searched.value = !cleaned
  getList(true)
}

defineExpose({
  setFilter,
})
</script>

<style lang="scss" scoped>
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

.running {
  > ::v-deep(.el-divider__text) {
    color: white;
    background-color: var(--el-color-primary);
    border-radius: 8px;
  }
}

.pending,
.finished {
  > ::v-deep(.el-divider__text) {
    background-color: #f9f9f9;
  }
}
</style>
