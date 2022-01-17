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
  },
  {
    path: '/',
    name: 'init',
    redirect: '/workbench',
    meta: { title: '主页' },
    component: () => import('@/layout/Layout.vue'),
    hide: false,
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/Workbench.vue'),
        meta: { title: '工作台' },
        hide: false
      }
    ]
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
  // console.log(to)
  // console.log(to.meta)
  // console.log(to.query)
  NProgress.start()
  const { logged } = useUserStore()
  // 如果是前往登录页，或者没找到登录信息，跳转登录页
  if (to.name !== 'login' && !logged) {
    next({ name: 'login' })
  }
  if (to.matched.length == 0) {
    const path = combinedRoute.value ? '/404' : to.fullPath
    combinedRouteHandler.set(true)
    router.push(path)
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
