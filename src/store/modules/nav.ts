import { defineStore } from 'pinia'
import { Auth } from './user'
import useArrayTree from '@/composition/hooks/useArrayTree'

interface NavState {
  navList: Auth[] | null // 数组结构的导航数据
  navTree: Auth[] | null // 树形结果的导航数据
  active: string[] // 因为antd-v的selectedKeys为 string[]
  openKeys: string[]
  collapsed: boolean
}

// 工作台是所有用户都可以看到的，哪怕没有任何权限的用户
const workbench: Auth = {
  authName: '工作台',
  action: 'workbench',
  type: 0,
  icon: 'icon-appstore',
  showOnNav: 1
}

// 生成导航路径path
const genPath = (list: Auth[], path: string[]) => {
  list.forEach((nav) => {
    nav.path = [...path, nav.action as string]
    if (nav.children) {
      genPath(nav.children, nav.path)
    }
  })
}

/**
 * 具体实现
 */
export const useNavStore = defineStore({
  id: 'nav',
  state(): NavState {
    return {
      navList: null, // 数组型导航数据，主要用于寻找路径，高亮导航
      navTree: null, // 树型导航数据
      active: [],
      openKeys: [],
      collapsed: false
    }
  },
  actions: {
    initNavData(data: Auth[]) {
      const navTree = [workbench, ...data]
      genPath(navTree, [])
      this.navTree = navTree
      const { treeToArray } = useArrayTree()
      this.navList = treeToArray(this.navTree)
    },
    setActive(data: string[]) {
      this.active = data
    },
    addOpenKeys(data: string[]) {
      data.forEach((key) => {
        if (this.openKeys.indexOf(key) === -1) {
          this.openKeys.push(key)
        }
      })
    }
  }
})
