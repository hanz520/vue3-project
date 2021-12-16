import { ItemFace } from '@/layout/sidebar/type'
import { defineStore } from 'pinia'

const mockData = [
  {
    name: '系统管理',
    route: 'system',
    icon: 'icon-appstore',
    children: [
      {
        name: '管理员管理',
        route: 'glygl',
        icon: 'icon-appstore'
      },
      {
        name: '角色管理',
        route: 'jsgl',
        icon: 'icon-appstore'
      },
      {
        name: '缓存管理',
        route: 'hcgl',
        icon: 'icon-appstore',
        children: [
          {
            name: '缓存一',
            route: 'hc1',
            icon: 'icon-appstore'
          },
          {
            name: '缓存二',
            route: 'hc2',
            icon: 'icon-appstore'
          }
        ]
      }
    ]
  },
  {
    name: '广告位管理',
    route: 'ads',
    icon: 'icon-appstore',
    children: [
      {
        name: 'banner管理',
        route: 'banner',
        icon: 'icon-appstore'
      },
      {
        name: '广告位管理',
        route: 'ggw',
        icon: 'icon-appstore'
      }
    ]
  },
  {
    name: '产品管理',
    route: 'product',
    icon: 'icon-appstore',
    children: [
      {
        name: '分类管理',
        route: 'flgl',
        icon: 'icon-appstore'
      },
      {
        name: '产品',
        route: 'chanpin',
        icon: 'icon-appstore'
      }
    ]
  },
  {
    name: '用户管理',
    route: 'user',
    icon: 'icon-appstore'
  },
  {
    name: '订单管理',
    route: 'order',
    icon: 'icon-appstore'
  }
]

interface NavState {
  _navList: ItemFace[] | null
}

/**
 * 具体实现
 */
export const useNavStore = defineStore({
  id: 'nav',
  state(): NavState {
    return {
      _navList: null
    }
  },
  getters: {
    navList: ({ _navList }: NavState) => _navList
  },
  actions: {
    initNavList() {
      this._navList = mockData
    }
  }
})
