import { AxiosError, AxiosRequestConfig } from 'axios'
import { addPending, removePending } from './pendingHandler'
// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
export function requestResolve(config: AxiosRequestConfig): AxiosRequestConfig {
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  /**
   * todo: 追加token
   */
  // const token = localStorage.getItem('token')
  // if (token) {
  //   config.headers.Authorization = token
  // }
  return config
}

export function requestReject(error: AxiosError): Promise<AxiosError> {
  console.log('这里这')
  return Promise.reject(error)
}
