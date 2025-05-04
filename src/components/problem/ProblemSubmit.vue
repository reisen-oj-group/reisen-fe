<template>
  <el-dialog v-model="visible" title="提交代码" width="800">
    <el-form :model="form">
      <el-form-item label="语言" :label-width="formLabelWidth">
        <el-input v-model="form.language" autocomplete="off" />
      </el-form-item>
      <el-form-item label="代码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { ElForm, ElFormItem, ElInput, ElButton, ElRadio, ElDialog } from 'element-plus'
import type { Problem } from '@/interface'

const props = defineProps<{
  problem: Problem
}>()

const visible = defineModel<boolean>({
  required: true,
})

const formLabelWidth = '140px'

const form = reactive({
  language: '',
  code: '',
  id: 0,
})
</script>
