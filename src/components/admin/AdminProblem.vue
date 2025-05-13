<template>
  <div class="problem-list">
    <div class="toolbar">
      <el-button type="primary" @click="handleCreate">创建题目</el-button>
      <el-select
        v-model="filter.status"
        placeholder="题目状态"
        clearable
        style="width: 120px; margin-left: 10px"
        @change="fetchProblems"
      >
        <el-option label="全部" value="" />
        <el-option label="公开" value="public" />
        <el-option label="私有" value="private" />
        <el-option label="比赛" value="contest" />
      </el-select>
      <el-select
        v-model="filter.type"
        placeholder="题目类型"
        clearable
        style="width: 120px; margin-left: 10px"
        @change="fetchProblems"
      >
        <el-option label="全部" value="" />
        <el-option label="传统题" value="traditional" />
        <el-option label="交互题" value="interactive" />
      </el-select>
      <el-input
        v-model="filter.keyword"
        placeholder="搜索题目"
        style="width: 300px; margin-left: 10px"
        clearable
        @clear="fetchProblems"
        @keyup.enter="fetchProblems"
      >
        <template #append>
          <el-button icon="search" @click="fetchProblems" />
        </template>
      </el-input>
    </div>

    <el-table :data="problems" v-loading="loading" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column label="标题" min-width="200">
        <template #default="{ row }">
          <router-link :to="`/admin/problems/${row.id}`" class="title-link">
            {{ row.title['zh-CN'] || Object.values(row.title)[0] }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100">
        <template #default="{ row }">
          {{ getTypeText(row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="时间限制" width="120">
        <template #default="{ row }">
          {{ formatTimeShort(row.limitTime) }}
        </template>
      </el-table-column>
      <el-table-column label="空间限制" width="120">
        <template #default="{ row }">
          {{ formatMemory(row.limitMemory) }}
        </template>
      </el-table-column>
      <el-table-column label="难度" width="120">
        <template #default="{ row }">
          {{ row.difficulty }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.size"
      :total="pagination.total"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      @size-change="fetchProblems"
      @current-change="fetchProblems"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ProblemCore } from '@/interface'
import { apiProblemList } from '@/api'

import { formatTimeShort, formatMemory } from '@/utils/format'

const router = useRouter()

const problems = ref<ProblemCore[]>([])
const loading = ref(false)

const filter = ref({
  status: '',
  type: '',
  keyword: '',
})

const pagination = ref({
  current: 1,
  size: 20,
  total: 0,
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    public: '公开',
    private: '私有',
    contest: '比赛',
  }
  return map[status] || '未知'
}

const getStatusTagType = (status: string) => {
  const map: Record<string, string> = {
    public: 'success',
    private: 'info',
    contest: 'warning',
  }
  return map[status] || ''
}

const getTypeText = (type: string) => {
  const map: Record<string, string> = {
    traditional: '传统题',
    interactive: '交互题',
  }
  return map[type] || '未知'
}

const fetchProblems = async () => {
  loading.value = true
  try {
    const res = await apiProblemList({
      page: pagination.value.current,
      // size: pagination.value.size,
      // status: filter.value.status,
      // type: filter.value.type,
      // keyword: filter.value.keyword
    })
    problems.value = res.problems
    pagination.value.total = res.total
  } catch (error) {
    ElMessage.error('获取题目列表失败')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {}

const handleEdit = (problem: ProblemCore) => {
  router.push(`/problem/${problem.id}/edit`)
}

const handleDelete = (problem: ProblemCore) => {
  ElMessageBox.confirm(
    `确定删除题目 "${problem.title['zh-CN'] || Object.values(problem.title)[0]}"?`,
    '提示',
    {
      type: 'warning',
    },
  ).then(async () => {
    try {
      // await deleteProblem(problem.id)
      ElMessage.success('删除成功')
      fetchProblems()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

onMounted(() => {
  fetchProblems()
})
</script>

<style lang="scss" scoped>
// .problem-list {

// }

.toolbar {
  display: flex;
  align-items: center;
}

.title-link {
  color: var(--el-color-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
