import axios from 'axios'
import { axiosConfig } from './config'
import { requestResolve } from './requestHandler'
import { responseResolve } from './responseHandler'
import { errorHandler } from './errorHandler'

const baseApi = axios.create(axiosConfig)

// 请求拦截器
baseApi.interceptors.request.use(requestResolve, errorHandler)

// 响应拦截器
baseApi.interceptors.response.use(responseResolve, errorHandler)

export default baseApi
