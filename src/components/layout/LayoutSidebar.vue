<template>
  <div class="layout">
    <div class="layout-body">
      <RHeader />
      <div class="content-wrapper">
        <div class="content">
          <main class="main-content">
            <slot name="main" />
          </main>

          <aside class="sidebar-affix">
            <slot name="sidebar" />
          </aside>
          <!-- <template v-else>
            <el-col :span="6">
              <slot name="sidebar" />
            </el-col>
          </template> -->
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

const _props = withDefaults(
  defineProps<{
    affix?: boolean
  }>(),
  {
    affix: true,
  },
)
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

.content-wrapper {
  flex: 1;
}

.content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 16px;

  padding: 24px;

  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.main-content {
  padding: 0;
}

.sidebar-affix {
  top: 0;
  position: sticky;
  align-self: flex-start;
  max-height: 100vh;
  overflow-y: auto;
  padding: 16px;
  margin: -16px; // Preserve spaces for shadow
}
</style>
