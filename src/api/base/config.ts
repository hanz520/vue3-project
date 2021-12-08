import { AxiosRequestConfig } from 'axios'
// import.meta.env.MODE

export const axiosConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000
  // validateStatus() {
  //   // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
  //   return true
  // }
}
