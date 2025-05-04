<template>
  <layout-sidebar>
    <template #main>
      <problem-list :problems="problems" />
    </template>
    <template #sidebar>
      <problem-filter />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'

import ProblemList from '@/components/problem/ProblemList.vue'
import ProblemFilter from '@/components/problem/ProblemFilter.vue'

import { useTest } from '@/stores/test'

const problems = useTest().dataProblemsMany
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
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  tr {
    height: 2.5em;
    border-bottom: 1px solid #e0e0e0;
  }

  th td {
    padding: 12px 8px;
    text-align: left;
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

/* 状态样式 */
.status-accepted {
  color: #4caf50;
  font-weight: bold;
  font-size: 1.2em;
}

.status-failed {
  color: #f44336;
  font-weight: bold;
  font-size: 1.2em;
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

.difficulty-easy {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.difficulty-medium {
  background-color: #fff8e1;
  color: #f57f17;
}

.difficulty-hard {
  background-color: #ffebee;
  color: #c62828;
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
