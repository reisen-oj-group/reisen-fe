export function formatDate(date: Date) {
  return date.toLocaleString()
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
