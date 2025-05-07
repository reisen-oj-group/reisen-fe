<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <problem-content :loading="loading" :problem="problem" />
      </el-card>
    </template>
    <template #sidebar>
      <problem-panel :loading="loading" :problem="problem" :result="result" />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ProblemContent from '@/components/problem/ProblemContent.vue'
import ProblemPanel from '@/components/problem/ProblemPanel.vue'

import { ElCard } from 'element-plus'

import { onMounted, ref, watch } from 'vue'
import type { Problem, Result } from '@/interface'
import { apiProblem } from '@/api'

import { useContest } from '@/stores/contest'

const problem = ref<Problem | null>(null)
const result = ref<Result | null>(null)

const loading = ref(false)

async function getProblem() {
  problem.value = null

  loading.value = true
  await apiProblem({ problem: props.pid })
    .then((response) => {
      problem.value = response.problem
      if (response.result) result.value = response.result
    })
    .finally(() => {
      loading.value = false
    })
}

const props = defineProps<{
  pid: string
  cid_str?: string
}>()

onMounted(() => {
  getProblem()

  if (props.cid_str) {
    useContest().enter(parseInt(props.cid_str))
  }
})

watch(props, () => getProblem())
</script>

<style lang="scss" scoped></style>
