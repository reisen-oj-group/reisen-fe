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

    <table class="record-list" v-if="records.length > 0">
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
        <tr v-for="record in records" :key="record.id" class="entry">
          <td class="id">
            <router-link :to="`/record/${record.id}`" class="record-link">
              <span>{{ record.id }}</span>
            </router-link>
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
              {{ record.problem.title['en-US'] }}
            </router-link>
          </td>
          <td class="lang">
            {{ codeLangs[record.lang]?.description || 'Unknown' }}
          </td>
          <td class="verdict">
            <verdict-tag :verdict="record.verdict" />
          </td>
          <td class="time">{{ formatTimeShort(record.time) }}</td>
          <td class="memory">{{ formatMemory(record.memory) }}</td>
        </tr>
      </tbody>
    </table>
    <template v-else>
      <div v-if="loading" v-loading="true" style="height: 200px" />
      <el-empty v-else description="暂无记录" />
    </template>

    <el-affix position="bottom">
      <div class="record-list-bottom">
        <el-pagination
          :current-page="currentPage"
          :page-size="100"
          :pager-count="11"
          :total="total"
          @current-change="handlePageChange"
        />
      </div>
    </el-affix>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElAffix, ElPagination, ElEmpty } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import type { RecordFilterParams, SubmissionLite } from '@/interface'

import { useConfig } from '@/stores/config'
import { useRoute, useRouter } from 'vue-router'

import { formatDate, formatMemory, formatTimeShort } from '@/utils/format'
import VerdictTag from '../common/VerdictTag.vue'
import { apiRecordList } from '@/api/record'
import { omitBy } from 'lodash-es'

const props = defineProps<{
  filter: RecordFilterParams
}>()

const { codeLangs } = useConfig().config
const route = useRoute()
const router = useRouter()

const total = ref(0)
const currentPage = ref(Number(route.query.page || 1))
const records = ref<SubmissionLite[]>([])

const loading = ref(false)

async function fetchData() {
  loading.value = true
  records.value = []

  // 过滤掉 undefined 和空数组
  const query = omitBy(
    {
      ...props.filter,
      page: currentPage.value,
    },
    (v) => !v,
  )
  router.push({ query })

  apiRecordList({
    ...props.filter,
    page: currentPage.value,
  })
    .then((response) => {
      records.value = response.records
      total.value = response.total
    })
    .finally(() => {
      loading.value = false
    })
}

// 监听筛选参数变化
watch(
  () => props.filter,
  () => {
    currentPage.value = 1
    fetchData()
  },
  { deep: true },
)

// 监听分页变化
watch(currentPage, fetchData)

// 初始化加载数据
fetchData()

const handlePageChange = (val: number) => {
  currentPage.value = val
}
</script>

<style lang="scss" scoped>
.record-list {
  &-head {
    padding-top: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }
  &-bottom {
    padding: 16px 0;
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

.user-link,
.record-link {
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
