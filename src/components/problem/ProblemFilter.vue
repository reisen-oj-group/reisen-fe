<template>
  <div class="filter-container">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span>筛选</span>
        </div>
      </template>

      <el-form>
        <el-form-item label="难度" class="filter-item">
          <el-space spacer="-" :fill-ratio="40">
            <el-input v-model="minDifficulty" />
            <el-input v-model="maxDifficulty" />
          </el-space>
        </el-form-item>
        <el-form-item label="标签" class="filter-item">
          <a class="tag-selector">标签选择器</a>
        </el-form-item>

        <el-input v-model="keywords" placeholder="题目名称、ID" class="filter-item">
          <template #prefix>
            <font-awesome-icon :icon="faMagnifyingGlass" />
          </template>
        </el-input>
      </el-form>
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
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { ElCard, ElInput, ElForm, ElFormItem, ElSpace } from 'element-plus'

import { ref } from 'vue'

const keywords = ref('')
const minDifficulty = ref(0)
const maxDifficulty = ref(3000)
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

.card-header {
  padding: 0;
  margin: 0;
}

.card {
  margin: 0;
  padding: 0;

  > ::v-deep(.el-card__header) {
    padding: 0.5em 1em;
  }
}
</style>
