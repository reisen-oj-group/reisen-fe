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

    <table class="problemset">
      <colgroup>
        <col class="col-status" />
        <col class="col-id" />
        <col class="col-title" />
        <col class="col-difficulty" />
        <col class="col-acceptance" />
      </colgroup>
      <tbody>
        <tr class="entry" v-for="problem in problems" :key="problem.id">
          <!-- 状态列 -->
          <td class="status">
            <template v-if="true">
              <font-awesome-icon style="color: var(--el-color-success)" :icon="faCheck" />
            </template>
            <template v-else-if="true">
              <font-awesome-icon style="color: var(--el-color-success)" :icon="faCheck" />
            </template>
          </td>

          <td class="id">{{ problem.id }}</td>

          <td class="problem">
            <router-link :to="`/problem/${problem.id}`" class="problem-title">
              {{ problem.i18n['en-US'].title }}
            </router-link>
            <div class="tags">
              <span v-for="tag in problem.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </td>

          <td class="difficulty">
            {{ problem.difficulty }}
          </td>

          <td class="acceptance">
            <div class="acceptance-bar-container">
              <div
                class="acceptance-bar"
                :style="{
                  width: `${problem.countTotal ? (100 * problem.countCorrect) / problem.countTotal : 0}%`,
                }"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <el-affix position="bottom">
      <div class="problemset-bottom">
        <el-pagination :page-size="50" :pager-count="10" :total="problems.length" />
      </div>
    </el-affix>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElAffix, ElPagination } from 'element-plus'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { Problem } from '@/interface'

const props = defineProps<{
  problems: Problem[]
}>()
</script>

<style lang="scss" scoped>
.problemset {
  &-head {
    padding-top: 0.5em;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &-bottom {
    padding: 0.5em 0;
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
      width: 30px;
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

.acceptance-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  font-size: 0.8em;
  font-weight: 500;
}
</style>
