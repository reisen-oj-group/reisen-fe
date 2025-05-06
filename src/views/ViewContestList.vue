<template>
  <layout-sidebar>
    <template #main>
      <contest-list :init-filter="initFilter" ref="contests" />
    </template>
    <template #sidebar>
      <contest-filter :init-filter="initFilter" @filter="handleFilterSubmit" />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ContestList from '@/components/contest/ContestList.vue'
import ContestFilter from '@/components/contest/ContestFilter.vue'
import type { ContestFilterForm } from '@/interface'
import { ref } from 'vue'

const contests = ref<InstanceType<typeof ContestList> | null>(null)

const initFilter: ContestFilterForm = {
  rule: 'OI',
  difficulty: 1
}

const handleFilterSubmit = (form: ContestFilterForm) => {
  contests.value?.setFilter(form)
}

</script>

<style lang="scss" scoped></style>
