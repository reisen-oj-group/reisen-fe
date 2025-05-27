<template>
  <div class="basic-container">
    <el-form v-model="contest" :label-width="100">
      <el-form-item label="比赛名称" class="form-item">
        <el-input v-model="contest.title" />
      </el-form-item>
      <el-form-item label="起止时间" class="form-item">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="头图" class="form-item">
        <el-input v-model="contest.banner" />

        <span class="explain">填入比赛头图 URL，用于在比赛列表展示。若为空则不显示头图。</span>
      </el-form-item>
      <el-form-item label="描述">
        <md-editor class="editor" v-model="contest.description" />
      </el-form-item>
      <el-form-item label="难度">
        <el-rate v-model="contest.difficulty" size="large" />
      </el-form-item>
      <el-form-item label="赛制">
        <el-select v-model="contest.rule" class="form-item">
          <el-option value="OI" label="OI 赛制" />
          <el-option value="ACM" label="ACM 赛制" />
          <el-option value="IOI" label="IOI 赛制" />
        </el-select>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="contest.status" class="form-item">
          <el-option value="public" label="公开" />
          <el-option value="private" label="邀请" />
          <el-option value="delete" label="删除" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="saveProblem"> 保存 </el-button>
  </div>
</template>

<script setup lang="ts">
import type { Contest } from '@/interface'
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElRate } from 'element-plus'

import MdEditor from '../common/MdEditor.vue'

import { useConfig } from '@/stores/config'
import { ref, watch } from 'vue'

const contest = defineModel<Contest>({
  required: true,
})

const dateRange = ref<[Date, Date] | undefined>();

watch(dateRange, () => {
  if(!dateRange.value)
    return;
  [ contest.value.startTime, contest.value.endTime ] = dateRange.value;
})

function saveProblem() {}
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  line-height: 1;
}

.form-item {
  max-width: 500px;
}
</style>
