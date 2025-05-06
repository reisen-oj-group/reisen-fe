<template>
  <div class="panel-container">
    <contest-sidebar />
    
    <el-card>
      <h3>题目信息</h3>

      <template v-if="problem">
        <div class="description-list">
          <div class="description-item">
            <span class="item-label">编号</span>
            <span class="item-value">{{ problem.id }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">难度</span>
            <span class="item-value">{{ problem.difficulty }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">标签</span>
            <span class="item-value">没写</span>
          </div>
          <div class="description-item">
            <span class="item-label">来源</span>
            <span class="item-value">没有</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-loading="loading" style="height: 128px" />
      </template>
    </el-card>

    <el-button type="primary" :disabled="!problem" @click="openSubmit = true">提交</el-button>

    <el-space fill :fill-ratio="40">
      <el-button plain>全部记录</el-button>
      <el-button plain>我的记录</el-button>
    </el-space>
  </div>

  <problem-submit v-if="problem" :problem="problem" v-model="openSubmit" />
</template>

<script setup lang="ts">
import type { ProblemVerdict } from '@/interface'
import ProblemSubmit from './ProblemSubmit.vue'
import ContestSidebar from '@/components/contest/ContestSidebar.vue'

import { ElButton, ElAffix, ElCard, ElSpace, ElRow, ElCol } from 'element-plus'
import { ref } from 'vue'

const openSubmit = ref(false)

const props = defineProps<{
  problem: ProblemVerdict | null
  loading: boolean
}>()
</script>

<style lang="scss" scoped>
.panel-container {
  > * {
    width: 100%;
  }

  > :not(:last-child) {
    margin-bottom: 1em;
  }
}

.description {
  &-list {
    width: 100%;

    > .item {
      &-label {
        flex-shrink: 0;
        margin-right: 1rem;
        white-space: nowrap;
      }
      &-value {
        flex-grow: 1;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
  }
}
</style>
