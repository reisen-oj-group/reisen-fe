<template>
  <div class="ranklist-container">
    <table v-if="contest" class="ranklist">
      <colgroup class="colgroup">
        <col class="col-rank" />
        <col class="col-name" />
        <col class="col-score-solved" />
        <col class="col-score-penalty" />
        <col v-for="_ in labels" class="col-problem" />
      </colgroup>
      <thead>
        <tr class="headline">
          <th class="rank">RANK</th>
          <th class="name">TEAM</th>
          <th class="score" colspan="2">SCORE</th>
          <th v-for="label in labels" class="problem-cell">
            <router-link
              class="problem"
              :to="`/contest/${contest.id}/problem/${contest.problems[label]}`"
            >
              {{ label }}
            </router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rank of ranklist" class="normal-line">
          <td class="rank">
            {{ rank.rank }}
          </td>
          <td class="name">
            {{ rank.user }}
          </td>
          <td class="score-solved">
            {{ rank.totalSolved }}
          </td>
          <td class="score-penalty">
            {{ rank.totalPenalty }}
          </td>
          <td v-for="label in labels" class="result-cell">
            <div v-if="rank.results[label]" class="result" :class="getColorClass(rank, label)">
              {{ rank.results[label].penalty }}
              <span>
                {{ getTries(rank.results[label].attempt) }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <el-empty v-else description="暂无排行" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import type { ProblemCore, Ranking, Result } from '@/interface'

import { useContest } from '@/stores/contest'
import { ElEmpty } from 'element-plus'
import { apiRanklist } from '@/api/contest'

const contestStore = useContest()

const contest = computed(() => contestStore.currentContest)
const labels = computed(() => {
  if (contest.value) return Object.keys(contest.value.problems)
  return []
})

const ranks = ref<Ranking[]>([])
const loading = ref(false)

function updateRanks() {
  if (!contest.value) return

  loading.value = true
  apiRanklist({
    contest: contest.value.id,
  })
    .then((response) => {
      ranks.value = response.rankings
      calcRanklist()
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  updateRanks()
})

watch(contest, updateRanks)

interface RankItem {
  rank: number
  user: number
  totalPenalty: number
  totalSolved: number
  results: Record<string, Result>
}
const ranklist = ref<RankItem[]>([])

function getColorClass(rank: RankItem, label: string) {
  const result = rank.results[label]
  if (!result) return ''
  if (result.judge === 'correct') return 'solved'
  else return 'attempted'
}

function getTries(attempt: number) {
  if (attempt <= 1) return `${attempt} try`
  return `${attempt} tries`
}

function calcRanklist() {
  if (!contest.value) return

  ranklist.value = []
  for (const rank of ranks.value) {
    const item: RankItem = {
      rank: rank.rank,
      user: rank.user,
      totalPenalty: 0,
      totalSolved: 0,
      results: {},
    }
    for (const result of rank.results) {
      for (const label of labels.value) {
        if (contest.value.problems[label] === result.problem) {
          item.results[label] = result
          if (result.judge === 'correct') {
            item.totalPenalty += result.penalty
            item.totalSolved++
          }
          break
        }
      }
    }
    ranklist.value.push(item)
  }
}
</script>

<style lang="scss" scoped>
.problem-cell {
  margin: 4px;
  text-align: center;
  cursor: pointer;
  padding: 0.2em;
  font-size: 1.2em;
}

.solved {
  background-color: #60e760;
}

.attempted {
  background-color: #e87272;
}

table.ranklist,
table.ranklist-head {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  tr.entry {
    height: 3em;
    border-bottom: 1px solid #e0e0e0;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  th,
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tr {
    &.headline {
      position: sticky;
      top: 0;
      background-color: white;
      border-bottom: 3px solid black;
    }
    &.normal-line {
      border-bottom: 1px solid black;
    }
  }

  .col {
    &-rank {
      width: 4em;
      border-right: 1px solid #aaa;
    }
    &-name {
      width: auto;
      border-right: 1px solid #aaa;
    }
    &-score-solved {
      width: 40px;
    }
    &-score-penalty {
      width: 40px;
      border-right: 1px solid #aaa;
    }
    &-problem {
      width: 65px;
    }
  }

  td {
    &.rank {
      text-align: center;
    }
    &.name {
      text-align: center;
    }
    &.score-solved {
      font-weight: bold;
      font-size: 0.9rem;
      text-align: center;
    }
    &.score-penalty {
      font-size: 0.9rem;
      text-align: center;
    }
    &.result-cell {
      > .result {
        margin: 2px 1px 2px 1px;
        padding: 2px;
        line-height: 1.1;
        text-align: center;
        font-size: 1.1rem;
        span {
          font-size: 0.8rem;
          display: block;
        }
      }
    }
  }
}
</style>
