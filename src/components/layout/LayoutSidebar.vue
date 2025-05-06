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

            <template v-if="props.affix">
                <el-col :span="6" class="affix-container">
                  <el-affix target=".affix-container">
                    <slot name="sidebar" />
                  </el-affix>
                </el-col>
            </template>
            <template v-else>
              <el-col :span="6">
                <slot name="sidebar" />
              </el-col>
            </template>
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

import { ElRow, ElCol, ElAffix } from 'element-plus'

const props = withDefaults(defineProps<{
  affix?: boolean
}>(), {
  affix: true
});
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

.affix-container {
  margin-bottom: 1em;
}
</style>
