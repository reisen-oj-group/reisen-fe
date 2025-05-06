<template>
  <div class="filter-container">
    <el-card class="card">
      <template #header>
        筛选
      </template>

      <el-form :model="form">
        <el-form-item label="难度" class="filter-item">
          <el-space spacer="-" :fill-ratio="40">
            <el-input v-model="form.minDifficulty" />
            <el-input v-model="form.maxDifficulty" />
          </el-space>
        </el-form-item>
        <el-form-item label="标签" class="filter-item">
          <a class="tag-selector">标签选择器</a>
        </el-form-item>

        <el-input v-model="form.keywords" placeholder="题目名称、ID" class="filter-item">
          <template #prefix>
            <font-awesome-icon :icon="faMagnifyingGlass" />
          </template>
        </el-input>
      </el-form>

      <div class="button-container">
        <el-button type="primary" @click="clearFilter">清空</el-button>
        <el-button type="primary" @click="emits('filter', form)">筛选</el-button>
      </div>
    </el-card>

    <el-card class="card">
      <template #header class="card-header">
        <span>最近添加</span>
      </template>
      TODO
    </el-card>

    <el-card class="card">
      <template #header>
        <span>最近做过</span>
      </template>
      TODO
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { ProblemFilterForm } from '@/interface'
import { useConfig } from '@/stores/config'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { ElCard, ElInput, ElForm, ElFormItem, ElSpace, ElButton } from 'element-plus'

import { ref } from 'vue'

const props = defineProps<{
  initFilter: ProblemFilterForm
}>()

const form = ref(props.initFilter)

const emits = defineEmits<{
  filter: [filter: ProblemFilterForm]
}>()

const clearFilter = () => {
  form.value.keywords = ''
  form.value.minDifficulty = 0
  form.value.maxDifficulty = 3000
  form.value.tags = []
}
</script>

<style lang="scss" scoped>
.filter-container {
  > *:not(:last-child) {
    margin-bottom: 1em;
  }
}

.filter-item {
  &:not(:last-child) {
    margin-bottom: 0.5em;
  }
}

.tag-selector {
  margin-left: auto;
}

.card {
  margin: 0;
  padding: 0;

  > ::v-deep(.el-card__header) {
    padding: 0.5em 1em;
  }
}

.button-container {
  margin-top: 0.5em;
  width: 100%;
}
</style>
