<template>
  <layout-sidebar>
    <template #main>
      <problem-list :init-filter="initFilter" ref="problems" />
    </template>
    <template #sidebar>
      <el-affix :offset="16">
        <problem-filter :init-filter="initFilter" @filter="handleFilterSubmit" />
      </el-affix>
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'

import ProblemList from '@/components/problem/ProblemList.vue'
import ProblemFilter from '@/components/problem/ProblemFilter.vue'

import { ElAffix } from 'element-plus'
import type { ProblemFilterForm } from '@/interface'
import { ref } from 'vue'

const problems = ref<InstanceType<typeof ProblemList> | null>(null)

const initFilter: ProblemFilterForm = {}

const handleFilterSubmit = (form: ProblemFilterForm) => {
  problems.value?.setFilter(form)
}
</script>

<style lang="scss" scoped></style>
