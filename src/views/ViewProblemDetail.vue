<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <problem-content :loading="loading" :problem="problem" />
      </el-card>
    </template>
    <template #sidebar>
      <el-affix :offset="16">
        <problem-panel :loading="loading" :problem="problem" :result="result" />
      </el-affix>
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ProblemContent from '@/components/problem/ProblemContent.vue'
import ProblemPanel from '@/components/problem/ProblemPanel.vue'

import { ElCard, ElAffix } from 'element-plus'

import { onMounted, ref, watch } from 'vue'
import type { Problem, Result } from '@/interface'
import { apiProblem } from '@/api'

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
}>()

onMounted(() => {
  getProblem()
})

watch(props, () => getProblem())
</script>

<style lang="scss" scoped></style>
