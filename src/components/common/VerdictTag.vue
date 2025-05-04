<template>
  <el-tag class="verdict-tag" :color="configVerdicts[verdict].color">
    {{ configVerdicts[verdict]?.abbr || 'Unknown' }}
  </el-tag>
</template>

<script setup lang="ts">
import type { VerdictId } from '@/interface'
import { ElTag } from 'element-plus'

import { useConfig } from '@/stores/config'

const configVerdicts = useConfig().configVerdicts

const props = defineProps<{
  verdict: VerdictId
}>()
</script>

<style lang="scss" scoped>
.verdict-tag {
  border: none;
  color: #fff;
}
</style>
