<template>
  <layout-main>
    <el-card>
      <template v-if="problem">
        <el-tabs v-model="activeTab">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="basic">
            <problem-edit-basic v-model="problem" />
          </el-tab-pane>

          <!-- 题面编辑 -->
          <el-tab-pane label="题面编辑" name="statement">
            <problem-edit-content v-model="problem" />
          </el-tab-pane>

          <!-- 数据上传 -->
          <el-tab-pane label="数据上传" name="testdata">
            <problem-edit-testdata v-model="problem" />
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <div v-if="loading" v-loading="true" style="height: 200px" />
        <el-empty v-else description="暂无数据" />
      </template>
    </el-card>
  </layout-main>
</template>

<script setup lang="ts">
import LayoutMain from '@/components/layout/LayoutMain.vue'

import ProblemEditContent from '@/components/problem/ProblemEditContent.vue'
import ProblemEditBasic from '@/components/problem/ProblemEditBasic.vue'
import ProblemEditTestdata from '@/components/problem/ProblemEditTestdata.vue'

import { ElTabs, ElTabPane, ElCard, type TabsPaneContext } from 'element-plus'

import { computed, onMounted, ref } from 'vue'

import type { Problem } from '@/interface'
import { apiProblem } from '@/api'

const activeTab = ref('basic')
const props = defineProps<{
  pid?: string
}>()

const problem = ref<Problem | null>(null)
const loading = ref(false)

async function getProblem() {
  problem.value = null

  if (props.pid) {
    loading.value = true
    await apiProblem({ problem: props.pid })
      .then((response) => {
        problem.value = response.problem
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    ;(problem.value as unknown as Problem) = {
      id: '',
      type: 'traditional',
      statements: {},
      status: 'private',
      limitTime: 0,
      limitMemory: 0,
      countCorrect: 0,
      countTotal: 0,
      difficulty: 0,
      tags: [],
      title: {},
    }
  }
}

onMounted(() => {
  getProblem()
})
</script>

<style lang="scss" scoped></style>
