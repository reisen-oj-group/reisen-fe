<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <record-main :submission="submissions[0]" />
      </el-card>
    </template>
    <template #sidebar>
      <el-affix :offset="16">
        <record-sidebar :submission="submissions[0]" />
      </el-affix>
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import RecordMain from '@/components/record/RecordMain.vue'
import RecordSidebar from '@/components/record/RecordSidebar.vue'

import { ElCard, ElAffix } from 'element-plus'

import { useTest } from '@/stores/test'

const submissions = useTest().dataSubmissionsDetail

const props = defineProps<{
  rid: string
}>()
</script>

<style lang="scss" scoped></style>
