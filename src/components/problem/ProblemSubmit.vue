<template>
  <el-dialog v-model="visible" title="提交代码" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="语言">
        <el-select
          v-model="form.lang"
          class="input-lang"
          placeholder="Language"
          size="large"
        >
          <el-option
            v-for="item in configLang"
            :key="item.id"
            :label="item.description"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代码">
        <el-input
          v-model="form.code"
          :autosize="{ minRows: 10, maxRows: 15 }"
          class="input-code"
          type="textarea"
          placeholder="Your code here..."
        />
      </el-form-item>
      <el-form-item label="或者">
        <el-button type="primary">上传代码</el-button>
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

import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption, ElRadio, ElDialog } from 'element-plus'
import type { Problem } from '@/interface'

import { useConfig } from '@/stores/config';

const {
  configLang
} = useConfig();

const props = defineProps<{
  problem: Problem
}>()

const visible = defineModel<boolean>({
  required: true,
})

const form = reactive({
  lang: '',
  code: '',
  id: 0,
})
</script>
