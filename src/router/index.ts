import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import system from './modules/system'
import product from './modules/product'
import useFlag from '@/composition/hooks/useFlag'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'init',
    redirect: '/workbench',
    meta: { title: '主页' },
    component: () => import('@/layout/Layout.vue'),
    hide: true,
    children: [
      {
        path: '/workbench',
        name: 'Workbench',
        component: () => import('@/views/workbench/Workbench.vue'),
        meta: { title: '工作台', icon: 'icon-appstore' }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页', icon: 'icon-appstore' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: { title: '登录' },
    hide: true
  },
  // 用于刷新重定向
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/layout/redirect/Redirect.vue'),
    hide: true
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/notFound/NotFound.vue'),
    meta: { title: '404' },
    hide: true
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'notFound',
  //   component: () => import('@/views/notFound/NotFound.vue'),
  //   meta: { title: '404' },
  //   hide: true
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const asyncRoutes: RouteRecordRaw[] = [system, product]

const [combinedRoute, combinedRouteHandler] = useFlag(false)
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { logged } = useUserStore()
  // 如果是前往登录页，或者没找到登录信息，跳转登录页
  if (to.name !== 'login' && !logged) {
    next({ name: 'login' })
  }
  // 动态加载路由hack, 因为动态添加路由之后需要需要进行《手动跳转操作》，
  // 但是如果是未定义的路由一直执行《手动跳转操作》会陷入死循环，所以通过combinedRoute限制《手动跳转操作》只在添加动态路由后执行一次，其余的都直接引导到404页面
  if (to.matched.length == 0) {
    // if (combinedRoute.value) {
    //   next('/404')
    // } else {
    //   combinedRouteHandler.set(true)
    //   next({ ...to, replace: true })
    // }
    const fullPath = combinedRoute.value ? '/404' : to.fullPath
    combinedRouteHandler.set(true)
    router.replace(fullPath)
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
