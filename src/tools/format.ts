export function formatDate(date: Date) {
  const now = new Date()
  const target = new Date(date)

  const year = target.getFullYear()
  const month = target.getMonth() + 1
  const day = target.getDate()
  const hours = target.getHours()
  const minutes = target.getMinutes()
  const seconds = target.getSeconds()

  // 补零函数
  const padZero = (num: number) => num.toString().padStart(2, '0')

  if (now.getFullYear() === year) {
    // 同年，不显示年份
    return `${month}-${day} ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  } else {
    // 不同年，显示年份
    return `${year}-${month}-${day} ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
  }
}

export function formatTime(ms?: number) {
  if (!ms) return '-'
  if (ms >= 10000) {
    return `${(ms / 1000).toFixed(1)}s`
  }
  return `${ms}ms`
}

export function formatMemory(kb?: number) {
  if (!kb) return '-'
  if (kb >= 1024 * 1024) {
    return `${(kb / (1024 * 1024)).toFixed(1)}GB`
  } else if (kb >= 1024) {
    return `${(kb / 1024).toFixed(1)}MB`
  }
  return `${kb}KB`
}

export function formatProblemType(type: string) {
  if (type == 'traditional') return '传统题'
  if (type == 'interactive') return '传统题'
  return '未知题型'
}
