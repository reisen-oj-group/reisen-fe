<template>
  <div>
    <md-render :content="props.contest.description" />
  </div>
</template>

<script setup lang="ts">
import type { Contest, Ranking } from '@/interface';
import MdRender from '../common/MdRender.vue';

const props = defineProps<{
  contest: Contest,
  ranking: Ranking | null
}>();

</script>

<style lang="scss" scoped>

</style>