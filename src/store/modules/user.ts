import { defineStore } from 'pinia'
import useStorage from '@/composition/hooks/useStorage'
import router, { asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { useNavStore } from './nav'
import { cloneDeep } from 'lodash'
import useArrayTree from '@/composition/hooks/useArrayTree'

export const userInfoMockData: UserInfo = {
  username: 'admin',
  role: 'admin',
  id: '0000001',
  token: 'e6295f22b0644e06b186462d88bbf490',
  auth: [
    {
      name: 'systemM',
      label: '系统管理',
      type: 'route',
      children: [
        {
          name: 'user',
          label: '用户管理',
          type: 'route',
          children: [
            {
              name: 'userAdd',
              label: '用户新增',
              type: 'button'
            },
            {
              name: 'userEdit',
              label: '用户编辑',
              type: 'button'
            },
            {
              name: 'userDel',
              label: '用户删除',
              type: 'button'
            }
          ]
        },
        {
          name: 'role',
          label: '角色管理',
          type: 'route',
          children: [
            {
              name: 'roleAdd',
              label: '角色新增',
              type: 'button'
            },
            {
              name: 'roleEdit',
              label: '角色编辑',
              type: 'button'
            },
            {
              name: 'roleDel',
              label: '角色删除',
              type: 'button'
            }
          ]
        },
        {
          name: 'auth',
          label: '权限管理',
          type: 'route',
          children: [
            {
              name: 'authAdd',
              label: '权限新增',
              type: 'button'
            },
            {
              name: 'authEdit',
              label: '权限编辑',
              type: 'button'
            },
            {
              name: 'authDel',
              label: '权限删除',
              type: 'button'
            }
          ]
        }
      ]
    },
    {
      name: 'productM',
      label: '产品管理',
      type: 'route',
      children: [
        // {
        //   name: 'classify',
        //   label: '分类管理',
        //   type: 'route',
        //   children: [
        //     {
        //       name: 'classifyAdd',
        //       label: '分类新增',
        //       type: 'button'
        //     },
        //     {
        //       name: 'classifyEdit',
        //       label: '分类编辑',
        //       type: 'button'
        //     },
        //     {
        //       name: 'classifyDel',
        //       label: '分类删除',
        //       type: 'button'
        //     }
        //   ]
        // },
        // {
        //   name: 'product',
        //   label: '产品',
        //   type: 'route',
        //   children: [
        //     {
        //       name: 'productAdd',
        //       label: '产品新增',
        //       type: 'button'
        //     },
        //     {
        //       name: 'productEdit',
        //       label: '产品编辑',
        //       type: 'button'
        //     },
        //     {
        //       name: 'productDel',
        //       label: '产品删除',
        //       type: 'button'
        //     }
        //   ]
        // },
        {
          name: 'productSet',
          label: '产品集',
          type: 'route',
          children: [
            {
              name: 'productSetA',
              label: '产品集A',
              type: 'route',
              children: [
                {
                  name: 'productSetAAdd',
                  label: '产品集A新增',
                  type: 'button'
                },
                {
                  name: 'productSetAEdit',
                  label: '产品集A编辑',
                  type: 'button'
                },
                {
                  name: 'productSetADel',
                  label: '产品集A删除',
                  type: 'button'
                }
              ]
            },
            {
              name: 'productSetB',
              label: '产品集B',
              type: 'route',
              children: [
                {
                  name: 'productSetBAdd',
                  label: '产品集B新增',
                  type: 'button'
                },
                {
                  name: 'productSetBEdit',
                  label: '产品集B编辑',
                  type: 'button'
                },
                {
                  name: 'productSetBDel',
                  label: '产品集B删除',
                  type: 'button'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/**
 * 类型定义
 */

interface Auth {
  name: string
  label: string
  type: 'route' | 'button'
  parent?: string | null
  children?: Auth[]
}

interface UserInfo {
  username: string
  role: string
  id: string
  token: string
  auth: Auth[]
}
interface UserState {
  userInfo: UserInfo | null
  authList: Auth[]
}

const { treeToArray } = useArrayTree()
// 获取授予权限的路由
const getAuthAsyncRoutes: (asyncRoutes: RouteRecordRaw[], authList: Auth[]) => RouteRecordRaw[] = (
  asyncRoutes,
  authList
) => {
  return asyncRoutes.filter((route) => {
    if (authList.findIndex((auth) => auth.name === route.name) > -1) {
      if (route.children) {
        route.children = getAuthAsyncRoutes(route.children, authList)
      }
      return true
    } else {
      return false
    }
  })
}

/**
 * 具体实现
 */
export const useUserStore = defineStore({
  id: 'user',
  state(): UserState {
    return {
      userInfo: null,
      authList: []
    }
  },
  getters: {
    username: (state: UserState) => state.userInfo?.username,
    logged: ({ userInfo }: UserState) => userInfo !== null,
    token: ({ userInfo }: UserState) => userInfo?.token,
    authRoute: ({ authList }: UserState) => authList.filter((item) => item.type === 'route'), // 权限-->路由
    authButton: ({ authList }: UserState) => authList.filter((item) => item.type === 'button') // 权限-->按钮
  },
  actions: {
    // 设置用户信息
    setUserInfo(info: UserInfo | null) {
      const storage = useStorage()
      if (info != null) {
        this.authList = treeToArray(info.auth, 'name', null)
        console.log('this.authList', this.authList)
        this.userInfo = info
        this.appendAsyncRoute()
      } else {
        this.removeAsyncRoute()
        this.authList = []
        this.userInfo = null
      }
      storage.setItem('userInfo', this.userInfo)
    },
    // 根据路由权限过滤并追加动态路由
    appendAsyncRoute() {
      const authAsyncRoutes = getAuthAsyncRoutes(asyncRoutes, this.authList)
      // 此处将路由平级化，避免router-view嵌套
      treeToArray(authAsyncRoutes).map((asyncRoute) => {
        if (!asyncRoute.middleware) {
          router.addRoute('init', asyncRoute)
        }
      })
      const navStore = useNavStore()
      let routes = cloneDeep(router.options.routes[0].children) || []
      routes = routes.concat(authAsyncRoutes)
      navStore.initNavList(routes)
    },
    // 移出动态路由
    removeAsyncRoute() {
      this.authRoute.forEach((route) => {
        if (router.hasRoute(route.name)) router.removeRoute(route.name)
      })
      const navStore = useNavStore()
      const routes = cloneDeep(router.options.routes[0].children) || []
      navStore.initNavList(routes)
    }
  }
})
