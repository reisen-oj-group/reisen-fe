<template>
  <div class="panel-container">
    <el-card>
      <h3>评测详情</h3>

      <template v-if="record">
        <div class="description-list">
          <div class="description-item">
            <span class="item-label">编号</span>
            <span class="item-value">{{ record.id }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">提交用户</span>
            <span class="item-value">{{ record.user.name }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">关联试题</span>
            <span class="item-value">{{ record.problem.title['zh-CN'] }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">提交时间</span>
            <span class="item-value">{{ formatDate(record.submission) }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">评测时间</span>
            <span class="item-value">{{ formatDate(record.evaluation) }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">最终用时</span>
            <span class="item-value">{{ formatTimeShort(record.time) }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">评测空间</span>
            <span class="item-value">{{ formatMemory(record.memory) }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">代码长度</span>
            <span class="item-value">{{ record.length }}</span>
          </div>
          <div class="description-item">
            <span class="item-label">评测语言</span>
            <span class="item-value">{{ codeLangs[record.lang].description }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-loading="loading" style="height: 288px" />
      </template>
    </el-card>

    <el-button type="primary" @click="goToProblem" :disabled="!record"> 查看试题 </el-button>
  </div>
</template>

<script setup lang="ts">
import type { SubmissionFull } from '@/interface'
import { formatDate, formatMemory, formatTimeShort } from '@/utils/format'

import { ElButton, ElCard } from 'element-plus'
import { useRouter } from 'vue-router'
import { useConfig } from '@/stores/config'

const { codeLangs } = useConfig().config

const router = useRouter()
const goToProblem = () => {
  if (props.record) router.push(`/problem/${props.record.problem.id}`)
}

const props = defineProps<{
  record: SubmissionFull | null
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
