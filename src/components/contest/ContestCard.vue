<template>
  <el-card class="contest-card" :body-style="{ padding: '0', display: 'flex', width: '100%' }">
    <div class="contest-banner" :style="{ backgroundImage: `url(${contest.banner})` }"></div>

    <div class="contest-content">
      <div class="section">
        <router-link :to="`/contest/${contest.id}`">
          <h3 class="contest-title">{{ contest.title }}</h3>
        </router-link>

        <div class="contest-actions">
          <el-button
            v-if="type === 'running' || type === 'pending'"
            type="primary"
            @click="$emit('register')"
          >
            {{ isRegistered ? '已报名' : '立即报名' }}
          </el-button>
          <el-button v-else type="info" plain>查看详情</el-button>
        </div>
      </div>

      <div class="section">
        <div class="contest-meta">
          <el-rate v-model="rating" disabled :max="5" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
          <span class="contest-rule">{{ getRuleName(contest.rule) }}</span>
        </div>

        <div v-if="type === 'pending'" class="contest-countdown">
          <span>距离开始还有</span>
          <countdown-timer :target="contest.startTime" />
        </div>
        <div v-else-if="type === 'running'" class="contest-countdown">
          <span>距离结束还有</span>
          <countdown-timer :target="contest.endTime" />
        </div>
        <div v-else class="contest-ended">
          <span>已结束</span>
          <span>{{ formatDate(contest.endTime) }}</span>
        </div>
      </div>
      <p class="contest-summary">{{ contest.summary }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Contest } from '@/interface'

import CountdownTimer from '../common/CountdownTimer.vue'
import { ElRate } from 'element-plus'

import { formatDate, formatTimeContest } from '@/tools/format'

const props = defineProps<{
  contest: Contest
  type: 'running' | 'pending' | 'finished'
}>()

const rating = ref(props.contest.difficulty)

const isRegistered = computed(() => {
  // 检查用户是否已报名
  return false
})

function getRuleName(rule: string) {
  const rules: Record<string, string> = {
    OI: 'OI 赛制',
    IOI: 'IOI 赛制',
    ACM: 'ACM 赛制',
  }
  return rules[rule] || rule
}
</script>

<style lang="scss" scoped>
.contest-card {
  margin-bottom: 20px;
  transition: all 0.3s;

  display: flex;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--el-box-shadow-dark);
  }
}

.contest-banner {
  flex-basis: 120px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: var(--el-card-border-radius);
  border-top-right-radius: var(--el-card-border-radius);
}

.contest-content {
  padding: 20px;
  flex-grow: 1;
  justify-content: space-between;
}

.contest-title {
  font-size: 20px;
  margin: 0;
  transition: color 0.2s;

  &:hover {
    color: var(--el-color-primary);
  }
}

.section {
  display: flex;
  justify-content: space-between;

  margin-bottom: 5px;
}

.contest-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .el-rate {
    margin-right: 10px;
  }
  .contest-rule {
    color: var(--el-text-color-secondary);
  }
}

.contest-summary {
  margin: 0;
  color: var(--el-text-color-regular);
}

.contest-actions {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  align-items: center;
  .el-button {
    width: 120px;
  }
}

.contest-countdown,
.contest-ended {
  text-align: right;
  font-size: 12px;
  color: var(--el-text-color-secondary);

  span {
    display: block;
  }
}

.time {
  font-size: 18px;
  margin-right: 12px;
}
</style>
