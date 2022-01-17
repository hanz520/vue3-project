import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
interface NavState {
  routeList: RouteRecordRaw[] | null
  active: string[] // 因为antd-v的selectedKeys为 string[]
  openKeys: string[]
  collapsed: boolean
}

/**
 * 具体实现
 */
export const useNavStore = defineStore({
  id: 'nav',
  state(): NavState {
    return {
      routeList: null,
      active: [],
      openKeys: [],
      collapsed: false
    }
  },
  actions: {
    initNavList(data: RouteRecordRaw[]) {
      this.routeList = data
    },
    setActive(data: string[]) {
      this.active = data
    }
  }
})
