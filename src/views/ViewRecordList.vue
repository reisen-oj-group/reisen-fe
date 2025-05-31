<template>
  <layout-main>
    <div class="record-list-container">
      <record-filter :filter="form" @filter-change="handleFilterChange" />
      <record-list :filter="form" />
    </div>
  </layout-main>
</template>

<script setup lang="ts">
import LayoutMain from '@/components/layout/LayoutMain.vue'

import RecordList from '@/components/record/RecordList.vue'
import RecordFilter from '@/components/record/RecordFilter.vue'

import { ref } from 'vue'
import type { RecordFilterParams } from '@/interface'

import { useRoute, type LocationQuery } from 'vue-router'
import { queryNoS, queryStr, queryNum } from '@/utils/query'

const route = useRoute()

function buildForm(query: LocationQuery) {
  return {
    user: queryStr(query.user),
    problem: queryNum(query.problem),
    lang: queryStr(query.lang),
    verdict: queryStr(query.verdict),
  }
}

const form = ref<RecordFilterParams>(buildForm(route.query))

const handleFilterChange = (params: RecordFilterParams) => {
  form.value = params
}
</script>

<style lang="scss" scoped>
.record-list-container {
  > *:not(:last-child) {
    margin-bottom: 1em;
  }
}
</style>
