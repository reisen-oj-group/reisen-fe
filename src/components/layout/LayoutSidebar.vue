<template>
  <div class="layout">
    <div class="layout-body">
      <RHeader />
      <div class="main-wrapper">
        <div class="main-content">
          <el-row :gutter="24">
            <el-col :span="18">
              <slot name="main" />
            </el-col>
            <el-col :span="6">
              <slot name="sidebar" />
            </el-col>
          </el-row>
        </div>
      </div>
      <RFooter />
    </div>
    <RSidebar />
  </div>
</template>

<script setup lang="ts">
import RHeader from './RHeader.vue'
import RFooter from './RFooter.vue'
import RSidebar from './RSidebar.vue'

import { ElRow, ElCol } from 'element-plus'

</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  position: relative;
}

.main-wrapper {
  flex: 1;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  padding-right: 64px;
}
</style>
