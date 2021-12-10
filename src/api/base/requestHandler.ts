import { useUserStore } from '@/store'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { addPending, removePending } from './pendingHandler'
// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
export function requestResolve(config: AxiosRequestConfig): AxiosRequestConfig {
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  const token = useUserStore().token
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = token
  }
  return config
}

export function requestReject(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error)
}
