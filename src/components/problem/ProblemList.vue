<template>
  <el-card body-style="padding-top: 0.5em; padding-bottom: 0.5em">
    <el-affix>
      <table class="problemset-head">
        <colgroup>
          <col class="col-status" />
          <col class="col-id" />
          <col class="col-title" />
          <col class="col-difficulty" />
          <col class="col-acceptance" />
        </colgroup>
        <thead>
          <tr class="entry">
            <th></th>
            <th>#</th>
            <th>题目</th>
            <th>难度</th>
            <th>通过率</th>
          </tr>
        </thead>
      </table>
    </el-affix>

    <table v-if="problemset.length > 0" class="problemset">
      <colgroup>
        <col class="col-status" />
        <col class="col-id" />
        <col class="col-title" />
        <col class="col-difficulty" />
        <col class="col-acceptance" />
      </colgroup>
      <tbody>
        <tr class="entry" v-for="[problem, result] of problemset" :key="problem.id">
          <!-- 状态列 -->
          <td class="status">
            <template v-if="result">
              <template v-if="result.judge === 'correct'">
                <font-awesome-icon style="color: var(--el-color-success)" :icon="faCheck" />
              </template>
              <template v-else-if="result.judge === 'incorrect'">
                <font-awesome-icon style="color: var(--el-color-success)" :icon="faCheck" />
              </template>
              <template v-else-if="result.judge !== null">
                <span
                  :style="{
                    color:
                      result.judge < 30
                        ? 'var(--el-color-danger)'
                        : result.judge < 70
                          ? 'var(--el-color-warning)'
                          : 'var(--el-color-success)',
                  }"
                >
                  {{ result.judge }}
                </span>
              </template>
            </template>
          </td>

          <td class="id">{{ problem.id }}</td>

          <td class="problem">
            <router-link :to="`/problem/${problem.id}`" class="problem-title">
              {{ problem.title['en-US'] }}
            </router-link>
            <div class="tags">
              <span v-for="tag in problem.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </td>

          <td class="difficulty">
            {{ problem.difficulty }}
          </td>

          <td class="acceptance">
            <el-tooltip :content="`${problem.countCorrect} / ${problem.countTotal}`">
              <div class="acceptance-bar-container">
                <div
                  class="acceptance-bar"
                  :style="{
                    width: `${problem.countTotal ? (100 * problem.countCorrect) / problem.countTotal : 0}%`,
                  }"
                ></div>
              </div>
            </el-tooltip>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-else>
      <div v-if="loading" v-loading="true" style="height: 200px" />
      <el-empty v-else description="暂无试题" />
    </template>

    <el-affix position="bottom">
      <div class="problemset-bottom">
        <el-pagination
          :current-page="currentPage"
          :page-size="50"
          :pager-count="11"
          :total="total"
          @current-change="handlePageChange"
        />
      </div>
    </el-affix>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElAffix, ElPagination, ElEmpty, ElTooltip } from 'element-plus'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type {
  ProblemCore,
  ProblemFilterParams,
  ProblemFilterQuery,
  ProblemId,
  Result,
} from '@/interface'
import { onMounted, ref, watch } from 'vue'
import { apiProblemList } from '@/api'
import { useAuth } from '@/stores/auth'
import { keyBy, omitBy } from 'lodash-es'

import { useRoute, useRouter } from 'vue-router'

const auth = useAuth()
const route = useRoute()
const router = useRouter()

const total = ref(0)
const currentPage = ref(Number(route.query.page || 1))
const problemset = ref<[ProblemCore, Result?][]>([])

const props = defineProps<{
  filter: ProblemFilterParams
}>()

const loading = ref(false)

async function fetchData() {
  loading.value = true
  problemset.value = []

  // 过滤掉 undefined 和空数组
  const query = omitBy(
    {
      ...props.filter,
      page: currentPage.value,
      user: auth.currentUser?.id,
    },
    (v) => !v,
  )
  router.push({ query })

  apiProblemList({
    ...props.filter,
    page: currentPage.value,
    user: auth.currentUser?.id,
  })
    .then((response) => {
      // 将 results 按照 problem 字段（即 Problem 的 id）建立索引
      const resultsByProblemId = keyBy(response.results, 'problem')

      // 遍历 problems，为每个 problem 找到对应的 result（如果有的话）
      problemset.value = response.problems.map((problem) => [
        problem,
        resultsByProblemId[problem.id],
      ])

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

const handlePageChange = (val: number) => {
  currentPage.value = val
}

onMounted(fetchData)
</script>

<style lang="scss" scoped>
.problemset {
  &-head {
    padding-top: 16px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &-bottom {
    padding: 16px 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
}

table.problemset {
  tr.entry {
    &:hover {
      background-color: #f5f5f5;
    }
  }
}

table.problemset,
table.problemset-head {
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
    &-status {
      width: 35px;
    }
    &-id {
      width: 60px;
    }
    &-difficulty {
      width: 100px;
    }
    &-acceptance {
      width: 120px;
    }
    &-title {
      width: auto;
    }
  }

  td {
    &.status {
      text-align: center;
      font-weight: bold;
    }
    &.id {
      text-align: center;
    }
    &.difficulty {
      text-align: center;
    }
  }
}

.acceptance {
  &-bar {
    height: 100%;
    background-color: var(--el-color-success);
    transition: width 0.3s ease;
  }

  &-bar-container {
    position: relative;
    height: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;
  }
}

/* 题目标题样式 */
.problem-title {
  color: #2196f3;
  text-decoration: none;
  font-weight: 500;
}

.problem-title:hover {
  text-decoration: underline;
}

/* 标签样式 */
.tags {
  float: right;
  margin-top: 2px;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  color: #555;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  margin-left: 6px;
}

/* 难度样式 */
.difficulty {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: 500;
}
</style>
