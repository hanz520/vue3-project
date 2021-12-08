import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pendingMap = new Map()

/**
 * 为每个接口生成唯一的key
 * @param config
 * @returns
 */
const getPendingKey = (config: AxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')

/**
 * 添加请求
 * @param {Object} config
 */
export const addPending = (config: AxiosRequestConfig): void => {
  const key = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(key)) {
        // 如果 pendingMap 中不存在当前请求，则添加进去
        pendingMap.set(key, cancel)
      }
    })
}
/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config: AxiosRequestConfig): void => {
  const key = getPendingKey(config)
  if (pendingMap.has(key)) {
    // 如果在 pendingMap 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pendingMap.get(key)
    cancel(key)
    pendingMap.delete(key)
  }
}

/**
 * 清空 pendingMap 中的请求（在路由跳转时调用）
 */
export const clearPending = (): void => {
  for (const [key, cancel] of pendingMap) {
    cancel(key)
  }
  pendingMap.clear()
}
