<template>
  <div class="problem-tab">
    <el-row :gutter="20">
      <!-- 题目列表 -->
      <el-col :md="12" :sm="24">
        <el-card class="panel">
          <div class="panel-header">
            <h3>我创建的题目</h3>
            <el-button type="primary" size="small">新建题目</el-button>
          </div>

          <table class="problemset">
            <colgroup>
              <col class="col-id" />
              <col class="col-title" />
              <col class="col-submit" />
              <col class="col-status" />
              <col class="col-edit" />
            </colgroup>
            <tbody>
              <tr class="entry" v-for="problem in userProblems" :key="problem.id">
                <td class="id">{{ problem.id }}</td>

                <td class="problem">
                  <router-link :to="`/problem/${problem.id}`" class="problem-title">
                    {{ problem.i18n['en-US'].title }}
                  </router-link>
                </td>

                <td class="submit">10.1k 提交</td>
                <td class="status">公开</td>
                <td class="edit">
                  <font-awesome-icon :icon="faPenToSquare" />
                </td>
              </tr>
            </tbody>
          </table>

          <el-pagination v-model:current-page="problemPage" :page-size="20" :total="problemTotal" />
        </el-card>
      </el-col>

      <!-- 比赛列表 -->
      <el-col :md="12" :sm="24">
        <el-card class="panel">
          <div class="panel-header">
            <h3>我创建的比赛</h3>
            <el-button type="primary" size="small">新建比赛</el-button>
          </div>
          <el-empty description="暂无比赛数据" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/interface'

import { ElRow, ElCol, ElButton, ElPagination } from 'element-plus'
import { useTest } from '@/stores/test'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const props = defineProps<{
  user: User
}>()

const problemPage = ref(1)
const problemTotal = ref(0)
const userProblems = useTest().dataProblems

function getProblemStatusTag(status: string) {
  const map: Record<string, string> = {
    published: 'success',
    draft: '',
    hidden: 'info',
    rejected: 'danger',
  }
  return map[status] || ''
}

function editProblem(id: string) {
  // 跳转到题目编辑页
}
</script>

<style lang="scss" scoped>
.problem-tab {
  padding: 8px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}

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
    &-id {
      width: 60px;
    }
    &-title {
      width: auto;
    }
    &-submit {
      width: 90px;
    }
    &-status {
      width: 50px;
    }
    &-edit {
      width: 35px;
    }
  }

  td {
    &.status {
      text-align: center;
    }
    &.id {
      text-align: center;
    }
    &.submit {
      text-align: right;
    }
    &.edit {
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
</style>
