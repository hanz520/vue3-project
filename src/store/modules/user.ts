import { defineStore } from 'pinia'
import useStorage from '@/composition/hooks/useStorage'
import router, { asyncRoutes } from '@/router'
import { useNavStore } from './nav'

export const userInfoMockData: UserInfo = {
  userDate: {
    username: 'admin',
    userId: '88888888',
    nickname: '年少不识愁滋味',
    phone: '18888888888'
  },
  role: ['admin'],
  token: 'e6295f22b0644e06b186462d88bbf490',
  authRoute: [
    {
      authName: '系统管理',
      action: 'systemM',
      type: 0,
      icon: 'icon-appstore',
      showOnNav: 1,
      children: [
        { authName: '用户管理', action: 'user', type: 1, icon: 'icon-appstore', showOnNav: 1 },
        { authName: '用户新增/编辑', action: 'userAdd', type: 1, icon: 'icon-appstore', showOnNav: 0 },
        { authName: '角色管理', action: 'role', type: 1, icon: 'icon-appstore', showOnNav: 1 },
        { authName: '权限管理', action: 'auth', type: 1, icon: 'icon-appstore', showOnNav: 1 }
      ]
    },
    {
      authName: '产品管理',
      action: 'productM',
      type: 0,
      icon: 'icon-appstore',
      showOnNav: 1,
      children: [
        { authName: '分类管理', action: 'classify', type: 1, icon: 'icon-appstore', showOnNav: 1 },
        { authName: '产品', action: 'product', type: 1, icon: 'icon-appstore', showOnNav: 1 },
        {
          authName: '产品集',
          action: 'productSet',
          type: 0,
          icon: 'icon-appstore',
          showOnNav: 1,
          children: [
            { authName: '产品集A', action: 'productSetA', type: 1, icon: 'icon-appstore', showOnNav: 1 },
            { authName: '产品集B', action: 'productSetB', type: 1, icon: 'icon-appstore', showOnNav: 1 }
          ]
        }
      ]
    }
  ],
  authView: ['workbenchTable', 'workbenchEchart']
}

/**
 * 类型定义
 */

// 权限类型枚举
export enum authType {
  level = 0,
  route = 1,
  interface = 2,
  view = 3
}

type AuthType = 0 | 1 | 2 | 3

/**
 * todo: id是必填
 */
export interface Auth {
  id?: number
  authName: string // 权限名称
  type: AuthType // 权限类型
  action?: string // 权限功能
  icon?: string // 路由图标class
  showOnNav?: 1 | 0 // 是否在路由显示
  children?: Auth[]
  path?: string[] // 通过genPath生成的导航路径
  [k: string]: any
}

interface UserDate {
  username: string
  nickname: string
  userId: string
  phone: string
}

interface UserInfo {
  userDate: UserDate
  role: string[]
  token: string
  authRoute: Auth[] // 权限 -> 路由（包括层级），树形结构
  authView: string[] // 权限 -> 视图
  [k: string]: any
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
    logged: ({ userInfo }: UserState) => userInfo !== null,
    token: ({ userInfo }: UserState) => userInfo?.token,
    userDate: ({ userInfo }: UserState) => userInfo?.userDate,
    username: (state: UserState) => state.userInfo?.userDate?.username,
    nickname: (state: UserState) => state.userInfo?.userDate?.nickname,
    authRoute: ({ userInfo }: UserState) => userInfo?.authRoute || [], // 权限-->路由
    authView: ({ userInfo }: UserState) => userInfo?.authView || [] // 权限-->视图
    // authRoute: ({ authList }: UserState) => authList.filter((item) => item.type === 'route'), // 权限-->路由
    // authButton: ({ authList }: UserState) => authList.filter((item) => item.type === 'button') // 权限-->按钮
  },
  actions: {
    // 设置用户信息
    setUserInfo(info: UserInfo | null) {
      const storage = useStorage()
      const navStore = useNavStore()
      if (info != null) {
        this.userInfo = info
        this.appendAsyncRoute(this.authRoute)
      } else {
        this.removeAsyncRoute(this.authRoute)
        this.userInfo = null
      }
      navStore.initNavData(this.authRoute) // 初始化导航数据
      storage.setItem('userInfo', this.userInfo)
    },
    // 添加动态路由
    appendAsyncRoute(authRoute: Auth[]) {
      authRoute.forEach((auth) => {
        if (auth.type === authType.route) {
          const asyncRoute = asyncRoutes.find((route) => route.name === auth.action)
          if (asyncRoute) {
            if (auth.action && !router.hasRoute(auth.action)) {
              router.addRoute('init', asyncRoute)
            }
          } else {
            console.warn(`未找到路由 ${auth.action}`)
          }
        }
        if (auth.children) {
          this.appendAsyncRoute(auth.children)
        }
      })
    },
    // 移除动态路由
    removeAsyncRoute(authRoute: Auth[]) {
      authRoute.forEach((auth) => {
        if (auth.type === authType.route) {
          if (auth.action && router.hasRoute(auth.action)) {
            router.removeRoute(auth.action)
          } else {
            console.warn(`未注册路由 ${auth.action}`)
          }
        }
        if (auth.children) {
          this.removeAsyncRoute(auth.children)
        }
      })
    }
  }
})
