<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <submission-main :submission="submission" :loading="loading" />
      </el-card>
    </template>
    <template #sidebar>
      <submission-sidebar :submission="submission" :loading="loading" />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import SubmissionMain from '@/components/submission/SubmissionMain.vue'
import SubmissionSidebar from '@/components/submission/SubmissionSidebar.vue'

import { ElCard } from 'element-plus'

import { apiSubmissionDetail } from '@/api/submission'
import { onMounted, ref } from 'vue'
import type { SubmissionFull, SubmissionId } from '@/interface'

const props = defineProps<{
  rid_str: string
}>()
const rid: SubmissionId = parseInt(props.rid_str)

const submission = ref<SubmissionFull | null>(null)
const loading = ref(true)

onMounted(() => {
  apiSubmissionDetail({
    id: rid,
  })
    .then((response) => {
      submission.value = response.submission
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<style lang="scss" scoped></style>
