<template>
  <div class="problem-container">
    <!-- 题目基本信息 -->
    <div class="problem-header">
      <h1 class="problem-title">{{ problemTitle }}</h1>
      <div class="problem-meta">
        <span class="time-limit">时间限制: {{ formattedTimeLimit }}</span>
        <span class="memory-limit">内存限制: {{ formattedMemoryLimit }}</span>
        <span class="problem-type">{{ problemTypeText }}</span>
      </div>
    </div>

    <!-- 题目内容 -->
    <div class="problem-content">
      <!-- 题目背景 -->
      <div v-if="statement.background" class="problem-section">
        <h2 class="section-title">题目背景</h2>
        <md-render :content="statement.background" />
      </div>

      <!-- 题目描述 -->
      <div v-if="statement.legend" class="problem-section">
        <h2 class="section-title">题目描述</h2>
        <md-render :content="statement.legend" />
      </div>

      <!-- 输入格式 -->
      <div v-if="statement.formatI" class="problem-section">
        <h2 class="section-title">输入格式</h2>
        <md-render :content="statement.formatI" />
      </div>

      <!-- 输出格式 -->
      <div v-if="statement.formatO" class="problem-section">
        <h2 class="section-title">输出格式</h2>
        <md-render :content="statement.formatO" />
      </div>

      <!-- 样例 -->
      <div v-if="statement.examples && statement.examples.length > 0" class="problem-section">
        <h2 class="section-title">样例</h2>
        <div v-for="(example, index) in statement.examples" :key="index" class="example">
          <el-row :gutter="8">
            <el-col :span="12" class="data">
              <h3>
                输入 #{{ index + 1 }}
                <a
                  href="#"
                  @click.prevent="copyText(index + 1, example.dataI || '')"
                  class="copy-link"
                >
                  <font-awesome-icon v-if="copied != index + 1" :icon="faCopy" />
                  <font-awesome-icon v-else :icon="faCheck" />
                </a>
              </h3>
              <pre v-if="example.dataI">{{ example.dataI }}</pre>
            </el-col>
            <el-col :span="12" class="data">
              <h3>
                输出 #{{ index + 1 }}
                <a
                  href="#"
                  @click.prevent="copyText(-index - 1, example.dataO || '')"
                  class="copy-link"
                >
                  <font-awesome-icon v-if="copied != -index - 1" :icon="faCopy" />
                  <font-awesome-icon v-else :icon="faCheck" />
                </a>
              </h3>
              <pre v-if="example.dataO">{{ example.dataO }}</pre>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 提示 -->
      <div v-if="statement.hint" class="problem-section">
        <h2 class="section-title">提示</h2>
        <md-render :content="statement.hint" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MdRender from '../common/MdRender.vue'

import { ElRow, ElCol } from 'element-plus'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type { Problem, Statement } from '@/interface'

const props = withDefaults(
  defineProps<{
    problem: Problem
    statement: Statement
    language?: string
  }>(),
  {
    language: 'en-US',
  },
)

// 计算属性
const problemTitle = computed(() => props.problem.i18n[props.language]?.title || 'Untitled')
const acceptanceRate = computed(() => {
  if (props.problem.countTotal === 0) return 0
  return Math.round((props.problem.countCorrect / props.problem.countTotal) * 100)
})

const problemTypeText = computed(() => {
  return props.problem.type === 'traditional' ? '传统题' : '交互题'
})

const formattedTimeLimit = computed(() => {
  const seconds = props.problem.limitTime / 1000
  return `${seconds.toFixed(3)} s`
})

const formattedMemoryLimit = computed(() => {
  const memoryKB = props.problem.limitMemory
  if (memoryKB >= 1024 * 1024) {
    return `${(memoryKB / (1024 * 1024)).toFixed(2)} GB`
  } else if (memoryKB >= 1024) {
    return `${(memoryKB / 1024).toFixed(2)} MB`
  }
  return `${memoryKB} KB`
})

const copied = ref(0)

const copyText = async (index: number, text: string) => {
  await navigator.clipboard.writeText(text)
  copied.value = index
  setTimeout(() => {
    if (copied.value == index) copied.value = 0
  }, 1000)
}
</script>

<style lang="scss" scoped>
.problem-header {
  text-align: center;
  margin-bottom: 30px;

  > .problem {
    &-title {
      margin-bottom: 10px;
      color: #1a1a1a;
    }
    &-meta {
      margin-bottom: 10px;
      span {
        margin: 0 10px;
      }
    }
  }
}

.problem-content {
  text-align: left;

  .problem- {
    &-stats {
      color: #666;
      span {
        margin: 0 10px;
      }
    }

    &-section {
      margin-bottom: 30px;
    }
  }
  .section-title {
    margin-bottom: 15px;
    color: #1a1a1a;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 5px;
  }
}

.example {
  margin-bottom: 20px;
  overflow: hidden;

  h3 {
    background-color: #f5f5f5;
    padding: 4px 10px;
    margin: 0;
    font-size: medium;
    border-bottom: 1px solid #e0e0e0;

    > .copy-link {
      float: right;
      text-decoration: underline;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  data {
    padding: 4px;
  }
}

pre {
  margin: 0;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 3px;
  overflow-x: auto;
}
</style>
