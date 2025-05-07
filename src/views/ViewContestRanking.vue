<template>
  <layout-main>
    <div class="button-container">
      <el-button type="primary" class="back-button" @click="router.push(`/contest/${cid_str}`)">
        返回比赛
      </el-button>
    </div>
    <el-card class="ranklist-card">
      <rank-list />
    </el-card>
  </layout-main>
</template>

<script setup lang="ts">
import LayoutMain from '@/components/layout/LayoutMain.vue'
import RankList from '@/components/contest/RankList.vue'
import { onMounted } from 'vue'

import { ElCard, ElButton } from 'element-plus'

import { useContest } from '@/stores/contest'
import { useRoute } from 'vue-router'
import router from '@/router'

const props = defineProps<{
  cid_str: string
}>()

onMounted(() => {
  useContest().enter(parseInt(props.cid_str))
})
</script>

<style lang="scss" scoped>
.ranklist-card {
  overflow: visible;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
</style>
