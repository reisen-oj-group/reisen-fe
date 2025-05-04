<template>
  <layout-sidebar>
    <template #main>
      <problem-list :problems="problems" />
    </template>
    <template #sidebar>
      <el-affix :offset="16">
        <problem-filter />
      </el-affix>
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'

import ProblemList from '@/components/problem/ProblemList.vue'
import ProblemFilter from '@/components/problem/ProblemFilter.vue'

import { ElAffix } from 'element-plus'
import { useTest } from '@/stores/test'

const problems = useTest().dataProblemsMany
</script>

<style lang="scss" scoped>

</style>
