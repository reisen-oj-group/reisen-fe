import axios, { type AxiosRequestConfig } from 'axios'
import Swal from 'sweetalert2'

export const showSuccess = (message: string) => {
  return Swal.fire({ icon: 'success', title: '成功', text: message })
}

export const showError = (message: string) => {
  return Swal.fire({ icon: 'error', title: '错误', text: message })
}

interface ReisenAxiosConfig extends AxiosRequestConfig {
  showSuccess?: boolean
  hideError?: boolean
  noSwal?: boolean
}

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const config = response.config as ReisenAxiosConfig
    if (config.showSuccess) {
      showSuccess('操作成功')
    }
    return response
  },
  (error) => {
    const config = error.config as ReisenAxiosConfig
    const message = error?.response?.data?.message || '请求失败'

    if (!config?.hideError) {
      showError(message)
    }
    return Promise.reject(error)
  },
)

export default instance
export type { ReisenAxiosConfig }
