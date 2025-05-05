<template>
  <div class="pie-chart-container">
    <!-- 使用ECharts或类似库实现 -->
    <div ref="chartEl" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  data: Array<{
    name: string
    value: number
  }>
}>()

const chartEl = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

onMounted(() => {
  if (chartEl.value) {
    chart = echarts.init(chartEl.value)
    updateChart()
  }
})

watch(() => props.data, updateChart)

function updateChart() {
  if (!chart) return

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
    },
    series: [
      {
        name: '难度分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: props.data,
      },
    ],
  }

  chart.setOption(option)
}
</script>
