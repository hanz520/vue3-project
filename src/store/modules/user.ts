import { defineStore } from 'pinia'
import useStorage from '@/composition/hooks/useStorage'
import { useRouter } from 'vue-router'
import { asyncRoutes } from '@/router'

export const userInfoMockData = {
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
        {
          name: 'classify',
          label: '分类管理',
          type: 'route',
          children: [
            {
              name: 'classifyAdd',
              label: '分类新增',
              type: 'button'
            },
            {
              name: 'classifyEdit',
              label: '分类编辑',
              type: 'button'
            },
            {
              name: 'classifyDel',
              label: '分类删除',
              type: 'button'
            }
          ]
        },
        {
          name: 'product',
          label: '产品',
          type: 'route',
          children: [
            {
              name: 'productAdd',
              label: '产品新增',
              type: 'button'
            },
            {
              name: 'productEdit',
              label: '产品编辑',
              type: 'button'
            },
            {
              name: 'productDel',
              label: '产品删除',
              type: 'button'
            }
          ]
        },
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
  combinedRoute: boolean // 是否已经合并了路由
}

/**
 * 工具方法
 */
// 树形结构数据转化为数组，并且追加pname属性
const treeToArray: (data: Auth[], pname: string | null) => Array<Auth> = (data, pname) => {
  return data.reduce((result: Auth[], current: Auth) => {
    const { children, ...others } = current
    result.push({ parent: pname, ...others })
    if (children) {
      result = [...result, ...treeToArray(children, others.name)]
    }
    return result
  }, [])
}

/**
 * 具体实现
 */
export const useUserStore = defineStore({
  id: 'user',
  state(): UserState {
    return {
      userInfo: null,
      authList: [],
      combinedRoute: false
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
        this.authList = treeToArray(info.auth, null)
        this.userInfo = info
      } else {
        this.authList = []
        this.userInfo = null
      }

      this.appenAsyncRoute()

      storage.setItem('userInfo', this.userInfo)
    },
    // 根据路由权限过滤并追加动态路由
    appenAsyncRoute() {
      const router = useRouter()
      asyncRoutes.map((asyncRoute) => {
        router.addRoute('init', asyncRoute)
      })
    }
  }
})
