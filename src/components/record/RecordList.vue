<template>
  <el-card body-style="padding-top: 0.5em; padding-bottom: 0.5em">
    <el-affix>
      <table class="record-list-head">
        <colgroup>
          <col class="col-id" />
          <col class="col-submit" />
          <col class="col-user" />
          <col class="col-problem" />
          <col class="col-lang" />
          <col class="col-verdict" />
          <col class="col-time" />
          <col class="col-memory" />
        </colgroup>
        <thead>
          <tr class="entry">
            <th>#</th>
            <th>提交时间</th>
            <th>提交用户</th>
            <th>试题</th>
            <th>语言</th>
            <th>评测结果</th>
            <th>用时</th>
            <th>空间</th>
          </tr>
        </thead>
      </table>
    </el-affix>

    <table class="record-list">
      <colgroup>
        <col class="col-id" />
        <col class="col-submit" />
        <col class="col-user" />
        <col class="col-problem" />
        <col class="col-lang" />
        <col class="col-verdict" />
        <col class="col-time" />
        <col class="col-memory" />
      </colgroup>
      <tbody>
        <tr v-for="record in props.records" :key="record.id" class="entry">
          <td class="id">
            {{ record.id }}
          </td>
          <td class="time">
            {{ formatDate(record.submission) }}
          </td>
          <td class="user">
            <router-link :to="`/user/${record.user.id}`" class="user-link">
              <span>{{ record.user.name }}</span>
            </router-link>
          </td>
          <td class="problem">
            <router-link :to="`/problem/${record.problem.id}`" class="problem-title">
              {{ record.problem.i18n['en-US'].title }}
            </router-link>
          </td>
          <td class="lang">
            {{ configLangs[record.lang]?.description || 'Unknown' }}
          </td>
          <td class="verdict">
            <el-tag :type="getVerdictColor(record.verdict)" effect="dark">
              {{ configVerdicts[record.verdict]?.abbr || 'Unknown' }}
            </el-tag>
          </td>
          <td class="time">{{ record.time ? `${record.time}ms` : '-' }}</td>
          <td class="memory">{{ formatMemory(record.memory) }}</td>
        </tr>
      </tbody>
    </table>

    <el-affix position="bottom">
      <div class="record-list-bottom">
        <el-pagination
          :page-size="100"
          :current-page="currentPage"
          :total="total"
          @current-change="handlePageChange"
        />
      </div>
    </el-affix>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElAffix, ElPagination } from 'element-plus'
import { computed, ref } from 'vue'
import type { SubmissionFull } from '@/interface'

import { useConfig } from '@/stores/config'

const { configLangs, configVerdicts } = useConfig()

const props = defineProps<{
  records: SubmissionFull[]
  total: number
}>()

const emits = defineEmits(['page-change'])

const pageSize = ref(20)
const currentPage = ref(1)

function handlePageChange(page: number) {
  currentPage.value = page
  emits('page-change', page)
}

function formatDate(date: Date) {
  return date.toLocaleString()
}

function formatMemory(kb?: number) {
  if (!kb) return '-'
  if (kb >= 1024 * 1024) {
    return `${(kb / (1024 * 1024)).toFixed(1)} GB`
  } else if (kb >= 1024) {
    return `${(kb / 1024).toFixed(1)} MB`
  }
  return `${kb} KB`
}

function getVerdictColor(verdict: string) {
  switch (verdict) {
    case 'AC':
      return 'success'
    case 'WA':
      return 'danger'
    case 'TLE':
      return 'warning'
    case 'MLE':
      return 'warning'
    case 'CE':
      return 'info'
    default:
      return ''
  }
}
</script>

<style lang="scss" scoped>
.record-list {
  &-head {
    padding-top: 0.5em;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }
  &-bottom {
    padding: 0.5em 0;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }
}

table.record-list {
  tr.entry {
    &:hover {
      background-color: #f5f5f5;
    }
  }
}

table.record-list,
table.record-list-head {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  tr.entry {
    height: 2.5em;
    border-bottom: 1px solid #e0e0e0;
  }

  th,
  td {
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .col {
    &-id {
      width: 60px;
    }
    &-submit {
      width: 180px;
    }
    &-user {
      width: 150px;
    }
    &-problem {
      width: auto;
    }
    &-lang {
      width: 150px;
    }
    &-verdict {
      width: 80px;
    }
    &-time {
      width: 80px;
    }
    &-memory {
      width: 80px;
    }
  }

  td {
    &.id,
    &.verdict,
    &.time,
    &.memory,
    &.user {
      text-align: center;
    }
    &.time,
    &.memory {
      font-family: monospace;
    }
    &.verdict {
      font-weight: bold;
    }
  }
}

.user-link {
  align-items: center;
  gap: 8px;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.problem-title {
  color: var(--el-color-primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
</style>
