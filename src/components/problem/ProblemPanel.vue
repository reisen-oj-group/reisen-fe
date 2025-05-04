<template>
  <div class="panel-container">
    <el-card>
      <h3>题目信息</h3>

      <div class="description-list">
        <div class="description-item">
          <span class="item-label">编号</span>
          <span class="item-value">114514</span>
        </div>
        <div class="description-item">
          <span class="item-label">难度</span>
          <span class="item-value">困难</span>
        </div>
        <div class="description-item">
          <span class="item-label">标签</span>
          <span class="item-value">动态规划</span>
        </div>
        <div class="description-item">
          <span class="item-label">来源</span>
          <span class="item-value">CCPC</span>
        </div>
      </div>
    </el-card>

    <el-button type="primary" @click="openSubmit = true">提交</el-button>

    <el-space fill :fill-ratio="40">
      <el-button plain>全部记录</el-button>
      <el-button plain>我的记录</el-button>
    </el-space>
  </div>

  <problem-submit :problem="problem" v-model="openSubmit" />
</template>

<script setup lang="ts">
import type { Problem } from '@/interface'
import ProblemSubmit from './ProblemSubmit.vue'

import { ElButton, ElAffix, ElCard, ElSpace, ElRow, ElCol } from 'element-plus'
import { ref } from 'vue'

const openSubmit = ref(false)

const props = defineProps<{
  problem: Problem
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
