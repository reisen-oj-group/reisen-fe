<template>
  <layout-main>
    <div class="record-list-container">
      <record-filter :init-filter="initFilter" @filter="handleFilterSubmit" />
      <record-list :init-filter="initFilter" ref="records" />
    </div>
  </layout-main>
</template>

<script setup lang="ts">
import LayoutMain from '@/components/layout/LayoutMain.vue'

import RecordList from '@/components/record/RecordList.vue'
import RecordFilter from '@/components/record/RecordFilter.vue'
import type { RecordFilterForm } from '@/interface'

import { ref } from 'vue'

const records = ref<InstanceType<typeof RecordList> | null>(null)

const initFilter: RecordFilterForm = {
  user: undefined,
  problem: undefined,
  lang: '',
  verdict: '',
}

const handleFilterSubmit = (form: RecordFilterForm) => {
  records.value?.setFilter(form)
}
</script>

<style lang="scss" scoped>
.record-list-container {
  > *:not(:last-child) {
    margin-bottom: 1em;
  }
}
</style>
