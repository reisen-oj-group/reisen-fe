<template>
  <layout-sidebar>
    <template #main>
      <contest-list />
    </template>
    <template #sidebar>
      <contest-sidebar />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ContestList from '@/components/contest/ContestList.vue'
import ContestSidebar from '@/components/contest/ContestSidebar.vue'
</script>

<style lang="scss" scoped></style>
