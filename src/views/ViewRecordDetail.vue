<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <record-main :record="record" :loading="loading" />
      </el-card>
    </template>
    <template #sidebar>
      <record-sidebar :record="record" :loading="loading" />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import RecordMain from '@/components/record/RecordMain.vue'
import RecordSidebar from '@/components/record/RecordSidebar.vue'

import { ElCard, ElAffix } from 'element-plus'

import { apiRecordDetail } from '@/api/record'
import { onMounted, ref } from 'vue'
import type { SubmissionFull, SubmissionId } from '@/interface'

const props = defineProps<{
  rid_str: string
}>()
const rid: SubmissionId = parseInt(props.rid_str)

const record = ref<SubmissionFull | null>(null)
const loading = ref(true)

onMounted(() => {
  apiRecordDetail({
    id: rid,
  })
    .then((response) => {
      record.value = response.record
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<style lang="scss" scoped></style>
