<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <problem-content :problem="problems[0]" :statement="statements[0]" />
      </el-card>
    </template>
    <template #sidebar>
      <el-affix :offset="16">
        <problem-panel :problem="problems[0]" />
      </el-affix>
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ProblemContent from '@/components/problem/ProblemContent.vue'
import ProblemPanel from '@/components/problem/ProblemPanel.vue'

import { ElCard, ElAffix } from 'element-plus'

import { useTest } from '@/stores/test'

const problems = useTest().dataProblems
const statements = useTest().dataStatements

const props = defineProps<{
  pid: number
}>()
</script>

<style lang="scss" scoped></style>
