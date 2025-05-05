<template>
  <el-card class="contest-card" :body-style="{ padding: '0', display: 'flex', width: '100%' }">
    <div class="contest-banner" :style="{ backgroundImage: `url(${contest.banner})` }"></div>

    <div class="contest-content">
      <div class="section">
        <h3 class="contest-title">{{ contest.title }}</h3>

        <div class="contest-actions">
          <el-button v-if="type === 'upcoming'" type="primary" @click="$emit('register')">
            {{ isRegistered ? '已报名' : '立即报名' }}
          </el-button>
          <el-button v-else type="info" plain>查看详情</el-button>
        </div>
      </div>

      <div class="section">
        <div class="contest-meta">
          <el-rate
            v-model="contest.difficulty"
            disabled
            :max="5"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          />
          <span class="contest-rule">{{ getRuleName(contest.rule) }}</span>
        </div>

        <div v-if="type === 'upcoming'" class="contest-countdown">
          <span>距离开始还有</span>
          <countdown-timer :target="contest.startTime" />
        </div>
        <div v-else class="contest-time">
          <span>已结束</span>
          <span>{{ formatDate(contest.endTime) }}</span>
        </div>
      </div>
      <p class="contest-summary">{{ contest.summary }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Contest } from '@/interface'

import CountdownTimer from '../common/CountdownTimer.vue'

import { formatDate } from '@/tools/format'

const props = defineProps<{
  contest: Contest
  type: 'upcoming' | 'finished'
}>()

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
  font-size: larger;
  margin: 0;
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
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .el-button {
    width: 150px;
  }
}

.contest-countdown,
.contest-time {
  text-align: right;
  font-size: small;
  color: var(--el-text-color-secondary);

  span {
    display: block;
  }
}
</style>
