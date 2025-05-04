<template>
  <div class="filter-container">
    <el-card class="card">
      <el-form :inline="true" :model="form">
        <el-form-item label="用户" class="filter-item">
          <el-input v-model="form.user" placeholder="用户名或 ID" />
        </el-form-item>
        <el-form-item label="试题" class="filter-item">
          <el-input v-model="form.problem" placeholder="题目 ID" />
        </el-form-item>
        <el-form-item label="语言" class="filter-item">
          <el-select v-model="form.lang">
            <el-option
              v-for="lang in configLangs"
              :key="lang.id"
              :value="lang.id"
              :label="lang.description"
            />
            <el-option value="" label="任意语言" />
          </el-select>
        </el-form-item>
        <el-form-item label="评测结果" class="filter-item">
          <el-select v-model="form.verdict">
            <el-option
              v-for="verdict in configVerdicts"
              :key="verdict.id"
              :value="verdict.id"
              :label="verdict.description"
            />
            <el-option value="" label="任意状态" />
          </el-select>
        </el-form-item>

        <div class="button-container">
          <el-button type="primary">筛选</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { LangId, ProblemId, UserId, VerdictId } from '@/interface'

import { ElCard, ElInput, ElForm, ElFormItem, ElSpace, ElSelect, ElOption, ElButton } from 'element-plus'
import { reactive, ref } from 'vue'

import { useConfig } from '@/stores/config'

const { configVerdicts, configLangs } = useConfig()

const form = reactive<{
  user: null | string | UserId
  problem: null | ProblemId
  lang: LangId
  verdict: VerdictId
}>({
  user: null,
  problem: null,
  lang: '',
  verdict: '',
})
</script>

<style lang="scss" scoped>
.filter-item {
  margin: 0 1em;
  width: 200px;
}

.button-container {
  float: right;
}
</style>
