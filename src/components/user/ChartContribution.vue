<template>
  <div class="contribution-chart">
    <!-- 使用第三方图表库或自定义SVG实现 -->
    <!-- 这里以伪代码示例 -->
    <!-- <div 
      v-for="(week, i) in weeks" 
      :key="i" 
      class="contribution-week"
    >
      <div
        v-for="(day, j) in week.days"
        :key="j"
        class="contribution-day"
        :style="{
          backgroundColor: getColor(day.count),
          opacity: day.count > 0 ? 0.8 : 0.1
        }"
        :title="`${day.date}: ${day.count}次提交`"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: Array<{
    date: string
    count: number
  }>
}>()

// function getColor(count: number) {
//   if (count === 0) return '#ebedf0'
//   if (count < 3) return '#9be9a8'
//   if (count < 5) return '#40c463'
//   if (count < 10) return '#30a14e'
//   return '#216e39'
// }
</script>

<style scoped>
.contribution-chart {
  display: flex;
  gap: 3px;
}

.contribution-week {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contribution-day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: all 0.3s;
}
</style>
