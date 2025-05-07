<template>
  <div v-if="contest" class="contest-sidebar">
    <el-card>
      <template v-if="contest">
        <div class="contest-info">
          <router-link :to="`/contest/${contest.id}`">
            <h3>{{ contest.title }}</h3>
          </router-link>

          <div class="contest-time">
            <el-progress :percentage="left / zone" :stroke-width="15" striped :show-text="false" />

            <span v-if="left > 0">剩余时间: {{ formatTimeLong(left) }}</span>
            <span v-else>比赛已结束</span>
          </div>
        </div>

        <div class="problem-badges">
          <div
            v-for="(problem, label) of contest.problems"
            class="problem-badge"
            :class="getProblemStatusClass(problem)"
            @click="goToProblem(problem)"
          >
            {{ label }}
          </div>
        </div>
      </template>
    </el-card>

    <el-button type="primary" @click="exitContest">退出比赛模式</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContest } from '@/stores/contest'

import { formatDate, formatTimeLong } from '@/tools/format'
import type { Contest, ProblemId, Ranking } from '@/interface'

import { ElButton, ElProgress, ElCard } from 'element-plus'

// const props = withDefaults(defineProps<{
//   force?: boolean
// }>(), {
//   force: false
// });

const router = useRouter()
const contestStore = useContest()
const contest = computed(() => contestStore.currentContest)
const ranking = computed(() => contestStore.currentRanking)

const left = ref(0)
const zone = ref(1)

function update() {
  if (contest.value) {
    left.value = Math.max(0, contest.value.endTime.getTime() - Date.now())
    zone.value = contest.value.endTime.getTime() - contest.value.startTime.getTime()
  }
}

function getProblemStatusClass(problem: ProblemId) {
  if (!ranking.value) return ''

  for (const result of ranking.value.results) {
    if (result.problem == problem) {
      const judge = result.judge
      switch (judge) {
        case 'correct':
          return 'status-success'
        case 'incorrect':
          return 'status-danger'
        default:
          return 'status-warning'
      }
    }
  }
  return ''
}

// 跳转到题目
function goToProblem(problem: ProblemId) {
  router.push(`/contest/problem/${problem}`)
}

// 退出比赛模式
function exitContest() {
  contestStore.exit()
  router.push('/contest')
}

let timer: number
onMounted(() => {
  update()
  timer = window.setInterval(update, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.contest-sidebar {
  > * {
    width: 100%;
  }

  > *:not(:last-child) {
    margin-bottom: 1em;
  }
}

.contest-info {
  margin-bottom: 20px;

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
    word-break: break-word;

    transition: color 0.2s;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .contest-time {
    font-size: 0.9em;
    color: var(--el-text-color-secondary);
  }
}

.problem-badges {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
}

.problem-badge {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: var(--el-fill-color-light);
  cursor: pointer;
  font-weight: bold;

  &.status-success {
    background-color: var(--el-color-success-light-9);
    color: var(--el-color-success);
  }

  &.status-danger {
    background-color: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }
}
</style>
