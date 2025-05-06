<template>
  <div class="practice-tab">
    <!-- 统计图表区 -->
    <!-- <el-row class="section" :gutter="24">
      <el-col :span="15">
        <el-card>
          <template #header> 练习情况 </template>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card body-style="padding: 4px">
          <template #header> 难度分布 </template>
          <chart-pie :data="dataDifficulty" />
        </el-card>
      </el-col>
    </el-row> -->

    <!-- 比赛列表 -->
    <el-card class="section">
      <template #header> 参加的比赛 </template>
      <el-empty description="暂无比赛数据" />
    </el-card>

    <!-- 通过题目列表 -->
    <!-- <el-card class="section">
      <template #header> 通过的题目 </template>
      <div v-for="(problems, level) in solvedProblemsByLevel" :key="level">
        <template v-if="problems.length">
          <el-divider content-position="left">{{ getLevelName(level) }}</el-divider>
          <el-row :gutter="20">
            <el-col v-for="problem in problems" :key="problem.id" :xs="24" :sm="12" :md="8" :lg="6">
              <router-link :to="`/problem/${problem.id}`" class="problem-card">
                <span class="problem-id">{{ problem.id }}</span>
                <span class="problem-title">{{ problem.i18n['en-US'].title }}</span>
              </router-link>
            </el-col>
          </el-row>
        </template>
      </div>
    </el-card> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User, Problem } from '@/interface'

import { ElRow, ElCol, ElDivider, ElCard } from 'element-plus'

import { useConfig } from '@/stores/config'

import ChartContribution from './ChartContribution.vue'
import ChartPie from './ChartPie.vue'
import { useTest } from '@/stores/test'

const props = defineProps<{
  user: User
}>()

const { difficulties } = useConfig().config

// 模拟数据
// const solvedTime = useTest().dataSubmissions
// const solvedProblems = useTest().dataProblems
// const solvedTime = []
// const solvedProblems = useTest().dataProblems

// // 按难度分组
// const solvedProblemsByLevel = computed(() => {
//   const groups: Record<number, Problem[]> = {}

//   difficulties.forEach((level, index) => {
//     groups[index] = solvedProblems
//       .filter((p) => p.difficulty >= level.min && p.difficulty <= level.max)
//       .sort((a, b) => a.id.localeCompare(b.id))
//   })

//   return groups
// })

// // 练习热度数据
// const dataContribution = computed(() => {
//   return difficulties.map((level, index) => ({
//     name: level.name,
//     value: solvedProblemsByLevel.value[index]?.length || 0,
//   }))
// })

// // 难度饼图数据
// const dataDifficulty = computed(() => {
//   return difficulties.map((level, index) => ({
//     name: level.name,
//     value: solvedProblemsByLevel.value[index]?.length || 0,
//   }))
// })

function getLevelName(index: number) {
  const level = difficulties[index]
  return `${level.name}`
}
</script>

<style scoped>
.practice-tab {
  padding: 8px;

  > *:not(:last-child) {
    margin-bottom: 24px;
  }
}

.chart-container {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}

.problem-card {
  display: block;
  padding: 12px;
  background: var(--el-bg-color);
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--el-box-shadow-light);
  }

  .problem-id {
    display: inline-block;
    width: 60px;
    color: var(--el-text-color-secondary);
  }

  .problem-title {
    color: var(--el-color-primary);
  }
}
</style>
