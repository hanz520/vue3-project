import { ItemFace } from '@/layout/sidebar/type'
import { defineStore } from 'pinia'

const mockData = [
  {
    name: '工作台',
    route: 'workbench',
    icon: 'icon-appstore'
  },
  {
    name: '系统管理',
    route: 'systemM',
    icon: 'icon-appstore',
    children: [
      {
        name: '用户管理',
        route: 'user',
        icon: 'icon-appstore'
      },
      {
        name: '角色管理',
        route: 'role',
        icon: 'icon-appstore'
      },
      {
        name: '权限管理',
        route: 'auth',
        icon: 'icon-appstore'
      }
    ]
  },
  {
    name: '产品管理',
    route: 'productM',
    icon: 'icon-appstore',
    children: [
      {
        name: '分类管理',
        route: 'classify',
        icon: 'icon-appstore'
      },
      {
        name: '产品',
        route: 'product',
        icon: 'icon-appstore'
      },
      {
        name: '产品集合',
        route: 'productSet',
        icon: 'icon-appstore',
        children: [
          {
            name: '集合A',
            route: 'productSetA',
            icon: 'icon-appstore'
          },
          {
            name: '集合B',
            route: 'productSetB',
            icon: 'icon-appstore'
          }
        ]
      }
    ]
  }
]

interface NavState {
  _navList: ItemFace[] | null
  active: string[] // 因为antd-v的selectedKeys为 string[]
  collapsed: boolean
}

/**
 * 具体实现
 */
export const useNavStore = defineStore({
  id: 'nav',
  state(): NavState {
    return {
      _navList: null,
      active: [],
      collapsed: false
    }
  },
  getters: {
    navList: ({ _navList }: NavState) => _navList
  },
  actions: {
    initNavList() {
      this._navList = mockData
    },
    setActive(data: string[]) {
      this.active = data
    }
  }
})
