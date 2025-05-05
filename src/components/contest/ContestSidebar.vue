<template>
  <el-card class="contest-sidebar">
    <h3>比赛筛选</h3>

    <!-- <el-form label-width="80px">
      <el-form-item label="赛制">
        <el-select v-model="localFilter.rule" placeholder="全部赛制" clearable>
          <el-option label="OI赛制" value="OI" />
          <el-option label="ICPC赛制" value="ICPC" />
          <el-option label="ACM赛制" value="ACM" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="难度">
        <el-select v-model="localFilter.difficulty" placeholder="全部难度" clearable>
          <el-option v-for="i in 5" :key="i" :label="`${i}星`" :value="i" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="状态">
        <el-radio-group v-model="localFilter.status">
          <el-radio-button label="public">公开</el-radio-button>
          <el-radio-button label="private">私有</el-radio-button>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="applyFilter">应用筛选</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </el-form-item>
    </el-form> -->
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import type { ContestFilter } from '@/interface'

// const props = defineProps<{
//   filter: ContestFilter
// }>()

const emit = defineEmits(['filter-change'])

// const localFilter = ref<ContestFilter>({ ...props.filter })

// function applyFilter() {
//   emit('filter-change', { ...localFilter.value })
// }

// function resetFilter() {
//   localFilter.value = {
//     rule: null,
//     difficulty: null,
//     status: 'public'
//   }
//   applyFilter()
// }

// watch(() => props.filter, (newVal) => {
//   localFilter.value = { ...newVal }
// }, { deep: true })
</script>

<style scoped>
.contest-sidebar {
  position: sticky;
  top: 20px;

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.2em;
  }
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
