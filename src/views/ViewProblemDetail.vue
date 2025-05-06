<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <problem-content :loading="loadingS" :problem="problem" :statement="statement" />
      </el-card>
    </template>
    <template #sidebar>
      <el-affix :offset="16">
        <problem-panel :loading="loadingP" :problem="problem" />
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
import type { ProblemVerdict, Statement } from '@/interface'
import { apiProblem, apiStatement } from '@/api'

const problem = ref<ProblemVerdict | null>(null)
const statement = ref<Statement | null>(null)

const loadingP = ref(false)
const loadingS = ref(false)

async function getProblem() {
  problem.value = null
  statement.value = null

  loadingP.value = true
  await apiProblem({ problem: props.pid })
    .then((response) => {
      problem.value = response.problem
      apiStatement({ statement: problem.value.i18n['en-US'].statement })
        .then((response) => {
          statement.value = response.statement
        })
        .finally(() => {
          loadingS.value = false
        })
    })
    .catch((e) => {
      loadingS.value = false
    })
    .finally(() => {
      loadingP.value = false
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
