<template>
  <layout-main>
    <div class="record-list-container">
      <record-filter />
      <record-list :records="records" :total="1000" />
    </div>
  </layout-main>
</template>

<script setup lang="ts">
import LayoutMain from '@/components/layout/LayoutMain.vue'

import RecordList from '@/components/record/RecordList.vue'
import RecordFilter from '@/components/record/RecordFilter.vue'
import type { SubmissionFull } from '@/interface'

import { useTest } from '@/stores/test'

const records = useTest().generateMany(useTest().dataSubmissionsFull) as SubmissionFull[]
</script>

<style lang="scss" scoped>
.record-list-container {
  > *:not(:last-child) {
    margin-bottom: 1em;
  }
}
</style>
