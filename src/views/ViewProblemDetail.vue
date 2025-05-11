<template>
  <layout-sidebar>
    <template #main>
      <problem-toolbar :loading="loading" :problem="problem" />
      <problem-content :loading="loading" :problem="problem" />
    </template>
    <template #sidebar>
      <contest-sidebar />
      <problem-panel :loading="loading" :problem="problem" :result="result" />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ProblemContent from '@/components/problem/ProblemContent.vue'
import ProblemPanel from '@/components/problem/ProblemPanel.vue'
import ProblemToolbar from '@/components/problem/ProblemToolbar.vue'

import ContestSidebar from '@/components/contest/ContestSidebar.vue'

import { onMounted, ref, watch } from 'vue'
import type { Problem, Result } from '@/interface'
import { apiProblem } from '@/api'

import { useContest } from '@/stores/contest'
import { useRouter } from 'vue-router'

const router = useRouter()
const contestStore = useContest()

const problem = ref<Problem | null>(null)
const result = ref<Result | null>(null)

const loading = ref(false)

async function getProblem() {
  problem.value = null
  loading.value = true

  let query: string = ''

  if (props.cid_str && props.plabel) {
    await contestStore.enter(parseInt(props.cid_str)).then(() => {
      query = contestStore.currentContest!.problems[props.plabel!]
    })
  } else if (props.pid) {
    query = props.pid
  }

  if (query) {
    await apiProblem({ problem: query })
      .then((response) => {
        problem.value = response.problem
        if (response.result) result.value = response.result
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    loading.value = false
  }
}

const props = defineProps<{
  pid?: string
  plabel?: string
  cid_str?: string
}>()

onMounted(() => {
  getProblem()
})

watch(props, () => getProblem())
</script>

<style lang="scss" scoped></style>
