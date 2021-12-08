import { defineStore } from 'pinia'
import useStorage from '../../composition/hooks/useStorage'

/**
 * 类型定义
 */
interface UserInfo {
  username: string
  role: string
  id: string
  token: string
}
interface UserState {
  userInfo: UserInfo | null
}

/**
 * 具体实现
 */
export const useUserStore = defineStore({
  id: 'user',
  state(): UserState {
    return {
      userInfo: null
    }
  },
  getters: {
    username: (state: UserState) => state.userInfo?.username,
    logged: ({ userInfo }: UserState) => userInfo !== null
  },
  actions: {
    // 设置用户信息
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      const storage = useStorage()
      storage.setItem('userInfo', this.userInfo)
    }
  }
})
