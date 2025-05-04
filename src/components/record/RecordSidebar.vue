<template>
  <div class="panel-container">
    <el-card>
      <h3>评测详情</h3>

      <div class="description-list">
        <div class="description-item">
          <span class="item-label">编号</span>
          <span class="item-value">{{ submission.id }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">提交用户</span>
          <span class="item-value">{{ submission.user }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">关联试题</span>
          <span class="item-value">{{ submission.problem }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">提交时间</span>
          <span class="item-value">{{ formatDate(submission.submission) }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">评测时间</span>
          <span class="item-value">{{ formatDate(submission.evaluation) }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">最终用时</span>
          <span class="item-value">{{ formatTime(submission.time) }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">评测空间</span>
          <span class="item-value">{{ formatMemory(submission.memory) }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">代码长度</span>
          <span class="item-value">{{ submission.length }}</span>
        </div>
        <div class="description-item">
          <span class="item-label">评测语言</span>
          <span class="item-value">{{ configLangs[submission.lang].description }}</span>
        </div>
      </div>
    </el-card>

    <el-button type="primary" @click="openSubmit = true">查看试题</el-button>
  </div>
</template>

<script setup lang="ts">

import type { SubmissionDetail } from '@/interface';
import { formatDate, formatMemory, formatTime } from '@/tools/format';
import { ElButton, ElAffix, ElCard, ElSpace, ElRow, ElCol } from 'element-plus'
import { ref } from 'vue'

import { useConfig } from '@/stores/config';

const {
  configLangs
} = useConfig();

const openSubmit = ref(false)

const props = defineProps<{
  submission: SubmissionDetail
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