<template>
  <layout-sidebar>
    <template #main>
      <el-card>
        <template v-if="contest">
          <el-tabs v-model="activeTab" class="contest-tabs" @tab-click="handleClick">
            <!-- 比赛详情 -->
            <el-tab-pane label="比赛详情" name="overview">
              <contest-overview />
            </el-tab-pane>

            <!-- 题目列表 -->
            <el-tab-pane label="题目列表" name="problems">
              <contest-problems />
            </el-tab-pane>

            <!-- 我的提交 -->
            <el-tab-pane label="我的提交" name="submissions">
              <contest-records />
            </el-tab-pane>

            <!-- 排行榜 -->
            <el-tab-pane label="排行榜" name="ranking" />
          </el-tabs>
        </template>
        <template v-else>
          <div v-if="loading" v-loading="true" style="height: 200px" />
          <el-empty v-else description="暂无数据" />
        </template>
      </el-card>
    </template>
    <template #sidebar>
      <contest-sidebar />
    </template>
  </layout-sidebar>
</template>

<script setup lang="ts">
import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'
import ContestSidebar from '@/components/contest/ContestSidebar.vue'

import ContestOverview from '@/components/contest/ContestOverview.vue'
import ContestProblems from '@/components/contest/ContestProblems.vue'
import ContestRecords from '@/components/contest/ContestRecords.vue'

import { ElTabs, ElTabPane, ElCard, type TabsPaneContext } from 'element-plus'

import { computed, onMounted, ref } from 'vue'

import type { Contest, ContestId, Ranking } from '@/interface'
import { apiContest, apiRanking } from '@/api/contest'

import { useAuth } from '@/stores/auth'

import { useContest } from '@/stores/contest'
import { useRouter } from 'vue-router'

const contestStore = useContest()
const router = useRouter()

const contest = computed(() => contestStore.currentContest)
const ranking = computed(() => contestStore.currentRanking)
const loading = computed(() => contestStore.loading)

const auth = useAuth()

const activeTab = ref('overview')
const props = defineProps<{
  cid_str: string
}>()
const cid: ContestId = parseInt(props.cid_str)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.paneName === 'ranking') {
    event.preventDefault()
    router.push(`/contest/${contest.value!.id}/ranklist`)
  }
}

onMounted(() => {
  contestStore.enter(cid)
})
</script>

<style lang="scss" scoped></style>
